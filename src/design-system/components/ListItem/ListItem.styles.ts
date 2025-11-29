/**
 * AugustDesignSystem - ListItem Component Styles
 *
 * Style definitions for the configurable list row component.
 * Follows iOS HIG: 44pt default height, 64pt with subtitle.
 */

import { StyleSheet } from 'react-native';
import type { Theme } from '../../types';
import type { ListItemSize, ListItemSizeConfig } from './ListItem.types';

/**
 * Size configurations for list item variants.
 */
export const LIST_ITEM_SIZES: Record<ListItemSize, ListItemSizeConfig> = {
  default: {
    height: 44,
    iconSize: 20,
    iconContainerSize: 28,
    paddingVertical: 10,
  },
  subtitle: {
    height: 64,
    iconSize: 24,
    iconContainerSize: 40,
    paddingVertical: 12,
  },
  large: {
    height: 88,
    iconSize: 28,
    iconContainerSize: 56,
    paddingVertical: 16,
  },
};

/**
 * Get size configuration for list item.
 */
export function getListItemSize(size: ListItemSize): ListItemSizeConfig {
  return LIST_ITEM_SIZES[size];
}

/**
 * Create base styles for the ListItem component.
 */
export function createListItemStyles(theme: Theme) {
  return StyleSheet.create({
    // Outer container
    container: {
      backgroundColor: theme.colors.background.primary,
    },

    // Pressable content area
    pressable: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
    },

    // Selected/highlighted state
    selected: {
      backgroundColor: theme.colors.fill.quaternary,
    },

    // Disabled state
    disabled: {
      opacity: theme.opacity.disabled,
    },

    // Left section (icon or custom element)
    leftSection: {
      marginRight: theme.spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Icon background container
    iconBackground: {
      borderRadius: theme.radius.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Content section (title, subtitle, description)
    content: {
      flex: 1,
      justifyContent: 'center',
    },

    // Title text
    title: {
      ...theme.typography.body,
      color: theme.colors.label.primary,
    },

    // Destructive title
    titleDestructive: {
      color: theme.colors.semantic.error,
    },

    // Subtitle text
    subtitle: {
      ...theme.typography.subheadline,
      color: theme.colors.label.secondary,
      marginTop: theme.spacing.xxs,
    },

    // Description text
    description: {
      ...theme.typography.footnote,
      color: theme.colors.label.tertiary,
      marginTop: theme.spacing.xxs,
    },

    // Right section (value, accessory)
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: theme.spacing.sm,
    },

    // Value text
    value: {
      ...theme.typography.body,
      color: theme.colors.label.secondary,
      marginRight: theme.spacing.xs,
    },

    // Accessory container
    accessory: {
      marginLeft: theme.spacing.xs,
    },

    // Separator line
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.colors.separator.opaque,
    },

    // Separator with inset
    separatorInset: {
      marginLeft: theme.spacing.lg,
    },

    // Separator with larger inset (for items with icons)
    separatorInsetWithIcon: {
      marginLeft: 60, // 16 (padding) + 28 (icon) + 16 (gap)
    },
  });
}

/**
 * Get separator inset based on configuration and left content.
 */
export function getSeparatorInset(
  inset: 'none' | 'inset' | 'full',
  hasLeftContent: boolean,
  theme: Theme
): number {
  switch (inset) {
    case 'none':
      return theme.spacing.lg;
    case 'full':
      return 0;
    case 'inset':
    default:
      return hasLeftContent ? 60 : theme.spacing.lg;
  }
}
