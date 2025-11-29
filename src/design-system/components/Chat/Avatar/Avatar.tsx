/**
 * AugustDesignSystem - Avatar Component
 *
 * A versatile avatar component following Apple Human Interface Guidelines.
 * Supports single avatars, group/stacked avatars, initials fallback, and status indicators.
 *
 * @example
 * ```tsx
 * // Basic avatar with image
 * <Avatar
 *   source={{ uri: 'https://example.com/avatar.jpg' }}
 *   name="John Doe"
 * />
 *
 * // Avatar with initials fallback
 * <Avatar name="Jane Smith" size="lg" />
 *
 * // Avatar with online status
 * <Avatar
 *   source={{ uri: 'https://example.com/avatar.jpg' }}
 *   name="John Doe"
 *   status="online"
 * />
 *
 * // Group/stacked avatars for group chat
 * <Avatar
 *   group={[
 *     { source: { uri: 'https://example.com/user1.jpg' }, name: 'User 1' },
 *     { source: { uri: 'https://example.com/user2.jpg' }, name: 'User 2' },
 *     { name: 'User 3' },
 *   ]}
 *   size="md"
 * />
 *
 * // Pressable avatar
 * <Avatar
 *   source={{ uri: 'https://example.com/avatar.jpg' }}
 *   name="John Doe"
 *   onPress={() => navigateToProfile()}
 * />
 * ```
 */

import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, Image, Pressable, type ImageSourcePropType } from 'react-native';
import { useTheme } from '@theme';
import { StatusBadge } from '../StatusBadge';
import type { AvatarProps, AvatarData } from './Avatar.types';
import {
  createAvatarStyles,
  getDynamicAvatarStyles,
  generateInitials,
  getAvatarSize,
  getStackOffset,
  getStackScale,
  getStatusOffset,
  getStatusSize,
  getGroupContainerWidth,
  getAvatarBackgroundColor,
} from './Avatar.styles';

/**
 * Avatar component for displaying user profile images.
 *
 * Features:
 * - Five sizes (xs, sm, md, lg, xl)
 * - Image with automatic initials fallback
 * - Group/stacked avatar display (up to 3)
 * - Online/offline status indicator
 * - Pressable with callback
 * - Full accessibility support
 */
export function Avatar({
  // Content
  source,
  name,
  initials,
  group,

  // Visual style
  size = 'md',
  showBorder = false,
  backgroundColor,

  // Status
  status,
  showStatus = true,

  // Events
  onPress,
  onImageError,

  // Accessibility
  testID,
  accessibilityLabel,

  // Styling
  style,
  textStyle,
  fallbackIcon,
}: AvatarProps): React.ReactElement {
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);

  // Create base styles
  const baseStyles = useMemo(
    () => createAvatarStyles(theme),
    [theme]
  );

  // Handle image load error
  const handleImageError = useCallback(() => {
    setImageError(true);
    onImageError?.();
  }, [onImageError]);

  // Check if we should render group avatars
  const isGroup = Boolean(group && group.length > 1);

  // Compute accessibility label
  const computedAccessibilityLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    if (isGroup && group) {
      const names = group.slice(0, 3).map(a => a.name).filter(Boolean).join(', ');
      return names ? `Group with ${names}` : 'Group avatar';
    }
    return name || 'Avatar';
  }, [accessibilityLabel, isGroup, group, name]);

  // Render single avatar
  const renderSingleAvatar = useCallback(
    (
      avatarSource: ImageSourcePropType | string | undefined,
      avatarName: string | undefined,
      avatarInitials: string | undefined,
      index: number = 0,
      customSize?: number,
      customStyle?: any
    ) => {
      const dynamicStyles = getDynamicAvatarStyles(
        size,
        showBorder || isGroup, // Always show border for stacked avatars
        backgroundColor,
        avatarName,
        theme
      );

      const hasImage = Boolean(avatarSource) && !imageError;
      const displayInitials = avatarInitials || generateInitials(avatarName);

      // Resolve image source
      const resolvedSource: ImageSourcePropType | undefined = typeof avatarSource === 'string'
        ? { uri: avatarSource }
        : avatarSource;

      const avatarDimension = customSize || getAvatarSize(size);

      const avatarContent = (
        <View
          style={[
            baseStyles.avatar,
            baseStyles.avatarRounded,
            dynamicStyles.avatar,
            (showBorder || isGroup) && baseStyles.avatarBordered,
            customSize && {
              width: customSize,
              height: customSize,
              borderRadius: customSize / 2,
              backgroundColor: getAvatarBackgroundColor(avatarName, theme),
            },
            customStyle,
          ]}
          testID={testID ? `${testID}-avatar-${index}` : undefined}
        >
          {hasImage && resolvedSource ? (
            <Image
              source={resolvedSource}
              style={baseStyles.image}
              resizeMode="cover"
              onError={handleImageError}
              testID={testID ? `${testID}-image-${index}` : undefined}
            />
          ) : fallbackIcon ? (
            fallbackIcon
          ) : displayInitials ? (
            <Text
              style={[
                baseStyles.initials,
                dynamicStyles.initials,
                customSize ? { fontSize: customSize * 0.4 } : undefined,
                textStyle,
              ]}
              numberOfLines={1}
              testID={testID ? `${testID}-initials-${index}` : undefined}
            >
              {displayInitials}
            </Text>
          ) : null}
        </View>
      );

      return avatarContent;
    },
    [
      size,
      showBorder,
      isGroup,
      backgroundColor,
      theme,
      imageError,
      baseStyles,
      handleImageError,
      testID,
      fallbackIcon,
      textStyle,
    ]
  );

  // Render group avatars (stacked)
  const renderGroupAvatars = useCallback(() => {
    if (!group || group.length === 0) return null;

    const avatarsToShow = group.slice(0, 3);
    const avatarSize = getAvatarSize(size);
    const scale = getStackScale(size);
    const offset = getStackOffset(size);
    const scaledSize = Math.round(avatarSize * scale);
    const containerWidth = getGroupContainerWidth(size, avatarsToShow.length);

    return (
      <View
        style={[
          baseStyles.groupContainer,
          { width: containerWidth, height: avatarSize },
        ]}
      >
        {avatarsToShow.map((avatar, index) => {
          // First avatar is in the back, last is in front
          const zIndex = avatarsToShow.length - index;
          const leftOffset = index * (scaledSize - offset * scale);

          return (
            <View
              key={index}
              style={[
                baseStyles.stackedAvatar,
                {
                  left: leftOffset,
                  zIndex,
                },
              ]}
            >
              {renderSingleAvatar(
                avatar.source,
                avatar.name,
                avatar.initials,
                index,
                index === 0 ? avatarSize : scaledSize
              )}
            </View>
          );
        })}
      </View>
    );
  }, [group, size, baseStyles, renderSingleAvatar]);

  // Render status indicator
  const renderStatus = useCallback(() => {
    if (!status || !showStatus || isGroup) return null;

    const statusOffset = getStatusOffset(size);
    const statusSize = getStatusSize(size);

    return (
      <View
        style={[
          baseStyles.statusContainer,
          {
            bottom: statusOffset.bottom,
            right: statusOffset.right,
          },
        ]}
      >
        <StatusBadge
          status={status}
          size={statusSize}
          dotOnly
          showBorder
          testID={testID ? `${testID}-status` : undefined}
        />
      </View>
    );
  }, [status, showStatus, isGroup, size, baseStyles, testID]);

  // Get dynamic styles for container
  const dynamicStyles = useMemo(
    () => getDynamicAvatarStyles(size, showBorder, backgroundColor, name, theme),
    [size, showBorder, backgroundColor, name, theme]
  );

  // Main content
  const content = (
    <View
      style={[
        baseStyles.container,
        isGroup ? { width: getGroupContainerWidth(size, group?.length || 0) } : dynamicStyles.container,
        style,
      ]}
      testID={testID}
      accessibilityLabel={computedAccessibilityLabel}
      accessibilityRole={onPress ? 'button' : 'image'}
    >
      {isGroup ? renderGroupAvatars() : renderSingleAvatar(source, name, initials)}
      {renderStatus()}
    </View>
  );

  // Wrap in Pressable if onPress is provided
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityLabel={computedAccessibilityLabel}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

// Set display name for debugging
Avatar.displayName = 'Avatar';
