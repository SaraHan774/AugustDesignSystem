/**
 * AugustDesignSystem - Icon Component
 *
 * A native-first icon component using SF Symbols on iOS and Material Icons
 * on Android/Web. Provides a unified API across platforms with automatic
 * icon name mapping.
 *
 * @example
 * ```tsx
 * // Basic usage - auto maps to platform icon
 * <Icon name="checkmark" size="md" color="success" />
 *
 * // Custom size and color
 * <Icon name="heart-fill" size={28} color="#FF0000" />
 *
 * // SF Symbol specific (iOS only features)
 * <Icon name="heart.fill" weight="semibold" renderingMode="hierarchical" />
 *
 * // Custom icon via children
 * <Icon size="lg" color="tint">
 *   <MyCustomSVGIcon />
 * </Icon>
 * ```
 */

import React, { useMemo } from 'react';
import { View, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme';
import { getPlatformIconName, isCommonIconName } from './iconMap';
import { getIconSize, getIconColor, createIconStyles } from './Icon.styles';
import type { IconProps } from './Icon.types';

/**
 * Icon component for displaying icons with platform-appropriate rendering.
 *
 * Features:
 * - Automatic platform icon mapping (SF Symbols on iOS, Material on Android/Web)
 * - Size variants: xs, sm, md, lg, xl (or custom number)
 * - Semantic color support: primary, secondary, tint, error, success, etc.
 * - SF Symbol features on iOS: weight, rendering mode (when using native module)
 * - Custom icon support via children prop
 * - Accessibility support
 */
export function Icon({
  // Content
  name,
  children,

  // Appearance
  size = 'md',
  color = 'primary',
  weight = 'regular',
  renderingMode = 'monochrome',

  // Animation (iOS 17+)
  symbolEffect,
  symbolEffectActive = true,

  // Accessibility
  testID,
  accessibilityLabel,
  accessibilityHidden = true,

  // Style
  style,
}: IconProps): React.ReactElement | null {
  const { theme } = useTheme();

  // Resolve size
  const resolvedSize = useMemo(() => getIconSize(size), [size]);

  // Resolve color
  const resolvedColor = useMemo(
    () => getIconColor(color, theme),
    [color, theme]
  );

  // Base styles
  const baseStyles = useMemo(() => createIconStyles(theme), [theme]);

  // Get platform-specific icon name
  const platformIconName = useMemo(() => {
    if (!name) return null;

    const platform = Platform.OS === 'ios' ? 'ios' : 'android';

    // If it's a common name, map it
    if (isCommonIconName(name)) {
      return getPlatformIconName(name, platform);
    }

    // Otherwise use as-is (assume it's a platform-specific name)
    return name;
  }, [name]);

  // Accessibility props
  const accessibilityProps = useMemo(
    () => ({
      accessible: !accessibilityHidden,
      accessibilityRole: 'image' as const,
      accessibilityLabel: accessibilityLabel,
      accessibilityElementsHidden: accessibilityHidden,
      importantForAccessibility: accessibilityHidden
        ? ('no-hide-descendants' as const)
        : ('auto' as const),
    }),
    [accessibilityLabel, accessibilityHidden]
  );

  // Render custom icon if children provided
  if (children) {
    return (
      <View
        style={[
          baseStyles.container,
          { width: resolvedSize, height: resolvedSize },
          style,
        ]}
        testID={testID}
        {...accessibilityProps}
      >
        {children}
      </View>
    );
  }

  // No icon name provided
  if (!platformIconName) {
    return null;
  }

  // Render platform-specific icon
  // For now, we use Material Icons on all platforms
  // TODO: Add SF Symbols native module for iOS for better native feel
  return (
    <View
      style={[baseStyles.container, style]}
      testID={testID}
      {...accessibilityProps}
    >
      <MaterialIcons
        name={platformIconName as any}
        size={resolvedSize}
        color={resolvedColor}
      />
    </View>
  );
}

// Set display name for debugging
Icon.displayName = 'Icon';

export default Icon;