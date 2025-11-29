/**
 * AugustDesignSystem - Spinner Component
 *
 * A themed loading spinner/activity indicator with optional label support.
 * Uses the native ActivityIndicator for optimal performance.
 *
 * @example
 * ```tsx
 * // Basic spinner
 * <Spinner />
 *
 * // Large spinner with label
 * <Spinner size="lg" label="Loading..." />
 *
 * // Custom color
 * <Spinner color="success" />
 *
 * // Inline with label
 * <Spinner size="sm" label="Refreshing" labelPosition="right" />
 * ```
 */

import React, { useMemo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { useReducedMotion } from '../../hooks';
import type { SpinnerProps, SpinnerSize, SPINNER_SIZES } from './Spinner.types';

/**
 * Get numeric size from SpinnerSize or number.
 */
function getSpinnerSize(size: SpinnerSize | number): number {
  if (typeof size === 'number') {
    return size;
  }

  const sizes: Record<SpinnerSize, number> = {
    xs: 16,
    sm: 20,
    md: 28,
    lg: 40,
  };

  return sizes[size];
}

/**
 * Spinner component for indicating loading states.
 *
 * Features:
 * - Multiple size variants
 * - Semantic color support
 * - Optional label with flexible positioning
 * - Respects reduced motion preferences
 * - Full accessibility support
 */
export function Spinner({
  // Appearance
  size = 'md',
  color = 'tint',

  // Label
  label,
  labelPosition = 'bottom',

  // Behavior
  animating = true,
  hidesWhenStopped = true,

  // Accessibility
  testID,
  accessibilityLabel = 'Loading',

  // Styling
  style,
  labelStyle,
}: SpinnerProps): React.ReactElement | null {
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();

  // Resolve size
  const resolvedSize = useMemo(() => getSpinnerSize(size), [size]);

  // Resolve color
  const resolvedColor = useMemo(() => {
    const colorMap: Record<string, string> = {
      primary: theme.colors.label.primary,
      secondary: theme.colors.label.secondary,
      tint: theme.colors.interactive.tint,
      onPrimary: theme.colors.background.primary,
      onSurface: theme.colors.label.primary,
    };

    return colorMap[color] || color;
  }, [color, theme]);

  // Get ActivityIndicator size prop
  const activityIndicatorSize = useMemo(() => {
    // ActivityIndicator only accepts 'small' or 'large' on iOS
    // But we can override with custom size via style
    return resolvedSize <= 24 ? 'small' : 'large';
  }, [resolvedSize]);

  // Hide when not animating
  if (!animating && hidesWhenStopped) {
    return null;
  }

  // Container style based on label position
  const containerStyle = useMemo(
    () => [
      styles.container,
      labelPosition === 'right' ? styles.containerRow : styles.containerColumn,
      style,
    ],
    [labelPosition, style]
  );

  // Label text style
  const labelTextStyle = useMemo(
    () => [
      styles.label,
      {
        ...theme.typography.subheadline,
        color: theme.colors.label.secondary,
      },
      labelPosition === 'right' ? styles.labelRight : styles.labelBottom,
      labelStyle,
    ],
    [theme, labelPosition, labelStyle]
  );

  return (
    <View
      style={containerStyle}
      testID={testID}
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="progressbar"
      accessibilityState={{ busy: animating }}
    >
      <ActivityIndicator
        animating={animating && !reducedMotion}
        size={activityIndicatorSize}
        color={resolvedColor}
        style={{ width: resolvedSize, height: resolvedSize }}
        testID={testID ? `${testID}-indicator` : undefined}
      />
      {label && <Text style={labelTextStyle}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerColumn: {
    flexDirection: 'column',
  },
  containerRow: {
    flexDirection: 'row',
  },
  label: {
    textAlign: 'center',
  },
  labelBottom: {
    marginTop: 8,
  },
  labelRight: {
    marginLeft: 8,
  },
});

// Set display name for debugging
Spinner.displayName = 'Spinner';

export default Spinner;
