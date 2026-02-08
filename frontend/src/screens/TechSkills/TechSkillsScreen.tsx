import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, hp, wp } from 'components/utils'; // Adjust path if needed
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

// Mock Data for Skills
const COURSES = [
    {
        id: '1',
        title: 'Introduction to Web Development',
        category: 'Web Dev',
        instructor: 'CodeCamp Nigeria',
        progress: 0.65,
        totalLessons: 12,
        completedLessons: 8,
        thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2670&auto=format&fit=crop', // Coding
        color: '#8B5CF6'
    },
    {
        id: '2',
        title: 'UI/UX Design Fundamentals',
        category: 'Design',
        instructor: 'Creative Pros',
        progress: 0.30,
        totalLessons: 5,
        completedLessons: 1,
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop', // Design
        color: '#EA580C'
    },
    {
        id: '3',
        title: 'Data Analysis with Python',
        category: 'Data Science',
        instructor: 'Data Insight Hub',
        progress: 0,
        totalLessons: 8,
        completedLessons: 0,
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop', // Data
        color: '#10B981'
    }
];

const CATEGORIES = ['All', 'Web Dev', 'Design', 'Data Science'];

import { Modal } from 'react-native';

export default function TechSkillsScreen() {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = React.useState('All');
    const [showFilter, setShowFilter] = React.useState(false);
    const [activeCourse, setActiveCourse] = React.useState<any>(null);

    const filteredCourses = selectedCategory === 'All'
        ? COURSES
        : COURSES.filter(c => c.category === selectedCategory);

    const handleResume = (course: any) => {
        setActiveCourse(course);
    };

    const renderCourseCard = (course: any) => (
        <TouchableOpacity key={course.id} style={styles.courseCard} activeOpacity={0.8} onPress={() => handleResume(course)}>
            <View style={styles.thumbnailContainer}>
                {/* Placeholder for Image - using color block if image fails, or real image */}
                <Image
                    source={{ uri: course.thumbnail }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                />
                <View style={[styles.categoryBadge, { backgroundColor: course.color }]}>
                    <MaterialIcons name="play-circle-outline" size={16} color="white" />
                    <Text style={styles.categoryText}>{course.category}</Text>
                </View>
            </View>

            <View style={styles.cardContent}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.instructor}>by {course.instructor}</Text>

                <View style={styles.progressContainer}>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${course.progress * 100}%`, backgroundColor: course.color }]} />
                    </View>
                    <Text style={styles.progressText}>
                        {Math.round(course.progress * 100)}% ({course.completedLessons}/{course.totalLessons})
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.resumeBtn, { borderColor: course.color }]}
                    onPress={() => handleResume(course)}
                >
                    <Text style={[styles.resumeBtnText, { color: course.color }]}>
                        {course.progress > 0 ? "Resume Learning" : "Start Course"}
                    </Text>
                </TouchableOpacity>
            </View>
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
                <Text style={styles.headerTitle}>Tech Skills</Text>
                <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilter(!showFilter)}>
                    <MaterialIcons name="filter-list" size={24} color={showFilter ? COLORS.secondary : "white"} />
                </TouchableOpacity>
            </View>

            {/* Filter Strip */}
            {showFilter && (
                <View style={styles.filterStrip}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
                        {CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.filterChip,
                                    selectedCategory === cat && styles.filterChipActive
                                ]}
                                onPress={() => setSelectedCategory(cat)}
                            >
                                <Text style={[
                                    styles.filterText,
                                    selectedCategory === cat && styles.filterTextActive
                                ]}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Feature / Continue Learning */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        {selectedCategory === 'All' ? 'Continue Learning' : `${selectedCategory} Courses`}
                    </Text>
                    {selectedCategory === 'All' && (
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Render Cards */}
                {filteredCourses.map(renderCourseCard)}

                {filteredCourses.length === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No courses found in this category.</Text>
                    </View>
                )}

                {selectedCategory === 'All' && (
                    <>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Recommended for You</Text>
                        </View>

                        <TouchableOpacity style={styles.promoCard}>
                            <View style={styles.promoContent}>
                                <Text style={styles.promoTitle}>Mastering Freelancing</Text>
                                <Text style={styles.promoSubtitle}>Build your profile and land your first remote job.</Text>
                                <View style={styles.promoBtn}>
                                    <Text style={styles.promoBtnText}>View Course</Text>
                                </View>
                            </View>
                            <MaterialIcons name="people" size={60} color="rgba(255,255,255,0.2)" style={styles.promoIcon} />
                        </TouchableOpacity>
                    </>
                )}

                <View style={{ height: hp(5) }} />
            </ScrollView>

            {/* Course Player Modal */}
            <Modal
                visible={!!activeCourse}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setActiveCourse(null)}
            >
                {activeCourse && (
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={() => setActiveCourse(null)} style={styles.closeBtn}>
                                <MaterialIcons name="keyboard-arrow-down" size={32} color={COLORS.textPrimary} />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle} numberOfLines={1}>Now Playing</Text>
                            <View style={{ width: 32 }} />
                        </View>

                        <View style={styles.videoPlaceholder}>
                            <MaterialIcons name="play-circle-filled" size={64} color="white" />
                            <Text style={styles.videoText}>Video Player Placeholder</Text>
                        </View>

                        <ScrollView style={styles.modalContent}>
                            <Text style={styles.courseTitleLg}>{activeCourse.title}</Text>
                            <Text style={styles.instructorLg}>{activeCourse.instructor}</Text>

                            <View style={styles.statsRow}>
                                <View style={styles.statTag}>
                                    <MaterialIcons name="timer" size={16} color={COLORS.textSecondary} />
                                    <Text style={styles.statText}>45 mins left</Text>
                                </View>
                                <View style={styles.statTag}>
                                    <MaterialIcons name="star" size={16} color="#FFC107" />
                                    <Text style={styles.statText}>4.8 (120 reviews)</Text>
                                </View>
                            </View>

                            <Text style={styles.descriptionTitle}>About this course</Text>
                            <Text style={styles.descriptionText}>
                                This comprehensive detailed course covers all the essential techniques you need to master {activeCourse.category}.
                                Perfect for artisans looking to upgrade their skills and deliver higher quality work.
                            </Text>

                            <Text style={styles.lessonsTitle}>Lessons ({activeCourse.totalLessons})</Text>
                            {[...Array(activeCourse.totalLessons)].map((_, i) => (
                                <View key={i} style={[styles.lessonItem, i < activeCourse.completedLessons && styles.lessonCompleted]}>
                                    <View style={styles.lessonIcon}>
                                        <MaterialIcons
                                            name={i < activeCourse.completedLessons ? "check-circle" : "play-circle-outline"}
                                            size={24}
                                            color={i < activeCourse.completedLessons ? COLORS.success : COLORS.textSecondary}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.lessonTitle, i < activeCourse.completedLessons && styles.lessonTitleCompleted]}>
                                            Lesson {i + 1}: {activeCourse.category} Fundamentals Part {i + 1}
                                        </Text>
                                        <Text style={styles.lessonDuration}>15 mins</Text>
                                    </View>
                                </View>
                            ))}

                            <View style={{ height: hp(5) }} />
                        </ScrollView>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: activeCourse.color }]}>
                                <Text style={styles.primaryBtnText}>Continue Lesson</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
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
    scrollContent: {
        padding: wp(4),
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2),
        marginTop: hp(1),
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    seeAllText: {
        color: COLORS.secondary,
        fontWeight: '600',
    },
    courseCard: {
        backgroundColor: COLORS.surface,
        borderRadius: wp(3),
        marginBottom: hp(2.5),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    thumbnailContainer: {
        height: hp(18),
        backgroundColor: '#E0E0E0',
        position: 'relative',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
    categoryBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    categoryText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    cardContent: {
        padding: wp(4),
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    instructor: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: hp(1.5),
    },
    progressContainer: {
        marginBottom: hp(2),
    },
    progressBarBg: {
        height: 6,
        backgroundColor: COLORS.border,
        borderRadius: 3,
        marginBottom: 4,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        alignSelf: 'flex-end',
    },
    resumeBtn: {
        borderWidth: 1.5,
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    resumeBtnText: {
        fontWeight: '600',
        fontSize: 14,
    },
    promoCard: {
        backgroundColor: COLORS.primary,
        borderRadius: wp(3),
        padding: wp(5),
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: hp(1),
    },
    promoContent: {
        flex: 1,
    },
    promoIcon: {
        position: 'absolute',
        right: -10,
        bottom: -10,
    },
    promoTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    promoSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginBottom: 12,
    },
    promoBtn: {
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    promoBtnText: {
        color: COLORS.primary,
        fontWeight: '700',
        fontSize: 12,
    },
    // Filter Styles
    filterStrip: {
        backgroundColor: COLORS.primary,
        paddingBottom: hp(2),
    },
    filterContent: {
        paddingHorizontal: wp(4),
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginRight: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    filterChipActive: {
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.secondary,
    },
    filterText: {
        color: 'rgba(255,255,255,0.7)',
        fontWeight: '600',
    },
    filterTextActive: {
        color: 'white',
        fontWeight: '700',
    },
    emptyState: {
        padding: 20,
        alignItems: 'center',
    },
    emptyText: {
        color: COLORS.textSecondary,
        fontStyle: 'italic',
    },
    // Modal Styles
    modalContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    closeBtn: {
        padding: 4,
    },
    modalTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    videoPlaceholder: {
        height: hp(30),
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoText: {
        color: 'rgba(255,255,255,0.6)',
        marginTop: 8,
    },
    modalContent: {
        flex: 1,
        padding: 20,
    },
    courseTitleLg: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    instructorLg: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 16,
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    statTag: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    statText: {
        marginLeft: 4,
        color: COLORS.textSecondary,
        fontSize: 13,
    },
    descriptionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: COLORS.textPrimary,
    },
    descriptionText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        lineHeight: 22,
        marginBottom: 24,
    },
    lessonsTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: COLORS.textPrimary,
    },
    lessonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: 12,
        borderRadius: 12,
        marginBottom: 8,
    },
    lessonCompleted: {
        opacity: 0.6,
    },
    lessonIcon: {
        marginRight: 12,
    },
    lessonTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textPrimary,
    },
    lessonTitleCompleted: {
        textDecorationLine: 'line-through',
    },
    lessonDuration: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    modalFooter: {
        padding: 16,
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    primaryBtn: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    primaryBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
