import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { UnreadBadge } from './UnreadBadge';

const meta: Meta<typeof UnreadBadge> = {
  title: 'Chat/UnreadBadge',
  component: UnreadBadge,
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: 'number',
      description: 'Number of unread messages',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'destructive', 'neutral'],
      description: 'Color scheme of the badge',
    },
    dot: {
      control: 'boolean',
      description: 'Show as dot without count',
    },
    maxCount: {
      control: 'number',
      description: 'Maximum count before showing overflow',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Badge component for displaying unread message counts in chat lists.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UnreadBadge>;

export const Default: Story = {
  args: {
    count: 5,
  },
};

export const CountDisplay: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <UnreadBadge count={1} />
      <UnreadBadge count={5} />
      <UnreadBadge count={10} />
      <UnreadBadge count={50} />
      <UnreadBadge count={99} />
      <UnreadBadge count={150} />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge automatically shows "99+" for counts exceeding the max.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <UnreadBadge count={5} size="sm" />
      <UnreadBadge count={5} size="md" />
      <UnreadBadge count={5} size="lg" />
    </View>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <UnreadBadge count={5} colorScheme="primary" />
      <UnreadBadge count={5} colorScheme="destructive" />
      <UnreadBadge count={5} colorScheme="neutral" />
    </View>
  ),
};

export const DotMode: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <UnreadBadge count={1} size="sm" dot />
      <UnreadBadge count={1} size="md" dot />
      <UnreadBadge count={1} size="lg" dot />
      <UnreadBadge count={1} dot colorScheme="destructive" />
      <UnreadBadge count={1} dot colorScheme="neutral" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dot-only mode for minimal unread indication.',
      },
    },
  },
};

export const CustomMaxCount: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <UnreadBadge count={500} maxCount={99} />
      <UnreadBadge count={500} maxCount={999} />
      <UnreadBadge count={10000} maxCount={9999} />
    </View>
  ),
};