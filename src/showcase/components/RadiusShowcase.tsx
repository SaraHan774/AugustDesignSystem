/**
 * RadiusShowcase - Displays border radius scale
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles, useTheme } from '../../design-system';
import { ShowcaseSection } from './ShowcaseSection';

interface RadiusBoxProps {
  name: string;
  value: number;
}

function RadiusBox({ name, value }: RadiusBoxProps): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    container: {
      width: '30%',
      marginBottom: theme.spacing.lg,
      alignItems: 'center',
    },
    box: {
      width: 64,
      height: 64,
      backgroundColor: theme.colors.interactive.tint,
      justifyContent: 'center',
      alignItems: 'center',
    },
    value: {
      ...theme.typography.caption1,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    name: {
      ...theme.typography.caption1,
      color: theme.colors.label.secondary,
      marginTop: theme.spacing.sm,
      textAlign: 'center',
    },
  }));

  return (
    <View style={styles.container}>
      <View style={[styles.box, { borderRadius: Math.min(value, 32) }]}>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

export function RadiusShowcase(): React.ReactElement {
  const { theme } = useTheme();
  const styles = useThemedStyles((t) => ({
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  }));

  const radiusValues: RadiusBoxProps[] = [
    { name: 'None', value: theme.radius.none },
    { name: 'XS', value: theme.radius.xs },
    { name: 'SM', value: theme.radius.sm },
    { name: 'MD', value: theme.radius.md },
    { name: 'LG', value: theme.radius.lg },
    { name: 'XL', value: theme.radius.xl },
    { name: 'XXL', value: theme.radius.xxl },
    { name: 'Full', value: theme.radius.full },
  ];

  return (
    <ShowcaseSection
      title="Border Radius"
      description="Continuous corner curves for iOS-style rounded elements"
    >
      <View style={styles.grid}>
        {radiusValues.map((radius) => (
          <RadiusBox key={radius.name} {...radius} />
        ))}
      </View>
    </ShowcaseSection>
  );
}
