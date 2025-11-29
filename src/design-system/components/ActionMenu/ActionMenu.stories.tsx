import React, { useState } from 'react';
import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActionMenu } from './ActionMenu';
import { Button } from '../Button';

const meta: Meta<typeof ActionMenu> = {
  title: 'Components/ActionMenu',
  component: ActionMenu,
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
        component: 'A contextual action menu component following iOS Human Interface Guidelines.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionMenu>;

function ActionMenuExample() {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Button title="Show Action Menu" onPress={() => setVisible(true)} />
      <ActionMenu
        visible={visible}
        onClose={() => setVisible(false)}
        items={[
          { key: 'copy', label: 'Copy', icon: 'copy', onPress: () => setVisible(false) },
          { key: 'share', label: 'Share', icon: 'share', onPress: () => setVisible(false) },
          { key: 'delete', label: 'Delete', icon: 'delete', destructive: true, onPress: () => setVisible(false) },
        ]}
      />
    </View>
  );
}

export const Default: Story = {
  render: () => <ActionMenuExample />,
};

