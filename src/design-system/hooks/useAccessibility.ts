/**
 * AugustDesignSystem - Accessibility Hooks
 *
 * Hooks for accessibility features following Apple's accessibility guidelines.
 * Supports reduced motion, dynamic type, and other iOS accessibility settings.
 */

import { useMemo, useEffect, useState } from 'react';
import {
  AccessibilityInfo,
  PixelRatio,
  useWindowDimensions,
} from 'react-native';
import type { TypographyStyle } from '../types';
import { useTheme } from '../theme';
import { reducedMotionPresets, animationPresets } from '../tokens/animation';

// =============================================================================
// USE REDUCED MOTION
// =============================================================================

/**
 * Hook that detects if the user has enabled "Reduce Motion" setting.
 * When true, animations should be simplified or removed.
 *
 * @returns Boolean indicating if reduced motion is enabled
 *
 * @example
 * ```tsx
 * function AnimatedComponent() {
 *   const prefersReducedMotion = useReducedMotion();
 *
 *   const animationConfig = prefersReducedMotion
 *     ? { duration: 0 }
 *     : { duration: 300, easing: 'spring' };
 *
 *   return <Animated.View style={animatedStyle} />;
 * }
 * ```
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Get initial value
    AccessibilityInfo.isReduceMotionEnabled().then(setReducedMotion);

    // Listen for changes
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReducedMotion
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return reducedMotion;
}

// =============================================================================
// USE ANIMATION CONFIG
// =============================================================================

/**
 * Animation configuration that respects reduced motion preference.
 */
export interface AccessibleAnimationConfig {
  duration: number;
  useNativeDriver: boolean;
  isReduced: boolean;
}

/**
 * Hook that provides animation configuration respecting reduced motion.
 *
 * @param preset - Animation preset name
 * @returns Animation configuration
 *
 * @example
 * ```tsx
 * function Modal() {
 *   const { duration, isReduced } = useAccessibleAnimation('modalEnter');
 *
 *   const enterAnimation = useCallback(() => {
 *     Animated.timing(opacity, {
 *       toValue: 1,
 *       duration,
 *       useNativeDriver: true,
 *     }).start();
 *   }, [duration]);
 *
 *   return <Animated.View style={{ opacity }} />;
 * }
 * ```
 */
export function useAccessibleAnimation(
  preset: keyof typeof animationPresets
): AccessibleAnimationConfig {
  const prefersReducedMotion = useReducedMotion();

  return useMemo(() => {
    if (prefersReducedMotion) {
      return {
        duration: reducedMotionPresets.default.duration,
        useNativeDriver: true,
        isReduced: true,
      };
    }

    return {
      duration: animationPresets[preset].duration,
      useNativeDriver: true,
      isReduced: false,
    };
  }, [preset, prefersReducedMotion]);
}

// =============================================================================
// USE SCREEN READER
// =============================================================================

/**
 * Hook that detects if a screen reader (VoiceOver on iOS) is active.
 *
 * @returns Boolean indicating if screen reader is enabled
 *
 * @example
 * ```tsx
 * function ImageGallery() {
 *   const screenReaderEnabled = useScreenReader();
 *
 *   // Provide more detailed descriptions when screen reader is active
 *   const imageDescription = screenReaderEnabled
 *     ? 'Photo showing a sunset over the ocean with orange and purple colors'
 *     : 'Sunset photo';
 *
 *   return <Image accessibilityLabel={imageDescription} />;
 * }
 * ```
 */
export function useScreenReader(): boolean {
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then(setScreenReaderEnabled);

    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setScreenReaderEnabled
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return screenReaderEnabled;
}

// =============================================================================
// USE BOLD TEXT
// =============================================================================

/**
 * Hook that detects if the user has enabled "Bold Text" setting.
 *
 * @returns Boolean indicating if bold text is enabled
 *
 * @example
 * ```tsx
 * function Text({ children }) {
 *   const boldTextEnabled = useBoldText();
 *   const fontWeight = boldTextEnabled ? '700' : '400';
 *
 *   return <RNText style={{ fontWeight }}>{children}</RNText>;
 * }
 * ```
 */
export function useBoldText(): boolean {
  const [boldTextEnabled, setBoldTextEnabled] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isBoldTextEnabled().then(setBoldTextEnabled);

    const subscription = AccessibilityInfo.addEventListener(
      'boldTextChanged',
      setBoldTextEnabled
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return boldTextEnabled;
}

// =============================================================================
// USE DYNAMIC TYPE
// =============================================================================

/**
 * Dynamic type scale factors.
 * iOS allows users to scale text from ~82% to ~310% of default size.
 */
export type DynamicTypeSize =
  | 'xSmall' // 82%
  | 'small' // 88%
  | 'medium' // 94%
  | 'large' // 100% (default)
  | 'xLarge' // 106%
  | 'xxLarge' // 112%
  | 'xxxLarge' // 124%
  | 'accessibility1' // 166%
  | 'accessibility2' // 194%
  | 'accessibility3' // 235%
  | 'accessibility4' // 275%
  | 'accessibility5'; // 310%

const dynamicTypeScales: Record<DynamicTypeSize, number> = {
  xSmall: 0.82,
  small: 0.88,
  medium: 0.94,
  large: 1.0,
  xLarge: 1.06,
  xxLarge: 1.12,
  xxxLarge: 1.24,
  accessibility1: 1.66,
  accessibility2: 1.94,
  accessibility3: 2.35,
  accessibility4: 2.75,
  accessibility5: 3.1,
};

/**
 * Hook that provides font scale factor for Dynamic Type support.
 *
 * @returns Current font scale factor
 *
 * @example
 * ```tsx
 * function ScaledText({ style, children }) {
 *   const fontScale = useDynamicType();
 *
 *   return (
 *     <Text style={[style, { fontSize: style.fontSize * fontScale }]}>
 *       {children}
 *     </Text>
 *   );
 * }
 * ```
 */
export function useDynamicType(): number {
  const { fontScale } = useWindowDimensions();
  return fontScale;
}

/**
 * Hook that scales typography styles based on Dynamic Type setting.
 *
 * @param baseStyle - Base typography style
 * @param options - Scaling options
 * @returns Scaled typography style
 *
 * @example
 * ```tsx
 * function Heading({ children }) {
 *   const { theme } = useTheme();
 *   const style = useScaledTypography(theme.typography.headline, {
 *     maxScale: 1.5, // Limit scaling to 150%
 *   });
 *
 *   return <Text style={style}>{children}</Text>;
 * }
 * ```
 */
export function useScaledTypography(
  baseStyle: TypographyStyle,
  options: {
    maxScale?: number;
    minScale?: number;
  } = {}
): TypographyStyle {
  const { maxScale = 2.0, minScale = 0.8 } = options;
  const fontScale = useDynamicType();

  return useMemo(() => {
    const clampedScale = Math.min(Math.max(fontScale, minScale), maxScale);

    return {
      ...baseStyle,
      fontSize: Math.round(baseStyle.fontSize * clampedScale),
      lineHeight: Math.round(baseStyle.lineHeight * clampedScale),
    };
  }, [baseStyle, fontScale, maxScale, minScale]);
}

// =============================================================================
// USE HIGH CONTRAST
// =============================================================================

/**
 * Hook that detects if the user has enabled increased contrast.
 * Note: This setting affects system UI but apps should respect it too.
 *
 * @returns Boolean indicating if high contrast is enabled
 */
export function useHighContrast(): boolean {
  // React Native doesn't have direct access to this setting.
  // This is a placeholder that could be enhanced with native modules.
  // For now, we can check if user has set bold text as a proxy.
  const boldTextEnabled = useBoldText();
  return boldTextEnabled;
}

// =============================================================================
// ACCESSIBILITY ANNOUNCEMENTS
// =============================================================================

/**
 * Announces a message to screen reader users.
 *
 * @param message - Message to announce
 *
 * @example
 * ```tsx
 * function SubmitButton({ onPress }) {
 *   const handlePress = async () => {
 *     await onPress();
 *     announceForAccessibility('Form submitted successfully');
 *   };
 *
 *   return <Button onPress={handlePress} title="Submit" />;
 * }
 * ```
 */
export function announceForAccessibility(message: string): void {
  AccessibilityInfo.announceForAccessibility(message);
}

/**
 * Sets focus to a specific accessibility element.
 *
 * @param reactTag - React native tag of the element
 */
export function setAccessibilityFocus(reactTag: number | null): void {
  if (reactTag) {
    AccessibilityInfo.setAccessibilityFocus(reactTag);
  }
}
