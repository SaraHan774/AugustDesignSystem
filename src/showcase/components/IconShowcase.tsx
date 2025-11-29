/**
 * IconShowcase - Displays Icon component variants and configurations
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@hooks';
import { Icon, type CommonIconName } from '@components';
import { ShowcaseSection } from './ShowcaseSection';

interface IconGroupProps {
  title: string;
  children: React.ReactNode;
}

function IconGroup({ title, children }: IconGroupProps): React.ReactElement {
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
    icons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
      alignItems: 'center',
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.icons}>{children}</View>
    </View>
  );
}

interface IconItemProps {
  name: CommonIconName;
  label?: string;
}

function IconItem({ name, label }: IconItemProps): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    container: {
      alignItems: 'center',
      gap: theme.spacing.xs,
      minWidth: 60,
    },
    label: {
      ...theme.typography.caption2,
      color: theme.colors.label.tertiary,
    },
  }));

  return (
    <View style={styles.container}>
      <Icon name={name} size="md" />
      <Text style={styles.label}>{label || name}</Text>
    </View>
  );
}

export function IconShowcase(): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    sizeRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: theme.spacing.lg,
    },
    sizeItem: {
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    sizeLabel: {
      ...theme.typography.caption2,
      color: theme.colors.label.tertiary,
    },
    colorRow: {
      flexDirection: 'row',
      gap: theme.spacing.lg,
    },
  }));

  // Common icons to display
  const commonIcons: CommonIconName[] = [
    'checkmark',
    'close',
    'search',
    'plus',
    'minus',
    'chevronRight',
    'chevronLeft',
    'chevronDown',
    'chevronUp',
    'home',
    'settings',
    'person',
    'heart',
    'star',
    'bookmark',
    'share',
    'send',
    'edit',
    'trash',
    'camera',
  ];

  return (
    <ShowcaseSection
      title="Icons"
      description="Platform-native icons using SF Symbols on iOS and Material Icons on Android/Web"
    >
      {/* Common Icons */}
      <IconGroup title="Common Icons">
        {commonIcons.map((name) => (
          <IconItem key={name} name={name} />
        ))}
      </IconGroup>

      {/* Sizes */}
      <IconGroup title="Sizes">
        <View style={styles.sizeRow}>
          <View style={styles.sizeItem}>
            <Icon name="star" size="xs" />
            <Text style={styles.sizeLabel}>xs (12)</Text>
          </View>
          <View style={styles.sizeItem}>
            <Icon name="star" size="sm" />
            <Text style={styles.sizeLabel}>sm (16)</Text>
          </View>
          <View style={styles.sizeItem}>
            <Icon name="star" size="md" />
            <Text style={styles.sizeLabel}>md (20)</Text>
          </View>
          <View style={styles.sizeItem}>
            <Icon name="star" size="lg" />
            <Text style={styles.sizeLabel}>lg (24)</Text>
          </View>
          <View style={styles.sizeItem}>
            <Icon name="star" size="xl" />
            <Text style={styles.sizeLabel}>xl (32)</Text>
          </View>
        </View>
      </IconGroup>

      {/* Colors */}
      <IconGroup title="Colors">
        <View style={styles.colorRow}>
          <View style={styles.sizeItem}>
            <Icon name="heart" size="lg" color="primary" />
            <Text style={styles.sizeLabel}>primary</Text>
          </View>
          <View style={styles.sizeItem}>
            <Icon name="heart" size="lg" color="secondary" />
            <Text style={styles.sizeLabel}>secondary</Text>
          </View>
          <View style={styles.sizeItem}>
            <Icon name="heart" size="lg" color="tertiary" />
            <Text style={styles.sizeLabel}>tertiary</Text>
          </View>
          <View style={styles.sizeItem}>
            <Icon name="heart" size="lg" color="tint" />
            <Text style={styles.sizeLabel}>tint</Text>
          </View>
          <View style={styles.sizeItem}>
            <Icon name="heart" size="lg" color="success" />
            <Text style={styles.sizeLabel}>success</Text>
          </View>
          <View style={styles.sizeItem}>
            <Icon name="heart" size="lg" color="error" />
            <Text style={styles.sizeLabel}>error</Text>
          </View>
        </View>
      </IconGroup>
    </ShowcaseSection>
  );
}
