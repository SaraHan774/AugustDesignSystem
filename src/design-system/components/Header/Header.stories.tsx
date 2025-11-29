import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 0, height: 0 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}
      >
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A top navigation bar component following iOS Human Interface Guidelines.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: 'Title',
  },
};

export const WithBackButton: Story = {
  args: {
    title: 'Settings',
    showBackButton: true,
    onBackPress: () => console.log('Back pressed'),
  },
};

export const WithActions: Story = {
  args: {
    title: 'Messages',
    rightActions: [
      { key: 'edit', icon: 'edit', onPress: () => console.log('Edit') },
      { key: 'more', icon: 'more-vertical', onPress: () => console.log('More') },
    ],
  },
};

