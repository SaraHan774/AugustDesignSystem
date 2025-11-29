import React, { useState } from 'react';
import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert variant determining the color scheme',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'An inline persistent notification component. Different from Toast - Alert stays visible until dismissed.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: 'info',
    description: 'This is an informational alert message.',
  },
};

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Alert
        variant="info"
        title="Information"
        description="This is an informational alert with a title."
      />
      <Alert
        variant="success"
        title="Success"
        description="Operation completed successfully!"
      />
      <Alert
        variant="warning"
        title="Warning"
        description="Please review your input before proceeding."
      />
      <Alert
        variant="error"
        title="Error"
        description="Something went wrong. Please try again."
      />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert with different semantic variants.',
      },
    },
  },
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <View>
        {visible && (
          <Alert
            variant="info"
            description="This alert can be dismissed by tapping the close button."
            dismissible
            onDismiss={() => setVisible(false)}
          />
        )}
        {!visible && (
          <View style={{ padding: 16, backgroundColor: '#E5E5EA', borderRadius: 8 }}>
            <Text>Alert dismissed</Text>
          </View>
        )}
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dismissible alert with close button.',
      },
    },
  },
};

export const WithActions: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Alert
        variant="warning"
        description="Your session will expire in 5 minutes."
        action={{
          label: 'Extend Session',
          onPress: () => console.log('Extend session'),
        }}
      />
      <Alert
        variant="error"
        description="Failed to save changes."
        action={{
          label: 'Retry',
          onPress: () => console.log('Retry'),
        }}
        secondaryAction={{
          label: 'Cancel',
          onPress: () => console.log('Cancel'),
        }}
      />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert with action buttons.',
      },
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    description: 'Alert without an icon.',
    showIcon: false,
  },
};

export const Simple: Story = {
  args: {
    variant: 'info',
    description: 'Simple alert with just a description.',
  },
};

