/**
 * AugustDesignSystem - Shadow/Elevation Tokens
 *
 * Shadow definitions following Apple's depth philosophy.
 * Shadows create visual hierarchy and help users understand
 * the spatial relationship between elements.
 *
 * iOS uses subtle, soft shadows compared to Material Design.
 * The shadows here are calibrated for iOS-style depth perception.
 */

import type { ShadowTokens, ShadowStyle } from '../types';

// =============================================================================
// SHADOW COLORS
// =============================================================================

/**
 * Shadow colors for light and dark modes.
 * iOS shadows are typically black with low opacity.
 */
export const shadowColors = {
  light: 'rgba(0, 0, 0, 1)', // Opacity controlled per shadow
  dark: 'rgba(0, 0, 0, 1)', // Deeper shadows in dark mode
} as const;

// =============================================================================
// LIGHT MODE SHADOWS
// =============================================================================

/**
 * Shadow tokens for light mode.
 *
 * iOS shadow characteristics:
 * - Subtle and soft (low opacity, larger blur)
 * - Y-offset typically larger than X-offset
 * - Creates sense of floating without heavy contrast
 *
 * Note: React Native shadow properties:
 * - shadowColor: Color of the shadow
 * - shadowOffset: { width, height } displacement
 * - shadowOpacity: Opacity multiplier (0-1)
 * - shadowRadius: Blur radius
 * - elevation: Android-only, creates Material-style shadow
 */
export const lightShadows: ShadowTokens = {
  /**
   * No shadow.
   */
  none: {
    shadowColor: shadowColors.light,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  /**
   * Extra small shadow - subtle lift.
   * Use for: Subtle hover states, pressed buttons.
   */
  xs: {
    shadowColor: shadowColors.light,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },

  /**
   * Small shadow - light elevation.
   * Use for: Cards, list items, buttons.
   */
  sm: {
    shadowColor: shadowColors.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  /**
   * Medium shadow - standard elevation.
   * Use for: Dropdown menus, popovers, floating action buttons.
   */
  md: {
    shadowColor: shadowColors.light,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },

  /**
   * Large shadow - prominent elevation.
   * Use for: Modals, dialogs, navigation overlays.
   */
  lg: {
    shadowColor: shadowColors.light,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },

  /**
   * Extra large shadow - high elevation.
   * Use for: Bottom sheets, side panels.
   */
  xl: {
    shadowColor: shadowColors.light,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
  },

  /**
   * XXL shadow - maximum elevation.
   * Use for: Full-screen overlays, critical modals.
   */
  xxl: {
    shadowColor: shadowColors.light,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.22,
    shadowRadius: 32,
    elevation: 16,
  },
};

// =============================================================================
// DARK MODE SHADOWS
// =============================================================================

/**
 * Shadow tokens for dark mode.
 *
 * In dark mode, shadows need to be more subtle as they're less
 * visible against dark backgrounds. iOS relies more on elevation
 * (lighter backgrounds) than shadows in dark mode.
 */
export const darkShadows: ShadowTokens = {
  none: {
    shadowColor: shadowColors.dark,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  xs: {
    shadowColor: shadowColors.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },

  sm: {
    shadowColor: shadowColors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },

  md: {
    shadowColor: shadowColors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  lg: {
    shadowColor: shadowColors.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },

  xl: {
    shadowColor: shadowColors.dark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },

  xxl: {
    shadowColor: shadowColors.dark,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.45,
    shadowRadius: 32,
    elevation: 16,
  },
};

// =============================================================================
// SEMANTIC SHADOWS
// =============================================================================

/**
 * Semantic shadow aliases for specific components.
 */
export const semanticShadows = {
  /**
   * Card shadow.
   */
  card: lightShadows.sm,

  /**
   * Button shadow (when elevated).
   */
  button: lightShadows.xs,

  /**
   * Pressed button shadow (reduced).
   */
  buttonPressed: lightShadows.none,

  /**
   * Floating action button shadow.
   */
  fab: lightShadows.md,

  /**
   * Dropdown/Popover shadow.
   */
  dropdown: lightShadows.md,

  /**
   * Modal/Dialog shadow.
   */
  modal: lightShadows.lg,

  /**
   * Bottom sheet shadow.
   */
  sheet: lightShadows.xl,

  /**
   * Toast notification shadow.
   */
  toast: lightShadows.md,

  /**
   * Navigation header shadow.
   */
  header: lightShadows.xs,

  /**
   * Tab bar shadow.
   */
  tabBar: lightShadows.xs,
} as const;

// =============================================================================
// SHADOW UTILITIES
// =============================================================================

/**
 * Creates a custom shadow style.
 */
export function createShadow(
  offsetY: number,
  opacity: number,
  radius: number,
  elevation: number,
  offsetX: number = 0,
  color: string = shadowColors.light
): ShadowStyle {
  return {
    shadowColor: color,
    shadowOffset: { width: offsetX, height: offsetY },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation,
  };
}

/**
 * Combines multiple shadows (layered shadow effect).
 * Note: React Native doesn't support multiple shadows natively.
 * This returns the most prominent shadow.
 */
export function combineShadows(...shadows: ShadowStyle[]): ShadowStyle {
  if (shadows.length === 0) return lightShadows.none;
  // Return the shadow with highest elevation
  return shadows.reduce((prev, current) =>
    current.elevation > prev.elevation ? current : prev
  );
}

/**
 * Scales a shadow by a factor.
 */
export function scaleShadow(shadow: ShadowStyle, factor: number): ShadowStyle {
  return {
    ...shadow,
    shadowOffset: {
      width: shadow.shadowOffset.width * factor,
      height: shadow.shadowOffset.height * factor,
    },
    shadowRadius: shadow.shadowRadius * factor,
    elevation: Math.round(shadow.elevation * factor),
  };
}

/**
 * Type for shadow token keys.
 */
export type ShadowKey = keyof ShadowTokens;

/**
 * Type for semantic shadow keys.
 */
export type SemanticShadowKey = keyof typeof semanticShadows;
