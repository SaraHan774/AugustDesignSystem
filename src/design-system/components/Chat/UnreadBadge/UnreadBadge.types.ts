/**
 * AugustDesignSystem - UnreadBadge Component Types
 *
 * Type definitions for the UnreadBadge component following Apple HIG.
 * Used to display unread message counts in chat applications.
 */

import type { ViewStyle, TextStyle } from 'react-native';

/**
 * UnreadBadge sizes following design system scale.
 *
 * - `sm`: Small badge (16pt height) - for compact layouts
 * - `md`: Medium badge (20pt height) - default size
 * - `lg`: Large badge (24pt height) - for prominent displays
 */
export type UnreadBadgeSize = 'sm' | 'md' | 'lg';

/**
 * UnreadBadge color schemes for different contexts.
 *
 * - `primary`: Default tint color (blue)
 * - `destructive`: Error/urgent color (red)
 * - `neutral`: Gray for less emphasis
 */
export type UnreadBadgeColorScheme = 'primary' | 'destructive' | 'neutral';

/**
 * Props for the UnreadBadge component.
 */
export interface UnreadBadgeProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * The unread count to display.
   * Values above 99 will display as "99+".
   * If 0 or undefined, the badge will not render.
   */
  count?: number;

  /**
   * Maximum count to display before showing "+".
   * @default 99
   */
  maxCount?: number;

  // ============================================================================
  // Visual Style
  // ============================================================================

  /**
   * Size of the badge.
   * @default 'md'
   */
  size?: UnreadBadgeSize;

  /**
   * Color scheme for the badge.
   * @default 'primary'
   */
  colorScheme?: UnreadBadgeColorScheme;

  /**
   * Whether to show as a dot without count (for minimal indication).
   * @default false
   */
  dot?: boolean;

  // ============================================================================
  // Accessibility
  // ============================================================================

  /**
   * Test ID for testing frameworks.
   */
  testID?: string;

  /**
   * Accessibility label for screen readers.
   * Defaults to "[count] unread messages" if not provided.
   */
  accessibilityLabel?: string;

  // ============================================================================
  // Styling
  // ============================================================================

  /**
   * Custom style for the badge container.
   */
  style?: ViewStyle;

  /**
   * Custom style for the count text.
   */
  textStyle?: TextStyle;
}

/**
 * Style props derived from UnreadBadge state.
 */
export interface UnreadBadgeStyleProps {
  count: number;
  size: UnreadBadgeSize;
  colorScheme: UnreadBadgeColorScheme;
  dot: boolean;
}
