/**
 * AugustDesignSystem - Spinner Component Types
 *
 * Type definitions for the loading spinner/activity indicator component.
 */

import type { ViewStyle, TextStyle } from 'react-native';

/**
 * Spinner size variants.
 */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Spinner size values in points.
 */
export const SPINNER_SIZES: Record<SpinnerSize, number> = {
  xs: 16,
  sm: 20,
  md: 28,
  lg: 40,
};

/**
 * Spinner color variants (semantic).
 */
export type SpinnerColor =
  | 'primary'
  | 'secondary'
  | 'tint'
  | 'onPrimary'
  | 'onSurface'
  | string;

/**
 * Props for the Spinner component.
 */
export interface SpinnerProps {
  // ============================================================================
  // Appearance
  // ============================================================================

  /**
   * Size of the spinner.
   * @default 'md'
   */
  size?: SpinnerSize | number;

  /**
   * Color of the spinner.
   * Can be a semantic name or custom color string.
   * @default 'tint'
   */
  color?: SpinnerColor;

  // ============================================================================
  // Label
  // ============================================================================

  /**
   * Optional label text displayed below the spinner.
   */
  label?: string;

  /**
   * Position of the label relative to the spinner.
   * @default 'bottom'
   */
  labelPosition?: 'bottom' | 'right';

  // ============================================================================
  // Behavior
  // ============================================================================

  /**
   * Whether the spinner is animating.
   * @default true
   */
  animating?: boolean;

  /**
   * Whether to hide the spinner when not animating.
   * @default true
   */
  hidesWhenStopped?: boolean;

  // ============================================================================
  // Accessibility
  // ============================================================================

  /**
   * Test ID for testing frameworks.
   */
  testID?: string;

  /**
   * Accessibility label for screen readers.
   * @default 'Loading'
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
   * Custom style for the label text.
   */
  labelStyle?: TextStyle;
}
