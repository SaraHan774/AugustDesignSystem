/**
 * AugustDesignSystem - Default Theme
 *
 * Complete theme definitions for light and dark modes.
 * This file assembles all tokens into cohesive theme objects.
 */

import type { Theme, ThemeConfig } from '../types';
import { lightColors, darkColors } from '../tokens/colors';
import { typography, fontFamily } from '../tokens/typography';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { lightShadows, darkShadows } from '../tokens/shadows';
import { animation } from '../tokens/animation';
import { sizes, zIndex, breakpoints, opacity } from '../tokens/sizes';

// =============================================================================
// LIGHT THEME
// =============================================================================

/**
 * Default light theme.
 * Primary theme for standard iOS appearance.
 */
export const lightTheme: Theme = {
  name: 'August Light',
  mode: 'light',
  colors: lightColors,
  typography,
  fontFamily,
  spacing,
  radius,
  shadows: lightShadows,
  animation,
  sizes,
  zIndex,
  breakpoints,
  opacity,
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Default dark theme.
 * Dark mode appearance following iOS dark mode conventions.
 */
export const darkTheme: Theme = {
  name: 'August Dark',
  mode: 'dark',
  colors: darkColors,
  typography,
  fontFamily,
  spacing,
  radius,
  shadows: darkShadows,
  animation,
  sizes,
  zIndex,
  breakpoints,
  opacity,
};

// =============================================================================
// THEME CONFIG
// =============================================================================

/**
 * Complete theme configuration containing both modes.
 */
export const defaultThemeConfig: ThemeConfig = {
  light: lightTheme,
  dark: darkTheme,
};

// =============================================================================
// THEME FACTORY
// =============================================================================

/**
 * Creates a theme by selecting the appropriate mode.
 * @param mode - Color mode to use
 */
export function getTheme(mode: 'light' | 'dark'): Theme {
  return mode === 'dark' ? darkTheme : lightTheme;
}
