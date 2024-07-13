const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

exports.isEmployer = (req, res, next) => {
  if (req.user.userType !== 'employer') {
    return res.status(403).json({ error: 'Access denied. Employers only.' });
  }
  next();
};

exports.isCandidate = (req, res, next) => {
  if (req.user.userType !== 'candidate') {
    return res.status(403).json({ error: 'Access denied. Candidates only.' });
  }
  next();
};
