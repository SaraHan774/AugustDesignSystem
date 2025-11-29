/**
 * AugustDesignSystem - Divider Component Types
 *
 * Type definitions for the Divider/Separator component.
 */

import type { ViewStyle, TextStyle } from 'react-native';

/**
 * Divider variant options.
 */
export type DividerVariant = 'full' | 'inset' | 'middle' | 'withLabel';

/**
 * Divider orientation.
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Props for the Divider component.
 */
export interface DividerProps {
  // ============================================================================
  // Variant & Orientation
  // ============================================================================

  /**
   * Visual variant of the divider.
   * - `full`: Edge-to-edge separator
   * - `inset`: Left inset (iOS list style)
   * - `middle`: Inset on both sides
   * - `withLabel`: Centered text with lines on sides
   * @default 'full'
   */
  variant?: DividerVariant;

  /**
   * Orientation of the divider.
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;

  // ============================================================================
  // Content (for withLabel variant)
  // ============================================================================

  /**
   * Label text to display in the center (only for withLabel variant).
   */
  label?: string;

  // ============================================================================
  // Appearance
  // ============================================================================

  /**
   * Thickness of the divider line.
   * @default StyleSheet.hairlineWidth (0.5pt on most devices)
   */
  thickness?: number;

  /**
   * Color of the divider line.
   * Uses theme separator color by default.
   */
  color?: string;

  /**
   * Left inset amount for 'inset' variant.
   * @default 16 (spacing.lg)
   */
  insetLeft?: number;

  /**
   * Right inset amount for 'middle' variant.
   * @default 16 (spacing.lg)
   */
  insetRight?: number;

  /**
   * Vertical spacing above and below the divider.
   * @default 0
   */
  spacing?: number;

  // ============================================================================
  // Accessibility
  // ============================================================================

  /**
   * Test ID for testing frameworks.
   */
  testID?: string;

  /**
   * Whether the divider is decorative (hidden from screen readers).
   * @default true
   */
  decorative?: boolean;

  // ============================================================================
  // Styling
  // ============================================================================

  /**
   * Custom style for the divider container.
   */
  style?: ViewStyle;

  /**
   * Custom style for the label text (withLabel variant).
   */
  labelStyle?: TextStyle;

  /**
   * Custom style for the divider line.
   */
  lineStyle?: ViewStyle;
}