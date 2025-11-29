/**
 * ColorShowcase - Displays the color palette
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles, useTheme } from '../../design-system';
import { ShowcaseSection } from './ShowcaseSection';

interface ColorSwatchProps {
  name: string;
  color: string;
  textColor?: string;
}

function ColorSwatch({ name, color, textColor }: ColorSwatchProps): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    container: {
      width: '30%',
      marginBottom: theme.spacing.md,
    },
    swatch: {
      height: 60,
      borderRadius: theme.radius.sm,
      justifyContent: 'flex-end',
      padding: theme.spacing.xs,
      borderWidth: 1,
      borderColor: theme.colors.separator.opaque,
    },
    name: {
      ...theme.typography.caption2,
      color: textColor || '#FFFFFF',
      fontWeight: '600',
    },
    colorValue: {
      ...theme.typography.caption2,
      color: theme.colors.label.secondary,
      marginTop: theme.spacing.xxs,
    },
  }));

  return (
    <View style={styles.container}>
      <View style={[styles.swatch, { backgroundColor: color }]}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.colorValue} numberOfLines={1}>
        {color.startsWith('rgba') ? 'rgba(...)' : color}
      </Text>
    </View>
  );
}

interface ColorRowProps {
  title: string;
  colors: Array<{ name: string; color: string; textColor?: string }>;
}

function ColorRow({ title, colors }: ColorRowProps): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    container: {
      marginBottom: theme.spacing.lg,
    },
    title: {
      ...theme.typography.headline,
      color: theme.colors.label.primary,
      marginBottom: theme.spacing.sm,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        {colors.map((c) => (
          <ColorSwatch key={c.name} {...c} />
        ))}
      </View>
    </View>
  );
}

export function ColorShowcase(): React.ReactElement {
  const { theme } = useTheme();

  const systemColors = [
    { name: 'Blue', color: theme.colors.system.blue },
    { name: 'Green', color: theme.colors.system.green },
    { name: 'Red', color: theme.colors.system.red },
    { name: 'Orange', color: theme.colors.system.orange },
    { name: 'Yellow', color: theme.colors.system.yellow, textColor: '#000' },
    { name: 'Purple', color: theme.colors.system.purple },
    { name: 'Pink', color: theme.colors.system.pink },
    { name: 'Teal', color: theme.colors.system.teal },
    { name: 'Indigo', color: theme.colors.system.indigo },
  ];

  const backgroundColors = [
    { name: 'Primary', color: theme.colors.background.primary, textColor: theme.colors.label.primary },
    { name: 'Secondary', color: theme.colors.background.secondary, textColor: theme.colors.label.primary },
    { name: 'Tertiary', color: theme.colors.background.tertiary, textColor: theme.colors.label.primary },
  ];

  const semanticColors = [
    { name: 'Success', color: theme.colors.semantic.success },
    { name: 'Warning', color: theme.colors.semantic.warning, textColor: '#000' },
    { name: 'Error', color: theme.colors.semantic.error },
    { name: 'Info', color: theme.colors.semantic.info },
  ];

  const interactiveColors = [
    { name: 'Tint', color: theme.colors.interactive.tint },
    { name: 'Pressed', color: theme.colors.interactive.tintPressed },
    { name: 'Destructive', color: theme.colors.interactive.destructive },
  ];

  return (
    <ShowcaseSection
      title="Colors"
      description="System colors adapt to light and dark mode"
    >
      <ColorRow title="System Colors" colors={systemColors} />
      <ColorRow title="Backgrounds" colors={backgroundColors} />
      <ColorRow title="Semantic" colors={semanticColors} />
      <ColorRow title="Interactive" colors={interactiveColors} />
    </ShowcaseSection>
  );
}
