/**
 * AugustDesignSystem - Animation Tokens
 *
 * Animation timing and easing values following Apple's motion design
 * principles. iOS uses spring-based animations for natural, physics-based
 * motion that feels responsive and alive.
 *
 * Key principles from Apple's Human Interface Guidelines:
 * - Prefer quick, precise animations
 * - Use spring animations for natural feel
 * - Motion should reinforce spatial relationships
 * - Animations should be brief and purposeful
 */

import type { AnimationTokens, DurationTokens, EasingTokens } from '../types';

// =============================================================================
// DURATION TOKENS
// =============================================================================

/**
 * Animation duration values in milliseconds.
 *
 * iOS animation guidelines:
 * - Most animations should be 200-400ms
 * - Avoid animations longer than 500ms unless providing feedback
 * - Instant feedback should be < 100ms
 *
 * These durations are calibrated for iOS-feel:
 * - instant: Immediate state changes
 * - fastest/faster: Micro-interactions, button presses
 * - fast: Small UI transitions
 * - normal: Standard transitions
 * - slow: Complex transitions, page changes
 * - slower/slowest: Deliberate, attention-drawing animations
 */
export const duration: DurationTokens = {
  instant: 0,
  fastest: 50,
  faster: 100,
  fast: 150,
  normal: 250,
  slow: 350,
  slower: 500,
  slowest: 700,
};

// =============================================================================
// EASING TOKENS
// =============================================================================

/**
 * Easing curves and spring configurations.
 *
 * Bezier curves are defined as [x1, y1, x2, y2] for cubic-bezier.
 * Spring configurations define damping, stiffness, and mass.
 *
 * iOS typically uses spring animations with these characteristics:
 * - High response (quick initial movement)
 * - Moderate damping (smooth deceleration)
 * - Mass appropriate to visual weight
 */
export const easing: EasingTokens = {
  /**
   * Linear - constant speed (rarely used for UI).
   */
  linear: [0, 0, 1, 1],

  /**
   * Ease In - slow start, fast end.
   * Use for: Elements leaving the screen.
   */
  easeIn: [0.42, 0, 1, 1],

  /**
   * Ease Out - fast start, slow end.
   * Use for: Elements entering the screen.
   * This is the most common easing for iOS-style animations.
   */
  easeOut: [0, 0, 0.58, 1],

  /**
   * Ease In Out - slow start and end.
   * Use for: Elements that start and end on screen.
   */
  easeInOut: [0.42, 0, 0.58, 1],

  /**
   * Default spring - balanced, natural feel.
   * iOS default animation spring characteristics.
   * Use for: Most interactive animations.
   */
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },

  /**
   * Gentle spring - soft, slow settling.
   * Use for: Subtle movements, floating elements.
   */
  springGentle: {
    damping: 20,
    stiffness: 100,
    mass: 1,
  },

  /**
   * Bouncy spring - energetic, playful feel.
   * Use for: Emphasis, celebrations, playful interactions.
   * Use sparingly to avoid overwhelming users.
   */
  springBouncy: {
    damping: 10,
    stiffness: 200,
    mass: 1,
  },
};

// =============================================================================
// COMBINED ANIMATION TOKENS
// =============================================================================

/**
 * Complete animation token set.
 */
export const animation: AnimationTokens = {
  duration,
  easing,
};

// =============================================================================
// SEMANTIC ANIMATION PRESETS
// =============================================================================

/**
 * Pre-configured animation settings for common use cases.
 * These combine duration and easing for specific scenarios.
 */
export const animationPresets = {
  /**
   * Button press feedback.
   */
  buttonPress: {
    duration: duration.faster,
    easing: easing.easeOut,
  },

  /**
   * Button release feedback.
   */
  buttonRelease: {
    duration: duration.fast,
    easing: easing.spring,
  },

  /**
   * Modal/Sheet appear.
   */
  modalEnter: {
    duration: duration.normal,
    easing: easing.spring,
  },

  /**
   * Modal/Sheet dismiss.
   */
  modalExit: {
    duration: duration.fast,
    easing: easing.easeIn,
  },

  /**
   * Page/Screen transition.
   */
  pageTransition: {
    duration: duration.slow,
    easing: easing.easeInOut,
  },

  /**
   * Fade in content.
   */
  fadeIn: {
    duration: duration.normal,
    easing: easing.easeOut,
  },

  /**
   * Fade out content.
   */
  fadeOut: {
    duration: duration.fast,
    easing: easing.easeIn,
  },

  /**
   * Slide in from bottom.
   */
  slideInUp: {
    duration: duration.normal,
    easing: easing.spring,
  },

  /**
   * Slide out to bottom.
   */
  slideOutDown: {
    duration: duration.fast,
    easing: easing.easeIn,
  },

  /**
   * Scale up (appearing).
   */
  scaleIn: {
    duration: duration.normal,
    easing: easing.springBouncy,
  },

  /**
   * Scale down (disappearing).
   */
  scaleOut: {
    duration: duration.fast,
    easing: easing.easeIn,
  },

  /**
   * Expand/Collapse accordion.
   */
  expand: {
    duration: duration.normal,
    easing: easing.easeInOut,
  },

  /**
   * Switch/Toggle animation.
   */
  toggle: {
    duration: duration.fast,
    easing: easing.spring,
  },

  /**
   * Skeleton loading shimmer.
   */
  skeleton: {
    duration: duration.slowest,
    easing: easing.linear,
  },

  /**
   * Toast notification appear.
   */
  toastEnter: {
    duration: duration.normal,
    easing: easing.springBouncy,
  },

  /**
   * Toast notification dismiss.
   */
  toastExit: {
    duration: duration.fast,
    easing: easing.easeIn,
  },

  /**
   * Haptic feedback timing.
   */
  haptic: {
    duration: duration.instant,
    easing: easing.linear,
  },
} as const;

// =============================================================================
// REDUCED MOTION ALTERNATIVES
// =============================================================================

/**
 * Reduced motion alternatives for accessibility.
 * When user has 'Reduce Motion' enabled, use these instead.
 *
 * iOS respects the system 'Reduce Motion' setting.
 * These provide instant or minimal animations as alternatives.
 */
export const reducedMotionPresets = {
  /**
   * Replaces spring/bouncy animations with simple fade.
   */
  default: {
    duration: duration.fast,
    easing: easing.easeOut,
  },

  /**
   * Replaces sliding animations with fade.
   */
  slide: {
    duration: duration.faster,
    easing: easing.easeOut,
  },

  /**
   * Replaces scale animations with fade.
   */
  scale: {
    duration: duration.faster,
    easing: easing.easeOut,
  },

  /**
   * Instant change (no animation).
   */
  instant: {
    duration: duration.instant,
    easing: easing.linear,
  },
} as const;

// =============================================================================
// ANIMATION UTILITIES
// =============================================================================

/**
 * Creates a delay before animation starts.
 * @param baseDelay - Base delay in ms
 * @param index - Optional index for staggered animations
 * @param staggerAmount - Amount to stagger per index
 */
export function withDelay(
  baseDelay: number,
  index: number = 0,
  staggerAmount: number = 50
): number {
  return baseDelay + index * staggerAmount;
}

/**
 * Creates staggered delay for list animations.
 * @param index - Item index in list
 * @param staggerAmount - Delay between items (default 50ms)
 * @param maxDelay - Maximum total delay to prevent long waits
 */
export function stagger(
  index: number,
  staggerAmount: number = 50,
  maxDelay: number = 500
): number {
  return Math.min(index * staggerAmount, maxDelay);
}

/**
 * Type for animation preset keys.
 */
export type AnimationPreset = keyof typeof animationPresets;

/**
 * Type for duration token keys.
 */
export type DurationKey = keyof DurationTokens;

/**
 * Type for easing curve keys.
 */
export type EasingKey = keyof EasingTokens;
