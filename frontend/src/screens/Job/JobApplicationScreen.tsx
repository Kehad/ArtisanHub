import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { COLORS, hp, wp } from 'components/utils';
import { StatusBar } from 'expo-status-bar';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Job, useJobs } from 'src/context/JobContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { JobsStackParamList } from 'src/navigation/JobsNavigator';
import { useGeneral } from 'src/context/GenContent';

type JobApplicationRouteProp = RouteProp<JobsStackParamList, 'JobApplication'>;
type JobApplicationNavigationProp = StackNavigationProp<JobsStackParamList, 'JobApplication'>;

export default function JobApplicationScreen() {
    const navigation = useNavigation<JobApplicationNavigationProp>();
    const route = useRoute<JobApplicationRouteProp>();
    const { job } = route.params;
    const { applyToJob } = useJobs();
    const { showAlert, showConfirm } = useGeneral();

    const [bidAmount, setBidAmount] = useState(job.budget?.toString() || '');
    const [duration, setDuration] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        console.log("job", job)
        // if (!bidAmount || !duration || !coverLetter) {
        //     Alert.alert("Missing Information", "Please fill in all fields before submitting.");
        //     return;
        // }

        setIsSubmitting(true);
        try {
            // In a real app, you would send the bidAmount, duration, and coverLetter to the backend
            // For now, we just call the context's applyToJob
            await applyToJob(job._id);

            showAlert('Application Sent!', 'Your application has been successfully submitted to the client.', 'success');
            navigation.popToTop()

            // Alert.alert(
            //     "Application Sent!",
            //     "Your application has been successfully submitted to the client.",
            //     [
            //         {
            //             text: "OK",
            //             onPress: () => navigation.popToTop() // Go back to Job Connect
            //         }
            //     ]
            // );
        } catch (error: any) {
            console.log('error', error)
            // Alert.alert("Error", "Failed to submit application. Please try again.");
            showAlert('Application Failed!', error?.msg, 'error');

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="light" backgroundColor={COLORS.primary} />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <MaterialIcons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Apply for Job</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Job Summary Card */}
                    <View style={styles.jobSummaryCard}>
                        <Text style={styles.jobTitle}>{job.title}</Text>
                        <View style={styles.clientRow}>
                            <Text style={styles.clientName}>Client: {job.client}</Text>
                            <Text style={styles.budget}>Budget: ₦{job.budget?.toLocaleString()}</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Proposal Details</Text>

                    {/* Form Fields */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Your Bid Amount (₦)</Text>
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name="money-bill-wave" size={16} color={COLORS.textSecondary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your bid amount"
                                placeholderTextColor={COLORS.textSecondary}
                                keyboardType="numeric"
                                value={bidAmount}
                                onChangeText={setBidAmount}
                            />
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Estimated Duration</Text>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="access-time" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. 3 days, 1 week"
                                placeholderTextColor={COLORS.textSecondary}
                                value={duration}
                                onChangeText={setDuration}
                            />
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Cover Letter</Text>
                        <View style={[styles.inputContainer, styles.textAreaContainer]}>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Introduce yourself and explain why you're the best fit for this job..."
                                placeholderTextColor={COLORS.textSecondary}
                                multiline
                                numberOfLines={6}
                                textAlignVertical="top"
                                value={coverLetter}
                                onChangeText={setCoverLetter}
                            />
                        </View>
                    </View>

                    {/* Attachments Placeholder */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Attachments (Optional)</Text>
                        <TouchableOpacity style={styles.uploadButton}>
                            <Ionicons name="cloud-upload-outline" size={24} color={COLORS.primary} />
                            <Text style={styles.uploadText}>Upload Previous Work / CV</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

                {/* Submit Button */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.submitButton, isSubmitting && styles.disabledButton]}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                    >
                        <Text style={styles.submitButtonText}>
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Text>
                        {!isSubmitting && <MaterialIcons name="send" size={20} color="white" />}
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
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
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
    content: {
        padding: wp(5),
        paddingBottom: hp(10),
    },
    jobSummaryCard: {
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: 16,
        marginBottom: 24,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 8,
    },
    clientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clientName: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    budget: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.primary,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 16,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        height: 50,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.textPrimary,
    },
    textAreaContainer: {
        height: 150,
        alignItems: 'flex-start',
        paddingVertical: 12,
    },
    textArea: {
        height: '100%',
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: 20,
        gap: 10,
    },
    uploadText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '600',
    },
    footer: {
        padding: 20,
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    submitButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    disabledButton: {
        opacity: 0.7,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
});
