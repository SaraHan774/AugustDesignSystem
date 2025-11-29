import React, { useState } from 'react';
import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Sheet } from './Sheet';
import { Button } from '../Button';

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
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
        component: 'A modal surface sliding up from bottom following iOS Human Interface Guidelines.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

function SheetExample() {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Button title="Open Sheet" onPress={() => setVisible(true)} />
      <Sheet visible={visible} onClose={() => setVisible(false)}>
        <View style={{ padding: 20 }}>
          <Text>Sheet content goes here</Text>
        </View>
      </Sheet>
    </View>
  );
}

export const Default: Story = {
  render: () => <SheetExample />,
};

