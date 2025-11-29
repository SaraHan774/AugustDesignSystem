/**
 * AugustDesignSystem - ListItem Component Types
 *
 * Type definitions for the configurable list row component.
 * Follows iOS Human Interface Guidelines for table view cells.
 */

import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle, GestureResponderEvent } from 'react-native';
import type { CommonIconName } from '../Icon/Icon.types';

/**
 * ListItem accessory types (right side indicator).
 */
export type ListItemAccessory =
  | 'none'
  | 'disclosure'      // Chevron right (>)
  | 'checkmark'       // Checkmark
  | 'detail'          // Info (i) button
  | 'switch'          // Toggle switch
  | 'custom';         // Custom element via rightElement

/**
 * ListItem size variants.
 */
export type ListItemSize = 'default' | 'subtitle' | 'large';

/**
 * Props for the ListItem component.
 */
export interface ListItemProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Primary title text.
   */
  title: string;

  /**
   * Secondary subtitle text.
   */
  subtitle?: string;

  /**
   * Additional description text (third line).
   */
  description?: string;

  // ============================================================================
  // Left Content
  // ============================================================================

  /**
   * Icon name for left side.
   */
  leftIcon?: CommonIconName;

  /**
   * Icon color for left icon.
   */
  leftIconColor?: string;

  /**
   * Icon background color (creates a rounded square background).
   */
  leftIconBackground?: string;

  /**
   * Custom left element (overrides leftIcon).
   */
  leftElement?: ReactNode;

  // ============================================================================
  // Right Content
  // ============================================================================

  /**
   * Accessory type for right side.
   * @default 'none'
   */
  accessory?: ListItemAccessory;

  /**
   * Value text displayed on the right (before accessory).
   */
  value?: string;

  /**
   * Custom right element (when accessory is 'custom').
   */
  rightElement?: ReactNode;

  /**
   * Switch value (when accessory is 'switch').
   */
  switchValue?: boolean;

  /**
   * Switch change callback (when accessory is 'switch').
   */
  onSwitchChange?: (value: boolean) => void;

  // ============================================================================
  // Appearance
  // ============================================================================

  /**
   * Size variant affecting height and layout.
   * @default 'default'
   */
  size?: ListItemSize;

  /**
   * Whether this item shows a destructive action (red text).
   * @default false
   */
  destructive?: boolean;

  /**
   * Whether the item is currently selected/highlighted.
   * @default false
   */
  selected?: boolean;

  /**
   * Whether to show the bottom separator.
   * @default true
   */
  showSeparator?: boolean;

  /**
   * Separator inset style.
   * @default 'inset' (left padding matching content)
   */
  separatorInset?: 'none' | 'inset' | 'full';

  // ============================================================================
  // Interaction
  // ============================================================================

  /**
   * Callback when the item is pressed.
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * Callback when the item is long pressed.
   */
  onLongPress?: (event: GestureResponderEvent) => void;

  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean;

  // ============================================================================
  // Accessibility
  // ============================================================================

  /**
   * Test ID for testing frameworks.
   */
  testID?: string;

  /**
   * Accessibility label for screen readers.
   */
  accessibilityLabel?: string;

  /**
   * Accessibility hint providing additional context.
   */
  accessibilityHint?: string;

  // ============================================================================
  // Styling
  // ============================================================================

  /**
   * Custom style for the container.
   */
  style?: ViewStyle;

  /**
   * Custom style for the title.
   */
  titleStyle?: TextStyle;

  /**
   * Custom style for the subtitle.
   */
  subtitleStyle?: TextStyle;

  /**
   * Custom style for the value text.
   */
  valueStyle?: TextStyle;

  /**
   * Custom style for the content area.
   */
  contentStyle?: ViewStyle;
}

/**
 * ListItem size configuration.
 */
export interface ListItemSizeConfig {
  /**
   * Total height of the row.
   */
  height: number;

  /**
   * Left icon size.
   */
  iconSize: number;

  /**
   * Left icon container size (when using background).
   */
  iconContainerSize: number;

  /**
   * Vertical padding.
   */
  paddingVertical: number;
}
