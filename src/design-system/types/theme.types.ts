/**
 * AugustDesignSystem - Theme Type Definitions
 *
 * Type definitions for the theme system supporting light/dark modes
 * and custom theme extensions.
 */

import type { DesignTokens, ColorTokens } from './tokens.types';

// =============================================================================
// COLOR MODE
// =============================================================================

/**
 * Supported color modes.
 */
export type ColorMode = 'light' | 'dark';

/**
 * Color mode preference including system detection.
 */
export type ColorModePreference = ColorMode | 'system';

// =============================================================================
// THEME STRUCTURE
// =============================================================================

/**
 * Complete theme definition containing all tokens.
 */
export interface Theme extends DesignTokens {
  /**
   * Current color mode.
   */
  readonly mode: ColorMode;

  /**
   * Theme identifier for debugging and logging.
   */
  readonly name: string;
}

/**
 * Theme configuration for both light and dark modes.
 */
export interface ThemeConfig {
  readonly light: Theme;
  readonly dark: Theme;
}

// =============================================================================
// THEME EXTENSION
// =============================================================================

/**
 * Partial theme for extending/overriding base theme values.
 * Uses recursive partial to allow deep overrides.
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Theme extension type for custom theme creation.
 */
export type ThemeExtension = DeepPartial<Omit<Theme, 'mode' | 'name'>>;

/**
 * Configuration for creating a custom theme.
 */
export interface CustomThemeConfig {
  /**
   * Name identifier for the custom theme.
   */
  readonly name: string;

  /**
   * Light mode overrides.
   */
  readonly light?: ThemeExtension;

  /**
   * Dark mode overrides.
   */
  readonly dark?: ThemeExtension;
}

// =============================================================================
// THEME CONTEXT
// =============================================================================

/**
 * Theme context value provided to consumers.
 */
export interface ThemeContextValue {
  /**
   * Current active theme with all tokens.
   */
  readonly theme: Theme;

  /**
   * Current color mode.
   */
  readonly colorMode: ColorMode;

  /**
   * User's color mode preference.
   */
  readonly colorModePreference: ColorModePreference;

  /**
   * Toggle between light and dark modes.
   */
  readonly toggleColorMode: () => void;

  /**
   * Set specific color mode or preference.
   */
  readonly setColorMode: (mode: ColorModePreference) => void;

  /**
   * Whether the system is in dark mode.
   */
  readonly isDark: boolean;

  /**
   * Whether the system is in light mode.
   */
  readonly isLight: boolean;
}

// =============================================================================
// THEME PROVIDER PROPS
// =============================================================================

/**
 * Props for the ThemeProvider component.
 */
export interface ThemeProviderProps {
  /**
   * Child components to receive theme context.
   */
  readonly children: React.ReactNode;

  /**
   * Initial color mode preference.
   * @default 'system'
   */
  readonly defaultColorMode?: ColorModePreference;

  /**
   * Custom theme configuration to merge with defaults.
   */
  readonly theme?: CustomThemeConfig;

  /**
   * Storage key for persisting color mode preference.
   * @default 'august-color-mode'
   */
  readonly storageKey?: string;
}

// =============================================================================
// STYLED COMPONENT HELPERS
// =============================================================================

/**
 * Props interface for styled components that need theme access.
 */
export interface ThemedProps {
  readonly theme: Theme;
}

/**
 * Helper type for creating themed style functions.
 */
export type ThemedStyleFunction<T> = (theme: Theme) => T;

/**
 * Variant prop helper for components with multiple visual variants.
 */
export type VariantProps<T extends string> = {
  readonly variant?: T;
};

/**
 * Size prop helper for components with multiple sizes.
 */
export type SizeProps<T extends string = 'sm' | 'md' | 'lg'> = {
  readonly size?: T;
};

// =============================================================================
// COLOR UTILITIES
// =============================================================================

/**
 * Color path type for accessing nested color tokens.
 * Enables type-safe color access like 'background.primary'.
 */
export type ColorPath = {
  [K in keyof ColorTokens]: ColorTokens[K] extends string
    ? K
    : `${K}.${keyof ColorTokens[K] & string}`;
}[keyof ColorTokens];

/**
 * Semantic color names for quick access.
 */
export type SemanticColor = keyof ColorTokens['semantic'];

/**
 * System color names.
 */
export type SystemColor = keyof ColorTokens['system'];

// =============================================================================
// RESPONSIVE HELPERS
// =============================================================================

/**
 * Breakpoint keys for responsive design.
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Responsive value type allowing different values at breakpoints.
 */
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

/**
 * Responsive style object.
 */
export type ResponsiveStyle<T> = {
  [P in keyof T]?: ResponsiveValue<T[P]>;
};
