/**
 * CardShowcase - Displays all card variants and configurations
 */

import React from 'react';
import { View, Text, Image } from 'react-native';
import { useThemedStyles } from '@hooks';
import { Card, Button, Icon } from '@components';
import { ShowcaseSection } from './ShowcaseSection';

interface CardGroupProps {
  title: string;
  children: React.ReactNode;
}

function CardGroup({ title, children }: CardGroupProps): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    container: {
      marginBottom: theme.spacing.xl,
    },
    title: {
      ...theme.typography.subheadline,
      color: theme.colors.label.secondary,
      marginBottom: theme.spacing.md,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    content: {
      gap: theme.spacing.md,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

export function CardShowcase(): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    cardContent: {
      ...theme.typography.body,
      color: theme.colors.label.primary,
    },
    cardRow: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.fill.secondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.separator.opaque,
    },
    settingIcon: {
      width: 28,
      height: 28,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.md,
    },
    settingText: {
      ...theme.typography.body,
      color: theme.colors.label.primary,
      flex: 1,
    },
  }));

  return (
    <ShowcaseSection
      title="Card"
      description="Content grouping containers with various styles"
    >
      {/* Variants */}
      <CardGroup title="Variants">
        <Card variant="elevated">
          <Text style={styles.cardContent}>Elevated card with shadow</Text>
        </Card>
        <Card variant="outlined">
          <Text style={styles.cardContent}>Outlined card with border</Text>
        </Card>
        <Card variant="filled">
          <Text style={styles.cardContent}>Filled card with background</Text>
        </Card>
      </CardGroup>

      {/* With Header */}
      <CardGroup title="With Header">
        <Card
          variant="elevated"
          header={<Card.Header title="Settings" subtitle="Manage your preferences" />}
        >
          <View>
            <View style={styles.settingRow}>
              <View style={[styles.settingIcon, { backgroundColor: '#FF3B30' }]}>
                <Icon name="bell-fill" size="sm" color="#FFFFFF" />
              </View>
              <Text style={styles.settingText}>Notifications</Text>
              <Icon name="forward-nav" size="sm" color="#C7C7CC" />
            </View>
            <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
              <View style={[styles.settingIcon, { backgroundColor: '#007AFF' }]}>
                <Icon name="lock" size="sm" color="#FFFFFF" />
              </View>
              <Text style={styles.settingText}>Privacy</Text>
              <Icon name="forward-nav" size="sm" color="#C7C7CC" />
            </View>
          </View>
        </Card>
      </CardGroup>

      {/* With Header and Footer */}
      <CardGroup title="With Header and Footer">
        <Card
          variant="elevated"
          header={
            <Card.Header
              title="John Doe"
              subtitle="Software Engineer"
              left={
                <View style={styles.avatar}>
                  <Icon name="person" size="md" color="#8E8E93" />
                </View>
              }
            />
          }
          footer={
            <Card.Footer>
              <View style={styles.cardRow}>
                <Button title="Message" variant="tinted" size="sm" />
                <Button title="Follow" size="sm" />
              </View>
            </Card.Footer>
          }
        >
          <Text style={styles.cardContent}>
            Building great products and helping teams succeed.
          </Text>
        </Card>
      </CardGroup>

      {/* Padding Variants */}
      <CardGroup title="Padding Variants">
        <Card variant="outlined" padding="sm">
          <Text style={styles.cardContent}>Small padding</Text>
        </Card>
        <Card variant="outlined" padding="md">
          <Text style={styles.cardContent}>Medium padding (default)</Text>
        </Card>
        <Card variant="outlined" padding="lg">
          <Text style={styles.cardContent}>Large padding</Text>
        </Card>
      </CardGroup>

      {/* Pressable Card */}
      <CardGroup title="Pressable">
        <Card
          variant="elevated"
          pressable
          onPress={() => {}}
          header={<Card.Header title="Tap Me" subtitle="This card is pressable" />}
        >
          <Text style={styles.cardContent}>
            Cards can be made interactive with the pressable prop.
          </Text>
        </Card>
      </CardGroup>
    </ShowcaseSection>
  );
}
