// @desc    Delete a Job
// @route   DELETE /api/jobs/:id
// @access  Private (Owner only)
export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user?.id;

        const job = await dbWrapper.findById(Job, 'jobs', jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check ownership
        if (job.postedBy.toString() !== userId.toString()) {
            return res.status(401).json({ message: 'User not authorized to delete this job' });
        }

        // Perform Delete
        // Ensure your dbWrapper has a delete method, otherwise you need to implement it
        if (dbWrapper.delete) {
            await dbWrapper.delete(Job, 'jobs', jobId);
        } else {
            // Fallback if no delete method: mark as 'deleted' or 'closed'
            await dbWrapper.update(Job, 'jobs', jobId, { status: 'deleted' });
        }

        res.json({ message: 'Job removed' });

    } catch (err) {
        console.error("Delete Job Error:", err.message);
        res.status(500).send('Server Error');
    }
};