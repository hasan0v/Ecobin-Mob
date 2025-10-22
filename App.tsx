/**
 * EcoBin Mobile App - Main Entry Point
 * Foundation Demo with Theme Integration
 */

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import { lightTheme } from './src/theme';
import { Button } from './src/components/ui/Button';
import { Card } from './src/components/ui/Card';

export default function App() {
  const theme = lightTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          🌱 EcoBin
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Smart Farming, Sustainable Future
        </Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Card style={styles.card}>
          <Text style={[styles.cardTitle, { color: theme.colors.textPrimary }]}>
            Foundation Complete ✅
          </Text>
          <Text style={[styles.cardText, { color: theme.colors.textSecondary }]}>
            The EcoBin mobile app foundation is ready with:
          </Text>
          <View style={styles.featureList}>
            <Text style={[styles.featureItem, { color: theme.colors.textSecondary }]}>
              ✓ Design System (50+ tokens)
            </Text>
            <Text style={[styles.featureItem, { color: theme.colors.textSecondary }]}>
              ✓ TypeScript Data Models (20+)
            </Text>
            <Text style={[styles.featureItem, { color: theme.colors.textSecondary }]}>
              ✓ API & MQTT Services
            </Text>
            <Text style={[styles.featureItem, { color: theme.colors.textSecondary }]}>
              ✓ UI Components Library
            </Text>
          </View>
        </Card>

        <Card style={[styles.card, styles.statsCard]}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>866</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>
                Packages
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.success }]}>20+</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>
                Models
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.accent }]}>50+</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>
                Tokens
              </Text>
            </View>
          </View>
        </Card>

        {/* Demo Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Primary Button"
            onPress={() => console.log('Primary pressed')}
            variant="primary"
            fullWidth
          />
          <Button
            title="Secondary Button"
            onPress={() => console.log('Secondary pressed')}
            variant="secondary"
            fullWidth
          />
          <Button
            title="Outline Button"
            onPress={() => console.log('Outline pressed')}
            variant="outline"
            fullWidth
          />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.textMuted }]}>
          React Native + Expo SDK 52
        </Text>
        <Text style={[styles.footerText, { color: theme.colors.textMuted }]}>
          GitHub: hasan0v/Ecobin-Mob
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 24,
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    lineHeight: 20,
  },
  statsCard: {
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  buttonContainer: {
    gap: 12,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
  },
});
