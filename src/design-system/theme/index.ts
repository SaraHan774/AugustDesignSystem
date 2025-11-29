/**
 * AugustDesignSystem - Theme Exports
 *
 * Central export point for theme system.
 */

// Default themes
export { lightTheme, darkTheme, defaultThemeConfig, getTheme } from './defaultTheme';

// Theme creation utilities
export {
  createTheme,
  createLightTheme,
  createDarkTheme,
  createBrandColors,
  createCustomTypography,
  mergeExtensions,
  isValidTheme,
  getTokenValue,
} from './createTheme';

// Theme context and provider
export {
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
} from './ThemeContext';
