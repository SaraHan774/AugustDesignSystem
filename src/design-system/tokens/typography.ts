/**
 * AugustDesignSystem - Typography Tokens
 *
 * Typography scale inspired by San Francisco Pro font and Apple's
 * Dynamic Type system. Follows iOS Human Interface Guidelines for
 * text styles, sizes, weights, and line heights.
 *
 * Note: React Native uses the system font by default.
 * - iOS: San Francisco (SF Pro)
 * - Android: Roboto
 *
 * The 'System' font family maps to these automatically.
 */

import type { TypographyTokens, FontFamilyTokens, TypographyStyle } from '../types';

// =============================================================================
// FONT FAMILIES
// =============================================================================

/**
 * Font family tokens.
 * Uses 'System' to automatically select platform-appropriate fonts.
 * For custom fonts, replace these values with your font names.
 */
export const fontFamily: FontFamilyTokens = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
  heavy: 'System',
  monospace: 'Menlo', // Falls back to platform monospace
  rounded: 'System', // SF Pro Rounded on iOS
};

// =============================================================================
// TYPOGRAPHY SCALE
// =============================================================================

/**
 * Typography tokens following Apple's Dynamic Type specifications.
 *
 * Each style includes:
 * - fontFamily: The font to use
 * - fontSize: Size in points (dp on Android)
 * - lineHeight: Calculated line height for optimal readability
 * - letterSpacing: Tracking adjustments per Apple specs
 * - fontWeight: Weight value as string
 *
 * Line height calculation: fontSize * multiplier (typically 1.2-1.5)
 * Letter spacing: Derived from Apple's SF Pro tracking specifications
 */
export const typography: TypographyTokens = {
  // ==========================================================================
  // DISPLAY STYLES
  // Large, prominent text for titles and headers
  // ==========================================================================

  /**
   * Large Title - Used for main screen titles in navigation bars.
   * iOS: 34pt Regular
   */
  largeTitle: {
    fontFamily: fontFamily.regular,
    fontSize: 34,
    lineHeight: 41, // 1.2x
    letterSpacing: 0.37,
    fontWeight: '400',
  },

  /**
   * Title 1 - Primary content titles.
   * iOS: 28pt Regular
   */
  title1: {
    fontFamily: fontFamily.regular,
    fontSize: 28,
    lineHeight: 34, // 1.21x
    letterSpacing: 0.36,
    fontWeight: '400',
  },

  /**
   * Title 2 - Secondary titles.
   * iOS: 22pt Regular
   */
  title2: {
    fontFamily: fontFamily.regular,
    fontSize: 22,
    lineHeight: 28, // 1.27x
    letterSpacing: 0.35,
    fontWeight: '400',
  },

  /**
   * Title 3 - Tertiary titles.
   * iOS: 20pt Regular
   */
  title3: {
    fontFamily: fontFamily.regular,
    fontSize: 20,
    lineHeight: 25, // 1.25x
    letterSpacing: 0.38,
    fontWeight: '400',
  },

  // ==========================================================================
  // HEADLINE STYLES
  // For section headers and emphasized text
  // ==========================================================================

  /**
   * Headline - Section headers, emphasized body text.
   * iOS: 17pt Semibold
   */
  headline: {
    fontFamily: fontFamily.semibold,
    fontSize: 17,
    lineHeight: 22, // 1.29x
    letterSpacing: -0.41,
    fontWeight: '600',
  },

  /**
   * Subheadline - Subordinate section headers.
   * iOS: 15pt Regular
   */
  subheadline: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 20, // 1.33x
    letterSpacing: -0.24,
    fontWeight: '400',
  },

  // ==========================================================================
  // BODY STYLES
  // Primary reading text
  // ==========================================================================

  /**
   * Body - Primary reading text throughout the app.
   * iOS: 17pt Regular
   */
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 17,
    lineHeight: 22, // 1.29x
    letterSpacing: -0.41,
    fontWeight: '400',
  },

  /**
   * Callout - Secondary text that's slightly smaller than body.
   * iOS: 16pt Regular
   */
  callout: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 21, // 1.31x
    letterSpacing: -0.32,
    fontWeight: '400',
  },

  // ==========================================================================
  // SUPPORTING STYLES
  // Smaller text for captions, footnotes, and labels
  // ==========================================================================

  /**
   * Footnote - Smaller supporting text.
   * iOS: 13pt Regular
   */
  footnote: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18, // 1.38x
    letterSpacing: -0.08,
    fontWeight: '400',
  },

  /**
   * Caption 1 - Primary caption style.
   * iOS: 12pt Regular
   */
  caption1: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16, // 1.33x
    letterSpacing: 0,
    fontWeight: '400',
  },

  /**
   * Caption 2 - Secondary caption style (smallest).
   * iOS: 11pt Regular
   */
  caption2: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 13, // 1.18x
    letterSpacing: 0.07,
    fontWeight: '400',
  },
};

// =============================================================================
// TYPOGRAPHY UTILITIES
// =============================================================================

/**
 * Creates a typography style with a different weight.
 */
export function withWeight(
  style: TypographyStyle,
  weight: TypographyStyle['fontWeight']
): TypographyStyle {
  return {
    ...style,
    fontWeight: weight,
  };
}

/**
 * Creates a typography style with a different size (scaling line height proportionally).
 */
export function withSize(
  style: TypographyStyle,
  fontSize: number
): TypographyStyle {
  const ratio = style.lineHeight / style.fontSize;
  return {
    ...style,
    fontSize,
    lineHeight: Math.round(fontSize * ratio),
  };
}

/**
 * Creates an emphasized version of a typography style (semibold).
 */
export function emphasized(style: TypographyStyle): TypographyStyle {
  return withWeight(style, '600');
}

/**
 * Creates a bold version of a typography style.
 */
export function bold(style: TypographyStyle): TypographyStyle {
  return withWeight(style, '700');
}

/**
 * Pre-defined emphasized variants for common use cases.
 */
export const typographyEmphasis = {
  bodyEmphasis: emphasized(typography.body),
  calloutEmphasis: emphasized(typography.callout),
  footnoteEmphasis: emphasized(typography.footnote),
  caption1Emphasis: emphasized(typography.caption1),
  subheadlineEmphasis: emphasized(typography.subheadline),
} as const;

/**
 * Type for typography variant keys.
 */
export type TypographyVariant = keyof typeof typography;

/**
 * Type for emphasized typography variant keys.
 */
export type TypographyEmphasisVariant = keyof typeof typographyEmphasis;
