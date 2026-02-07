// @desc    Get Single Job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res) => {
    try {
        const job = await dbWrapper.findById(Job, 'jobs', req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job);
    } catch (err) {
        console.error("Get Job By ID Error:", err.message);
        
        // Handle invalid ObjectId errors if using real MongoDB
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(500).send('Server Error');
    }
};