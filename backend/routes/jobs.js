import express from 'express';
import { getJobs } from '../controllers/job/getJobs.js';
import auth from '../middleware/auth.js';
import { deleteJob } from '../controllers/job/deleteJob.js';
import { getMyJobs } from '../controllers/job/getMyJobs.js';
import { getJobById } from '../controllers/job/getJobById.js';
import { updateJob } from '../controllers/job/updateJob.js';
import { applyForJob } from '../controllers/job/applyforJob.js';
import { createJob } from '../controllers/job/createJob.js';

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
// router.put('/apply/:id', auth, applyForJob);
router.post('/apply/:_id', applyForJob);

// Public Routes
router.get('/:id', getJobById);

// Private Routes
router.put('/:id', auth, updateJob); // Update
router.delete('/:id', auth, deleteJob); // Delete
router.get('/user/me', auth, getMyJobs); // Get My Jobs

export default router;
