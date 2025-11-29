/**
 * AugustDesignSystem - Header/NavigationBar Component Styles
 *
 * Style definitions for the top navigation bar component.
 * Follows iOS HIG: 44pt standard height, 96pt large title height.
 */

import { StyleSheet, Platform } from 'react-native';
import type { Theme } from '../../types';
import type { HeaderVariant, HeaderBackground } from './Header.types';

/**
 * Header height constants (following iOS HIG).
 */
export const HEADER_HEIGHTS = {
  standard: 44,
  large: 96,
  search: 96, // Standard + search bar
};

/**
 * Get header height based on variant.
 */
export function getHeaderHeight(variant: HeaderVariant): number {
  switch (variant) {
    case 'large':
      return HEADER_HEIGHTS.large;
    case 'search':
      return HEADER_HEIGHTS.search;
    default:
      return HEADER_HEIGHTS.standard;
  }
}

/**
 * Get background style for header.
 */
export function getBackgroundStyle(
  background: HeaderBackground,
  theme: Theme,
  customColor?: string
) {
  switch (background) {
    case 'transparent':
      return {
        backgroundColor: 'transparent',
      };
    case 'blur':
      // Note: Actual blur requires BlurView from expo-blur or similar
      // This is a fallback
      return {
        backgroundColor: theme.colors.material.chrome,
      };
    case 'solid':
    default:
      return {
        backgroundColor: customColor || theme.colors.background.primary,
      };
  }
}

/**
 * Create base styles for the Header component.
 */
export function createHeaderStyles(theme: Theme) {
  return StyleSheet.create({
    // Outer container (includes safe area)
    wrapper: {
      zIndex: theme.zIndex.sticky,
    },

    // Main container
    container: {
      height: HEADER_HEIGHTS.standard,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
    },

    // Large title container (extra row)
    largeContainer: {
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.sm,
    },

    // Border at the bottom
    border: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.separator.opaque,
    },

    // Left section
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: 60,
    },

    // Center section (title)
    centerSection: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.sm,
    },

    // Right section
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      minWidth: 60,
    },

    // Standard title
    title: {
      ...theme.typography.headline,
      color: theme.colors.label.primary,
      textAlign: 'center',
    },

    // Large title
    largeTitle: {
      ...theme.typography.largeTitle,
      fontWeight: '700',
      color: theme.colors.label.primary,
    },

    // Subtitle
    subtitle: {
      ...theme.typography.caption1,
      color: theme.colors.label.secondary,
      marginTop: theme.spacing.xxs,
    },

    // Action button
    actionButton: {
      minWidth: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: theme.spacing.xxs,
    },

    // Action button label (text)
    actionLabel: {
      ...theme.typography.body,
      color: theme.colors.interactive.tint,
    },

    // Action button disabled
    actionDisabled: {
      opacity: theme.opacity.disabled,
    },

    // Back button with label
    backButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: -theme.spacing.sm,
    },

    // Back button label
    backLabel: {
      ...theme.typography.body,
      color: theme.colors.interactive.tint,
      marginLeft: -theme.spacing.xs,
    },

    // Search bar container
    searchContainer: {
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.sm,
    },

    // Chat header content
    chatContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },

    // Chat avatar
    chatAvatar: {
      marginRight: theme.spacing.sm,
    },

    // Chat info
    chatInfo: {
      flex: 1,
    },

    // Chat name
    chatName: {
      ...theme.typography.headline,
      color: theme.colors.label.primary,
    },

    // Chat status
    chatStatus: {
      ...theme.typography.caption1,
      color: theme.colors.label.secondary,
    },

    // Status dot
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: theme.spacing.xs,
    },

    // Status row
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing.xxs,
    },
  });
}

/**
 * Get status color based on status type.
 */
export function getStatusColor(
  status: 'online' | 'offline' | 'away' | 'busy',
  theme: Theme
): string {
  const statusColors = {
    online: theme.colors.semantic.success,
    offline: theme.colors.system.gray,
    away: theme.colors.semantic.warning,
    busy: theme.colors.semantic.error,
  };
  return statusColors[status];
}
