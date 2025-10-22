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
import Svg, { Circle } from 'react-native-svg';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const { width } = Dimensions.get('window');

interface CompostMonitoringScreenProps {
  onNavigateBack: () => void;
}

export const CompostMonitoringScreen: React.FC<CompostMonitoringScreenProps> = ({
  onNavigateBack,
}) => {
  const [compostProgress] = useState(65);
  const [daysRemaining] = useState(3);

  // Circular progress calculation
  const circleSize = 200;
  const strokeWidth = 16;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (compostProgress / 100) * circumference;

  const handleStop = () => {
    alert('Kompost prosesi dayandırılır...');
  };

  const handleMix = () => {
    alert('Kompost qarışdırılır...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kompost Monitorinqi</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.headerIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Circular Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.circularProgress}>
            <Svg width={circleSize} height={circleSize}>
              {/* Background Circle */}
              <Circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                stroke={colors.light.border}
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Progress Circle */}
              <Circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                stroke={colors.primary}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                strokeLinecap="round"
                rotation="-90"
                origin={`${circleSize / 2}, ${circleSize / 2}`}
              />
            </Svg>
            <View style={styles.progressCenter}>
              <Text style={styles.progressPercentage}>{compostProgress}%</Text>
              <Text style={styles.progressLabel}>Tamamlanıb</Text>
            </View>
          </View>

          {/* Days Remaining */}
          <View style={styles.daysRemaining}>
            <Text style={styles.daysRemainingLabel}>Təxmini</Text>
            <Text style={styles.daysRemainingValue}>
              {daysRemaining} gün qalıb
            </Text>
          </View>
        </View>

        {/* Sensor Data Grid */}
        <View style={styles.sensorGrid}>
          <Card style={[styles.sensorCard, { backgroundColor: colors.primary + '15' }]}>
            <View style={styles.sensorHeader}>
              <Text style={styles.sensorIcon}>⚖️</Text>
              <View style={styles.trendBadge}>
                <Text style={styles.trendText}>↑</Text>
              </View>
            </View>
            <Text style={styles.sensorLabel}>Çəki</Text>
            <Text style={[styles.sensorValue, { color: colors.primary }]}>50.2</Text>
            <Text style={styles.sensorUnit}>kg</Text>
          </Card>

          <Card style={[styles.sensorCard, { backgroundColor: colors.warning + '15' }]}>
            <View style={styles.sensorHeader}>
              <Text style={styles.sensorIcon}>🌡️</Text>
              <View style={styles.trendBadge}>
                <Text style={styles.trendText}>↑</Text>
              </View>
            </View>
            <Text style={styles.sensorLabel}>Temperatur</Text>
            <Text style={[styles.sensorValue, { color: colors.warning }]}>65</Text>
            <Text style={styles.sensorUnit}>°C</Text>
          </Card>

          <Card style={[styles.sensorCard, { backgroundColor: colors.info + '15' }]}>
            <View style={styles.sensorHeader}>
              <Text style={styles.sensorIcon}>💨</Text>
              <View style={[styles.trendBadge, { backgroundColor: colors.light.border }]}>
                <Text style={[styles.trendText, { color: colors.light.text.muted }]}>
                  —
                </Text>
              </View>
            </View>
            <Text style={styles.sensorLabel}>CO₂</Text>
            <Text style={[styles.sensorValue, { color: colors.info }]}>800</Text>
            <Text style={styles.sensorUnit}>ppm</Text>
          </Card>

          <Card style={[styles.sensorCard, { backgroundColor: colors.accent + '15' }]}>
            <View style={styles.sensorHeader}>
              <Text style={styles.sensorIcon}>💧</Text>
              <View style={[styles.trendBadge, { backgroundColor: colors.error + '20' }]}>
                <Text style={[styles.trendText, { color: colors.error }]}>↓</Text>
              </View>
            </View>
            <Text style={styles.sensorLabel}>Nəmlik</Text>
            <Text style={[styles.sensorValue, { color: colors.accent }]}>60</Text>
            <Text style={styles.sensorUnit}>%</Text>
          </Card>
        </View>

        {/* Control Buttons */}
        <View style={styles.controlButtons}>
          <Button
            title="DAYAN"
            variant="danger"
            size="large"
            fullWidth
            onPress={handleStop}
            style={styles.stopButton}
          />
          <Button
            title="Kompostu qarışdır"
            variant="outline"
            size="large"
            fullWidth
            onPress={handleMix}
          />
        </View>

        {/* Next Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Növbəti Addımlar</Text>
          <Card style={styles.actionCard}>
            <View style={styles.timeline}>
              <View style={styles.timelineItem}>
                <View style={[styles.timelineDot, { backgroundColor: colors.primary }]} />
                <View style={styles.timelineContent}>
                  <Text style={styles.actionTitle}>Qarışdırma</Text>
                  <Text style={styles.actionTime}>Bu gün, 18:00</Text>
                  <Text style={styles.actionDescription}>
                    Optimal oksigen təchizatı üçün kompostu qarışdırın
                  </Text>
                </View>
              </View>

              <View style={styles.timelineItem}>
                <View style={[styles.timelineDot, { backgroundColor: colors.info }]} />
                <View style={styles.timelineContent}>
                  <Text style={styles.actionTitle}>Nəmlik yoxlanışı</Text>
                  <Text style={styles.actionTime}>Sabah, 10:00</Text>
                  <Text style={styles.actionDescription}>
                    Nəmlik səviyyəsini ölçün və lazım gələrsə su əlavə edin
                  </Text>
                </View>
              </View>

              <View style={styles.timelineItem}>
                <View
                  style={[styles.timelineDot, { backgroundColor: colors.light.border }]}
                />
                <View style={styles.timelineContent}>
                  <Text style={styles.actionTitle}>Temperatur monitorinqi</Text>
                  <Text style={styles.actionTime}>2 gün sonra</Text>
                  <Text style={styles.actionDescription}>
                    Termofilik fazanın tamamlanması üçün temperaturu izləyin
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        </View>

        {/* Stage Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cari Mərhələ: Termofilik</Text>
          <Card style={styles.stageCard}>
            <View style={styles.stageHeader}>
              <Text style={styles.stageIcon}>🔥</Text>
              <View style={styles.stageInfo}>
                <Text style={styles.stageName}>Termofilik Faza</Text>
                <Text style={styles.stageDescription}>
                  Yüksək temperatur mərhələsi
                </Text>
              </View>
            </View>
            <View style={styles.stageDetails}>
              <View style={styles.stageDetailItem}>
                <Text style={styles.stageDetailLabel}>Optimal Temp:</Text>
                <Text style={styles.stageDetailValue}>55-70°C</Text>
              </View>
              <View style={styles.stageDetailItem}>
                <Text style={styles.stageDetailLabel}>Müddət:</Text>
                <Text style={styles.stageDetailValue}>5-7 gün</Text>
              </View>
              <View style={styles.stageDetailItem}>
                <Text style={styles.stageDetailLabel}>Qarışdırma:</Text>
                <Text style={styles.stageDetailValue}>Gündə 2 dəfə</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Məsləhətlər</Text>
          <Card style={styles.tipCard}>
            <Text style={styles.tipText}>
              • Termofilik fazada yüksək temperatur zərərli mikroorqanizmləri məhv edir
            </Text>
            <Text style={styles.tipText}>
              • Mütəmadi qarışdırma bərabər istilik və oksigen paylayır
            </Text>
            <Text style={styles.tipText}>
              • Nəmlik 50-60% arasında saxlanmalıdır
            </Text>
          </Card>
        </View>
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
  backButton: {
    padding: spacing.sm,
  },
  backIcon: {
    fontSize: 28,
    color: colors.light.text.primary,
  },
  headerTitle: {
    ...typography.variants.h3,
    color: colors.light.text.primary,
  },
  iconButton: {
    padding: spacing.sm,
  },
  headerIcon: {
    fontSize: 24,
  },
  progressContainer: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  circularProgress: {
    position: 'relative',
    marginBottom: spacing.xl,
  },
  progressCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  progressLabel: {
    ...typography.variants.bodySmall,
    color: colors.light.text.muted,
  },
  daysRemaining: {
    alignItems: 'center',
  },
  daysRemainingLabel: {
    ...typography.variants.bodySmall,
    color: colors.light.text.muted,
    marginBottom: spacing.xxs,
  },
  daysRemainingValue: {
    ...typography.variants.h3,
    color: colors.light.text.primary,
  },
  sensorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.base,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  sensorCard: {
    width: (width - spacing.base * 2 - spacing.md) / 2,
    padding: spacing.base,
  },
  sensorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  sensorIcon: {
    fontSize: 28,
  },
  trendBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.success,
  },
  sensorLabel: {
    ...typography.variants.bodySmall,
    color: colors.light.text.secondary,
    marginBottom: spacing.xs,
  },
  sensorValue: {
    ...typography.variants.h2,
    marginBottom: spacing.xxs,
  },
  sensorUnit: {
    ...typography.variants.caption,
    color: colors.light.text.muted,
  },
  controlButtons: {
    paddingHorizontal: spacing.base,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  stopButton: {
    backgroundColor: colors.error,
  },
  section: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.variants.h3,
    color: colors.light.text.primary,
    marginBottom: spacing.md,
  },
  actionCard: {
    padding: spacing.lg,
  },
  timeline: {
    gap: spacing.lg,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: spacing.xs,
  },
  timelineContent: {
    flex: 1,
  },
  actionTitle: {
    ...typography.variants.label,
    color: colors.light.text.primary,
    marginBottom: spacing.xxs,
  },
  actionTime: {
    ...typography.variants.caption,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  actionDescription: {
    ...typography.variants.bodySmall,
    color: colors.light.text.secondary,
    lineHeight: 20,
  },
  stageCard: {
    padding: spacing.lg,
  },
  stageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.base,
    paddingBottom: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  stageIcon: {
    fontSize: 40,
  },
  stageInfo: {
    flex: 1,
  },
  stageName: {
    ...typography.variants.h4,
    color: colors.light.text.primary,
    marginBottom: spacing.xxs,
  },
  stageDescription: {
    ...typography.variants.bodySmall,
    color: colors.light.text.secondary,
  },
  stageDetails: {
    gap: spacing.sm,
  },
  stageDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stageDetailLabel: {
    ...typography.variants.body,
    color: colors.light.text.secondary,
  },
  stageDetailValue: {
    ...typography.variants.body,
    color: colors.light.text.primary,
    fontWeight: '600',
  },
  tipCard: {
    padding: spacing.base,
    backgroundColor: colors.info + '10',
  },
  tipText: {
    ...typography.variants.bodySmall,
    color: colors.light.text.primary,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
});
