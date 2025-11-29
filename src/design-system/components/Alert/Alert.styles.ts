/**
 * AugustDesignSystem - Alert/Banner Component Styles
 *
 * Style definitions for the inline persistent notification component.
 */

import { StyleSheet } from 'react-native';
import type { Theme } from '../../types';
import type { AlertVariant, AlertVariantConfig } from './Alert.types';
import type { CommonIconName } from '../Icon/Icon.types';

/**
 * Get variant-specific configuration.
 */
export function getVariantConfig(
  variant: AlertVariant,
  theme: Theme
): AlertVariantConfig {
  const configs: Record<AlertVariant, AlertVariantConfig> = {
    info: {
      backgroundColor: `${theme.colors.semantic.info}15`, // 15% opacity
      accentColor: theme.colors.semantic.info,
      iconColor: theme.colors.semantic.info,
      icon: 'info' as CommonIconName,
    },
    success: {
      backgroundColor: `${theme.colors.semantic.success}15`,
      accentColor: theme.colors.semantic.success,
      iconColor: theme.colors.semantic.success,
      icon: 'success' as CommonIconName,
    },
    warning: {
      backgroundColor: `${theme.colors.semantic.warning}15`,
      accentColor: theme.colors.semantic.warning,
      iconColor: theme.colors.semantic.warning,
      icon: 'warning' as CommonIconName,
    },
    error: {
      backgroundColor: `${theme.colors.semantic.error}15`,
      accentColor: theme.colors.semantic.error,
      iconColor: theme.colors.semantic.error,
      icon: 'error' as CommonIconName,
    },
  };

  return configs[variant];
}

/**
 * Create base styles for the Alert component.
 */
export function createAlertStyles(theme: Theme) {
  return StyleSheet.create({
    // Outer container for animation
    wrapper: {
      overflow: 'hidden',
    },

    // Main container
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: theme.spacing.md,
      borderRadius: theme.radius.md,
      overflow: 'hidden',
    },

    // Left accent border
    accent: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      borderTopLeftRadius: theme.radius.md,
      borderBottomLeftRadius: theme.radius.md,
    },

    // Icon container
    iconContainer: {
      marginRight: theme.spacing.sm,
      marginTop: 2, // Align with text baseline
    },

    // Content container (title, description, actions)
    content: {
      flex: 1,
    },

    // Title text
    title: {
      ...theme.typography.headline,
      color: theme.colors.label.primary,
      marginBottom: theme.spacing.xs,
    },

    // Description text
    description: {
      ...theme.typography.subheadline,
      color: theme.colors.label.secondary,
    },

    // Actions container
    actionsContainer: {
      flexDirection: 'row',
      marginTop: theme.spacing.sm,
      gap: theme.spacing.sm,
    },

    // Action button
    actionButton: {
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
    },

    // Action button text
    actionText: {
      ...theme.typography.subheadline,
      fontWeight: '600',
    },

    // Secondary action text (more subtle)
    secondaryActionText: {
      color: theme.colors.label.secondary,
    },

    // Dismiss button container
    dismissContainer: {
      marginLeft: theme.spacing.sm,
      padding: theme.spacing.xs,
    },
  });
}
