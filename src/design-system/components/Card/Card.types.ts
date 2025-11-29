/**
 * AugustDesignSystem - Card Component Types
 *
 * Type definitions for the content grouping container component.
 * Supports elevated, outlined, and filled variants.
 */

import type { ReactNode } from 'react';
import type { ViewStyle, GestureResponderEvent } from 'react-native';

/**
 * Card visual variants.
 */
export type CardVariant = 'elevated' | 'outlined' | 'filled';

/**
 * Card padding size options.
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * Props for the Card component.
 */
export interface CardProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Card content.
   */
  children?: ReactNode;

  /**
   * Header content (rendered at top of card).
   */
  header?: ReactNode;

  /**
   * Footer content (rendered at bottom of card).
   */
  footer?: ReactNode;

  // ============================================================================
  // Appearance
  // ============================================================================

  /**
   * Card visual variant.
   * - elevated: With shadow
   * - outlined: With border
   * - filled: Solid background
   * @default 'elevated'
   */
  variant?: CardVariant;

  /**
   * Padding inside the card.
   * @default 'md'
   */
  padding?: CardPadding;

  /**
   * Border radius of the card.
   * Uses theme radius tokens or custom number.
   * @default 'lg' (12pt)
   */
  borderRadius?: 'sm' | 'md' | 'lg' | 'xl' | number;

  /**
   * Custom background color.
   * Overrides variant default.
   */
  backgroundColor?: string;

  /**
   * Custom border color (for outlined variant).
   */
  borderColor?: string;

  // ============================================================================
  // Interaction
  // ============================================================================

  /**
   * Whether the card is pressable.
   * @default false
   */
  pressable?: boolean;

  /**
   * Callback when the card is pressed.
   * Only works when pressable is true.
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * Callback when the card is long pressed.
   * Only works when pressable is true.
   */
  onLongPress?: (event: GestureResponderEvent) => void;

  /**
   * Whether the card is disabled (for pressable cards).
   * @default false
   */
  disabled?: boolean;

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
   * Custom style for the card container.
   */
  style?: ViewStyle;

  /**
   * Custom style for the card content area.
   */
  contentStyle?: ViewStyle;

  /**
   * Custom style for the header.
   */
  headerStyle?: ViewStyle;

  /**
   * Custom style for the footer.
   */
  footerStyle?: ViewStyle;
}

/**
 * Card Header component props.
 */
export interface CardHeaderProps {
  /**
   * Header content.
   */
  children?: ReactNode;

  /**
   * Title text.
   */
  title?: string;

  /**
   * Subtitle text.
   */
  subtitle?: string;

  /**
   * Content to render on the left (e.g., avatar, icon).
   */
  left?: ReactNode;

  /**
   * Content to render on the right (e.g., action button).
   */
  right?: ReactNode;

  /**
   * Custom style.
   */
  style?: ViewStyle;
}

/**
 * Card Footer component props.
 */
export interface CardFooterProps {
  /**
   * Footer content.
   */
  children?: ReactNode;

  /**
   * Custom style.
   */
  style?: ViewStyle;
}
