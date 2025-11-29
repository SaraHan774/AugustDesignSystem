/**
 * AugustDesignSystem - MessageReactions Component
 *
 * Emoji reactions display for chat messages.
 * Shows reaction pills with emoji and count.
 *
 * @example
 * ```tsx
 * // Basic reactions
 * <MessageReactions
 *   reactions={[
 *     { emoji: '❤️', count: 5, isSelected: true },
 *     { emoji: '😂', count: 3 },
 *     { emoji: '👍', count: 2 },
 *   ]}
 *   onReactionPress={(emoji) => toggleReaction(emoji)}
 *   onAddPress={() => showEmojiPicker()}
 * />
 *
 * // Without add button
 * <MessageReactions
 *   reactions={reactions}
 *   onReactionPress={handleReaction}
 *   showAddButton={false}
 * />
 *
 * // Small size
 * <MessageReactions
 *   reactions={reactions}
 *   size="sm"
 *   onReactionPress={handleReaction}
 * />
 * ```
 */

import React, { useMemo, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  Layout,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Icon } from '../Icon';
import {
  createMessageReactionsStyles,
  getReactionSize,
} from './MessageReactions.styles';
import type { MessageReactionsProps, Reaction } from './MessageReactions.types';

// Spring config for animations
const SPRING_CONFIG = {
  damping: 15,
  stiffness: 200,
};

// Create animated pressable
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Individual reaction pill component.
 */
interface ReactionPillProps {
  reaction: Reaction;
  size: 'sm' | 'md';
  onPress?: (emoji: string) => void;
  onLongPress?: (reaction: Reaction) => void;
  animated: boolean;
  style?: any;
}

function ReactionPill({
  reaction,
  size,
  onPress,
  onLongPress,
  animated,
  style,
}: ReactionPillProps): React.ReactElement {
  const { theme } = useTheme();
  const baseStyles = useMemo(() => createMessageReactionsStyles(theme), [theme]);
  const sizeConfig = useMemo(() => getReactionSize(size), [size]);

  // Scale animation for press
  const scale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.92, SPRING_CONFIG);
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, SPRING_CONFIG);
  }, [scale]);

  const animatedPillStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pillStyle = [
    baseStyles.reaction,
    {
      height: sizeConfig.height,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      gap: sizeConfig.gap,
    },
    reaction.isSelected && baseStyles.reactionSelected,
    style,
  ];

  const content = (
    <>
      <Text style={[baseStyles.emoji, { fontSize: sizeConfig.emojiFontSize }]}>
        {reaction.emoji}
      </Text>
      <Text
        style={[
          baseStyles.count,
          { fontSize: sizeConfig.countFontSize },
          reaction.isSelected && baseStyles.countSelected,
        ]}
      >
        {reaction.count}
      </Text>
    </>
  );

  if (animated) {
    return (
      <AnimatedPressable
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(150)}
        layout={Layout.springify()}
        style={[pillStyle, animatedPillStyle]}
        onPress={() => onPress?.(reaction.emoji)}
        onLongPress={() => onLongPress?.(reaction)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={`${reaction.emoji} reaction, ${reaction.count} ${
          reaction.count === 1 ? 'person' : 'people'
        }${reaction.isSelected ? ', selected' : ''}`}
        accessibilityState={{ selected: reaction.isSelected }}
      >
        {content}
      </AnimatedPressable>
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [pillStyle, pressed && { opacity: 0.7 }]}
      onPress={() => onPress?.(reaction.emoji)}
      onLongPress={() => onLongPress?.(reaction)}
      accessibilityRole="button"
      accessibilityLabel={`${reaction.emoji} reaction, ${reaction.count} ${
        reaction.count === 1 ? 'person' : 'people'
      }${reaction.isSelected ? ', selected' : ''}`}
      accessibilityState={{ selected: reaction.isSelected }}
    >
      {content}
    </Pressable>
  );
}

/**
 * MessageReactions component for displaying emoji reactions.
 *
 * Features:
 * - Reaction pills with emoji and count
 * - Selected state for user's own reactions
 * - Add reaction button
 * - Overflow handling with "+N more"
 * - Animated additions/removals
 * - Long-press to see who reacted
 */
export function MessageReactions({
  // Content
  reactions,
  maxVisible = 6,

  // Callbacks
  onReactionPress,
  onReactionLongPress,
  onAddPress,
  onOverflowPress,

  // Appearance
  size = 'md',
  showAddButton = true,
  animated = true,

  // Accessibility
  testID,

  // Styling
  style,
  reactionStyle,
}: MessageReactionsProps): React.ReactElement | null {
  const { theme } = useTheme();

  // Base styles
  const baseStyles = useMemo(() => createMessageReactionsStyles(theme), [theme]);
  const sizeConfig = useMemo(() => getReactionSize(size), [size]);

  // Calculate visible reactions and overflow
  const visibleReactions = useMemo(() => {
    if (reactions.length <= maxVisible) {
      return reactions;
    }
    return reactions.slice(0, maxVisible - 1);
  }, [reactions, maxVisible]);

  const overflowCount = useMemo(() => {
    if (reactions.length <= maxVisible) {
      return 0;
    }
    return reactions.length - visibleReactions.length;
  }, [reactions.length, maxVisible, visibleReactions.length]);

  // Don't render if no reactions
  if (reactions.length === 0 && !showAddButton) {
    return null;
  }

  return (
    <View style={[baseStyles.container, style]} testID={testID}>
      {/* Reaction pills */}
      {visibleReactions.map((reaction) => (
        <ReactionPill
          key={reaction.emoji}
          reaction={reaction}
          size={size}
          onPress={onReactionPress}
          onLongPress={onReactionLongPress}
          animated={animated}
          style={reactionStyle}
        />
      ))}

      {/* Overflow pill */}
      {overflowCount > 0 && (
        <Pressable
          style={[
            baseStyles.overflow,
            {
              height: sizeConfig.height,
              paddingHorizontal: sizeConfig.paddingHorizontal,
            },
          ]}
          onPress={onOverflowPress}
          accessibilityRole="button"
          accessibilityLabel={`${overflowCount} more reactions`}
        >
          <Text
            style={[baseStyles.overflowText, { fontSize: sizeConfig.countFontSize }]}
          >
            +{overflowCount}
          </Text>
        </Pressable>
      )}

      {/* Add button */}
      {showAddButton && (
        <Pressable
          style={({ pressed }) => [
            baseStyles.addButton,
            {
              width: sizeConfig.height,
              height: sizeConfig.height,
            },
            pressed && { opacity: 0.7 },
          ]}
          onPress={onAddPress}
          accessibilityRole="button"
          accessibilityLabel="Add reaction"
        >
          <Icon
            name="plus"
            size={size === 'sm' ? 'sm' : 'md'}
            color={theme.colors.label.secondary}
          />
        </Pressable>
      )}
    </View>
  );
}

// Set display name for debugging
MessageReactions.displayName = 'MessageReactions';

export default MessageReactions;
