/**
 * AugustDesignSystem - MessageBubble Component Styles
 *
 * Style definitions for the MessageBubble component following Apple HIG.
 */

import { StyleSheet, type ViewStyle, type TextStyle, Dimensions } from 'react-native';
import type { Theme } from '@types';
import type { MessageDirection, MessageStatus, MessageType } from './MessageBubble.types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Chat-specific color tokens for message bubbles.
 */
export function getChatColors(theme: Theme) {
  const isLight = theme.mode === 'light';

  return {
    // Incoming message bubble
    incoming: {
      background: isLight ? '#E9E9EB' : '#3A3A3C',
      text: theme.colors.label.primary,
    },
    // Outgoing message bubble
    outgoing: {
      background: theme.colors.interactive.tint,
      text: '#FFFFFF',
    },
    // Deleted message
    deleted: {
      background: theme.colors.fill.tertiary,
      text: theme.colors.label.tertiary,
    },
    // Error state
    error: {
      text: theme.colors.semantic.error,
    },
  };
}

/**
 * Get bubble border radius configuration.
 */
export function getBubbleRadius(
  direction: MessageDirection,
  isFirstInGroup: boolean,
  isLastInGroup: boolean,
  theme: Theme
): {
  topLeft: number;
  topRight: number;
  bottomLeft: number;
  bottomRight: number;
} {
  const large = 18;
  const small = 4;

  // For continuous groups, reduce radius on the grouping side
  if (direction === 'outgoing') {
    return {
      topLeft: large,
      topRight: isFirstInGroup ? large : small,
      bottomLeft: large,
      bottomRight: isLastInGroup ? large : small,
    };
  } else {
    return {
      topLeft: isFirstInGroup ? large : small,
      topRight: large,
      bottomLeft: isLastInGroup ? large : small,
      bottomRight: large,
    };
  }
}

/**
 * Get status icon based on message status.
 */
export function getStatusIcon(status?: MessageStatus): string {
  switch (status) {
    case 'sending':
      return ''; // Clock icon would go here
    case 'sent':
      return ''; // Single check
    case 'delivered':
      return ''; // Double check
    case 'read':
      return ''; // Double check (filled/blue)
    case 'failed':
      return ''; // Exclamation
    default:
      return '';
  }
}

/**
 * Get status color based on message status.
 */
export function getStatusColor(status: MessageStatus | undefined, direction: MessageDirection, theme: Theme): string {
  if (!status) return 'transparent';

  if (status === 'failed') {
    return theme.colors.semantic.error;
  }

  if (status === 'read') {
    return direction === 'outgoing' ? '#FFFFFF' : theme.colors.interactive.tint;
  }

  // For sending, sent, delivered
  return direction === 'outgoing'
    ? 'rgba(255, 255, 255, 0.7)'
    : theme.colors.label.tertiary;
}

/**
 * Get max bubble width.
 */
export function getMaxBubbleWidth(maxWidthRatio: number): number {
  return Math.round(SCREEN_WIDTH * maxWidthRatio);
}

/**
 * Get image dimensions for bubble.
 */
export function getImageDimensions(
  imageWidth?: number,
  imageHeight?: number,
  maxWidth: number = 250
): { width: number; height: number } {
  const defaultSize = { width: 200, height: 150 };

  if (!imageWidth || !imageHeight) {
    return defaultSize;
  }

  const aspectRatio = imageWidth / imageHeight;
  let width = Math.min(imageWidth, maxWidth);
  let height = width / aspectRatio;

  // Limit height as well
  const maxHeight = 300;
  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  return { width: Math.round(width), height: Math.round(height) };
}

/**
 * Format timestamp for display.
 */
export function formatTimestamp(timestamp?: Date | string | number): string {
  if (!timestamp) return '';

  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);

  if (isNaN(date.getTime())) return '';

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');

  return `${displayHours}:${displayMinutes} ${ampm}`;
}

/**
 * Format file size for display.
 */
export function formatFileSize(bytes?: number): string {
  if (!bytes) return '';

  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  let size = bytes;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

/**
 * Create base MessageBubble styles.
 */
export function createMessageBubbleStyles(theme: Theme) {
  return StyleSheet.create({
    // Outer container (for alignment)
    container: {
      flexDirection: 'column',
      marginVertical: theme.spacing.xxs || 2,
      paddingHorizontal: theme.spacing.md,
    },

    containerIncoming: {
      alignItems: 'flex-start',
    },

    containerOutgoing: {
      alignItems: 'flex-end',
    },

    // Sender name label
    senderName: {
      ...theme.typography.caption1,
      color: theme.colors.label.secondary,
      marginBottom: theme.spacing.xxs || 2,
      marginLeft: theme.spacing.xs,
    },

    // Bubble wrapper
    bubbleWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },

    // Bubble container
    bubble: {
      paddingHorizontal: theme.spacing.sm + 4,
      paddingVertical: theme.spacing.sm,
      overflow: 'hidden',
    },

    // Text content
    text: {
      ...theme.typography.body,
    },

    // Deleted message text
    deletedText: {
      fontStyle: 'italic',
    },

    // Image container
    imageContainer: {
      borderRadius: 12,
      overflow: 'hidden',
    },

    image: {
      borderRadius: 12,
    },

    imageLoading: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.fill.secondary,
    },

    // File container
    fileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.xs,
    },

    fileIcon: {
      width: 36,
      height: 36,
      borderRadius: 8,
      backgroundColor: theme.colors.fill.tertiary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.sm,
    },

    fileInfo: {
      flex: 1,
    },

    fileName: {
      ...theme.typography.subheadline,
      fontWeight: '500',
    },

    fileSize: {
      ...theme.typography.caption1,
      color: theme.colors.label.secondary,
      marginTop: 2,
    },

    // Footer (timestamp + status)
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing.xxs || 2,
      gap: theme.spacing.xxs || 2,
    },

    footerIncoming: {
      marginLeft: theme.spacing.xs,
    },

    footerOutgoing: {
      marginRight: theme.spacing.xs,
    },

    timestamp: {
      ...theme.typography.caption2,
      color: theme.colors.label.tertiary,
    },

    timestampOutgoing: {
      color: 'rgba(255, 255, 255, 0.7)',
    },

    // Status indicator
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    statusText: {
      ...theme.typography.caption2,
    },

    // Error state
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing.xs,
    },

    errorText: {
      ...theme.typography.caption1,
      color: theme.colors.semantic.error,
      marginRight: theme.spacing.xs,
    },

    retryButton: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xxs || 4,
    },

    retryText: {
      ...theme.typography.caption1,
      color: theme.colors.interactive.tint,
      fontWeight: '600',
    },
  });
}

/**
 * Generate dynamic styles based on MessageBubble props.
 */
export function getDynamicMessageBubbleStyles(
  direction: MessageDirection,
  isFirstInGroup: boolean,
  isLastInGroup: boolean,
  isDeleted: boolean,
  theme: Theme
): {
  bubble: ViewStyle;
  text: TextStyle;
  timestamp: TextStyle;
} {
  const colors = getChatColors(theme);
  const radius = getBubbleRadius(direction, isFirstInGroup, isLastInGroup, theme);

  const bubbleColors = isDeleted
    ? colors.deleted
    : direction === 'outgoing'
    ? colors.outgoing
    : colors.incoming;

  const bubbleStyle: ViewStyle = {
    backgroundColor: bubbleColors.background,
    borderTopLeftRadius: radius.topLeft,
    borderTopRightRadius: radius.topRight,
    borderBottomLeftRadius: radius.bottomLeft,
    borderBottomRightRadius: radius.bottomRight,
  };

  const textStyle: TextStyle = {
    color: bubbleColors.text,
  };

  const timestampStyle: TextStyle = {
    color: direction === 'outgoing' && !isDeleted
      ? 'rgba(255, 255, 255, 0.7)'
      : theme.colors.label.tertiary,
  };

  return {
    bubble: bubbleStyle,
    text: textStyle,
    timestamp: timestampStyle,
  };
}
