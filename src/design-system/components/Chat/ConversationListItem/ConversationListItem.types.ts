/**
 * AugustDesignSystem - ConversationListItem Component Types
 *
 * Type definitions for the ConversationListItem component following Apple HIG.
 * Used to display conversation items in a chat list.
 */

import type { ViewStyle, TextStyle, ImageSourcePropType, GestureResponderEvent } from 'react-native';
import type { AvatarData } from '../Avatar';
import type { PresenceStatus } from '../StatusBadge';

/**
 * Match status for matching-based chat.
 */
export type MatchStatus = 'new' | 'active' | 'expired' | 'ended';

/**
 * Message preview types.
 */
export type MessagePreviewType = 'text' | 'image' | 'file' | 'voice' | 'system';

/**
 * Props for the ConversationListItem component.
 */
export interface ConversationListItemProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Conversation/channel ID.
   */
  id: string;

  /**
   * Title of the conversation.
   * For 1:1: other user's name
   * For group: group name or participant names
   */
  title: string;

  /**
   * Subtitle/last message preview.
   */
  subtitle?: string;

  /**
   * Type of the last message (for icon display).
   * @default 'text'
   */
  messageType?: MessagePreviewType;

  /**
   * Sender name for group chat last message.
   * e.g., "Alex: " prefix
   */
  messageSender?: string;

  /**
   * Timestamp of the last message.
   */
  timestamp?: Date | string | number;

  /**
   * Formatted timestamp string (overrides auto-formatting).
   */
  formattedTime?: string;

  // ============================================================================
  // Avatar
  // ============================================================================

  /**
   * Avatar image source for 1:1 conversations.
   */
  avatarSource?: ImageSourcePropType | string;

  /**
   * Display name for avatar initials fallback.
   */
  avatarName?: string;

  /**
   * Whether this is a group conversation.
   * @default false
   */
  isGroup?: boolean;

  /**
   * Group avatar data (for stacked avatars).
   * Used when isGroup is true.
   */
  groupAvatars?: AvatarData[];

  /**
   * Online/offline status for 1:1 conversations.
   */
  presenceStatus?: PresenceStatus;

  // ============================================================================
  // Badges & Indicators
  // ============================================================================

  /**
   * Number of unread messages.
   * 0 or undefined hides the badge.
   */
  unreadCount?: number;

  /**
   * Whether the conversation is muted.
   * @default false
   */
  isMuted?: boolean;

  /**
   * Whether the conversation is pinned.
   * @default false
   */
  isPinned?: boolean;

  /**
   * Match status badge for matching-based chats.
   */
  matchStatus?: MatchStatus;

  /**
   * Whether to show typing indicator.
   * @default false
   */
  isTyping?: boolean;

  /**
   * Names of users who are typing (for group chats).
   */
  typingUsers?: string[];

  // ============================================================================
  // Events
  // ============================================================================

  /**
   * Handler called when the item is pressed.
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * Handler called when the item is long pressed.
   */
  onLongPress?: (event: GestureResponderEvent) => void;

  // ============================================================================
  // Accessibility
  // ============================================================================

  /**
   * Test ID for testing frameworks.
   */
  testID?: string;

  /**
   * Accessibility label for screen readers.
   */
  accessibilityLabel?: string;

  // ============================================================================
  // Styling
  // ============================================================================

  /**
   * Custom style for the outer container.
   */
  style?: ViewStyle;

  /**
   * Custom style for the content container.
   */
  contentStyle?: ViewStyle;

  /**
   * Custom style for the title.
   */
  titleStyle?: TextStyle;

  /**
   * Custom style for the subtitle.
   */
  subtitleStyle?: TextStyle;

  /**
   * Custom style for the timestamp.
   */
  timestampStyle?: TextStyle;

  /**
   * Whether the item is currently selected (for split-view on tablets).
   * @default false
   */
  isSelected?: boolean;
}

/**
 * Style props derived from ConversationListItem state.
 */
export interface ConversationListItemStyleProps {
  isGroup: boolean;
  hasUnread: boolean;
  isMuted: boolean;
  isPinned: boolean;
  isSelected: boolean;
  isTyping: boolean;
}
