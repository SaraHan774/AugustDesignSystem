/**
 * AugustDesignSystem - Box Component
 *
 * A fundamental layout primitive that maps design tokens to View styles.
 * Provides a convenient API for spacing, colors, and layout.
 */

import React, { useMemo, forwardRef } from 'react';
import { View, ViewStyle, type ViewProps, type DimensionValue } from 'react-native';
import type { ReactNode } from 'react';
import { useTheme } from '../../theme';

// =============================================================================
// TYPES
// =============================================================================

type SpacingValue = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | number;
type RadiusValue = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full' | number;

export interface BoxProps extends Omit<ViewProps, 'style'> {
  /**
   * Child components.
   */
  children?: ReactNode;

  /**
   * Custom style overrides.
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Whether to show component.
   * @default true
   */
  visible?: boolean;

  /**
   * Background color token path or custom color.
   * @example 'background.primary' or '#FFFFFF'
   */
  backgroundColor?: string;

  /**
   * Padding on all sides.
   */
  padding?: SpacingValue;

  /**
   * Horizontal padding.
   */
  paddingHorizontal?: SpacingValue;

  /**
   * Vertical padding.
   */
  paddingVertical?: SpacingValue;

  /**
   * Top padding.
   */
  paddingTop?: SpacingValue;

  /**
   * Right padding.
   */
  paddingRight?: SpacingValue;

  /**
   * Bottom padding.
   */
  paddingBottom?: SpacingValue;

  /**
   * Left padding.
   */
  paddingLeft?: SpacingValue;

  /**
   * Margin on all sides.
   */
  margin?: SpacingValue;

  /**
   * Horizontal margin.
   */
  marginHorizontal?: SpacingValue;

  /**
   * Vertical margin.
   */
  marginVertical?: SpacingValue;

  /**
   * Top margin.
   */
  marginTop?: SpacingValue;

  /**
   * Right margin.
   */
  marginRight?: SpacingValue;

  /**
   * Bottom margin.
   */
  marginBottom?: SpacingValue;

  /**
   * Left margin.
   */
  marginLeft?: SpacingValue;

  /**
   * Border radius.
   */
  borderRadius?: RadiusValue;

  /**
   * Flex value.
   */
  flex?: number;

  /**
   * Flex direction.
   */
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';

  /**
   * Align items.
   */
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';

  /**
   * Justify content.
   */
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

  /**
   * Gap between children (React Native 0.71+).
   */
  gap?: SpacingValue;

  /**
   * Width.
   */
  width?: DimensionValue;

  /**
   * Height.
   */
  height?: DimensionValue;

  /**
   * Min height.
   */
  minHeight?: DimensionValue;

  /**
   * Max width.
   */
  maxWidth?: DimensionValue;

  /**
   * Shadow elevation level.
   */
  shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

  /**
   * Border width.
   */
  borderWidth?: number;

  /**
   * Border color.
   */
  borderColor?: string;

  /**
   * Position type.
   */
  position?: 'relative' | 'absolute';

  /**
   * Overflow behavior.
   */
  overflow?: 'visible' | 'hidden' | 'scroll';
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Box is a fundamental layout component that provides:
 * - Direct access to spacing tokens via prop shortcuts
 * - Semantic color application
 * - Shadow presets
 * - Flexible layout options
 *
 * @example
 * ```tsx
 * // Basic usage with spacing tokens
 * <Box padding="lg" backgroundColor="background.primary">
 *   <Text>Content</Text>
 * </Box>
 *
 * // Card-like appearance
 * <Box
 *   padding="lg"
 *   borderRadius="md"
 *   shadow="sm"
 *   backgroundColor="background.primary"
 * >
 *   <Text>Card content</Text>
 * </Box>
 *
 * // Flex layout
 * <Box
 *   flexDirection="row"
 *   alignItems="center"
 *   justifyContent="space-between"
 *   gap="md"
 * >
 *   <Text>Left</Text>
 *   <Text>Right</Text>
 * </Box>
 * ```
 */
export const Box = forwardRef<View, BoxProps>(function Box(
  {
    children,
    style,
    backgroundColor,
    padding,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    margin,
    marginHorizontal,
    marginVertical,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    borderRadius,
    flex,
    flexDirection,
    alignItems,
    justifyContent,
    gap,
    width,
    height,
    minHeight,
    maxWidth,
    shadow,
    borderWidth,
    borderColor,
    position,
    overflow,
    visible = true,
    ...viewProps
  },
  ref
) {
  const { theme } = useTheme();

  // Resolve spacing value to number
  const resolveSpacing = (value: SpacingValue | undefined): number | undefined => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return value;
    return theme.spacing[value as keyof typeof theme.spacing] as number;
  };

  // Resolve radius value to number
  const resolveRadius = (value: RadiusValue | undefined): number | undefined => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return value;
    return theme.radius[value as keyof typeof theme.radius];
  };

  // Resolve background color
  const resolveBackgroundColor = (color: string | undefined): string | undefined => {
    if (!color) return undefined;

    // Check if it's a token path
    if (color.includes('.')) {
      const [group, key] = color.split('.') as [keyof typeof theme.colors, string];
      const colorGroup = theme.colors[group];
      if (colorGroup && typeof colorGroup === 'object' && key in colorGroup) {
        return (colorGroup as Record<string, string>)[key];
      }
    }

    // Return as-is (custom color)
    return color;
  };

  // Build computed styles
  const computedStyle = useMemo((): ViewStyle => {
    const styles: ViewStyle = {};

    // Background
    const bgColor = resolveBackgroundColor(backgroundColor);
    if (bgColor) styles.backgroundColor = bgColor;

    // Padding
    if (padding !== undefined) styles.padding = resolveSpacing(padding);
    if (paddingHorizontal !== undefined) styles.paddingHorizontal = resolveSpacing(paddingHorizontal);
    if (paddingVertical !== undefined) styles.paddingVertical = resolveSpacing(paddingVertical);
    if (paddingTop !== undefined) styles.paddingTop = resolveSpacing(paddingTop);
    if (paddingRight !== undefined) styles.paddingRight = resolveSpacing(paddingRight);
    if (paddingBottom !== undefined) styles.paddingBottom = resolveSpacing(paddingBottom);
    if (paddingLeft !== undefined) styles.paddingLeft = resolveSpacing(paddingLeft);

    // Margin
    if (margin !== undefined) styles.margin = resolveSpacing(margin);
    if (marginHorizontal !== undefined) styles.marginHorizontal = resolveSpacing(marginHorizontal);
    if (marginVertical !== undefined) styles.marginVertical = resolveSpacing(marginVertical);
    if (marginTop !== undefined) styles.marginTop = resolveSpacing(marginTop);
    if (marginRight !== undefined) styles.marginRight = resolveSpacing(marginRight);
    if (marginBottom !== undefined) styles.marginBottom = resolveSpacing(marginBottom);
    if (marginLeft !== undefined) styles.marginLeft = resolveSpacing(marginLeft);

    // Border radius
    if (borderRadius !== undefined) styles.borderRadius = resolveRadius(borderRadius);

    // Flex
    if (flex !== undefined) styles.flex = flex;
    if (flexDirection) styles.flexDirection = flexDirection;
    if (alignItems) styles.alignItems = alignItems;
    if (justifyContent) styles.justifyContent = justifyContent;
    if (gap !== undefined) styles.gap = resolveSpacing(gap);

    // Dimensions
    if (width !== undefined) styles.width = width;
    if (height !== undefined) styles.height = height;
    if (minHeight !== undefined) styles.minHeight = minHeight;
    if (maxWidth !== undefined) styles.maxWidth = maxWidth;

    // Shadow
    if (shadow && shadow !== 'none') {
      const shadowStyle = theme.shadows[shadow];
      Object.assign(styles, shadowStyle);
    }

    // Border
    if (borderWidth !== undefined) styles.borderWidth = borderWidth;
    if (borderColor) {
      styles.borderColor = resolveBackgroundColor(borderColor) || borderColor;
    }

    // Position
    if (position) styles.position = position;
    if (overflow) styles.overflow = overflow;

    return styles;
  }, [
    theme,
    backgroundColor,
    padding,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    margin,
    marginHorizontal,
    marginVertical,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    borderRadius,
    flex,
    flexDirection,
    alignItems,
    justifyContent,
    gap,
    width,
    height,
    minHeight,
    maxWidth,
    shadow,
    borderWidth,
    borderColor,
    position,
    overflow,
  ]);

  if (!visible) {
    return null;
  }

  return (
    <View
      ref={ref}
      style={[computedStyle, style]}
      {...viewProps}
    >
      {children}
    </View>
  );
});

export default Box;
