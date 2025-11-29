/**
 * ShowcaseSection - Reusable section wrapper for showcase demos
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '../../design-system';

interface ShowcaseSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function ShowcaseSection({
  title,
  description,
  children,
}: ShowcaseSectionProps): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    container: {
      marginBottom: theme.spacing.xxxl,
    },
    header: {
      marginBottom: theme.spacing.lg,
      paddingHorizontal: theme.spacing.lg,
    },
    title: {
      ...theme.typography.title2,
      color: theme.colors.label.primary,
      marginBottom: theme.spacing.xs,
    },
    description: {
      ...theme.typography.subheadline,
      color: theme.colors.label.secondary,
    },
    content: {
      paddingHorizontal: theme.spacing.lg,
    },
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}
