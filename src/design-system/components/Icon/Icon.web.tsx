/**
 * AugustDesignSystem - Icon Component (Web Version)
 *
 * Uses Material Icons CSS font for web compatibility.
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { getPlatformIconName, isCommonIconName } from './iconMap';
import { getIconSize, getIconColor, createIconStyles } from './Icon.styles';
import type { IconProps } from './Icon.types';

/**
 * Icon component for web platform using Material Icons CSS font.
 */
export function Icon({
  name,
  children,
  size = 'md',
  color = 'primary',
  testID,
  accessibilityLabel,
  accessibilityHidden = true,
  style,
}: IconProps): React.ReactElement | null {
  const { theme } = useTheme();

  const resolvedSize = useMemo(() => getIconSize(size), [size]);
  const resolvedColor = useMemo(() => getIconColor(color, theme), [color, theme]);
  const baseStyles = useMemo(() => createIconStyles(theme), [theme]);

  const platformIconName = useMemo(() => {
    if (!name) return null;
    if (isCommonIconName(name)) {
      return getPlatformIconName(name, 'android');
    }
    return name;
  }, [name]);

  const accessibilityProps = useMemo(
    () => ({
      accessible: !accessibilityHidden,
      accessibilityRole: 'image' as const,
      accessibilityLabel: accessibilityLabel,
    }),
    [accessibilityLabel, accessibilityHidden]
  );

  if (children) {
    return (
      <View
        style={[baseStyles.container, { width: resolvedSize, height: resolvedSize }, style]}
        testID={testID}
        {...accessibilityProps}
      >
        {children}
      </View>
    );
  }

  if (!platformIconName) {
    return null;
  }

  // Convert icon name to Material Icons format (snake_case)
  const materialIconName = platformIconName.replace(/-/g, '_');

  return (
    <View style={[baseStyles.container, style]} testID={testID} {...accessibilityProps}>
      <Text
        style={[
          styles.icon,
          {
            fontSize: resolvedSize,
            color: resolvedColor,
            width: resolvedSize,
            height: resolvedSize,
            lineHeight: resolvedSize,
          },
        ]}
        selectable={false}
      >
        {materialIconName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'Material Icons',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'center',
    // @ts-ignore - web-specific properties
    fontFeatureSettings: "'liga'",
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
});

Icon.displayName = 'Icon';

export default Icon;
