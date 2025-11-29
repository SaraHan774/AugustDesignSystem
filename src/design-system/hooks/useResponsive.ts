/**
 * AugustDesignSystem - useResponsive Hook
 *
 * Hooks for responsive design based on device dimensions.
 */

import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import type { Breakpoint, ResponsiveValue } from '../types';
import { useTheme } from '../theme';

// =============================================================================
// USE BREAKPOINT
// =============================================================================

/**
 * Hook that returns the current breakpoint based on screen width.
 *
 * @returns Current breakpoint key
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const breakpoint = useBreakpoint();
 *
 *   return (
 *     <View>
 *       {breakpoint === 'xs' && <MobileLayout />}
 *       {breakpoint === 'lg' && <TabletLayout />}
 *     </View>
 *   );
 * }
 * ```
 */
export function useBreakpoint(): Breakpoint {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const { breakpoints } = theme;

  return useMemo(() => {
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  }, [width, breakpoints]);
}

// =============================================================================
// USE RESPONSIVE VALUE
// =============================================================================

/**
 * Hook that resolves a responsive value based on current breakpoint.
 *
 * @param value - Single value or breakpoint-mapped values
 * @returns Resolved value for current breakpoint
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   // Single value - same for all breakpoints
 *   const padding1 = useResponsiveValue(16);
 *
 *   // Responsive value - different per breakpoint
 *   const padding2 = useResponsiveValue({
 *     xs: 8,
 *     sm: 12,
 *     md: 16,
 *     lg: 24,
 *     xl: 32,
 *   });
 *
 *   // Partial responsive value - inherits from smaller breakpoints
 *   const padding3 = useResponsiveValue({
 *     xs: 8,
 *     md: 16,
 *     // lg and xl will use md's value (16)
 *   });
 *
 *   return <View style={{ padding: padding2 }} />;
 * }
 * ```
 */
export function useResponsiveValue<T>(value: ResponsiveValue<T>): T {
  const breakpoint = useBreakpoint();

  return useMemo(() => {
    // If not an object with breakpoint keys, return as-is
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return value as T;
    }

    const responsiveValue = value as Partial<Record<Breakpoint, T>>;

    // Breakpoint order from largest to smallest
    const breakpointOrder: Breakpoint[] = ['xl', 'lg', 'md', 'sm', 'xs'];
    const currentIndex = breakpointOrder.indexOf(breakpoint);

    // Find the value for current breakpoint or fall back to smaller breakpoints
    for (let i = currentIndex; i < breakpointOrder.length; i++) {
      const bp = breakpointOrder[i];
      if (bp in responsiveValue && responsiveValue[bp] !== undefined) {
        return responsiveValue[bp] as T;
      }
    }

    // If no matching breakpoint found, try to find any defined value
    for (const bp of breakpointOrder) {
      if (bp in responsiveValue && responsiveValue[bp] !== undefined) {
        return responsiveValue[bp] as T;
      }
    }

    return undefined as T;
  }, [value, breakpoint]);
}

// =============================================================================
// USE DEVICE TYPE
// =============================================================================

/**
 * Device type classification.
 */
export type DeviceType = 'phone' | 'tablet';

/**
 * Hook that returns the device type based on screen width.
 *
 * @returns Device type ('phone' | 'tablet')
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const deviceType = useDeviceType();
 *   const isTablet = deviceType === 'tablet';
 *
 *   return isTablet ? <SidebarLayout /> : <StackLayout />;
 * }
 * ```
 */
export function useDeviceType(): DeviceType {
  const breakpoint = useBreakpoint();
  return breakpoint === 'lg' || breakpoint === 'xl' ? 'tablet' : 'phone';
}

// =============================================================================
// USE IS BREAKPOINT
// =============================================================================

/**
 * Hook that checks if current breakpoint matches or is larger than specified.
 *
 * @param targetBreakpoint - Minimum breakpoint to match
 * @returns True if current breakpoint is >= target
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isTablet = useIsBreakpoint('lg');
 *   const isLargePhone = useIsBreakpoint('md');
 *
 *   return (
 *     <View style={{ flexDirection: isTablet ? 'row' : 'column' }}>
 *       {children}
 *     </View>
 *   );
 * }
 * ```
 */
export function useIsBreakpoint(targetBreakpoint: Breakpoint): boolean {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();

  return width >= theme.breakpoints[targetBreakpoint];
}

// =============================================================================
// USE SCREEN DIMENSIONS
// =============================================================================

/**
 * Screen dimension info with additional computed values.
 */
export interface ScreenDimensions {
  width: number;
  height: number;
  isPortrait: boolean;
  isLandscape: boolean;
  aspectRatio: number;
}

/**
 * Hook that provides screen dimensions with computed values.
 *
 * @returns Screen dimension information
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { width, isPortrait, aspectRatio } = useScreenDimensions();
 *
 *   return (
 *     <Image
 *       style={{
 *         width: width * 0.8,
 *         aspectRatio: isPortrait ? 1 : 16/9,
 *       }}
 *     />
 *   );
 * }
 * ```
 */
export function useScreenDimensions(): ScreenDimensions {
  const { width, height } = useWindowDimensions();

  return useMemo(
    () => ({
      width,
      height,
      isPortrait: height >= width,
      isLandscape: width > height,
      aspectRatio: width / height,
    }),
    [width, height]
  );
}

// =============================================================================
// RESPONSIVE STYLE UTILITIES
// =============================================================================

/**
 * Creates a responsive style object.
 * Helper for building styles that change at breakpoints.
 *
 * @param styles - Breakpoint-mapped style objects
 * @returns Function that resolves style for given breakpoint
 *
 * @example
 * ```tsx
 * const getContainerStyle = responsiveStyle({
 *   xs: { padding: 8 },
 *   sm: { padding: 12 },
 *   md: { padding: 16, flexDirection: 'row' },
 *   lg: { padding: 24, flexDirection: 'row' },
 * });
 *
 * function MyComponent() {
 *   const breakpoint = useBreakpoint();
 *   return <View style={getContainerStyle(breakpoint)} />;
 * }
 * ```
 */
export function responsiveStyle<T>(
  styles: Partial<Record<Breakpoint, T>>
): (breakpoint: Breakpoint) => T | undefined {
  const breakpointOrder: Breakpoint[] = ['xl', 'lg', 'md', 'sm', 'xs'];

  return (breakpoint: Breakpoint) => {
    const currentIndex = breakpointOrder.indexOf(breakpoint);

    for (let i = currentIndex; i < breakpointOrder.length; i++) {
      const bp = breakpointOrder[i];
      if (bp in styles && styles[bp] !== undefined) {
        return styles[bp];
      }
    }

    return undefined;
  };
}
