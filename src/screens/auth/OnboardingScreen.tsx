import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ViewToken,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button } from '../../components/ui/Button';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    icon: '♻️',
    title: 'Ağıllı Kompost İdarəetməsi',
    description:
      'Real vaxt sensoru ilə kompost prosesini izləyin. Temperatur, nəmlik və CO₂ səviyyələrini avtomatik nəzarət edin.',
    color: colors.primary,
  },
  {
    id: '2',
    icon: '💧',
    title: 'Su İdarəetməsi',
    description:
      'Yağış suyu tutumunu izləyin, avtomatik suvarma planları yaradın və su keyfiyyətini monitorinq edin.',
    color: colors.info,
  },
  {
    id: '3',
    icon: '🌱',
    title: 'Torpaq Analizi',
    description:
      'NPK səviyyələrini ölçün, torpaq sağlamlığını qiymətləndirin və AI tövsiyələri əldə edin.',
    color: colors.accent,
  },
  {
    id: '4',
    icon: '🤖',
    title: 'AI Köməkçi',
    description:
      'Təbii dildə suallar verin və ağıllı tövsiyələr alın. Təsərrüfat qərarlarını AI ilə optimallaşdırın.',
    color: colors.secondary,
  },
  {
    id: '5',
    icon: '📚',
    title: 'Təlim Mərkəzi',
    description:
      'Video dərsliklər, məqalələr və təcrübəli fermerlər üçün bələdçilər. Hər zaman öyrənin.',
    color: colors.warning,
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={styles.slide}>
      <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={styles.slideDescription}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Keç</Text>
      </TouchableOpacity>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        bounces={false}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
              { backgroundColor: index === currentIndex ? colors.primary : colors.light.border },
            ]}
          />
        ))}
      </View>

      {/* Next/Done Button */}
      <View style={styles.footer}>
        <Button
          title={currentIndex === slides.length - 1 ? 'Başla' : 'Növbəti'}
          onPress={handleNext}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  skipButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
  },
  skipText: {
    ...typography.variants.label,
    color: colors.light.text.muted,
  },
  slide: {
    width,
    flex: 1,
    paddingHorizontal: spacing['3xl'],
    paddingTop: spacing['6xl'],
    alignItems: 'center',
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  icon: {
    fontSize: 80,
  },
  slideTitle: {
    ...typography.variants.h2,
    color: colors.light.text.primary,
    textAlign: 'center',
    marginBottom: spacing.base,
  },
  slideDescription: {
    ...typography.variants.body,
    color: colors.light.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  paginationDotActive: {
    width: 24,
    height: 8,
    borderRadius: 4,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['2xl'],
  },
});
