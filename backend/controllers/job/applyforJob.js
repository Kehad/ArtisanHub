// Apply for a job
import Job from '../../models/Job.js';
import dbWrapper from '../../utils/dbWrapper.js';

export const applyForJob = async (req, res) => {
    try {
        console.log(req)
        const { userId } = req.body;
        console.log('req.params 2', req.params);
        // const jobId = req.params.id;
        const { _id } = req.params;
        // console.log('userId', userId);
        // console.log('jobId', jobId);

        // 1. Validation
        // if (!bidAmount || !duration || !coverLetter) {
        //     return res.status(400).json({ 
        //         message: 'Please provide bid amount, duration, and cover letter' 
        //     });
        // }

        // 2. Find Job
        const job = await dbWrapper.findById(Job, 'jobs', _id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // 3. User Identification
        // console.log('req.user', req.user);
        // const userId = req.user.id || req.user.email;
        // if (!userId) {
        //     return res.status(401).json({ message: "User ID missing. Please login." });
        // }

        // 4. Check if already applied
        if (!job.applicants) job.applicants = [];

        // Support both simple ID array and object array for backward compatibility
        //   const hasApplied = job.applicants.some(id => id.toString() === userId.toString());
        
        // const hasApplied = job.applicants.some(app => {
        //     const applicantId = typeof app === 'object' ? app.userId : app;
        //     return applicantId.toString() === userId.toString();
        // });

        // if (hasApplied) {       
        //     return res.status(400).json({ message: 'You have already applied for this job' });
        // }

        // 5. Add Application
        // const newApplication = {
        //     userId: userId,
        //     bidAmount,
        //     duration,
        //     coverLetter,
        //     appliedAt: new Date()
        // };

        // job.applicants.push(newApplication);
        job.applicants.push(userId);


        // 6. Update Database
        await dbWrapper.update(Job, 'jobs', _id, { 
            applicants: job.applicants, 
            status: 'applied' 
        });

        res.json({
            message: "Application submitted successfully",
            applicants: job.applicants
        });

    } catch (err) {
        console.error('Error in applyForJob:', err.message);
        res.status(500).send('Server Error');
    }
};
