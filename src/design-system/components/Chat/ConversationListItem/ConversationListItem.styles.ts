/**
 * AugustDesignSystem - ConversationListItem Component Styles
 *
 * Style definitions for the ConversationListItem component following Apple HIG.
 */

import { StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import type { Theme } from '@types';
import type { MatchStatus } from './ConversationListItem.types';

/**
 * Get match status badge configuration.
 */
export function getMatchStatusConfig(
  status: MatchStatus | undefined,
  theme: Theme
): { label: string; color: string; backgroundColor: string } | null {
  if (!status) return null;

  switch (status) {
    case 'new':
      return {
        label: 'New Match',
        color: '#FFFFFF',
        backgroundColor: theme.colors.semantic.success,
      };
    case 'active':
      return null; // No badge for active
    case 'expired':
      return {
        label: 'Expired',
        color: '#FFFFFF',
        backgroundColor: theme.colors.system.orange,
      };
    case 'ended':
      return {
        label: 'Ended',
        color: theme.colors.label.secondary,
        backgroundColor: theme.colors.fill.secondary,
      };
    default:
      return null;
  }
}

/**
 * Format timestamp for conversation list.
 * Shows relative time for recent, otherwise date.
 */
export function formatListTimestamp(timestamp?: Date | string | number): string {
  if (!timestamp) return '';

  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Just now (< 1 minute)
  if (diffMins < 1) {
    return 'Now';
  }

  // Minutes ago (< 60 minutes)
  if (diffMins < 60) {
    return `${diffMins}m`;
  }

  // Hours ago (< 24 hours)
  if (diffHours < 24) {
    return `${diffHours}h`;
  }

  // Yesterday
  if (diffDays === 1) {
    return 'Yesterday';
  }

  // This week (< 7 days)
  if (diffDays < 7) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  }

  // Older - show date
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
}

/**
 * Get message preview icon based on type.
 */
export function getMessagePreviewIcon(type: string): string {
  switch (type) {
    case 'image':
      return '📷 ';
    case 'file':
      return '📎 ';
    case 'voice':
      return '🎤 ';
    case 'system':
      return '';
    case 'text':
    default:
      return '';
  }
}

/**
 * Create base ConversationListItem styles.
 */
export function createConversationListItemStyles(theme: Theme) {
  return StyleSheet.create({
    // Pressable container
    pressable: {
      backgroundColor: theme.colors.background.primary,
    },

    pressablePressed: {
      backgroundColor: theme.colors.fill.quaternary,
    },

    pressableSelected: {
      backgroundColor: theme.colors.fill.tertiary,
    },

    // Main container
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm + 2,
      minHeight: 72,
    },

    // Avatar container
    avatarContainer: {
      marginRight: theme.spacing.sm + 4,
    },

    // Content area (title, subtitle)
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
    },

    // Title row (title + timestamp)
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 2,
    },

    title: {
      ...theme.typography.body,
      fontWeight: '600',
      color: theme.colors.label.primary,
      flex: 1,
      marginRight: theme.spacing.sm,
    },

    titleMuted: {
      color: theme.colors.label.secondary,
    },

    // Timestamp
    timestamp: {
      ...theme.typography.caption1,
      color: theme.colors.label.secondary,
    },

    timestampUnread: {
      color: theme.colors.interactive.tint,
      fontWeight: '600',
    },

    // Subtitle row (message preview + badges)
    subtitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    subtitleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },

    subtitle: {
      ...theme.typography.subheadline,
      color: theme.colors.label.secondary,
      flex: 1,
    },

    subtitleUnread: {
      color: theme.colors.label.primary,
      fontWeight: '500',
    },

    // Sender name prefix for group chats
    senderPrefix: {
      ...theme.typography.subheadline,
      color: theme.colors.label.secondary,
    },

    // Typing indicator text
    typingText: {
      ...theme.typography.subheadline,
      color: theme.colors.interactive.tint,
      fontStyle: 'italic',
    },

    // Right side container (badges, indicators)
    rightContainer: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      marginLeft: theme.spacing.sm,
    },

    // Badges row
    badgesRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing.xs,
    },

    // Muted icon
    mutedIcon: {
      marginLeft: theme.spacing.xs,
    },

    mutedIconText: {
      fontSize: 12,
      color: theme.colors.label.tertiary,
    },

    // Pinned icon
    pinnedIcon: {
      marginLeft: theme.spacing.xs,
    },

    pinnedIconText: {
      fontSize: 12,
      color: theme.colors.label.tertiary,
    },

    // Match status badge
    matchBadge: {
      paddingHorizontal: theme.spacing.xs + 2,
      paddingVertical: 2,
      borderRadius: 4,
      marginLeft: theme.spacing.xs,
    },

    matchBadgeText: {
      ...theme.typography.caption2,
      fontWeight: '600',
    },

    // Separator
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.colors.separator.opaque,
      marginLeft: 72, // Avatar width + margin
    },
  });
}

/**
 * Generate dynamic styles based on ConversationListItem state.
 */
export function getDynamicConversationListItemStyles(
  hasUnread: boolean,
  isMuted: boolean,
  isSelected: boolean,
  theme: Theme
): {
  pressable: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  timestamp: TextStyle;
} {
  const pressableStyle: ViewStyle = isSelected
    ? { backgroundColor: theme.colors.fill.tertiary }
    : {};

  const titleStyle: TextStyle = isMuted
    ? { color: theme.colors.label.secondary }
    : {};

  const subtitleStyle: TextStyle = hasUnread && !isMuted
    ? { color: theme.colors.label.primary, fontWeight: '500' }
    : {};

  const timestampStyle: TextStyle = hasUnread && !isMuted
    ? { color: theme.colors.interactive.tint, fontWeight: '600' }
    : {};

  return {
    pressable: pressableStyle,
    title: titleStyle,
    subtitle: subtitleStyle,
    timestamp: timestampStyle,
  };
}
