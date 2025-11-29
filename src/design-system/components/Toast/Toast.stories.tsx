import React, { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProvider, useToast } from './index';
import { Button } from '../Button';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
      description: 'Visual variant for semantic styling',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'Position on screen',
    },
    duration: {
      control: 'number',
      description: 'Duration in milliseconds before auto-dismiss',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A notification toast component with slide animations, multiple variants, and action button support. Use ToastProvider and useToast hook for imperative API.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Hook-based example component
function ToastExample() {
  const { show } = useToast();
  return (
    <View style={{ gap: 12 }}>
      <Button
        title="Show Default Toast"
        onPress={() => show({ message: 'This is a default toast' })}
      />
      <Button
        title="Show Success Toast"
        onPress={() => show({ message: 'Operation completed!', variant: 'success' })}
      />
      <Button
        title="Show Error Toast"
        onPress={() => show({ message: 'Something went wrong', variant: 'error' })}
      />
      <Button
        title="Show Warning Toast"
        onPress={() => show({ message: 'Please check your input', variant: 'warning' })}
      />
      <Button
        title="Show Info Toast"
        onPress={() => show({ message: 'New update available', variant: 'info' })}
      />
    </View>
  );
}

export const Default: Story = {
  render: () => <ToastExample />,
};

export const Variants: Story = {
  render: () => {
    const { show } = useToast();
    return (
      <View style={{ gap: 12 }}>
        <Button
          title="Success"
          onPress={() => show({ message: 'Success message', variant: 'success' })}
        />
        <Button
          title="Error"
          onPress={() => show({ message: 'Error message', variant: 'error' })}
        />
        <Button
          title="Warning"
          onPress={() => show({ message: 'Warning message', variant: 'warning' })}
        />
        <Button
          title="Info"
          onPress={() => show({ message: 'Info message', variant: 'info' })}
        />
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast with different semantic variants.',
      },
    },
  },
};

export const WithTitle: Story = {
  render: () => {
    const { show } = useToast();
    return (
      <Button
        title="Show Toast with Title"
        onPress={() =>
          show({
            title: 'Notification',
            message: 'This toast has both a title and message',
            variant: 'info',
          })
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast with both title and message.',
      },
    },
  },
};

export const WithAction: Story = {
  render: () => {
    const { show } = useToast();
    return (
      <Button
        title="Show Toast with Action"
        onPress={() =>
          show({
            message: 'File deleted',
            variant: 'default',
            action: {
              label: 'Undo',
              onPress: () => console.log('Undo pressed'),
            },
          })
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast with an action button.',
      },
    },
  },
};

export const Persistent: Story = {
  render: () => {
    const { show } = useToast();
    return (
      <Button
        title="Show Persistent Toast"
        onPress={() =>
          show({
            message: 'This toast will not auto-dismiss',
            duration: 0,
          })
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast with duration 0 that persists until manually dismissed.',
      },
    },
  },
};

export const TopPosition: Story = {
  render: () => {
    const { show } = useToast();
    return (
      <Button
        title="Show Top Toast"
        onPress={() =>
          show({
            message: 'Toast at top',
            position: 'top',
            variant: 'info',
          })
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast positioned at the top of the screen.',
      },
    },
  },
};

// Direct Toast component example
export const DirectUsage: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <View style={{ gap: 12 }}>
        <Button title="Toggle Toast" onPress={() => setVisible(!visible)} />
        <Toast
          visible={visible}
          onHide={() => setVisible(false)}
          message="Direct Toast usage"
          variant="default"
        />
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Direct usage of Toast component (controlled).',
      },
    },
  },
};

