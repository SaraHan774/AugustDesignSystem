/**
 * AugustDesignSystem - Size Tokens
 *
 * Sizing definitions following Apple Human Interface Guidelines.
 * Includes minimum touch target sizes (44pt per Apple HIG),
 * icon sizes, avatar sizes, and component dimensions.
 */

import type { SizeTokens, ZIndexTokens, BreakpointTokens, OpacityTokens } from '../types';

// =============================================================================
// SIZE TOKENS
// =============================================================================

/**
 * Size tokens for components and interactive elements.
 *
 * Apple HIG specifies 44pt minimum touch target for all
 * interactive elements. This ensures accessibility and
 * comfortable touch interaction.
 */
export const sizes: SizeTokens = {
  // Touch targets - Apple HIG minimum 44pt
  touchTarget: {
    /**
     * Minimum touch target size (44pt).
     * Required by Apple HIG for all interactive elements.
     */
    minimum: 44,

    /**
     * Comfortable touch target (48pt).
     * Recommended for frequently used actions.
     */
    comfortable: 48,

    /**
     * Spacious touch target (56pt).
     * For primary actions and accessibility.
     */
    spacious: 56,
  },

  // Icon sizes
  icon: {
    /**
     * Extra small icon (12pt).
     * Use for: Inline badges, tiny indicators.
     */
    xs: 12,

    /**
     * Small icon (16pt).
     * Use for: Inline text icons, compact UI.
     */
    sm: 16,

    /**
     * Medium icon (20pt).
     * Use for: Standard inline icons.
     */
    md: 20,

    /**
     * Large icon (24pt).
     * Use for: Navigation icons, tab bar icons.
     */
    lg: 24,

    /**
     * Extra large icon (32pt).
     * Use for: Featured icons, prominent actions.
     */
    xl: 32,

    /**
     * XXL icon (40pt).
     * Use for: Illustrations, large feature icons.
     */
    xxl: 40,
  },

  // Avatar sizes
  avatar: {
    /**
     * Extra small avatar (24pt).
     * Use for: Inline mentions, compact lists.
     */
    xs: 24,

    /**
     * Small avatar (32pt).
     * Use for: Comments, messaging.
     */
    sm: 32,

    /**
     * Medium avatar (40pt).
     * Use for: Standard list items.
     */
    md: 40,

    /**
     * Large avatar (56pt).
     * Use for: Profile cards, detailed lists.
     */
    lg: 56,

    /**
     * Extra large avatar (72pt).
     * Use for: Profile headers.
     */
    xl: 72,

    /**
     * XXL avatar (96pt).
     * Use for: Profile pages, settings.
     */
    xxl: 96,
  },

  // Button heights
  button: {
    /**
     * Small button (32pt).
     * Use for: Compact UI, inline actions.
     * Note: May not meet touch target minimum.
     */
    sm: 32,

    /**
     * Medium button (44pt) - DEFAULT.
     * Use for: Standard buttons.
     * Meets Apple HIG minimum touch target.
     */
    md: 44,

    /**
     * Large button (50pt).
     * Use for: Primary actions, CTAs.
     */
    lg: 50,

    /**
     * Extra large button (56pt).
     * Use for: Hero actions, onboarding.
     */
    xl: 56,
  },

  // Input heights
  input: {
    /**
     * Small input (36pt).
     * Use for: Compact forms, filters.
     */
    sm: 36,

    /**
     * Medium input (44pt) - DEFAULT.
     * Use for: Standard form inputs.
     * Meets Apple HIG minimum touch target.
     */
    md: 44,

    /**
     * Large input (52pt).
     * Use for: Search bars, prominent inputs.
     */
    lg: 52,
  },
};

// =============================================================================
// Z-INDEX TOKENS
// =============================================================================

/**
 * Z-index scale for layering elements.
 * Establishes consistent stacking order throughout the app.
 */
export const zIndex: ZIndexTokens = {
  /**
   * Base level - standard content.
   */
  base: 0,

  /**
   * Dropdown level - menus, selects.
   */
  dropdown: 1000,

  /**
   * Sticky level - headers, navigation.
   */
  sticky: 1100,

  /**
   * Overlay level - background overlays.
   */
  overlay: 1200,

  /**
   * Modal level - dialogs, sheets.
   */
  modal: 1300,

  /**
   * Popover level - tooltips, popovers.
   */
  popover: 1400,

  /**
   * Tooltip level - floating hints.
   */
  tooltip: 1500,

  /**
   * Toast level - notifications (highest).
   */
  toast: 1600,
};

// =============================================================================
// BREAKPOINT TOKENS
// =============================================================================

/**
 * Responsive breakpoints based on iOS device sizes.
 * Values represent minimum widths for each breakpoint.
 */
export const breakpoints: BreakpointTokens = {
  /**
   * Extra small - small phones.
   */
  xs: 0,

  /**
   * Small - standard phones (iPhone SE+).
   * iPhone SE: 375pt width.
   */
  sm: 375,

  /**
   * Medium - large phones (iPhone Pro Max).
   * iPhone Pro Max: 428pt width.
   */
  md: 428,

  /**
   * Large - small tablets (iPad Mini).
   * iPad Mini portrait: 744pt width.
   */
  lg: 744,

  /**
   * Extra large - large tablets (iPad Pro).
   * iPad Pro portrait: 1024pt width.
   */
  xl: 1024,
};

// =============================================================================
// OPACITY TOKENS
// =============================================================================

/**
 * Opacity values for various states and effects.
 */
export const opacity: OpacityTokens = {
  /**
   * Fully transparent.
   */
  transparent: 0,

  /**
   * Disabled state opacity.
   * iOS uses 0.3-0.4 for disabled elements.
   */
  disabled: 0.38,

  /**
   * Medium opacity - overlays, secondary elements.
   */
  medium: 0.6,

  /**
   * High opacity - emphasized content.
   */
  high: 0.87,

  /**
   * Fully opaque.
   */
  opaque: 1,
};

// =============================================================================
// COMPONENT-SPECIFIC SIZES
// =============================================================================

/**
 * Pre-configured sizes for specific components.
 */
export const componentSizes = {
  /**
   * Navigation bar heights.
   */
  navigationBar: {
    standard: 44,
    large: 96,
    largeExpanded: 140,
  },

  /**
   * Tab bar heights.
   */
  tabBar: {
    standard: 49,
    withHomeIndicator: 83,
  },

  /**
   * Search bar dimensions.
   */
  searchBar: {
    height: 36,
    iconSize: 18,
  },

  /**
   * Toolbar dimensions.
   */
  toolbar: {
    height: 44,
    iconSize: 24,
  },

  /**
   * Segmented control.
   */
  segmentedControl: {
    height: 32,
    minSegmentWidth: 60,
  },

  /**
   * Switch/Toggle.
   */
  switch: {
    width: 51,
    height: 31,
    thumbSize: 27,
  },

  /**
   * Slider.
   */
  slider: {
    trackHeight: 4,
    thumbSize: 28,
  },

  /**
   * Progress bar.
   */
  progressBar: {
    height: 4,
    heightLarge: 8,
  },

  /**
   * Badge.
   */
  badge: {
    minWidth: 20,
    height: 20,
    dotSize: 8,
  },

  /**
   * Chip/Tag.
   */
  chip: {
    height: 32,
    heightSmall: 24,
  },

  /**
   * List item.
   */
  listItem: {
    standard: 44,
    subtitle: 64,
    large: 88,
  },

  /**
   * Card.
   */
  card: {
    minHeight: 80,
    imageAspectRatio: 16 / 9,
  },

  /**
   * Modal.
   */
  modal: {
    maxWidth: 540,
    minHeight: 200,
  },

  /**
   * Sheet.
   */
  sheet: {
    handleWidth: 36,
    handleHeight: 5,
    snapPoints: {
      collapsed: 0.25,
      half: 0.5,
      expanded: 0.9,
    },
  },

  /**
   * Toast.
   */
  toast: {
    minHeight: 48,
    maxWidth: 400,
  },
} as const;

// =============================================================================
// SIZE UTILITIES
// =============================================================================

/**
 * Determines if a size meets minimum touch target requirements.
 * @param size - Size to check in points
 */
export function meetsMinimumTouchTarget(size: number): boolean {
  return size >= sizes.touchTarget.minimum;
}

/**
 * Ensures a size meets minimum touch target, returns minimum if not.
 * @param size - Desired size
 */
export function ensureMinimumTouchTarget(size: number): number {
  return Math.max(size, sizes.touchTarget.minimum);
}

/**
 * Get appropriate icon size based on context.
 * @param context - Where the icon will be used
 */
export function getIconSizeForContext(
  context: 'inline' | 'navigation' | 'tabBar' | 'feature'
): number {
  switch (context) {
    case 'inline':
      return sizes.icon.sm;
    case 'navigation':
      return sizes.icon.lg;
    case 'tabBar':
      return sizes.icon.lg;
    case 'feature':
      return sizes.icon.xl;
    default:
      return sizes.icon.md;
  }
}

/**
 * Type for size token keys.
 */
export type SizeKey = keyof SizeTokens;

/**
 * Type for breakpoint keys.
 */
export type BreakpointKey = keyof BreakpointTokens;

/**
 * Type for z-index keys.
 */
export type ZIndexKey = keyof ZIndexTokens;
