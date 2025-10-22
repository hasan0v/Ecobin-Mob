/**
 * Spacing System - 4pt grid system
 * Based on standard mobile spacing conventions
 */

export const spacing = {
  // Base spacing values
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
  '6xl': 80,
  
  // Component-specific spacing
  component: {
    buttonPaddingVertical: 12,
    buttonPaddingHorizontal: 24,
    cardPadding: 16,
    screenPadding: 16,
    sectionGap: 24,
  },
};

/**
 * Border Radius - From HTML designs
 * DEFAULT: 0.25rem (4px) to 0.5rem (8px)
 * lg: 0.5rem (8px) to 0.75rem (12px)
 * xl: 0.75rem (12px) to 1rem (16px)
 * full: 9999px
 */
export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
  
  // Component-specific
  button: 12,
  card: 12,
  input: 8,
  modal: 20,
  chip: 9999,
};

/**
 * Elevation/Shadow System
 * Subtle shadows for mobile
 */
export const shadows = {
  none: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
};

/**
 * Icon Sizes
 */
export const iconSize = {
  xs: 16,
  sm: 20,
  base: 24,
  md: 28,
  lg: 32,
  xl: 40,
  '2xl': 48,
  '3xl': 64,
};

export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type IconSize = typeof iconSize;
