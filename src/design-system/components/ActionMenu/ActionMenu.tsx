/**
 * AugustDesignSystem - ActionMenu/ContextMenu Component
 *
 * Contextual menu for actions, presented as an action sheet from the bottom.
 * Follows iOS Human Interface Guidelines for context menus and action sheets.
 *
 * @example
 * ```tsx
 * // Basic action menu
 * <ActionMenu
 *   visible={showMenu}
 *   onClose={() => setShowMenu(false)}
 *   items={[
 *     { key: 'copy', label: 'Copy', icon: 'copy', onPress: handleCopy },
 *     { key: 'share', label: 'Share', icon: 'share', onPress: handleShare },
 *     { key: 'delete', label: 'Delete', icon: 'delete', destructive: true, onPress: handleDelete },
 *   ]}
 * />
 *
 * // With sections
 * <ActionMenu
 *   visible={showMenu}
 *   onClose={() => setShowMenu(false)}
 *   sections={[
 *     {
 *       key: 'actions',
 *       title: 'Actions',
 *       items: [
 *         { key: 'reply', label: 'Reply', icon: 'reply', onPress: handleReply },
 *         { key: 'forward', label: 'Forward', icon: 'forward', onPress: handleForward },
 *       ],
 *     },
 *     {
 *       key: 'danger',
 *       items: [
 *         { key: 'delete', label: 'Delete', icon: 'delete', destructive: true, onPress: handleDelete },
 *       ],
 *     },
 *   ]}
 * />
 *
 * // Using the trigger wrapper
 * <ActionMenu.Trigger items={messageActions}>
 *   <MessageBubble message={message} />
 * </ActionMenu.Trigger>
 * ```
 */

import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { View, Text, Pressable, BackHandler, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { Icon } from '../Icon';
import {
  createActionMenuStyles,
  ACTION_MENU_CONSTANTS,
} from './ActionMenu.styles';
import type {
  ActionMenuProps,
  ActionMenuItem,
  ActionMenuSection,
  ActionMenuTriggerProps,
} from './ActionMenu.types';

// Animation configuration
const ANIMATION_DURATION = 200;
const SPRING_CONFIG = {
  damping: 20,
  stiffness: 300,
};

/**
 * ActionMenu component for contextual actions.
 *
 * Features:
 * - Action sheet style presentation
 * - Grouped sections with titles
 * - Destructive action styling
 * - Cancel button
 * - Animated entrance/exit
 * - Safe area handling
 * - Hardware back button support (Android)
 */
export function ActionMenu({
  // Visibility
  visible,
  onClose,

  // Content
  items,
  sections,
  header,
  cancelLabel = 'Cancel',
  showCancel = true,

  // Behavior
  dismissOnBackdrop = true,
  dismissOnSelect = true,

  // Appearance
  backdropOpacity = ACTION_MENU_CONSTANTS.backdropOpacity,

  // Accessibility
  testID,
  accessibilityLabel,

  // Styling
  style,
  itemStyle,
}: ActionMenuProps): React.ReactElement | null {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Base styles
  const baseStyles = useMemo(() => createActionMenuStyles(theme), [theme]);

  // Animation values
  const backdropAnim = useSharedValue(0);
  const translateY = useSharedValue(300);
  const isRendered = useSharedValue(visible);

  // Update animations when visibility changes
  useEffect(() => {
    if (visible) {
      isRendered.value = true;
      backdropAnim.value = withTiming(1, { duration: ANIMATION_DURATION });
      translateY.value = withSpring(0, SPRING_CONFIG);
    } else {
      backdropAnim.value = withTiming(0, { duration: ANIMATION_DURATION });
      translateY.value = withTiming(300, { duration: ANIMATION_DURATION }, () => {
        isRendered.value = false;
      });
    }
  }, [visible, backdropAnim, translateY, isRendered]);

  // Handle hardware back button (Android)
  useEffect(() => {
    if (!visible || Platform.OS !== 'android') return;

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });

    return () => backHandler.remove();
  }, [visible, onClose]);

  // Animated backdrop style
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropAnim.value * backdropOpacity,
  }));

  // Animated menu style
  const menuStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Handle backdrop press
  const handleBackdropPress = useCallback(() => {
    if (dismissOnBackdrop) {
      onClose();
    }
  }, [dismissOnBackdrop, onClose]);

  // Handle item press
  const handleItemPress = useCallback(
    (item: ActionMenuItem) => {
      if (item.disabled) return;

      item.onPress();

      if (dismissOnSelect) {
        onClose();
      }
    },
    [dismissOnSelect, onClose]
  );

  // Render menu item
  const renderItem = (item: ActionMenuItem, showSeparator: boolean) => (
    <React.Fragment key={item.key}>
      <Pressable
        style={({ pressed }) => [
          baseStyles.item,
          item.disabled && baseStyles.itemDisabled,
          pressed && { backgroundColor: theme.colors.fill.quaternary },
          itemStyle,
        ]}
        onPress={() => handleItemPress(item)}
        disabled={item.disabled}
        accessibilityRole="menuitem"
        accessibilityLabel={item.accessibilityLabel || item.label}
        accessibilityState={{ disabled: item.disabled }}
      >
        {item.icon && (
          <View style={baseStyles.itemIconContainer}>
            <Icon
              name={item.icon}
              size="md"
              color={
                item.destructive
                  ? theme.colors.semantic.error
                  : theme.colors.label.primary
              }
            />
          </View>
        )}
        <Text
          style={[
            baseStyles.itemText,
            item.destructive && baseStyles.itemTextDestructive,
          ]}
        >
          {item.label}
        </Text>
      </Pressable>
      {showSeparator && <View style={baseStyles.itemSeparator} />}
    </React.Fragment>
  );

  // Render section
  const renderSection = (section: ActionMenuSection, isLast: boolean) => (
    <React.Fragment key={section.key}>
      {section.title && (
        <View style={baseStyles.sectionHeader}>
          <Text style={baseStyles.sectionHeaderText}>{section.title}</Text>
        </View>
      )}
      {section.items.map((item, index) =>
        renderItem(item, index < section.items.length - 1)
      )}
      {!isLast && <View style={baseStyles.itemSeparator} />}
    </React.Fragment>
  );

  // Render menu items
  const renderMenuItems = () => {
    if (sections) {
      return sections.map((section, index) =>
        renderSection(section, index === sections.length - 1)
      );
    }

    if (items) {
      return items.map((item, index) =>
        renderItem(item, index < items.length - 1)
      );
    }

    return null;
  };

  // Don't render if not visible
  if (!visible && !isRendered.value) {
    return null;
  }

  return (
    <View style={baseStyles.overlay} pointerEvents={visible ? 'auto' : 'none'}>
      {/* Backdrop */}
      <Animated.View style={[baseStyles.backdrop, backdropStyle]}>
        <Pressable
          style={{ flex: 1 }}
          onPress={handleBackdropPress}
          accessibilityRole="button"
          accessibilityLabel="Close menu"
        />
      </Animated.View>

      {/* Menu */}
      <Animated.View
        style={[
          baseStyles.container,
          { paddingBottom: insets.bottom || theme.spacing.md },
          menuStyle,
          style,
        ]}
        testID={testID}
        accessible
        accessibilityRole="menu"
        accessibilityLabel={accessibilityLabel || 'Action menu'}
      >
        {/* Main menu card */}
        <View style={baseStyles.menuCard}>
          {header && <View style={baseStyles.header}>{header}</View>}
          {renderMenuItems()}
        </View>

        {/* Cancel button (separate card) */}
        {showCancel && (
          <View style={baseStyles.cancelCard}>
            <Pressable
              style={({ pressed }) => [
                baseStyles.cancelButton,
                pressed && { backgroundColor: theme.colors.fill.quaternary },
              ]}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel={cancelLabel}
            >
              <Text style={baseStyles.cancelText}>{cancelLabel}</Text>
            </Pressable>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

/**
 * ActionMenu.Trigger - Wrapper component that shows menu on long press.
 */
function ActionMenuTrigger({
  children,
  items,
  sections,
  onOpen,
  onClose: onCloseProp,
  disabled = false,
  delayLongPress = 500,
}: ActionMenuTriggerProps): React.ReactElement {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLongPress = useCallback(() => {
    if (disabled) return;
    setMenuVisible(true);
    onOpen?.();
  }, [disabled, onOpen]);

  const handleClose = useCallback(() => {
    setMenuVisible(false);
    onCloseProp?.();
  }, [onCloseProp]);

  return (
    <>
      <Pressable
        onLongPress={handleLongPress}
        delayLongPress={delayLongPress}
        disabled={disabled}
      >
        {children}
      </Pressable>

      <ActionMenu
        visible={menuVisible}
        onClose={handleClose}
        items={items}
        sections={sections}
      />
    </>
  );
}

// Attach Trigger subcomponent
ActionMenu.Trigger = ActionMenuTrigger;

// Set display names
ActionMenu.displayName = 'ActionMenu';
ActionMenuTrigger.displayName = 'ActionMenu.Trigger';

export default ActionMenu;
