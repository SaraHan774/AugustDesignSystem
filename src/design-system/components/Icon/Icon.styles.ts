/**
 * AugustDesignSystem - Icon Component Styles
 *
 * Style utilities for the Icon component.
 */

import { StyleSheet } from 'react-native';
import type { Theme } from '../../types';
import type { IconSize, IconColor, ICON_SIZES } from './Icon.types';

/**
 * Get the numeric size value from IconSize or number.
 */
export function getIconSize(size: IconSize | number): number {
  if (typeof size === 'number') {
    return size;
  }

  const sizes: Record<IconSize, number> = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };

  return sizes[size];
}

/**
 * Resolve icon color from semantic name or custom value.
 */
export function getIconColor(color: IconColor, theme: Theme): string {
  // Semantic color mappings
  const semanticColors: Record<string, string> = {
    primary: theme.colors.label.primary,
    secondary: theme.colors.label.secondary,
    tertiary: theme.colors.label.tertiary,
    tint: theme.colors.interactive.tint,
    error: theme.colors.semantic.error,
    success: theme.colors.semantic.success,
    warning: theme.colors.semantic.warning,
    info: theme.colors.semantic.info,
  };

  // Check if it's a semantic color
  if (color in semanticColors) {
    return semanticColors[color];
  }

  // Return custom color as-is
  return color;
}

/**
 * Create base styles for Icon component.
 */
export function createIconStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}

/**
 * SF Symbol weight mapping to numeric values.
 * Used for iOS native rendering.
 */
export const SF_SYMBOL_WEIGHTS = {
  ultralight: 100,
  thin: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  heavy: 800,
  black: 900,
} as const;