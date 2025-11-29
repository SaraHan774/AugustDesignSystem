/**
 * AugustDesignSystem - Pressable Component
 *
 * An enhanced touchable component with haptic feedback, visual animations,
 * and accessibility support. Serves as the foundation for interactive elements.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Pressable onPress={() => console.log('pressed')}>
 *   <Text>Press me</Text>
 * </Pressable>
 *
 * // With haptic feedback and scale animation
 * <Pressable
 *   onPress={handlePress}
 *   hapticFeedback="medium"
 *   pressAnimation="scale"
 *   pressedScale={0.95}
 * >
 *   <Text>Interactive Item</Text>
 * </Pressable>
 *
 * // Render prop for custom pressed state styling
 * <Pressable onPress={handlePress}>
 *   {({ pressed }) => (
 *     <View style={{ backgroundColor: pressed ? 'gray' : 'white' }}>
 *       <Text>Custom pressed state</Text>
 *     </View>
 *   )}
 * </Pressable>
 * ```
 */

import React, { useCallback, useMemo } from 'react';
import {
  Pressable as RNPressable,
  Platform,
  type PressableStateCallbackType,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import type { PressableProps, PressableState } from './Pressable.types';

// Create animated pressable
const AnimatedPressable = Animated.createAnimatedComponent(RNPressable);

/**
 * Enhanced Pressable component with haptics and animations.
 *
 * Features:
 * - Press animations (opacity, scale, or both)
 * - Haptic feedback support
 * - Android ripple effect
 * - Render prop support for custom pressed states
 * - Full accessibility support
 */
export function Pressable({
  // Content
  children,

  // Events
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  onLayout,
  delayLongPress = 500,
  delayPressIn = 0,
  delayPressOut = 0,

  // State
  disabled = false,

  // Visual Feedback
  pressAnimation = 'opacity',
  pressedOpacity = 0.7,
  pressedScale = 0.98,
  disabledOpacity = 0.5,
  enableRipple = Platform.OS === 'android',
  rippleColor,
  rippleBorderless = false,

  // Haptics
  hapticFeedback = 'light',
  hapticOnPressIn = true,

  // Hit Area
  hitSlop,
  pressRetentionOffset,

  // Accessibility
  testID,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  accessibilityState,

  // Styling
  style,
  pressedStyle,
  disabledStyle,
}: PressableProps): React.ReactElement {
  const { theme } = useTheme();

  // Animation shared value
  const pressed = useSharedValue(0);

  // Trigger haptic feedback
  const triggerHaptic = useCallback(() => {
    if (hapticFeedback === 'none' || disabled) return;

    // TODO: Integrate with react-native-haptic-feedback or expo-haptics
    // For now, this is a placeholder
    // Example with expo-haptics:
    // import * as Haptics from 'expo-haptics';
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [hapticFeedback, disabled]);

  // Handle press in
  const handlePressIn = useCallback(
    (event: any) => {
      pressed.value = withTiming(1, { duration: 100 });

      if (hapticOnPressIn) {
        triggerHaptic();
      }

      onPressIn?.(event);
    },
    [onPressIn, pressed, hapticOnPressIn, triggerHaptic]
  );

  // Handle press out
  const handlePressOut = useCallback(
    (event: any) => {
      pressed.value = withTiming(0, { duration: 150 });
      onPressOut?.(event);
    },
    [onPressOut, pressed]
  );

  // Handle press
  const handlePress = useCallback(
    (event: any) => {
      if (disabled) return;

      if (!hapticOnPressIn) {
        triggerHaptic();
      }

      onPress?.(event);
    },
    [onPress, disabled, hapticOnPressIn, triggerHaptic]
  );

  // Animated style
  const animatedStyle = useAnimatedStyle(() => {
    const animationStyles: any = {};

    if (pressAnimation === 'opacity' || pressAnimation === 'both') {
      animationStyles.opacity = interpolate(
        pressed.value,
        [0, 1],
        [1, pressedOpacity]
      );
    }

    if (pressAnimation === 'scale' || pressAnimation === 'both') {
      animationStyles.transform = [
        {
          scale: interpolate(pressed.value, [0, 1], [1, pressedScale]),
        },
      ];
    }

    return animationStyles;
  }, [pressAnimation, pressedOpacity, pressedScale]);

  // Compute accessibility state
  const computedAccessibilityState = useMemo(
    () => ({
      disabled,
      ...accessibilityState,
    }),
    [disabled, accessibilityState]
  );

  // Android ripple config
  const androidRipple = useMemo(() => {
    if (!enableRipple || Platform.OS !== 'android') {
      return undefined;
    }

    return {
      color: rippleColor || theme.colors.interactive.tint,
      borderless: rippleBorderless,
    };
  }, [enableRipple, rippleColor, rippleBorderless, theme.colors.interactive.tint]);

  // Resolve style
  const resolveStyle = useCallback(
    ({ pressed: isPressed }: PressableStateCallbackType) => {
      const baseStyle = typeof style === 'function'
        ? style({ pressed: isPressed })
        : style;

      return [
        baseStyle,
        disabled && { opacity: disabledOpacity },
        disabled && disabledStyle,
        isPressed && pressedStyle,
      ];
    },
    [style, disabled, disabledOpacity, disabledStyle, pressedStyle]
  );

  // Render children
  const renderChildren = useCallback(
    ({ pressed: isPressed }: PressableStateCallbackType) => {
      if (typeof children === 'function') {
        return children({ pressed: isPressed });
      }
      return children;
    },
    [children]
  );

  return (
    <AnimatedPressable
      testID={testID}
      onPress={handlePress}
      onLongPress={disabled ? undefined : onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLayout={onLayout}
      delayLongPress={delayLongPress}
      disabled={disabled}
      hitSlop={hitSlop}
      android_ripple={androidRipple}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={computedAccessibilityState}
      style={[animatedStyle, resolveStyle]}
    >
      {renderChildren}
    </AnimatedPressable>
  );
}

// Set display name for debugging
Pressable.displayName = 'Pressable';

export default Pressable;