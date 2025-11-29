/**
 * AugustDesignSystem - Utility Functions
 *
 * Helper utilities for working with the design system.
 */

import type { Theme, ColorTokens } from '../types';

// =============================================================================
// COLOR UTILITIES
// =============================================================================

/**
 * Converts a hex color to RGB values.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Converts RGB values to a hex color string.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

/**
 * Adds alpha transparency to a color.
 * @param color - Hex color or rgb string
 * @param alpha - Alpha value (0-1)
 */
export function withOpacity(color: string, alpha: number): string {
  if (color.startsWith('rgba')) {
    return color.replace(/[\d.]+\)$/, `${alpha})`);
  }

  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  }

  if (color.startsWith('#')) {
    const rgb = hexToRgb(color);
    if (rgb) {
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
    }
  }

  return color;
}

/**
 * Lightens a hex color by a percentage.
 * @param color - Hex color
 * @param percent - Percentage to lighten (0-100)
 */
export function lighten(color: string, percent: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;

  const factor = percent / 100;
  return rgbToHex(
    Math.min(255, rgb.r + (255 - rgb.r) * factor),
    Math.min(255, rgb.g + (255 - rgb.g) * factor),
    Math.min(255, rgb.b + (255 - rgb.b) * factor)
  );
}

/**
 * Darkens a hex color by a percentage.
 * @param color - Hex color
 * @param percent - Percentage to darken (0-100)
 */
export function darken(color: string, percent: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;

  const factor = 1 - percent / 100;
  return rgbToHex(rgb.r * factor, rgb.g * factor, rgb.b * factor);
}

// =============================================================================
// CONTRAST UTILITIES
// =============================================================================

/**
 * Calculates relative luminance of a color.
 * Used for WCAG contrast calculations.
 */
export function getLuminance(color: string): number {
  const rgb = hexToRgb(color);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((channel) => {
    const sRGB = channel / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculates contrast ratio between two colors.
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Checks if contrast ratio meets WCAG AA standard.
 * @param ratio - Contrast ratio
 * @param isLargeText - Whether text is large (18pt+ or 14pt+ bold)
 */
export function meetsWCAGAA(ratio: number, isLargeText: boolean = false): boolean {
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Checks if contrast ratio meets WCAG AAA standard.
 * @param ratio - Contrast ratio
 * @param isLargeText - Whether text is large
 */
export function meetsWCAGAAA(ratio: number, isLargeText: boolean = false): boolean {
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

// =============================================================================
// SPACING UTILITIES
// =============================================================================

/**
 * Creates a spacing value based on the 4pt grid.
 * @param multiplier - Grid multiplier
 */
export function gridSpace(multiplier: number): number {
  return multiplier * 4;
}

/**
 * Clamps a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// =============================================================================
// TOKEN ACCESS UTILITIES
// =============================================================================

/**
 * Safely gets a nested value from an object using dot notation.
 * @param obj - Object to traverse
 * @param path - Dot-separated path
 * @param defaultValue - Default if path not found
 */
export function get<T = unknown>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: T
): T {
  const keys = path.split('.');
  let result: unknown = obj;

  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue as T;
    }
    result = (result as Record<string, unknown>)[key];
  }

  return (result ?? defaultValue) as T;
}

/**
 * Gets a color token value from theme using path.
 * @param theme - Theme object
 * @param colorPath - Path like 'background.primary' or 'system.blue'
 */
export function getColor(theme: Theme, colorPath: string): string {
  return get<string>(theme.colors as unknown as Record<string, unknown>, colorPath, '');
}

// =============================================================================
// PLATFORM UTILITIES
// =============================================================================

import { Platform } from 'react-native';

/**
 * Returns iOS-specific value or fallback.
 */
export function ios<T>(iosValue: T, androidValue: T): T {
  return Platform.OS === 'ios' ? iosValue : androidValue;
}

/**
 * Returns Android-specific value or fallback.
 */
export function android<T>(androidValue: T, iosValue: T): T {
  return Platform.OS === 'android' ? androidValue : iosValue;
}

/**
 * Platform-specific value selector.
 */
export function platformSelect<T>(options: { ios?: T; android?: T; default: T }): T {
  if (Platform.OS === 'ios' && options.ios !== undefined) {
    return options.ios;
  }
  if (Platform.OS === 'android' && options.android !== undefined) {
    return options.android;
  }
  return options.default;
}

// =============================================================================
// STRING UTILITIES
// =============================================================================

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to kebab-case.
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

/**
 * Converts a string to camelCase.
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (c) => c.toLowerCase());
}
