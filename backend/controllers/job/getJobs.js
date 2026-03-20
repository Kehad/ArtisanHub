import Job from '../../models/Job.js';
import dbWrapper from '../../utils/dbWrapper.js';

// Get all jobs
export const getJobs = async (req, res) => {
    try {
        const { search, tag, location, urgent } = req.query;

        // In a real database we would filter using the query object
        // For mockdb we are doing some filtering here if needed,
        // but the current implementation gets all jobs.
        let jobs = await dbWrapper.find(Job, 'jobs', {});
        
        // Filter in memory if search or other criteria are provided
        if (search) {
            const searchLower = search.toLowerCase();
            jobs = jobs.filter(job =>
                (job.title && job.title.toLowerCase().includes(searchLower)) ||
                (job.description && job.description.toLowerCase().includes(searchLower)) ||
                (job.client && job.client.toLowerCase().includes(searchLower))
            );
        }

        if (tag) {
            jobs = jobs.filter(job => job.tags && job.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
        }

        if (location) {
            jobs = jobs.filter(job => job.location && job.location.toLowerCase().includes(location.toLowerCase()));
        }

        if (urgent === 'true') {
            jobs = jobs.filter(job => job.urgent === true);
        }

        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
