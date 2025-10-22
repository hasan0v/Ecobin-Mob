import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { colors, typography, spacing } from '../../theme';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    // Auto-navigate after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryLight, '#0E7A3C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🌱</Text>
          <Text style={styles.brandName}>EcoBin</Text>
          <Text style={styles.tagline}>Smart Farming, Sustainable Future</Text>
        </View>

        {/* Loading Animation */}
        <View style={styles.loadingContainer}>
          <View style={styles.loadingDots}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by AI & IoT</Text>
          <Text style={styles.version}>v1.0.0</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing['6xl'],
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 120,
    marginBottom: spacing.xl,
  },
  brandName: {
    ...typography.variants.h1,
    fontSize: 48,
    fontWeight: '800',
    color: colors.light.surface,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  tagline: {
    ...typography.variants.body,
    color: colors.light.surface,
    opacity: 0.9,
    textAlign: 'center',
    paddingHorizontal: spacing['2xl'],
  },
  loadingContainer: {
    marginBottom: spacing['4xl'],
  },
  loadingDots: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.light.surface,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    ...typography.variants.caption,
    color: colors.light.surface,
    opacity: 0.8,
    marginBottom: spacing.xs,
  },
  version: {
    ...typography.variants.caption,
    color: colors.light.surface,
    opacity: 0.6,
  },
});
