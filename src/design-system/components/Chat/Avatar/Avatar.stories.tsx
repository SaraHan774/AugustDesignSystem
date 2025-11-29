import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Chat/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar',
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy', undefined],
      description: 'Presence status indicator',
    },
    showBorder: {
      control: 'boolean',
      description: 'Show border around avatar',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'User avatar component with initials fallback, status indicators, and group avatar support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Avatar name="John Doe" size="xs" />
      <Avatar name="John Doe" size="sm" />
      <Avatar name="John Doe" size="md" />
      <Avatar name="John Doe" size="lg" />
      <Avatar name="John Doe" size="xl" />
    </View>
  ),
};

export const InitialsFallback: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <Avatar name="Alice Brown" size="md" />
      <Avatar name="Charlie Davis" size="md" />
      <Avatar name="Eve" size="md" />
      <Avatar name="Frank Miller" size="md" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'When no image is provided, the avatar displays initials from the name.',
      },
    },
  },
};

export const WithStatus: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <Avatar name="Online User" size="lg" status="online" />
      <Avatar name="Offline User" size="lg" status="offline" />
      <Avatar name="Away User" size="lg" status="away" />
      <Avatar name="Busy User" size="lg" status="busy" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar with presence status indicators.',
      },
    },
  },
};

export const GroupAvatars: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 24 }}>
      <Avatar
        group={[
          { name: 'Alice' },
          { name: 'Bob' },
        ]}
        size="md"
      />
      <Avatar
        group={[
          { name: 'Charlie' },
          { name: 'Diana' },
          { name: 'Eve' },
        ]}
        size="md"
      />
      <Avatar
        group={[
          { name: 'Frank' },
          { name: 'Grace' },
          { name: 'Henry' },
        ]}
        size="lg"
      />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Stacked avatars for group conversations (supports up to 3).',
      },
    },
  },
};

export const WithBorder: Story = {
  args: {
    name: 'Bordered Avatar',
    size: 'lg',
    showBorder: true,
    status: 'online',
  },
};

export const CustomInitials: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <Avatar initials="VIP" size="md" />
      <Avatar initials="AI" size="md" />
      <Avatar initials="?" size="md" />
    </View>
  ),
};