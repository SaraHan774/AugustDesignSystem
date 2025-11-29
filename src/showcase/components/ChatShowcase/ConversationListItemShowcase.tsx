/**
 * ConversationListItemShowcase - Displays all ConversationListItem variants and configurations
 */

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useThemedStyles } from '@hooks';
import { ConversationListItem } from '../../../design-system/components/Chat';
import { ShowcaseSection } from '../ShowcaseSection';

interface ShowcaseGroupProps {
  title: string;
  children: React.ReactNode;
}

function ShowcaseGroup({ title, children }: ShowcaseGroupProps): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    container: {
      marginBottom: theme.spacing.xl,
    },
    title: {
      ...theme.typography.subheadline,
      color: theme.colors.label.secondary,
      marginBottom: theme.spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    items: {
      gap: 1,
      backgroundColor: theme.colors.separator.opaque,
      borderRadius: theme.radius.md,
      overflow: 'hidden',
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.items}>{children}</View>
    </View>
  );
}

export function ConversationListItemShowcase(): React.ReactElement {
  const now = new Date();
  const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000);
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const handlePress = (id: string) => {
    Alert.alert('Conversation', `Opening conversation: ${id}`);
  };

  const handleLongPress = (id: string) => {
    Alert.alert('Options', `Show options for: ${id}`);
  };

  const styles = useThemedStyles((theme) => ({
    itemContainer: {
      backgroundColor: theme.colors.background.primary,
    },
  }));

  return (
    <ShowcaseSection
      title="ConversationListItem"
      description="Chat list items with avatars, badges, and status indicators"
    >
      {/* Basic Conversations */}
      <ShowcaseGroup title="Basic Conversations">
        <View style={styles.itemContainer}>
          <ConversationListItem
            id="1"
            title="John Doe"
            subtitle="Hey, how are you doing?"
            timestamp={fiveMinAgo}
            avatarName="John Doe"
            presenceStatus="online"
            onPress={() => handlePress('1')}
          />
        </View>
        <View style={styles.itemContainer}>
          <ConversationListItem
            id="2"
            title="Jane Smith"
            subtitle="See you tomorrow!"
            timestamp={oneHourAgo}
            avatarName="Jane Smith"
            presenceStatus="offline"
            onPress={() => handlePress('2')}
          />
        </View>
        <View style={styles.itemContainer}>
          <ConversationListItem
            id="3"
            title="Bob Wilson"
            subtitle="Thanks for the update"
            timestamp={yesterday}
            avatarName="Bob Wilson"
            onPress={() => handlePress('3')}
          />
        </View>
      </ShowcaseGroup>

      {/* With Unread Count */}
      <ShowcaseGroup title="With Unread Count">
        <View style={styles.itemContainer}>
          <ConversationListItem
            id="4"
            title="Alice Brown"
            subtitle="Did you see the news?"
            timestamp={fiveMinAgo}
            avatarName="Alice Brown"
            unreadCount={3}
            presenceStatus="online"
            onPress={() => handlePress('4')}
          />
        </View>
        <View style={styles.itemContainer}>
          <ConversationListItem
            id="5"
            title="Charlie Davis"
            subtitle="Multiple messages waiting..."
            timestamp={oneHourAgo}
            avatarName="Charlie Davis"
            unreadCount={99}
            onPress={() => handlePress('5')}
          />
        </View>
        <View style={styles.itemContainer}>
          <ConversationListItem
            id="6"
            title="Diana Prince"
            subtitle="You have many unread messages"
            timestamp={yesterday}
            avatarName="Diana Prince"
            unreadCount={150}
            onPress={() => handlePress('6')}
          />
        </View>
      </ShowcaseGroup>

      {/* Group Conversations */}
      <ShowcaseGroup title="Group Conversations">
        <View style={styles.itemContainer}>
          <ConversationListItem
            id="7"
            title="Project Team"
            subtitle="Meeting at 3pm"
            messageSender="Alex"
            timestamp={fiveMinAgo}
            isGroup
            groupAvatars={[
              { name: 'Alice' },
              { name: 'Bob' },
              { name: 'Charlie' },
            ]}
            unreadCount={5}
            onPress={() => handlePress('7')}
          />
        </View>
        <View style={styles.itemContainer}>
          <ConversationListItem
            id="8"
            title="Family Group"
            subtitle="Shared a photo"
            messageSender="Mom"
            messageType="image"
            timestamp={oneHourAgo}
            isGroup
            groupAvatars={[
              { name: 'Mom' },
              { name: 'Dad' },
            ]}
            onPress={() => handlePress('8')}
          />
        </View>
      </ShowcaseGroup>

      {/* Typing Indicator */}
      <ShowcaseGroup title="Typing Indicator">
        <View style={styles.itemContainer}>
          <ConversationListItem
            id="9"
            title="Eve Johnson"
            timestamp={now}
            avatarName="Eve Johnson"
            presenceStatus="online"
            isTyping
            onPress={() => handlePress('9')}
          />
        </View>
        <View style={styles.itemContainer}>
          <ConversationListItem
            id="10"
            title="Design Team"
            timestamp={now}
            isGroup
            groupAvatars={[
              { name: 'Frank' },
              { name: 'Grace' },
            ]}
            isTyping
            typingUsers={['Frank']}
            onPress={() => handlePress('10')}
          />
        </View>
      </ShowcaseGroup>

      {/* Muted & Pinned */}
      <ShowcaseGroup title="Muted & Pinned">
        <View style={styles.itemContainer}>
          <ConversationListItem
            id="11"
            title="Muted Chat"
            subtitle="You won't receive notifications"
            timestamp={oneHourAgo}
            avatarName="Muted User"
            isMuted
            unreadCount={12}
            onPress={() => handlePress('11')}
          />
        </View>
        <View style={styles.itemContainer}>
          <ConversationListItem
            id="12"
            title="Pinned Chat"
            subtitle="Always at the top"
            timestamp={yesterday}
            avatarName="Important Person"
            isPinned
            onPress={() => handlePress('12')}
          />
        </View>
      </ShowcaseGroup>

      {/* Match Status */}
      <ShowcaseGroup title="Match Status (Dating App)">
        <View style={styles.itemContainer}>
          <ConversationListItem
            id="13"
            title="New Match"
            subtitle="Say hello!"
            timestamp={fiveMinAgo}
            avatarName="Sarah"
            matchStatus="new"
            presenceStatus="online"
            onPress={() => handlePress('13')}
          />
        </View>
        <View style={styles.itemContainer}>
          <ConversationListItem
            id="14"
            title="Expired Match"
            subtitle="This match has ended"
            timestamp={yesterday}
            avatarName="Michael"
            matchStatus="expired"
            onPress={() => handlePress('14')}
          />
        </View>
      </ShowcaseGroup>

      {/* Long Press */}
      <ShowcaseGroup title="Long Press (hold to test)">
        <View style={styles.itemContainer}>
          <ConversationListItem
            id="15"
            title="Long Press Me"
            subtitle="Hold for options"
            timestamp={now}
            avatarName="Test User"
            onPress={() => handlePress('15')}
            onLongPress={() => handleLongPress('15')}
          />
        </View>
      </ShowcaseGroup>
    </ShowcaseSection>
  );
}
