import React from 'react';
import { Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

const meta: Meta<typeof Box> = {
  title: 'Components/Primitives/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
      description: 'Padding on all sides',
    },
    margin: {
      control: 'select',
      options: ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
      description: 'Margin on all sides',
    },
    borderRadius: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'full'],
      description: 'Border radius',
    },
    shadow: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Shadow elevation level',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A fundamental layout primitive that maps design tokens to View styles. Provides convenient API for spacing, colors, and layout.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children: <Text>Box Content</Text>,
    padding: 'md',
    backgroundColor: 'background.secondary',
  },
};

export const Spacing: Story = {
  render: () => (
    <Box gap="md">
      <Box padding="sm" backgroundColor="background.secondary">
        <Text>Small Padding</Text>
      </Box>
      <Box padding="md" backgroundColor="background.secondary">
        <Text>Medium Padding</Text>
      </Box>
      <Box padding="lg" backgroundColor="background.secondary">
        <Text>Large Padding</Text>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Box with different padding values using spacing tokens.',
      },
    },
  },
};

export const BorderRadius: Story = {
  render: () => (
    <Box flexDirection="row" gap="md" style={{ flexWrap: 'wrap' }}>
      <Box padding="md" backgroundColor="background.secondary" borderRadius="xs">
        <Text>XS Radius</Text>
      </Box>
      <Box padding="md" backgroundColor="background.secondary" borderRadius="sm">
        <Text>SM Radius</Text>
      </Box>
      <Box padding="md" backgroundColor="background.secondary" borderRadius="md">
        <Text>MD Radius</Text>
      </Box>
      <Box padding="md" backgroundColor="background.secondary" borderRadius="lg">
        <Text>LG Radius</Text>
      </Box>
      <Box padding="md" backgroundColor="background.secondary" borderRadius="full">
        <Text>Full Radius</Text>
      </Box>
    </Box>
  ),
};

export const Shadows: Story = {
  render: () => (
    <Box gap="lg" padding="lg">
      <Box padding="lg" backgroundColor="background.primary" shadow="xs">
        <Text>Extra Small Shadow</Text>
      </Box>
      <Box padding="lg" backgroundColor="background.primary" shadow="sm">
        <Text>Small Shadow</Text>
      </Box>
      <Box padding="lg" backgroundColor="background.primary" shadow="md">
        <Text>Medium Shadow</Text>
      </Box>
      <Box padding="lg" backgroundColor="background.primary" shadow="lg">
        <Text>Large Shadow</Text>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Box with different shadow elevation levels.',
      },
    },
  },
};

export const FlexLayout: Story = {
  render: () => (
    <Box gap="md">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        padding="md"
        backgroundColor="background.secondary"
      >
        <Text>Left</Text>
        <Text>Right</Text>
      </Box>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="sm"
        padding="md"
        backgroundColor="background.secondary"
      >
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Box with flex layout properties for arranging children.',
      },
    },
  },
};

export const CardExample: Story = {
  render: () => (
    <Box
      padding="lg"
      borderRadius="md"
      shadow="sm"
      backgroundColor="background.primary"
      maxWidth={300}
    >
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
        Card Title
      </Text>
      <Text style={{ color: '#666' }}>
        This is a card-like container using Box with padding, border radius, and shadow.
      </Text>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Box used as a card container with multiple styling properties.',
      },
    },
  },
};

