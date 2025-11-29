/**
 * AugustDesignSystem - TabBar (Bottom Navigation) Component
 *
 * Bottom tab bar for main app navigation.
 * Follows iOS Human Interface Guidelines for tab bars.
 *
 * @example
 * ```tsx
 * const [activeTab, setActiveTab] = useState('home');
 *
 * <TabBar
 *   items={[
 *     { key: 'home', label: 'Home', icon: 'home' },
 *     { key: 'search', label: 'Search', icon: 'search' },
 *     { key: 'messages', label: 'Messages', icon: 'chat', badge: 5 },
 *     { key: 'profile', label: 'Profile', icon: 'person' },
 *   ]}
 *   activeKey={activeTab}
 *   onTabPress={setActiveTab}
 * />
 *
 * // With custom colors
 * <TabBar
 *   items={tabs}
 *   activeKey={activeTab}
 *   onTabPress={setActiveTab}
 *   activeColor="#FF3B30"
 *   inactiveColor="#8E8E93"
 * />
 *
 * // Without labels (icons only)
 * <TabBar
 *   items={tabs}
 *   activeKey={activeTab}
 *   onTabPress={setActiveTab}
 *   showLabels={false}
 * />
 * ```
 */

import React, { useMemo, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { Icon } from '../Icon';
import { Badge } from '../Badge';
import { createTabBarStyles } from './TabBar.styles';
import type { TabBarProps, TabBarItem, TabItemProps } from './TabBar.types';

// Spring config for animation
const SPRING_CONFIG = {
  damping: 15,
  stiffness: 200,
};

/**
 * Individual tab item component.
 */
function TabItem({
  item,
  isActive,
  activeColor,
  inactiveColor,
  showLabel,
  onPress,
  tabStyle,
  labelStyle,
}: TabItemProps): React.ReactElement {
  const { theme } = useTheme();
  const baseStyles = useMemo(() => createTabBarStyles(theme), [theme]);

  // Animation for press feedback
  const scale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.92, SPRING_CONFIG);
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, SPRING_CONFIG);
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const color = isActive ? activeColor : inactiveColor;
  const iconName = isActive && item.activeIcon ? item.activeIcon : item.icon;

  return (
    <Pressable
      style={[baseStyles.tab, item.disabled && baseStyles.tabDisabled, tabStyle]}
      onPress={item.disabled ? undefined : onPress}
      onPressIn={item.disabled ? undefined : handlePressIn}
      onPressOut={handlePressOut}
      disabled={item.disabled}
      accessibilityRole="tab"
      accessibilityLabel={item.accessibilityLabel || item.label}
      accessibilityState={{
        selected: isActive,
        disabled: item.disabled,
      }}
    >
      <Animated.View style={animatedStyle}>
        <View style={baseStyles.iconContainer}>
          <Icon name={iconName} size="lg" color={color} />

          {/* Badge */}
          {(item.badge !== undefined || item.badgeDot) && (
            <View style={baseStyles.badgeContainer}>
              <Badge
                variant={item.badgeDot ? 'dot' : 'count'}
                count={item.badge}
                size="sm"
                color="error"
              />
            </View>
          )}
        </View>

        {showLabel && (
          <Text style={[baseStyles.label, { color }, labelStyle]}>
            {item.label}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

/**
 * TabBar component for bottom navigation.
 *
 * Features:
 * - 3-5 tab items with icons and labels
 * - Badge support (count or dot)
 * - Active/inactive states with animation
 * - Safe area handling for notched devices
 * - Haptic feedback on selection
 * - Full accessibility support
 */
export function TabBar({
  // Content
  items,
  activeKey,
  onTabPress,

  // Appearance
  activeColor: activeColorProp,
  inactiveColor: inactiveColorProp,
  backgroundColor,
  showLabels = true,
  showBorder = true,

  // Behavior
  safeArea = true,
  hapticFeedback = true,

  // Accessibility
  testID,

  // Styling
  style,
  tabStyle,
  labelStyle,
}: TabBarProps): React.ReactElement {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Base styles
  const baseStyles = useMemo(() => createTabBarStyles(theme), [theme]);

  // Colors
  const activeColor = activeColorProp || theme.colors.interactive.tint;
  const inactiveColor = inactiveColorProp || theme.colors.label.secondary;

  // Trigger haptic feedback
  const triggerHaptic = useCallback(() => {
    if (!hapticFeedback) return;
    // TODO: Integrate with expo-haptics or react-native-haptic-feedback
    // Haptics.selectionAsync();
  }, [hapticFeedback]);

  // Handle tab press
  const handleTabPress = useCallback(
    (key: string) => {
      if (key !== activeKey) {
        triggerHaptic();
        onTabPress(key);
      }
    },
    [activeKey, onTabPress, triggerHaptic]
  );

  return (
    <View
      style={[
        baseStyles.container,
        showBorder && baseStyles.border,
        backgroundColor && { backgroundColor },
        safeArea && { paddingBottom: insets.bottom },
        style,
      ]}
      testID={testID}
      accessible
      accessibilityRole="tablist"
    >
      <View style={baseStyles.tabsContainer}>
        {items.map((item) => (
          <TabItem
            key={item.key}
            item={item}
            isActive={activeKey === item.key}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            showLabel={showLabels}
            onPress={() => handleTabPress(item.key)}
            tabStyle={tabStyle}
            labelStyle={labelStyle}
          />
        ))}
      </View>
    </View>
  );
}

// Set display name for debugging
TabBar.displayName = 'TabBar';
TabItem.displayName = 'TabItem';

export default TabBar;
