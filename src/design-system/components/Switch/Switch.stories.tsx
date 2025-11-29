import React, { useState } from 'react';
import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the switch',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'An iOS-style toggle switch component following Apple Human Interface Guidelines.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(false);
    return <Switch value={value} onValueChange={setValue} />;
  },
};

export const Sizes: Story = {
  render: () => {
    const [value1, setValue1] = useState(false);
    const [value2, setValue2] = useState(false);
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
        <View style={{ alignItems: 'center', gap: 8 }}>
          <Switch value={value1} onValueChange={setValue1} size="sm" />
          <Text>Small</Text>
        </View>
        <View style={{ alignItems: 'center', gap: 8 }}>
          <Switch value={value2} onValueChange={setValue2} size="md" />
          <Text>Medium</Text>
        </View>
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Switches in different sizes.',
      },
    },
  },
};

export const States: Story = {
  render: () => {
    const [on, setOn] = useState(true);
    const [off, setOff] = useState(false);
    return (
      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Switch value={on} onValueChange={setOn} />
          <Text>On</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Switch value={off} onValueChange={setOff} />
          <Text>Off</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Switch value={true} onValueChange={() => {}} disabled />
          <Text>Disabled (On)</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Switch value={false} onValueChange={() => {}} disabled />
          <Text>Disabled (Off)</Text>
        </View>
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch in different states: on, off, and disabled.',
      },
    },
  },
};

export const WithLabel: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    return (
      <View style={{ gap: 16, padding: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4 }}>Push Notifications</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>Receive notifications on your device</Text>
          </View>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4 }}>Dark Mode</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>Use dark appearance</Text>
          </View>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch used in a settings list with labels.',
      },
    },
  },
};

