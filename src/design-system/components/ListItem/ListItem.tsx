/**
 * AugustDesignSystem - ListItem Component
 *
 * Configurable list row component following iOS table view cell patterns.
 * Supports various layouts, accessories, and interactions.
 *
 * @example
 * ```tsx
 * // Basic list item
 * <ListItem title="Settings" onPress={handleSettings} />
 *
 * // With icon and disclosure indicator
 * <ListItem
 *   title="Notifications"
 *   leftIcon="bell"
 *   accessory="disclosure"
 *   onPress={handleNotifications}
 * />
 *
 * // With subtitle and value
 * <ListItem
 *   title="Language"
 *   subtitle="Select your preferred language"
 *   value="English"
 *   accessory="disclosure"
 *   size="subtitle"
 * />
 *
 * // With switch
 * <ListItem
 *   title="Push Notifications"
 *   leftIcon="bell-fill"
 *   leftIconBackground="#FF3B30"
 *   accessory="switch"
 *   switchValue={notificationsEnabled}
 *   onSwitchChange={setNotificationsEnabled}
 * />
 *
 * // Destructive action
 * <ListItem
 *   title="Delete Account"
 *   leftIcon="delete"
 *   destructive
 *   onPress={handleDelete}
 * />
 *
 * // Selected state
 * <ListItem
 *   title="Option 1"
 *   selected={selectedOption === 1}
 *   accessory={selectedOption === 1 ? 'checkmark' : 'none'}
 *   onPress={() => setSelectedOption(1)}
 * />
 * ```
 */

import React, { useMemo, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '../../theme';
import { Icon } from '../Icon';
import { Switch } from '../Switch';
import {
  createListItemStyles,
  getListItemSize,
  getSeparatorInset,
} from './ListItem.styles';
import type { ListItemProps } from './ListItem.types';

/**
 * ListItem component for configurable list rows.
 *
 * Features:
 * - Title, subtitle, and description text
 * - Left icon with optional background
 * - Multiple accessory types (disclosure, checkmark, detail, switch)
 * - Value text on right side
 * - Selected/highlighted state
 * - Destructive styling
 * - Configurable separator inset
 * - Full accessibility support
 */
export function ListItem({
  // Content
  title,
  subtitle,
  description,

  // Left Content
  leftIcon,
  leftIconColor,
  leftIconBackground,
  leftElement,

  // Right Content
  accessory = 'none',
  value,
  rightElement,
  switchValue,
  onSwitchChange,

  // Appearance
  size = 'default',
  destructive = false,
  selected = false,
  showSeparator = true,
  separatorInset = 'inset',

  // Interaction
  onPress,
  onLongPress,
  disabled = false,

  // Accessibility
  testID,
  accessibilityLabel,
  accessibilityHint,

  // Styling
  style,
  titleStyle,
  subtitleStyle,
  valueStyle,
  contentStyle,
}: ListItemProps): React.ReactElement {
  const { theme } = useTheme();

  // Base styles
  const baseStyles = useMemo(() => createListItemStyles(theme), [theme]);

  // Size configuration
  const sizeConfig = useMemo(() => getListItemSize(size), [size]);

  // Determine if there's left content
  const hasLeftContent = !!(leftIcon || leftElement);

  // Separator margin
  const separatorMargin = useMemo(
    () => getSeparatorInset(separatorInset, hasLeftContent, theme),
    [separatorInset, hasLeftContent, theme]
  );

  // Handle switch change (prevent row press when toggling switch)
  const handleSwitchChange = useCallback(
    (newValue: boolean) => {
      onSwitchChange?.(newValue);
    },
    [onSwitchChange]
  );

  // Render left content
  const renderLeft = () => {
    if (leftElement) {
      return <View style={baseStyles.leftSection}>{leftElement}</View>;
    }

    if (!leftIcon) return null;

    const iconColor = leftIconColor || (destructive ? theme.colors.semantic.error : theme.colors.interactive.tint);

    if (leftIconBackground) {
      return (
        <View style={baseStyles.leftSection}>
          <View
            style={[
              baseStyles.iconBackground,
              {
                width: sizeConfig.iconContainerSize,
                height: sizeConfig.iconContainerSize,
                backgroundColor: leftIconBackground,
              },
            ]}
          >
            <Icon name={leftIcon} size={sizeConfig.iconSize} color="#FFFFFF" />
          </View>
        </View>
      );
    }

    return (
      <View style={baseStyles.leftSection}>
        <Icon name={leftIcon} size={sizeConfig.iconSize} color={iconColor} />
      </View>
    );
  };

  // Render accessory
  const renderAccessory = () => {
    switch (accessory) {
      case 'disclosure':
        return (
          <View style={baseStyles.accessory}>
            <Icon
              name="forward-nav"
              size="sm"
              color={theme.colors.label.tertiary}
            />
          </View>
        );

      case 'checkmark':
        return (
          <View style={baseStyles.accessory}>
            <Icon
              name="checkmark"
              size="md"
              color={theme.colors.interactive.tint}
            />
          </View>
        );

      case 'detail':
        return (
          <Pressable
            style={baseStyles.accessory}
            onPress={(e) => {
              e.stopPropagation();
              // Detail button press handler could be added via props
            }}
            accessibilityRole="button"
            accessibilityLabel="More info"
          >
            <Icon
              name="info"
              size="md"
              color={theme.colors.interactive.tint}
            />
          </Pressable>
        );

      case 'switch':
        return (
          <View style={baseStyles.accessory}>
            <Switch
              value={switchValue || false}
              onValueChange={handleSwitchChange}
              disabled={disabled}
            />
          </View>
        );

      case 'custom':
        return rightElement ? (
          <View style={baseStyles.accessory}>{rightElement}</View>
        ) : null;

      case 'none':
      default:
        return null;
    }
  };

  // Render right section
  const renderRight = () => (
    <View style={baseStyles.rightSection}>
      {value && (
        <Text style={[baseStyles.value, valueStyle]} numberOfLines={1}>
          {value}
        </Text>
      )}
      {renderAccessory()}
    </View>
  );

  // Computed accessibility label
  const computedAccessibilityLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;

    const parts = [title];
    if (subtitle) parts.push(subtitle);
    if (value) parts.push(value);
    if (switchValue !== undefined) {
      parts.push(switchValue ? 'on' : 'off');
    }
    return parts.join(', ');
  }, [accessibilityLabel, title, subtitle, value, switchValue]);

  // Accessibility role
  const accessibilityRole = useMemo(() => {
    if (accessory === 'switch') return 'switch' as const;
    if (onPress) return 'button' as const;
    return undefined;
  }, [accessory, onPress]);

  // Determine if pressable
  const isPressable = !!(onPress || onLongPress);

  // Content to render inside
  const content = (
    <>
      {renderLeft()}

      <View style={[baseStyles.content, contentStyle]}>
        <Text
          style={[
            baseStyles.title,
            destructive && baseStyles.titleDestructive,
            titleStyle,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>

        {subtitle && (
          <Text style={[baseStyles.subtitle, subtitleStyle]} numberOfLines={2}>
            {subtitle}
          </Text>
        )}

        {description && (
          <Text style={baseStyles.description} numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>

      {renderRight()}
    </>
  );

  return (
    <View style={[baseStyles.container, style]} testID={testID}>
      {isPressable ? (
        <Pressable
          style={({ pressed }) => [
            baseStyles.pressable,
            { minHeight: sizeConfig.height, paddingVertical: sizeConfig.paddingVertical },
            selected && baseStyles.selected,
            disabled && baseStyles.disabled,
            pressed && { backgroundColor: theme.colors.fill.quaternary },
          ]}
          onPress={disabled ? undefined : onPress}
          onLongPress={disabled ? undefined : onLongPress}
          disabled={disabled}
          accessible
          accessibilityRole={accessibilityRole}
          accessibilityLabel={computedAccessibilityLabel}
          accessibilityHint={accessibilityHint}
          accessibilityState={{
            disabled,
            selected,
            checked: accessory === 'switch' ? switchValue : undefined,
          }}
        >
          {content}
        </Pressable>
      ) : (
        <View
          style={[
            baseStyles.pressable,
            { minHeight: sizeConfig.height, paddingVertical: sizeConfig.paddingVertical },
            selected && baseStyles.selected,
            disabled && baseStyles.disabled,
          ]}
          accessible
          accessibilityRole={accessibilityRole}
          accessibilityLabel={computedAccessibilityLabel}
          accessibilityState={{
            disabled,
            selected,
            checked: accessory === 'switch' ? switchValue : undefined,
          }}
        >
          {content}
        </View>
      )}

      {/* Separator */}
      {showSeparator && (
        <View style={[baseStyles.separator, { marginLeft: separatorMargin }]} />
      )}
    </View>
  );
}

// Set display name for debugging
ListItem.displayName = 'ListItem';

export default ListItem;
