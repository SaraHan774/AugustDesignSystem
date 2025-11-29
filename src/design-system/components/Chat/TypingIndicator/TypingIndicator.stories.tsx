import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { TypingIndicator } from './TypingIndicator';

const meta: Meta<typeof TypingIndicator> = {
  title: 'Chat/TypingIndicator',
  component: TypingIndicator,
  tags: ['autodocs'],
  argTypes: {
    isTyping: {
      control: 'boolean',
      description: 'Whether to show the typing indicator',
    },
    variant: {
      control: 'select',
      options: ['dots', 'text', 'bubble'],
      description: 'Visual variant of the indicator',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the indicator',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Animated typing indicator showing when users are typing in a chat.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TypingIndicator>;

export const Default: Story = {
  args: {
    isTyping: true,
    variant: 'dots',
  },
};

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <TypingIndicator isTyping variant="dots" />
      <TypingIndicator isTyping variant="bubble" />
      <TypingIndicator isTyping variant="text" />
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <TypingIndicator isTyping variant="dots" size="sm" />
      <TypingIndicator isTyping variant="dots" size="md" />
      <TypingIndicator isTyping variant="dots" size="lg" />
    </View>
  ),
};

export const WithUsers: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <TypingIndicator isTyping variant="text" typingUsers={['John']} />
      <TypingIndicator isTyping variant="text" typingUsers={['Alice', 'Bob']} />
      <TypingIndicator isTyping variant="text" typingUsers={['User 1', 'User 2', 'User 3']} />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text variant with user names for group chats.',
      },
    },
  },
};

export const CustomText: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <TypingIndicator isTyping variant="text" text="Someone is writing..." />
      <TypingIndicator isTyping variant="text" text="Composing a message..." />
    </View>
  ),
};

export const BubbleVariant: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <TypingIndicator isTyping variant="bubble" size="sm" />
      <TypingIndicator isTyping variant="bubble" size="md" />
      <TypingIndicator isTyping variant="bubble" size="lg" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Bubble variant styled like a message bubble.',
      },
    },
  },
};