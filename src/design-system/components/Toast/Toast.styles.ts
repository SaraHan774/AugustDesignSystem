/**
 * AugustDesignSystem - Toast Component Styles
 *
 * Style utilities for the Toast component.
 */

import { StyleSheet } from 'react-native';
import type { Theme } from '../../types';
import type { ToastVariant } from './Toast.types';

/**
 * Create base styles for Toast component.
 */
export function createToastStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.radius.md,
      marginHorizontal: theme.spacing.lg,
      minHeight: 48,
      ...theme.shadows.lg,
    },

    content: {
      flex: 1,
      marginLeft: theme.spacing.sm,
    },

    title: {
      ...theme.typography.subheadline,
      fontWeight: '600',
      marginBottom: 2,
    },

    message: {
      ...theme.typography.subheadline,
    },

    iconContainer: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },

    actionButton: {
      marginLeft: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
    },

    actionText: {
      ...theme.typography.subheadline,
      fontWeight: '600',
    },

    closeButton: {
      marginLeft: theme.spacing.sm,
      padding: theme.spacing.xs,
    },
  });
}

/**
 * Get variant-specific styles.
 */
export function getVariantStyles(variant: ToastVariant, theme: Theme) {
  const styles: {
    container: any;
    text: any;
    icon: string;
    iconColor: string;
  } = {
    container: {},
    text: {},
    icon: 'info',
    iconColor: theme.colors.label.primary,
  };

  switch (variant) {
    case 'success':
      styles.container = {
        backgroundColor: theme.colors.semantic.success,
      };
      styles.text = {
        color: '#FFFFFF',
      };
      styles.icon = 'success';
      styles.iconColor = '#FFFFFF';
      break;

    case 'error':
      styles.container = {
        backgroundColor: theme.colors.semantic.error,
      };
      styles.text = {
        color: '#FFFFFF',
      };
      styles.icon = 'error';
      styles.iconColor = '#FFFFFF';
      break;

    case 'warning':
      styles.container = {
        backgroundColor: theme.colors.semantic.warning,
      };
      styles.text = {
        color: '#000000',
      };
      styles.icon = 'warning';
      styles.iconColor = '#000000';
      break;

    case 'info':
      styles.container = {
        backgroundColor: theme.colors.semantic.info,
      };
      styles.text = {
        color: '#FFFFFF',
      };
      styles.icon = 'info';
      styles.iconColor = '#FFFFFF';
      break;

    case 'default':
    default:
      styles.container = {
        backgroundColor: theme.colors.background.tertiary,
      };
      styles.text = {
        color: theme.colors.label.primary,
      };
      styles.icon = 'info';
      styles.iconColor = theme.colors.label.secondary;
      break;
  }

  return styles;
}
