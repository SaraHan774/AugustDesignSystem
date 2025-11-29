/**
 * AugustDesignSystem - Theme Creation Utilities
 *
 * Functions for creating custom themes by extending the default theme.
 * Supports deep merging of partial theme overrides.
 */

import type {
  Theme,
  ThemeConfig,
  ThemeExtension,
  CustomThemeConfig,
  DeepPartial,
} from '../types';
import { lightTheme, darkTheme } from './defaultTheme';

// =============================================================================
// DEEP MERGE UTILITY
// =============================================================================

/**
 * Type guard to check if value is a plain object.
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

/**
 * Deep merges two objects, with source overriding target.
 * Arrays and non-objects are replaced entirely.
 */
function deepMerge<T>(target: T, source: DeepPartial<T>): T {
  if (!isPlainObject(target) || !isPlainObject(source)) {
    return (source ?? target) as T;
  }

  const output = { ...target } as Record<string, unknown>;
  const sourceObj = source as Record<string, unknown>;
  const targetObj = target as Record<string, unknown>;

  for (const key in sourceObj) {
    if (Object.prototype.hasOwnProperty.call(sourceObj, key)) {
      const sourceValue = sourceObj[key];
      const targetValue = targetObj[key];

      if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
        output[key] = deepMerge(targetValue, sourceValue);
      } else if (sourceValue !== undefined) {
        output[key] = sourceValue;
      }
    }
  }

  return output as T;
}

// =============================================================================
// THEME CREATION
// =============================================================================

/**
 * Creates a custom theme by extending the default light theme.
 *
 * @param name - Name identifier for the theme
 * @param extension - Partial theme overrides
 * @returns Complete theme with overrides applied
 *
 * @example
 * ```typescript
 * const brandTheme = createLightTheme('Brand Light', {
 *   colors: {
 *     interactive: {
 *       tint: '#FF6B00',
 *     },
 *   },
 * });
 * ```
 */
export function createLightTheme(
  name: string,
  extension: ThemeExtension = {}
): Theme {
  const baseTheme = { ...lightTheme, name };
  return deepMerge(baseTheme, extension as DeepPartial<Theme>);
}

/**
 * Creates a custom dark theme by extending the default dark theme.
 *
 * @param name - Name identifier for the theme
 * @param extension - Partial theme overrides
 * @returns Complete theme with overrides applied
 *
 * @example
 * ```typescript
 * const brandDarkTheme = createDarkTheme('Brand Dark', {
 *   colors: {
 *     interactive: {
 *       tint: '#FF8533',
 *     },
 *   },
 * });
 * ```
 */
export function createDarkTheme(
  name: string,
  extension: ThemeExtension = {}
): Theme {
  const baseTheme = { ...darkTheme, name };
  return deepMerge(baseTheme, extension as DeepPartial<Theme>);
}

/**
 * Creates a complete theme configuration with both light and dark modes.
 *
 * @param config - Custom theme configuration
 * @returns Complete theme config with both modes
 *
 * @example
 * ```typescript
 * const brandTheme = createTheme({
 *   name: 'Brand',
 *   light: {
 *     colors: {
 *       interactive: { tint: '#FF6B00' },
 *     },
 *   },
 *   dark: {
 *     colors: {
 *       interactive: { tint: '#FF8533' },
 *     },
 *   },
 * });
 * ```
 */
export function createTheme(config: CustomThemeConfig): ThemeConfig {
  return {
    light: createLightTheme(`${config.name} Light`, config.light),
    dark: createDarkTheme(`${config.name} Dark`, config.dark),
  };
}

// =============================================================================
// THEME EXTENSION HELPERS
// =============================================================================

/**
 * Creates color overrides for a theme.
 * Useful for applying brand colors consistently.
 *
 * @param primary - Primary brand color
 * @param options - Additional color options
 */
export function createBrandColors(
  primary: string,
  options: {
    primaryPressed?: string;
    primaryDisabled?: string;
    secondary?: string;
  } = {}
): ThemeExtension {
  return {
    colors: {
      interactive: {
        tint: primary,
        tintPressed: options.primaryPressed ?? primary,
        tintDisabled: options.primaryDisabled ?? `${primary}4D`, // 30% opacity
      },
    },
  };
}

/**
 * Creates typography overrides for a theme.
 * Useful for applying custom fonts.
 *
 * @param fontFamilies - Font family overrides
 */
export function createCustomTypography(fontFamilies: {
  regular?: string;
  medium?: string;
  semibold?: string;
  bold?: string;
}): ThemeExtension {
  return {
    fontFamily: {
      regular: fontFamilies.regular ?? 'System',
      medium: fontFamilies.medium ?? 'System',
      semibold: fontFamilies.semibold ?? 'System',
      bold: fontFamilies.bold ?? 'System',
      heavy: 'System',
      monospace: 'Menlo',
      rounded: 'System',
    },
  };
}

/**
 * Merges multiple theme extensions into one.
 *
 * @param extensions - Theme extensions to merge
 */
export function mergeExtensions(
  ...extensions: ThemeExtension[]
): ThemeExtension {
  return extensions.reduce(
    (acc, ext) => deepMerge(acc, ext),
    {} as ThemeExtension
  );
}

// =============================================================================
// THEME VALIDATION
// =============================================================================

/**
 * Validates that a theme object has all required properties.
 * Useful for runtime theme validation.
 *
 * @param theme - Theme object to validate
 * @returns True if theme is valid
 */
export function isValidTheme(theme: unknown): theme is Theme {
  if (!isPlainObject(theme)) return false;

  const requiredKeys: (keyof Theme)[] = [
    'name',
    'mode',
    'colors',
    'typography',
    'fontFamily',
    'spacing',
    'radius',
    'shadows',
    'animation',
    'sizes',
    'zIndex',
    'breakpoints',
    'opacity',
  ];

  return requiredKeys.every((key) => key in theme);
}

/**
 * Gets a specific token value from a theme using a path string.
 *
 * @param theme - Theme to extract from
 * @param path - Dot-notation path (e.g., 'colors.background.primary')
 * @returns Token value or undefined
 *
 * @example
 * ```typescript
 * const bgColor = getTokenValue(theme, 'colors.background.primary');
 * // Returns '#FFFFFF' for light theme
 * ```
 */
export function getTokenValue<T = unknown>(
  theme: Theme,
  path: string
): T | undefined {
  const keys = path.split('.');
  let current: unknown = theme;

  for (const key of keys) {
    if (!isPlainObject(current) || !(key in current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return current as T;
}
