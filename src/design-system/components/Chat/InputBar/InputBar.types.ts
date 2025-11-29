/**
 * AugustDesignSystem - InputBar Component Types
 *
 * Type definitions for the InputBar component following Apple HIG.
 * A message input component with attachment and send capabilities.
 */

import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle, TextInputProps } from 'react-native';

/**
 * Props for the InputBar component.
 */
export interface InputBarProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Current input text value.
   */
  value?: string;

  /**
   * Placeholder text when input is empty.
   * @default 'Message'
   */
  placeholder?: string;

  /**
   * Handler called when text changes.
   */
  onChangeText?: (text: string) => void;

  // ============================================================================
  // Actions
  // ============================================================================

  /**
   * Handler called when send button is pressed.
   */
  onSend?: () => void;

  /**
   * Handler called when attachment button is pressed.
   */
  onAttachment?: () => void;

  /**
   * Handler called when the input is focused.
   */
  onFocus?: () => void;

  /**
   * Handler called when the input is blurred.
   */
  onBlur?: () => void;

  // ============================================================================
  // State
  // ============================================================================

  /**
   * Whether the input is disabled.
   * Used for blocked users or read-only channels.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether a message is currently being sent.
   * @default false
   */
  sending?: boolean;

  /**
   * Disabled reason text to display when disabled.
   * e.g., "You can't send messages to this user"
   */
  disabledMessage?: string;

  // ============================================================================
  // Error Banner
  // ============================================================================

  /**
   * Error message to display above the input.
   * Used for rate limit warnings, file size errors, etc.
   */
  errorMessage?: string;

  /**
   * Handler called when error banner is dismissed.
   */
  onDismissError?: () => void;

  /**
   * Duration before error banner auto-dismisses (ms).
   * Set to 0 to disable auto-dismiss.
   * @default 5000
   */
  errorAutoDismiss?: number;

  // ============================================================================
  // Attachments
  // ============================================================================

  /**
   * Whether to show the attachment button.
   * @default true
   */
  showAttachmentButton?: boolean;

  /**
   * Custom attachment button icon.
   */
  attachmentIcon?: ReactNode;

  /**
   * Custom send button icon.
   */
  sendIcon?: ReactNode;

  /**
   * Preview of selected attachments (images, files).
   * Render this above the input bar.
   */
  attachmentPreview?: ReactNode;

  // ============================================================================
  // Layout
  // ============================================================================

  /**
   * Maximum number of lines before scrolling.
   * @default 5
   */
  maxLines?: number;

  /**
   * Minimum height of the input bar.
   * @default 44
   */
  minHeight?: number;

  /**
   * Maximum height of the input bar.
   * @default 120
   */
  maxHeight?: number;

  // ============================================================================
  // Accessibility
  // ============================================================================

  /**
   * Test ID for testing frameworks.
   */
  testID?: string;

  /**
   * Accessibility label for the text input.
   * @default 'Message input'
   */
  inputAccessibilityLabel?: string;

  /**
   * Accessibility label for the send button.
   * @default 'Send message'
   */
  sendAccessibilityLabel?: string;

  /**
   * Accessibility label for the attachment button.
   * @default 'Add attachment'
   */
  attachmentAccessibilityLabel?: string;

  // ============================================================================
  // Styling
  // ============================================================================

  /**
   * Custom style for the outer container.
   */
  style?: ViewStyle;

  /**
   * Custom style for the input container.
   */
  containerStyle?: ViewStyle;

  /**
   * Custom style for the text input.
   */
  inputStyle?: TextStyle;

  /**
   * Custom style for the send button.
   */
  sendButtonStyle?: ViewStyle;

  /**
   * Custom style for the attachment button.
   */
  attachmentButtonStyle?: ViewStyle;

  /**
   * Custom style for the error banner.
   */
  errorBannerStyle?: ViewStyle;

  /**
   * Additional TextInput props.
   */
  textInputProps?: Omit<TextInputProps, 'value' | 'onChangeText' | 'placeholder' | 'editable' | 'style'>;
}

/**
 * Style props derived from InputBar state.
 */
export interface InputBarStyleProps {
  disabled: boolean;
  sending: boolean;
  hasText: boolean;
  hasError: boolean;
}
