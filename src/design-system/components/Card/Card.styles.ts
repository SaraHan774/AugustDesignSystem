/**
 * AugustDesignSystem - Card Component Styles
 *
 * Style definitions for the content grouping container component.
 */

import { StyleSheet, type ViewStyle } from 'react-native';
import type { Theme } from '../../types';
import type { CardVariant, CardPadding } from './Card.types';

/**
 * Padding values for card padding options.
 */
export function getCardPadding(padding: CardPadding, theme: Theme): number {
  const paddingMap: Record<CardPadding, number> = {
    none: 0,
    sm: theme.spacing.sm,
    md: theme.spacing.lg,
    lg: theme.spacing.xl,
  };
  return paddingMap[padding];
}

/**
 * Get border radius value from token or number.
 */
export function getCardBorderRadius(
  borderRadius: 'sm' | 'md' | 'lg' | 'xl' | number,
  theme: Theme
): number {
  if (typeof borderRadius === 'number') {
    return borderRadius;
  }
  return theme.radius[borderRadius];
}

/**
 * Get variant-specific styles.
 */
export function getVariantStyles(
  variant: CardVariant,
  theme: Theme
): ViewStyle {
  switch (variant) {
    case 'elevated':
      return {
        backgroundColor: theme.colors.background.primary,
        ...theme.shadows.sm,
      };

    case 'outlined':
      return {
        backgroundColor: theme.colors.background.primary,
        borderWidth: 1,
        borderColor: theme.colors.separator.opaque,
      };

    case 'filled':
      return {
        backgroundColor: theme.colors.background.secondary,
      };

    default:
      return {
        backgroundColor: theme.colors.background.primary,
      };
  }
}

/**
 * Create base styles for the Card component.
 */
export function createCardStyles(theme: Theme) {
  return StyleSheet.create({
    // Base container
    container: {
      overflow: 'hidden',
    },

    // Header section
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    // Header with content below
    headerWithContent: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.separator.nonOpaque,
    },

    // Header left content
    headerLeft: {
      marginRight: theme.spacing.sm,
    },

    // Header text container
    headerTextContainer: {
      flex: 1,
    },

    // Header title
    headerTitle: {
      ...theme.typography.headline,
      color: theme.colors.label.primary,
    },

    // Header subtitle
    headerSubtitle: {
      ...theme.typography.subheadline,
      color: theme.colors.label.secondary,
      marginTop: theme.spacing.xxs,
    },

    // Header right content
    headerRight: {
      marginLeft: theme.spacing.sm,
    },

    // Content area
    content: {
      // Padding applied dynamically
    },

    // Footer section
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.colors.separator.nonOpaque,
    },

    // Pressed state overlay
    pressedOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.fill.quaternary,
    },

    // Disabled state
    disabled: {
      opacity: theme.opacity.disabled,
    },
  });
}

/**
 * Get pressed animation styles.
 */
export function getPressedStyles(pressed: boolean, theme: Theme): ViewStyle {
  if (!pressed) return {};

  return {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  };
}
