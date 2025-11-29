/**
 * EmptyStateShowcase - Displays EmptyState component variants and configurations
 */

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useThemedStyles } from '@hooks';
import { EmptyState } from '@components';
import { ShowcaseSection } from './ShowcaseSection';

interface EmptyStateGroupProps {
  title: string;
  children: React.ReactNode;
}

function EmptyStateGroup({ title, children }: EmptyStateGroupProps): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    container: {
      marginBottom: theme.spacing.xl,
    },
    title: {
      ...theme.typography.subheadline,
      color: theme.colors.label.secondary,
      marginBottom: theme.spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    content: {
      gap: theme.spacing.lg,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

export function EmptyStateShowcase(): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    card: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.radius.lg,
      overflow: 'hidden',
      minHeight: 200,
    },
    smallCard: {
      minHeight: 150,
    },
  }));

  const handleAction = (action: string) => {
    Alert.alert('Action', `${action} pressed`);
  };

  return (
    <ShowcaseSection
      title="EmptyState"
      description="Placeholder content for empty lists and views"
    >
      {/* Basic */}
      <EmptyStateGroup title="Basic">
        <View style={styles.card}>
          <EmptyState
            title="No Messages"
            description="Start a conversation to see messages here."
            icon="message"
          />
        </View>
      </EmptyStateGroup>

      {/* With Action */}
      <EmptyStateGroup title="With Action">
        <View style={styles.card}>
          <EmptyState
            title="No Results Found"
            description="Try adjusting your search terms or filters."
            icon="search"
            action={{
              label: 'Clear Filters',
              onPress: () => handleAction('Clear Filters'),
            }}
          />
        </View>
      </EmptyStateGroup>

      {/* With Two Actions */}
      <EmptyStateGroup title="With Two Actions">
        <View style={styles.card}>
          <EmptyState
            title="No Contacts"
            description="Add contacts to start messaging."
            icon="person"
            action={{
              label: 'Add Contact',
              onPress: () => handleAction('Add Contact'),
            }}
            secondaryAction={{
              label: 'Import',
              onPress: () => handleAction('Import'),
              variant: 'secondary',
            }}
          />
        </View>
      </EmptyStateGroup>

      {/* Sizes */}
      <EmptyStateGroup title="Sizes">
        <View style={[styles.card, styles.smallCard]}>
          <EmptyState
            title="Small Empty State"
            description="Compact size for smaller areas."
            icon="bookmark"
            size="sm"
          />
        </View>

        <View style={styles.card}>
          <EmptyState
            title="Medium Empty State"
            description="Default size for most use cases."
            icon="star"
            size="md"
          />
        </View>
      </EmptyStateGroup>

      {/* Different Icons */}
      <EmptyStateGroup title="Common Use Cases">
        <View style={[styles.card, styles.smallCard]}>
          <EmptyState
            title="No Notifications"
            description="You're all caught up!"
            icon="bell"
            size="sm"
          />
        </View>

        <View style={[styles.card, styles.smallCard]}>
          <EmptyState
            title="No Favorites"
            description="Items you favorite will appear here."
            icon="heart"
            size="sm"
            action={{
              label: 'Browse Items',
              onPress: () => handleAction('Browse'),
              variant: 'tertiary',
            }}
          />
        </View>

        <View style={[styles.card, styles.smallCard]}>
          <EmptyState
            title="Offline"
            description="Check your internet connection."
            icon="warning"
            size="sm"
            action={{
              label: 'Retry',
              onPress: () => handleAction('Retry'),
            }}
          />
        </View>
      </EmptyStateGroup>
    </ShowcaseSection>
  );
}
