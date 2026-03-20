import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Built into Expo

// 1. Define Props Interface
interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  onConfirm?: () => void; // Optional: for actions like "Delete" or "Logout"
  confirmText?: string;   // Custom text for the button
}

const { width } = Dimensions.get('window');

const CustomAlert: React.FC<CustomAlertProps> = ({ 
  visible, 
  title, 
  message, 
  type = 'info', 
  onClose, 
  onConfirm,
  confirmText = 'OK'
}) => {

  // 2. Dynamic Styles based on Alert Type
  const getIcon = () => {
    switch (type) {
      case 'success': return { name: 'checkmark-circle', color: '#10B981' }; // Green
      case 'error': return { name: 'alert-circle', color: '#EF4444' };    // Red
      case 'warning': return { name: 'warning', color: '#F59E0B' };      // Orange
      default: return { name: 'information-circle', color: '#3B82F6' };  // Blue
    }
  };

  const iconData = getIcon();

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          
          {/* Icon Header */}
          <View style={styles.iconContainer}>
            <Ionicons name={iconData.name as any} size={50} color={iconData.color} />
          </View>

          {/* Text Content */}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {/* If onConfirm exists, show Cancel button too */}
            {onConfirm && (
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={onClose}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={[
                styles.button, 
                { backgroundColor: iconData.color, flex: onConfirm ? 1 : 0.5 }
              ]} 
              onPress={onConfirm || onClose}
            >
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent dark background
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 100,
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelText: {
    color: '#4B5563',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomAlert;