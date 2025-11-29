/**
 * AugustDesignSystem - Pressable Component Types
 *
 * Type definitions for the enhanced Pressable component with haptics,
 * visual feedback, and accessibility support.
 */

import type { ReactNode } from 'react';
import type {
  ViewStyle,
  GestureResponderEvent,
  AccessibilityRole,
  AccessibilityState,
  LayoutChangeEvent,
} from 'react-native';

/**
 * Haptic feedback intensity options.
 */
export type HapticFeedbackType =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'selection'
  | 'success'
  | 'warning'
  | 'error'
  | 'none';

/**
 * Press animation style options.
 */
export type PressAnimationType = 'opacity' | 'scale' | 'both' | 'none';

/**
 * Props for the Pressable component.
 */
export interface PressableProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Content to render inside the pressable.
   */
  children?: ReactNode | ((state: PressableState) => ReactNode);

  // ============================================================================
  // Events
  // ============================================================================

  /**
   * Handler called when the pressable is pressed.
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * Handler called when the pressable is long pressed.
   */
  onLongPress?: (event: GestureResponderEvent) => void;

  /**
   * Handler called when touch starts.
   */
  onPressIn?: (event: GestureResponderEvent) => void;

  /**
   * Handler called when touch ends.
   */
  onPressOut?: (event: GestureResponderEvent) => void;

  /**
   * Handler called when layout changes.
   */
  onLayout?: (event: LayoutChangeEvent) => void;

  /**
   * Delay before onLongPress is triggered (in milliseconds).
   * @default 500
   */
  delayLongPress?: number;

  /**
   * Delay before onPressIn is triggered (in milliseconds).
   * @default 0
   */
  delayPressIn?: number;

  /**
   * Delay before onPressOut is triggered (in milliseconds).
   * @default 0
   */
  delayPressOut?: number;

  // ============================================================================
  // State
  // ============================================================================

  /**
   * Whether the pressable is disabled.
   * @default false
   */
  disabled?: boolean;

  // ============================================================================
  // Visual Feedback
  // ============================================================================

  /**
   * Type of press animation.
   * @default 'opacity'
   */
  pressAnimation?: PressAnimationType;

  /**
   * Opacity when pressed (if pressAnimation includes opacity).
   * @default 0.7
   */
  pressedOpacity?: number;

  /**
   * Scale when pressed (if pressAnimation includes scale).
   * @default 0.98
   */
  pressedScale?: number;

  /**
   * Opacity when disabled.
   * @default 0.5
   */
  disabledOpacity?: number;

  /**
   * Enable Android ripple effect.
   * @default true on Android, false on iOS
   */
  enableRipple?: boolean;

  /**
   * Ripple color for Android.
   * Uses theme tint color by default.
   */
  rippleColor?: string;

  /**
   * Whether ripple should be bounded to the pressable bounds.
   * @default true
   */
  rippleBorderless?: boolean;

  // ============================================================================
  // Haptics
  // ============================================================================

  /**
   * Type of haptic feedback to trigger on press.
   * @default 'light'
   */
  hapticFeedback?: HapticFeedbackType;

  /**
   * Whether to trigger haptic on press in (touch start).
   * @default true
   */
  hapticOnPressIn?: boolean;

  // ============================================================================
  // Hit Area
  // ============================================================================

  /**
   * Additional hit slop area around the pressable.
   * Useful for small touch targets.
   */
  hitSlop?:
    | number
    | {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
      };

  /**
   * Offset for press rect.
   */
  pressRetentionOffset?:
    | number
    | {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
      };

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

  /**
   * Accessibility role.
   * @default 'button'
   */
  accessibilityRole?: AccessibilityRole;

  /**
   * Accessibility state.
   */
  accessibilityState?: AccessibilityState;

  // ============================================================================
  // Styling
  // ============================================================================

  /**
   * Style for the pressable container.
   * Can be a style object or a function that receives press state.
   */
  style?: ViewStyle | ((state: PressableState) => ViewStyle);

  /**
   * Additional style applied when pressed.
   */
  pressedStyle?: ViewStyle;

  /**
   * Additional style applied when disabled.
   */
  disabledStyle?: ViewStyle;
}

/**
 * State provided to children render function and style function.
 */
export interface PressableState {
  /**
   * Whether the pressable is currently being pressed.
   */
  pressed: boolean;
}

/**
 * Internal state for animation.
 */
export interface PressableAnimationState {
  opacity: number;
  scale: number;
}