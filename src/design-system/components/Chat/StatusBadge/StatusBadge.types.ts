/**
 * AugustDesignSystem - StatusBadge Component Types
 *
 * Type definitions for the StatusBadge component following Apple HIG.
 * Used to display online/offline presence status.
 */

import type { ViewStyle, TextStyle } from 'react-native';

/**
 * Status types for presence indication.
 *
 * - `online`: User is currently active (green indicator)
 * - `offline`: User is not active (gray indicator)
 * - `away`: User is away/idle (optional, yellow indicator)
 * - `busy`: User is busy/do not disturb (optional, red indicator)
 */
export type PresenceStatus = 'online' | 'offline' | 'away' | 'busy';

/**
 * StatusBadge sizes following design system scale.
 *
 * - `sm`: Small dot (8pt) - for compact layouts like list items
 * - `md`: Medium dot (10pt) - default size
 * - `lg`: Large dot (12pt) - for prominent displays like profile headers
 */
export type StatusBadgeSize = 'sm' | 'md' | 'lg';

/**
 * Props for the StatusBadge component.
 */
export interface StatusBadgeProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * The presence status to display.
   * @default 'offline'
   */
  status?: PresenceStatus;

  /**
   * Optional text label to display alongside the indicator.
   * e.g., "Online", "Last seen 5 min ago"
   */
  label?: string;

  // ============================================================================
  // Visual Style
  // ============================================================================

  /**
   * Size of the status indicator dot.
   * @default 'md'
   */
  size?: StatusBadgeSize;

  /**
   * Whether to show only the dot without label.
   * @default false
   */
  dotOnly?: boolean;

  /**
   * Whether to show a border around the dot (useful when overlaid on avatars).
   * @default false
   */
  showBorder?: boolean;

  // ============================================================================
  // Accessibility
  // ============================================================================

  /**
   * Test ID for testing frameworks.
   */
  testID?: string;

  /**
   * Accessibility label for screen readers.
   * Defaults to status text if not provided.
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
   * Custom style for the dot indicator.
   */
  dotStyle?: ViewStyle;

  /**
   * Custom style for the label text.
   */
  labelStyle?: TextStyle;
}

/**
 * Style props derived from StatusBadge state.
 */
export interface StatusBadgeStyleProps {
  status: PresenceStatus;
  size: StatusBadgeSize;
  dotOnly: boolean;
  showBorder: boolean;
}
