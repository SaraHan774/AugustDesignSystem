/**
 * AugustDesignSystem - useThemedStyles Hook
 *
 * Hook for creating memoized styles based on theme.
 * Automatically updates styles when theme changes.
 */

import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { Theme } from '../types';
import { useTheme } from '../theme';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Style creator function type.
 */
type StyleCreator<T extends StyleSheet.NamedStyles<T>> = (theme: Theme) => T;

/**
 * Flattened styles type for use with StyleSheet.create.
 */
type FlattenedStyles<T> = {
  [P in keyof T]: T[P];
};

// =============================================================================
// USE THEMED STYLES
// =============================================================================

/**
 * Hook that creates memoized styles based on the current theme.
 *
 * Styles are automatically recreated when the theme changes (e.g., light/dark mode toggle).
 * Uses StyleSheet.create internally for performance optimization.
 *
 * @param styleCreator - Function that receives theme and returns style object
 * @returns Memoized StyleSheet object
 *
 * @example
 * ```tsx
 * const styles = useThemedStyles((theme) => ({
 *   container: {
 *     backgroundColor: theme.colors.background.primary,
 *     padding: theme.spacing.lg,
 *   },
 *   title: {
 *     ...theme.typography.headline,
 *     color: theme.colors.label.primary,
 *   },
 *   button: {
 *     backgroundColor: theme.colors.interactive.tint,
 *     borderRadius: theme.radius.sm,
 *     height: theme.sizes.button.md,
 *   },
 * }));
 *
 * return (
 *   <View style={styles.container}>
 *     <Text style={styles.title}>Hello</Text>
 *   </View>
 * );
 * ```
 */
export function useThemedStyles<T extends StyleSheet.NamedStyles<T>>(
  styleCreator: StyleCreator<T>
): T {
  const { theme } = useTheme();

  return useMemo(() => {
    const rawStyles = styleCreator(theme);
    return StyleSheet.create(rawStyles);
  }, [theme, styleCreator]);
}

// =============================================================================
// USE THEMED STYLE
// =============================================================================

/**
 * Hook for creating a single themed style object.
 * Useful when you only need one style object.
 *
 * @param styleCreator - Function that receives theme and returns style
 * @returns Memoized style object
 *
 * @example
 * ```tsx
 * const containerStyle = useThemedStyle((theme) => ({
 *   backgroundColor: theme.colors.background.primary,
 *   padding: theme.spacing.lg,
 * }));
 *
 * return <View style={containerStyle} />;
 * ```
 */
export function useThemedStyle<T extends Record<string, unknown>>(
  styleCreator: (theme: Theme) => T
): T {
  const { theme } = useTheme();

  return useMemo(() => styleCreator(theme), [theme, styleCreator]);
}

// =============================================================================
// CREATE THEMED STYLES
// =============================================================================

/**
 * Factory function to create a themed styles hook for a component.
 * Useful for defining styles outside of components.
 *
 * @param styleCreator - Function that receives theme and returns style object
 * @returns Hook that returns the themed styles
 *
 * @example
 * ```tsx
 * // Define outside component
 * const useButtonStyles = createThemedStyles((theme) => ({
 *   container: {
 *     backgroundColor: theme.colors.interactive.tint,
 *     borderRadius: theme.radius.sm,
 *     height: theme.sizes.button.md,
 *     paddingHorizontal: theme.spacing.lg,
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *   },
 *   label: {
 *     ...theme.typography.headline,
 *     color: '#FFFFFF',
 *   },
 *   disabled: {
 *     opacity: theme.opacity.disabled,
 *   },
 * }));
 *
 * // Use in component
 * function Button({ title, disabled }) {
 *   const styles = useButtonStyles();
 *   return (
 *     <Pressable style={[styles.container, disabled && styles.disabled]}>
 *       <Text style={styles.label}>{title}</Text>
 *     </Pressable>
 *   );
 * }
 * ```
 */
export function createThemedStyles<T extends StyleSheet.NamedStyles<T>>(
  styleCreator: StyleCreator<T>
): () => T {
  return function useStyles(): T {
    return useThemedStyles(styleCreator);
  };
}

// =============================================================================
// STYLE HELPERS
// =============================================================================

/**
 * Combines multiple style objects, filtering out falsy values.
 * Type-safe alternative to array syntax.
 *
 * @param styles - Style objects to combine
 * @returns Combined style object
 *
 * @example
 * ```tsx
 * const combinedStyle = combineStyles(
 *   styles.base,
 *   isActive && styles.active,
 *   isDisabled && styles.disabled
 * );
 * ```
 */
export function combineStyles<T>(
  ...styles: (T | false | null | undefined)[]
): T[] {
  return styles.filter(Boolean) as T[];
}

/**
 * Creates a conditional style object.
 *
 * @param condition - Condition to check
 * @param trueStyle - Style to return if condition is true
 * @param falseStyle - Style to return if condition is false (optional)
 * @returns Selected style or undefined
 */
export function conditionalStyle<T>(
  condition: boolean,
  trueStyle: T,
  falseStyle?: T
): T | undefined {
  if (condition) return trueStyle;
  return falseStyle;
}
