/**
 * AugustDesignSystem - Border Radius Tokens
 *
 * Border radius scale following Apple's design language which uses
 * continuous corner curves (superellipse) rather than simple circular arcs.
 *
 * Note: React Native uses standard border radius. For true iOS continuous
 * corners, consider using react-native-masked-view or similar.
 */

import type { RadiusTokens } from '../types';

// =============================================================================
// RADIUS SCALE
// =============================================================================

/**
 * Border radius tokens.
 *
 * Apple's iOS uses these approximate radius values:
 * - Buttons: 8-10pt
 * - Cards: 12-14pt
 * - Modals/Sheets: 16-20pt
 * - Full corner radius: 9999 (pill shape)
 *
 * Scale:
 * - none: 0 - Sharp corners
 * - xs: 4 - Subtle rounding
 * - sm: 8 - Small elements, compact buttons
 * - md: 12 - Default cards, standard buttons
 * - lg: 16 - Large cards, modals
 * - xl: 20 - Sheets, large containers
 * - xxl: 24 - Extra large elements
 * - full: 9999 - Circular/pill shapes
 */
export const radius: RadiusTokens = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

// =============================================================================
// SEMANTIC RADIUS ALIASES
// =============================================================================

/**
 * Semantic radius values for specific use cases.
 * These provide meaningful names tied to components.
 */
export const semanticRadius = {
  /**
   * Button corner radius (matches iOS default).
   */
  button: radius.sm,

  /**
   * Small button corner radius.
   */
  buttonSmall: radius.xs,

  /**
   * Card corner radius.
   */
  card: radius.md,

  /**
   * Input field corner radius.
   */
  input: radius.sm,

  /**
   * Modal/Dialog corner radius.
   */
  modal: radius.lg,

  /**
   * Bottom sheet corner radius.
   */
  sheet: radius.xl,

  /**
   * Image thumbnail radius.
   */
  thumbnail: radius.sm,

  /**
   * Avatar (circular) radius.
   */
  avatar: radius.full,

  /**
   * Badge/Chip radius.
   */
  badge: radius.full,

  /**
   * Pill button radius.
   */
  pill: radius.full,

  /**
   * Tag/Label radius.
   */
  tag: radius.xs,

  /**
   * Toast notification radius.
   */
  toast: radius.md,

  /**
   * Tooltip radius.
   */
  tooltip: radius.sm,

  /**
   * Popover radius.
   */
  popover: radius.md,

  /**
   * Search bar radius.
   */
  searchBar: radius.sm,

  /**
   * Segment control radius.
   */
  segmentControl: radius.sm,

  /**
   * Slider track radius.
   */
  slider: radius.full,

  /**
   * Progress bar radius.
   */
  progressBar: radius.full,
} as const;

// =============================================================================
// RADIUS UTILITIES
// =============================================================================

/**
 * Creates a circular radius based on size (for avatars, icons).
 * @param size - The size of the element (width/height)
 */
export function circular(size: number): number {
  return size / 2;
}

/**
 * Creates corner-specific radius object.
 */
export function corners(
  topLeft: number,
  topRight: number,
  bottomRight: number,
  bottomLeft: number
) {
  return {
    borderTopLeftRadius: topLeft,
    borderTopRightRadius: topRight,
    borderBottomRightRadius: bottomRight,
    borderBottomLeftRadius: bottomLeft,
  };
}

/**
 * Creates top-only rounded corners (for sheets, cards attached to bottom).
 */
export function topRounded(value: number) {
  return corners(value, value, 0, 0);
}

/**
 * Creates bottom-only rounded corners (for cards attached to top).
 */
export function bottomRounded(value: number) {
  return corners(0, 0, value, value);
}

/**
 * Creates left-only rounded corners.
 */
export function leftRounded(value: number) {
  return corners(value, 0, 0, value);
}

/**
 * Creates right-only rounded corners.
 */
export function rightRounded(value: number) {
  return corners(0, value, value, 0);
}

/**
 * Type for radius token keys.
 */
export type RadiusKey = keyof RadiusTokens;

/**
 * Type for semantic radius keys.
 */
export type SemanticRadiusKey = keyof typeof semanticRadius;
