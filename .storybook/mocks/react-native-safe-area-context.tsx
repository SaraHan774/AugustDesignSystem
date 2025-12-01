/**
 * Mock for react-native-safe-area-context in Storybook/Web environment
 *
 * Provides web-compatible implementations for safe area hooks and components.
 */

import React, { createContext, useContext, useMemo } from 'react';
import { View } from 'react-native-web';

// Types
export interface EdgeInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Metrics {
  insets: EdgeInsets;
  frame: Rect;
}

export type Edge = 'top' | 'right' | 'bottom' | 'left';

export interface SafeAreaViewProps {
  children?: React.ReactNode;
  style?: any;
  edges?: Edge[];
  mode?: 'padding' | 'margin';
}

export interface SafeAreaProviderProps {
  children?: React.ReactNode;
  initialMetrics?: Metrics | null;
  style?: any;
}

// Default insets (no safe area on web)
const defaultInsets: EdgeInsets = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const defaultFrame: Rect = {
  x: 0,
  y: 0,
  width: typeof window !== 'undefined' ? window.innerWidth : 390,
  height: typeof window !== 'undefined' ? window.innerHeight : 844,
};

const defaultMetrics: Metrics = {
  insets: defaultInsets,
  frame: defaultFrame,
};

// Context
const SafeAreaInsetsContext = createContext<EdgeInsets>(defaultInsets);
const SafeAreaFrameContext = createContext<Rect>(defaultFrame);

/**
 * SafeAreaProvider component
 */
export function SafeAreaProvider({
  children,
  initialMetrics,
  style,
}: SafeAreaProviderProps): React.ReactElement {
  const insets = initialMetrics?.insets ?? defaultInsets;
  const frame = initialMetrics?.frame ?? defaultFrame;

  return (
    <SafeAreaFrameContext.Provider value={frame}>
      <SafeAreaInsetsContext.Provider value={insets}>
        <View style={[{ flex: 1 }, style]}>{children}</View>
      </SafeAreaInsetsContext.Provider>
    </SafeAreaFrameContext.Provider>
  );
}

/**
 * SafeAreaView component
 */
export function SafeAreaView({
  children,
  style,
  edges,
  mode = 'padding',
}: SafeAreaViewProps): React.ReactElement {
  const insets = useContext(SafeAreaInsetsContext);

  const appliedStyle = useMemo(() => {
    const edgesToApply = edges ?? ['top', 'right', 'bottom', 'left'];
    const styleKey = mode === 'margin' ? 'margin' : 'padding';

    const safeAreaStyle: Record<string, number> = {};

    if (edgesToApply.includes('top')) {
      safeAreaStyle[`${styleKey}Top`] = insets.top;
    }
    if (edgesToApply.includes('right')) {
      safeAreaStyle[`${styleKey}Right`] = insets.right;
    }
    if (edgesToApply.includes('bottom')) {
      safeAreaStyle[`${styleKey}Bottom`] = insets.bottom;
    }
    if (edgesToApply.includes('left')) {
      safeAreaStyle[`${styleKey}Left`] = insets.left;
    }

    return safeAreaStyle;
  }, [insets, edges, mode]);

  return <View style={[appliedStyle, style]}>{children}</View>;
}

/**
 * Hook to get safe area insets
 */
export function useSafeAreaInsets(): EdgeInsets {
  return useContext(SafeAreaInsetsContext);
}

/**
 * Hook to get safe area frame
 */
export function useSafeAreaFrame(): Rect {
  return useContext(SafeAreaFrameContext);
}

/**
 * withSafeAreaInsets HOC
 */
export function withSafeAreaInsets<P extends { insets: EdgeInsets }>(
  Component: React.ComponentType<P>
): React.ComponentType<Omit<P, 'insets'>> {
  return function WrappedComponent(props: Omit<P, 'insets'>) {
    const insets = useSafeAreaInsets();
    return <Component {...(props as P)} insets={insets} />;
  };
}

/**
 * SafeAreaConsumer component
 */
export function SafeAreaConsumer({
  children,
}: {
  children: (insets: EdgeInsets) => React.ReactNode;
}): React.ReactElement {
  const insets = useSafeAreaInsets();
  return <>{children(insets)}</>;
}

/**
 * SafeAreaFrameConsumer component
 */
export function SafeAreaFrameConsumer({
  children,
}: {
  children: (frame: Rect) => React.ReactNode;
}): React.ReactElement {
  const frame = useSafeAreaFrame();
  return <>{children(frame)}</>;
}

/**
 * Initial window metrics for SSR or initial render
 */
export const initialWindowMetrics: Metrics | null = defaultMetrics;

// Default export
export default {
  SafeAreaProvider,
  SafeAreaView,
  SafeAreaConsumer,
  SafeAreaFrameConsumer,
  useSafeAreaInsets,
  useSafeAreaFrame,
  withSafeAreaInsets,
  initialWindowMetrics,
};
