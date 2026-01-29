import Job from '../models/Job.js';
import dbWrapper from '../utils/dbWrapper.js';

// Get all jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await dbWrapper.find(Job, 'jobs', {});
        // Sort by createdAt desc if possible, currently mockDb doesn't sort but we can sort in memory
        jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Create a job (Admin/Client)
export const createJob = async (req, res) => {
    try {
        const { title, client, location, budget, tags, urgent, posted } = req.body;
        const userId = req.user.id || req.user.email;

        const jobData = {
            title,
            client,
            location,
            budget,
            tags,
            urgent,
            posted: posted || 'Just now',
            postedBy: userId,
            applicants: []
        };

        const job = await dbWrapper.create(Job, 'jobs', jobData);
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Apply for a job
export const applyForJob = async (req, res) => {
    try {
        const job = await dbWrapper.findById(Job, 'jobs', req.params.id);

        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        const userId = req.user.id || req.user.email;

        // Check if already applied
        // Ensure applicants is an array (might be undefined in mock DB initially)
        if (!job.applicants) job.applicants = [];

        // Convert to string for comparison as userId might be objectId or string
        const hasApplied = job.applicants.some(id => id.toString() === userId.toString());

        if (hasApplied) {
            return res.status(400).json({ msg: 'Already applied' });
        }

        job.applicants.push(userId);

        await dbWrapper.update(Job, 'jobs', req.params.id, { applicants: job.applicants });

        res.json(job.applicants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
