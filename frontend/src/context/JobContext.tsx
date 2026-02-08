import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../api/config';

// 1. Define the Job Interface based on your JSON data
export interface Job {
    _id: string;
    title: string;
    client: string;
    location: string;
    budget: number;
    tags: string[];
    urgent: boolean;
    posted: string;
    postedBy: string;
    applicants: string[];
    description: string;
    status: 'open' | 'closed' | 'in-progress' | 'applied';
    createdAt: string;
}

// 2. Define what data/functions the Context provides
interface JobContextType {
    jobs: Job[];
    loading: boolean;
    error: string | null;
    fetchJobs: () => Promise<void>;
    fetchJobById: (id: string) => Promise<Job | null>;
    postJob: (jobData: any) => Promise<void>;
    applyToJob: (jobId: string, userId: string) => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // 3. Fetch all jobs (GET)
    const fetchJobs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Adjust endpoint path as needed (e.g., '/jobs')
            const response: any = await apiService.get(API_ENDPOINTS.JOBS.GET_ALL);

            // Assuming response.data is the array of jobs, or response itself is the array
            // Adjust based on your actual backend response structure
            const jobList = Array.isArray(response) ? response : response.jobs || [];
            console.log("jobList", jobList);

            setJobs(jobList);
        } catch (err: any) {
            console.error("Fetch Jobs Failed:", err);
            setError(err.message || 'Failed to load jobs');
        } finally {
            setLoading(false);
        }
    }, []);

    // 4. Fetch Single Job (GET)
    const fetchJobById = async (id: string): Promise<Job | null> => {
        try {
            const response: any = await apiService.get(`${API_ENDPOINTS.JOBS.GET_ALL}/${id}`);
            return response;
        } catch (err) {
            console.error(`Failed to fetch job ${id}`, err);
            return null;
        }
    };

    // 5. Post a new Job (POST) - For Clients
    const postJob = async (jobData: any) => {
        setLoading(true);
        try {
            const response: any = await apiService.post(API_ENDPOINTS.JOBS.CREATE || '/jobs', jobData);
            console.log("Job Created:", response);

            // Refresh the list immediately after posting
            await fetchJobs();
        } catch (err: any) {
            console.error("Post Job Failed:", err);
            throw err; // Throw to UI for alert
        } finally {
            setLoading(false);
        }
    };

    // 6. Apply to a Job (POST) - For Artisans
    const applyToJob = async (jobId: string, userId: string) => {
        try {
            // Usually endpoints look like: /jobs/apply/:id
            const endpoint = `${API_ENDPOINTS.JOBS.GET_ALL}/apply/${jobId}`;
            const response = await apiService.put(endpoint, {});
            console.log("Applied successfully:", response);

            // Optional: Update local state to show 'Applied' status without refreshing everything
            setJobs(prevJobs => prevJobs.map(job =>
                job._id === jobId
                    ? { ...job, applicants: [...job.applicants, userId] } // Optimistic update
                    : job
            ));

        } catch (err: any) {
            console.error("Apply Job Failed:", err.message);
            throw err;
        }
    };

    // Automatically load jobs when the provider mounts
    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    return (
        <JobContext.Provider value={{
            jobs,
            loading,
            error,
            fetchJobs,
            fetchJobById,
            postJob,
            applyToJob
        }}>
            {children}
        </JobContext.Provider>
    );
};

// 7. Custom Hook for easy access
export const useJobs = () => {
    const context = useContext(JobContext);
    if (context === undefined) {
        throw new Error('useJobs must be used within a JobProvider');
    }
    return context;
};