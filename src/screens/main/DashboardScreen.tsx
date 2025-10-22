import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Card } from '../../components/ui/Card';

const { width } = Dimensions.get('window');

interface DashboardScreenProps {
  onNavigateToCompost: () => void;
  onNavigateToWater: () => void;
  onNavigateToSoil: () => void;
  onNavigateToAI: () => void;
  onNavigateToEducation: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigateToCompost,
  onNavigateToWater,
  onNavigateToSoil,
  onNavigateToAI,
  onNavigateToEducation,
}) => {
  const [userName] = useState('Əli');
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? 'Sabahınız xeyir'
      : currentHour < 18
      ? 'Gününüz xeyir'
      : 'Axşamınız xeyir';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>{greeting}</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.headerIcon}>🔔</Text>
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.headerIcon}>📊</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.avatar}>
              <Text style={styles.avatarText}>Ə</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weather Widget */}
        <Card style={styles.weatherCard}>
          <View style={styles.weatherHeader}>
            <View>
              <Text style={styles.weatherLocation}>📍 Bakı, Azərbaycan</Text>
              <Text style={styles.weatherDate}>
                {new Date().toLocaleDateString('az-AZ', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </Text>
            </View>
            <View style={styles.weatherMain}>
              <Text style={styles.weatherIcon}>☀️</Text>
              <Text style={styles.weatherTemp}>24°C</Text>
            </View>
          </View>
          <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailItem}>
              <Text style={styles.weatherDetailIcon}>💧</Text>
              <Text style={styles.weatherDetailLabel}>Nəmlik</Text>
              <Text style={styles.weatherDetailValue}>65%</Text>
            </View>
            <View style={styles.weatherDetailItem}>
              <Text style={styles.weatherDetailIcon}>💨</Text>
              <Text style={styles.weatherDetailLabel}>Külək</Text>
              <Text style={styles.weatherDetailValue}>12 km/s</Text>
            </View>
            <View style={styles.weatherDetailItem}>
              <Text style={styles.weatherDetailIcon}>🌧️</Text>
              <Text style={styles.weatherDetailLabel}>Yağış</Text>
              <Text style={styles.weatherDetailValue}>20%</Text>
            </View>
          </View>

          {/* 5-Day Forecast */}
          <View style={styles.forecast}>
            <Text style={styles.forecastTitle}>5 günlük proqnoz</Text>
            <View style={styles.forecastDays}>
              {['B.e', 'Ç.a', 'Ç', 'C.a', 'C'].map((day, index) => (
                <View key={index} style={styles.forecastDay}>
                  <Text style={styles.forecastDayText}>{day}</Text>
                  <Text style={styles.forecastIcon}>
                    {index === 0 ? '☀️' : index === 1 ? '🌤️' : index === 2 ? '☁️' : '🌧️'}
                  </Text>
                  <Text style={styles.forecastTemp}>
                    {24 - index}°/{18 - index}°
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Card>

        {/* Quick Stats Grid */}
        <View style={styles.statsGrid}>
          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: colors.primary + '15' }]}
            onPress={onNavigateToCompost}
          >
            <Text style={styles.statIcon}>♻️</Text>
            <Text style={styles.statLabel}>Kompost</Text>
            <Text style={[styles.statValue, { color: colors.primary }]}>65%</Text>
            <Text style={styles.statSubtext}>3 gün qalıb</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: colors.info + '15' }]}
            onPress={onNavigateToWater}
          >
            <Text style={styles.statIcon}>💧</Text>
            <Text style={styles.statLabel}>Su Tutumu</Text>
            <Text style={[styles.statValue, { color: colors.info }]}>850L</Text>
            <Text style={styles.statSubtext}>Yağış suyu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: colors.warning + '15' }]}
          >
            <Text style={styles.statIcon}>🌡️</Text>
            <Text style={styles.statLabel}>EcoBin Temp</Text>
            <Text style={[styles.statValue, { color: colors.warning }]}>65°C</Text>
            <Text style={styles.statSubtext}>Optimal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: colors.accent + '15' }]}
            onPress={onNavigateToSoil}
          >
            <Text style={styles.statIcon}>🌱</Text>
            <Text style={styles.statLabel}>Torpaq pH</Text>
            <Text style={[styles.statValue, { color: colors.accent }]}>6.8</Text>
            <Text style={styles.statSubtext}>Sağlam</Text>
          </TouchableOpacity>
        </View>

        {/* Alerts & Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bildirişlər və Xəbərdarlıqlar</Text>
          <Card style={styles.alertCard}>
            <View style={styles.alertItem}>
              <View style={[styles.alertIcon, { backgroundColor: colors.success + '20' }]}>
                <Text>✓</Text>
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>Kompost qarışdırma tamamlandı</Text>
                <Text style={styles.alertTime}>15 dəqiqə əvvəl</Text>
              </View>
            </View>
          </Card>

          <Card style={styles.alertCard}>
            <View style={styles.alertItem}>
              <View style={[styles.alertIcon, { backgroundColor: colors.warning + '20' }]}>
                <Text>⚠️</Text>
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>Su səviyyəsi aşağıdır (25%)</Text>
                <Text style={styles.alertTime}>1 saat əvvəl</Text>
              </View>
            </View>
          </Card>

          <Card style={styles.alertCard}>
            <View style={styles.alertItem}>
              <View style={[styles.alertIcon, { backgroundColor: colors.info + '20' }]}>
                <Text>💡</Text>
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>Yeni AI tövsiyəsi mövcuddur</Text>
                <Text style={styles.alertTime}>2 saat əvvəl</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Featured Learning */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tövsiyə olunan təlimlər</Text>
            <TouchableOpacity onPress={onNavigateToEducation}>
              <Text style={styles.seeAllLink}>Hamısına bax →</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Card style={styles.learningCard}>
              <View style={styles.learningThumbnail}>
                <Text style={styles.learningThumbnailIcon}>📹</Text>
              </View>
              <Text style={styles.learningTitle}>Kompost Prosesinin Əsasları</Text>
              <Text style={styles.learningDuration}>⏱ 12 dəqiqə</Text>
            </Card>

            <Card style={styles.learningCard}>
              <View style={styles.learningThumbnail}>
                <Text style={styles.learningThumbnailIcon}>📹</Text>
              </View>
              <Text style={styles.learningTitle}>Su Qənaətinin Yolları</Text>
              <Text style={styles.learningDuration}>⏱ 8 dəqiqə</Text>
            </Card>

            <Card style={styles.learningCard}>
              <View style={styles.learningThumbnail}>
                <Text style={styles.learningThumbnailIcon}>📹</Text>
              </View>
              <Text style={styles.learningTitle}>Torpaq Sağlamlığı</Text>
              <Text style={styles.learningDuration}>⏱ 15 dəqiqə</Text>
            </Card>
          </ScrollView>
        </View>

        {/* AI Assistant CTA */}
        <TouchableOpacity style={styles.aiCta} onPress={onNavigateToAI}>
          <View style={styles.aiCtaIcon}>
            <Text style={styles.aiCtaIconText}>🤖</Text>
          </View>
          <View style={styles.aiCtaContent}>
            <Text style={styles.aiCtaTitle}>AI Köməkçi ilə danış</Text>
            <Text style={styles.aiCtaSubtitle}>
              Suallarınızı verin və ağıllı tövsiyələr alın
            </Text>
          </View>
          <Text style={styles.aiCtaArrow}>→</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing['4xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuButton: {
    padding: spacing.sm,
  },
  menuIcon: {
    fontSize: 24,
    color: colors.light.text.primary,
  },
  greetingContainer: {},
  greeting: {
    ...typography.variants.bodySmall,
    color: colors.light.text.muted,
  },
  userName: {
    ...typography.variants.h3,
    color: colors.light.text.primary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconButton: {
    position: 'relative',
    padding: spacing.sm,
  },
  headerIcon: {
    fontSize: 22,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...typography.variants.label,
    color: colors.light.surface,
    fontWeight: '700',
  },
  weatherCard: {
    marginHorizontal: spacing.base,
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.base,
  },
  weatherLocation: {
    ...typography.variants.label,
    color: colors.light.text.primary,
    marginBottom: spacing.xs,
  },
  weatherDate: {
    ...typography.variants.bodySmall,
    color: colors.light.text.muted,
  },
  weatherMain: {
    alignItems: 'center',
  },
  weatherIcon: {
    fontSize: 48,
    marginBottom: spacing.xs,
  },
  weatherTemp: {
    ...typography.variants.h2,
    color: colors.light.text.primary,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.light.border,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
    marginBottom: spacing.base,
  },
  weatherDetailItem: {
    alignItems: 'center',
  },
  weatherDetailIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  weatherDetailLabel: {
    ...typography.variants.caption,
    color: colors.light.text.muted,
    marginBottom: spacing.xxs,
  },
  weatherDetailValue: {
    ...typography.variants.label,
    color: colors.light.text.primary,
  },
  forecast: {},
  forecastTitle: {
    ...typography.variants.label,
    color: colors.light.text.primary,
    marginBottom: spacing.md,
  },
  forecastDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forecastDay: {
    alignItems: 'center',
  },
  forecastDayText: {
    ...typography.variants.caption,
    color: colors.light.text.muted,
    marginBottom: spacing.xs,
  },
  forecastIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  forecastTemp: {
    ...typography.variants.captionBold,
    color: colors.light.text.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.base,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    width: (width - spacing.base * 2 - spacing.md) / 2,
    padding: spacing.base,
    borderRadius: borderRadius.card,
    ...shadows.sm,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  statLabel: {
    ...typography.variants.bodySmall,
    color: colors.light.text.secondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.variants.h2,
    marginBottom: spacing.xxs,
  },
  statSubtext: {
    ...typography.variants.caption,
    color: colors.light.text.muted,
  },
  section: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.variants.h3,
    color: colors.light.text.primary,
  },
  seeAllLink: {
    ...typography.variants.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  alertCard: {
    marginBottom: spacing.md,
    padding: spacing.base,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    ...typography.variants.body,
    color: colors.light.text.primary,
    marginBottom: spacing.xxs,
  },
  alertTime: {
    ...typography.variants.caption,
    color: colors.light.text.muted,
  },
  learningCard: {
    width: 160,
    marginRight: spacing.md,
    padding: spacing.md,
  },
  learningThumbnail: {
    width: '100%',
    height: 90,
    backgroundColor: colors.light.backgroundAlt,
    borderRadius: borderRadius.base,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  learningThumbnailIcon: {
    fontSize: 40,
  },
  learningTitle: {
    ...typography.variants.bodySmall,
    color: colors.light.text.primary,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  learningDuration: {
    ...typography.variants.caption,
    color: colors.light.text.muted,
  },
  aiCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: spacing.base,
    padding: spacing.base,
    borderRadius: borderRadius.card,
    ...shadows.md,
  },
  aiCtaIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.light.surface,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  aiCtaIconText: {
    fontSize: 28,
  },
  aiCtaContent: {
    flex: 1,
  },
  aiCtaTitle: {
    ...typography.variants.label,
    color: colors.light.surface,
    marginBottom: spacing.xxs,
  },
  aiCtaSubtitle: {
    ...typography.variants.caption,
    color: colors.light.surface,
    opacity: 0.9,
  },
  aiCtaArrow: {
    ...typography.variants.h3,
    color: colors.light.surface,
  },
});
