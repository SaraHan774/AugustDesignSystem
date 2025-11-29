/**
 * AugustDesignSystem - UnreadBadge Component Styles
 *
 * Style definitions for the UnreadBadge component following Apple HIG.
 */

import { StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import type { Theme } from '@types';
import type { UnreadBadgeSize, UnreadBadgeColorScheme } from './UnreadBadge.types';

/**
 * Get badge height based on size.
 */
export function getBadgeHeight(size: UnreadBadgeSize): number {
  const heights: Record<UnreadBadgeSize, number> = {
    sm: 16,
    md: 20,
    lg: 24,
  };
  return heights[size];
}

/**
 * Get minimum badge width (for circular single-digit badges).
 */
export function getBadgeMinWidth(size: UnreadBadgeSize): number {
  return getBadgeHeight(size);
}

/**
 * Get horizontal padding for badge.
 */
export function getBadgePadding(size: UnreadBadgeSize): number {
  const paddings: Record<UnreadBadgeSize, number> = {
    sm: 4,
    md: 6,
    lg: 8,
  };
  return paddings[size];
}

/**
 * Get dot size for dot-only mode.
 */
export function getDotSize(size: UnreadBadgeSize): number {
  const sizes: Record<UnreadBadgeSize, number> = {
    sm: 8,
    md: 10,
    lg: 12,
  };
  return sizes[size];
}

/**
 * Get badge colors based on color scheme.
 */
export function getBadgeColors(
  colorScheme: UnreadBadgeColorScheme,
  theme: Theme
): { background: string; text: string } {
  switch (colorScheme) {
    case 'primary':
      return {
        background: theme.colors.interactive.tint,
        text: '#FFFFFF',
      };
    case 'destructive':
      return {
        background: theme.colors.semantic.error,
        text: '#FFFFFF',
      };
    case 'neutral':
      return {
        background: theme.colors.fill.secondary,
        text: theme.colors.label.primary,
      };
    default:
      return {
        background: theme.colors.interactive.tint,
        text: '#FFFFFF',
      };
  }
}

/**
 * Get typography style based on size.
 */
export function getBadgeTypography(size: UnreadBadgeSize, theme: Theme): TextStyle {
  const styles: Record<UnreadBadgeSize, TextStyle> = {
    sm: {
      fontSize: 10,
      lineHeight: 12,
      fontWeight: '600',
    },
    md: {
      fontSize: 12,
      lineHeight: 14,
      fontWeight: '600',
    },
    lg: {
      fontSize: 14,
      lineHeight: 16,
      fontWeight: '600',
    },
  };
  return styles[size];
}

/**
 * Create base UnreadBadge styles.
 */
export function createUnreadBadgeStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 9999, // Fully rounded (pill shape)
    },

    text: {
      textAlign: 'center',
      includeFontPadding: false, // Android: remove extra padding
      textAlignVertical: 'center',
    },

    dot: {
      borderRadius: 9999,
    },
  });
}

/**
 * Generate dynamic styles based on UnreadBadge props.
 */
export function getDynamicUnreadBadgeStyles(
  size: UnreadBadgeSize,
  colorScheme: UnreadBadgeColorScheme,
  isDot: boolean,
  theme: Theme
): { container: ViewStyle; text: TextStyle } {
  const colors = getBadgeColors(colorScheme, theme);
  const typography = getBadgeTypography(size, theme);

  if (isDot) {
    const dotSize = getDotSize(size);
    return {
      container: {
        width: dotSize,
        height: dotSize,
        minWidth: dotSize,
        backgroundColor: colors.background,
        borderRadius: dotSize / 2,
      },
      text: {},
    };
  }

  const height = getBadgeHeight(size);
  const minWidth = getBadgeMinWidth(size);
  const paddingHorizontal = getBadgePadding(size);

  return {
    container: {
      height,
      minWidth,
      paddingHorizontal,
      backgroundColor: colors.background,
      borderRadius: height / 2,
    },
    text: {
      ...typography,
      color: colors.text,
    },
  };
}

/**
 * Format count for display.
 */
export function formatCount(count: number, maxCount: number): string {
  if (count > maxCount) {
    return `${maxCount}+`;
  }
  return String(count);
}
