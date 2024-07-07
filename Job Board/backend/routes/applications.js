const express = require('express');
const router = express.Router();
const Application = require('../models/Application'); 
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'candidate') {
      return res.status(403).json({ error: 'Only candidates can apply for jobs' });
    }

    const { jobId, coverLetter } = req.body;
    const newApplication = await Application.create({ // Changed variable name and model name
      jobId,
      candidateId: req.user.id,
      coverLetter
    });

    res.status(201).json(newApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
    try {
      if (req.user.role !== 'employer') {
        return res.status(403).json({ error: 'Only employers can view applications' });
      }
  
      const applications = await Application.findByEmployer(req.user.id); // Changed model name
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;