/**
 * AugustDesignSystem - InputBar Component
 *
 * A message input component following Apple Human Interface Guidelines.
 * Features text input, attachment button, send button, and error banner.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const [message, setMessage] = useState('');
 *
 * <InputBar
 *   value={message}
 *   onChangeText={setMessage}
 *   onSend={() => sendMessage(message)}
 *   onAttachment={() => pickAttachment()}
 * />
 *
 * // With error banner (rate limit)
 * <InputBar
 *   value={message}
 *   onChangeText={setMessage}
 *   onSend={handleSend}
 *   errorMessage="You're sending messages too fast. Please wait a moment."
 *   onDismissError={() => clearError()}
 * />
 *
 * // Disabled state (blocked user)
 * <InputBar
 *   disabled
 *   disabledMessage="You can't send messages to this user"
 * />
 *
 * // With sending state
 * <InputBar
 *   value={message}
 *   onChangeText={setMessage}
 *   onSend={handleSend}
 *   sending={isSending}
 * />
 *
 * // Hide attachment button
 * <InputBar
 *   value={message}
 *   onChangeText={setMessage}
 *   onSend={handleSend}
 *   showAttachmentButton={false}
 * />
 * ```
 */

import React, { useMemo, useCallback, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { useTheme } from '@theme';
import type { InputBarProps } from './InputBar.types';
import {
  createInputBarStyles,
  getDynamicInputBarStyles,
} from './InputBar.styles';

/**
 * InputBar component for message input.
 *
 * Features:
 * - Auto-expanding text input
 * - Attachment button (left)
 * - Send button (right)
 * - Error banner slot above
 * - Disabled state with custom message
 * - Sending state with loading indicator
 * - Full accessibility support
 */
export function InputBar({
  // Content
  value = '',
  placeholder = 'Message',
  onChangeText,

  // Actions
  onSend,
  onAttachment,
  onFocus,
  onBlur,

  // State
  disabled = false,
  sending = false,
  disabledMessage,

  // Error banner
  errorMessage,
  onDismissError,
  errorAutoDismiss = 5000,

  // Attachments
  showAttachmentButton = true,
  attachmentIcon,
  sendIcon,
  attachmentPreview,

  // Layout
  maxLines = 5,
  minHeight = 44,
  maxHeight = 120,

  // Accessibility
  testID,
  inputAccessibilityLabel = 'Message input',
  sendAccessibilityLabel = 'Send message',
  attachmentAccessibilityLabel = 'Add attachment',

  // Styling
  style,
  containerStyle,
  inputStyle,
  sendButtonStyle,
  attachmentButtonStyle,
  errorBannerStyle,
  textInputProps,
}: InputBarProps): React.ReactElement {
  const { theme } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Create base styles
  const baseStyles = useMemo(
    () => createInputBarStyles(theme),
    [theme]
  );

  // Get dynamic styles based on state
  const hasText = value.trim().length > 0;
  const dynamicStyles = useMemo(
    () => getDynamicInputBarStyles(disabled, sending, hasText, theme),
    [disabled, sending, hasText, theme]
  );

  // Can send check
  const canSend = hasText && !disabled && !sending;

  // Handle send button press
  const handleSend = useCallback(() => {
    if (!canSend) return;

    onSend?.();
    Keyboard.dismiss();
  }, [canSend, onSend]);

  // Handle attachment button press
  const handleAttachment = useCallback(() => {
    if (disabled) return;
    onAttachment?.();
  }, [disabled, onAttachment]);

  // Auto-dismiss error banner
  useEffect(() => {
    if (errorMessage && errorAutoDismiss > 0 && onDismissError) {
      errorTimerRef.current = setTimeout(() => {
        onDismissError();
      }, errorAutoDismiss);

      return () => {
        if (errorTimerRef.current) {
          clearTimeout(errorTimerRef.current);
        }
      };
    }
  }, [errorMessage, errorAutoDismiss, onDismissError]);

  // Render error banner
  const renderErrorBanner = useCallback(() => {
    if (!errorMessage) return null;

    return (
      <View style={[baseStyles.errorBanner, errorBannerStyle]} testID={testID ? `${testID}-error` : undefined}>
        <Text style={baseStyles.errorText} numberOfLines={2}>
          {errorMessage}
        </Text>
        {onDismissError && (
          <Pressable
            style={baseStyles.errorDismiss}
            onPress={onDismissError}
            accessibilityRole="button"
            accessibilityLabel="Dismiss error"
          >
            <Text style={baseStyles.errorDismissText}>Dismiss</Text>
          </Pressable>
        )}
      </View>
    );
  }, [errorMessage, onDismissError, baseStyles, errorBannerStyle, testID]);

  // Render attachment button
  const renderAttachmentButton = useCallback(() => {
    if (!showAttachmentButton) return null;

    return (
      <Pressable
        style={[baseStyles.attachmentButton, attachmentButtonStyle]}
        onPress={handleAttachment}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={attachmentAccessibilityLabel}
        accessibilityState={{ disabled }}
        testID={testID ? `${testID}-attachment` : undefined}
      >
        {attachmentIcon || (
          <Text style={[baseStyles.attachmentIcon, { fontSize: 24 }]}>+</Text>
        )}
      </Pressable>
    );
  }, [
    showAttachmentButton,
    handleAttachment,
    disabled,
    attachmentIcon,
    attachmentAccessibilityLabel,
    baseStyles,
    attachmentButtonStyle,
    testID,
  ]);

  // Render send button
  const renderSendButton = useCallback(() => {
    return (
      <Pressable
        style={[
          baseStyles.sendButton,
          dynamicStyles.sendButton,
          sendButtonStyle,
        ]}
        onPress={handleSend}
        disabled={!canSend}
        accessibilityRole="button"
        accessibilityLabel={sendAccessibilityLabel}
        accessibilityState={{ disabled: !canSend }}
        testID={testID ? `${testID}-send` : undefined}
      >
        {sending ? (
          <ActivityIndicator size="small" color={theme.colors.label.tertiary} />
        ) : sendIcon ? (
          sendIcon
        ) : (
          <Text style={[{ fontSize: 18, fontWeight: '600' }, dynamicStyles.sendIcon]}>
            {'\u2191'}
          </Text>
        )}
      </Pressable>
    );
  }, [
    canSend,
    sending,
    handleSend,
    sendIcon,
    sendAccessibilityLabel,
    baseStyles,
    dynamicStyles,
    sendButtonStyle,
    theme,
    testID,
  ]);

  // Render disabled overlay
  const renderDisabledOverlay = useCallback(() => {
    if (!disabled || !disabledMessage) return null;

    return (
      <View style={baseStyles.disabledOverlay}>
        <Text style={baseStyles.disabledText}>{disabledMessage}</Text>
      </View>
    );
  }, [disabled, disabledMessage, baseStyles]);

  return (
    <View style={[baseStyles.wrapper, style]} testID={testID}>
      {/* Error banner */}
      {renderErrorBanner()}

      {/* Attachment preview */}
      {attachmentPreview && (
        <View style={baseStyles.attachmentPreviewContainer}>
          {attachmentPreview}
        </View>
      )}

      {/* Main input container */}
      <View
        style={[
          baseStyles.container,
          dynamicStyles.container,
          containerStyle,
        ]}
      >
        {/* Disabled overlay */}
        {renderDisabledOverlay()}

        {/* Attachment button */}
        {renderAttachmentButton()}

        {/* Text input wrapper */}
        <View style={baseStyles.inputWrapper}>
          <TextInput
            ref={inputRef}
            style={[
              baseStyles.input,
              disabled && baseStyles.inputDisabled,
              inputStyle,
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.label.tertiary}
            editable={!disabled && !sending}
            multiline
            maxLength={5000}
            onFocus={onFocus}
            onBlur={onBlur}
            accessibilityLabel={inputAccessibilityLabel}
            testID={testID ? `${testID}-input` : undefined}
            {...textInputProps}
          />
        </View>

        {/* Send button */}
        {renderSendButton()}
      </View>
    </View>
  );
}

// Set display name for debugging
InputBar.displayName = 'InputBar';
