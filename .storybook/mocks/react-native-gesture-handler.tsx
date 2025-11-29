/**
 * Mock for react-native-gesture-handler in Storybook/Web environment
 *
 * Provides basic implementations for Storybook to render without errors.
 */

import React from 'react';
import { View, ScrollView as RNScrollView } from 'react-native-web';

// Gesture types
export const Gesture = {
  Pan: () => ({
    onStart: () => Gesture.Pan(),
    onUpdate: () => Gesture.Pan(),
    onEnd: () => Gesture.Pan(),
    onFinalize: () => Gesture.Pan(),
    enabled: () => Gesture.Pan(),
    minDistance: () => Gesture.Pan(),
    activeOffsetX: () => Gesture.Pan(),
    activeOffsetY: () => Gesture.Pan(),
    failOffsetX: () => Gesture.Pan(),
    failOffsetY: () => Gesture.Pan(),
    withTestId: () => Gesture.Pan(),
  }),
  Tap: () => ({
    onStart: () => Gesture.Tap(),
    onEnd: () => Gesture.Tap(),
    enabled: () => Gesture.Tap(),
    numberOfTaps: () => Gesture.Tap(),
    maxDuration: () => Gesture.Tap(),
    withTestId: () => Gesture.Tap(),
  }),
  LongPress: () => ({
    onStart: () => Gesture.LongPress(),
    onEnd: () => Gesture.LongPress(),
    enabled: () => Gesture.LongPress(),
    minDuration: () => Gesture.LongPress(),
    withTestId: () => Gesture.LongPress(),
  }),
  Pinch: () => ({
    onStart: () => Gesture.Pinch(),
    onUpdate: () => Gesture.Pinch(),
    onEnd: () => Gesture.Pinch(),
    enabled: () => Gesture.Pinch(),
    withTestId: () => Gesture.Pinch(),
  }),
  Rotation: () => ({
    onStart: () => Gesture.Rotation(),
    onUpdate: () => Gesture.Rotation(),
    onEnd: () => Gesture.Rotation(),
    enabled: () => Gesture.Rotation(),
    withTestId: () => Gesture.Rotation(),
  }),
  Fling: () => ({
    onStart: () => Gesture.Fling(),
    onEnd: () => Gesture.Fling(),
    enabled: () => Gesture.Fling(),
    direction: () => Gesture.Fling(),
    numberOfPointers: () => Gesture.Fling(),
    withTestId: () => Gesture.Fling(),
  }),
  ForceTouch: () => ({
    onStart: () => Gesture.ForceTouch(),
    onEnd: () => Gesture.ForceTouch(),
    enabled: () => Gesture.ForceTouch(),
    withTestId: () => Gesture.ForceTouch(),
  }),
  Native: () => ({
    onStart: () => Gesture.Native(),
    onEnd: () => Gesture.Native(),
    enabled: () => Gesture.Native(),
    withTestId: () => Gesture.Native(),
  }),
  Manual: () => ({
    onTouchesDown: () => Gesture.Manual(),
    onTouchesMove: () => Gesture.Manual(),
    onTouchesUp: () => Gesture.Manual(),
    onTouchesCancelled: () => Gesture.Manual(),
    enabled: () => Gesture.Manual(),
    withTestId: () => Gesture.Manual(),
  }),
  Exclusive: (...gestures: any[]) => gestures[0] || Gesture.Pan(),
  Simultaneous: (...gestures: any[]) => gestures[0] || Gesture.Pan(),
  Race: (...gestures: any[]) => gestures[0] || Gesture.Pan(),
};

// GestureDetector wrapper
export const GestureDetector = ({ children }: { children: React.ReactNode; gesture: any }) => {
  return <>{children}</>;
};

// GestureHandlerRootView wrapper
export const GestureHandlerRootView = ({ children, style }: { children: React.ReactNode; style?: any }) => {
  return <View style={style}>{children}</View>;
};

// Legacy handlers (for backward compatibility)
export const PanGestureHandler = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const TapGestureHandler = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const LongPressGestureHandler = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const PinchGestureHandler = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const RotationGestureHandler = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const FlingGestureHandler = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const ForceTouchGestureHandler = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const NativeViewGestureHandler = ({ children }: { children: React.ReactNode }) => <>{children}</>;

// State enum
export const State = {
  UNDETERMINED: 0,
  FAILED: 1,
  BEGAN: 2,
  CANCELLED: 3,
  ACTIVE: 4,
  END: 5,
};

// Directions
export const Directions = {
  RIGHT: 1,
  LEFT: 2,
  UP: 4,
  DOWN: 8,
};

// Touchable components
export const TouchableOpacity = View;
export const TouchableHighlight = View;
export const TouchableWithoutFeedback = View;
export const TouchableNativeFeedback = View;

// Wrapped components
export const ScrollView = RNScrollView;
export const FlatList = View;
export const SectionList = View;
export const TextInput = View;
export const DrawerLayoutAndroid = View;
export const Swipeable = View;
export const RectButton = View;
export const BorderlessButton = View;
export const BaseButton = View;

// Utility functions
export function createNativeWrapper(Component: any) {
  return Component;
}

export function gestureHandlerRootHOC(Component: any) {
  return Component;
}

// Default export
export default {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
  LongPressGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  FlingGestureHandler,
  ForceTouchGestureHandler,
  NativeViewGestureHandler,
  State,
  Directions,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  ScrollView,
  FlatList,
  createNativeWrapper,
  gestureHandlerRootHOC,
};
