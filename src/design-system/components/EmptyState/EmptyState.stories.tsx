import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant affecting spacing and text sizes',
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout direction',
    },
    fillContainer: {
      control: 'boolean',
      description: 'Whether the component should fill available space',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A component for displaying placeholder content when lists or views have no data. Follows iOS HIG and Material Design 3 empty state patterns.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'No Messages',
    description: 'Start a conversation to see messages here.',
    icon: 'message',
  },
};

export const WithAction: Story = {
  args: {
    title: 'No Results Found',
    description: 'Try adjusting your search terms or filters.',
    icon: 'search',
    action: {
      label: 'Clear Filters',
      onPress: () => console.log('Clear Filters pressed'),
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'EmptyState with a primary action button.',
      },
    },
  },
};

export const WithTwoActions: Story = {
  args: {
    title: 'No Contacts',
    description: 'Add contacts to start messaging.',
    icon: 'person',
    action: {
      label: 'Add Contact',
      onPress: () => console.log('Add Contact pressed'),
    },
    secondaryAction: {
      label: 'Import',
      onPress: () => console.log('Import pressed'),
      variant: 'secondary',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'EmptyState with both primary and secondary action buttons.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ minHeight: 150, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 16 }}>
        <EmptyState
          title="Small Empty State"
          description="Compact size for smaller areas."
          icon="bookmark"
          size="sm"
        />
      </View>
      <View style={{ minHeight: 200, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 16 }}>
        <EmptyState
          title="Medium Empty State"
          description="Default size for most use cases."
          icon="star"
          size="md"
        />
      </View>
      <View style={{ minHeight: 250, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 16 }}>
        <EmptyState
          title="Large Empty State"
          description="Larger size for prominent empty states."
          icon="heart"
          size="lg"
        />
      </View>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'EmptyState in different size variants.',
      },
    },
  },
};

export const CommonUseCases: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ minHeight: 150, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 16 }}>
        <EmptyState
          title="No Notifications"
          description="You're all caught up!"
          icon="bell"
          size="sm"
        />
      </View>
      <View style={{ minHeight: 150, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 16 }}>
        <EmptyState
          title="No Favorites"
          description="Items you favorite will appear here."
          icon="heart"
          size="sm"
          action={{
            label: 'Browse Items',
            onPress: () => console.log('Browse pressed'),
            variant: 'tertiary',
          }}
        />
      </View>
      <View style={{ minHeight: 150, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 16 }}>
        <EmptyState
          title="Offline"
          description="Check your internet connection."
          icon="warning"
          size="sm"
          action={{
            label: 'Retry',
            onPress: () => console.log('Retry pressed'),
          }}
        />
      </View>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use cases for EmptyState component.',
      },
    },
  },
};

export const HorizontalLayout: Story = {
  args: {
    title: 'No Items',
    description: 'Add items to get started.',
    icon: 'add',
    layout: 'horizontal',
    action: {
      label: 'Add Item',
      onPress: () => console.log('Add Item pressed'),
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'EmptyState with horizontal layout.',
      },
    },
  },
};

export const WithCustomIcon: Story = {
  args: {
    title: 'Custom Icon',
    description: 'This EmptyState uses a custom icon element.',
    customIcon: (
      <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#999' }} />
      </View>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'EmptyState with a custom icon element.',
      },
    },
  },
};
