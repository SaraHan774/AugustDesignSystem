/**
 * SpinnerShowcase - Displays Spinner component variants and configurations
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@hooks';
import { Spinner } from '@components';
import { ShowcaseSection } from './ShowcaseSection';

interface SpinnerGroupProps {
  title: string;
  children: React.ReactNode;
}

function SpinnerGroup({ title, children }: SpinnerGroupProps): React.ReactElement {
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
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.xl,
      alignItems: 'center',
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

interface SpinnerItemProps {
  label: string;
  children: React.ReactNode;
}

function SpinnerItem({ label, children }: SpinnerItemProps): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    container: {
      alignItems: 'center',
      gap: theme.spacing.sm,
      minWidth: 60,
    },
    label: {
      ...theme.typography.caption2,
      color: theme.colors.label.tertiary,
    },
  }));

  return (
    <View style={styles.container}>
      {children}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export function SpinnerShowcase(): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    loadingCard: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.radius.md,
      padding: theme.spacing.xl,
      alignItems: 'center',
      gap: theme.spacing.md,
    },
    loadingText: {
      ...theme.typography.body,
      color: theme.colors.label.secondary,
    },
    row: {
      flexDirection: 'row',
      gap: theme.spacing.xl,
    },
  }));

  return (
    <ShowcaseSection
      title="Spinner"
      description="Loading indicators with various sizes and colors"
    >
      {/* Sizes */}
      <SpinnerGroup title="Sizes">
        <SpinnerItem label="xs">
          <Spinner size="xs" />
        </SpinnerItem>
        <SpinnerItem label="sm">
          <Spinner size="sm" />
        </SpinnerItem>
        <SpinnerItem label="md">
          <Spinner size="md" />
        </SpinnerItem>
        <SpinnerItem label="lg">
          <Spinner size="lg" />
        </SpinnerItem>
      </SpinnerGroup>

      {/* Colors */}
      <SpinnerGroup title="Colors">
        <SpinnerItem label="primary">
          <Spinner size="md" color="primary" />
        </SpinnerItem>
        <SpinnerItem label="secondary">
          <Spinner size="md" color="secondary" />
        </SpinnerItem>
        <SpinnerItem label="tint">
          <Spinner size="md" color="tint" />
        </SpinnerItem>
        <SpinnerItem label="success">
          <Spinner size="md" color="success" />
        </SpinnerItem>
        <SpinnerItem label="error">
          <Spinner size="md" color="error" />
        </SpinnerItem>
        <SpinnerItem label="white">
          <View style={{ backgroundColor: '#333', padding: 8, borderRadius: 8 }}>
            <Spinner size="md" color="white" />
          </View>
        </SpinnerItem>
      </SpinnerGroup>

      {/* With Label */}
      <SpinnerGroup title="With Label">
        <View style={styles.loadingCard}>
          <Spinner size="lg" color="tint" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>

        <View style={styles.loadingCard}>
          <Spinner size="md" label="Please wait" />
        </View>
      </SpinnerGroup>
    </ShowcaseSection>
  );
}
