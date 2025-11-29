import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Icon name (common name or platform-specific)',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the icon',
    },
    color: {
      control: 'text',
      description: 'Color of the icon (semantic name or custom color)',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Platform-native icon component using SF Symbols on iOS and Material Icons on Android/Web.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'checkmark',
    size: 'md',
    color: 'primary',
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <Icon name="checkmark" size="xs" />
      <Icon name="checkmark" size="sm" />
      <Icon name="checkmark" size="md" />
      <Icon name="checkmark" size="lg" />
      <Icon name="checkmark" size="xl" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons in different sizes.',
      },
    },
  },
};

export const CommonIcons: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      <Icon name="checkmark" size="lg" />
      <Icon name="close" size="lg" />
      <Icon name="plus" size="lg" />
      <Icon name="minus" size="lg" />
      <Icon name="search" size="lg" />
      <Icon name="edit" size="lg" />
      <Icon name="delete" size="lg" />
      <Icon name="share" size="lg" />
      <Icon name="heart" size="lg" />
      <Icon name="star" size="lg" />
      <Icon name="bookmark" size="lg" />
      <Icon name="bell" size="lg" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common icon names that map across platforms.',
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      <Icon name="heart-fill" size="lg" color="primary" />
      <Icon name="heart-fill" size="lg" color="secondary" />
      <Icon name="heart-fill" size="lg" color="tint" />
      <Icon name="heart-fill" size="lg" color="error" />
      <Icon name="heart-fill" size="lg" color="success" />
      <Icon name="heart-fill" size="lg" color="#FF6B6B" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons with different semantic colors and custom colors.',
      },
    },
  },
};

export const NavigationIcons: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      <Icon name="back" size="lg" />
      <Icon name="forward-nav" size="lg" />
      <Icon name="up" size="lg" />
      <Icon name="down" size="lg" />
      <Icon name="menu" size="lg" />
      <Icon name="more-horizontal" size="lg" />
      <Icon name="more-vertical" size="lg" />
      <Icon name="home" size="lg" />
      <Icon name="settings" size="lg" />
    </View>
  ),
};

export const CommunicationIcons: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      <Icon name="chat" size="lg" />
      <Icon name="chat-fill" size="lg" />
      <Icon name="phone" size="lg" />
      <Icon name="video" size="lg" />
      <Icon name="mic" size="lg" />
      <Icon name="mic-off" size="lg" />
      <Icon name="send" size="lg" />
      <Icon name="reply" size="lg" />
      <Icon name="forward" size="lg" />
    </View>
  ),
};

