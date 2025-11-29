import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TabBar } from './TabBar';

const meta: Meta<typeof TabBar> = {
  title: 'Components/TabBar',
  component: TabBar,
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
        component: 'A bottom tab bar component following iOS Human Interface Guidelines.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabBar>;

function TabBarExample() {
  const [activeKey, setActiveKey] = useState('home');
  return (
    <TabBar
      items={[
        { key: 'home', label: 'Home', icon: 'home' },
        { key: 'search', label: 'Search', icon: 'search' },
        { key: 'chat', label: 'Chat', icon: 'chat' },
        { key: 'profile', label: 'Profile', icon: 'person' },
      ]}
      activeKey={activeKey}
      onTabPress={setActiveKey}
    />
  );
}

export const Default: Story = {
  render: () => <TabBarExample />,
};

export const WithBadges: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState('home');
    return (
      <TabBar
        items={[
          { key: 'home', label: 'Home', icon: 'home' },
          { key: 'chat', label: 'Chat', icon: 'chat', badge: 5 },
          { key: 'notifications', label: 'Notifications', icon: 'bell', badgeDot: true },
          { key: 'profile', label: 'Profile', icon: 'person' },
        ]}
        activeKey={activeKey}
        onTabPress={setActiveKey}
      />
    );
  },
};

