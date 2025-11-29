/**
 * AugustDesignSystem - Alert/Banner Component
 *
 * Inline persistent notification for important messages.
 * Different from Toast - Alert stays visible until dismissed.
 *
 * @example
 * ```tsx
 * // Info alert
 * <Alert
 *   variant="info"
 *   title="New Feature"
 *   description="Check out our new messaging features!"
 * />
 *
 * // Success alert with action
 * <Alert
 *   variant="success"
 *   description="Your message was sent successfully."
 *   action={{ label: "View", onPress: handleView }}
 * />
 *
 * // Error alert with dismiss
 * <Alert
 *   variant="error"
 *   title="Connection Lost"
 *   description="Messages will sync when you reconnect."
 *   dismissible
 *   onDismiss={() => setShowAlert(false)}
 * />
 *
 * // Warning alert
 * <Alert
 *   variant="warning"
 *   description="Your storage is almost full."
 *   action={{ label: "Manage", onPress: handleManage }}
 * />
 * ```
 */

import React, { useMemo, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Icon } from '../Icon';
import { createAlertStyles, getVariantConfig } from './Alert.styles';
import type { AlertProps } from './Alert.types';

// Animation config
const ANIMATION_CONFIG = {
  duration: 200,
};

/**
 * Alert component for inline persistent notifications.
 *
 * Features:
 * - Four semantic variants (info, success, warning, error)
 * - Title and description text
 * - Customizable icon or default variant icon
 * - Dismissible option with close button
 * - Primary and secondary action buttons
 * - Left accent border for visual emphasis
 * - Animated entrance/exit
 */
export function Alert({
  // Content
  variant = 'info',
  title,
  description,
  children,

  // Icon
  showIcon = true,
  icon,
  iconElement,

  // Actions
  dismissible = false,
  onDismiss,
  action,
  secondaryAction,

  // Appearance
  showAccent = true,
  visible = true,

  // Accessibility
  testID,
  accessibilityLabel,

  // Styling
  style,
  titleStyle,
  descriptionStyle,
}: AlertProps): React.ReactElement | null {
  const { theme } = useTheme();

  // Get variant configuration
  const variantConfig = useMemo(
    () => getVariantConfig(variant, theme),
    [variant, theme]
  );

  // Base styles
  const baseStyles = useMemo(() => createAlertStyles(theme), [theme]);

  // Animation values
  const opacity = useSharedValue(visible ? 1 : 0);
  const translateY = useSharedValue(visible ? 0 : -10);

  // Update animation when visibility changes
  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, ANIMATION_CONFIG);
    translateY.value = withSpring(visible ? 0 : -10, { damping: 20 });
  }, [visible, opacity, translateY]);

  // Animated container style
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  // Computed accessibility label
  const computedAccessibilityLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    const parts: string[] = [variant];
    if (title) parts.push(title);
    if (description) parts.push(description);
    return parts.join(': ');
  }, [accessibilityLabel, variant, title, description]);

  // Render icon
  const renderIcon = () => {
    if (!showIcon) return null;

    if (iconElement) {
      return <View style={baseStyles.iconContainer}>{iconElement}</View>;
    }

    const iconName = icon || variantConfig.icon;

    return (
      <View style={baseStyles.iconContainer}>
        <Icon
          name={iconName}
          size="md"
          color={variantConfig.iconColor}
        />
      </View>
    );
  };

  // Render actions
  const renderActions = () => {
    if (!action && !secondaryAction) return null;

    return (
      <View style={baseStyles.actionsContainer}>
        {action && (
          <Pressable
            style={baseStyles.actionButton}
            onPress={action.onPress}
            accessibilityRole="button"
            accessibilityLabel={action.label}
          >
            <Text
              style={[
                baseStyles.actionText,
                { color: variantConfig.accentColor },
              ]}
            >
              {action.label}
            </Text>
          </Pressable>
        )}

        {secondaryAction && (
          <Pressable
            style={baseStyles.actionButton}
            onPress={secondaryAction.onPress}
            accessibilityRole="button"
            accessibilityLabel={secondaryAction.label}
          >
            <Text
              style={[baseStyles.actionText, baseStyles.secondaryActionText]}
            >
              {secondaryAction.label}
            </Text>
          </Pressable>
        )}
      </View>
    );
  };

  // Don't render if not visible (after animation completes)
  if (!visible && opacity.value === 0) {
    return null;
  }

  return (
    <Animated.View
      style={[baseStyles.wrapper, animatedStyle, style]}
      testID={testID}
      accessible
      accessibilityRole="alert"
      accessibilityLabel={computedAccessibilityLabel}
      accessibilityLiveRegion="polite"
    >
      <View
        style={[
          baseStyles.container,
          { backgroundColor: variantConfig.backgroundColor },
        ]}
      >
        {/* Left accent border */}
        {showAccent && (
          <View
            style={[
              baseStyles.accent,
              { backgroundColor: variantConfig.accentColor },
            ]}
          />
        )}

        {/* Icon */}
        {renderIcon()}

        {/* Content */}
        <View style={baseStyles.content}>
          {title && (
            <Text style={[baseStyles.title, titleStyle]}>{title}</Text>
          )}

          {description && (
            <Text style={[baseStyles.description, descriptionStyle]}>
              {description}
            </Text>
          )}

          {children}

          {/* Actions */}
          {renderActions()}
        </View>

        {/* Dismiss button */}
        {dismissible && (
          <Pressable
            style={baseStyles.dismissContainer}
            onPress={onDismiss}
            accessibilityRole="button"
            accessibilityLabel="Dismiss alert"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon
              name="close"
              size="sm"
              color={theme.colors.label.secondary}
            />
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}

// Set display name for debugging
Alert.displayName = 'Alert';

export default Alert;
