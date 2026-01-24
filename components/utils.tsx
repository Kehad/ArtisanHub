import { Dimensions } from "react-native";

// --- UTILS (Mimicking Sizer) ---
const { width, height } = Dimensions.get('window');
export const wp = (percentage: number) => (width * percentage) / 100;
export const hp = (percentage: number) => (height * percentage) / 100;

// --- THEME CONSTANTS ---
export const COLORS = {
  primary: '#0F172A', // Slate 900 - Strong, Professional
  onPrimary: '#FFFFFF',
  secondary: '#EA580C', // Orange 600 - Vibrant, Action-oriented
  tertiary: '#0EA5E9', // Sky 500 - Modern, Tech
  surface: '#FFFFFF',
  background: '#F8FAFC', // Slate 50
  textPrimary: '#0F172A',
  textSecondary: '#64748B', // Slate 500
  border: '#E2E8F0', // Slate 200
  error: '#DC2626', // Red 600
  success: '#059669', // Emerald 600
};