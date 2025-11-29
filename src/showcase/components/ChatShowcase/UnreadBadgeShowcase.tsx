/**
 * UnreadBadgeShowcase - Displays all UnreadBadge variants and configurations
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@hooks';
import { UnreadBadge } from '../../../design-system/components/Chat';
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

export function UnreadBadgeShowcase(): React.ReactElement {
  return (
    <ShowcaseSection
      title="UnreadBadge"
      description="Unread message count indicators for chat lists"
    >
      {/* Count Examples */}
      <ShowcaseGroup title="Count Display">
        <UnreadBadge count={1} />
        <UnreadBadge count={5} />
        <UnreadBadge count={10} />
        <UnreadBadge count={50} />
        <UnreadBadge count={99} />
        <UnreadBadge count={150} />
      </ShowcaseGroup>

      {/* Sizes */}
      <ShowcaseGroup title="Sizes">
        <UnreadBadge count={5} size="sm" />
        <UnreadBadge count={5} size="md" />
        <UnreadBadge count={5} size="lg" />
      </ShowcaseGroup>

      {/* Color Schemes */}
      <ShowcaseGroup title="Color Schemes">
        <UnreadBadge count={5} colorScheme="primary" />
        <UnreadBadge count={5} colorScheme="destructive" />
        <UnreadBadge count={5} colorScheme="neutral" />
      </ShowcaseGroup>

      {/* Dot Mode */}
      <ShowcaseGroup title="Dot Mode">
        <UnreadBadge count={1} size="sm" dot />
        <UnreadBadge count={1} size="md" dot />
        <UnreadBadge count={1} size="lg" dot />
        <UnreadBadge count={1} dot colorScheme="destructive" />
        <UnreadBadge count={1} dot colorScheme="neutral" />
      </ShowcaseGroup>

      {/* Custom Max Count */}
      <ShowcaseGroup title="Custom Max Count">
        <UnreadBadge count={500} maxCount={99} />
        <UnreadBadge count={500} maxCount={999} />
        <UnreadBadge count={10000} maxCount={9999} />
      </ShowcaseGroup>
    </ShowcaseSection>
  );
}
