/**
 * SpacingShowcase - Displays the spacing scale
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles, useTheme } from '../../design-system';
import { ShowcaseSection } from './ShowcaseSection';

interface SpacingBarProps {
  name: string;
  value: number;
}

function SpacingBar({ name, value }: SpacingBarProps): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    labelContainer: {
      width: 80,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: theme.spacing.md,
    },
    name: {
      ...theme.typography.caption1,
      color: theme.colors.label.secondary,
      fontWeight: '600',
    },
    value: {
      ...theme.typography.caption1,
      color: theme.colors.label.tertiary,
    },
    bar: {
      height: 24,
      backgroundColor: theme.colors.interactive.tint,
      borderRadius: theme.radius.xs,
    },
  }));

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <View style={[styles.bar, { width: Math.max(value * 3, 4) }]} />
    </View>
  );
}

export function SpacingShowcase(): React.ReactElement {
  const { theme } = useTheme();

  const spacingValues = [
    { name: 'none', value: theme.spacing.none },
    { name: 'xxs', value: theme.spacing.xxs },
    { name: 'xs', value: theme.spacing.xs },
    { name: 'sm', value: theme.spacing.sm },
    { name: 'md', value: theme.spacing.md },
    { name: 'lg', value: theme.spacing.lg },
    { name: 'xl', value: theme.spacing.xl },
    { name: 'xxl', value: theme.spacing.xxl },
    { name: 'xxxl', value: theme.spacing.xxxl },
    { name: 'xxxxl', value: theme.spacing.xxxxl },
    { name: 'xxxxxl', value: theme.spacing.xxxxxl },
  ];

  return (
    <ShowcaseSection
      title="Spacing"
      description="4pt grid system for consistent spacing"
    >
      {spacingValues.map((spacing) => (
        <SpacingBar key={spacing.name} {...spacing} />
      ))}
    </ShowcaseSection>
  );
}
