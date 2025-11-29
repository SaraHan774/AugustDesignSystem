/**
 * AvatarShowcase - Displays all Avatar variants and configurations
 */

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useThemedStyles } from '@hooks';
import { Avatar } from '../../../design-system/components/Chat';
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

export function AvatarShowcase(): React.ReactElement {
  const handlePress = () => {
    Alert.alert('Avatar Pressed', 'Navigate to profile');
  };

  return (
    <ShowcaseSection
      title="Avatar"
      description="User profile avatars with initials fallback and group support"
    >
      {/* Sizes */}
      <ShowcaseGroup title="Sizes">
        <Avatar name="John Doe" size="xs" />
        <Avatar name="John Doe" size="sm" />
        <Avatar name="John Doe" size="md" />
        <Avatar name="John Doe" size="lg" />
        <Avatar name="John Doe" size="xl" />
      </ShowcaseGroup>

      {/* Initials Fallback */}
      <ShowcaseGroup title="Initials Fallback">
        <Avatar name="Alice Brown" size="md" />
        <Avatar name="Charlie Davis" size="md" />
        <Avatar name="Eve" size="md" />
        <Avatar name="Frank Miller" size="md" />
        <Avatar name="Grace Kim" size="md" />
      </ShowcaseGroup>

      {/* With Status Indicator */}
      <ShowcaseGroup title="With Status Indicator">
        <Avatar name="Online User" size="md" status="online" />
        <Avatar name="Offline User" size="md" status="offline" />
        <Avatar name="Away User" size="md" status="away" />
        <Avatar name="Busy User" size="md" status="busy" />
      </ShowcaseGroup>

      {/* Group Avatars (Stacked) */}
      <ShowcaseGroup title="Group Avatars (Stacked)">
        <Avatar
          group={[
            { name: 'Alice' },
            { name: 'Bob' },
          ]}
          size="md"
        />
        <Avatar
          group={[
            { name: 'Charlie' },
            { name: 'Diana' },
            { name: 'Eve' },
          ]}
          size="md"
        />
        <Avatar
          group={[
            { name: 'Frank' },
            { name: 'Grace' },
            { name: 'Henry' },
          ]}
          size="lg"
        />
      </ShowcaseGroup>

      {/* With Border */}
      <ShowcaseGroup title="With Border">
        <Avatar name="Bordered User" size="md" showBorder />
        <Avatar name="Bordered Online" size="md" showBorder status="online" />
      </ShowcaseGroup>

      {/* Pressable */}
      <ShowcaseGroup title="Pressable (tap to test)">
        <Avatar name="Tap Me" size="md" onPress={handlePress} />
        <Avatar name="Also Tappable" size="lg" onPress={handlePress} status="online" />
      </ShowcaseGroup>

      {/* Custom Initials */}
      <ShowcaseGroup title="Custom Initials">
        <Avatar initials="VIP" size="md" />
        <Avatar initials="AI" size="md" />
        <Avatar initials="?" size="md" />
      </ShowcaseGroup>
    </ShowcaseSection>
  );
}
