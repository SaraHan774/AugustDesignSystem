/**
 * AugustDesignSystem - EmptyState Component Types
 *
 * Type definitions for the EmptyState component used to display
 * placeholder content when lists or views have no data.
 */

import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
import type { CommonIconName } from '../Icon';

/**
 * EmptyState size variants.
 */
export type EmptyStateSize = 'sm' | 'md' | 'lg';

/**
 * EmptyState layout variants.
 */
export type EmptyStateLayout = 'vertical' | 'horizontal';

/**
 * Action button configuration for EmptyState.
 */
export interface EmptyStateAction {
  /**
   * Button label text.
   */
  label: string;

  /**
   * Callback when button is pressed.
   */
  onPress: () => void;

  /**
   * Button variant.
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
}

/**
 * Props for the EmptyState component.
 */
export interface EmptyStateProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Title text displayed prominently.
   */
  title: string;

  /**
   * Description text providing more context.
   */
  description?: string;

  /**
   * Icon name to display above the title.
   */
  icon?: CommonIconName;

  /**
   * Custom icon element (overrides icon prop).
   */
  customIcon?: ReactNode;

  /**
   * Custom illustration element (larger than icon).
   */
  illustration?: ReactNode;

  // ============================================================================
  // Actions
  // ============================================================================

  /**
   * Primary action button.
   */
  action?: EmptyStateAction;

  /**
   * Secondary action button.
   */
  secondaryAction?: EmptyStateAction;

  // ============================================================================
  // Appearance
  // ============================================================================

  /**
   * Size variant affecting spacing and text sizes.
   * @default 'md'
   */
  size?: EmptyStateSize;

  /**
   * Layout direction.
   * @default 'vertical'
   */
  layout?: EmptyStateLayout;

  /**
   * Whether the component should fill available space.
   * @default true
   */
  fillContainer?: boolean;

  // ============================================================================
  // Accessibility
  // ============================================================================

  /**
   * Test ID for testing frameworks.
   */
  testID?: string;

  /**
   * Accessibility label for the entire component.
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
   * Custom style for the title text.
   */
  titleStyle?: TextStyle;

  /**
   * Custom style for the description text.
   */
  descriptionStyle?: TextStyle;

  /**
   * Custom style for the icon container.
   */
  iconContainerStyle?: ViewStyle;

  /**
   * Custom style for the actions container.
   */
  actionsStyle?: ViewStyle;
}
