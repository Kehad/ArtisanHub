import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, wp } from 'components/utils';
import { Job } from 'src/context/JobContext';

interface JobCardProps {
    item: Job;
    onPress: () => void;
    onApply: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ item, onPress, onApply }) => {
    return (
        <TouchableOpacity style={styles.jobCard} activeOpacity={0.9} onPress={onPress}>
            <View style={styles.jobHeader}>
                <View>
                    <Text style={styles.jobTitle} numberOfLines={1}>{item.title}</Text>
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
                    <Text style={styles.budgetValue}>₦{item.budget?.toLocaleString()}</Text>
                </View>
                <View style={styles.postedContainer}>
                    <MaterialIcons name="access-time" size={14} color={COLORS.textSecondary} />
                    <Text style={styles.postedText}>{item.posted}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.applyButton} onPress={onApply}>
                <Text style={styles.applyText}>View Details</Text>
                <MaterialIcons name="arrow-forward" size={16} color="white" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    jobCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.02)',
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    jobTitle: {
        fontSize: 17,
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
        borderRadius: 6,
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
        gap: 6,
    },
    tag: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    tagText: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginBottom: 14,
        opacity: 0.5,
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
        letterSpacing: 0.5,
        marginBottom: 2,
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
});
