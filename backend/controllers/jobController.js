import Job from '../models/Job.js';
import dbWrapper from '../utils/dbWrapper.js';

// Get all jobs
export const getJobs = async (req, res) => {
    try {
        const { search, tag, location, urgent } = req.query;

        let jobs = await dbWrapper.find(Job, 'jobs', {});
        // console.log(jobs)

        // Filter in memory
        // if (search) {
        //     const searchLower = search.toLowerCase();
        //     jobs = jobs.filter(job =>
        //         (job.title && job.title.toLowerCase().includes(searchLower)) ||
        //         (job.description && job.description.toLowerCase().includes(searchLower)) ||
        //         (job.client && job.client.toLowerCase().includes(searchLower))
        //     );
        // }

        // if (tag) {
        //     jobs = jobs.filter(job => job.tags && job.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
        // }

        // if (location) {
        //     jobs = jobs.filter(job => job.location && job.location.toLowerCase().includes(location.toLowerCase()));
        // }

        // if (urgent === 'true') {
        //     jobs = jobs.filter(job => job.urgent === true);
        // }

        // console.log(jobs);
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private (Client/Admin)
export const createJob = async (req, res) => {
    try {
        const { title, client, location, budget, tags, urgent, description } = req.body;
        
        // Fallback: Get User ID from Token (req.user.id)
        const userId = req.user?.id || 'unknown_user';

        // Validation
        if (!title || !location || !budget) {
            return res.status(400).json({ message: "Title, Location, and Budget are required" });
        }

        const jobData = {
            title,
            client: client || req.user?.name || "Client", // Use user name if available
            location,
            budget: Number(budget), // Ensure number
            tags: Array.isArray(tags) ? tags : [], // Ensure array
            urgent: urgent === true || urgent === 'true', // Handle boolean or string
            description: description || "",
            posted: new Date().toISOString(),
            postedBy: userId,
            applicants: [],
            status: 'open',
            createdAt: new Date().toISOString()
        };

        const job = await dbWrapper.create(Job, 'jobs', jobData);
        res.status(201).json(job);

    } catch (err) {
        console.error("Create Job Error:", err.message);
        res.status(500).send('Server Error');
    }
};

// Apply for a job
export const applyForJob = async (req, res) => {
    try {
        // check for bidAmount, duration, coverletter lallet

        const job = await dbWrapper.findById(Job, 'jobs', req.params.id);
        console.log(job, req.params.id)
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const userId = req.user.id || req.user.email;
        
        if (!userId) {
            return res.status(401).json({ message: "User ID missing. Please login." });
        }

        // Check if already applied
        // Ensure applicants is an array (might be undefined in mock DB initially)
        if (!job.applicants) job.applicants = [];

        // Convert to string for comparison as us erId might be objectId or string
        const hasApplied = job.applicants.some(id => id.toString() === userId.toString());

       if (hasApplied) {       
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        job.applicants.push(userId);

        await dbWrapper.update(Job, 'jobs', req.params.id, { applicants: job.applicants });

        res.json(job.applicants);
        // 6. Update Database
        // await dbWrapper.update(Job, 'jobs', jobId, { applicants: updatedApplicants });

        // 7. Return updated list or success message
        // res.json({ 
        //     message: "Application successful", 
        //     applicants: updatedApplicants 
        // });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
