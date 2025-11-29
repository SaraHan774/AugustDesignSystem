/**
 * AugustDesignSystem - Divider Component Styles
 *
 * Style utilities for the Divider component.
 */

import { StyleSheet } from 'react-native';
import type { Theme } from '../../types';

/**
 * Create base styles for Divider component.
 */
export function createDividerStyles(theme: Theme) {
  return StyleSheet.create({
    // Container for horizontal divider
    containerHorizontal: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },

    // Container for vertical divider
    containerVertical: {
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'stretch',
    },

    // Base line style
    line: {
      backgroundColor: theme.colors.separator.nonOpaque,
    },

    // Horizontal line
    lineHorizontal: {
      height: StyleSheet.hairlineWidth,
      flex: 1,
    },

    // Vertical line
    lineVertical: {
      width: StyleSheet.hairlineWidth,
      flex: 1,
    },

    // Label container (for withLabel variant)
    labelContainer: {
      paddingHorizontal: theme.spacing.md,
    },

    // Label text
    labelText: {
      ...theme.typography.caption1,
      color: theme.colors.label.tertiary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
  });
}

/**
 * Get dynamic styles based on variant and props.
 */
export function getDynamicDividerStyles(
  variant: 'full' | 'inset' | 'middle' | 'withLabel',
  orientation: 'horizontal' | 'vertical',
  insetLeft: number,
  insetRight: number,
  spacing: number,
  thickness: number,
  color: string | undefined,
  theme: Theme
) {
  const styles: any = {
    container: {},
    line: {
      backgroundColor: color || theme.colors.separator.nonOpaque,
    },
  };

  // Apply thickness
  if (orientation === 'horizontal') {
    styles.line.height = thickness;
  } else {
    styles.line.width = thickness;
  }

  // Apply spacing
  if (spacing > 0) {
    if (orientation === 'horizontal') {
      styles.container.marginVertical = spacing;
    } else {
      styles.container.marginHorizontal = spacing;
    }
  }

  // Apply variant-specific styles
  if (orientation === 'horizontal') {
    switch (variant) {
      case 'inset':
        styles.container.paddingLeft = insetLeft;
        break;
      case 'middle':
        styles.container.paddingLeft = insetLeft;
        styles.container.paddingRight = insetRight;
        break;
      case 'withLabel':
        // Label variant uses flex for layout, no padding needed
        break;
      case 'full':
      default:
        // No padding for full width
        break;
    }
  }

  return styles;
}