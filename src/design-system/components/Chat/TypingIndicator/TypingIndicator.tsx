/**
 * AugustDesignSystem - TypingIndicator Component
 *
 * An animated typing indicator component following Apple Human Interface Guidelines.
 * Used to show when users are typing in a chat conversation.
 *
 * @example
 * ```tsx
 * // Basic three-dot animation
 * <TypingIndicator isTyping />
 *
 * // Text variant with user name
 * <TypingIndicator
 *   isTyping
 *   variant="text"
 *   typingUsers={['John']}
 * />
 *
 * // Multiple users typing
 * <TypingIndicator
 *   isTyping
 *   variant="text"
 *   typingUsers={['John', 'Jane']}
 * />
 *
 * // Bubble variant (like a message bubble)
 * <TypingIndicator isTyping variant="bubble" />
 *
 * // Custom text
 * <TypingIndicator
 *   isTyping
 *   variant="text"
 *   text="Someone is writing a message..."
 * />
 * ```
 */

import React, { useMemo, useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { useTheme } from '@theme';
import type { TypingIndicatorProps } from './TypingIndicator.types';
import {
  createTypingIndicatorStyles,
  getDynamicTypingIndicatorStyles,
  generateTypingText,
  getDotSize,
} from './TypingIndicator.styles';

/**
 * TypingIndicator component for showing typing status.
 *
 * Features:
 * - Three display variants (dots, text, bubble)
 * - Smooth animated dots with staggered timing
 * - Auto-generated text from user names
 * - Three sizes (sm, md, lg)
 * - Full accessibility support
 */
export function TypingIndicator({
  // Content
  isTyping = true,
  typingUsers,
  text,

  // Visual style
  variant = 'dots',
  size = 'md',
  animationDuration = 600,

  // Accessibility
  testID,
  accessibilityLabel,

  // Styling
  style,
  textStyle,
  dotsContainerStyle,
  dotColor,
}: TypingIndicatorProps): React.ReactElement | null {
  const { theme } = useTheme();

  // Animation values for three dots
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;

  // Create base styles
  const baseStyles = useMemo(
    () => createTypingIndicatorStyles(theme),
    [theme]
  );

  // Get dynamic styles based on props
  const dynamicStyles = useMemo(
    () => getDynamicTypingIndicatorStyles(variant, size, theme),
    [variant, size, theme]
  );

  // Get dot dimensions
  const dotSize = useMemo(() => getDotSize(size), [size]);

  // Animate dots when typing
  useEffect(() => {
    if (!isTyping || variant === 'text') {
      // Reset animations
      dot1Anim.setValue(0);
      dot2Anim.setValue(0);
      dot3Anim.setValue(0);
      return;
    }

    // Create staggered bounce animation
    const createDotAnimation = (animValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: animationDuration / 2,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: animationDuration / 2,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
    };

    const staggerDelay = animationDuration / 4;

    const animation = Animated.parallel([
      createDotAnimation(dot1Anim, 0),
      createDotAnimation(dot2Anim, staggerDelay),
      createDotAnimation(dot3Anim, staggerDelay * 2),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [isTyping, variant, animationDuration, dot1Anim, dot2Anim, dot3Anim]);

  // Don't render if not typing
  if (!isTyping) {
    return null;
  }

  // Generate display text
  const displayText = text || generateTypingText(typingUsers);

  // Compute accessibility label
  const computedAccessibilityLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    return displayText;
  }, [accessibilityLabel, displayText]);

  // Animated dot component
  const AnimatedDot = ({ animValue }: { animValue: Animated.Value }) => {
    const translateY = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -dotSize * 0.5],
    });

    const opacity = animValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.4, 1, 0.4],
    });

    return (
      <Animated.View
        style={[
          baseStyles.dot,
          dynamicStyles.dot,
          dotColor && { backgroundColor: dotColor },
          {
            transform: [{ translateY }],
            opacity,
          },
        ]}
      />
    );
  };

  // Render dots animation
  const renderDots = () => (
    <View style={[baseStyles.dotsContainer, dynamicStyles.dotsContainer, dotsContainerStyle]}>
      <AnimatedDot animValue={dot1Anim} />
      <AnimatedDot animValue={dot2Anim} />
      <AnimatedDot animValue={dot3Anim} />
    </View>
  );

  // Render text variant
  const renderText = () => (
    <Text
      style={[baseStyles.text, dynamicStyles.text, textStyle]}
      numberOfLines={1}
      testID={testID ? `${testID}-text` : undefined}
    >
      {displayText}
    </Text>
  );

  // Render based on variant
  const renderContent = () => {
    switch (variant) {
      case 'text':
        return renderText();
      case 'bubble':
      case 'dots':
      default:
        return renderDots();
    }
  };

  return (
    <View
      testID={testID}
      style={[
        baseStyles.container,
        dynamicStyles.container,
        variant === 'bubble' && baseStyles.bubbleContainer,
        style,
      ]}
      accessibilityLabel={computedAccessibilityLabel}
      accessibilityRole="text"
      accessibilityLiveRegion="polite"
    >
      {renderContent()}
    </View>
  );
}

// Set display name for debugging
TypingIndicator.displayName = 'TypingIndicator';
