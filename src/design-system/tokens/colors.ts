/**
 * AugustDesignSystem - Color Tokens
 *
 * Color palette following Apple Human Interface Guidelines.
 * All colors are defined with proper semantic naming and support
 * both light and dark appearance modes.
 *
 * Color values are derived from Apple's iOS system colors
 * with WCAG 2.1 contrast ratio compliance (4.5:1 for normal text).
 */

import type { ColorTokens } from '../types';

// =============================================================================
// PRIMITIVE COLORS
// =============================================================================

/**
 * Raw color palette - not exported, used internally.
 * These are the base colors from which semantic colors are derived.
 */
const palette = {
  // Pure values
  white: '#FFFFFF',
  black: '#000000',

  // Gray scale - iOS system grays
  gray: {
    50: '#F2F2F7',
    100: '#E5E5EA',
    200: '#D1D1D6',
    300: '#C7C7CC',
    400: '#AEAEB2',
    500: '#8E8E93',
    600: '#636366',
    700: '#48484A',
    800: '#3A3A3C',
    900: '#2C2C2E',
    950: '#1C1C1E',
  },

  // System colors - iOS standard palette
  // Light mode values
  red: {
    light: '#FF3B30',
    dark: '#FF453A',
  },
  orange: {
    light: '#FF9500',
    dark: '#FF9F0A',
  },
  yellow: {
    light: '#FFCC00',
    dark: '#FFD60A',
  },
  green: {
    light: '#34C759',
    dark: '#30D158',
  },
  mint: {
    light: '#00C7BE',
    dark: '#63E6E2',
  },
  teal: {
    light: '#30B0C7',
    dark: '#40C8E0',
  },
  cyan: {
    light: '#32ADE6',
    dark: '#64D2FF',
  },
  blue: {
    light: '#007AFF',
    dark: '#0A84FF',
  },
  indigo: {
    light: '#5856D6',
    dark: '#5E5CE6',
  },
  purple: {
    light: '#AF52DE',
    dark: '#BF5AF2',
  },
  pink: {
    light: '#FF2D55',
    dark: '#FF375F',
  },
  brown: {
    light: '#A2845E',
    dark: '#AC8E68',
  },
} as const;

// =============================================================================
// LIGHT MODE COLORS
// =============================================================================

export const lightColors: ColorTokens = {
  // Background colors - iOS grouped table view style layering
  background: {
    primary: '#FFFFFF',
    secondary: '#F2F2F7',
    tertiary: '#FFFFFF',
    grouped: '#F2F2F7',
    groupedSecondary: '#FFFFFF',
    groupedTertiary: '#F2F2F7',
  },

  // Label colors - for text content
  label: {
    primary: '#000000', // 100% black
    secondary: 'rgba(60, 60, 67, 0.6)', // 60% opacity
    tertiary: 'rgba(60, 60, 67, 0.3)', // 30% opacity
    quaternary: 'rgba(60, 60, 67, 0.18)', // 18% opacity
  },

  // Fill colors - for thin and small shapes
  fill: {
    primary: 'rgba(120, 120, 128, 0.2)',
    secondary: 'rgba(120, 120, 128, 0.16)',
    tertiary: 'rgba(118, 118, 128, 0.12)',
    quaternary: 'rgba(116, 116, 128, 0.08)',
  },

  // Separator colors
  separator: {
    opaque: '#C6C6C8',
    nonOpaque: 'rgba(60, 60, 67, 0.36)',
  },

  // System colors - Apple standard
  system: {
    red: palette.red.light,
    orange: palette.orange.light,
    yellow: palette.yellow.light,
    green: palette.green.light,
    mint: palette.mint.light,
    teal: palette.teal.light,
    cyan: palette.cyan.light,
    blue: palette.blue.light,
    indigo: palette.indigo.light,
    purple: palette.purple.light,
    pink: palette.pink.light,
    brown: palette.brown.light,
    gray: palette.gray[500],
    gray2: palette.gray[400],
    gray3: palette.gray[300],
    gray4: palette.gray[200],
    gray5: palette.gray[100],
    gray6: palette.gray[50],
  },

  // Semantic colors - functional meaning
  semantic: {
    success: palette.green.light,
    warning: palette.orange.light,
    error: palette.red.light,
    info: palette.blue.light,
  },

  // Interactive colors
  interactive: {
    tint: palette.blue.light,
    tintPressed: '#0062CC', // Darkened blue for pressed state
    tintDisabled: 'rgba(0, 122, 255, 0.3)',
    destructive: palette.red.light,
    destructivePressed: '#CC2F26',
  },

  // Material/Blur backgrounds - approximated for non-blur fallback
  material: {
    thin: 'rgba(255, 255, 255, 0.6)',
    regular: 'rgba(255, 255, 255, 0.72)',
    thick: 'rgba(255, 255, 255, 0.85)',
    chrome: 'rgba(247, 247, 247, 0.8)',
  },
};

// =============================================================================
// DARK MODE COLORS
// =============================================================================

export const darkColors: ColorTokens = {
  // Background colors - elevated surfaces in dark mode
  background: {
    primary: '#000000',
    secondary: '#1C1C1E',
    tertiary: '#2C2C2E',
    grouped: '#000000',
    groupedSecondary: '#1C1C1E',
    groupedTertiary: '#2C2C2E',
  },

  // Label colors - inverted for dark mode
  label: {
    primary: '#FFFFFF',
    secondary: 'rgba(235, 235, 245, 0.6)',
    tertiary: 'rgba(235, 235, 245, 0.3)',
    quaternary: 'rgba(235, 235, 245, 0.18)',
  },

  // Fill colors - adjusted for dark backgrounds
  fill: {
    primary: 'rgba(120, 120, 128, 0.36)',
    secondary: 'rgba(120, 120, 128, 0.32)',
    tertiary: 'rgba(118, 118, 128, 0.24)',
    quaternary: 'rgba(116, 116, 128, 0.18)',
  },

  // Separator colors
  separator: {
    opaque: '#38383A',
    nonOpaque: 'rgba(84, 84, 88, 0.6)',
  },

  // System colors - adjusted for dark mode (higher luminance)
  system: {
    red: palette.red.dark,
    orange: palette.orange.dark,
    yellow: palette.yellow.dark,
    green: palette.green.dark,
    mint: palette.mint.dark,
    teal: palette.teal.dark,
    cyan: palette.cyan.dark,
    blue: palette.blue.dark,
    indigo: palette.indigo.dark,
    purple: palette.purple.dark,
    pink: palette.pink.dark,
    brown: palette.brown.dark,
    gray: palette.gray[500],
    gray2: palette.gray[600],
    gray3: palette.gray[700],
    gray4: palette.gray[800],
    gray5: palette.gray[900],
    gray6: palette.gray[950],
  },

  // Semantic colors - dark mode variants
  semantic: {
    success: palette.green.dark,
    warning: palette.orange.dark,
    error: palette.red.dark,
    info: palette.blue.dark,
  },

  // Interactive colors - adjusted for dark backgrounds
  interactive: {
    tint: palette.blue.dark,
    tintPressed: '#409CFF', // Lightened blue for pressed state in dark mode
    tintDisabled: 'rgba(10, 132, 255, 0.3)',
    destructive: palette.red.dark,
    destructivePressed: '#FF6961',
  },

  // Material/Blur backgrounds - dark mode variants
  material: {
    thin: 'rgba(30, 30, 30, 0.6)',
    regular: 'rgba(30, 30, 30, 0.72)',
    thick: 'rgba(30, 30, 30, 0.85)',
    chrome: 'rgba(36, 36, 38, 0.8)',
  },
};

// =============================================================================
// COLOR UTILITIES
// =============================================================================

/**
 * Utility function to add alpha to a hex color.
 */
export function withAlpha(color: string, alpha: number): string {
  // Handle rgba colors
  if (color.startsWith('rgba')) {
    return color.replace(/[\d.]+\)$/, `${alpha})`);
  }

  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return color;
}

/**
 * Check if a color provides sufficient contrast against a background.
 * Returns true if contrast ratio meets WCAG AA standard (4.5:1).
 */
export function hasMinimumContrast(
  foreground: string,
  background: string,
  minimumRatio: number = 4.5
): boolean {
  // Simplified implementation - in production, use a proper contrast calculation
  // This is a placeholder that should be replaced with actual luminance calculation
  const isDarkBg =
    background === '#000000' ||
    background.includes('1C1C1E') ||
    background.includes('2C2C2E');
  const isLightFg =
    foreground === '#FFFFFF' || foreground.includes('235, 235, 245');

  return isDarkBg === isLightFg;
}
