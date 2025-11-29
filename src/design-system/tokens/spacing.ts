/**
 * AugustDesignSystem - Spacing Tokens
 *
 * Spacing scale based on a 4pt grid system, aligned with Apple's
 * Human Interface Guidelines which typically uses 8pt as the base unit.
 *
 * The 4pt base allows for finer control while maintaining consistency
 * with iOS design patterns.
 */

import type { SpacingTokens } from '../types';

// =============================================================================
// BASE SPACING UNIT
// =============================================================================

/**
 * Base spacing unit (4pt).
 * All spacing values are multiples of this unit.
 */
export const SPACING_UNIT = 4;

// =============================================================================
// SPACING SCALE
// =============================================================================

/**
 * Complete spacing token set.
 *
 * Scale progression:
 * - none: 0
 * - xxs: 2 (0.5x)
 * - xs: 4 (1x)
 * - sm: 8 (2x)
 * - md: 12 (3x)
 * - lg: 16 (4x) - Standard iOS margin
 * - xl: 20 (5x)
 * - xxl: 24 (6x)
 * - xxxl: 32 (8x)
 * - xxxxl: 40 (10x)
 * - xxxxxl: 48 (12x)
 */
export const spacing: SpacingTokens = {
  // Base scale
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
  xxxxxl: 48,

  // Semantic spacing - Inset (padding)
  // Used for content padding inside containers
  inset: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16, // Standard content inset
    xl: 20,
  },

  // Semantic spacing - Stack (vertical)
  // Used for vertical spacing between elements
  stack: {
    none: 0,
    xs: 4,
    sm: 8, // Tight grouping
    md: 12,
    lg: 16, // Standard section spacing
    xl: 24, // Large section spacing
  },

  // Semantic spacing - Inline (horizontal)
  // Used for horizontal spacing between elements
  inline: {
    none: 0,
    xs: 4,
    sm: 8, // Icon to text spacing
    md: 12,
    lg: 16, // Standard element spacing
    xl: 24,
  },
};

// =============================================================================
// LAYOUT CONSTANTS
// =============================================================================

/**
 * Standard iOS layout constants.
 * These are commonly used values throughout iOS design.
 */
export const layoutConstants = {
  /**
   * Standard horizontal margin for content.
   * iOS typically uses 16pt margins.
   */
  screenHorizontalPadding: 16,

  /**
   * Standard vertical margin for content.
   */
  screenVerticalPadding: 16,

  /**
   * Navigation bar height (standard).
   */
  navigationBarHeight: 44,

  /**
   * Navigation bar height (large title).
   */
  navigationBarLargeTitleHeight: 96,

  /**
   * Tab bar height.
   */
  tabBarHeight: 49,

  /**
   * Tab bar height with home indicator (iPhone X+).
   */
  tabBarHeightWithHomeIndicator: 83,

  /**
   * Minimum touch target size (Apple HIG requirement).
   * All interactive elements should be at least 44x44pt.
   */
  minTouchTarget: 44,

  /**
   * Standard list item height.
   */
  listItemHeight: 44,

  /**
   * Standard list item height (subtitle style).
   */
  listItemSubtitleHeight: 64,

  /**
   * Standard search bar height.
   */
  searchBarHeight: 36,

  /**
   * Standard toolbar height.
   */
  toolbarHeight: 44,

  /**
   * Standard separator thickness.
   */
  separatorThickness: 0.5,

  /**
   * Standard icon size in lists.
   */
  listIconSize: 28,

  /**
   * Disclosure indicator width.
   */
  disclosureIndicatorWidth: 8,

  /**
   * Standard button corner radius.
   */
  buttonCornerRadius: 10,

  /**
   * Standard card corner radius.
   */
  cardCornerRadius: 12,

  /**
   * Sheet corner radius.
   */
  sheetCornerRadius: 16,
} as const;

// =============================================================================
// SPACING UTILITIES
// =============================================================================

/**
 * Creates spacing value from multiple of base unit.
 * @param multiplier - Number to multiply base unit by
 */
export function space(multiplier: number): number {
  return SPACING_UNIT * multiplier;
}

/**
 * Creates equal spacing object for all sides.
 * @param value - Spacing value
 */
export function insetAll(value: number) {
  return {
    padding: value,
  };
}

/**
 * Creates horizontal/vertical spacing object.
 * @param horizontal - Horizontal spacing
 * @param vertical - Vertical spacing
 */
export function insetSquish(horizontal: number, vertical: number) {
  return {
    paddingHorizontal: horizontal,
    paddingVertical: vertical,
  };
}

/**
 * Creates directional spacing object.
 * @param top - Top spacing
 * @param right - Right spacing
 * @param bottom - Bottom spacing
 * @param left - Left spacing
 */
export function insetDirectional(
  top: number,
  right: number,
  bottom: number,
  left: number
) {
  return {
    paddingTop: top,
    paddingRight: right,
    paddingBottom: bottom,
    paddingLeft: left,
  };
}

/**
 * Type for spacing token keys.
 */
export type SpacingKey = keyof Omit<SpacingTokens, 'inset' | 'stack' | 'inline'>;

/**
 * Type for semantic spacing keys.
 */
export type SemanticSpacingKey = keyof SpacingTokens['inset'];
