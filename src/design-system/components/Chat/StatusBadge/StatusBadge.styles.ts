/**
 * AugustDesignSystem - StatusBadge Component Styles
 *
 * Style definitions for the StatusBadge component following Apple HIG.
 */

import { StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import type { Theme } from '@types';
import type { PresenceStatus, StatusBadgeSize } from './StatusBadge.types';

/**
 * Chat-specific color tokens for status indicators.
 * These extend the base theme with chat-specific semantics.
 */
export function getChatStatusColors(theme: Theme) {
  return {
    online: theme.colors.semantic.success,
    offline: theme.colors.system.gray,
    away: theme.colors.semantic.warning,
    busy: theme.colors.semantic.error,
  };
}

/**
 * Get dot size based on size prop.
 */
export function getDotSize(size: StatusBadgeSize): number {
  const sizes: Record<StatusBadgeSize, number> = {
    sm: 8,
    md: 10,
    lg: 12,
  };
  return sizes[size];
}

/**
 * Get border width for bordered dots.
 */
export function getDotBorderWidth(size: StatusBadgeSize): number {
  const widths: Record<StatusBadgeSize, number> = {
    sm: 1.5,
    md: 2,
    lg: 2.5,
  };
  return widths[size];
}

/**
 * Get status color based on presence status.
 */
export function getStatusColor(status: PresenceStatus, theme: Theme): string {
  const statusColors = getChatStatusColors(theme);
  return statusColors[status];
}

/**
 * Create base StatusBadge styles.
 */
export function createStatusBadgeStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    dot: {
      borderRadius: 9999, // Fully rounded
    },

    dotBordered: {
      borderColor: theme.colors.background.primary,
    },

    label: {
      ...theme.typography.caption1,
      color: theme.colors.label.secondary,
    },

    // Gap between dot and label
    labelSpacing: {
      marginLeft: theme.spacing.xs,
    },
  });
}

/**
 * Generate dynamic styles based on StatusBadge props.
 */
export function getDynamicStatusBadgeStyles(
  status: PresenceStatus,
  size: StatusBadgeSize,
  showBorder: boolean,
  theme: Theme
): { dot: ViewStyle; label: TextStyle } {
  const dotSize = getDotSize(size);
  const statusColor = getStatusColor(status, theme);
  const borderWidth = showBorder ? getDotBorderWidth(size) : 0;

  const dotStyle: ViewStyle = {
    width: dotSize,
    height: dotSize,
    backgroundColor: statusColor,
    borderRadius: dotSize / 2,
  };

  if (showBorder) {
    dotStyle.borderWidth = borderWidth;
    dotStyle.borderColor = theme.colors.background.primary;
    // Adjust size to account for border
    dotStyle.width = dotSize + borderWidth * 2;
    dotStyle.height = dotSize + borderWidth * 2;
  }

  const labelStyle: TextStyle = {
    color: theme.colors.label.secondary,
  };

  return {
    dot: dotStyle,
    label: labelStyle,
  };
}