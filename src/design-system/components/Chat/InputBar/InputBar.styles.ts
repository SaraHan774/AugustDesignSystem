/**
 * AugustDesignSystem - InputBar Component Styles
 *
 * Style definitions for the InputBar component following Apple HIG.
 */

import { StyleSheet, type ViewStyle, type TextStyle, Platform } from 'react-native';
import type { Theme } from '@types';

/**
 * Get button size for icon buttons.
 */
export function getButtonSize(): number {
  return 36;
}

/**
 * Get icon size for buttons.
 */
export function getIconSize(): number {
  return 24;
}

/**
 * Create base InputBar styles.
 */
export function createInputBarStyles(theme: Theme) {
  const buttonSize = getButtonSize();

  return StyleSheet.create({
    // Outer wrapper (includes error banner)
    wrapper: {
      backgroundColor: theme.colors.background.primary,
    },

    // Error banner
    errorBanner: {
      backgroundColor: theme.colors.semantic.error,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    errorText: {
      ...theme.typography.footnote,
      color: '#FFFFFF',
      flex: 1,
    },

    errorDismiss: {
      padding: theme.spacing.xs,
      marginLeft: theme.spacing.sm,
    },

    errorDismissText: {
      ...theme.typography.footnote,
      color: '#FFFFFF',
      fontWeight: '600',
    },

    // Attachment preview area
    attachmentPreviewContainer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.colors.separator.opaque,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },

    // Main container
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.colors.separator.opaque,
      backgroundColor: theme.colors.background.primary,
    },

    // Disabled overlay
    disabledContainer: {
      opacity: theme.opacity.disabled,
    },

    disabledOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.background.primary,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },

    disabledText: {
      ...theme.typography.footnote,
      color: theme.colors.label.secondary,
      textAlign: 'center',
    },

    // Attachment button
    attachmentButton: {
      width: buttonSize,
      height: buttonSize,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.xs,
    },

    attachmentIcon: {
      color: theme.colors.interactive.tint,
    },

    // Input wrapper (for the text input background)
    inputWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      backgroundColor: theme.colors.fill.secondary,
      borderRadius: 20,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: Platform.select({ ios: 8, android: 4 }),
      minHeight: 36,
    },

    // Text input
    input: {
      flex: 1,
      ...theme.typography.body,
      color: theme.colors.label.primary,
      paddingTop: 0,
      paddingBottom: 0,
      maxHeight: 100,
      ...Platform.select({
        ios: {
          paddingTop: 0,
          paddingBottom: 0,
        },
        android: {
          paddingTop: 0,
          paddingBottom: 0,
          textAlignVertical: 'center',
        },
      }),
    },

    inputDisabled: {
      color: theme.colors.label.tertiary,
    },

    // Send button
    sendButton: {
      width: buttonSize,
      height: buttonSize,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: theme.spacing.xs,
      borderRadius: buttonSize / 2,
    },

    sendButtonActive: {
      backgroundColor: theme.colors.interactive.tint,
    },

    sendButtonInactive: {
      backgroundColor: 'transparent',
    },

    sendButtonSending: {
      backgroundColor: theme.colors.fill.tertiary,
    },

    sendIcon: {
      color: '#FFFFFF',
    },

    sendIconInactive: {
      color: theme.colors.label.quaternary,
    },
  });
}

/**
 * Generate dynamic styles based on InputBar state.
 */
export function getDynamicInputBarStyles(
  disabled: boolean,
  sending: boolean,
  hasText: boolean,
  theme: Theme
): {
  container: ViewStyle;
  sendButton: ViewStyle;
  sendIcon: TextStyle;
} {
  const canSend = hasText && !disabled && !sending;

  const containerStyle: ViewStyle = {};
  if (disabled) {
    containerStyle.opacity = theme.opacity.disabled;
  }

  const sendButtonStyle: ViewStyle = canSend
    ? { backgroundColor: theme.colors.interactive.tint }
    : sending
    ? { backgroundColor: theme.colors.fill.tertiary }
    : { backgroundColor: 'transparent' };

  const sendIconStyle: TextStyle = {
    color: canSend ? '#FFFFFF' : theme.colors.label.quaternary,
  };

  return {
    container: containerStyle,
    sendButton: sendButtonStyle,
    sendIcon: sendIconStyle,
  };
}
