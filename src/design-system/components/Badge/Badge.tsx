/**
 * AugustDesignSystem - Badge Component
 *
 * A versatile badge component for counts, dots, and labels.
 * Can be used standalone or as an overlay on other elements.
 *
 * @example
 * ```tsx
 * // Count badge (standalone)
 * <Badge count={5} />
 *
 * // Count badge with max overflow
 * <Badge count={150} maxCount={99} /> // Shows "99+"
 *
 * // Dot badge (indicator only)
 * <Badge variant="dot" color="error" />
 *
 * // Label badge
 * <Badge variant="label" label="New" color="primary" />
 *
 * // Badge wrapping an icon (overlay)
 * <Badge count={3} position="top-right">
 *   <Icon name="bell" size="lg" />
 * </Badge>
 *
 * // Different colors
 * <Badge count={5} color="success" />
 * <Badge count={5} color="warning" />
 * ```
 */

import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import {
  createBadgeStyles,
  getDynamicBadgeStyles,
  getBadgePositionStyle,
} from './Badge.styles';
import type { BadgeProps } from './Badge.types';

// Spring config for entrance animation
const SPRING_CONFIG = {
  damping: 15,
  stiffness: 200,
};

/**
 * Badge component for notifications, counts, and status indicators.
 *
 * Features:
 * - Count variant with max overflow (99+)
 * - Dot variant for simple indicators
 * - Label variant for text badges
 * - Position anchoring when wrapping children
 * - Multiple color schemes
 * - Two size variants
 */
export function Badge({
  // Content
  variant = 'count',
  count = 0,
  label,
  maxCount = 99,
  showZero = false,

  // Appearance
  color = 'error',
  size = 'md',
  visible = true,

  // Positioning
  children,
  position = 'top-right',
  offset,

  // Accessibility
  testID,
  accessibilityLabel,

  // Styling
  style,
  textStyle,
  containerStyle,
}: BadgeProps): React.ReactElement | null {
  const { theme } = useTheme();

  // Animation value for entrance
  const scale = useSharedValue(visible ? 1 : 0);

  // Update animation when visibility changes
  React.useEffect(() => {
    scale.value = withSpring(visible ? 1 : 0, SPRING_CONFIG);
  }, [visible, scale]);

  // Base styles
  const baseStyles = useMemo(() => createBadgeStyles(theme), [theme]);

  // Dynamic styles based on props
  const dynamicStyles = useMemo(
    () => getDynamicBadgeStyles(size, color, theme),
    [size, color, theme]
  );

  // Position styles for overlay mode
  const positionStyles = useMemo(
    () => (children ? getBadgePositionStyle(position, offset) : {}),
    [children, position, offset]
  );

  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  // Determine if badge should be shown
  const shouldShow = useMemo(() => {
    if (!visible) return false;
    if (variant === 'dot') return true;
    if (variant === 'label') return !!label;
    // Count variant
    return count > 0 || showZero;
  }, [visible, variant, count, showZero, label]);

  // Format count display
  const displayCount = useMemo(() => {
    if (variant !== 'count') return '';
    if (count > maxCount) return `${maxCount}+`;
    return String(count);
  }, [variant, count, maxCount]);

  // Computed accessibility label
  const computedAccessibilityLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    if (variant === 'count') {
      return count > maxCount
        ? `More than ${maxCount} notifications`
        : `${count} notifications`;
    }
    if (variant === 'label') return label;
    return 'Notification indicator';
  }, [accessibilityLabel, variant, count, maxCount, label]);

  // Render the badge content
  const renderBadge = () => {
    if (!shouldShow) return null;

    // Dot variant
    if (variant === 'dot') {
      return (
        <Animated.View
          style={[
            baseStyles.dot,
            dynamicStyles.dot,
            !!children && baseStyles.badgeOverlay,
            !!children && positionStyles,
            animatedStyle,
            style,
          ]}
          testID={testID}
          accessible
          accessibilityRole="text"
          accessibilityLabel={computedAccessibilityLabel}
        />
      );
    }

    // Count or Label variant
    return (
      <Animated.View
        style={[
          baseStyles.badge,
          dynamicStyles.badge,
          !!children && baseStyles.badgeOverlay,
          !!children && positionStyles,
          animatedStyle,
          style,
        ]}
        testID={testID}
        accessible
        accessibilityRole="text"
        accessibilityLabel={computedAccessibilityLabel}
      >
        <Text
          style={[baseStyles.text, dynamicStyles.text, textStyle]}
          numberOfLines={1}
        >
          {variant === 'label' ? label : displayCount}
        </Text>
      </Animated.View>
    );
  };

  // If no children, render badge standalone
  if (!children) {
    return renderBadge();
  }

  // Render badge as overlay on children
  return (
    <View style={[baseStyles.wrapper, containerStyle]}>
      {children}
      {renderBadge()}
    </View>
  );
}

// Set display name for debugging
Badge.displayName = 'Badge';

export default Badge;
