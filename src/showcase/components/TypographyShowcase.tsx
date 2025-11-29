/**
 * TypographyShowcase - Displays the typography scale
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles, useTheme } from '../../design-system';
import { ShowcaseSection } from './ShowcaseSection';

interface TypeSampleProps {
  name: string;
  variant: keyof typeof import('../../design-system').typography;
  size: number;
  weight: string;
}

function TypeSample({ name, variant, size, weight }: TypeSampleProps): React.ReactElement {
  const { theme } = useTheme();
  const styles = useThemedStyles((t) => ({
    container: {
      marginBottom: t.spacing.lg,
      paddingBottom: t.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: t.colors.separator.nonOpaque,
    },
    meta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: t.spacing.xs,
    },
    name: {
      ...t.typography.caption1,
      color: t.colors.label.secondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    specs: {
      ...t.typography.caption1,
      color: t.colors.label.tertiary,
    },
    sample: {
      color: t.colors.label.primary,
    },
  }));

  const typographyStyle = theme.typography[variant];

  return (
    <View style={styles.container}>
      <View style={styles.meta}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.specs}>{size}pt · {weight}</Text>
      </View>
      <Text style={[styles.sample, typographyStyle]}>
        The quick brown fox jumps over the lazy dog
      </Text>
    </View>
  );
}

export function TypographyShowcase(): React.ReactElement {
  const typographyVariants: TypeSampleProps[] = [
    { name: 'Large Title', variant: 'largeTitle', size: 34, weight: 'Regular' },
    { name: 'Title 1', variant: 'title1', size: 28, weight: 'Regular' },
    { name: 'Title 2', variant: 'title2', size: 22, weight: 'Regular' },
    { name: 'Title 3', variant: 'title3', size: 20, weight: 'Regular' },
    { name: 'Headline', variant: 'headline', size: 17, weight: 'Semibold' },
    { name: 'Subheadline', variant: 'subheadline', size: 15, weight: 'Regular' },
    { name: 'Body', variant: 'body', size: 17, weight: 'Regular' },
    { name: 'Callout', variant: 'callout', size: 16, weight: 'Regular' },
    { name: 'Footnote', variant: 'footnote', size: 13, weight: 'Regular' },
    { name: 'Caption 1', variant: 'caption1', size: 12, weight: 'Regular' },
    { name: 'Caption 2', variant: 'caption2', size: 11, weight: 'Regular' },
  ];

  return (
    <ShowcaseSection
      title="Typography"
      description="SF Pro-inspired type scale following iOS Dynamic Type"
    >
      {typographyVariants.map((variant) => (
        <TypeSample key={variant.name} {...variant} />
      ))}
    </ShowcaseSection>
  );
}
