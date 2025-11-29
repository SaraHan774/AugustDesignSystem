/**
 * AugustDesignSystem - TypingIndicator Component Types
 *
 * Type definitions for the TypingIndicator component following Apple HIG.
 * Used to display when users are typing in a chat conversation.
 */

import type { ViewStyle, TextStyle } from 'react-native';

/**
 * TypingIndicator display variants.
 *
 * - `dots`: Three animated dots (iOS Messages style)
 * - `text`: Text with user name(s) (e.g., "John is typing...")
 * - `bubble`: Dots inside a message bubble
 */
export type TypingIndicatorVariant = 'dots' | 'text' | 'bubble';

/**
 * TypingIndicator sizes.
 *
 * - `sm`: Small indicator (for compact layouts)
 * - `md`: Medium indicator (default)
 * - `lg`: Large indicator (for prominent displays)
 */
export type TypingIndicatorSize = 'sm' | 'md' | 'lg';

/**
 * Props for the TypingIndicator component.
 */
export interface TypingIndicatorProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Whether the indicator is visible.
   * @default true
   */
  isTyping?: boolean;

  /**
   * Names of users who are typing.
   * Used for text variant: "John is typing...", "John and Jane are typing..."
   */
  typingUsers?: string[];

  /**
   * Custom text to display (overrides auto-generated text).
   */
  text?: string;

  // ============================================================================
  // Visual Style
  // ============================================================================

  /**
   * Display variant of the indicator.
   * @default 'dots'
   */
  variant?: TypingIndicatorVariant;

  /**
   * Size of the indicator.
   * @default 'md'
   */
  size?: TypingIndicatorSize;

  /**
   * Animation duration in milliseconds.
   * @default 600
   */
  animationDuration?: number;

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
   * Custom style for the container.
   */
  style?: ViewStyle;

  /**
   * Custom style for the text (when using text variant).
   */
  textStyle?: TextStyle;

  /**
   * Custom style for the dots container.
   */
  dotsContainerStyle?: ViewStyle;

  /**
   * Custom color for the dots.
   */
  dotColor?: string;
}

/**
 * Style props derived from TypingIndicator state.
 */
export interface TypingIndicatorStyleProps {
  variant: TypingIndicatorVariant;
  size: TypingIndicatorSize;
  isTyping: boolean;
}
