/**
 * AugustDesignSystem - Toast Component
 *
 * A notification toast component with slide animations.
 *
 * @example
 * ```tsx
 * // In your app root
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 *
 * // Using the toast
 * const { show } = useToast();
 * show({ message: 'Message sent!', variant: 'success' });
 * ```
 */

import React, { useEffect, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Icon } from '../Icon';
import { createToastStyles, getVariantStyles } from './Toast.styles';
import type { ToastProps } from './Toast.types';

/**
 * Individual Toast component.
 */
export function Toast({
  // Content
  message,
  title,
  variant = 'default',
  icon,
  showIcon = true,

  // Behavior
  visible,
  duration = 4000,
  position = 'bottom',

  // Action
  action,

  // Callbacks
  onHide,
  onDismiss,

  // Accessibility
  testID,

  // Styling
  style,
  messageStyle,
  titleStyle,
}: ToastProps): React.ReactElement | null {
  const { theme } = useTheme();

  // Animation values
  const translateY = useSharedValue(position === 'top' ? -100 : 100);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  // Styles
  const baseStyles = useMemo(() => createToastStyles(theme), [theme]);
  const variantStyles = useMemo(
    () => getVariantStyles(variant, theme),
    [variant, theme]
  );

  // Show/hide animation
  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    } else {
      translateY.value = withTiming(position === 'top' ? -100 : 100, {
        duration: 200,
      });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible, position, translateY, opacity, scale]);

  // Auto-dismiss timer
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        onHide();
        onDismiss?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onHide, onDismiss]);

  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  // Handle action press
  const handleActionPress = () => {
    action?.onPress();
    onHide();
  };

  // Handle close press
  const handleClose = () => {
    onHide();
    onDismiss?.();
  };

  // Render icon
  const renderIcon = () => {
    if (!showIcon && !icon) return null;

    if (icon) {
      return <View style={baseStyles.iconContainer}>{icon}</View>;
    }

    return (
      <View style={baseStyles.iconContainer}>
        <Icon
          name={variantStyles.icon}
          size="md"
          color={variantStyles.iconColor}
        />
      </View>
    );
  };

  return (
    <Animated.View
      style={[
        baseStyles.container,
        variantStyles.container,
        animatedStyle,
        style,
      ]}
      testID={testID}
      accessible
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      {renderIcon()}

      <View style={baseStyles.content}>
        {title && (
          <Text style={[baseStyles.title, variantStyles.text, titleStyle]}>
            {title}
          </Text>
        )}
        <Text style={[baseStyles.message, variantStyles.text, messageStyle]}>
          {message}
        </Text>
      </View>

      {action && (
        <Pressable
          style={baseStyles.actionButton}
          onPress={handleActionPress}
          accessibilityRole="button"
          accessibilityLabel={action.label}
        >
          <Text style={[baseStyles.actionText, variantStyles.text]}>
            {action.label}
          </Text>
        </Pressable>
      )}

      <Pressable
        style={baseStyles.closeButton}
        onPress={handleClose}
        accessibilityRole="button"
        accessibilityLabel="Dismiss"
      >
        <Icon name="close" size="sm" color={variantStyles.iconColor} />
      </Pressable>
    </Animated.View>
  );
}

// Set display name for debugging
Toast.displayName = 'Toast';

export default Toast;
