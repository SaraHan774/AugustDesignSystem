/**
 * AugustDesignSystem - ActionMenu/ContextMenu Component Styles
 *
 * Style definitions for the contextual menu component.
 * Follows iOS action sheet / context menu styling.
 */

import { StyleSheet } from 'react-native';
import type { Theme } from '../../types';

/**
 * Action menu constants.
 */
export const ACTION_MENU_CONSTANTS = {
  borderRadius: 14,
  itemHeight: 56,
  maxWidth: 400,
  horizontalMargin: 8,
  backdropOpacity: 0.4,
};

/**
 * Create base styles for the ActionMenu component.
 */
export function createActionMenuStyles(theme: Theme) {
  return StyleSheet.create({
    // Full screen overlay
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      zIndex: theme.zIndex.modal,
    },

    // Backdrop
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#000000',
    },

    // Menu container
    container: {
      marginHorizontal: ACTION_MENU_CONSTANTS.horizontalMargin,
      marginBottom: theme.spacing.sm,
      maxWidth: ACTION_MENU_CONSTANTS.maxWidth,
      alignSelf: 'center',
      width: '100%',
    },

    // Menu card (main actions)
    menuCard: {
      backgroundColor: theme.colors.material.thick,
      borderRadius: ACTION_MENU_CONSTANTS.borderRadius,
      overflow: 'hidden',
    },

    // Header section
    header: {
      padding: theme.spacing.md,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.separator.opaque,
    },

    // Section header
    sectionHeader: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.fill.quaternary,
    },

    // Section header text
    sectionHeaderText: {
      ...theme.typography.caption1,
      color: theme.colors.label.secondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },

    // Menu item
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: ACTION_MENU_CONSTANTS.itemHeight,
      paddingHorizontal: theme.spacing.lg,
    },

    // Item separator
    itemSeparator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.colors.separator.opaque,
      marginLeft: theme.spacing.lg + 24 + theme.spacing.md, // icon + gap
    },

    // Item icon container
    itemIconContainer: {
      width: 24,
      height: 24,
      marginRight: theme.spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Item text
    itemText: {
      ...theme.typography.body,
      color: theme.colors.label.primary,
      flex: 1,
    },

    // Destructive item text
    itemTextDestructive: {
      color: theme.colors.semantic.error,
    },

    // Disabled item
    itemDisabled: {
      opacity: theme.opacity.disabled,
    },

    // Cancel button container (separate card)
    cancelCard: {
      backgroundColor: theme.colors.material.thick,
      borderRadius: ACTION_MENU_CONSTANTS.borderRadius,
      marginTop: theme.spacing.sm,
      overflow: 'hidden',
    },

    // Cancel button
    cancelButton: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: ACTION_MENU_CONSTANTS.itemHeight,
    },

    // Cancel text
    cancelText: {
      ...theme.typography.body,
      color: theme.colors.interactive.tint,
      fontWeight: '600',
    },
  });
}
