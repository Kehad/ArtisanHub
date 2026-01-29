import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, hp, wp } from 'components/utils';
import { StatusBar } from 'expo-status-bar';

// Mock Jobs
const JOBS = [
    {
        id: '1',
        title: 'Custom Bookshelf Construction',
        client: 'Mrs. Adebayo',
        location: 'Osogbo GRA',
        budget: '₦150,000',
        posted: '2h ago',
        tags: ['Carpentry', 'Furniture'],
        urgent: true,
    },
    {
        id: '2',
        title: 'Iron Gate Repair',
        client: 'Osun State Govt Office',
        location: 'Secretariat, Abere',
        budget: '₦45,000',
        posted: '5h ago',
        tags: ['Welding', 'Repair'],
        urgent: false,
    },
    {
        id: '3',
        title: 'Kitchen Cabinet Installation',
        client: 'New Horizon Hotel',
        location: 'Ilesa Rd',
        budget: '₦350,000',
        posted: '1d ago',
        tags: ['Carpentry', 'Installation'],
        urgent: false,
    },
    {
        id: '4',
        title: 'Plumbing Fix for Office Complex',
        client: 'TechHub',
        location: 'Testing Ground',
        budget: '₦80,000',
        posted: '1d ago',
        tags: ['Plumbing', 'Maintenance'],
        urgent: true,
    }
];

const FILTER_CATEGORIES = ['All', 'Carpentry', 'Welding', 'Plumbing', 'Furniture', 'Repair'];

export default function JobConnectScreen({ navigation }: any) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    const filteredJobs = selectedCategory === 'All'
        ? JOBS
        : JOBS.filter(job => job.tags.some(tag => tag.includes(selectedCategory)));

    const handleApply = (jobTitle: string) => {
        Alert.alert(
            "Application Sent",
            `You have successfully applied for: ${jobTitle}. \n\nThe client will be notified.`,
            [{ text: "OK" }]
        );
    };

    const renderJobItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.jobCard} activeOpacity={0.9}>
            <View style={styles.jobHeader}>
                <View>
                    <Text style={styles.jobTitle}>{item.title}</Text>
                    <Text style={styles.jobClient}>{item.client} • {item.location}</Text>
                </View>
                {item.urgent && (
                    <View style={styles.urgentBadge}>
                        <Text style={styles.urgentText}>URGENT</Text>
                    </View>
                )}
            </View>

            <View style={styles.tagsContainer}>
                {item.tags.map((tag: string, index: number) => (
                    <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.divider} />

            <View style={styles.jobFooter}>
                <View style={styles.budgetContainer}>
                    <Text style={styles.budgetLabel}>Budget</Text>
                    <Text style={styles.budgetValue}>{item.budget}</Text>
                </View>
                <View style={styles.postedContainer}>
                    <MaterialIcons name="access-time" size={14} color={COLORS.textSecondary} />
                    <Text style={styles.postedText}>{item.posted}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.applyButton} onPress={() => handleApply(item.title)}>
                <Text style={styles.applyText}>View & Apply</Text>
                <MaterialIcons name="arrow-forward" size={16} color="white" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="light" backgroundColor={COLORS.primary} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Job Connect</Text>
                <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
                    <MaterialIcons name="filter-list" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Stats / Info */}
            <View style={styles.statsBar}>
                <Text style={styles.statsText}>
                    Showing {filteredJobs.length} {selectedCategory !== 'All' ? selectedCategory : 'active'} jobs near you
                </Text>
            </View>

            <FlatList
                data={filteredJobs}
                keyExtractor={(item) => item.id}
                renderItem={renderJobItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <MaterialIcons name="work-off" size={48} color={COLORS.textSecondary} />
                        <Text style={styles.emptyText}>No jobs found in this category.</Text>
                    </View>
                }
            />

            {/* Filter Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={filterModalVisible}
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setFilterModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Filter Jobs</Text>
                            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                                <MaterialIcons name="close" size={24} color={COLORS.textSecondary} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.filterOptions}>
                            {FILTER_CATEGORIES.map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    style={[
                                        styles.filterOption,
                                        selectedCategory === cat && styles.selectedFilterOption
                                    ]}
                                    onPress={() => {
                                        setSelectedCategory(cat);
                                        setFilterModalVisible(false);
                                    }}
                                >
                                    <Text style={[
                                        styles.filterOptionText,
                                        selectedCategory === cat && styles.selectedFilterOptionText
                                    ]}>{cat}</Text>
                                    {selectedCategory === cat && (
                                        <MaterialIcons name="check" size={18} color={COLORS.primary} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
        backgroundColor: COLORS.primary,
    },
    backButton: {
        padding: 8,
    },
    filterButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.onPrimary,
    },
    statsBar: {
        paddingVertical: 12,
        paddingHorizontal: wp(4),
        backgroundColor: COLORS.secondary + '15', // Light transparent secondary
    },
    statsText: {
        color: COLORS.secondary,
        fontWeight: '600',
        fontSize: 14,
    },
    listContent: {
        padding: wp(4),
        paddingBottom: hp(5),
    },
    jobCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 4,
        maxWidth: wp(60),
    },
    jobClient: {
        fontSize: 13,
        color: COLORS.textSecondary,
    },
    urgentBadge: {
        backgroundColor: '#FFEBEE',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    urgentText: {
        color: COLORS.error,
        fontSize: 10,
        fontWeight: 'bold',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    tag: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    tagText: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginBottom: 12,
    },
    jobFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    budgetContainer: {

    },
    budgetLabel: {
        fontSize: 10,
        color: COLORS.textSecondary,
        textTransform: 'uppercase',
    },
    budgetValue: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.primary,
    },
    postedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postedText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginLeft: 4,
    },
    applyButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 12,
    },
    applyText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
        marginRight: 8,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(10),
    },
    emptyText: {
        marginTop: 16,
        color: COLORS.textSecondary,
        fontSize: 16,
    },
    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: hp(5),
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    filterOptions: {

    },
    filterOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    selectedFilterOption: {

    },
    filterOptionText: {
        fontSize: 16,
        color: COLORS.textPrimary,
    },
    selectedFilterOptionText: {
        color: COLORS.primary,
        fontWeight: '600',
    }
});
