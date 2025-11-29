/**
 * ShadowShowcase - Displays shadow elevation levels
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles, useTheme } from '../../design-system';
import { ShowcaseSection } from './ShowcaseSection';

interface ShadowCardProps {
  name: string;
  shadowKey: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

function ShadowCard({ name, shadowKey }: ShadowCardProps): React.ReactElement {
  const { theme } = useTheme();
  const styles = useThemedStyles((t) => ({
    container: {
      width: '30%',
      marginBottom: t.spacing.lg,
      alignItems: 'center',
    },
    card: {
      width: '100%',
      height: 80,
      backgroundColor: t.colors.background.primary,
      borderRadius: t.radius.md,
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      ...t.typography.caption1,
      color: t.colors.label.secondary,
      marginTop: t.spacing.sm,
      textAlign: 'center',
    },
    elevation: {
      ...t.typography.headline,
      color: t.colors.label.primary,
    },
  }));

  const shadow = theme.shadows[shadowKey];

  return (
    <View style={styles.container}>
      <View style={[styles.card, shadow]}>
        <Text style={styles.elevation}>{shadowKey}</Text>
      </View>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

export function ShadowShowcase(): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  }));

  const shadows: ShadowCardProps[] = [
    { name: 'None', shadowKey: 'none' },
    { name: 'Extra Small', shadowKey: 'xs' },
    { name: 'Small', shadowKey: 'sm' },
    { name: 'Medium', shadowKey: 'md' },
    { name: 'Large', shadowKey: 'lg' },
    { name: 'Extra Large', shadowKey: 'xl' },
  ];

  return (
    <ShowcaseSection
      title="Shadows"
      description="iOS-style subtle shadows for depth hierarchy"
    >
      <View style={styles.grid}>
        {shadows.map((shadow) => (
          <ShadowCard key={shadow.shadowKey} {...shadow} />
        ))}
      </View>
    </ShowcaseSection>
  );
}
