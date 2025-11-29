/**
 * AugustDesignSystem - Switch Component Styles
 *
 * Style definitions for the iOS-style toggle switch.
 * Follows Apple HIG dimensions: 51x31 for standard switch.
 */

import { StyleSheet } from 'react-native';
import type { Theme } from '../../types';
import type { SwitchSize, SwitchSizeConfig } from './Switch.types';

/**
 * Size configurations for switch variants.
 * Standard iOS switch is 51x31 with 27pt thumb.
 */
export const SWITCH_SIZES: Record<SwitchSize, SwitchSizeConfig> = {
  sm: {
    trackWidth: 40,
    trackHeight: 24,
    thumbSize: 20,
    trackPadding: 2,
  },
  md: {
    trackWidth: 51,
    trackHeight: 31,
    thumbSize: 27,
    trackPadding: 2,
  },
};

/**
 * Get size configuration for a switch size variant.
 */
export function getSwitchSize(size: SwitchSize): SwitchSizeConfig {
  return SWITCH_SIZES[size];
}

/**
 * Calculate thumb position when off.
 */
export function getThumbOffPosition(size: SwitchSize): number {
  const config = SWITCH_SIZES[size];
  return config.trackPadding;
}

/**
 * Calculate thumb position when on.
 */
export function getThumbOnPosition(size: SwitchSize): number {
  const config = SWITCH_SIZES[size];
  return config.trackWidth - config.thumbSize - config.trackPadding;
}

/**
 * Create base styles for the Switch component.
 */
export function createSwitchStyles(theme: Theme) {
  return StyleSheet.create({
    // Container for hit area
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    // Track (background pill shape)
    track: {
      justifyContent: 'center',
      borderRadius: 999, // Fully rounded
    },

    // Track disabled state
    trackDisabled: {
      opacity: theme.opacity.disabled,
    },

    // Thumb (circular knob)
    thumb: {
      position: 'absolute',
      borderRadius: 999,
      backgroundColor: '#FFFFFF',
      // iOS-style shadow for thumb
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },

    // Thumb pressed state (slightly larger)
    thumbPressed: {
      transform: [{ scale: 1.05 }],
    },
  });
}

/**
 * Get track colors for on/off states.
 */
export function getTrackColors(
  theme: Theme,
  trackColorOn?: string,
  trackColorOff?: string
) {
  return {
    on: trackColorOn || theme.colors.interactive.tint,
    off: trackColorOff || theme.colors.fill.primary,
  };
}
