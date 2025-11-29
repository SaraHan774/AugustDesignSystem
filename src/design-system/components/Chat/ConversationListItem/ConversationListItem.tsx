/**
 * AugustDesignSystem - ConversationListItem Component
 *
 * A conversation list item component following Apple Human Interface Guidelines.
 * Used to display chat conversations in a list view.
 *
 * @example
 * ```tsx
 * // 1:1 conversation
 * <ConversationListItem
 *   id="conv-1"
 *   title="John Doe"
 *   subtitle="Hey, how are you doing?"
 *   timestamp={new Date()}
 *   unreadCount={3}
 *   avatarSource={{ uri: 'https://example.com/avatar.jpg' }}
 *   presenceStatus="online"
 *   onPress={() => openConversation('conv-1')}
 * />
 *
 * // Group conversation
 * <ConversationListItem
 *   id="conv-2"
 *   title="Project Team"
 *   subtitle="Alex: Meeting at 3pm"
 *   timestamp={new Date()}
 *   isGroup
 *   groupAvatars={[
 *     { source: { uri: 'https://example.com/user1.jpg' }, name: 'Alice' },
 *     { source: { uri: 'https://example.com/user2.jpg' }, name: 'Bob' },
 *     { name: 'Charlie' },
 *   ]}
 *   onPress={() => openConversation('conv-2')}
 * />
 *
 * // With typing indicator
 * <ConversationListItem
 *   id="conv-3"
 *   title="Jane Smith"
 *   isTyping
 *   timestamp={new Date()}
 *   avatarSource={{ uri: 'https://example.com/avatar.jpg' }}
 *   onPress={() => openConversation('conv-3')}
 * />
 *
 * // Matching-based conversation
 * <ConversationListItem
 *   id="conv-4"
 *   title="New Match"
 *   subtitle="Say hello!"
 *   timestamp={new Date()}
 *   matchStatus="new"
 *   avatarSource={{ uri: 'https://example.com/avatar.jpg' }}
 *   onPress={() => openConversation('conv-4')}
 * />
 * ```
 */

import React, { useMemo, useCallback } from 'react';
import { View, Text, Pressable, type PressableStateCallbackType } from 'react-native';
import { useTheme } from '@theme';
import { Avatar } from '../Avatar';
import { UnreadBadge } from '../UnreadBadge';
import type { ConversationListItemProps } from './ConversationListItem.types';
import {
  createConversationListItemStyles,
  getDynamicConversationListItemStyles,
  getMatchStatusConfig,
  formatListTimestamp,
  getMessagePreviewIcon,
} from './ConversationListItem.styles';

/**
 * ConversationListItem component for chat list display.
 *
 * Features:
 * - Single and group avatar display
 * - Online/offline status indicator
 * - Unread count badge
 * - Match status badge
 * - Typing indicator
 * - Muted/pinned indicators
 * - Timestamp formatting
 * - Full accessibility support
 */
export function ConversationListItem({
  // Content
  id,
  title,
  subtitle,
  messageType = 'text',
  messageSender,
  timestamp,
  formattedTime,

  // Avatar
  avatarSource,
  avatarName,
  isGroup = false,
  groupAvatars,
  presenceStatus,

  // Badges & Indicators
  unreadCount = 0,
  isMuted = false,
  isPinned = false,
  matchStatus,
  isTyping = false,
  typingUsers,

  // Events
  onPress,
  onLongPress,

  // Accessibility
  testID,
  accessibilityLabel,

  // Styling
  style,
  contentStyle,
  titleStyle,
  subtitleStyle,
  timestampStyle,
  isSelected = false,
}: ConversationListItemProps): React.ReactElement {
  const { theme } = useTheme();

  // Create base styles
  const baseStyles = useMemo(
    () => createConversationListItemStyles(theme),
    [theme]
  );

  // Get dynamic styles based on state
  const hasUnread = unreadCount > 0;
  const dynamicStyles = useMemo(
    () => getDynamicConversationListItemStyles(hasUnread, isMuted, isSelected, theme),
    [hasUnread, isMuted, isSelected, theme]
  );

  // Format display time
  const displayTime = useMemo(
    () => formattedTime || formatListTimestamp(timestamp),
    [formattedTime, timestamp]
  );

  // Get match status badge config
  const matchBadgeConfig = useMemo(
    () => getMatchStatusConfig(matchStatus, theme),
    [matchStatus, theme]
  );

  // Compute accessibility label
  const computedAccessibilityLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;

    let label = title;

    if (isTyping) {
      label += '. Typing';
    } else if (subtitle) {
      label += `. ${subtitle}`;
    }

    if (hasUnread) {
      label += `. ${unreadCount} unread message${unreadCount > 1 ? 's' : ''}`;
    }

    if (displayTime) {
      label += `. ${displayTime}`;
    }

    return label;
  }, [accessibilityLabel, title, subtitle, isTyping, hasUnread, unreadCount, displayTime]);

  // Get pressable style based on state
  const getPressableStyle = useCallback(
    ({ pressed }: PressableStateCallbackType) => [
      baseStyles.pressable,
      pressed && baseStyles.pressablePressed,
      isSelected && baseStyles.pressableSelected,
      dynamicStyles.pressable,
      style,
    ],
    [baseStyles, dynamicStyles, isSelected, style]
  );

  // Render avatar
  const renderAvatar = useCallback(() => {
    if (isGroup && groupAvatars && groupAvatars.length > 0) {
      return (
        <Avatar
          group={groupAvatars}
          size="md"
          testID={testID ? `${testID}-avatar` : undefined}
        />
      );
    }

    return (
      <Avatar
        source={avatarSource}
        name={avatarName || title}
        size="md"
        status={presenceStatus}
        testID={testID ? `${testID}-avatar` : undefined}
      />
    );
  }, [isGroup, groupAvatars, avatarSource, avatarName, title, presenceStatus, testID]);

  // Render subtitle content
  const renderSubtitle = useCallback(() => {
    // Show typing indicator
    if (isTyping) {
      let typingText = 'typing...';
      if (isGroup && typingUsers && typingUsers.length > 0) {
        if (typingUsers.length === 1) {
          typingText = `${typingUsers[0]} is typing...`;
        } else {
          typingText = `${typingUsers[0]} and others are typing...`;
        }
      }

      return (
        <Text style={baseStyles.typingText} numberOfLines={1} testID={testID ? `${testID}-typing` : undefined}>
          {typingText}
        </Text>
      );
    }

    // No subtitle
    if (!subtitle) return null;

    // Build subtitle with optional sender prefix and message type icon
    const icon = getMessagePreviewIcon(messageType);

    return (
      <Text
        style={[baseStyles.subtitle, dynamicStyles.subtitle, subtitleStyle]}
        numberOfLines={1}
        testID={testID ? `${testID}-subtitle` : undefined}
      >
        {messageSender && isGroup && (
          <Text style={baseStyles.senderPrefix}>{messageSender}: </Text>
        )}
        {icon}{subtitle}
      </Text>
    );
  }, [
    isTyping,
    isGroup,
    typingUsers,
    subtitle,
    messageSender,
    messageType,
    baseStyles,
    dynamicStyles,
    subtitleStyle,
    testID,
  ]);

  // Render right side content (badges, indicators)
  const renderRightContent = useCallback(() => {
    return (
      <View style={baseStyles.rightContainer}>
        {/* Timestamp */}
        {displayTime && (
          <Text
            style={[baseStyles.timestamp, dynamicStyles.timestamp, timestampStyle]}
            testID={testID ? `${testID}-time` : undefined}
          >
            {displayTime}
          </Text>
        )}

        {/* Badges row */}
        <View style={baseStyles.badgesRow}>
          {/* Muted icon */}
          {isMuted && (
            <View style={baseStyles.mutedIcon}>
              <Text style={baseStyles.mutedIconText}>🔕</Text>
            </View>
          )}

          {/* Pinned icon */}
          {isPinned && (
            <View style={baseStyles.pinnedIcon}>
              <Text style={baseStyles.pinnedIconText}>📌</Text>
            </View>
          )}

          {/* Match status badge */}
          {matchBadgeConfig && (
            <View style={[baseStyles.matchBadge, { backgroundColor: matchBadgeConfig.backgroundColor }]}>
              <Text style={[baseStyles.matchBadgeText, { color: matchBadgeConfig.color }]}>
                {matchBadgeConfig.label}
              </Text>
            </View>
          )}

          {/* Unread badge */}
          {hasUnread && !isMuted && (
            <UnreadBadge
              count={unreadCount}
              size="sm"
              testID={testID ? `${testID}-unread` : undefined}
            />
          )}

          {/* Muted unread (just a dot) */}
          {hasUnread && isMuted && (
            <UnreadBadge
              count={1}
              size="sm"
              colorScheme="neutral"
              dot
              testID={testID ? `${testID}-unread-muted` : undefined}
            />
          )}
        </View>
      </View>
    );
  }, [
    displayTime,
    isMuted,
    isPinned,
    matchBadgeConfig,
    hasUnread,
    unreadCount,
    baseStyles,
    dynamicStyles,
    timestampStyle,
    testID,
  ]);

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={getPressableStyle}
      accessibilityLabel={computedAccessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <View style={[baseStyles.container, contentStyle]}>
        {/* Avatar */}
        <View style={baseStyles.avatarContainer}>
          {renderAvatar()}
        </View>

        {/* Content */}
        <View style={baseStyles.contentContainer}>
          {/* Title row */}
          <View style={baseStyles.titleRow}>
            <Text
              style={[baseStyles.title, dynamicStyles.title, titleStyle]}
              numberOfLines={1}
              testID={testID ? `${testID}-title` : undefined}
            >
              {title}
            </Text>
          </View>

          {/* Subtitle row */}
          <View style={baseStyles.subtitleRow}>
            <View style={baseStyles.subtitleContainer}>
              {renderSubtitle()}
            </View>
          </View>
        </View>

        {/* Right content */}
        {renderRightContent()}
      </View>
    </Pressable>
  );
}

// Set display name for debugging
ConversationListItem.displayName = 'ConversationListItem';
