import React from 'react';
import { View, Alert } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { MessageBubble } from './MessageBubble';

const meta: Meta<typeof MessageBubble> = {
  title: 'Chat/MessageBubble',
  component: MessageBubble,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'image', 'file'],
      description: 'Type of message content',
    },
    direction: {
      control: 'select',
      options: ['incoming', 'outgoing'],
      description: 'Message direction (sent or received)',
    },
    status: {
      control: 'select',
      options: ['sending', 'sent', 'delivered', 'read', 'failed'],
      description: 'Message delivery status',
    },
    isGroup: {
      control: 'boolean',
      description: 'Whether this is a group chat message',
    },
    isDeleted: {
      control: 'boolean',
      description: 'Whether the message has been deleted',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Chat message bubble supporting text, images, and files with delivery status indicators.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MessageBubble>;

const now = new Date();
const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000);

export const Default: Story = {
  args: {
    direction: 'outgoing',
    text: 'Hello! How are you?',
    timestamp: now,
    status: 'read',
  },
};

export const Direction: Story = {
  render: () => (
    <View style={{ gap: 8, padding: 16 }}>
      <MessageBubble
        direction="incoming"
        text="This is an incoming message"
        timestamp={fiveMinAgo}
      />
      <MessageBubble
        direction="outgoing"
        text="This is an outgoing message"
        timestamp={now}
        status="read"
      />
    </View>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <View style={{ gap: 8, padding: 16 }}>
      <MessageBubble direction="outgoing" text="Sending..." timestamp={now} status="sending" />
      <MessageBubble direction="outgoing" text="Sent" timestamp={now} status="sent" />
      <MessageBubble direction="outgoing" text="Delivered" timestamp={now} status="delivered" />
      <MessageBubble direction="outgoing" text="Read" timestamp={now} status="read" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Message delivery status indicators for outgoing messages.',
      },
    },
  },
};

export const FailedMessage: Story = {
  args: {
    direction: 'outgoing',
    text: 'This message failed to send',
    status: 'failed',
    errorMessage: 'Network connection lost',
    onRetry: () => Alert.alert('Retry', 'Retrying...'),
  },
};

export const GroupChat: Story = {
  render: () => (
    <View style={{ gap: 8, padding: 16 }}>
      <MessageBubble
        direction="incoming"
        text="Hey everyone!"
        timestamp={fiveMinAgo}
        isGroup
        senderName="Alice"
        showSenderName
      />
      <MessageBubble
        direction="incoming"
        text="How's it going?"
        timestamp={now}
        isGroup
        senderName="Bob"
        showSenderName
      />
      <MessageBubble
        direction="outgoing"
        text="Great to see you all!"
        timestamp={now}
        status="read"
        isGroup
      />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Group chat messages with sender names displayed.',
      },
    },
  },
};

export const DeletedMessage: Story = {
  render: () => (
    <View style={{ gap: 8, padding: 16 }}>
      <MessageBubble direction="incoming" isDeleted timestamp={fiveMinAgo} />
      <MessageBubble direction="outgoing" isDeleted timestamp={now} />
    </View>
  ),
};

export const FileMessage: Story = {
  render: () => (
    <View style={{ gap: 8, padding: 16 }}>
      <MessageBubble
        type="file"
        direction="incoming"
        file={{
          name: 'Project_Proposal.pdf',
          size: 2 * 1024 * 1024,
          mimeType: 'application/pdf',
        }}
        timestamp={fiveMinAgo}
      />
      <MessageBubble
        type="file"
        direction="outgoing"
        file={{
          name: 'Report_Q4_2024.xlsx',
          size: 512 * 1024,
          mimeType: 'application/xlsx',
        }}
        timestamp={now}
        status="delivered"
      />
    </View>
  ),
};

export const ContinuousMessages: Story = {
  render: () => (
    <View style={{ gap: 2, padding: 16 }}>
      <MessageBubble
        direction="incoming"
        text="First message"
        isFirstInGroup
        isLastInGroup={false}
      />
      <MessageBubble
        direction="incoming"
        text="Middle message"
        isFirstInGroup={false}
        isLastInGroup={false}
      />
      <MessageBubble
        direction="incoming"
        text="Last message"
        timestamp={now}
        isFirstInGroup={false}
        isLastInGroup
      />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Continuous messages from the same sender with grouped corner styling.',
      },
    },
  },
};