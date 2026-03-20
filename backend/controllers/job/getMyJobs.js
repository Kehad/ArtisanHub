// @desc    Get Jobs Posted by (or Applied to by) the Current User
// @route   GET /api/jobs/my-jobs
// @access  Private
export const getMyJobs = async (req, res) => {
    try {
        const userId = req.user?.id;
        // Optional: pass ?type=posted or ?type=applied
        const { type } = req.query; 

        // 1. Get ALL jobs
        let allJobs = await dbWrapper.find(Job, 'jobs', {});
        if (!allJobs) allJobs = [];

        let myJobs = [];

        // 2. Filter logic
        if (type === 'posted') {
            // Jobs the user created (Client view)
            myJobs = allJobs.filter(job => job.postedBy === userId);
        } else if (type === 'applied') {
            // Jobs the user applied to (Artisan view)
            myJobs = allJobs.filter(job => 
                job.applicants && job.applicants.includes(userId)
            );
        } else {
            // Default: Return both (or distinct list)
            myJobs = allJobs.filter(job => 
                job.postedBy === userId || 
                (job.applicants && job.applicants.includes(userId))
            );
        }

        res.json(myJobs);

    } catch (err) {
        console.error("Get My Jobs Error:", err.message);
        res.status(500).send('Server Error');
    }
};