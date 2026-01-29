import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Modal, TextInput, Alert, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, hp, wp } from 'components/utils';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface PortfolioItem {
    id: string;
    title: string;
    category: string;
    date: string;
    image: string;
    likes: number;
}

const INITIAL_ITEMS: PortfolioItem[] = [
    {
        id: '1',
        title: 'Bespoke Oak Dining Table',
        category: 'Furniture',
        date: 'Jan 15, 2026',
        image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=2670&auto=format&fit=crop',
        likes: 24,
    },
    {
        id: '2',
        title: 'Industrial Steel Gate',
        category: 'Welding',
        date: 'Dec 20, 2025',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2574&auto=format&fit=crop',
        likes: 18,
    },
    {
        id: '3',
        title: 'Modern Kitchen Cabinets',
        category: 'Carpentry',
        date: 'Nov 10, 2025',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2670&auto=format&fit=crop',
        likes: 45,
    }
];

const CATEGORIES = ['Furniture', 'Welding', 'Carpentry'];

export default function PortfolioScreen({ navigation }: any) {
    const [items, setItems] = useState<PortfolioItem[]>(INITIAL_ITEMS);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<PortfolioItem | null>(null);

    // Form State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    const openAddModal = () => {
        setIsEditing(false);
        setCurrentItem(null);
        setTitle('');
        setCategory('');
        setImage(null);
        setShowCategoryDropdown(false);
        setModalVisible(true);
    };

    const openEditModal = (item: PortfolioItem) => {
        setIsEditing(true);
        setCurrentItem(item);
        setTitle(item.title);
        setCategory(item.category);
        setImage(item.image);
        setShowCategoryDropdown(false);
        setModalVisible(true);
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        if (!title.trim() || !category.trim() || !image) {
            Alert.alert('Error', 'Please fill in all fields including the photo');
            return;
        }

        if (isEditing && currentItem) {
            // Update existing
            const updatedItems = items.map(item =>
                item.id === currentItem.id
                    ? { ...item, title, category, image }
                    : item
            );
            setItems(updatedItems);
        } else {
            // Create new
            const newItem: PortfolioItem = {
                id: Date.now().toString(),
                title: title,
                category: category,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                image: image,
                likes: 0,
            };
            setItems([newItem, ...items]);
        }
        setModalVisible(false);
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            "Delete Project",
            "Are you sure you want to delete this project?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setItems(items.filter(item => item.id !== id));
                    }
                }
            ]
        );
    };

    const renderPortfolioItem = (item: PortfolioItem) => (
        <View key={item.id} style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
            <View style={styles.itemOverlay}>
                <View style={styles.itemHeader}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{item.category}</Text>
                    </View>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity onPress={() => openEditModal(item)} style={styles.actionButton}>
                            <MaterialIcons name="edit" size={18} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.actionButton, { backgroundColor: '#FF4444' }]}>
                            <MaterialIcons name="delete" size={18} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.itemFooter}>
                    <View>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemDate}>{item.date}</Text>
                    </View>
                    <View style={styles.likesContainer}>
                        <MaterialIcons name="favorite" size={16} color="white" />
                        <Text style={styles.likesText}>{item.likes}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="light" backgroundColor={COLORS.primary} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Portfolio</Text>
                <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
                    <MaterialIcons name="add" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <MaterialIcons name="person" size={40} color={COLORS.onPrimary} />
                    </View>
                    <View style={{ marginLeft: 16 }}>
                        <Text style={styles.profileName}>Adebayo Oluwaseun</Text>
                        <Text style={styles.profileRole}>Master Carpenter & Welder</Text>
                    </View>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{items.length}</Text>
                        <Text style={styles.statLabel}>Projects</Text>
                    </View>
                    <View style={styles.verticalDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{items.reduce((acc, curr) => acc + curr.likes, 0)}</Text>
                        <Text style={styles.statLabel}>Likes</Text>
                    </View>
                    <View style={styles.verticalDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>4.9</Text>
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Recent Projects</Text>

                {items.map(renderPortfolioItem)}

                <View style={{ height: hp(5) }} />

            </ScrollView>

            {/* Add/Edit Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalOverlay}
                >
                    <View style={styles.modalContent}>
                        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>{isEditing ? 'Edit Project' : 'New Project'}</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <MaterialIcons name="close" size={24} color={COLORS.textSecondary} />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.label}>Project Title</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Modern Bookshelf"
                                value={title}
                                onChangeText={setTitle}
                            />

                            <Text style={styles.label}>Category</Text>
                            <TouchableOpacity
                                style={[styles.input, styles.dropdownInput]}
                                onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                            >
                                <Text style={category ? { color: COLORS.textPrimary } : { color: '#9CA3AF' }}>
                                    {category || 'Select Category'}
                                </Text>
                                <MaterialIcons name={showCategoryDropdown ? "arrow-drop-up" : "arrow-drop-down"} size={24} color={COLORS.textSecondary} />
                            </TouchableOpacity>

                            {showCategoryDropdown && (
                                <View style={styles.dropdownList}>
                                    {CATEGORIES.map((cat) => (
                                        <TouchableOpacity
                                            key={cat}
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                                setCategory(cat);
                                                setShowCategoryDropdown(false);
                                            }}
                                        >
                                            <Text style={styles.dropdownText}>{cat}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            <Text style={styles.label}>Project Photo</Text>
                            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                                {image ? (
                                    <Image source={{ uri: image }} style={styles.pickedImage} />
                                ) : (
                                    <View style={styles.imagePlaceholder}>
                                        <MaterialIcons name="add-photo-alternate" size={40} color={COLORS.textSecondary} />
                                        <Text style={styles.imagePlaceholderText}>Tap to add photo</Text>
                                    </View>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>Save Project</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
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
    addButton: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.onPrimary,
    },
    content: {
        padding: wp(4),
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileName: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    profileRole: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        elevation: 1,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    verticalDivider: {
        width: 1,
        height: '100%',
        backgroundColor: COLORS.border,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 16,
    },
    itemCard: {
        height: hp(30),
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        position: 'relative',
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    itemOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 16,
        justifyContent: 'space-between',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    categoryBadge: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    categoryText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '700',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
        borderRadius: 20,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    itemTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    itemDate: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
    },
    likesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    likesText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        paddingBottom: hp(5),
        maxHeight: '90%', // Limit height to ensure it fits screen
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: COLORS.background,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        color: COLORS.textPrimary,
    },
    dropdownInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownList: {
        backgroundColor: COLORS.background,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginTop: -10,
        marginBottom: 16,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    dropdownText: {
        color: COLORS.textPrimary,
    },
    imagePicker: {
        height: 150,
        marginBottom: 24,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickedImage: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        alignItems: 'center',
    },
    imagePlaceholderText: {
        marginTop: 8,
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    }
});
