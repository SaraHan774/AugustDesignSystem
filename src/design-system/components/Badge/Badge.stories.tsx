import React from 'react';
import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['count', 'dot', 'label'],
      description: 'Badge variant type',
    },
    color: {
      control: 'select',
      options: ['primary', 'error', 'success', 'warning', 'info', 'neutral'],
      description: 'Color scheme of the badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the badge',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A generic badge component supporting count, dot, and label variants with position anchoring.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    count: 5,
    variant: 'count',
  },
};

export const Variants: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <Badge count={5} variant="count" />
      <Badge variant="dot" />
      <Badge label="New" variant="label" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge in different variants: count, dot, and label.',
      },
    },
  },
};

export const Counts: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <Badge count={1} />
      <Badge count={5} />
      <Badge count={99} />
      <Badge count={150} maxCount={99} />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge with different count values. Shows "99+" when exceeding maxCount.',
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <Badge count={5} color="primary" />
      <Badge count={5} color="error" />
      <Badge count={5} color="success" />
      <Badge count={5} color="warning" />
      <Badge count={5} color="info" />
      <Badge count={5} color="neutral" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge with different color schemes.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <Badge count={5} size="sm" />
      <Badge count={5} size="md" />
    </View>
  ),
};

export const WithChildren: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <Badge count={5} position="top-right">
        <View style={{ width: 40, height: 40, backgroundColor: '#E5E5EA', borderRadius: 8 }} />
      </Badge>
      <Badge count={3} position="top-left">
        <View style={{ width: 40, height: 40, backgroundColor: '#E5E5EA', borderRadius: 8 }} />
      </Badge>
      <Badge variant="dot" position="bottom-right">
        <View style={{ width: 40, height: 40, backgroundColor: '#E5E5EA', borderRadius: 8 }} />
      </Badge>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge positioned relative to children (overlay style).',
      },
    },
  },
};

export const Positions: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 24, flexWrap: 'wrap' }}>
      <Badge count={5} position="top-right">
        <View style={{ width: 50, height: 50, backgroundColor: '#E5E5EA', borderRadius: 8 }} />
      </Badge>
      <Badge count={5} position="top-left">
        <View style={{ width: 50, height: 50, backgroundColor: '#E5E5EA', borderRadius: 8 }} />
      </Badge>
      <Badge count={5} position="bottom-right">
        <View style={{ width: 50, height: 50, backgroundColor: '#E5E5EA', borderRadius: 8 }} />
      </Badge>
      <Badge count={5} position="bottom-left">
        <View style={{ width: 50, height: 50, backgroundColor: '#E5E5EA', borderRadius: 8 }} />
      </Badge>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge in different positions when wrapping children.',
      },
    },
  },
};

