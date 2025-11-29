/**
 * AugustDesignSystem - Switch Component
 *
 * An iOS-style toggle switch with smooth animations and haptic feedback.
 * Follows Apple Human Interface Guidelines for dimensions and behavior.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const [isEnabled, setIsEnabled] = useState(false);
 * <Switch value={isEnabled} onValueChange={setIsEnabled} />
 *
 * // With custom colors
 * <Switch
 *   value={isEnabled}
 *   onValueChange={setIsEnabled}
 *   trackColorOn="#34C759"
 *   trackColorOff="#E5E5EA"
 * />
 *
 * // Small size
 * <Switch value={isEnabled} onValueChange={setIsEnabled} size="sm" />
 *
 * // Disabled state
 * <Switch value={isEnabled} onValueChange={setIsEnabled} disabled />
 * ```
 */

import React, { useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import {
  createSwitchStyles,
  getSwitchSize,
  getThumbOffPosition,
  getThumbOnPosition,
  getTrackColors,
} from './Switch.styles';
import type { SwitchProps } from './Switch.types';

// Spring configuration for smooth animation
const SPRING_CONFIG = {
  damping: 20,
  stiffness: 300,
  mass: 0.8,
};

/**
 * iOS-style toggle switch component.
 *
 * Features:
 * - Smooth spring animations
 * - Haptic feedback support
 * - Custom track and thumb colors
 * - Two size variants (sm, md)
 * - Full accessibility support
 */
export function Switch({
  // State
  value,
  onValueChange,
  disabled = false,

  // Appearance
  size = 'md',
  trackColorOn,
  trackColorOff,
  thumbColor = '#FFFFFF',

  // Behavior
  hapticFeedback = true,

  // Accessibility
  testID,
  accessibilityLabel,
  accessibilityHint,

  // Styling
  style,
}: SwitchProps): React.ReactElement {
  const { theme } = useTheme();

  // Size configuration
  const sizeConfig = useMemo(() => getSwitchSize(size), [size]);

  // Track colors
  const trackColors = useMemo(
    () => getTrackColors(theme, trackColorOn, trackColorOff),
    [theme, trackColorOn, trackColorOff]
  );

  // Base styles
  const baseStyles = useMemo(() => createSwitchStyles(theme), [theme]);

  // Animation values
  const progress = useSharedValue(value ? 1 : 0);
  const isPressed = useSharedValue(false);

  // Thumb positions
  const thumbOffPos = useMemo(() => getThumbOffPosition(size), [size]);
  const thumbOnPos = useMemo(() => getThumbOnPosition(size), [size]);

  // Update animation when value changes
  React.useEffect(() => {
    progress.value = withSpring(value ? 1 : 0, SPRING_CONFIG);
  }, [value, progress]);

  // Trigger haptic feedback
  const triggerHaptic = useCallback(() => {
    if (!hapticFeedback || disabled) return;
    // TODO: Integrate with expo-haptics or react-native-haptic-feedback
    // Example: Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [hapticFeedback, disabled]);

  // Handle toggle
  const handleToggle = useCallback(() => {
    if (disabled) return;
    triggerHaptic();
    onValueChange(!value);
  }, [disabled, value, onValueChange, triggerHaptic]);

  // Handle press in
  const handlePressIn = useCallback(() => {
    if (disabled) return;
    isPressed.value = true;
  }, [disabled, isPressed]);

  // Handle press out
  const handlePressOut = useCallback(() => {
    isPressed.value = false;
  }, [isPressed]);

  // Animated track style
  const animatedTrackStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [trackColors.off, trackColors.on]
    );

    return {
      backgroundColor,
      width: sizeConfig.trackWidth,
      height: sizeConfig.trackHeight,
    };
  }, [trackColors, sizeConfig]);

  // Animated thumb style
  const animatedThumbStyle = useAnimatedStyle(() => {
    const translateX =
      thumbOffPos + progress.value * (thumbOnPos - thumbOffPos);

    // Slightly scale when pressed (iOS behavior)
    const scale = isPressed.value ? 1.05 : 1;

    return {
      width: sizeConfig.thumbSize,
      height: sizeConfig.thumbSize,
      backgroundColor: thumbColor,
      transform: [{ translateX }, { scale: withSpring(scale, SPRING_CONFIG) }],
    };
  }, [thumbOffPos, thumbOnPos, sizeConfig, thumbColor]);

  // Accessibility state
  const accessibilityState = useMemo(
    () => ({
      checked: value,
      disabled,
    }),
    [value, disabled]
  );

  return (
    <Pressable
      onPress={handleToggle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[baseStyles.container, style]}
      testID={testID}
      accessible
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={accessibilityState}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Animated.View
        style={[
          baseStyles.track,
          animatedTrackStyle,
          disabled && baseStyles.trackDisabled,
        ]}
      >
        <Animated.View style={[baseStyles.thumb, animatedThumbStyle]} />
      </Animated.View>
    </Pressable>
  );
}

// Set display name for debugging
Switch.displayName = 'Switch';

export default Switch;
