/**
 * AugustDesignSystem - Theme Context
 *
 * React Context for providing theme throughout the component tree.
 * Supports light/dark mode switching and system preference detection.
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import type {
  Theme,
  ThemeContextValue,
  ThemeProviderProps,
  ColorMode,
  ColorModePreference,
} from '../types';
import { lightTheme, darkTheme } from './defaultTheme';
import { createLightTheme, createDarkTheme } from './createTheme';

// =============================================================================
// CONTEXT CREATION
// =============================================================================

/**
 * Default context value (light theme).
 * Used when ThemeProvider is not present in the tree.
 */
const defaultContextValue: ThemeContextValue = {
  theme: lightTheme,
  colorMode: 'light',
  colorModePreference: 'system',
  toggleColorMode: () => {
    console.warn('ThemeProvider not found in component tree');
  },
  setColorMode: () => {
    console.warn('ThemeProvider not found in component tree');
  },
  isDark: false,
  isLight: true,
};

/**
 * Theme context for providing theme values to components.
 */
export const ThemeContext = createContext<ThemeContextValue>(defaultContextValue);

// =============================================================================
// THEME PROVIDER
// =============================================================================

/**
 * ThemeProvider component that manages theme state and provides it to children.
 *
 * Features:
 * - Automatic system color scheme detection
 * - Light/dark mode toggle
 * - Custom theme extension support
 * - Memoized theme object for performance
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 *
 * // With custom theme
 * <ThemeProvider
 *   defaultColorMode="dark"
 *   theme={{
 *     name: 'Brand',
 *     light: { colors: { interactive: { tint: '#FF6B00' } } },
 *     dark: { colors: { interactive: { tint: '#FF8533' } } },
 *   }}
 * >
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultColorMode = 'system',
  theme: customTheme,
  storageKey = 'august-color-mode',
}: ThemeProviderProps): React.ReactElement {
  // Get system color scheme
  const systemColorScheme = useColorScheme();

  // User preference state
  const [colorModePreference, setColorModePreference] =
    useState<ColorModePreference>(defaultColorMode);

  // Determine actual color mode
  const colorMode: ColorMode = useMemo(() => {
    if (colorModePreference === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return colorModePreference;
  }, [colorModePreference, systemColorScheme]);

  // Build theme objects (with custom extensions if provided)
  const themes = useMemo(() => {
    if (customTheme) {
      return {
        light: createLightTheme(
          customTheme.name ? `${customTheme.name} Light` : 'Custom Light',
          customTheme.light
        ),
        dark: createDarkTheme(
          customTheme.name ? `${customTheme.name} Dark` : 'Custom Dark',
          customTheme.dark
        ),
      };
    }
    return {
      light: lightTheme,
      dark: darkTheme,
    };
  }, [customTheme]);

  // Select current theme based on mode
  const currentTheme: Theme = useMemo(() => {
    return colorMode === 'dark' ? themes.dark : themes.light;
  }, [colorMode, themes]);

  // Toggle between light and dark
  const toggleColorMode = useCallback(() => {
    setColorModePreference((prev) => {
      if (prev === 'system') {
        // If on system, toggle to opposite of current
        return colorMode === 'dark' ? 'light' : 'dark';
      }
      return prev === 'dark' ? 'light' : 'dark';
    });
  }, [colorMode]);

  // Set specific color mode
  const setColorMode = useCallback((mode: ColorModePreference) => {
    setColorModePreference(mode);
  }, []);

  // Context value
  const contextValue: ThemeContextValue = useMemo(
    () => ({
      theme: currentTheme,
      colorMode,
      colorModePreference,
      toggleColorMode,
      setColorMode,
      isDark: colorMode === 'dark',
      isLight: colorMode === 'light',
    }),
    [
      currentTheme,
      colorMode,
      colorModePreference,
      toggleColorMode,
      setColorMode,
    ]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// =============================================================================
// HOOKS
// =============================================================================

/**
 * Hook to access the current theme context.
 *
 * @returns Theme context value including theme object and mode controls
 * @throws Warning if used outside ThemeProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, isDark, toggleColorMode } = useTheme();
 *
 *   return (
 *     <View style={{ backgroundColor: theme.colors.background.primary }}>
 *       <Text style={{ color: theme.colors.label.primary }}>
 *         Current mode: {isDark ? 'Dark' : 'Light'}
 *       </Text>
 *       <Button title="Toggle" onPress={toggleColorMode} />
 *     </View>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === defaultContextValue) {
    console.warn(
      'useTheme must be used within a ThemeProvider. ' +
        'Falling back to default light theme.'
    );
  }

  return context;
}

/**
 * Hook to access only the theme object (without mode controls).
 * Useful when you only need token values.
 *
 * @returns Current theme object
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const theme = useThemeTokens();
 *
 *   return (
 *     <View style={{
 *       backgroundColor: theme.colors.background.primary,
 *       padding: theme.spacing.lg,
 *     }}>
 *       <Text style={theme.typography.body}>Hello</Text>
 *     </View>
 *   );
 * }
 * ```
 */
export function useThemeTokens(): Theme {
  const { theme } = useTheme();
  return theme;
}

/**
 * Hook to access the current color mode.
 *
 * @returns Current color mode ('light' | 'dark')
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const colorMode = useColorMode();
 *   const Icon = colorMode === 'dark' ? MoonIcon : SunIcon;
 *   return <Icon />;
 * }
 * ```
 */
export function useColorMode(): ColorMode {
  const { colorMode } = useTheme();
  return colorMode;
}

/**
 * Hook that returns true if current mode is dark.
 *
 * @returns Boolean indicating dark mode
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isDark = useIsDarkMode();
 *   return <Text>{isDark ? 'Dark mode active' : 'Light mode active'}</Text>;
 * }
 * ```
 */
export function useIsDarkMode(): boolean {
  const { isDark } = useTheme();
  return isDark;
}

// =============================================================================
// UTILITY HOOKS
// =============================================================================

/**
 * Hook to get a specific token value from the current theme.
 *
 * @param selector - Function to select token from theme
 * @returns Selected token value
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const primaryBg = useToken(t => t.colors.background.primary);
 *   const bodyStyle = useToken(t => t.typography.body);
 *
 *   return (
 *     <View style={{ backgroundColor: primaryBg }}>
 *       <Text style={bodyStyle}>Hello</Text>
 *     </View>
 *   );
 * }
 * ```
 */
export function useToken<T>(selector: (theme: Theme) => T): T {
  const { theme } = useTheme();
  return useMemo(() => selector(theme), [theme, selector]);
}

/**
 * Hook to get color tokens from the current theme.
 *
 * @returns Color tokens object
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const colors = useColors();
 *   return (
 *     <View style={{ backgroundColor: colors.background.primary }}>
 *       <Text style={{ color: colors.label.primary }}>Hello</Text>
 *     </View>
 *   );
 * }
 * ```
 */
export function useColors() {
  const { theme } = useTheme();
  return theme.colors;
}

/**
 * Hook to get spacing tokens from the current theme.
 *
 * @returns Spacing tokens object
 */
export function useSpacing() {
  const { theme } = useTheme();
  return theme.spacing;
}

/**
 * Hook to get typography tokens from the current theme.
 *
 * @returns Typography tokens object
 */
export function useTypography() {
  const { theme } = useTheme();
  return theme.typography;
}
