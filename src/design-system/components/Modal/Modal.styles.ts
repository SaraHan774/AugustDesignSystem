/**
 * AugustDesignSystem - Modal/Dialog Component Styles
 *
 * Style definitions for the centered modal dialog component.
 * Follows iOS HIG: Alert dialogs are centered, 270pt width.
 */

import { StyleSheet, Dimensions } from 'react-native';
import type { Theme } from '../../types';
import type { ModalAction } from './Modal.types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Default modal dimensions (iOS alert style).
 */
export const MODAL_DEFAULTS = {
  maxWidth: 270,
  borderRadius: 14,
  backdropOpacity: 0.4,
};

/**
 * Create base styles for the Modal component.
 */
export function createModalStyles(theme: Theme) {
  return StyleSheet.create({
    // Full screen overlay
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: theme.zIndex.modal,
    },

    // Backdrop (semi-transparent background)
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#000000',
    },

    // Modal container
    container: {
      backgroundColor: theme.colors.material.thick,
      borderRadius: MODAL_DEFAULTS.borderRadius,
      overflow: 'hidden',
      maxWidth: MODAL_DEFAULTS.maxWidth,
      width: '80%',
      maxHeight: '80%',
    },

    // Content area
    content: {
      padding: theme.spacing.lg,
      alignItems: 'center',
    },

    // Title text
    title: {
      ...theme.typography.headline,
      fontWeight: '600',
      color: theme.colors.label.primary,
      textAlign: 'center',
      marginBottom: theme.spacing.xs,
    },

    // Message text
    message: {
      ...theme.typography.subheadline,
      color: theme.colors.label.primary,
      textAlign: 'center',
    },

    // Custom content container
    customContent: {
      width: '100%',
      marginTop: theme.spacing.md,
    },

    // Actions container
    actionsContainer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.colors.separator.opaque,
    },

    // Horizontal actions (2 buttons side by side)
    actionsHorizontal: {
      flexDirection: 'row',
    },

    // Vertical actions (stacked buttons)
    actionsVertical: {
      flexDirection: 'column',
    },

    // Single action button
    actionButton: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 44,
    },

    // Vertical action button
    actionButtonVertical: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.colors.separator.opaque,
    },

    // First vertical action (no top border, handled by container)
    actionButtonVerticalFirst: {
      borderTopWidth: 0,
    },

    // Horizontal separator between buttons
    actionSeparator: {
      width: StyleSheet.hairlineWidth,
      backgroundColor: theme.colors.separator.opaque,
    },

    // Action button text
    actionText: {
      ...theme.typography.body,
      color: theme.colors.interactive.tint,
    },

    // Default action text (bold)
    actionTextDefault: {
      fontWeight: '600',
    },

    // Cancel action text (regular weight)
    actionTextCancel: {
      fontWeight: '400',
    },

    // Destructive action text (red)
    actionTextDestructive: {
      color: theme.colors.semantic.error,
    },

    // Disabled action
    actionDisabled: {
      opacity: theme.opacity.disabled,
    },
  });
}

/**
 * Get action button style based on action style prop.
 */
export function getActionTextStyle(
  actionStyle: ModalAction['style'],
  theme: Theme,
  styles: ReturnType<typeof createModalStyles>
) {
  switch (actionStyle) {
    case 'destructive':
      return [styles.actionText, styles.actionTextDestructive];
    case 'cancel':
      return [styles.actionText, styles.actionTextCancel];
    case 'default':
    default:
      return [styles.actionText, styles.actionTextDefault];
  }
}
