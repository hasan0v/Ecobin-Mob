/**
 * Theme System - Main Export
 * Consolidates all design tokens and provides theme context
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, shadows, iconSize } from './spacing';

export const lightTheme = {
  dark: false,
  colors: {
    primary: colors.primary,
    primaryDark: colors.primaryDark,
    primaryLight: colors.primaryLight,
    secondary: colors.secondary,
    accent: colors.accent,
    
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
    
    statusGood: colors.statusGood,
    statusWarning: colors.statusWarning,
    statusCritical: colors.statusCritical,
    
    accentRed: colors.accentRed,
    accentBlue: colors.accentBlue,
    
    background: colors.light.background,
    backgroundAlt: colors.light.backgroundAlt,
    surface: colors.light.surface,
    surfaceAlt: colors.light.surfaceAlt,
    border: colors.light.border,
    borderLight: colors.light.borderLight,
    
    textPrimary: colors.light.text.primary,
    textSecondary: colors.light.text.secondary,
    textMuted: colors.light.text.muted,
    textDisabled: colors.light.text.disabled,
    
    charts: colors.charts,
    opacity: colors.opacity,
  },
  typography,
  spacing,
  borderRadius,
  shadows,
  iconSize,
};

export const darkTheme = {
  dark: true,
  colors: {
    primary: colors.primary,
    primaryDark: colors.primaryDark,
    primaryLight: colors.primaryLight,
    secondary: colors.secondary,
    accent: colors.accent,
    
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
    
    statusGood: colors.statusGood,
    statusWarning: colors.statusWarning,
    statusCritical: colors.statusCritical,
    
    accentRed: colors.accentRed,
    accentBlue: colors.accentBlue,
    
    background: colors.dark.background,
    backgroundAlt: colors.dark.backgroundAlt,
    surface: colors.dark.surface,
    surfaceAlt: colors.dark.surfaceAlt,
    border: colors.dark.border,
    borderDark: colors.dark.borderDark,
    
    textPrimary: colors.dark.text.primary,
    textSecondary: colors.dark.text.secondary,
    textMuted: colors.dark.text.muted,
    textDisabled: colors.dark.text.disabled,
    
    charts: colors.charts,
    opacity: colors.opacity,
  },
  typography,
  spacing,
  borderRadius,
  shadows,
  iconSize,
};

export type Theme = typeof lightTheme;

// Export all token modules for direct access
export { colors, typography, spacing, borderRadius, shadows, iconSize };
