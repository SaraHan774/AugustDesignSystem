/**
 * AugustDesignSystem - TabBar (Bottom Navigation) Component Styles
 *
 * Style definitions for the bottom tab bar component.
 * Follows iOS HIG: 49pt height, 83pt with home indicator.
 */

import { StyleSheet } from 'react-native';
import type { Theme } from '../../types';

/**
 * Tab bar height constants.
 */
export const TAB_BAR_HEIGHTS = {
  standard: 49,
  withHomeIndicator: 83,
};

/**
 * Create base styles for the TabBar component.
 */
export function createTabBarStyles(theme: Theme) {
  return StyleSheet.create({
    // Outer container
    container: {
      backgroundColor: theme.colors.background.primary,
      zIndex: theme.zIndex.sticky,
    },

    // Top border
    border: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.colors.separator.opaque,
    },

    // Tab items row
    tabsContainer: {
      flexDirection: 'row',
      height: TAB_BAR_HEIGHTS.standard,
    },

    // Individual tab item
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.xs,
    },

    // Tab disabled state
    tabDisabled: {
      opacity: theme.opacity.disabled,
    },

    // Icon container (for badge positioning)
    iconContainer: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Tab label
    label: {
      ...theme.typography.caption2,
      marginTop: theme.spacing.xxs,
      textAlign: 'center',
    },

    // Badge container
    badgeContainer: {
      position: 'absolute',
      top: -4,
      right: -10,
    },
  });
}
