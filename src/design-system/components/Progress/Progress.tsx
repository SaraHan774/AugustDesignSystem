/**
 * AugustDesignSystem - Progress Component
 *
 * Progress indicator with linear and circular variants.
 * Supports determinate (with value) and indeterminate (animated) modes.
 *
 * @example
 * ```tsx
 * // Linear determinate progress
 * <Progress value={75} />
 *
 * // Linear indeterminate (loading)
 * <Progress indeterminate />
 *
 * // With label
 * <Progress value={50} showLabel />
 *
 * // Circular progress
 * <Progress variant="circular" value={60} />
 *
 * // Circular with label
 * <Progress variant="circular" value={75} showLabel size="lg" />
 *
 * // Different colors
 * <Progress value={100} color="success" />
 * <Progress value={30} color="warning" />
 * ```
 */

import React, { useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../../theme';
import { useReducedMotion } from '../../hooks';
import {
  createProgressStyles,
  getLinearSize,
  getCircularSize,
  getProgressColor,
  getBackgroundColor,
  calculateCircleParams,
} from './Progress.styles';
import type { ProgressProps } from './Progress.types';

// Create animated circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * Progress indicator component.
 *
 * Features:
 * - Linear and circular variants
 * - Determinate (with value) and indeterminate modes
 * - Optional percentage label
 * - Multiple size and color variants
 * - Smooth animations
 * - Reduced motion support
 */
export function Progress({
  // Value
  value,
  indeterminate: indeterminateProp,

  // Appearance
  variant = 'linear',
  size = 'md',
  color = 'primary',
  trackColor: trackColorProp,
  backgroundColor: backgroundColorProp,

  // Label
  showLabel = false,
  formatLabel = (v) => `${Math.round(v)}%`,

  // Accessibility
  testID,
  accessibilityLabel,

  // Styling
  style,
  labelStyle,
}: ProgressProps): React.ReactElement {
  const { theme } = useTheme();
  const isReducedMotionEnabled = useReducedMotion();

  // Determine if indeterminate
  const isIndeterminate = indeterminateProp ?? value === undefined;

  // Clamp value between 0 and 100
  const clampedValue = useMemo(() => {
    if (value === undefined) return 0;
    return Math.min(100, Math.max(0, value));
  }, [value]);

  // Colors
  const trackColor = trackColorProp || getProgressColor(color, theme);
  const bgColor = backgroundColorProp || getBackgroundColor(theme);

  // Base styles
  const baseStyles = useMemo(() => createProgressStyles(theme), [theme]);

  // Animation values
  const progress = useSharedValue(0);
  const indeterminatePosition = useSharedValue(0);

  // Update progress animation
  useEffect(() => {
    if (!isIndeterminate) {
      progress.value = withTiming(clampedValue / 100, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    }
  }, [clampedValue, isIndeterminate, progress]);

  // Indeterminate animation
  useEffect(() => {
    if (isIndeterminate && !isReducedMotionEnabled) {
      indeterminatePosition.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        ),
        -1, // Infinite
        false
      );
    } else {
      indeterminatePosition.value = 0;
    }
  }, [isIndeterminate, isReducedMotionEnabled, indeterminatePosition]);

  // Computed accessibility label
  const computedAccessibilityLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    if (isIndeterminate) return 'Loading';
    return `Progress: ${Math.round(clampedValue)} percent`;
  }, [accessibilityLabel, isIndeterminate, clampedValue]);

  // Render linear progress
  if (variant === 'linear') {
    const linearSize = getLinearSize(size);

    // Animated fill style for determinate
    const fillStyle = useAnimatedStyle(() => ({
      width: `${progress.value * 100}%`,
    }));

    // Animated style for indeterminate
    const indeterminateFillStyle = useAnimatedStyle(() => {
      const width = 30; // Percentage width of the bar
      const translateX = indeterminatePosition.value * (100 - width);

      return {
        width: `${width}%`,
        transform: [{ translateX: `${translateX}%` }],
      };
    });

    return (
      <View
        style={[baseStyles.linearContainer, style]}
        testID={testID}
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={computedAccessibilityLabel}
        accessibilityValue={{
          min: 0,
          max: 100,
          now: isIndeterminate ? undefined : clampedValue,
        }}
      >
        <View
          style={[
            baseStyles.linearTrack,
            {
              height: linearSize.height,
              borderRadius: linearSize.borderRadius,
              backgroundColor: bgColor,
            },
          ]}
        >
          <Animated.View
            style={[
              baseStyles.linearFill,
              {
                borderRadius: linearSize.borderRadius,
                backgroundColor: trackColor,
              },
              isIndeterminate ? indeterminateFillStyle : fillStyle,
            ]}
          />
        </View>

        {showLabel && !isIndeterminate && (
          <Text style={[baseStyles.linearLabel, labelStyle]}>
            {formatLabel(clampedValue)}
          </Text>
        )}
      </View>
    );
  }

  // Render circular progress
  const circleParams = calculateCircleParams(size);

  // Animated props for circular progress
  const animatedCircleProps = useAnimatedProps(() => {
    const strokeDashoffset = circleParams.circumference * (1 - progress.value);
    return {
      strokeDashoffset,
    };
  });

  // Indeterminate rotation for circular
  const circularRotationStyle = useAnimatedStyle(() => {
    if (!isIndeterminate) return {};

    return {
      transform: [
        { rotate: `${indeterminatePosition.value * 360}deg` },
      ],
    };
  });

  return (
    <View
      style={[
        baseStyles.circularContainer,
        { width: circleParams.size, height: circleParams.size },
        style,
      ]}
      testID={testID}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={computedAccessibilityLabel}
      accessibilityValue={{
        min: 0,
        max: 100,
        now: isIndeterminate ? undefined : clampedValue,
      }}
    >
      <Animated.View style={[baseStyles.circularSvg, circularRotationStyle]}>
        <Svg
          width={circleParams.size}
          height={circleParams.size}
        >
          {/* Background circle */}
          <Circle
            cx={circleParams.center}
            cy={circleParams.center}
            r={circleParams.radius}
            stroke={bgColor}
            strokeWidth={circleParams.strokeWidth}
            fill="none"
          />

          {/* Progress circle */}
          <AnimatedCircle
            cx={circleParams.center}
            cy={circleParams.center}
            r={circleParams.radius}
            stroke={trackColor}
            strokeWidth={circleParams.strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circleParams.circumference}
            animatedProps={animatedCircleProps}
          />
        </Svg>
      </Animated.View>

      {showLabel && !isIndeterminate && (
        <View style={baseStyles.circularLabelContainer}>
          <Text
            style={[
              baseStyles.circularLabel,
              { fontSize: circleParams.fontSize },
              labelStyle,
            ]}
          >
            {formatLabel(clampedValue)}
          </Text>
        </View>
      )}
    </View>
  );
}

// Set display name for debugging
Progress.displayName = 'Progress';

export default Progress;
