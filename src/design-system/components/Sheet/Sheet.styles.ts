/**
 * AugustDesignSystem - Sheet (Bottom Sheet) Component Styles
 *
 * Style definitions for the modal surface sliding up from bottom.
 */

import { StyleSheet, Dimensions } from 'react-native';
import type { Theme } from '../../types';
import type { SheetHandleConfig } from './Sheet.types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Default sheet configuration.
 */
export const SHEET_DEFAULTS = {
  borderRadius: 16,
  backdropOpacity: 0.4,
  snapPoints: {
    collapsed: 0.25,
    half: 0.5,
    expanded: 0.9,
  },
};

/**
 * Handle (drag indicator) configuration.
 */
export const HANDLE_CONFIG: SheetHandleConfig = {
  width: 36,
  height: 5,
  marginVertical: 8,
};

/**
 * Create base styles for the Sheet component.
 */
export function createSheetStyles(theme: Theme) {
  return StyleSheet.create({
    // Full screen overlay
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      zIndex: theme.zIndex.modal,
    },

    // Backdrop (semi-transparent background)
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#000000',
    },

    // Sheet container
    container: {
      backgroundColor: theme.colors.background.primary,
      borderTopLeftRadius: SHEET_DEFAULTS.borderRadius,
      borderTopRightRadius: SHEET_DEFAULTS.borderRadius,
      overflow: 'hidden',
      maxHeight: SCREEN_HEIGHT * 0.95,
    },

    // Drag handle
    handle: {
      alignItems: 'center',
      paddingVertical: HANDLE_CONFIG.marginVertical,
    },

    // Handle indicator bar
    handleBar: {
      width: HANDLE_CONFIG.width,
      height: HANDLE_CONFIG.height,
      borderRadius: HANDLE_CONFIG.height / 2,
      backgroundColor: theme.colors.fill.tertiary,
    },

    // Header section
    header: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.separator.opaque,
    },

    // Content area
    content: {
      flex: 1,
    },

    // Scrollable content
    scrollContent: {
      flexGrow: 1,
    },

    // Footer section
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.colors.separator.opaque,
      backgroundColor: theme.colors.background.primary,
    },
  });
}

/**
 * Calculate sheet height from snap point.
 */
export function getSheetHeight(
  snapPoint: number,
  screenHeight: number = SCREEN_HEIGHT
): number {
  return screenHeight * snapPoint;
}

/**
 * Get closest snap point to a given height.
 */
export function getClosestSnapPoint(
  height: number,
  snapPoints: number[],
  screenHeight: number = SCREEN_HEIGHT
): number {
  const percentage = height / screenHeight;

  let closest = snapPoints[0];
  let minDiff = Math.abs(percentage - closest);

  for (const point of snapPoints) {
    const diff = Math.abs(percentage - point);
    if (diff < minDiff) {
      minDiff = diff;
      closest = point;
    }
  }

  return closest;
}

/**
 * Determine if sheet should dismiss based on velocity and position.
 */
export function shouldDismiss(
  translateY: number,
  velocityY: number,
  sheetHeight: number,
  threshold: number = 0.5
): boolean {
  const percentageHidden = translateY / sheetHeight;
  return velocityY > 500 || percentageHidden > threshold;
}
