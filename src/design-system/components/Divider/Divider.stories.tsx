import React from 'react';
import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['full', 'inset', 'middle', 'withLabel'],
      description: 'Visual variant of the divider',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the divider',
    },
    label: {
      control: 'text',
      description: 'Label text for withLabel variant',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A visual separator component following iOS Human Interface Guidelines with multiple variants and orientations.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <View style={{ padding: 16, width: '100%' }}>
      <Divider variant="full" />
    </View>
  ),
};

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 24, padding: 16 }}>
      <View>
        <Text style={{ marginBottom: 8 }}>Full (edge-to-edge)</Text>
        <Divider variant="full" />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Inset (left inset)</Text>
        <Divider variant="inset" />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Middle (inset on both sides)</Text>
        <Divider variant="middle" />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>With Label</Text>
        <Divider variant="withLabel" label="OR" />
      </View>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available divider variants following iOS list separator styles.',
      },
    },
  },
};

export const Vertical: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', height: 100, alignItems: 'center', gap: 16 }}>
      <Text>Left</Text>
      <Divider orientation="vertical" />
      <Text>Right</Text>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical divider for separating horizontal content.',
      },
    },
  },
};

export const WithLabel: Story = {
  render: () => (
    <View style={{ padding: 16, width: '100%' }}>
      <Divider variant="withLabel" label="OR" />
    </View>
  ),
};

export const InList: Story = {
  render: () => (
    <View style={{ padding: 16, gap: 0 }}>
      <View style={{ paddingVertical: 12 }}>
        <Text>Item 1</Text>
      </View>
      <Divider variant="inset" />
      <View style={{ paddingVertical: 12 }}>
        <Text>Item 2</Text>
      </View>
      <Divider variant="inset" />
      <View style={{ paddingVertical: 12 }}>
        <Text>Item 3</Text>
      </View>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Divider used in a list context with inset variant (iOS table view style).',
      },
    },
  },
};

