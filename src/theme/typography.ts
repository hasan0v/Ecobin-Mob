/**
 * Typography System - Based on Inter font family from HTML designs
 * Font weights: 400, 500, 600, 700, 800 (from HTML link tags)
 * Scale: 12, 14, 16, 20, 24, 32 (standard mobile scale)
 */

export const typography = {
  // Font Families
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    extrabold: 'Inter-ExtraBold',
  },
  
  // Font Weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  // Text Variants (ready-to-use styles)
  variants: {
    // Headings
    h1: {
      fontSize: 32,
      lineHeight: 38.4, // 1.2
      fontWeight: '700' as const,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 24,
      lineHeight: 28.8, // 1.2
      fontWeight: '700' as const,
      letterSpacing: -0.25,
    },
    h3: {
      fontSize: 20,
      lineHeight: 24, // 1.2
      fontWeight: '600' as const,
      letterSpacing: 0,
    },
    h4: {
      fontSize: 18,
      lineHeight: 21.6, // 1.2
      fontWeight: '600' as const,
      letterSpacing: 0,
    },
    
    // Body Text
    bodyLarge: {
      fontSize: 18,
      lineHeight: 27, // 1.5
      fontWeight: '400' as const,
      letterSpacing: 0,
    },
    body: {
      fontSize: 16,
      lineHeight: 24, // 1.5
      fontWeight: '400' as const,
      letterSpacing: 0,
    },
    bodySmall: {
      fontSize: 14,
      lineHeight: 21, // 1.5
      fontWeight: '400' as const,
      letterSpacing: 0,
    },
    
    // Subtitle/Label
    subtitle: {
      fontSize: 16,
      lineHeight: 24, // 1.5
      fontWeight: '500' as const,
      letterSpacing: 0.1,
    },
    label: {
      fontSize: 14,
      lineHeight: 21, // 1.5
      fontWeight: '500' as const,
      letterSpacing: 0.1,
    },
    
    // Caption
    caption: {
      fontSize: 12,
      lineHeight: 18, // 1.5
      fontWeight: '400' as const,
      letterSpacing: 0.4,
    },
    captionBold: {
      fontSize: 12,
      lineHeight: 18, // 1.5
      fontWeight: '600' as const,
      letterSpacing: 0.4,
    },
    
    // Button Text
    button: {
      fontSize: 16,
      lineHeight: 24, // 1.5
      fontWeight: '700' as const,
      letterSpacing: 0.5,
      textTransform: 'uppercase' as const,
    },
    buttonSmall: {
      fontSize: 14,
      lineHeight: 21, // 1.5
      fontWeight: '600' as const,
      letterSpacing: 0.4,
    },
  },
};

export type Typography = typeof typography;
