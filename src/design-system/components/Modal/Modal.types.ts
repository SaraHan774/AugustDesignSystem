/**
 * AugustDesignSystem - Modal/Dialog Component Types
 *
 * Type definitions for the centered modal dialog component.
 * Follows iOS Human Interface Guidelines for alerts and action sheets.
 */

import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';

/**
 * Modal visual variants.
 */
export type ModalVariant = 'alert' | 'confirm' | 'custom';

/**
 * Modal action button configuration.
 */
export interface ModalAction {
  /**
   * Unique key for the action.
   */
  key: string;

  /**
   * Button label text.
   */
  label: string;

  /**
   * Callback when button is pressed.
   */
  onPress: () => void;

  /**
   * Button style variant.
   * @default 'default'
   */
  style?: 'default' | 'cancel' | 'destructive';

  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;

  /**
   * Whether the button should show loading state.
   */
  loading?: boolean;
}

/**
 * Props for the Modal component.
 */
export interface ModalProps {
  // ============================================================================
  // Visibility
  // ============================================================================

  /**
   * Whether the modal is visible.
   */
  visible: boolean;

  /**
   * Callback when the modal is requested to close.
   * Called when backdrop is tapped (if dismissOnBackdrop is true) or hardware back.
   */
  onClose: () => void;

  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Modal variant type.
   * @default 'alert'
   */
  variant?: ModalVariant;

  /**
   * Modal title.
   */
  title?: string;

  /**
   * Modal message/description.
   */
  message?: string;

  /**
   * Custom content (for 'custom' variant).
   */
  children?: ReactNode;

  // ============================================================================
  // Actions
  // ============================================================================

  /**
   * Action buttons (1-3 buttons).
   * For 'alert' variant, typically one button.
   * For 'confirm' variant, typically two buttons.
   */
  actions?: ModalAction[];

  /**
   * Convenience prop for primary action (same as first action).
   */
  primaryAction?: ModalAction;

  /**
   * Convenience prop for secondary/cancel action.
   */
  secondaryAction?: ModalAction;

  // ============================================================================
  // Behavior
  // ============================================================================

  /**
   * Whether tapping the backdrop closes the modal.
   * @default true
   */
  dismissOnBackdrop?: boolean;

  /**
   * Whether the modal can be closed with hardware back button (Android).
   * @default true
   */
  dismissOnBack?: boolean;

  /**
   * Callback when modal animation completes (after visible changes).
   */
  onAnimationComplete?: () => void;

  // ============================================================================
  // Appearance
  // ============================================================================

  /**
   * Custom backdrop opacity.
   * @default 0.4
   */
  backdropOpacity?: number;

  /**
   * Custom max width of the modal.
   * @default 270 (iOS alert width)
   */
  maxWidth?: number;

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
   * Custom style for the modal container.
   */
  style?: ViewStyle;

  /**
   * Custom style for the title.
   */
  titleStyle?: TextStyle;

  /**
   * Custom style for the message.
   */
  messageStyle?: TextStyle;

  /**
   * Custom style for the content area.
   */
  contentStyle?: ViewStyle;
}

/**
 * Internal modal state.
 */
export interface ModalState {
  isAnimating: boolean;
  isVisible: boolean;
}
