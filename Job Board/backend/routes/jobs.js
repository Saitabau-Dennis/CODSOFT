const express = require('express');
const router = express.Router();
const Job = require('../models/jobs');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) =>  {
  try {
    const jobs = await Job.findAll();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/', auth, async (req, res) => {
    try {
      if (req.user.role !== 'employer') {
        return res.status(403).json({ error: 'Only employers can post jobs' });
      }
  
      const { title, description, requirements, salary } = req.body;
      const newJob = await Job.create({
        title,
        description,
        requirements,
        salary,
        employerId: req.user.id
      });
  
      res.status(201).json(newJob);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router;