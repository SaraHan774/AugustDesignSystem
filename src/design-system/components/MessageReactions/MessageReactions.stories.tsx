import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MessageReactions } from './MessageReactions';

const meta: Meta<typeof MessageReactions> = {
  title: 'Components/MessageReactions',
  component: MessageReactions,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An emoji reactions display component designed for chat messages.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MessageReactions>;

export const Default: Story = {
  args: {
    reactions: [
      { emoji: '👍', count: 5, isSelected: true },
      { emoji: '❤️', count: 3 },
      { emoji: '😂', count: 2 },
    ],
  },
};

export const ManyReactions: Story = {
  args: {
    reactions: [
      { emoji: '👍', count: 12, isSelected: true },
      { emoji: '❤️', count: 8 },
      { emoji: '😂', count: 5 },
      { emoji: '😮', count: 3 },
      { emoji: '😢', count: 2 },
      { emoji: '🙏', count: 1 },
    ],
    maxVisible: 5,
  },
};

