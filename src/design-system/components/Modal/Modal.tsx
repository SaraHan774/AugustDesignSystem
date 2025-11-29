/**
 * AugustDesignSystem - Modal/Dialog Component
 *
 * Centered modal dialog for alerts, confirmations, and custom content.
 * Follows iOS Human Interface Guidelines for alert dialogs.
 *
 * @example
 * ```tsx
 * // Simple alert
 * <Modal
 *   visible={showAlert}
 *   onClose={() => setShowAlert(false)}
 *   title="Success"
 *   message="Your message was sent."
 *   actions={[{ key: 'ok', label: 'OK', onPress: () => setShowAlert(false) }]}
 * />
 *
 * // Confirmation dialog
 * <Modal
 *   visible={showConfirm}
 *   onClose={() => setShowConfirm(false)}
 *   variant="confirm"
 *   title="Delete Message?"
 *   message="This action cannot be undone."
 *   actions={[
 *     { key: 'cancel', label: 'Cancel', style: 'cancel', onPress: handleCancel },
 *     { key: 'delete', label: 'Delete', style: 'destructive', onPress: handleDelete },
 *   ]}
 * />
 *
 * // Custom content modal
 * <Modal
 *   visible={showCustom}
 *   onClose={() => setShowCustom(false)}
 *   variant="custom"
 *   title="Enter Name"
 * >
 *   <TextInput value={name} onChangeText={setName} />
 * </Modal>
 * ```
 */

import React, { useEffect, useMemo, useCallback } from 'react';
import { View, Text, Pressable, BackHandler, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Spinner } from '../Spinner';
import {
  createModalStyles,
  getActionTextStyle,
  MODAL_DEFAULTS,
} from './Modal.styles';
import type { ModalProps, ModalAction } from './Modal.types';

// Animation configuration
const ANIMATION_DURATION = 200;
const SPRING_CONFIG = {
  damping: 20,
  stiffness: 300,
};

/**
 * Modal/Dialog component for centered overlays.
 *
 * Features:
 * - Alert, confirm, and custom variants
 * - iOS-style button layout (horizontal for 2, vertical for 3+)
 * - Animated entrance/exit (fade + scale)
 * - Backdrop tap to dismiss
 * - Hardware back button support (Android)
 * - Loading state for actions
 * - Full accessibility support
 */
export function Modal({
  // Visibility
  visible,
  onClose,

  // Content
  variant = 'alert',
  title,
  message,
  children,

  // Actions
  actions: actionsProp,
  primaryAction,
  secondaryAction,

  // Behavior
  dismissOnBackdrop = true,
  dismissOnBack = true,
  onAnimationComplete,

  // Appearance
  backdropOpacity = MODAL_DEFAULTS.backdropOpacity,
  maxWidth = MODAL_DEFAULTS.maxWidth,

  // Accessibility
  testID,
  accessibilityLabel,

  // Styling
  style,
  titleStyle,
  messageStyle,
  contentStyle,
}: ModalProps): React.ReactElement | null {
  const { theme } = useTheme();

  // Build actions array from props
  const actions = useMemo(() => {
    if (actionsProp) return actionsProp;

    const result: ModalAction[] = [];
    if (secondaryAction) {
      result.push({ ...secondaryAction, style: secondaryAction.style || 'cancel' });
    }
    if (primaryAction) {
      result.push({ ...primaryAction, style: primaryAction.style || 'default' });
    }
    return result;
  }, [actionsProp, primaryAction, secondaryAction]);

  // Base styles
  const baseStyles = useMemo(() => createModalStyles(theme), [theme]);

  // Animation values
  const backdropAnim = useSharedValue(0);
  const modalAnim = useSharedValue(0);
  const isRendered = useSharedValue(visible);

  // Handle animation completion
  const handleAnimationComplete = useCallback(() => {
    if (!visible) {
      isRendered.value = false;
    }
    onAnimationComplete?.();
  }, [visible, isRendered, onAnimationComplete]);

  // Update animations when visibility changes
  useEffect(() => {
    if (visible) {
      isRendered.value = true;
      backdropAnim.value = withTiming(1, { duration: ANIMATION_DURATION });
      modalAnim.value = withSpring(1, SPRING_CONFIG);
    } else {
      backdropAnim.value = withTiming(0, { duration: ANIMATION_DURATION });
      modalAnim.value = withTiming(0, { duration: ANIMATION_DURATION }, () => {
        runOnJS(handleAnimationComplete)();
      });
    }
  }, [visible, backdropAnim, modalAnim, handleAnimationComplete, isRendered]);

  // Handle hardware back button (Android)
  useEffect(() => {
    if (!visible || Platform.OS !== 'android') return;

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (dismissOnBack) {
        onClose();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [visible, dismissOnBack, onClose]);

  // Animated backdrop style
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropAnim.value * backdropOpacity,
  }));

  // Animated modal style
  const modalStyle = useAnimatedStyle(() => ({
    opacity: modalAnim.value,
    transform: [
      { scale: 0.9 + modalAnim.value * 0.1 },
    ],
  }));

  // Handle backdrop press
  const handleBackdropPress = useCallback(() => {
    if (dismissOnBackdrop) {
      onClose();
    }
  }, [dismissOnBackdrop, onClose]);

  // Render action button
  const renderAction = (action: ModalAction, index: number, isHorizontal: boolean) => {
    const isFirst = index === 0;

    const buttonStyle = [
      baseStyles.actionButton,
      !isHorizontal && baseStyles.actionButtonVertical,
      !isHorizontal && isFirst && baseStyles.actionButtonVerticalFirst,
      action.disabled && baseStyles.actionDisabled,
    ];

    const textStyle = getActionTextStyle(action.style, theme, baseStyles);

    return (
      <React.Fragment key={action.key}>
        {/* Separator for horizontal layout */}
        {isHorizontal && index > 0 && <View style={baseStyles.actionSeparator} />}

        <Pressable
          style={buttonStyle}
          onPress={action.onPress}
          disabled={action.disabled || action.loading}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          accessibilityState={{ disabled: action.disabled }}
        >
          {action.loading ? (
            <Spinner size="sm" color="primary" />
          ) : (
            <Text style={textStyle}>{action.label}</Text>
          )}
        </Pressable>
      </React.Fragment>
    );
  };

  // Render actions
  const renderActions = () => {
    if (!actions.length) return null;

    // iOS style: 2 buttons side by side, 3+ stacked vertically
    const isHorizontal = actions.length === 2;

    return (
      <View
        style={[
          baseStyles.actionsContainer,
          isHorizontal ? baseStyles.actionsHorizontal : baseStyles.actionsVertical,
        ]}
      >
        {actions.map((action, index) => renderAction(action, index, isHorizontal))}
      </View>
    );
  };

  // Don't render if not visible and animation complete
  if (!visible && !isRendered.value) {
    return null;
  }

  // Computed accessibility label
  const computedAccessibilityLabel = accessibilityLabel || title || 'Dialog';

  return (
    <View style={baseStyles.overlay} pointerEvents={visible ? 'auto' : 'none'}>
      {/* Backdrop */}
      <Animated.View style={[baseStyles.backdrop, backdropStyle]}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleBackdropPress}
          accessibilityRole="button"
          accessibilityLabel="Close dialog"
        />
      </Animated.View>

      {/* Modal */}
      <Animated.View
        style={[
          baseStyles.container,
          { maxWidth },
          modalStyle,
          style,
        ]}
        testID={testID}
        accessible
        accessibilityRole="alert"
        accessibilityLabel={computedAccessibilityLabel}
        accessibilityViewIsModal
      >
        {/* Content */}
        <View style={[baseStyles.content, contentStyle]}>
          {title && (
            <Text style={[baseStyles.title, titleStyle]}>{title}</Text>
          )}

          {message && (
            <Text style={[baseStyles.message, messageStyle]}>{message}</Text>
          )}

          {variant === 'custom' && children && (
            <View style={baseStyles.customContent}>{children}</View>
          )}
        </View>

        {/* Actions */}
        {renderActions()}
      </Animated.View>
    </View>
  );
}

// Need to import StyleSheet for absoluteFill
import { StyleSheet } from 'react-native';

// Set display name for debugging
Modal.displayName = 'Modal';

export default Modal;
