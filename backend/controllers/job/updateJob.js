// @desc    Update a Job
// @route   PUT /api/jobs/:id
// @access  Private (Owner only)
export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const updates = req.body;
        const userId = req.user?.id; // Assumes auth middleware is running

        // 1. Find existing job
        let job = await dbWrapper.findById(Job, 'jobs', jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // 2. Check ownership (Only the poster can edit)
        // Convert both to strings to ensure safe comparison
        if (job.postedBy.toString() !== userId.toString()) {
            return res.status(401).json({ message: 'User not authorized to edit this job' });
        }

        // 3. Prevent updating sensitive fields like 'applicants' or 'postedBy' via this route
        delete updates.applicants;
        delete updates.postedBy;
        delete updates._id;

        // 4. Update
        // Note: dbWrapper.update expects (Model, Collection, ID, UpdatesObject)
        const updatedJob = await dbWrapper.update(Job, 'jobs', jobId, updates);

        res.json(updatedJob);

    } catch (err) {
        console.error("Update Job Error:", err.message);
        res.status(500).send('Server Error');
    }
};