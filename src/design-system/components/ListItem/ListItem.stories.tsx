import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from './ListItem';

const meta: Meta<typeof ListItem> = {
  title: 'Components/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A configurable list row component following iOS Human Interface Guidelines for table view cells.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  args: {
    title: 'List Item',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle text',
  },
};

export const WithAccessory: Story = {
  render: () => (
    <View style={{ gap: 0 }}>
      <ListItem title="Disclosure" accessory="disclosure" />
      <ListItem title="Checkmark" accessory="checkmark" />
      <ListItem title="Detail" accessory="detail" />
      <ListItem title="Switch" accessory="switch" switchValue={true} onSwitchChange={() => {}} />
    </View>
  ),
};

