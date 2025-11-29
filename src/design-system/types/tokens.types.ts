/**
 * AugustDesignSystem - Token Type Definitions
 *
 * Core type definitions for design tokens following Apple HIG standards.
 * These types ensure type-safe access to all design tokens throughout the system.
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

/**
 * Semantic color roles following Apple's color system.
 * Each color has both light and dark mode variants.
 */
export interface ColorTokens {
  // Background colors - layered system following Apple's depth philosophy
  readonly background: {
    readonly primary: string;
    readonly secondary: string;
    readonly tertiary: string;
    readonly grouped: string;
    readonly groupedSecondary: string;
    readonly groupedTertiary: string;
  };

  // Foreground/Label colors - for text and icons
  readonly label: {
    readonly primary: string;
    readonly secondary: string;
    readonly tertiary: string;
    readonly quaternary: string;
  };

  // Fill colors - for thin and small shapes
  readonly fill: {
    readonly primary: string;
    readonly secondary: string;
    readonly tertiary: string;
    readonly quaternary: string;
  };

  // Separator colors
  readonly separator: {
    readonly opaque: string;
    readonly nonOpaque: string;
  };

  // System colors - Apple's semantic system colors
  readonly system: {
    readonly red: string;
    readonly orange: string;
    readonly yellow: string;
    readonly green: string;
    readonly mint: string;
    readonly teal: string;
    readonly cyan: string;
    readonly blue: string;
    readonly indigo: string;
    readonly purple: string;
    readonly pink: string;
    readonly brown: string;
    readonly gray: string;
    readonly gray2: string;
    readonly gray3: string;
    readonly gray4: string;
    readonly gray5: string;
    readonly gray6: string;
  };

  // Semantic/Functional colors
  readonly semantic: {
    readonly success: string;
    readonly warning: string;
    readonly error: string;
    readonly info: string;
  };

  // Interactive colors
  readonly interactive: {
    readonly tint: string;
    readonly tintPressed: string;
    readonly tintDisabled: string;
    readonly destructive: string;
    readonly destructivePressed: string;
  };

  // Material/Blur backgrounds
  readonly material: {
    readonly thin: string;
    readonly regular: string;
    readonly thick: string;
    readonly chrome: string;
  };
}

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

/**
 * Font weight values following SF Pro specifications.
 */
export type FontWeight =
  | '100' // Ultralight
  | '200' // Thin
  | '300' // Light
  | '400' // Regular
  | '500' // Medium
  | '600' // Semibold
  | '700' // Bold
  | '800' // Heavy
  | '900'; // Black

/**
 * Individual typography style definition.
 */
export interface TypographyStyle {
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly lineHeight: number;
  readonly letterSpacing: number;
  readonly fontWeight: FontWeight;
}

/**
 * Complete typography scale following Apple's Dynamic Type system.
 * Includes all standard iOS text styles.
 */
export interface TypographyTokens {
  // Display styles - for large, prominent text
  readonly largeTitle: TypographyStyle;
  readonly title1: TypographyStyle;
  readonly title2: TypographyStyle;
  readonly title3: TypographyStyle;

  // Headline styles
  readonly headline: TypographyStyle;
  readonly subheadline: TypographyStyle;

  // Body styles
  readonly body: TypographyStyle;
  readonly callout: TypographyStyle;

  // Supporting styles
  readonly footnote: TypographyStyle;
  readonly caption1: TypographyStyle;
  readonly caption2: TypographyStyle;
}

/**
 * Font family definitions.
 */
export interface FontFamilyTokens {
  readonly regular: string;
  readonly medium: string;
  readonly semibold: string;
  readonly bold: string;
  readonly heavy: string;
  readonly monospace: string;
  readonly rounded: string;
}

// =============================================================================
// SPACING TOKENS
// =============================================================================

/**
 * Spacing scale based on 4pt grid system.
 * Apple uses 8pt as base unit; we use 4pt for finer control.
 */
export interface SpacingTokens {
  readonly none: number;
  readonly xxs: number; // 2pt
  readonly xs: number; // 4pt
  readonly sm: number; // 8pt
  readonly md: number; // 12pt
  readonly lg: number; // 16pt
  readonly xl: number; // 20pt
  readonly xxl: number; // 24pt
  readonly xxxl: number; // 32pt
  readonly xxxxl: number; // 40pt
  readonly xxxxxl: number; // 48pt

  // Semantic spacing
  readonly inset: {
    readonly none: number;
    readonly xs: number;
    readonly sm: number;
    readonly md: number;
    readonly lg: number;
    readonly xl: number;
  };

  readonly stack: {
    readonly none: number;
    readonly xs: number;
    readonly sm: number;
    readonly md: number;
    readonly lg: number;
    readonly xl: number;
  };

  readonly inline: {
    readonly none: number;
    readonly xs: number;
    readonly sm: number;
    readonly md: number;
    readonly lg: number;
    readonly xl: number;
  };
}

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

/**
 * Border radius scale following Apple's continuous corner curve style.
 */
export interface RadiusTokens {
  readonly none: number;
  readonly xs: number; // 4pt - small elements
  readonly sm: number; // 8pt - buttons, inputs
  readonly md: number; // 12pt - cards
  readonly lg: number; // 16pt - modals
  readonly xl: number; // 20pt - sheets
  readonly xxl: number; // 24pt - large containers
  readonly full: number; // 9999 - pills, circular
}

// =============================================================================
// SHADOW/ELEVATION TOKENS
// =============================================================================

/**
 * Individual shadow definition following React Native's shadow properties.
 */
export interface ShadowStyle {
  readonly shadowColor: string;
  readonly shadowOffset: {
    readonly width: number;
    readonly height: number;
  };
  readonly shadowOpacity: number;
  readonly shadowRadius: number;
  readonly elevation: number; // Android elevation
}

/**
 * Elevation scale for depth hierarchy.
 */
export interface ShadowTokens {
  readonly none: ShadowStyle;
  readonly xs: ShadowStyle; // Subtle lift
  readonly sm: ShadowStyle; // Cards, buttons
  readonly md: ShadowStyle; // Dropdowns, popovers
  readonly lg: ShadowStyle; // Modals, dialogs
  readonly xl: ShadowStyle; // Sheets
  readonly xxl: ShadowStyle; // Maximum elevation
}

// =============================================================================
// ANIMATION/DURATION TOKENS
// =============================================================================

/**
 * Duration values in milliseconds.
 */
export interface DurationTokens {
  readonly instant: number; // 0ms
  readonly fastest: number; // 50ms
  readonly faster: number; // 100ms
  readonly fast: number; // 150ms
  readonly normal: number; // 250ms
  readonly slow: number; // 350ms
  readonly slower: number; // 500ms
  readonly slowest: number; // 700ms
}

/**
 * Easing curves for animations.
 */
export interface EasingTokens {
  readonly linear: readonly [number, number, number, number];
  readonly easeIn: readonly [number, number, number, number];
  readonly easeOut: readonly [number, number, number, number];
  readonly easeInOut: readonly [number, number, number, number];
  readonly spring: {
    readonly damping: number;
    readonly stiffness: number;
    readonly mass: number;
  };
  readonly springGentle: {
    readonly damping: number;
    readonly stiffness: number;
    readonly mass: number;
  };
  readonly springBouncy: {
    readonly damping: number;
    readonly stiffness: number;
    readonly mass: number;
  };
}

/**
 * Complete animation tokens.
 */
export interface AnimationTokens {
  readonly duration: DurationTokens;
  readonly easing: EasingTokens;
}

// =============================================================================
// SIZING TOKENS
// =============================================================================

/**
 * Component sizing following Apple HIG minimum touch targets (44pt).
 */
export interface SizeTokens {
  // Touch targets
  readonly touchTarget: {
    readonly minimum: number; // 44pt - Apple HIG minimum
    readonly comfortable: number; // 48pt
    readonly spacious: number; // 56pt
  };

  // Icon sizes
  readonly icon: {
    readonly xs: number; // 12pt
    readonly sm: number; // 16pt
    readonly md: number; // 20pt
    readonly lg: number; // 24pt
    readonly xl: number; // 32pt
    readonly xxl: number; // 40pt
  };

  // Avatar sizes
  readonly avatar: {
    readonly xs: number; // 24pt
    readonly sm: number; // 32pt
    readonly md: number; // 40pt
    readonly lg: number; // 56pt
    readonly xl: number; // 72pt
    readonly xxl: number; // 96pt
  };

  // Button heights
  readonly button: {
    readonly sm: number; // 32pt
    readonly md: number; // 44pt - default, meets touch target
    readonly lg: number; // 50pt
    readonly xl: number; // 56pt
  };

  // Input heights
  readonly input: {
    readonly sm: number; // 36pt
    readonly md: number; // 44pt - default
    readonly lg: number; // 52pt
  };
}

// =============================================================================
// Z-INDEX TOKENS
// =============================================================================

/**
 * Z-index scale for layering.
 */
export interface ZIndexTokens {
  readonly base: number;
  readonly dropdown: number;
  readonly sticky: number;
  readonly overlay: number;
  readonly modal: number;
  readonly popover: number;
  readonly tooltip: number;
  readonly toast: number;
}

// =============================================================================
// BREAKPOINT TOKENS
// =============================================================================

/**
 * Responsive breakpoints based on device sizes.
 */
export interface BreakpointTokens {
  readonly xs: number; // 0 - Small phones
  readonly sm: number; // 375 - Standard phones (iPhone SE+)
  readonly md: number; // 428 - Large phones (iPhone Pro Max)
  readonly lg: number; // 744 - Small tablets
  readonly xl: number; // 1024 - Large tablets
}

// =============================================================================
// OPACITY TOKENS
// =============================================================================

/**
 * Opacity values for various states.
 */
export interface OpacityTokens {
  readonly transparent: number; // 0
  readonly disabled: number; // 0.38
  readonly medium: number; // 0.6
  readonly high: number; // 0.87
  readonly opaque: number; // 1
}

// =============================================================================
// COMBINED TOKEN SET
// =============================================================================

/**
 * Complete design token set combining all token categories.
 */
export interface DesignTokens {
  readonly colors: ColorTokens;
  readonly typography: TypographyTokens;
  readonly fontFamily: FontFamilyTokens;
  readonly spacing: SpacingTokens;
  readonly radius: RadiusTokens;
  readonly shadows: ShadowTokens;
  readonly animation: AnimationTokens;
  readonly sizes: SizeTokens;
  readonly zIndex: ZIndexTokens;
  readonly breakpoints: BreakpointTokens;
  readonly opacity: OpacityTokens;
}
