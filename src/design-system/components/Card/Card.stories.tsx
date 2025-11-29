import React from 'react';
import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Card visual variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding inside the card',
    },
    pressable: {
      control: 'boolean',
      description: 'Whether the card is pressable',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A content grouping container component supporting elevated, outlined, and filled variants.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: <Text>Card content goes here</Text>,
    variant: 'elevated',
  },
};

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Card variant="elevated" padding="md">
        <Text>Elevated card with shadow</Text>
      </Card>
      <Card variant="outlined" padding="md">
        <Text>Outlined card with border</Text>
      </Card>
      <Card variant="filled" padding="md">
        <Text>Filled card with solid background</Text>
      </Card>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card in different visual variants.',
      },
    },
  },
};

export const WithHeader: Story = {
  render: () => (
    <Card
      variant="elevated"
      header={
        <View style={{ paddingBottom: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Card Title</Text>
          <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>Subtitle</Text>
        </View>
      }
    >
      <Text>Card content with header</Text>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card
      variant="elevated"
      footer={
        <View style={{ paddingTop: 12, flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
          <Text style={{ color: '#007AFF' }}>Cancel</Text>
          <Text style={{ color: '#007AFF', fontWeight: '600' }}>Save</Text>
        </View>
      }
    >
      <Text>Card content with footer</Text>
    </Card>
  ),
};

export const Pressable: Story = {
  render: () => (
    <Card
      variant="elevated"
      pressable
      onPress={() => console.log('Card pressed')}
    >
      <Text>Pressable card - tap to interact</Text>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card that can be pressed to trigger an action.',
      },
    },
  },
};

export const PaddingSizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Card variant="outlined" padding="none">
        <Text>No padding</Text>
      </Card>
      <Card variant="outlined" padding="sm">
        <Text>Small padding</Text>
      </Card>
      <Card variant="outlined" padding="md">
        <Text>Medium padding (default)</Text>
      </Card>
      <Card variant="outlined" padding="lg">
        <Text>Large padding</Text>
      </Card>
    </View>
  ),
};

