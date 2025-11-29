/**
 * AugustDesignSystem - MessageReactions Component Styles
 *
 * Style definitions for the emoji reactions display component.
 */

import { StyleSheet } from 'react-native';
import type { Theme } from '../../types';
import type { ReactionSizeConfig } from './MessageReactions.types';

/**
 * Size configurations for reaction pills.
 */
export const REACTION_SIZES: Record<'sm' | 'md', ReactionSizeConfig> = {
  sm: {
    height: 24,
    paddingHorizontal: 6,
    emojiFontSize: 12,
    countFontSize: 11,
    gap: 2,
  },
  md: {
    height: 28,
    paddingHorizontal: 8,
    emojiFontSize: 14,
    countFontSize: 12,
    gap: 4,
  },
};

/**
 * Get size configuration for reaction pills.
 */
export function getReactionSize(size: 'sm' | 'md'): ReactionSizeConfig {
  return REACTION_SIZES[size];
}

/**
 * Create base styles for the MessageReactions component.
 */
export function createMessageReactionsStyles(theme: Theme) {
  return StyleSheet.create({
    // Container
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.xs,
    },

    // Individual reaction pill
    reaction: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 999,
      backgroundColor: theme.colors.fill.secondary,
    },

    // Selected reaction (user has reacted)
    reactionSelected: {
      backgroundColor: `${theme.colors.interactive.tint}20`, // 20% opacity
      borderWidth: 1,
      borderColor: theme.colors.interactive.tint,
    },

    // Emoji text
    emoji: {
      textAlign: 'center',
    },

    // Count text
    count: {
      color: theme.colors.label.secondary,
      fontWeight: '500',
    },

    // Count selected
    countSelected: {
      color: theme.colors.interactive.tint,
    },

    // Add button
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 999,
      backgroundColor: theme.colors.fill.tertiary,
    },

    // Overflow pill
    overflow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 999,
      backgroundColor: theme.colors.fill.tertiary,
    },

    // Overflow text
    overflowText: {
      color: theme.colors.label.secondary,
      fontWeight: '500',
    },
  });
}
