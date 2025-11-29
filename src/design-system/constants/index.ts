/**
 * AugustDesignSystem - Constants
 *
 * Design system constants and static values.
 */

// =============================================================================
// DESIGN SYSTEM METADATA
// =============================================================================

/**
 * Design system version.
 */
export const VERSION = '1.0.0';

/**
 * Design system name.
 */
export const NAME = 'AugustDesignSystem';

// =============================================================================
// APPLE HIG CONSTANTS
// =============================================================================

/**
 * Apple Human Interface Guidelines constants.
 */
export const HIG = {
  /**
   * Minimum touch target size in points.
   * All interactive elements must be at least this size.
   */
  MIN_TOUCH_TARGET: 44,

  /**
   * Recommended touch target size for comfortable interaction.
   */
  COMFORTABLE_TOUCH_TARGET: 48,

  /**
   * Standard iOS content margins.
   */
  CONTENT_MARGIN: 16,

  /**
   * Standard iOS safe area additional padding.
   */
  SAFE_AREA_PADDING: 16,

  /**
   * Navigation bar heights.
   */
  NAV_BAR_HEIGHT: 44,
  NAV_BAR_LARGE_TITLE_HEIGHT: 96,

  /**
   * Tab bar heights.
   */
  TAB_BAR_HEIGHT: 49,
  TAB_BAR_HEIGHT_WITH_HOME_INDICATOR: 83,

  /**
   * Home indicator height (iPhone X and later).
   */
  HOME_INDICATOR_HEIGHT: 34,

  /**
   * Status bar heights.
   */
  STATUS_BAR_HEIGHT: 44, // iPhone X+
  STATUS_BAR_HEIGHT_LEGACY: 20, // Older iPhones

  /**
   * Keyboard heights (approximate, varies by device).
   */
  KEYBOARD_HEIGHT_PORTRAIT: 291,
  KEYBOARD_HEIGHT_LANDSCAPE: 209,

  /**
   * Standard list item heights.
   */
  LIST_ITEM_HEIGHT: 44,
  LIST_ITEM_SUBTITLE_HEIGHT: 64,

  /**
   * Separator line thickness.
   */
  SEPARATOR_HEIGHT: 0.5,

  /**
   * Standard animation durations (in ms).
   */
  ANIMATION_FAST: 150,
  ANIMATION_NORMAL: 250,
  ANIMATION_SLOW: 350,

  /**
   * Modal presentation heights.
   */
  SHEET_PEEK_HEIGHT: 0.25,
  SHEET_HALF_HEIGHT: 0.5,
  SHEET_FULL_HEIGHT: 0.9,
} as const;

// =============================================================================
// ACCESSIBILITY CONSTANTS
// =============================================================================

/**
 * Accessibility-related constants.
 */
export const ACCESSIBILITY = {
  /**
   * Minimum contrast ratio for normal text (WCAG AA).
   */
  MIN_CONTRAST_RATIO: 4.5,

  /**
   * Minimum contrast ratio for large text (WCAG AA).
   */
  MIN_CONTRAST_RATIO_LARGE: 3,

  /**
   * Enhanced contrast ratio for normal text (WCAG AAA).
   */
  ENHANCED_CONTRAST_RATIO: 7,

  /**
   * Enhanced contrast ratio for large text (WCAG AAA).
   */
  ENHANCED_CONTRAST_RATIO_LARGE: 4.5,

  /**
   * Large text threshold (18pt regular or 14pt bold).
   */
  LARGE_TEXT_THRESHOLD: 18,
  LARGE_TEXT_BOLD_THRESHOLD: 14,

  /**
   * Maximum text scale factor for accessibility.
   */
  MAX_FONT_SCALE: 3.1,

  /**
   * Minimum recommended line height ratio.
   */
  MIN_LINE_HEIGHT_RATIO: 1.2,
} as const;

// =============================================================================
// PLATFORM CONSTANTS
// =============================================================================

/**
 * Platform-specific constants.
 */
export const PLATFORM = {
  /**
   * iOS system font name.
   */
  IOS_FONT: 'System',

  /**
   * Android system font name.
   */
  ANDROID_FONT: 'Roboto',

  /**
   * Monospace font fallbacks.
   */
  MONOSPACE_IOS: 'Menlo',
  MONOSPACE_ANDROID: 'monospace',

  /**
   * Default shadow color.
   */
  SHADOW_COLOR: '#000000',
} as const;

// =============================================================================
// Z-INDEX SCALE
// =============================================================================

/**
 * Z-index values for layering.
 */
export const Z_INDEX = {
  BASE: 0,
  DROPDOWN: 1000,
  STICKY: 1100,
  OVERLAY: 1200,
  MODAL: 1300,
  POPOVER: 1400,
  TOOLTIP: 1500,
  TOAST: 1600,
} as const;

// =============================================================================
// GRID CONSTANTS
// =============================================================================

/**
 * Grid system constants.
 */
export const GRID = {
  /**
   * Base unit for spacing (4pt grid).
   */
  BASE_UNIT: 4,

  /**
   * Common grid multipliers.
   */
  MULTIPLIERS: {
    HALF: 0.5, // 2pt
    SINGLE: 1, // 4pt
    DOUBLE: 2, // 8pt
    TRIPLE: 3, // 12pt
    QUAD: 4, // 16pt
    QUINT: 5, // 20pt
    HEX: 6, // 24pt
    OCTA: 8, // 32pt
    DECA: 10, // 40pt
    DODECA: 12, // 48pt
  },
} as const;

// =============================================================================
// DEVICE BREAKPOINTS
// =============================================================================

/**
 * Device size breakpoints in points.
 */
export const BREAKPOINTS = {
  /**
   * Small phones.
   */
  XS: 0,

  /**
   * Standard phones (iPhone SE and up).
   */
  SM: 375,

  /**
   * Large phones (iPhone Pro Max).
   */
  MD: 428,

  /**
   * Small tablets (iPad Mini).
   */
  LG: 744,

  /**
   * Large tablets (iPad Pro).
   */
  XL: 1024,
} as const;

// =============================================================================
// TIMING CONSTANTS
// =============================================================================

/**
 * Timing-related constants.
 */
export const TIMING = {
  /**
   * Debounce delay for search inputs (ms).
   */
  DEBOUNCE_SEARCH: 300,

  /**
   * Debounce delay for resize events (ms).
   */
  DEBOUNCE_RESIZE: 150,

  /**
   * Long press threshold (ms).
   */
  LONG_PRESS_DELAY: 500,

  /**
   * Double tap threshold (ms).
   */
  DOUBLE_TAP_DELAY: 300,

  /**
   * Toast default duration (ms).
   */
  TOAST_DURATION: 4000,

  /**
   * Skeleton loading animation duration (ms).
   */
  SKELETON_DURATION: 1500,
} as const;
