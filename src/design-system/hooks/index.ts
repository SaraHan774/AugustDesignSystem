/**
 * AugustDesignSystem - Hooks Exports
 *
 * Central export point for all custom hooks.
 */

// Themed styles hooks
export {
  useThemedStyles,
  useThemedStyle,
  createThemedStyles,
  combineStyles,
  conditionalStyle,
} from './useThemedStyles';

// Responsive hooks
export {
  useBreakpoint,
  useResponsiveValue,
  useDeviceType,
  useIsBreakpoint,
  useScreenDimensions,
  responsiveStyle,
  type DeviceType,
  type ScreenDimensions,
} from './useResponsive';

// Accessibility hooks
export {
  useReducedMotion,
  useAccessibleAnimation,
  useScreenReader,
  useBoldText,
  useDynamicType,
  useScaledTypography,
  useHighContrast,
  announceForAccessibility,
  setAccessibilityFocus,
  type DynamicTypeSize,
  type AccessibleAnimationConfig,
} from './useAccessibility';
