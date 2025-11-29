/**
 * AugustDesignSystem - MessageBubble Component Types
 *
 * Type definitions for the MessageBubble component following Apple HIG.
 * Supports various message types, status indicators, and group chat features.
 */

import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle, ImageSourcePropType, GestureResponderEvent } from 'react-native';

/**
 * Message content types supported by the chat SDK.
 *
 * - `text`: Plain text message
 * - `image`: Image with optional thumbnail
 * - `file`: File attachment with metadata
 */
export type MessageType = 'text' | 'image' | 'file';

/**
 * Message delivery/read status.
 *
 * - `sending`: Message is being sent
 * - `sent`: Message sent to server
 * - `delivered`: Message delivered to recipient(s)
 * - `read`: Message has been read
 * - `failed`: Message failed to send
 */
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

/**
 * Message direction.
 *
 * - `incoming`: Message received from others (left-aligned)
 * - `outgoing`: Message sent by current user (right-aligned)
 */
export type MessageDirection = 'incoming' | 'outgoing';

/**
 * File attachment metadata.
 */
export interface FileAttachment {
  /**
   * File name to display.
   */
  name: string;

  /**
   * File size in bytes.
   */
  size?: number;

  /**
   * File MIME type.
   */
  mimeType?: string;

  /**
   * Download URL for the file.
   */
  url?: string;
}

/**
 * Image attachment metadata.
 */
export interface ImageAttachment {
  /**
   * Image source (URL or local).
   */
  source: ImageSourcePropType | string;

  /**
   * Image width for aspect ratio calculation.
   */
  width?: number;

  /**
   * Image height for aspect ratio calculation.
   */
  height?: number;

  /**
   * BlurHash for loading placeholder.
   */
  blurHash?: string;

  /**
   * Thumbnail URL for preview.
   */
  thumbnailUrl?: string;
}

/**
 * Props for the MessageBubble component.
 */
export interface MessageBubbleProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Type of message content.
   * @default 'text'
   */
  type?: MessageType;

  /**
   * Text content of the message.
   */
  text?: string;

  /**
   * Image attachment data.
   */
  image?: ImageAttachment;

  /**
   * File attachment data.
   */
  file?: FileAttachment;

  /**
   * Custom content to render inside the bubble.
   */
  children?: ReactNode;

  // ============================================================================
  // Message Metadata
  // ============================================================================

  /**
   * Direction of the message (incoming or outgoing).
   * @default 'incoming'
   */
  direction?: MessageDirection;

  /**
   * Message delivery/read status.
   */
  status?: MessageStatus;

  /**
   * Timestamp to display.
   * Can be a Date, string, or number (milliseconds).
   */
  timestamp?: Date | string | number;

  /**
   * Custom formatted timestamp string.
   */
  formattedTime?: string;

  /**
   * Whether this is a group chat message.
   * @default false
   */
  isGroup?: boolean;

  /**
   * Sender's display name (shown in group chats for incoming messages).
   */
  senderName?: string;

  /**
   * Whether to show sender name (for grouped messages).
   * @default true for first message in a group
   */
  showSenderName?: boolean;

  /**
   * Whether the message is deleted.
   * @default false
   */
  isDeleted?: boolean;

  /**
   * Error message for failed sends.
   */
  errorMessage?: string;

  // ============================================================================
  // Layout
  // ============================================================================

  /**
   * Maximum width as a percentage of container width.
   * @default 0.75 (75%)
   */
  maxWidthRatio?: number;

  /**
   * Whether this is the first message in a group from the same sender.
   * Affects styling (shows tail/pointer).
   * @default false
   */
  isFirstInGroup?: boolean;

  /**
   * Whether this is the last message in a group from the same sender.
   * @default false
   */
  isLastInGroup?: boolean;

  // ============================================================================
  // Events
  // ============================================================================

  /**
   * Handler called when the bubble is pressed.
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * Handler called when the bubble is long pressed.
   */
  onLongPress?: (event: GestureResponderEvent) => void;

  /**
   * Handler called when retry is pressed (for failed messages).
   */
  onRetry?: () => void;

  /**
   * Handler called when the image is pressed.
   */
  onImagePress?: () => void;

  /**
   * Handler called when a file is pressed.
   */
  onFilePress?: () => void;

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
   * Custom style for the bubble container.
   */
  bubbleStyle?: ViewStyle;

  /**
   * Custom style for the text content.
   */
  textStyle?: TextStyle;

  /**
   * Custom style for the timestamp.
   */
  timestampStyle?: TextStyle;

  /**
   * Custom style for the sender name.
   */
  senderNameStyle?: TextStyle;
}

/**
 * Style props derived from MessageBubble state.
 */
export interface MessageBubbleStyleProps {
  type: MessageType;
  direction: MessageDirection;
  status?: MessageStatus;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
  isDeleted: boolean;
}
