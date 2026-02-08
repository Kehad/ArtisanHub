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

        await dbWrapper.update(Job, 'jobs', req.params.id, { applicants: job.applicants, status: 'applied' });

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
