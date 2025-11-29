/**
 * AugustDesignSystem - StatusBadge Component
 *
 * A presence status indicator component following Apple Human Interface Guidelines.
 * Used to display online/offline status for users in chat applications.
 *
 * @example
 * ```tsx
 * // Simple online indicator
 * <StatusBadge status="online" />
 *
 * // With text label
 * <StatusBadge status="online" label="Online" />
 *
 * // Offline with last seen text
 * <StatusBadge status="offline" label="Last seen 5 min ago" />
 *
 * // Bordered dot for avatar overlay
 * <StatusBadge status="online" showBorder dotOnly />
 *
 * // Large size for profile headers
 * <StatusBadge status="online" size="lg" label="Active now" />
 * ```
 */

import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@theme';
import type { StatusBadgeProps } from './StatusBadge.types';
import {
  createStatusBadgeStyles,
  getDynamicStatusBadgeStyles,
} from './StatusBadge.styles';

/**
 * StatusBadge component for displaying user presence status.
 *
 * Features:
 * - Four status types (online, offline, away, busy)
 * - Three sizes (sm, md, lg)
 * - Optional text label
 * - Border support for avatar overlays
 * - Full accessibility support
 */
export function StatusBadge({
  // Content
  status = 'offline',
  label,

  // Visual style
  size = 'md',
  dotOnly = false,
  showBorder = false,

  // Accessibility
  testID,
  accessibilityLabel,

  // Styling
  style,
  dotStyle,
  labelStyle,
}: StatusBadgeProps): React.ReactElement {
  const { theme } = useTheme();

  // Create base styles
  const baseStyles = useMemo(
    () => createStatusBadgeStyles(theme),
    [theme]
  );

  // Get dynamic styles based on props
  const dynamicStyles = useMemo(
    () => getDynamicStatusBadgeStyles(status, size, showBorder, theme),
    [status, size, showBorder, theme]
  );

  // Compute accessibility label
  const computedAccessibilityLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    if (label) return label;

    const statusLabels: Record<string, string> = {
      online: 'Online',
      offline: 'Offline',
      away: 'Away',
      busy: 'Busy',
    };
    return statusLabels[status];
  }, [accessibilityLabel, label, status]);

  const showLabel = !dotOnly && label;

  return (
    <View
      testID={testID}
      style={[baseStyles.container, style]}
      accessibilityLabel={computedAccessibilityLabel}
      accessibilityRole="text"
    >
      {/* Status indicator dot */}
      <View
        style={[
          baseStyles.dot,
          dynamicStyles.dot,
          showBorder && baseStyles.dotBordered,
          dotStyle,
        ]}
        testID={testID ? `${testID}-dot` : undefined}
      />

      {/* Optional text label */}
      {showLabel && (
        <Text
          style={[
            baseStyles.label,
            baseStyles.labelSpacing,
            dynamicStyles.label,
            labelStyle,
          ]}
          numberOfLines={1}
          testID={testID ? `${testID}-label` : undefined}
        >
          {label}
        </Text>
      )}
    </View>
  );
}

// Set display name for debugging
StatusBadge.displayName = 'StatusBadge';