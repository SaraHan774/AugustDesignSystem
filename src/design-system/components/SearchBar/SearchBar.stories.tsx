import React, { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text when empty',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the search bar is in loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the search bar is disabled',
    },
    showCancelButton: {
      control: 'boolean',
      description: 'Whether to show the cancel button when focused',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'An iOS-style SearchBar component with native look and feel, loading states, and cancel button support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <SearchBar
        value={value}
        onChangeText={setValue}
        placeholder="Search"
      />
    );
  },
};

export const WithCancel: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <SearchBar
        value={value}
        onChangeText={setValue}
        placeholder="Search"
        showCancelButton={true}
        onCancel={() => setValue('')}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'SearchBar with cancel button that appears when focused.',
      },
    },
  },
};

export const Loading: Story = {
  render: () => {
    const [value, setValue] = useState('Search query');
    return (
      <SearchBar
        value={value}
        onChangeText={setValue}
        placeholder="Search"
        loading={true}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'SearchBar in loading state shows a spinner instead of search icon.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    value: 'Disabled search',
    placeholder: 'Search',
    disabled: true,
  },
};

export const WithSubmit: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState('');
    return (
      <View style={{ gap: 16 }}>
        <SearchBar
          value={value}
          onChangeText={setValue}
          placeholder="Search and press return"
          onSubmit={(text) => setSubmitted(`Submitted: ${text}`)}
        />
        {submitted ? (
          <View style={{ padding: 16, backgroundColor: '#E5E5EA', borderRadius: 8 }}>
            <Text>{submitted}</Text>
          </View>
        ) : null}
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'SearchBar with onSubmit handler that triggers when return key is pressed.',
      },
    },
  },
};

