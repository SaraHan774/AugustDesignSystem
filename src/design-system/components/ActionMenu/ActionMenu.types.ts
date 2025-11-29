/**
 * AugustDesignSystem - ActionMenu/ContextMenu Component Types
 *
 * Type definitions for the contextual menu component.
 * Follows iOS Human Interface Guidelines for context menus.
 */

import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { CommonIconName } from '../Icon/Icon.types';

/**
 * Action menu item configuration.
 */
export interface ActionMenuItem {
  /**
   * Unique key for the item.
   */
  key: string;

  /**
   * Item label text.
   */
  label: string;

  /**
   * Icon name for the item.
   */
  icon?: CommonIconName;

  /**
   * Whether this is a destructive action (red styling).
   * @default false
   */
  destructive?: boolean;

  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback when the item is pressed.
   */
  onPress: () => void;

  /**
   * Accessibility label for the item.
   */
  accessibilityLabel?: string;
}

/**
 * Action menu section for grouping items.
 */
export interface ActionMenuSection {
  /**
   * Unique key for the section.
   */
  key: string;

  /**
   * Optional section title.
   */
  title?: string;

  /**
   * Items in this section.
   */
  items: ActionMenuItem[];
}

/**
 * Props for the ActionMenu component.
 */
export interface ActionMenuProps {
  // ============================================================================
  // Visibility
  // ============================================================================

  /**
   * Whether the menu is visible.
   */
  visible: boolean;

  /**
   * Callback when the menu is requested to close.
   */
  onClose: () => void;

  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Menu items (flat list).
   * Use this OR sections, not both.
   */
  items?: ActionMenuItem[];

  /**
   * Menu sections (grouped items).
   * Use this OR items, not both.
   */
  sections?: ActionMenuSection[];

  /**
   * Optional header content.
   */
  header?: ReactNode;

  /**
   * Cancel button label.
   * @default 'Cancel'
   */
  cancelLabel?: string;

  /**
   * Whether to show the cancel button.
   * @default true
   */
  showCancel?: boolean;

  // ============================================================================
  // Behavior
  // ============================================================================

  /**
   * Whether tapping the backdrop closes the menu.
   * @default true
   */
  dismissOnBackdrop?: boolean;

  /**
   * Whether selecting an item automatically closes the menu.
   * @default true
   */
  dismissOnSelect?: boolean;

  // ============================================================================
  // Appearance
  // ============================================================================

  /**
   * Custom backdrop opacity.
   * @default 0.4
   */
  backdropOpacity?: number;

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

  // ============================================================================
  // Styling
  // ============================================================================

  /**
   * Custom style for the menu container.
   */
  style?: ViewStyle;

  /**
   * Custom style for menu items.
   */
  itemStyle?: ViewStyle;
}

/**
 * Trigger component props for wrapping children with long-press action.
 */
export interface ActionMenuTriggerProps {
  /**
   * The element that triggers the menu on long press.
   */
  children: ReactNode;

  /**
   * Menu items.
   */
  items?: ActionMenuItem[];

  /**
   * Menu sections.
   */
  sections?: ActionMenuSection[];

  /**
   * Callback when menu opens.
   */
  onOpen?: () => void;

  /**
   * Callback when menu closes.
   */
  onClose?: () => void;

  /**
   * Whether the trigger is disabled.
   */
  disabled?: boolean;

  /**
   * Long press duration in milliseconds.
   * @default 500
   */
  delayLongPress?: number;
}
