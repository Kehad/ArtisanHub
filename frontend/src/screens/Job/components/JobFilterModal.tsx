import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, hp } from 'components/utils';

interface JobFilterModalProps {
    visible: boolean;
    onClose: () => void;
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export const JobFilterModal: React.FC<JobFilterModalProps> = ({
    visible,
    onClose,
    categories,
    selectedCategory,
    onSelectCategory,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Filter Jobs</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <MaterialIcons name="close" size={24} color={COLORS.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.filterOptions}>
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.filterOption,
                                    selectedCategory === cat && styles.selectedFilterOption
                                ]}
                                onPress={() => {
                                    onSelectCategory(cat);
                                    onClose();
                                }}
                            >
                                <Text style={[
                                    styles.filterOptionText,
                                    selectedCategory === cat && styles.selectedFilterOptionText
                                ]}>{cat}</Text>
                                {selectedCategory === cat && (
                                    <View style={styles.checkCircle}>
                                        <MaterialIcons name="check" size={14} color="white" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
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
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    closeButton: {
        padding: 4,
        backgroundColor: COLORS.background,
        borderRadius: 20,
    },
    filterOptions: {
        gap: 12,
    },
    filterOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    selectedFilterOption: {
        backgroundColor: COLORS.primary + '10', // 10% opacity
        borderColor: COLORS.primary,
    },
    filterOptionText: {
        fontSize: 16,
        color: COLORS.textPrimary,
        fontWeight: '500',
    },
    selectedFilterOptionText: {
        color: COLORS.primary,
        fontWeight: '700',
    },
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
