/**
 * AugustDesignSystem - SearchBar Component Types
 *
 * Type definitions for the iOS-style SearchBar component.
 */

import type { ViewStyle, TextStyle } from 'react-native';

/**
 * Props for the SearchBar component.
 */
export interface SearchBarProps {
  // ============================================================================
  // Value & Content
  // ============================================================================

  /**
   * Current search text value.
   */
  value?: string;

  /**
   * Placeholder text when empty.
   * @default 'Search'
   */
  placeholder?: string;

  // ============================================================================
  // Events
  // ============================================================================

  /**
   * Callback when text changes.
   */
  onChangeText?: (text: string) => void;

  /**
   * Callback when search is submitted (keyboard return pressed).
   */
  onSubmit?: (text: string) => void;

  /**
   * Callback when search bar gains focus.
   */
  onFocus?: () => void;

  /**
   * Callback when search bar loses focus.
   */
  onBlur?: () => void;

  /**
   * Callback when clear button is pressed.
   */
  onClear?: () => void;

  /**
   * Callback when cancel button is pressed.
   */
  onCancel?: () => void;

  // ============================================================================
  // State
  // ============================================================================

  /**
   * Whether the search bar is in loading state.
   * Shows a spinner in place of the search icon.
   * @default false
   */
  loading?: boolean;

  /**
   * Whether the search bar is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to auto-focus on mount.
   * @default false
   */
  autoFocus?: boolean;

  // ============================================================================
  // Behavior
  // ============================================================================

  /**
   * Whether to show the cancel button when focused.
   * @default true
   */
  showCancelButton?: boolean;

  /**
   * Cancel button text.
   * @default 'Cancel'
   */
  cancelButtonText?: string;

  /**
   * Debounce delay for onChangeText in milliseconds.
   * Set to 0 to disable debouncing.
   * @default 0
   */
  debounceDelay?: number;

  /**
   * Keyboard return key type.
   * @default 'search'
   */
  returnKeyType?: 'search' | 'done' | 'go' | 'send';

  /**
   * Auto-capitalize behavior.
   * @default 'none'
   */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';

  /**
   * Auto-correct behavior.
   * @default true
   */
  autoCorrect?: boolean;

  // ============================================================================
  // Accessibility
  // ============================================================================

  /**
   * Test ID for testing frameworks.
   */
  testID?: string;

  /**
   * Accessibility label for the search input.
   */
  accessibilityLabel?: string;

  /**
   * Accessibility hint for the search input.
   */
  accessibilityHint?: string;

  // ============================================================================
  // Styling
  // ============================================================================

  /**
   * Custom style for the container.
   */
  style?: ViewStyle;

  /**
   * Custom style for the input container.
   */
  inputContainerStyle?: ViewStyle;

  /**
   * Custom style for the input text.
   */
  inputStyle?: TextStyle;

  /**
   * Custom style for the cancel button text.
   */
  cancelButtonStyle?: TextStyle;
}
