/**
 * AugustDesignSystem - Divider Component
 *
 * A visual separator component for dividing content sections.
 * Follows iOS list separator patterns with support for various inset styles.
 *
 * @example
 * ```tsx
 * // Full width divider
 * <Divider />
 *
 * // Inset divider (iOS list style)
 * <Divider variant="inset" />
 *
 * // Divider with label
 * <Divider variant="withLabel" label="OR" />
 *
 * // Custom inset
 * <Divider variant="inset" insetLeft={72} />
 *
 * // Vertical divider
 * <Divider orientation="vertical" />
 * ```
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { createDividerStyles, getDynamicDividerStyles } from './Divider.styles';
import type { DividerProps } from './Divider.types';

/**
 * Divider component for visual separation of content.
 *
 * Features:
 * - Multiple variants: full, inset, middle, withLabel
 * - Horizontal and vertical orientation
 * - Customizable thickness and color
 * - Label support for section dividers
 * - Accessibility: decorative by default
 */
export function Divider({
  // Variant & Orientation
  variant = 'full',
  orientation = 'horizontal',

  // Content
  label,

  // Appearance
  thickness = StyleSheet.hairlineWidth,
  color,
  insetLeft = 16,
  insetRight = 16,
  spacing = 0,

  // Accessibility
  testID,
  decorative = true,

  // Styling
  style,
  labelStyle,
  lineStyle,
}: DividerProps): React.ReactElement {
  const { theme } = useTheme();

  // Base styles
  const baseStyles = useMemo(() => createDividerStyles(theme), [theme]);

  // Dynamic styles
  const dynamicStyles = useMemo(
    () =>
      getDynamicDividerStyles(
        variant,
        orientation,
        insetLeft,
        insetRight,
        spacing,
        thickness,
        color,
        theme
      ),
    [variant, orientation, insetLeft, insetRight, spacing, thickness, color, theme]
  );

  // Accessibility props
  const accessibilityProps = useMemo(
    () => ({
      accessible: !decorative,
      accessibilityRole: decorative ? undefined : ('none' as const),
      accessibilityElementsHidden: decorative,
      importantForAccessibility: decorative
        ? ('no-hide-descendants' as const)
        : ('auto' as const),
    }),
    [decorative]
  );

  // Render with label
  if (variant === 'withLabel' && label && orientation === 'horizontal') {
    return (
      <View
        style={[
          baseStyles.containerHorizontal,
          dynamicStyles.container,
          style,
        ]}
        testID={testID}
        {...accessibilityProps}
      >
        <View
          style={[
            baseStyles.line,
            baseStyles.lineHorizontal,
            dynamicStyles.line,
            lineStyle,
          ]}
        />
        <View style={baseStyles.labelContainer}>
          <Text style={[baseStyles.labelText, labelStyle]}>{label}</Text>
        </View>
        <View
          style={[
            baseStyles.line,
            baseStyles.lineHorizontal,
            dynamicStyles.line,
            lineStyle,
          ]}
        />
      </View>
    );
  }

  // Render vertical divider
  if (orientation === 'vertical') {
    return (
      <View
        style={[
          baseStyles.containerVertical,
          dynamicStyles.container,
          style,
        ]}
        testID={testID}
        {...accessibilityProps}
      >
        <View
          style={[
            baseStyles.line,
            baseStyles.lineVertical,
            dynamicStyles.line,
            lineStyle,
          ]}
        />
      </View>
    );
  }

  // Render horizontal divider
  return (
    <View
      style={[
        baseStyles.containerHorizontal,
        dynamicStyles.container,
        style,
      ]}
      testID={testID}
      {...accessibilityProps}
    >
      <View
        style={[
          baseStyles.line,
          baseStyles.lineHorizontal,
          dynamicStyles.line,
          lineStyle,
        ]}
      />
    </View>
  );
}

// Set display name for debugging
Divider.displayName = 'Divider';

export default Divider;
