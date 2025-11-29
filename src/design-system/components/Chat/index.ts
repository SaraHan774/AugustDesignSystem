/**
 * AugustDesignSystem - Chat Components Export
 *
 * All chat-related components for building messaging interfaces.
 * Following Apple Human Interface Guidelines and the chat-sdk design specifications.
 */

// StatusBadge - Online/offline presence indicator
export { StatusBadge } from './StatusBadge';
export type {
  StatusBadgeProps,
  PresenceStatus,
  StatusBadgeSize,
  StatusBadgeStyleProps,
} from './StatusBadge';

// UnreadBadge - Unread message count badge
export { UnreadBadge } from './UnreadBadge';
export type {
  UnreadBadgeProps,
  UnreadBadgeSize,
  UnreadBadgeColorScheme,
  UnreadBadgeStyleProps,
} from './UnreadBadge';

// Avatar - User avatar with group support
export { Avatar } from './Avatar';
export type {
  AvatarProps,
  AvatarData,
  AvatarSize,
  AvatarStyleProps,
} from './Avatar';

// TypingIndicator - Typing status indicator
export { TypingIndicator } from './TypingIndicator';
export type {
  TypingIndicatorProps,
  TypingIndicatorVariant,
  TypingIndicatorSize,
  TypingIndicatorStyleProps,
} from './TypingIndicator';

// MessageBubble - Chat message bubble
export { MessageBubble } from './MessageBubble';
export type {
  MessageBubbleProps,
  MessageType,
  MessageStatus,
  MessageDirection,
  FileAttachment,
  ImageAttachment,
  MessageBubbleStyleProps,
} from './MessageBubble';

// InputBar - Message input with attachments
export { InputBar } from './InputBar';
export type {
  InputBarProps,
  InputBarStyleProps,
} from './InputBar';

// ConversationListItem - Chat list item
export { ConversationListItem } from './ConversationListItem';
export type {
  ConversationListItemProps,
  MatchStatus,
  MessagePreviewType,
  ConversationListItemStyleProps,
} from './ConversationListItem';
