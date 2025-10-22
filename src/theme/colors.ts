/**
 * Color Tokens - Extracted from HTML Design Files
 * 
 * Primary colors from different screens:
 * - Splash/Compost/Registration: #19e624 (bright green)
 * - Dashboard/Login: #4CAF50 (material green)
 * 
 * Using #16A34A (leaf green) as consolidated primary for better consistency
 */

export const colors = {
  // Primary Brand Colors
  primary: '#16A34A', // Leaf green - main brand color
  primaryDark: '#0E7A3C', // Darker variant
  primaryLight: '#19e624', // Bright green accent
  
  // Secondary Colors
  secondary: '#A1887F', // Warm brown/tan
  accent: '#10B981', // Teal mint accent
  
  // Status Colors
  success: '#22C55E', // Green - success states
  warning: '#F59E0B', // Amber - warnings
  error: '#E11D48', // Red - errors
  info: '#2563EB', // Blue - informational
  
  // Status Variants (from HTML)
  statusGood: '#66BB6A',
  statusWarning: '#FFCA28',
  statusCritical: '#EF5350',
  
  // Accent Colors (from Compost screen)
  accentRed: '#F44336',
  accentBlue: '#2196F3',
  
  // Light Theme
  light: {
    background: '#F6F8F6', // Main background
    backgroundAlt: '#F5F5F5', // Alternative background
    surface: '#FFFFFF', // Cards and elevated surfaces
    surfaceAlt: '#E7F3E8', // Alternative surface
    border: '#E5E7EB', // Borders
    borderLight: '#D0E7D1', // Light borders
    text: {
      primary: '#0E1B0F', // Main text
      secondary: '#333333', // Secondary text
      muted: '#616161', // Muted text
      disabled: '#9CA3AF', // Disabled text
    },
  },
  
  // Dark Theme
  dark: {
    background: '#112112', // Main background
    backgroundAlt: '#0F1724', // Alternative background
    surface: '#1A2E1A', // Cards and elevated surfaces
    surfaceAlt: '#1E1E1E', // Alternative surface
    border: '#2A4F2A', // Borders
    borderDark: '#2A2A2A', // Dark borders
    text: {
      primary: '#E0F2E0', // Main text
      secondary: '#E3F4E4', // Secondary text
      muted: '#B3B3B3', // Muted text
      disabled: '#6B7280', // Disabled text
    },
  },
  
  // Chart Colors (gradients)
  charts: {
    green: ['#16A34A', '#22C55E', '#4ADE80'],
    blue: ['#0EA5E9', '#2563EB', '#3B82F6'],
    amber: ['#F59E0B', '#FBBF24', '#FCD34D'],
    red: ['#E11D48', '#EF4444', '#F87171'],
  },
  
  // Opacity Variants
  opacity: {
    primary10: 'rgba(22, 163, 74, 0.1)',
    primary20: 'rgba(22, 163, 74, 0.2)',
    primary30: 'rgba(22, 163, 74, 0.3)',
    white30: 'rgba(255, 255, 255, 0.3)',
    black40: 'rgba(0, 0, 0, 0.4)',
  },
};

export type Colors = typeof colors;
