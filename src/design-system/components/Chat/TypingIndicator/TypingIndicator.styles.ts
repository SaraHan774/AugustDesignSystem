/**
 * AugustDesignSystem - TypingIndicator Component Styles
 *
 * Style definitions for the TypingIndicator component following Apple HIG.
 */

import { StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import type { Theme } from '@types';
import type { TypingIndicatorSize, TypingIndicatorVariant } from './TypingIndicator.types';

/**
 * Get dot size based on indicator size.
 */
export function getDotSize(size: TypingIndicatorSize): number {
  const sizes: Record<TypingIndicatorSize, number> = {
    sm: 6,
    md: 8,
    lg: 10,
  };
  return sizes[size];
}

/**
 * Get dot spacing based on indicator size.
 */
export function getDotSpacing(size: TypingIndicatorSize): number {
  const spacings: Record<TypingIndicatorSize, number> = {
    sm: 3,
    md: 4,
    lg: 5,
  };
  return spacings[size];
}

/**
 * Get bubble padding based on indicator size.
 */
export function getBubblePadding(size: TypingIndicatorSize): { horizontal: number; vertical: number } {
  const paddings: Record<TypingIndicatorSize, { horizontal: number; vertical: number }> = {
    sm: { horizontal: 10, vertical: 8 },
    md: { horizontal: 14, vertical: 10 },
    lg: { horizontal: 18, vertical: 12 },
  };
  return paddings[size];
}

/**
 * Get bubble border radius based on indicator size.
 */
export function getBubbleRadius(size: TypingIndicatorSize): number {
  const radii: Record<TypingIndicatorSize, number> = {
    sm: 14,
    md: 18,
    lg: 22,
  };
  return radii[size];
}

/**
 * Get typography style based on size.
 */
export function getTypingTextStyle(size: TypingIndicatorSize, theme: Theme): TextStyle {
  const styles: Record<TypingIndicatorSize, TextStyle> = {
    sm: {
      ...theme.typography.caption1,
      color: theme.colors.label.secondary,
    },
    md: {
      ...theme.typography.footnote,
      color: theme.colors.label.secondary,
    },
    lg: {
      ...theme.typography.subheadline,
      color: theme.colors.label.secondary,
    },
  };
  return styles[size];
}

/**
 * Generate typing text from user names.
 */
export function generateTypingText(typingUsers?: string[]): string {
  if (!typingUsers || typingUsers.length === 0) {
    return 'Someone is typing...';
  }

  if (typingUsers.length === 1) {
    return `${typingUsers[0]} is typing...`;
  }

  if (typingUsers.length === 2) {
    return `${typingUsers[0]} and ${typingUsers[1]} are typing...`;
  }

  return `${typingUsers[0]} and ${typingUsers.length - 1} others are typing...`;
}

/**
 * Create base TypingIndicator styles.
 */
export function createTypingIndicatorStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    dotsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    dot: {
      borderRadius: 9999,
      backgroundColor: theme.colors.label.tertiary,
    },

    bubbleContainer: {
      backgroundColor: theme.colors.fill.secondary,
      alignSelf: 'flex-start',
    },

    text: {
      color: theme.colors.label.secondary,
    },
  });
}

/**
 * Generate dynamic styles based on TypingIndicator props.
 */
export function getDynamicTypingIndicatorStyles(
  variant: TypingIndicatorVariant,
  size: TypingIndicatorSize,
  theme: Theme
): {
  container: ViewStyle;
  dotsContainer: ViewStyle;
  dot: ViewStyle;
  text: TextStyle;
} {
  const dotSize = getDotSize(size);
  const dotSpacing = getDotSpacing(size);
  const bubblePadding = getBubblePadding(size);
  const bubbleRadius = getBubbleRadius(size);
  const textStyle = getTypingTextStyle(size, theme);

  const containerStyle: ViewStyle = {};
  const dotsContainerStyle: ViewStyle = {
    gap: dotSpacing,
  };
  const dotStyle: ViewStyle = {
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize / 2,
  };

  // Apply bubble-specific styles
  if (variant === 'bubble') {
    containerStyle.paddingHorizontal = bubblePadding.horizontal;
    containerStyle.paddingVertical = bubblePadding.vertical;
    containerStyle.borderRadius = bubbleRadius;
    containerStyle.backgroundColor = theme.colors.fill.secondary;
  }

  return {
    container: containerStyle,
    dotsContainer: dotsContainerStyle,
    dot: dotStyle,
    text: textStyle,
  };
}
