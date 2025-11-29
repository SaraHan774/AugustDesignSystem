/**
 * Mock for react-native-reanimated in Storybook/Web environment
 *
 * Provides web-compatible implementations for animation hooks and components.
 */

import React from 'react';
import { View, Text, Image, ScrollView, Animated } from 'react-native-web';

// Shared value - use React state as fallback
export function useSharedValue<T>(initialValue: T) {
  const ref = React.useRef(initialValue);
  return {
    value: ref.current,
    get: () => ref.current,
    set: (newValue: T) => {
      ref.current = newValue;
    },
  };
}

// Animated style hook - returns static styles
export function useAnimatedStyle(styleCallback: () => any, deps?: any[]) {
  return React.useMemo(() => {
    try {
      return styleCallback();
    } catch {
      return {};
    }
  }, deps || []);
}

// Animated props hook
export function useAnimatedProps(propsCallback: () => any, deps?: any[]) {
  return React.useMemo(() => {
    try {
      return propsCallback();
    } catch {
      return {};
    }
  }, deps || []);
}

// Derived value
export function useDerivedValue<T>(callback: () => T, deps?: any[]) {
  const ref = React.useRef<T>();
  React.useMemo(() => {
    try {
      ref.current = callback();
    } catch {
      // Ignore worklet errors
    }
  }, deps || []);
  return {
    value: ref.current,
    get: () => ref.current,
  };
}

// Animation functions - return immediately
export function withTiming(toValue: number, config?: any, callback?: (finished?: boolean) => void) {
  if (callback) callback(true);
  return toValue;
}

export function withSpring(toValue: number, config?: any, callback?: (finished?: boolean) => void) {
  if (callback) callback(true);
  return toValue;
}

export function withDecay(config?: any, callback?: (finished?: boolean) => void) {
  if (callback) callback(true);
  return 0;
}

export function withDelay(delay: number, animation: any) {
  return animation;
}

export function withSequence(...animations: any[]) {
  return animations[animations.length - 1] || 0;
}

export function withRepeat(animation: any, numberOfReps?: number, reverse?: boolean, callback?: (finished?: boolean) => void) {
  if (callback) callback(true);
  return animation;
}

// Easing
export const Easing = {
  linear: (t: number) => t,
  ease: (t: number) => t,
  quad: (t: number) => t * t,
  cubic: (t: number) => t * t * t,
  poly: (n: number) => (t: number) => Math.pow(t, n),
  sin: (t: number) => 1 - Math.cos((t * Math.PI) / 2),
  circle: (t: number) => 1 - Math.sqrt(1 - t * t),
  exp: (t: number) => Math.pow(2, 10 * (t - 1)),
  elastic: (bounciness?: number) => (t: number) => t,
  back: (s?: number) => (t: number) => t,
  bounce: (t: number) => t,
  bezier: (x1: number, y1: number, x2: number, y2: number) => (t: number) => t,
  bezierFn: (x1: number, y1: number, x2: number, y2: number) => (t: number) => t,
  in: (easing: (t: number) => number) => easing,
  out: (easing: (t: number) => number) => easing,
  inOut: (easing: (t: number) => number) => easing,
};

// Interpolation
export function interpolate(value: number, inputRange: number[], outputRange: number[], extrapolate?: any) {
  if (inputRange.length < 2 || outputRange.length < 2) return outputRange[0] || 0;

  // Simple linear interpolation
  const inputMin = inputRange[0];
  const inputMax = inputRange[inputRange.length - 1];
  const outputMin = outputRange[0];
  const outputMax = outputRange[outputRange.length - 1];

  const clampedValue = Math.min(Math.max(value, inputMin), inputMax);
  const ratio = (clampedValue - inputMin) / (inputMax - inputMin);

  return outputMin + ratio * (outputMax - outputMin);
}

export const Extrapolation = {
  CLAMP: 'clamp',
  EXTEND: 'extend',
  IDENTITY: 'identity',
};

export function interpolateColor(value: number, inputRange: number[], outputRange: string[], colorSpace?: string) {
  const index = Math.min(Math.floor(value), outputRange.length - 1);
  return outputRange[Math.max(0, index)] || outputRange[0];
}

// Run on JS/UI
export function runOnJS(fn: Function) {
  return (...args: any[]) => fn(...args);
}

export function runOnUI(fn: Function) {
  return (...args: any[]) => fn(...args);
}

// Animated components factory
function createAnimatedComponent(Component: any) {
  const AnimatedComponent = React.forwardRef((props: any, ref: any) => {
    return React.createElement(Component, { ...props, ref });
  });
  AnimatedComponent.displayName = `Animated.${Component.displayName || Component.name || 'Component'}`;
  return AnimatedComponent;
}

// Animated namespace
const AnimatedView = createAnimatedComponent(View);
const AnimatedText = createAnimatedComponent(Text);
const AnimatedImage = createAnimatedComponent(Image);
const AnimatedScrollView = createAnimatedComponent(ScrollView);

export const AnimatedDefault = {
  View: AnimatedView,
  Text: AnimatedText,
  Image: AnimatedImage,
  ScrollView: AnimatedScrollView,
  createAnimatedComponent,
  // Add additional components as needed
};

// Gesture handler related
export function useAnimatedGestureHandler(handlers: any) {
  return (event: any) => {
    // No-op for web
  };
}

export function useAnimatedScrollHandler(handlers: any) {
  return (event: any) => {
    // No-op for web
  };
}

export function useAnimatedReaction(prepare: () => any, react: (prepared: any, previous: any) => void, deps?: any[]) {
  // No-op for web
}

// Worklet related
export function makeMutable<T>(initialValue: T) {
  return useSharedValue(initialValue);
}

export function cancelAnimation(sharedValue: any) {
  // No-op
}

// Layout animations
export const Layout = {
  duration: () => Layout,
  delay: () => Layout,
  springify: () => Layout,
  damping: () => Layout,
  mass: () => Layout,
  stiffness: () => Layout,
  overshootClamping: () => Layout,
  restDisplacementThreshold: () => Layout,
  restSpeedThreshold: () => Layout,
  withInitialValues: () => Layout,
  withCallback: () => Layout,
  randomDelay: () => Layout,
  build: () => undefined,
};

export const FadeIn = Layout;
export const FadeOut = Layout;
export const FadeInUp = Layout;
export const FadeInDown = Layout;
export const FadeInLeft = Layout;
export const FadeInRight = Layout;
export const FadeOutUp = Layout;
export const FadeOutDown = Layout;
export const FadeOutLeft = Layout;
export const FadeOutRight = Layout;
export const SlideInUp = Layout;
export const SlideInDown = Layout;
export const SlideInLeft = Layout;
export const SlideInRight = Layout;
export const SlideOutUp = Layout;
export const SlideOutDown = Layout;
export const SlideOutLeft = Layout;
export const SlideOutRight = Layout;
export const ZoomIn = Layout;
export const ZoomOut = Layout;
export const BounceIn = Layout;
export const BounceOut = Layout;
export const FlipInXUp = Layout;
export const FlipOutXUp = Layout;
export const StretchInX = Layout;
export const StretchOutX = Layout;
export const LightSpeedInLeft = Layout;
export const LightSpeedOutRight = Layout;
export const PinwheelIn = Layout;
export const PinwheelOut = Layout;
export const RotateInUpLeft = Layout;
export const RotateOutUpLeft = Layout;
export const RollInLeft = Layout;
export const RollOutLeft = Layout;

// Keyframe
export class Keyframe {
  constructor(definitions: any) {}
  duration() { return this; }
  delay() { return this; }
  withCallback() { return this; }
}

// Measure
export function measure(animatedRef: any) {
  return null;
}

export function useAnimatedRef() {
  return React.useRef(null);
}

// Default export
export default AnimatedDefault;
