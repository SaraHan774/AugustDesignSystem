/**
 * AugustDesignSystem - Header/NavigationBar Component Types
 *
 * Type definitions for the top navigation bar component.
 * Follows iOS Human Interface Guidelines for navigation bars.
 */

import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
import type { CommonIconName } from '../Icon/Icon.types';

/**
 * Header visual variants.
 */
export type HeaderVariant = 'default' | 'large' | 'search' | 'chat';

/**
 * Header background style.
 */
export type HeaderBackground = 'solid' | 'transparent' | 'blur';

/**
 * Props for the Header component.
 */
export interface HeaderProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Header variant style.
   * - default: Standard centered title
   * - large: Large title (iOS 11+ style)
   * - search: With integrated search bar
   * - chat: Chat header with avatar, name, status
   * @default 'default'
   */
  variant?: HeaderVariant;

  /**
   * Title text.
   */
  title?: string;

  /**
   * Subtitle text (shown below title).
   */
  subtitle?: string;

  /**
   * Custom title element (overrides title prop).
   */
  titleElement?: ReactNode;

  // ============================================================================
  // Left Actions
  // ============================================================================

  /**
   * Show back button on the left.
   * @default false
   */
  showBackButton?: boolean;

  /**
   * Back button callback.
   */
  onBackPress?: () => void;

  /**
   * Custom back button icon.
   * @default 'back' (chevron.left)
   */
  backIcon?: CommonIconName;

  /**
   * Back button label (iOS style, e.g., "Back" or previous screen title).
   */
  backLabel?: string;

  /**
   * Left action buttons.
   */
  leftActions?: HeaderAction[];

  /**
   * Custom left element (overrides leftActions).
   */
  leftElement?: ReactNode;

  // ============================================================================
  // Right Actions
  // ============================================================================

  /**
   * Right action buttons.
   */
  rightActions?: HeaderAction[];

  /**
   * Custom right element (overrides rightActions).
   */
  rightElement?: ReactNode;

  // ============================================================================
  // Appearance
  // ============================================================================

  /**
   * Background style.
   * @default 'solid'
   */
  background?: HeaderBackground;

  /**
   * Custom background color.
   */
  backgroundColor?: string;

  /**
   * Whether to show the bottom border.
   * @default true for solid background, false for transparent
   */
  showBorder?: boolean;

  /**
   * Whether to handle safe area insets.
   * @default true
   */
  safeArea?: boolean;

  // ============================================================================
  // Search (for 'search' variant)
  // ============================================================================

  /**
   * Search placeholder text.
   */
  searchPlaceholder?: string;

  /**
   * Search value (controlled).
   */
  searchValue?: string;

  /**
   * Search value change callback.
   */
  onSearchChange?: (value: string) => void;

  /**
   * Search submit callback.
   */
  onSearchSubmit?: () => void;

  /**
   * Whether the search bar is loading.
   */
  searchLoading?: boolean;

  // ============================================================================
  // Chat (for 'chat' variant)
  // ============================================================================

  /**
   * Avatar element for chat variant.
   */
  avatar?: ReactNode;

  /**
   * Online status for chat variant.
   */
  status?: 'online' | 'offline' | 'away' | 'busy';

  /**
   * Callback when chat header content is pressed.
   */
  onChatPress?: () => void;

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
   * Custom style for the header container.
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
}

/**
 * Header action button configuration.
 */
export interface HeaderAction {
  /**
   * Unique key for the action.
   */
  key: string;

  /**
   * Icon name.
   */
  icon?: CommonIconName;

  /**
   * Text label (alternative to icon).
   */
  label?: string;

  /**
   * Callback when action is pressed.
   */
  onPress: () => void;

  /**
   * Whether the action is disabled.
   */
  disabled?: boolean;

  /**
   * Custom color for the action.
   */
  color?: string;

  /**
   * Accessibility label.
   */
  accessibilityLabel?: string;
}
