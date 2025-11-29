import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['linear', 'circular'],
      description: 'Progress variant type',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the progress indicator',
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info'],
      description: 'Color scheme of the progress indicator',
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value between 0 and 100',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A progress indicator component supporting linear and circular variants with determinate/indeterminate modes.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 50,
    variant: 'linear',
  },
};

export const Linear: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
      }, 500);
      return () => clearInterval(interval);
    }, []);
    return (
      <View style={{ gap: 16, width: 300 }}>
        <Progress value={progress} variant="linear" />
        <Progress value={progress} variant="linear" showLabel />
        <Progress value={progress} variant="linear" size="sm" />
        <Progress value={progress} variant="linear" size="md" />
        <Progress value={progress} variant="linear" size="lg" />
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Linear progress indicators in different sizes with animated progress.',
      },
    },
  },
};

export const Circular: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
      }, 500);
      return () => clearInterval(interval);
    }, []);
    return (
      <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
        <Progress value={progress} variant="circular" size="sm" />
        <Progress value={progress} variant="circular" size="md" />
        <Progress value={progress} variant="circular" size="lg" />
        <Progress value={progress} variant="circular" size="lg" showLabel />
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Circular progress indicators in different sizes.',
      },
    },
  },
};

export const Indeterminate: Story = {
  render: () => (
    <View style={{ gap: 16, width: 300 }}>
      <Progress variant="linear" />
      <Progress variant="circular" size="md" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate progress indicators (continuously animating).',
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <View style={{ gap: 16, width: 300 }}>
      <Progress value={60} variant="linear" color="primary" />
      <Progress value={60} variant="linear" color="success" />
      <Progress value={60} variant="linear" color="warning" />
      <Progress value={60} variant="linear" color="error" />
      <Progress value={60} variant="linear" color="info" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress indicators with different color schemes.',
      },
    },
  },
};

export const Values: Story = {
  render: () => (
    <View style={{ gap: 16, width: 300 }}>
      <Progress value={0} variant="linear" showLabel />
      <Progress value={25} variant="linear" showLabel />
      <Progress value={50} variant="linear" showLabel />
      <Progress value={75} variant="linear" showLabel />
      <Progress value={100} variant="linear" showLabel />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress indicators with different values.',
      },
    },
  },
};

