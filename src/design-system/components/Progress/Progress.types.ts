/**
 * AugustDesignSystem - Progress Component Types
 *
 * Type definitions for the progress indicator component.
 * Supports linear and circular variants with determinate/indeterminate modes.
 */

import type { ViewStyle, TextStyle } from 'react-native';

/**
 * Progress visual variants.
 */
export type ProgressVariant = 'linear' | 'circular';

/**
 * Progress size variants.
 */
export type ProgressSize = 'sm' | 'md' | 'lg';

/**
 * Progress color schemes.
 */
export type ProgressColor =
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/**
 * Props for the Progress component.
 */
export interface ProgressProps {
  // ============================================================================
  // Value
  // ============================================================================

  /**
   * Progress value between 0 and 100.
   * When not provided, progress is indeterminate (animated).
   */
  value?: number;

  /**
   * Whether the progress is indeterminate (continuously animating).
   * Automatically true when value is not provided.
   * @default false when value is provided
   */
  indeterminate?: boolean;

  // ============================================================================
  // Appearance
  // ============================================================================

  /**
   * Progress variant type.
   * @default 'linear'
   */
  variant?: ProgressVariant;

  /**
   * Size of the progress indicator.
   * @default 'md'
   */
  size?: ProgressSize;

  /**
   * Color scheme of the progress indicator.
   * @default 'primary'
   */
  color?: ProgressColor;

  /**
   * Custom color for the progress track (filled portion).
   * Overrides color scheme.
   */
  trackColor?: string;

  /**
   * Custom color for the background track.
   */
  backgroundColor?: string;

  // ============================================================================
  // Label
  // ============================================================================

  /**
   * Whether to show the percentage label.
   * For circular: shows in center
   * For linear: shows to the right
   * @default false
   */
  showLabel?: boolean;

  /**
   * Custom label format function.
   * @example (value) => `${value}% complete`
   */
  formatLabel?: (value: number) => string;

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
   * Custom style for the label.
   */
  labelStyle?: TextStyle;
}

/**
 * Linear progress size configuration.
 */
export interface LinearProgressSizeConfig {
  /**
   * Height of the progress bar.
   */
  height: number;

  /**
   * Border radius of the progress bar.
   */
  borderRadius: number;
}

/**
 * Circular progress size configuration.
 */
export interface CircularProgressSizeConfig {
  /**
   * Overall size (diameter) of the circle.
   */
  size: number;

  /**
   * Stroke width of the circle.
   */
  strokeWidth: number;

  /**
   * Font size for the label.
   */
  fontSize: number;
}
