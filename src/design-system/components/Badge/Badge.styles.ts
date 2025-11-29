/**
 * AugustDesignSystem - Badge Component Styles
 *
 * Style definitions for the generic badge component.
 */

import { StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import type { Theme } from '../../types';
import type {
  BadgeSize,
  BadgeColor,
  BadgePosition,
  BadgeSizeConfig,
} from './Badge.types';

/**
 * Size configurations for badge variants.
 */
export const BADGE_SIZES: Record<BadgeSize, BadgeSizeConfig> = {
  sm: {
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    fontSize: 10,
    dotSize: 6,
  },
  md: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    fontSize: 12,
    dotSize: 8,
  },
};

/**
 * Get size configuration for a badge size variant.
 */
export function getBadgeSize(size: BadgeSize): BadgeSizeConfig {
  return BADGE_SIZES[size];
}

/**
 * Get background color for a badge color scheme.
 */
export function getBadgeColor(color: BadgeColor, theme: Theme): string {
  const colorMap: Record<BadgeColor, string> = {
    primary: theme.colors.interactive.tint,
    error: theme.colors.semantic.error,
    success: theme.colors.semantic.success,
    warning: theme.colors.semantic.warning,
    info: theme.colors.semantic.info,
    neutral: theme.colors.fill.secondary,
  };
  return colorMap[color];
}

/**
 * Get text color for a badge color scheme.
 */
export function getBadgeTextColor(color: BadgeColor, theme: Theme): string {
  // Neutral needs dark text, others use white
  if (color === 'neutral') {
    return theme.colors.label.primary;
  }
  return '#FFFFFF';
}

/**
 * Get position styles for badge overlay.
 */
export function getBadgePositionStyle(
  position: BadgePosition,
  offset: { x?: number; y?: number } = {}
): ViewStyle {
  const { x = 0, y = 0 } = offset;

  const positionStyles: Record<BadgePosition, ViewStyle> = {
    'top-right': {
      top: y,
      right: x,
      transform: [{ translateX: 4 }, { translateY: -4 }],
    },
    'top-left': {
      top: y,
      left: x,
      transform: [{ translateX: -4 }, { translateY: -4 }],
    },
    'bottom-right': {
      bottom: y,
      right: x,
      transform: [{ translateX: 4 }, { translateY: 4 }],
    },
    'bottom-left': {
      bottom: y,
      left: x,
      transform: [{ translateX: -4 }, { translateY: 4 }],
    },
  };

  return positionStyles[position];
}

/**
 * Create base styles for the Badge component.
 */
export function createBadgeStyles(theme: Theme) {
  return StyleSheet.create({
    // Wrapper when badge has children
    wrapper: {
      position: 'relative',
    },

    // Base badge container
    badge: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 999,
    },

    // Badge positioned as overlay
    badgeOverlay: {
      position: 'absolute',
      zIndex: 1,
    },

    // Badge text
    text: {
      fontWeight: '600',
      textAlign: 'center',
    },

    // Dot variant (no text)
    dot: {
      borderRadius: 999,
    },
  });
}

/**
 * Get dynamic styles for badge based on props.
 */
export function getDynamicBadgeStyles(
  size: BadgeSize,
  color: BadgeColor,
  theme: Theme
): { badge: ViewStyle; text: TextStyle; dot: ViewStyle } {
  const sizeConfig = getBadgeSize(size);
  const backgroundColor = getBadgeColor(color, theme);
  const textColor = getBadgeTextColor(color, theme);

  return {
    badge: {
      minWidth: sizeConfig.minWidth,
      height: sizeConfig.height,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      backgroundColor,
    },
    text: {
      fontSize: sizeConfig.fontSize,
      lineHeight: sizeConfig.height,
      color: textColor,
    },
    dot: {
      width: sizeConfig.dotSize,
      height: sizeConfig.dotSize,
      backgroundColor,
    },
  };
}
