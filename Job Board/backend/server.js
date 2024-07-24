const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    console.log('No token provided');
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.userId = decoded.userId;
    req.userType = decoded.userType;
    next();
  });
};

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, userType]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'An error occurred while registering the user' });
    }
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user.id, userType: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: '4h' }
    );

    res.json({ token, userType: user.user_type });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

// Get employer stats
app.get('/api/employer/stats', verifyToken, async (req, res) => {
  try {
    const [results] = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM jobs WHERE status = 'active') AS activeJobs,
        (SELECT COUNT(*) FROM applications) AS totalApplications,
        (SELECT COUNT(*) FROM applications WHERE status = 'interview') AS interviewsScheduled
    `);
    res.json(results[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching stats' });
  }
});

// Get jobs (for both employer and job seeker)
app.get('/api/jobs', verifyToken, async (req, res) => {
  try {
    const { page = 1, search = '', jobType = '', location = '' } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM jobs WHERE 1=1';
    const queryParams = [];

    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ?)';
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (jobType) {
      query += ' AND job_type = ?';
      queryParams.push(jobType);
    }

    if (location) {
      query += ' AND location = ?';
      queryParams.push(location);
    }

    query += ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    const [jobs] = await pool.query(query, queryParams);
    const [countResult] = await pool.query('SELECT COUNT(*) AS total FROM jobs');
    
    const totalJobs = countResult[0].total;
    const totalPages = Math.ceil(totalJobs / limit);

    res.json({
      jobs: jobs,
      totalPages: totalPages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching jobs' });
  }
});

// Post a new job
app.post('/api/jobs', verifyToken, async (req, res) => {
  console.log('Received job posting request');
  console.log('User ID:', req.userId);
  console.log('User Type:', req.userType);
  console.log('Request body:', req.body);

  try {
    const { title, description, requirements, company, location, salary, jobType } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO jobs (title, description, requirements, company, location, salary, job_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, requirements, company, location, salary, jobType]
    );
    console.log('Job posted successfully');
    res.status(201).json({ message: 'Job posted successfully', jobId: result.insertId });
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({ error: 'Error posting job' });
  }
});
// Get a single job by ID
app.get('/api/jobs/:id', verifyToken, async (req, res) => {
  try {
    const jobId = req.params.id;
    const [jobs] = await pool.query('SELECT * FROM jobs WHERE id = ?', [jobId]);
    
    if (jobs.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(jobs[0]);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Error fetching job' });
  }
});

// Delete a job
app.delete('/api/jobs/:id', verifyToken, async (req, res) => {
  try {
    const jobId = req.params.id;
    await pool.execute('DELETE FROM jobs WHERE id = ?', [jobId]);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting job' });
  }
});

// Get candidates
app.get('/api/candidates', verifyToken, async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    const [candidates] = await pool.query('SELECT * FROM candidates LIMIT ? OFFSET ?', [limit, offset]);
    const [countResult] = await pool.query('SELECT COUNT(*) AS total FROM candidates');
    
    const totalCandidates = countResult[0].total;
    const totalPages = Math.ceil(totalCandidates / limit);

    res.json({
      candidates: candidates,
      totalPages: totalPages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching candidates' });
  }
});

// Get applications
app.get('/api/applications', verifyToken, async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    const [applications] = await pool.query(`
      SELECT a.*, c.name AS candidateName, j.title AS jobTitle 
      FROM applications a
      JOIN candidates c ON a.candidate_id = c.id
      JOIN jobs j ON a.job_id = j.id
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    const [countResult] = await pool.query('SELECT COUNT(*) AS total FROM applications');
    
    const totalApplications = countResult[0].total;
    const totalPages = Math.ceil(totalApplications / limit);

    res.json({
      applications: applications,
      totalPages: totalPages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching applications' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
