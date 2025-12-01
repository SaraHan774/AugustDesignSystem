/**
 * AugustDesignSystem
 *
 * A comprehensive React Native design system following Apple Human Interface Guidelines.
 *
 * Features:
 * - Complete design tokens (colors, typography, spacing, shadows, animations)
 * - Light and dark mode support with automatic system detection
 * - Type-safe theme access
 * - Custom theme extension support
 * - Accessibility hooks and utilities
 * - Responsive design utilities
 *
 * @example
 * ```tsx
 * import {
 *   ThemeProvider,
 *   useTheme,
 *   useThemedStyles,
 * } from './design-system';
 *
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <MyComponent />
 *     </ThemeProvider>
 *   );
 * }
 *
 * function MyComponent() {
 *   const styles = useThemedStyles((theme) => ({
 *     container: {
 *       backgroundColor: theme.colors.background.primary,
 *       padding: theme.spacing.lg,
 *     },
 *     title: {
 *       ...theme.typography.headline,
 *       color: theme.colors.label.primary,
 *     },
 *   }));
 *
 *   return (
 *     <View style={styles.container}>
 *       <Text style={styles.title}>Hello, August!</Text>
 *     </View>
 *   );
 * }
 * ```
 *
 * @packageDocumentation
 */

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type {
  // Token types
  ColorTokens,
  FontWeight,
  TypographyStyle,
  TypographyTokens,
  FontFamilyTokens,
  SpacingTokens,
  RadiusTokens,
  ShadowStyle,
  ShadowTokens,
  DurationTokens,
  EasingTokens,
  AnimationTokens,
  SizeTokens,
  ZIndexTokens,
  BreakpointTokens,
  OpacityTokens,
  DesignTokens,
  // Theme types
  ColorMode,
  ColorModePreference,
  Theme,
  ThemeConfig,
  DeepPartial,
  ThemeExtension,
  CustomThemeConfig,
  ThemeContextValue,
  ThemeProviderProps,
  ThemedProps,
  ThemedStyleFunction,
  VariantProps,
  SizeProps,
  ColorPath,
  SemanticColor,
  SystemColor,
  Breakpoint,
  ResponsiveValue,
  ResponsiveStyle,
  // Component types
  BaseComponentProps,
  ContainerProps,
  StylableProps,
  StylableContainerProps,
  InteractiveState,
  PressableProps,
  SpacingProps,
  FlexProps,
  LayoutProps,
  TextVariant,
  TextAlign,
  TypographyProps,
  LoadingProps,
  ProgressProps,
  InputBaseProps,
  LayoutHandler,
  EventHandler,
  RequireFields,
  OptionalFields,
  StyleType,
  Merge,
  NativeProps,
} from './types';

// =============================================================================
// TOKEN EXPORTS
// =============================================================================

export {
  // Colors
  lightColors,
  darkColors,
  withAlpha,
  hasMinimumContrast,
  // Typography
  typography,
  fontFamily,
  typographyEmphasis,
  withWeight,
  withSize,
  emphasized,
  bold,
  // Spacing
  spacing,
  layoutConstants,
  SPACING_UNIT,
  space,
  insetAll,
  insetSquish,
  insetDirectional,
  // Radius
  radius,
  semanticRadius,
  circular,
  corners,
  topRounded,
  bottomRounded,
  leftRounded,
  rightRounded,
  // Shadows
  lightShadows,
  darkShadows,
  shadowColors,
  semanticShadows,
  createShadow,
  combineShadows,
  scaleShadow,
  // Animation
  animation,
  duration,
  easing,
  animationPresets,
  reducedMotionPresets,
  withDelay,
  stagger,
  // Sizes
  sizes,
  zIndex,
  breakpoints,
  opacity,
  componentSizes,
  meetsMinimumTouchTarget,
  ensureMinimumTouchTarget,
  getIconSizeForContext,
} from './tokens';

// =============================================================================
// THEME EXPORTS
// =============================================================================

export {
  // Default themes
  lightTheme,
  darkTheme,
  defaultThemeConfig,
  getTheme,
  // Theme creation
  createTheme,
  createLightTheme,
  createDarkTheme,
  createBrandColors,
  createCustomTypography,
  mergeExtensions,
  isValidTheme,
  getTokenValue,
  // Theme context and provider
  ThemeContext,
  ThemeProvider,
  useTheme,
  useThemeTokens,
  useColorMode,
  useIsDarkMode,
  useToken,
  useColors,
  useSpacing,
  useTypography,
} from './theme';

// =============================================================================
// HOOK EXPORTS
// =============================================================================

export {
  // Styled hooks
  useThemedStyles,
  useThemedStyle,
  createThemedStyles,
  combineStyles,
  conditionalStyle,
  // Responsive hooks
  useBreakpoint,
  useResponsiveValue,
  useDeviceType,
  useIsBreakpoint,
  useScreenDimensions,
  responsiveStyle,
  // Accessibility hooks
  useReducedMotion,
  useAccessibleAnimation,
  useScreenReader,
  useBoldText,
  useDynamicType,
  useScaledTypography,
  useHighContrast,
  announceForAccessibility,
  setAccessibilityFocus,
} from './hooks';

// =============================================================================
// UTILITY EXPORTS
// =============================================================================

export {
  // Color utilities
  hexToRgb,
  rgbToHex,
  withOpacity,
  lighten,
  darken,
  getLuminance,
  getContrastRatio,
  meetsWCAGAA,
  meetsWCAGAAA,
  // Spacing utilities
  gridSpace,
  clamp,
  // Token access
  get,
  getColor,
  // Platform utilities
  ios,
  android,
  platformSelect,
  // String utilities
  capitalize,
  toKebabCase,
  toCamelCase,
} from './utils';

// =============================================================================
// CONSTANT EXPORTS
// =============================================================================

export {
  VERSION,
  NAME,
  HIG,
  ACCESSIBILITY,
  PLATFORM,
  Z_INDEX,
  GRID,
  BREAKPOINTS,
  TIMING,
} from './constants';

// =============================================================================
// COMPONENT EXPORTS
// =============================================================================

// Re-export all components
export * from './components';
