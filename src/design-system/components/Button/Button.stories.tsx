import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'tinted', 'gray', 'outlined', 'ghost'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'destructive', 'success', 'neutral'],
      description: 'Color scheme for semantic meaning',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button takes full width',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A versatile button component following Apple Human Interface Guidelines with multiple variants, sizes, and states.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    title: 'Button',
    variant: 'filled',
    size: 'md',
    colorScheme: 'primary',
  },
};

export const Variants: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      <Button title="Filled" variant="filled" />
      <Button title="Tinted" variant="tinted" />
      <Button title="Gray" variant="gray" />
      <Button title="Outlined" variant="outlined" />
      <Button title="Ghost" variant="ghost" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants following iOS button styles.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Button title="Small" size="sm" />
      <Button title="Medium" size="md" />
      <Button title="Large" size="lg" />
    </View>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      <Button title="Primary" colorScheme="primary" />
      <Button title="Destructive" colorScheme="destructive" />
      <Button title="Success" colorScheme="success" />
      <Button title="Neutral" colorScheme="neutral" />
    </View>
  ),
};

export const OutlinedVariants: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      <Button title="Primary" variant="outlined" colorScheme="primary" />
      <Button title="Destructive" variant="outlined" colorScheme="destructive" />
      <Button title="Success" variant="outlined" colorScheme="success" />
      <Button title="Neutral" variant="outlined" colorScheme="neutral" />
    </View>
  ),
};

export const States: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      <Button title="Normal" />
      <Button title="Disabled" disabled />
      <Button title="Loading" loading />
      <Button title="Loading..." loading loadingText="Loading..." />
    </View>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <View style={{ width: 300, gap: 8 }}>
      <Button title="Full Width Primary" fullWidth />
      <Button title="Full Width Outlined" variant="outlined" fullWidth />
    </View>
  ),
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    title: 'Save',
    loading: true,
    loadingText: 'Saving...',
  },
};