/**
 * AugustDesignSystem - UnreadBadge Component
 *
 * A badge component for displaying unread message counts following Apple Human Interface Guidelines.
 * Used in conversation lists and chat notifications.
 *
 * @example
 * ```tsx
 * // Basic unread count
 * <UnreadBadge count={5} />
 *
 * // Large count (shows "99+")
 * <UnreadBadge count={150} />
 *
 * // Small size for compact layouts
 * <UnreadBadge count={3} size="sm" />
 *
 * // Destructive color for urgent messages
 * <UnreadBadge count={10} colorScheme="destructive" />
 *
 * // Dot-only mode for minimal indication
 * <UnreadBadge count={1} dot />
 *
 * // Custom max count
 * <UnreadBadge count={500} maxCount={999} />
 * ```
 */

import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@theme';
import type { UnreadBadgeProps } from './UnreadBadge.types';
import {
  createUnreadBadgeStyles,
  getDynamicUnreadBadgeStyles,
  formatCount,
} from './UnreadBadge.styles';

/**
 * UnreadBadge component for displaying unread message counts.
 *
 * Features:
 * - Automatic overflow handling (99+ by default)
 * - Three sizes (sm, md, lg)
 * - Three color schemes (primary, destructive, neutral)
 * - Dot-only mode for minimal indication
 * - Full accessibility support
 */
export function UnreadBadge({
  // Content
  count = 0,
  maxCount = 99,

  // Visual style
  size = 'md',
  colorScheme = 'primary',
  dot = false,

  // Accessibility
  testID,
  accessibilityLabel,

  // Styling
  style,
  textStyle,
}: UnreadBadgeProps): React.ReactElement | null {
  const { theme } = useTheme();

  // Don't render if count is 0 or less
  if (count <= 0) {
    return null;
  }

  // Create base styles
  const baseStyles = useMemo(
    () => createUnreadBadgeStyles(theme),
    [theme]
  );

  // Get dynamic styles based on props
  const dynamicStyles = useMemo(
    () => getDynamicUnreadBadgeStyles(size, colorScheme, dot, theme),
    [size, colorScheme, dot, theme]
  );

  // Format the count for display
  const displayCount = useMemo(
    () => formatCount(count, maxCount),
    [count, maxCount]
  );

  // Compute accessibility label
  const computedAccessibilityLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    if (count === 1) return '1 unread message';
    return `${count} unread messages`;
  }, [accessibilityLabel, count]);

  return (
    <View
      testID={testID}
      style={[baseStyles.container, dynamicStyles.container, style]}
      accessibilityLabel={computedAccessibilityLabel}
      accessibilityRole="text"
    >
      {!dot && (
        <Text
          style={[baseStyles.text, dynamicStyles.text, textStyle]}
          numberOfLines={1}
          testID={testID ? `${testID}-count` : undefined}
        >
          {displayCount}
        </Text>
      )}
    </View>
  );
}

// Set display name for debugging
UnreadBadge.displayName = 'UnreadBadge';
