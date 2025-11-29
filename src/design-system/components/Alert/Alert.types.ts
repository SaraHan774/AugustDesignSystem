/**
 * AugustDesignSystem - Alert/Banner Component Types
 *
 * Type definitions for the inline persistent notification component.
 * Different from Toast - Alert stays visible until dismissed.
 */

import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
import type { CommonIconName } from '../Icon/Icon.types';

/**
 * Alert semantic variants.
 */
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Props for the Alert component.
 */
export interface AlertProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Alert variant determining the color scheme and default icon.
   * @default 'info'
   */
  variant?: AlertVariant;

  /**
   * Title text (optional, for more prominent alerts).
   */
  title?: string;

  /**
   * Description/message text.
   */
  description?: string;

  /**
   * Custom content to render instead of description.
   */
  children?: ReactNode;

  // ============================================================================
  // Icon
  // ============================================================================

  /**
   * Whether to show the variant icon.
   * @default true
   */
  showIcon?: boolean;

  /**
   * Custom icon name to override the default variant icon.
   */
  icon?: CommonIconName;

  /**
   * Custom icon element.
   */
  iconElement?: ReactNode;

  // ============================================================================
  // Actions
  // ============================================================================

  /**
   * Whether the alert can be dismissed by the user.
   * @default false
   */
  dismissible?: boolean;

  /**
   * Callback when the dismiss button is pressed.
   */
  onDismiss?: () => void;

  /**
   * Primary action button configuration.
   */
  action?: AlertAction;

  /**
   * Secondary action button configuration.
   */
  secondaryAction?: AlertAction;

  // ============================================================================
  // Appearance
  // ============================================================================

  /**
   * Whether to show a border on the left side (accent style).
   * @default true
   */
  showAccent?: boolean;

  /**
   * Whether the alert is visible (for animation control).
   * @default true
   */
  visible?: boolean;

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
   * Custom style for the alert container.
   */
  style?: ViewStyle;

  /**
   * Custom style for the title.
   */
  titleStyle?: TextStyle;

  /**
   * Custom style for the description.
   */
  descriptionStyle?: TextStyle;
}

/**
 * Alert action button configuration.
 */
export interface AlertAction {
  /**
   * Button label text.
   */
  label: string;

  /**
   * Callback when button is pressed.
   */
  onPress: () => void;
}

/**
 * Alert variant configuration.
 */
export interface AlertVariantConfig {
  /**
   * Background color.
   */
  backgroundColor: string;

  /**
   * Border/accent color.
   */
  accentColor: string;

  /**
   * Icon color.
   */
  iconColor: string;

  /**
   * Default icon name.
   */
  icon: CommonIconName;
}
