/**
 * DividerShowcase - Displays Divider component variants and configurations
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@hooks';
import { Divider } from '@components';
import { ShowcaseSection } from './ShowcaseSection';

interface DividerGroupProps {
  title: string;
  children: React.ReactNode;
}

function DividerGroup({ title, children }: DividerGroupProps): React.ReactElement {
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
    content: {
      gap: theme.spacing.lg,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

export function DividerShowcase(): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    dividerContainer: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.radius.md,
      overflow: 'hidden',
    },
    listItem: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
    },
    listItemText: {
      ...theme.typography.body,
      color: theme.colors.label.primary,
    },
    verticalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      height: 40,
    },
    verticalLabel: {
      ...theme.typography.body,
      color: theme.colors.label.primary,
    },
    labelContainer: {
      paddingVertical: theme.spacing.lg,
    },
    description: {
      ...theme.typography.footnote,
      color: theme.colors.label.tertiary,
      marginTop: theme.spacing.xs,
    },
  }));

  return (
    <ShowcaseSection
      title="Divider"
      description="Visual separators with multiple variants for lists and content"
    >
      {/* Variants */}
      <DividerGroup title="Variants">
        <View style={styles.dividerContainer}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Full Width Divider</Text>
            <Text style={styles.description}>Spans the entire width</Text>
          </View>
          <Divider variant="full" />
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Inset Divider</Text>
            <Text style={styles.description}>Has left margin (iOS style)</Text>
          </View>
          <Divider variant="inset" />
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Middle Divider</Text>
            <Text style={styles.description}>Has margins on both sides</Text>
          </View>
          <Divider variant="middle" />
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Last Item</Text>
            <Text style={styles.description}>No divider after this</Text>
          </View>
        </View>
      </DividerGroup>

      {/* With Label */}
      <DividerGroup title="With Label">
        <View style={styles.labelContainer}>
          <Divider variant="withLabel" label="OR" />
        </View>
        <View style={styles.labelContainer}>
          <Divider variant="withLabel" label="Continue with" />
        </View>
        <View style={styles.labelContainer}>
          <Divider variant="withLabel" label="Section Break" />
        </View>
      </DividerGroup>

      {/* Vertical */}
      <DividerGroup title="Vertical Orientation">
        <View style={styles.verticalContainer}>
          <Text style={styles.verticalLabel}>Item 1</Text>
          <Divider orientation="vertical" />
          <Text style={styles.verticalLabel}>Item 2</Text>
          <Divider orientation="vertical" />
          <Text style={styles.verticalLabel}>Item 3</Text>
        </View>
      </DividerGroup>

      {/* Thickness */}
      <DividerGroup title="Thickness">
        <View>
          <Text style={styles.description}>Hairline (default ~0.5px)</Text>
          <Divider spacing={8} />
        </View>
        <View>
          <Text style={styles.description}>Thin (1px)</Text>
          <Divider thickness={1} spacing={8} />
        </View>
        <View>
          <Text style={styles.description}>Medium (2px)</Text>
          <Divider thickness={2} spacing={8} />
        </View>
        <View>
          <Text style={styles.description}>Thick (4px)</Text>
          <Divider thickness={4} spacing={8} />
        </View>
      </DividerGroup>
    </ShowcaseSection>
  );
}
