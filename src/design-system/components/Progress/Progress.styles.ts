/**
 * AugustDesignSystem - Progress Component Styles
 *
 * Style definitions for the progress indicator component.
 */

import { StyleSheet } from 'react-native';
import type { Theme } from '../../types';
import type {
  ProgressSize,
  ProgressColor,
  LinearProgressSizeConfig,
  CircularProgressSizeConfig,
} from './Progress.types';

/**
 * Linear progress size configurations.
 */
export const LINEAR_SIZES: Record<ProgressSize, LinearProgressSizeConfig> = {
  sm: {
    height: 2,
    borderRadius: 1,
  },
  md: {
    height: 4,
    borderRadius: 2,
  },
  lg: {
    height: 8,
    borderRadius: 4,
  },
};

/**
 * Circular progress size configurations.
 */
export const CIRCULAR_SIZES: Record<ProgressSize, CircularProgressSizeConfig> = {
  sm: {
    size: 24,
    strokeWidth: 2,
    fontSize: 8,
  },
  md: {
    size: 40,
    strokeWidth: 3,
    fontSize: 11,
  },
  lg: {
    size: 64,
    strokeWidth: 4,
    fontSize: 14,
  },
};

/**
 * Get linear progress size configuration.
 */
export function getLinearSize(size: ProgressSize): LinearProgressSizeConfig {
  return LINEAR_SIZES[size];
}

/**
 * Get circular progress size configuration.
 */
export function getCircularSize(size: ProgressSize): CircularProgressSizeConfig {
  return CIRCULAR_SIZES[size];
}

/**
 * Get progress color from color scheme.
 */
export function getProgressColor(color: ProgressColor, theme: Theme): string {
  const colorMap: Record<ProgressColor, string> = {
    primary: theme.colors.interactive.tint,
    success: theme.colors.semantic.success,
    warning: theme.colors.semantic.warning,
    error: theme.colors.semantic.error,
    info: theme.colors.semantic.info,
  };
  return colorMap[color];
}

/**
 * Get background track color.
 */
export function getBackgroundColor(theme: Theme): string {
  return theme.colors.fill.secondary;
}

/**
 * Create base styles for the Progress component.
 */
export function createProgressStyles(theme: Theme) {
  return StyleSheet.create({
    // Linear progress container
    linearContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },

    // Linear track (background)
    linearTrack: {
      flex: 1,
      overflow: 'hidden',
    },

    // Linear fill (progress)
    linearFill: {
      height: '100%',
    },

    // Linear label
    linearLabel: {
      marginLeft: theme.spacing.sm,
      ...theme.typography.caption1,
      color: theme.colors.label.secondary,
    },

    // Circular container
    circularContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    // Circular SVG container
    circularSvg: {
      transform: [{ rotate: '-90deg' }],
    },

    // Circular label container (centered)
    circularLabelContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },

    // Circular label text
    circularLabel: {
      fontWeight: '600',
      color: theme.colors.label.primary,
    },
  });
}

/**
 * Calculate SVG circle parameters.
 */
export function calculateCircleParams(size: ProgressSize) {
  const config = CIRCULAR_SIZES[size];
  const radius = (config.size - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return {
    size: config.size,
    strokeWidth: config.strokeWidth,
    radius,
    circumference,
    center: config.size / 2,
    fontSize: config.fontSize,
  };
}
