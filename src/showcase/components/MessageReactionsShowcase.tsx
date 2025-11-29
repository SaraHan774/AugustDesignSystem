/**
 * MessageReactionsShowcase - Displays message reactions component
 */

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@hooks';
import { MessageReactions } from '@components';
import { ShowcaseSection } from './ShowcaseSection';

interface ReactionGroupProps {
  title: string;
  children: React.ReactNode;
}

function ReactionGroup({ title, children }: ReactionGroupProps): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    container: {
      marginBottom: theme.spacing.xl,
    },
    title: {
      ...theme.typography.subheadline,
      color: theme.colors.label.secondary,
      marginBottom: theme.spacing.md,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

export function MessageReactionsShowcase(): React.ReactElement {
  const [reactions, setReactions] = useState([
    { emoji: '\u2764\ufe0f', count: 5, isSelected: true },
    { emoji: '\ud83d\ude02', count: 3, isSelected: false },
    { emoji: '\ud83d\udc4d', count: 2, isSelected: false },
    { emoji: '\ud83d\ude0d', count: 1, isSelected: false },
  ]);

  const handleReactionPress = (emoji: string) => {
    setReactions((prev) =>
      prev.map((r) =>
        r.emoji === emoji
          ? {
              ...r,
              isSelected: !r.isSelected,
              count: r.isSelected ? r.count - 1 : r.count + 1,
            }
          : r
      )
    );
  };

  const styles = useThemedStyles((theme) => ({
    messageBubble: {
      backgroundColor: theme.colors.fill.secondary,
      padding: theme.spacing.md,
      borderRadius: theme.radius.lg,
      marginBottom: theme.spacing.sm,
      maxWidth: '80%',
    },
    messageText: {
      ...theme.typography.body,
      color: theme.colors.label.primary,
    },
  }));

  return (
    <ShowcaseSection
      title="Message Reactions"
      description="Emoji reactions for chat messages"
    >
      {/* Basic */}
      <ReactionGroup title="Basic Reactions">
        <MessageReactions
          reactions={[
            { emoji: '\u2764\ufe0f', count: 5 },
            { emoji: '\ud83d\ude02', count: 3 },
            { emoji: '\ud83d\udc4d', count: 2 },
          ]}
          onReactionPress={() => {}}
        />
      </ReactionGroup>

      {/* With Selection */}
      <ReactionGroup title="Interactive (Tap to Toggle)">
        <MessageReactions
          reactions={reactions}
          onReactionPress={handleReactionPress}
          onAddPress={() => {}}
        />
      </ReactionGroup>

      {/* Small Size */}
      <ReactionGroup title="Small Size">
        <MessageReactions
          reactions={[
            { emoji: '\u2764\ufe0f', count: 12 },
            { emoji: '\ud83d\udc4d', count: 8, isSelected: true },
            { emoji: '\ud83d\ude4f', count: 3 },
          ]}
          size="sm"
          onReactionPress={() => {}}
        />
      </ReactionGroup>

      {/* Many Reactions (Overflow) */}
      <ReactionGroup title="Many Reactions (Overflow)">
        <MessageReactions
          reactions={[
            { emoji: '\u2764\ufe0f', count: 5 },
            { emoji: '\ud83d\ude02', count: 3 },
            { emoji: '\ud83d\udc4d', count: 2 },
            { emoji: '\ud83d\ude0d', count: 4 },
            { emoji: '\ud83d\ude22', count: 1 },
            { emoji: '\ud83e\udd29', count: 2 },
            { emoji: '\ud83d\udc4f', count: 3 },
            { emoji: '\ud83d\udd25', count: 1 },
          ]}
          maxVisible={5}
          onReactionPress={() => {}}
          onOverflowPress={() => {}}
        />
      </ReactionGroup>

      {/* Without Add Button */}
      <ReactionGroup title="Without Add Button">
        <MessageReactions
          reactions={[
            { emoji: '\u2764\ufe0f', count: 5, isSelected: true },
            { emoji: '\ud83d\udc4d', count: 2 },
          ]}
          showAddButton={false}
          onReactionPress={() => {}}
        />
      </ReactionGroup>

      {/* In Context */}
      <ReactionGroup title="In Message Context">
        <View>
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>
              Hey! Did you see the new design system components?
            </Text>
          </View>
          <MessageReactions
            reactions={[
              { emoji: '\ud83d\udc4d', count: 2, isSelected: true },
              { emoji: '\u2764\ufe0f', count: 1 },
            ]}
            size="sm"
            onReactionPress={() => {}}
            onAddPress={() => {}}
          />
        </View>
      </ReactionGroup>
    </ShowcaseSection>
  );
}
