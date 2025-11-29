import React, { useState } from 'react';
import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Pressable } from './Pressable';

const meta: Meta<typeof Pressable> = {
  title: 'Components/Pressable',
  component: Pressable,
  tags: ['autodocs'],
  argTypes: {
    pressAnimation: {
      control: 'select',
      options: ['opacity', 'scale', 'both', 'none'],
      description: 'Type of press animation',
    },
    hapticFeedback: {
      control: 'select',
      options: ['light', 'medium', 'heavy', 'selection', 'none'],
      description: 'Type of haptic feedback',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the pressable is disabled',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'An enhanced Pressable component with haptics, visual feedback, and accessibility support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pressable>;

export const Default: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <Pressable
        onPress={() => setCount(count + 1)}
        style={{
          padding: 16,
          backgroundColor: '#007AFF',
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>
          Pressed {count} times
        </Text>
      </Pressable>
    );
  },
};

export const PressAnimations: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Pressable
        pressAnimation="opacity"
        style={{
          padding: 16,
          backgroundColor: '#007AFF',
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Opacity Animation</Text>
      </Pressable>
      <Pressable
        pressAnimation="scale"
        style={{
          padding: 16,
          backgroundColor: '#34C759',
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Scale Animation</Text>
      </Pressable>
      <Pressable
        pressAnimation="both"
        style={{
          padding: 16,
          backgroundColor: '#FF9500',
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Both Animations</Text>
      </Pressable>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different press animation types: opacity, scale, and both.',
      },
    },
  },
};

export const WithState: Story = {
  render: () => (
    <Pressable
      style={({ pressed }) => ({
        padding: 16,
        backgroundColor: pressed ? '#0051D5' : '#007AFF',
        borderRadius: 8,
        alignItems: 'center',
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      {({ pressed }) => (
        <Text style={{ color: 'white' }}>
          {pressed ? 'Pressed!' : 'Press Me'}
        </Text>
      )}
    </Pressable>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pressable with state-based styling using render function.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Pressable
        disabled
        style={{
          padding: 16,
          backgroundColor: '#007AFF',
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Disabled Pressable</Text>
      </Pressable>
      <Pressable
        style={{
          padding: 16,
          backgroundColor: '#007AFF',
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Enabled Pressable</Text>
      </Pressable>
    </View>
  ),
};

export const LongPress: Story = {
  render: () => {
    const [message, setMessage] = useState('Press and hold');
    return (
      <Pressable
        onLongPress={() => setMessage('Long pressed!')}
        onPress={() => setMessage('Regular press')}
        style={{
          padding: 16,
          backgroundColor: '#AF52DE',
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>{message}</Text>
      </Pressable>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Pressable with long press handler.',
      },
    },
  },
};

