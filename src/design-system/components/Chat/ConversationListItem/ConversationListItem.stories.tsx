import React from 'react';
import { View, Alert } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { ConversationListItem } from './ConversationListItem';

const meta: Meta<typeof ConversationListItem> = {
  title: 'Chat/ConversationListItem',
  component: ConversationListItem,
  tags: ['autodocs'],
  argTypes: {
    isGroup: {
      control: 'boolean',
      description: 'Whether this is a group conversation',
    },
    unreadCount: {
      control: 'number',
      description: 'Number of unread messages',
    },
    isMuted: {
      control: 'boolean',
      description: 'Whether notifications are muted',
    },
    isPinned: {
      control: 'boolean',
      description: 'Whether the conversation is pinned',
    },
    isTyping: {
      control: 'boolean',
      description: 'Whether someone is typing',
    },
    presenceStatus: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy', undefined],
      description: 'User presence status',
    },
    matchStatus: {
      control: 'select',
      options: ['new', 'active', 'expired', undefined],
      description: 'Match status for dating apps',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Conversation list item with avatar, preview, timestamps, and badges.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConversationListItem>;

const now = new Date();
const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000);
const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

const handlePress = (id: string) => Alert.alert('Open', `Opening conversation: ${id}`);

export const Default: Story = {
  args: {
    id: '1',
    title: 'John Doe',
    subtitle: 'Hey, how are you doing?',
    timestamp: fiveMinAgo,
    avatarName: 'John Doe',
    presenceStatus: 'online',
    onPress: () => handlePress('1'),
  },
};

export const BasicConversations: Story = {
  render: () => (
    <View style={{ backgroundColor: '#f2f2f7' }}>
      <View style={{ backgroundColor: '#fff' }}>
        <ConversationListItem
          id="1"
          title="John Doe"
          subtitle="Hey, how are you?"
          timestamp={fiveMinAgo}
          avatarName="John Doe"
          presenceStatus="online"
          onPress={() => handlePress('1')}
        />
      </View>
      <View style={{ height: 1, backgroundColor: '#e5e5ea' }} />
      <View style={{ backgroundColor: '#fff' }}>
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
      <View style={{ height: 1, backgroundColor: '#e5e5ea' }} />
      <View style={{ backgroundColor: '#fff' }}>
        <ConversationListItem
          id="3"
          title="Bob Wilson"
          subtitle="Thanks for the update"
          timestamp={yesterday}
          avatarName="Bob Wilson"
          onPress={() => handlePress('3')}
        />
      </View>
    </View>
  ),
};

export const WithUnreadCount: Story = {
  render: () => (
    <View style={{ backgroundColor: '#f2f2f7' }}>
      <View style={{ backgroundColor: '#fff' }}>
        <ConversationListItem
          id="1"
          title="Alice Brown"
          subtitle="Did you see the news?"
          timestamp={fiveMinAgo}
          avatarName="Alice Brown"
          unreadCount={3}
          presenceStatus="online"
          onPress={() => handlePress('1')}
        />
      </View>
      <View style={{ height: 1, backgroundColor: '#e5e5ea' }} />
      <View style={{ backgroundColor: '#fff' }}>
        <ConversationListItem
          id="2"
          title="Charlie Davis"
          subtitle="Multiple messages waiting..."
          timestamp={oneHourAgo}
          avatarName="Charlie Davis"
          unreadCount={99}
          onPress={() => handlePress('2')}
        />
      </View>
      <View style={{ height: 1, backgroundColor: '#e5e5ea' }} />
      <View style={{ backgroundColor: '#fff' }}>
        <ConversationListItem
          id="3"
          title="Diana Prince"
          subtitle="You have many unread"
          timestamp={yesterday}
          avatarName="Diana Prince"
          unreadCount={150}
          onPress={() => handlePress('3')}
        />
      </View>
    </View>
  ),
};

export const GroupConversations: Story = {
  render: () => (
    <View style={{ backgroundColor: '#f2f2f7' }}>
      <View style={{ backgroundColor: '#fff' }}>
        <ConversationListItem
          id="1"
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
          onPress={() => handlePress('1')}
        />
      </View>
      <View style={{ height: 1, backgroundColor: '#e5e5ea' }} />
      <View style={{ backgroundColor: '#fff' }}>
        <ConversationListItem
          id="2"
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
          onPress={() => handlePress('2')}
        />
      </View>
    </View>
  ),
};

export const TypingIndicator: Story = {
  render: () => (
    <View style={{ backgroundColor: '#f2f2f7' }}>
      <View style={{ backgroundColor: '#fff' }}>
        <ConversationListItem
          id="1"
          title="Eve Johnson"
          timestamp={now}
          avatarName="Eve Johnson"
          presenceStatus="online"
          isTyping
          onPress={() => handlePress('1')}
        />
      </View>
      <View style={{ height: 1, backgroundColor: '#e5e5ea' }} />
      <View style={{ backgroundColor: '#fff' }}>
        <ConversationListItem
          id="2"
          title="Design Team"
          timestamp={now}
          isGroup
          groupAvatars={[
            { name: 'Frank' },
            { name: 'Grace' },
          ]}
          isTyping
          typingUsers={['Frank']}
          onPress={() => handlePress('2')}
        />
      </View>
    </View>
  ),
};

export const MutedAndPinned: Story = {
  render: () => (
    <View style={{ backgroundColor: '#f2f2f7' }}>
      <View style={{ backgroundColor: '#fff' }}>
        <ConversationListItem
          id="1"
          title="Muted Chat"
          subtitle="You won't get notifications"
          timestamp={oneHourAgo}
          avatarName="Muted User"
          isMuted
          unreadCount={12}
          onPress={() => handlePress('1')}
        />
      </View>
      <View style={{ height: 1, backgroundColor: '#e5e5ea' }} />
      <View style={{ backgroundColor: '#fff' }}>
        <ConversationListItem
          id="2"
          title="Pinned Chat"
          subtitle="Always at the top"
          timestamp={yesterday}
          avatarName="Important Person"
          isPinned
          onPress={() => handlePress('2')}
        />
      </View>
    </View>
  ),
};

export const MatchStatus: Story = {
  render: () => (
    <View style={{ backgroundColor: '#f2f2f7' }}>
      <View style={{ backgroundColor: '#fff' }}>
        <ConversationListItem
          id="1"
          title="New Match"
          subtitle="Say hello!"
          timestamp={fiveMinAgo}
          avatarName="Sarah"
          matchStatus="new"
          presenceStatus="online"
          onPress={() => handlePress('1')}
        />
      </View>
      <View style={{ height: 1, backgroundColor: '#e5e5ea' }} />
      <View style={{ backgroundColor: '#fff' }}>
        <ConversationListItem
          id="2"
          title="Expired Match"
          subtitle="This match has ended"
          timestamp={yesterday}
          avatarName="Michael"
          matchStatus="expired"
          onPress={() => handlePress('2')}
        />
      </View>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Match status badges for dating app scenarios.',
      },
    },
  },
};