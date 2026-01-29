import express from 'express';
import { getJobs, createJob, applyForJob } from '../controllers/jobController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET api/jobs
// @desc    Get all jobs
// @access  Public (or Private?) - Public for now
router.get('/', getJobs);

// @route   POST api/jobs
// @desc    Create a job
// @access  Private (Admin/Client)
router.post('/', auth, createJob);

// @route   PUT api/jobs/apply/:id
// @desc    Apply for a job
// @access  Private
router.put('/apply/:id', auth, applyForJob);

export default router;
