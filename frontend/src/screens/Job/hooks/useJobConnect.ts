import { useState, useMemo } from 'react';
import { useJobs } from 'src/context/JobContext';
import { Alert } from 'react-native';

export const FILTER_CATEGORIES = ['All', 'Carpentry', 'Welding', 'Plumbing', 'Furniture', 'Repair'];

export const useJobConnect = () => {
    const { jobs, loading, fetchJobs } = useJobs();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            // Category Filter
            const matchesCategory = selectedCategory === 'All'
                || job.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));

            // Search Filter (optional, can be expanded)
            const matchesSearch = searchQuery === ''
                || job.title.toLowerCase().includes(searchQuery.toLowerCase())
                || job.client.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [jobs, selectedCategory, searchQuery]);

    const handleApply = (jobTitle: string) => {
        Alert.alert(
            "Application Sent",
            `You have successfully applied for: ${jobTitle}. \n\nThe client will be notified.`,
            [{ text: "OK" }]
        );
    };

    const handleRefresh = async () => {
        await fetchJobs();
    };

    return {
        jobs: filteredJobs,
        allJobs: jobs,
        loading,
        selectedCategory,
        setSelectedCategory,
        filterModalVisible,
        setFilterModalVisible,
        handleApply,
        handleRefresh,
        searchQuery,
        setSearchQuery,
        FILTER_CATEGORIES
    };
};
