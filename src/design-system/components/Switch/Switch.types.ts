/**
 * AugustDesignSystem - Switch Component Types
 *
 * Type definitions for the iOS-style toggle switch component.
 * Follows Apple Human Interface Guidelines for switch dimensions and behavior.
 */

import type { ViewStyle } from 'react-native';

/**
 * Switch size variants.
 * - sm: Compact size for dense UIs
 * - md: Default iOS switch size (51x31)
 */
export type SwitchSize = 'sm' | 'md';

/**
 * Props for the Switch component.
 */
export interface SwitchProps {
  // ============================================================================
  // State
  // ============================================================================

  /**
   * Whether the switch is on.
   */
  value: boolean;

  /**
   * Callback when the switch is toggled.
   */
  onValueChange: (value: boolean) => void;

  /**
   * Whether the switch is disabled.
   * @default false
   */
  disabled?: boolean;

  // ============================================================================
  // Appearance
  // ============================================================================

  /**
   * Size of the switch.
   * @default 'md'
   */
  size?: SwitchSize;

  /**
   * Color of the track when switch is on.
   * Uses theme's interactive.tint by default.
   */
  trackColorOn?: string;

  /**
   * Color of the track when switch is off.
   * Uses theme's fill.secondary by default.
   */
  trackColorOff?: string;

  /**
   * Color of the thumb (the circular knob).
   * @default '#FFFFFF'
   */
  thumbColor?: string;

  // ============================================================================
  // Behavior
  // ============================================================================

  /**
   * Whether to trigger haptic feedback on toggle.
   * @default true
   */
  hapticFeedback?: boolean;

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

  /**
   * Accessibility hint providing additional context.
   */
  accessibilityHint?: string;

  // ============================================================================
  // Styling
  // ============================================================================

  /**
   * Custom style for the switch container.
   */
  style?: ViewStyle;
}

/**
 * Switch size configuration.
 */
export interface SwitchSizeConfig {
  /**
   * Width of the track.
   */
  trackWidth: number;

  /**
   * Height of the track.
   */
  trackHeight: number;

  /**
   * Diameter of the thumb.
   */
  thumbSize: number;

  /**
   * Padding inside the track.
   */
  trackPadding: number;
}
