import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the spinner',
    },
    color: {
      control: 'text',
      description: 'Color of the spinner (semantic name or custom color)',
    },
    label: {
      control: 'text',
      description: 'Optional label text',
    },
    labelPosition: {
      control: 'select',
      options: ['bottom', 'right'],
      description: 'Position of the label relative to spinner',
    },
    animating: {
      control: 'boolean',
      description: 'Whether the spinner is animating',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A themed loading spinner/activity indicator with optional label support. Uses the native ActivityIndicator for optimal performance.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'tint',
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinners in different sizes.',
      },
    },
  },
};

export const WithLabel: Story = {
  render: () => (
    <View style={{ gap: 24, alignItems: 'center' }}>
      <Spinner size="md" label="Loading..." labelPosition="bottom" />
      <Spinner size="md" label="Refreshing" labelPosition="right" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner with label in different positions.',
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
      <Spinner size="lg" color="primary" />
      <Spinner size="lg" color="tint" />
      <Spinner size="lg" color="secondary" />
      <Spinner size="lg" color="#FF6B6B" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinners with different colors.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <View style={{ gap: 16, alignItems: 'center' }}>
      <Spinner size="md" animating={true} label="Animating" />
      <Spinner size="md" animating={false} label="Stopped" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner in different animation states.',
      },
    },
  },
};

