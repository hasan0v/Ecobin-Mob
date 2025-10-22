/**
 * Card Component - Container for grouped content
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { lightTheme } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  elevated?: boolean;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding,
  elevated = true,
  onPress,
}) => {
  const theme = lightTheme;

  const cardStyle: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.card,
    padding: padding !== undefined ? padding : theme.spacing.base,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...(elevated && theme.shadows.base),
  };

  return (
    <View style={[cardStyle, style]} onTouchEnd={onPress}>
      {children}
    </View>
  );
};
