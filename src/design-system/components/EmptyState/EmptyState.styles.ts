/**
 * AugustDesignSystem - EmptyState Component Styles
 *
 * Style utilities for the EmptyState component.
 */

import { StyleSheet } from 'react-native';
import type { Theme } from '../../types';
import type { EmptyStateSize, EmptyStateLayout } from './EmptyState.types';

/**
 * Get size-specific styles.
 */
export function getSizeStyles(size: EmptyStateSize, theme: Theme) {
  const sizeMap = {
    sm: {
      iconSize: 32 as const,
      iconContainerSize: 48,
      titleSize: theme.typography.subheadline,
      descriptionSize: theme.typography.footnote,
      spacing: theme.spacing.sm,
      contentSpacing: theme.spacing.xs,
    },
    md: {
      iconSize: 48 as const,
      iconContainerSize: 72,
      titleSize: theme.typography.headline,
      descriptionSize: theme.typography.subheadline,
      spacing: theme.spacing.md,
      contentSpacing: theme.spacing.sm,
    },
    lg: {
      iconSize: 64 as const,
      iconContainerSize: 96,
      titleSize: theme.typography.title2,
      descriptionSize: theme.typography.body,
      spacing: theme.spacing.lg,
      contentSpacing: theme.spacing.md,
    },
  };

  return sizeMap[size];
}

/**
 * Create base styles for EmptyState component.
 */
export function createEmptyStateStyles(
  theme: Theme,
  size: EmptyStateSize,
  layout: EmptyStateLayout,
  fillContainer: boolean
) {
  const sizeStyles = getSizeStyles(size, theme);
  const isHorizontal = layout === 'horizontal';

  return StyleSheet.create({
    container: {
      ...(fillContainer && {
        flex: 1,
        justifyContent: 'center',
      }),
      alignItems: 'center',
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.lg,
    },

    contentWrapper: {
      flexDirection: isHorizontal ? 'row' : 'column',
      alignItems: 'center',
      gap: sizeStyles.spacing,
      maxWidth: isHorizontal ? undefined : 300,
    },

    iconContainer: {
      width: sizeStyles.iconContainerSize,
      height: sizeStyles.iconContainerSize,
      borderRadius: sizeStyles.iconContainerSize / 2,
      backgroundColor: theme.colors.fill.tertiary,
      justifyContent: 'center',
      alignItems: 'center',
    },

    illustrationContainer: {
      marginBottom: sizeStyles.spacing,
    },

    textContainer: {
      alignItems: isHorizontal ? 'flex-start' : 'center',
      gap: sizeStyles.contentSpacing,
      flex: isHorizontal ? 1 : undefined,
    },

    title: {
      ...sizeStyles.titleSize,
      color: theme.colors.label.primary,
      textAlign: isHorizontal ? 'left' : 'center',
      fontWeight: '600',
    },

    description: {
      ...sizeStyles.descriptionSize,
      color: theme.colors.label.secondary,
      textAlign: isHorizontal ? 'left' : 'center',
    },

    actionsContainer: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
      marginTop: sizeStyles.spacing,
      flexWrap: 'wrap',
      justifyContent: 'center',
    },

    primaryButton: {
      backgroundColor: theme.colors.interactive.tint,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radius.md,
    },

    primaryButtonText: {
      ...theme.typography.body,
      color: '#FFFFFF',
      fontWeight: '600',
    },

    secondaryButton: {
      backgroundColor: 'transparent',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radius.md,
    },

    secondaryButtonText: {
      ...theme.typography.body,
      color: theme.colors.interactive.tint,
      fontWeight: '600',
    },

    tertiaryButton: {
      backgroundColor: 'transparent',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
    },

    tertiaryButtonText: {
      ...theme.typography.subheadline,
      color: theme.colors.interactive.tint,
    },
  });
}
