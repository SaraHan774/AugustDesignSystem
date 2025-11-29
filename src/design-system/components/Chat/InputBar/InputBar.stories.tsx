import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { InputBar } from './InputBar';

const meta: Meta<typeof InputBar> = {
  title: 'Chat/InputBar',
  component: InputBar,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    sending: {
      control: 'boolean',
      description: 'Whether a message is being sent',
    },
    showAttachmentButton: {
      control: 'boolean',
      description: 'Show the attachment button',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Message input component with send button, attachment support, and error states.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputBar>;

// Interactive wrapper component
const InteractiveInputBar = (props: any) => {
  const [value, setValue] = useState(props.initialValue || '');
  return (
    <InputBar
      {...props}
      value={value}
      onChangeText={setValue}
      onSend={() => {
        Alert.alert('Send', `Sending: "${value}"`);
        setValue('');
      }}
      onAttachment={() => Alert.alert('Attachment', 'Opening file picker...')}
    />
  );
};

export const Default: Story = {
  render: () => <InteractiveInputBar />,
};

export const WithPrefilledText: Story = {
  render: () => <InteractiveInputBar initialValue="Hello there!" />,
};

export const CustomPlaceholder: Story = {
  render: () => (
    <InputBar
      value=""
      onChangeText={() => {}}
      placeholder="Write a reply..."
      onSend={() => {}}
      onAttachment={() => {}}
    />
  ),
};

export const WithoutAttachment: Story = {
  render: () => (
    <InputBar
      value=""
      onChangeText={() => {}}
      onSend={() => {}}
      showAttachmentButton={false}
    />
  ),
};

export const SendingState: Story = {
  render: () => (
    <InputBar
      value="Sending this message..."
      onChangeText={() => {}}
      onSend={() => {}}
      sending
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input bar in sending state with loading indicator.',
      },
    },
  },
};

export const DisabledState: Story = {
  render: () => (
    <InputBar
      value=""
      onChangeText={() => {}}
      onSend={() => {}}
      disabled
      disabledMessage="You can't send messages to this user"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled state for blocked users or read-only conversations.',
      },
    },
  },
};

export const WithErrorBanner: Story = {
  render: () => {
    const [error, setError] = useState<string | undefined>(
      "You're sending messages too fast. Please wait a moment."
    );
    return (
      <View style={{ width: '100%' }}>
        <InputBar
          value=""
          onChangeText={() => {}}
          onSend={() => {}}
          errorMessage={error}
          onDismissError={() => setError(undefined)}
          errorAutoDismiss={0}
        />
        {!error && (
          <Text style={{ marginTop: 8, color: '#666' }}>
            Error dismissed. Refresh to see again.
          </Text>
        )}
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Error banner for rate limiting or other errors.',
      },
    },
  },
};