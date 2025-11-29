/**
 * AugustDesignSystem - TabBar (Bottom Navigation) Component Types
 *
 * Type definitions for the bottom tab bar component.
 * Follows iOS Human Interface Guidelines for tab bars.
 */

import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
import type { CommonIconName } from '../Icon/Icon.types';

/**
 * Tab item configuration.
 */
export interface TabBarItem {
  /**
   * Unique key for the tab.
   */
  key: string;

  /**
   * Tab label text.
   */
  label: string;

  /**
   * Icon name for inactive state.
   */
  icon: CommonIconName;

  /**
   * Icon name for active state (optional, uses icon with fill if not provided).
   */
  activeIcon?: CommonIconName;

  /**
   * Badge count to display on the tab.
   */
  badge?: number;

  /**
   * Whether to show a dot badge instead of count.
   */
  badgeDot?: boolean;

  /**
   * Whether the tab is disabled.
   */
  disabled?: boolean;

  /**
   * Accessibility label for the tab.
   */
  accessibilityLabel?: string;
}

/**
 * Props for the TabBar component.
 */
export interface TabBarProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Tab items to display (3-5 items recommended).
   */
  items: TabBarItem[];

  /**
   * Currently active tab key.
   */
  activeKey: string;

  /**
   * Callback when a tab is pressed.
   */
  onTabPress: (key: string) => void;

  // ============================================================================
  // Appearance
  // ============================================================================

  /**
   * Active tab color (icon and label).
   * Uses theme's interactive.tint by default.
   */
  activeColor?: string;

  /**
   * Inactive tab color (icon and label).
   * Uses theme's label.secondary by default.
   */
  inactiveColor?: string;

  /**
   * Background color of the tab bar.
   */
  backgroundColor?: string;

  /**
   * Whether to show labels below icons.
   * @default true
   */
  showLabels?: boolean;

  /**
   * Whether to show the top border.
   * @default true
   */
  showBorder?: boolean;

  // ============================================================================
  // Behavior
  // ============================================================================

  /**
   * Whether to handle safe area insets at the bottom.
   * @default true
   */
  safeArea?: boolean;

  /**
   * Whether to trigger haptic feedback on tab press.
   * @default true
   */
  hapticFeedback?: boolean;

  // ============================================================================
  // Accessibility
  // ============================================================================

  /**
   * Test ID for testing frameworks.
   */
  testID?: string;

  // ============================================================================
  // Styling
  // ============================================================================

  /**
   * Custom style for the tab bar container.
   */
  style?: ViewStyle;

  /**
   * Custom style for individual tab items.
   */
  tabStyle?: ViewStyle;

  /**
   * Custom style for the label text.
   */
  labelStyle?: TextStyle;
}

/**
 * Props for individual tab item component.
 */
export interface TabItemProps {
  item: TabBarItem;
  isActive: boolean;
  activeColor: string;
  inactiveColor: string;
  showLabel: boolean;
  onPress: () => void;
  tabStyle?: ViewStyle;
  labelStyle?: TextStyle;
}
