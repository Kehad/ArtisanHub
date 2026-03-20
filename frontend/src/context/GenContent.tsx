import React, { createContext, useContext, useState, useCallback } from 'react';
import CustomAlert from 'src/components/alert/Alert';
// Verify this path

interface AlertConfig {
  visible: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onConfirm?: () => void;
  confirmText?: string;
}

interface GeneralContextType {
  showAlert: (title: string, message: string, type?: AlertConfig['type']) => void;
  showConfirm: (title: string, message: string, onConfirm: () => void) => void;
  hideAlert: () => void;
}

const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

export const GeneralProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alertConfig, setAlertConfig] = useState<AlertConfig>({
    visible: false,
    title: '',
    message: '',
    type: 'info',
  });

  // 1. Simple Alert (Success/Error/Info)
  const showAlert = useCallback((title: string, message: string, type: AlertConfig['type'] = 'info') => {
    setAlertConfig({
      visible: true,
      title,
      message,
      type,
      onConfirm: undefined, // No confirm action needed
    });
  }, []);

  // 2. Confirmation Dialog (e.g., "Are you sure?")
  const showConfirm = useCallback((title: string, message: string, onConfirm: () => void) => {
    setAlertConfig({
      visible: true,
      title,
      message,
      type: 'warning',
      confirmText: 'Confirm',
      onConfirm: () => {
        onConfirm();
        hideAlert(); // Auto-close after confirm
      },
    });
  }, []);

  const hideAlert = useCallback(() => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <GeneralContext.Provider value={{ showAlert, showConfirm, hideAlert }}>
      {children}
      
      {/* GLOBAL RENDER: The alert lives here, so you don't need to add it to screens */}
      <CustomAlert 
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onClose={hideAlert}
        onConfirm={alertConfig.onConfirm}
        confirmText={alertConfig.confirmText}
      />
    </GeneralContext.Provider>
  );
};

// Hook for easy access
export const useGeneral = () => {
  const context = useContext(GeneralContext);
  if (!context) throw new Error("useGeneral must be used within an GeneralProvider");
  return context;
};