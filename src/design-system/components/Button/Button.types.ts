/**
 * AugustDesignSystem - Button Component Types
 *
 * Type definitions for the Button component following Apple HIG.
 */

import type { ReactNode } from 'react';
import type {
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  AccessibilityRole,
  AccessibilityState,
} from 'react-native';

/**
 * Button visual variants following iOS button styles.
 *
 * - `filled`: Primary action button with solid background (iOS "Filled" style)
 * - `tinted`: Subtle button with tinted background (iOS "Tinted" style)
 * - `gray`: Neutral button with gray background
 * - `outlined`: Button with border, no fill (iOS "Bordered" style)
 * - `ghost`: Transparent button, text only (iOS "Plain" style)
 */
export type ButtonVariant = 'filled' | 'tinted' | 'gray' | 'outlined' | 'ghost';

/**
 * Button sizes following Apple HIG touch target guidelines.
 *
 * - `sm`: Small button (32pt height) - for compact layouts
 * - `md`: Medium button (44pt height) - default, meets minimum touch target
 * - `lg`: Large button (50pt height) - prominent CTAs
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button color schemes for semantic meaning.
 */
export type ButtonColorScheme =
  | 'primary' // Default tint color
  | 'destructive' // Red, for dangerous actions
  | 'success' // Green, for positive actions
  | 'neutral'; // Gray, for secondary actions

/**
 * Button loading indicator position.
 */
export type LoadingPosition = 'left' | 'center' | 'right';

/**
 * Props for the Button component.
 */
export interface ButtonProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Button label text.
   * Either `title` or `children` must be provided.
   */
  title?: string;

  /**
   * Custom button content.
   * If provided, `title` is ignored.
   */
  children?: ReactNode;

  // ============================================================================
  // Visual Style
  // ============================================================================

  /**
   * Visual variant of the button.
   * @default 'filled'
   */
  variant?: ButtonVariant;

  /**
   * Size of the button.
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Color scheme for the button.
   * @default 'primary'
   */
  colorScheme?: ButtonColorScheme;

  /**
   * Whether the button should take full width of its container.
   * @default false
   */
  fullWidth?: boolean;

  // ============================================================================
  // Icons
  // ============================================================================

  /**
   * Icon to display on the left side of the button text.
   */
  leftIcon?: ReactNode;

  /**
   * Icon to display on the right side of the button text.
   */
  rightIcon?: ReactNode;

  /**
   * When true, renders only the icon without text.
   * Requires `leftIcon` or `rightIcon` to be set.
   * @default false
   */
  iconOnly?: boolean;

  // ============================================================================
  // State
  // ============================================================================

  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button is in a loading state.
   * When true, shows a loading indicator and disables interaction.
   * @default false
   */
  loading?: boolean;

  /**
   * Position of the loading indicator.
   * @default 'center'
   */
  loadingPosition?: LoadingPosition;

  /**
   * Text to display while loading.
   * If not provided, the original title is hidden.
   */
  loadingText?: string;

  // ============================================================================
  // Events
  // ============================================================================

  /**
   * Handler called when the button is pressed.
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * Handler called when the button is long pressed.
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
   * Delay before onLongPress is triggered (in milliseconds).
   * @default 500
   */
  delayLongPress?: number;

  // ============================================================================
  // Haptics
  // ============================================================================

  /**
   * Type of haptic feedback to trigger on press.
   * Set to 'none' to disable haptic feedback.
   * @default 'light'
   */
  hapticFeedback?: 'light' | 'medium' | 'heavy' | 'selection' | 'none';

  // ============================================================================
  // Accessibility
  // ============================================================================

  /**
   * Test ID for testing frameworks.
   */
  testID?: string;

  /**
   * Accessibility label for screen readers.
   * Defaults to `title` if not provided.
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
   * Custom style for the button container.
   */
  style?: ViewStyle;

  /**
   * Custom style for the button text.
   */
  textStyle?: TextStyle;

  /**
   * Custom style for the pressed state.
   */
  pressedStyle?: ViewStyle;

  /**
   * Custom style for the disabled state.
   */
  disabledStyle?: ViewStyle;
}

/**
 * Style props derived from Button state.
 */
export interface ButtonStyleProps {
  variant: ButtonVariant;
  size: ButtonSize;
  colorScheme: ButtonColorScheme;
  disabled: boolean;
  loading: boolean;
  pressed: boolean;
  fullWidth: boolean;
  iconOnly: boolean;
}
