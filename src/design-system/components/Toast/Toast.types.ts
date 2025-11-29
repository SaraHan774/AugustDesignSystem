/**
 * AugustDesignSystem - Toast Component Types
 *
 * Type definitions for the Toast/Snackbar notification component.
 */

import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';

/**
 * Toast variant for semantic styling.
 */
export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

/**
 * Toast position on screen.
 */
export type ToastPosition = 'top' | 'bottom';

/**
 * Toast configuration for showing a toast.
 */
export interface ToastConfig {
  /**
   * Unique identifier for the toast.
   * Auto-generated if not provided.
   */
  id?: string;

  /**
   * Main message text.
   */
  message: string;

  /**
   * Optional title/heading.
   */
  title?: string;

  /**
   * Visual variant.
   * @default 'default'
   */
  variant?: ToastVariant;

  /**
   * Duration in milliseconds before auto-dismiss.
   * Set to 0 for persistent toast.
   * @default 4000
   */
  duration?: number;

  /**
   * Position on screen.
   * @default 'bottom'
   */
  position?: ToastPosition;

  /**
   * Optional action button.
   */
  action?: {
    label: string;
    onPress: () => void;
  };

  /**
   * Custom icon to override default variant icon.
   */
  icon?: ReactNode;

  /**
   * Whether to show the default variant icon.
   * @default true for typed variants
   */
  showIcon?: boolean;

  /**
   * Callback when toast is dismissed.
   */
  onDismiss?: () => void;

  /**
   * Whether the toast can be dismissed by swiping.
   * @default true
   */
  swipeToDismiss?: boolean;
}

/**
 * Props for the Toast component.
 */
export interface ToastProps extends ToastConfig {
  /**
   * Whether the toast is visible.
   */
  visible: boolean;

  /**
   * Handler to hide the toast.
   */
  onHide: () => void;

  /**
   * Test ID for testing frameworks.
   */
  testID?: string;

  /**
   * Custom style for the toast container.
   */
  style?: ViewStyle;

  /**
   * Custom style for the message text.
   */
  messageStyle?: TextStyle;

  /**
   * Custom style for the title text.
   */
  titleStyle?: TextStyle;
}

/**
 * Toast context value for imperative API.
 */
export interface ToastContextValue {
  /**
   * Show a toast with the given configuration.
   * Returns the toast ID.
   */
  show: (config: ToastConfig) => string;

  /**
   * Hide a specific toast by ID.
   */
  hide: (id: string) => void;

  /**
   * Hide all toasts.
   */
  hideAll: () => void;

  /**
   * Update an existing toast.
   */
  update: (id: string, config: Partial<ToastConfig>) => void;
}

/**
 * Internal toast state.
 */
export interface ToastState extends ToastConfig {
  id: string;
  visible: boolean;
}

/**
 * Props for ToastProvider.
 */
export interface ToastProviderProps {
  children: ReactNode;

  /**
   * Default position for all toasts.
   * @default 'bottom'
   */
  defaultPosition?: ToastPosition;

  /**
   * Default duration for all toasts.
   * @default 4000
   */
  defaultDuration?: number;

  /**
   * Maximum number of toasts to show at once.
   * @default 3
   */
  maxToasts?: number;

  /**
   * Offset from the edge of the screen.
   * @default { top: 50, bottom: 50 }
   */
  offset?: {
    top?: number;
    bottom?: number;
  };
}
