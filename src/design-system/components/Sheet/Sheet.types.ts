/**
 * AugustDesignSystem - Sheet (Bottom Sheet) Component Types
 *
 * Type definitions for the modal surface sliding up from bottom.
 * Follows iOS Human Interface Guidelines for bottom sheets.
 */

import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

/**
 * Sheet snap point configuration.
 * Values are percentages of screen height (0-1).
 */
export interface SheetSnapPoints {
  /**
   * Collapsed state (partially visible).
   * @default 0.25
   */
  collapsed?: number;

  /**
   * Half-expanded state.
   * @default 0.5
   */
  half?: number;

  /**
   * Fully expanded state.
   * @default 0.9
   */
  expanded?: number;
}

/**
 * Sheet snap point value.
 */
export type SheetSnapPoint = 'collapsed' | 'half' | 'expanded' | number;

/**
 * Props for the Sheet component.
 */
export interface SheetProps {
  // ============================================================================
  // Visibility
  // ============================================================================

  /**
   * Whether the sheet is visible.
   */
  visible: boolean;

  /**
   * Callback when the sheet is requested to close.
   */
  onClose: () => void;

  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Sheet content.
   */
  children?: ReactNode;

  /**
   * Header content (rendered above the main content).
   */
  header?: ReactNode;

  /**
   * Footer content (rendered below the main content, sticky).
   */
  footer?: ReactNode;

  // ============================================================================
  // Snap Points
  // ============================================================================

  /**
   * Available snap points for the sheet.
   */
  snapPoints?: SheetSnapPoints;

  /**
   * Initial snap point when opening.
   * @default 'half'
   */
  initialSnapPoint?: SheetSnapPoint;

  /**
   * Callback when snap point changes.
   */
  onSnapPointChange?: (snapPoint: SheetSnapPoint) => void;

  // ============================================================================
  // Appearance
  // ============================================================================

  /**
   * Whether to show the drag handle indicator.
   * @default true
   */
  showHandle?: boolean;

  /**
   * Custom background color.
   */
  backgroundColor?: string;

  /**
   * Custom backdrop opacity.
   * @default 0.4
   */
  backdropOpacity?: number;

  /**
   * Border radius of the sheet.
   * @default 16
   */
  borderRadius?: number;

  // ============================================================================
  // Behavior
  // ============================================================================

  /**
   * Whether the sheet can be dismissed by swiping down.
   * @default true
   */
  dismissOnSwipe?: boolean;

  /**
   * Whether tapping the backdrop closes the sheet.
   * @default true
   */
  dismissOnBackdrop?: boolean;

  /**
   * Whether to handle safe area insets at the bottom.
   * @default true
   */
  safeArea?: boolean;

  /**
   * Whether the sheet content is scrollable.
   * @default true
   */
  scrollable?: boolean;

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
   * Custom style for the sheet container.
   */
  style?: ViewStyle;

  /**
   * Custom style for the content area.
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
 * Sheet handle dimensions.
 */
export interface SheetHandleConfig {
  width: number;
  height: number;
  marginVertical: number;
}
