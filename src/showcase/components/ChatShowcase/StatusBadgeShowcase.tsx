/**
 * StatusBadgeShowcase - Displays all StatusBadge variants and configurations
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@hooks';
import { StatusBadge } from '../../../design-system/components/Chat';
import { ShowcaseSection } from '../ShowcaseSection';

interface ShowcaseGroupProps {
  title: string;
  children: React.ReactNode;
}

function ShowcaseGroup({ title, children }: ShowcaseGroupProps): React.ReactElement {
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
    items: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
      alignItems: 'center',
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.items}>{children}</View>
    </View>
  );
}

export function StatusBadgeShowcase(): React.ReactElement {
  return (
    <ShowcaseSection
      title="StatusBadge"
      description="User presence indicators for online/offline status"
    >
      {/* Status Types */}
      <ShowcaseGroup title="Status Types">
        <StatusBadge status="online" label="Online" />
        <StatusBadge status="offline" label="Offline" />
        <StatusBadge status="away" label="Away" />
        <StatusBadge status="busy" label="Busy" />
      </ShowcaseGroup>

      {/* Sizes */}
      <ShowcaseGroup title="Sizes">
        <StatusBadge status="online" size="sm" label="Small" />
        <StatusBadge status="online" size="md" label="Medium" />
        <StatusBadge status="online" size="lg" label="Large" />
      </ShowcaseGroup>

      {/* Dot Only */}
      <ShowcaseGroup title="Dot Only (for avatars)">
        <StatusBadge status="online" size="sm" dotOnly />
        <StatusBadge status="online" size="md" dotOnly />
        <StatusBadge status="online" size="lg" dotOnly />
        <StatusBadge status="offline" size="md" dotOnly />
        <StatusBadge status="away" size="md" dotOnly />
        <StatusBadge status="busy" size="md" dotOnly />
      </ShowcaseGroup>

      {/* With Border */}
      <ShowcaseGroup title="Bordered (for avatar overlay)">
        <StatusBadge status="online" size="sm" dotOnly showBorder />
        <StatusBadge status="online" size="md" dotOnly showBorder />
        <StatusBadge status="online" size="lg" dotOnly showBorder />
      </ShowcaseGroup>

      {/* Custom Labels */}
      <ShowcaseGroup title="Custom Labels">
        <StatusBadge status="online" label="Active now" />
        <StatusBadge status="offline" label="Last seen 5 min ago" />
        <StatusBadge status="away" label="In a meeting" />
      </ShowcaseGroup>
    </ShowcaseSection>
  );
}
