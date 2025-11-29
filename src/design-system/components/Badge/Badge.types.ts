/**
 * AugustDesignSystem - Badge Component Types
 *
 * Type definitions for the generic badge component.
 * Supports count, dot, and label variants with position anchoring.
 */

import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';

/**
 * Badge visual variants.
 */
export type BadgeVariant = 'count' | 'dot' | 'label';

/**
 * Badge color schemes.
 */
export type BadgeColor =
  | 'primary'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'neutral';

/**
 * Badge size variants.
 */
export type BadgeSize = 'sm' | 'md';

/**
 * Badge position when used as an overlay on another element.
 */
export type BadgePosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

/**
 * Props for the Badge component.
 */
export interface BadgeProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Badge variant type.
   * @default 'count'
   */
  variant?: BadgeVariant;

  /**
   * Count value for 'count' variant.
   * Will show max+ when exceeding maxCount (e.g., "99+").
   */
  count?: number;

  /**
   * Text label for 'label' variant.
   */
  label?: string;

  /**
   * Maximum count to display before showing overflow.
   * @default 99
   */
  maxCount?: number;

  /**
   * Show zero count (when count is 0).
   * @default false
   */
  showZero?: boolean;

  // ============================================================================
  // Appearance
  // ============================================================================

  /**
   * Color scheme of the badge.
   * @default 'error' (red, standard notification color)
   */
  color?: BadgeColor;

  /**
   * Size of the badge.
   * @default 'md'
   */
  size?: BadgeSize;

  /**
   * Whether the badge is visible.
   * @default true
   */
  visible?: boolean;

  // ============================================================================
  // Positioning (when wrapping children)
  // ============================================================================

  /**
   * Content to wrap with the badge.
   * When provided, badge will be positioned relative to this content.
   */
  children?: ReactNode;

  /**
   * Position of the badge relative to children.
   * Only applies when children are provided.
   * @default 'top-right'
   */
  position?: BadgePosition;

  /**
   * Offset from the corner in pixels.
   * @default { x: 0, y: 0 }
   */
  offset?: { x?: number; y?: number };

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
   * Custom style for the badge container.
   */
  style?: ViewStyle;

  /**
   * Custom style for the badge text.
   */
  textStyle?: TextStyle;

  /**
   * Custom style for the wrapper when children are provided.
   */
  containerStyle?: ViewStyle;
}

/**
 * Badge size configuration.
 */
export interface BadgeSizeConfig {
  /**
   * Minimum width of the badge.
   */
  minWidth: number;

  /**
   * Height of the badge.
   */
  height: number;

  /**
   * Horizontal padding.
   */
  paddingHorizontal: number;

  /**
   * Font size for count/label.
   */
  fontSize: number;

  /**
   * Dot size (diameter).
   */
  dotSize: number;
}
