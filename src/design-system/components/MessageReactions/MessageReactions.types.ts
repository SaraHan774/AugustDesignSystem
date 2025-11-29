/**
 * AugustDesignSystem - MessageReactions Component Types
 *
 * Type definitions for the emoji reactions display component.
 * Designed for chat message reactions.
 */

import type { ViewStyle } from 'react-native';

/**
 * Individual reaction data.
 */
export interface Reaction {
  /**
   * Emoji character or string.
   */
  emoji: string;

  /**
   * Number of users who reacted with this emoji.
   */
  count: number;

  /**
   * Whether the current user has reacted with this emoji.
   */
  isSelected?: boolean;

  /**
   * Optional list of user names who reacted (for tooltip).
   */
  users?: string[];
}

/**
 * Props for the MessageReactions component.
 */
export interface MessageReactionsProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Array of reactions to display.
   */
  reactions: Reaction[];

  /**
   * Maximum number of reactions to show before collapsing.
   * @default 6
   */
  maxVisible?: number;

  // ============================================================================
  // Callbacks
  // ============================================================================

  /**
   * Callback when a reaction is tapped (to toggle).
   */
  onReactionPress?: (emoji: string) => void;

  /**
   * Callback when a reaction is long pressed (to show who reacted).
   */
  onReactionLongPress?: (reaction: Reaction) => void;

  /**
   * Callback when the add button is pressed.
   */
  onAddPress?: () => void;

  /**
   * Callback when overflow is pressed (to show all reactions).
   */
  onOverflowPress?: () => void;

  // ============================================================================
  // Appearance
  // ============================================================================

  /**
   * Size of reaction pills.
   * @default 'md'
   */
  size?: 'sm' | 'md';

  /**
   * Whether to show the add reaction button.
   * @default true
   */
  showAddButton?: boolean;

  /**
   * Whether to animate changes.
   * @default true
   */
  animated?: boolean;

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
   * Custom style for the container.
   */
  style?: ViewStyle;

  /**
   * Custom style for individual reaction pills.
   */
  reactionStyle?: ViewStyle;
}

/**
 * Reaction pill size configuration.
 */
export interface ReactionSizeConfig {
  /**
   * Height of the pill.
   */
  height: number;

  /**
   * Horizontal padding.
   */
  paddingHorizontal: number;

  /**
   * Emoji font size.
   */
  emojiFontSize: number;

  /**
   * Count font size.
   */
  countFontSize: number;

  /**
   * Gap between emoji and count.
   */
  gap: number;
}
