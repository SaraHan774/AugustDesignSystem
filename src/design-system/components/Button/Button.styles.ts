/**
 * AugustDesignSystem - Button Component Styles
 *
 * Style definitions for the Button component following Apple HIG.
 */

import { StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import type { Theme } from '@types';
import type { ButtonVariant, ButtonSize, ButtonColorScheme } from '@components';

/**
 * Get button height based on size.
 * All sizes meet or exceed Apple HIG minimum touch target (44pt).
 */
export function getButtonHeight(size: ButtonSize, theme: Theme): number {
  const heights: Record<ButtonSize, number> = {
    sm: theme.sizes.button.sm, // 32pt - compact, but padded for touch
    md: theme.sizes.button.md, // 44pt - default, meets touch target
    lg: theme.sizes.button.lg, // 50pt - prominent
  };
  return heights[size];
}

/**
 * Get horizontal padding based on size.
 */
export function getButtonPadding(size: ButtonSize, theme: Theme): number {
  const paddings: Record<ButtonSize, number> = {
    sm: theme.spacing.md, // 12pt
    md: theme.spacing.lg, // 16pt
    lg: theme.spacing.xl, // 20pt
  };
  return paddings[size];
}

/**
 * Get border radius based on size.
 */
export function getButtonRadius(size: ButtonSize, theme: Theme): number {
  const radii: Record<ButtonSize, number> = {
    sm: theme.radius.sm, // 8pt
    md: theme.radius.md, // 12pt
    lg: theme.radius.md, // 12pt
  };
  return radii[size];
}

/**
 * Get icon size based on button size.
 */
export function getIconSize(size: ButtonSize, theme: Theme): number {
  const iconSizes: Record<ButtonSize, number> = {
    sm: theme.sizes.icon.sm, // 16pt
    md: theme.sizes.icon.md, // 20pt
    lg: theme.sizes.icon.lg, // 24pt
  };
  return iconSizes[size];
}

/**
 * Get gap between icon and text.
 */
export function getIconGap(size: ButtonSize, theme: Theme): number {
  const gaps: Record<ButtonSize, number> = {
    sm: theme.spacing.xs, // 4pt
    md: theme.spacing.sm, // 8pt
    lg: theme.spacing.sm, // 8pt
  };
  return gaps[size];
}

/**
 * Color configuration for each variant and color scheme combination.
 */
interface ColorConfig {
  background: string;
  backgroundPressed: string;
  text: string;
  border?: string;
}

/**
 * Get colors for button variant and color scheme.
 */
export function getButtonColors(
  variant: ButtonVariant,
  colorScheme: ButtonColorScheme,
  theme: Theme
): ColorConfig {
  // Base colors for each scheme
  const schemeColors = {
    primary: {
      solid: theme.colors.interactive.tint,
      solidPressed: theme.colors.interactive.tintPressed,
      text: theme.colors.interactive.tint,
    },
    destructive: {
      solid: theme.colors.semantic.error,
      solidPressed: theme.colors.interactive.destructivePressed,
      text: theme.colors.semantic.error,
    },
    success: {
      solid: theme.colors.semantic.success,
      solidPressed: theme.colors.system.green,
      text: theme.colors.semantic.success,
    },
    neutral: {
      solid: theme.colors.fill.secondary,
      solidPressed: theme.colors.fill.tertiary,
      text: theme.colors.label.primary,
    },
  };

  const colors = schemeColors[colorScheme];

  switch (variant) {
    case 'filled':
      return {
        background: colors.solid,
        backgroundPressed: colors.solidPressed,
        text: '#FFFFFF', // White text on filled buttons
      };

    case 'tinted':
      // Tinted uses a light version of the color
      return {
        background:
          colorScheme === 'neutral'
            ? theme.colors.fill.secondary
            : `${colors.solid}1A`, // 10% opacity
        backgroundPressed:
          colorScheme === 'neutral'
            ? theme.colors.fill.tertiary
            : `${colors.solid}33`, // 20% opacity
        text: colorScheme === 'neutral' ? theme.colors.label.primary : colors.text,
      };

    case 'gray':
      return {
        background: theme.colors.fill.secondary,
        backgroundPressed: theme.colors.fill.tertiary,
        text: colorScheme === 'neutral' ? theme.colors.label.primary : colors.text,
      };

    case 'outlined':
      return {
        background: 'transparent',
        backgroundPressed: theme.colors.fill.quaternary,
        text: colors.text,
        border: colorScheme === 'neutral' ? theme.colors.separator.opaque : colors.solid,
      };

    case 'ghost':
      return {
        background: 'transparent',
        backgroundPressed: theme.colors.fill.quaternary,
        text: colors.text,
      };

    default:
      return {
        background: colors.solid,
        backgroundPressed: colors.solidPressed,
        text: '#FFFFFF',
      };
  }
}

/**
 * Get typography style based on size.
 */
export function getButtonTypography(size: ButtonSize, theme: Theme): TextStyle {
  const styles: Record<ButtonSize, TextStyle> = {
    sm: {
      ...theme.typography.subheadline,
      fontWeight: '600',
    },
    md: {
      ...theme.typography.body,
      fontWeight: '600',
    },
    lg: {
      ...theme.typography.body,
      fontWeight: '600',
    },
  };
  return styles[size];
}

/**
 * Create base button styles.
 */
export function createButtonStyles(theme: Theme) {
  return StyleSheet.create({
    // Base container styles
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },

    // Full width modifier
    fullWidth: {
      width: '100%',
    },

    // Icon only (square button)
    iconOnly: {
      aspectRatio: 1,
      paddingHorizontal: 0,
    },

    // Disabled state
    disabled: {
      opacity: theme.opacity.disabled,
    },

    // Loading state
    loading: {
      opacity: 0.8,
    },

    // Content container
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Text style base
    text: {
      textAlign: 'center',
    },

    // Loading indicator container
    loadingContainer: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Hidden content (when loading with center position)
    hiddenContent: {
      opacity: 0,
    },
  });
}

/**
 * Generate dynamic styles based on button props.
 */
export function getDynamicButtonStyles(
  variant: ButtonVariant,
  size: ButtonSize,
  colorScheme: ButtonColorScheme,
  pressed: boolean,
  theme: Theme
): { container: ViewStyle; text: TextStyle } {
  const colors = getButtonColors(variant, colorScheme, theme);
  const height = getButtonHeight(size, theme);
  const paddingHorizontal = getButtonPadding(size, theme);
  const borderRadius = getButtonRadius(size, theme);
  const typography = getButtonTypography(size, theme);

  const containerStyle: ViewStyle = {
    height,
    paddingHorizontal,
    borderRadius,
    backgroundColor: pressed ? colors.backgroundPressed : colors.background,
  };

  // Add border for outlined variant
  if (variant === 'outlined' && colors.border) {
    containerStyle.borderWidth = 1;
    containerStyle.borderColor = colors.border;
  }

  const textStyle: TextStyle = {
    ...typography,
    color: colors.text,
  };

  return {
    container: containerStyle,
    text: textStyle,
  };
}

/**
 * Get shadow style for elevated buttons (filled variant only).
 */
export function getButtonShadow(
  variant: ButtonVariant,
  pressed: boolean,
  theme: Theme
): ViewStyle {
  if (variant !== 'filled') {
    return {};
  }

  return pressed ? theme.shadows.none : theme.shadows.xs;
}
