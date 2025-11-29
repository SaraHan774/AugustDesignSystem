import React, { useState } from 'react';
import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A centered modal dialog component following iOS Human Interface Guidelines.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

function ModalExample() {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Button title="Open Modal" onPress={() => setVisible(true)} />
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        title="Modal Title"
        message="This is a modal message"
        actions={[
          { key: 'cancel', label: 'Cancel', onPress: () => setVisible(false), style: 'cancel' },
          { key: 'ok', label: 'OK', onPress: () => setVisible(false) },
        ]}
      />
    </View>
  );
}

export const Default: Story = {
  render: () => <ModalExample />,
};

export const Alert: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button title="Show Alert" onPress={() => setVisible(true)} />
        <Modal
          visible={visible}
          onClose={() => setVisible(false)}
          variant="alert"
          title="Delete Item?"
          message="This action cannot be undone."
          actions={[
            { key: 'delete', label: 'Delete', onPress: () => setVisible(false), style: 'destructive' },
            { key: 'cancel', label: 'Cancel', onPress: () => setVisible(false), style: 'cancel' },
          ]}
        />
      </View>
    );
  },
};

