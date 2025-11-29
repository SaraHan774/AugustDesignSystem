import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Chat/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
      description: 'Presence status to display',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
    },
    dotOnly: {
      control: 'boolean',
      description: 'Show only the dot without label',
    },
    showBorder: {
      control: 'boolean',
      description: 'Show border around the dot (for avatar overlay)',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Presence status indicator showing online/offline status for users.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Default: Story = {
  args: {
    status: 'online',
    label: 'Online',
  },
};

export const StatusTypes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      <StatusBadge status="online" label="Online" />
      <StatusBadge status="offline" label="Offline" />
      <StatusBadge status="away" label="Away" />
      <StatusBadge status="busy" label="Busy" />
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <StatusBadge status="online" size="sm" label="Small" />
      <StatusBadge status="online" size="md" label="Medium" />
      <StatusBadge status="online" size="lg" label="Large" />
    </View>
  ),
};

export const DotOnly: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <StatusBadge status="online" size="sm" dotOnly />
      <StatusBadge status="online" size="md" dotOnly />
      <StatusBadge status="online" size="lg" dotOnly />
      <StatusBadge status="offline" size="md" dotOnly />
      <StatusBadge status="away" size="md" dotOnly />
      <StatusBadge status="busy" size="md" dotOnly />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dot-only mode for compact display, often used on avatars.',
      },
    },
  },
};

export const WithBorder: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <StatusBadge status="online" size="sm" dotOnly showBorder />
      <StatusBadge status="online" size="md" dotOnly showBorder />
      <StatusBadge status="online" size="lg" dotOnly showBorder />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Bordered dots for overlay on avatars.',
      },
    },
  },
};

export const CustomLabels: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <StatusBadge status="online" label="Active now" />
      <StatusBadge status="offline" label="Last seen 5 min ago" />
      <StatusBadge status="away" label="In a meeting" />
    </View>
  ),
};