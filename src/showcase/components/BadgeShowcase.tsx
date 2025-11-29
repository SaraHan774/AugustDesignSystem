/**
 * BadgeShowcase - Displays all badge variants and configurations
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@hooks';
import { Badge, Icon } from '@components';
import { ShowcaseSection } from './ShowcaseSection';

interface BadgeGroupProps {
  title: string;
  children: React.ReactNode;
}

function BadgeGroup({ title, children }: BadgeGroupProps): React.ReactElement {
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
    badges: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
      alignItems: 'center',
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.badges}>{children}</View>
    </View>
  );
}

export function BadgeShowcase(): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: theme.colors.fill.secondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      ...theme.typography.caption1,
      color: theme.colors.label.secondary,
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
    badgeItem: {
      alignItems: 'center',
    },
  }));

  return (
    <ShowcaseSection
      title="Badge"
      description="Notification badges for counts, dots, and labels"
    >
      {/* Variants */}
      <BadgeGroup title="Variants">
        <View style={styles.badgeItem}>
          <Badge count={5} />
          <Text style={styles.label}>Count</Text>
        </View>
        <View style={styles.badgeItem}>
          <Badge variant="dot" />
          <Text style={styles.label}>Dot</Text>
        </View>
        <View style={styles.badgeItem}>
          <Badge variant="label" label="New" color="primary" />
          <Text style={styles.label}>Label</Text>
        </View>
      </BadgeGroup>

      {/* Count Variations */}
      <BadgeGroup title="Count Variations">
        <Badge count={1} />
        <Badge count={9} />
        <Badge count={42} />
        <Badge count={99} />
        <Badge count={150} maxCount={99} />
      </BadgeGroup>

      {/* Colors */}
      <BadgeGroup title="Colors">
        <View style={styles.badgeItem}>
          <Badge count={5} color="error" />
          <Text style={styles.label}>Error</Text>
        </View>
        <View style={styles.badgeItem}>
          <Badge count={5} color="primary" />
          <Text style={styles.label}>Primary</Text>
        </View>
        <View style={styles.badgeItem}>
          <Badge count={5} color="success" />
          <Text style={styles.label}>Success</Text>
        </View>
        <View style={styles.badgeItem}>
          <Badge count={5} color="warning" />
          <Text style={styles.label}>Warning</Text>
        </View>
        <View style={styles.badgeItem}>
          <Badge count={5} color="info" />
          <Text style={styles.label}>Info</Text>
        </View>
        <View style={styles.badgeItem}>
          <Badge count={5} color="neutral" />
          <Text style={styles.label}>Neutral</Text>
        </View>
      </BadgeGroup>

      {/* Sizes */}
      <BadgeGroup title="Sizes">
        <View style={styles.badgeItem}>
          <Badge count={5} size="sm" />
          <Text style={styles.label}>Small</Text>
        </View>
        <View style={styles.badgeItem}>
          <Badge count={5} size="md" />
          <Text style={styles.label}>Medium</Text>
        </View>
      </BadgeGroup>

      {/* Overlay on Icon */}
      <BadgeGroup title="Overlay on Icon">
        <View style={styles.badgeItem}>
          <Badge count={3} position="top-right">
            <View style={styles.iconContainer}>
              <Icon name="bell" size="lg" color="primary" />
            </View>
          </Badge>
          <Text style={styles.label}>Top Right</Text>
        </View>
        <View style={styles.badgeItem}>
          <Badge variant="dot" color="error" position="top-right">
            <View style={styles.iconContainer}>
              <Icon name="chat" size="lg" color="primary" />
            </View>
          </Badge>
          <Text style={styles.label}>Dot</Text>
        </View>
        <View style={styles.badgeItem}>
          <Badge count={99} maxCount={99} position="top-right">
            <View style={styles.iconContainer}>
              <Icon name="person" size="lg" color="primary" />
            </View>
          </Badge>
          <Text style={styles.label}>99+</Text>
        </View>
      </BadgeGroup>

      {/* Labels */}
      <BadgeGroup title="Label Badges">
        <Badge variant="label" label="New" color="primary" />
        <Badge variant="label" label="Beta" color="info" />
        <Badge variant="label" label="Hot" color="error" />
        <Badge variant="label" label="Sale" color="success" />
      </BadgeGroup>
    </ShowcaseSection>
  );
}
