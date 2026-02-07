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