/**
 * ProgressShowcase - Displays all progress indicator variants and configurations
 */

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@hooks';
import { Progress, Button } from '@components';
import { ShowcaseSection } from './ShowcaseSection';

interface ProgressGroupProps {
  title: string;
  children: React.ReactNode;
}

function ProgressGroup({ title, children }: ProgressGroupProps): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    container: {
      marginBottom: theme.spacing.xl,
    },
    title: {
      ...theme.typography.subheadline,
      color: theme.colors.label.secondary,
      marginBottom: theme.spacing.md,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    content: {
      gap: theme.spacing.md,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

export function ProgressShowcase(): React.ReactElement {
  const [animatedValue, setAnimatedValue] = useState(0);

  const styles = useThemedStyles((theme) => ({
    circularRow: {
      flexDirection: 'row',
      gap: theme.spacing.xl,
      alignItems: 'center',
      justifyContent: 'center',
    },
    circularItem: {
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    label: {
      ...theme.typography.caption1,
      color: theme.colors.label.secondary,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.md,
    },
  }));

  // Animate progress for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValue((prev) => {
        if (prev >= 100) return 0;
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ShowcaseSection
      title="Progress"
      description="Linear and circular progress indicators for operations"
    >
      {/* Linear Progress */}
      <ProgressGroup title="Linear Progress">
        <Progress value={25} variant="linear" />
        <Progress value={50} variant="linear" />
        <Progress value={75} variant="linear" />
        <Progress value={100} variant="linear" color="success" />
      </ProgressGroup>

      {/* Linear with Label */}
      <ProgressGroup title="Linear with Label">
        <Progress value={animatedValue} variant="linear" showLabel />
      </ProgressGroup>

      {/* Linear Sizes */}
      <ProgressGroup title="Linear Sizes">
        <Progress value={60} variant="linear" size="sm" />
        <Progress value={60} variant="linear" size="md" />
        <Progress value={60} variant="linear" size="lg" />
      </ProgressGroup>

      {/* Linear Colors */}
      <ProgressGroup title="Linear Colors">
        <Progress value={70} variant="linear" color="primary" />
        <Progress value={70} variant="linear" color="success" />
        <Progress value={70} variant="linear" color="warning" />
        <Progress value={70} variant="linear" color="error" />
        <Progress value={70} variant="linear" color="info" />
      </ProgressGroup>

      {/* Indeterminate */}
      <ProgressGroup title="Indeterminate (Loading)">
        <Progress indeterminate variant="linear" />
      </ProgressGroup>

      {/* Circular Progress */}
      <ProgressGroup title="Circular Progress">
        <View style={styles.circularRow}>
          <View style={styles.circularItem}>
            <Progress value={25} variant="circular" size="sm" />
            <Text style={styles.label}>25%</Text>
          </View>
          <View style={styles.circularItem}>
            <Progress value={50} variant="circular" size="md" />
            <Text style={styles.label}>50%</Text>
          </View>
          <View style={styles.circularItem}>
            <Progress value={75} variant="circular" size="lg" />
            <Text style={styles.label}>75%</Text>
          </View>
          <View style={styles.circularItem}>
            <Progress value={100} variant="circular" size="lg" color="success" />
            <Text style={styles.label}>Complete</Text>
          </View>
        </View>
      </ProgressGroup>

      {/* Circular with Label */}
      <ProgressGroup title="Circular with Label">
        <View style={styles.circularRow}>
          <Progress value={animatedValue} variant="circular" size="lg" showLabel />
        </View>
      </ProgressGroup>

      {/* Circular Indeterminate */}
      <ProgressGroup title="Circular Indeterminate">
        <View style={styles.circularRow}>
          <Progress indeterminate variant="circular" size="sm" />
          <Progress indeterminate variant="circular" size="md" />
          <Progress indeterminate variant="circular" size="lg" />
        </View>
      </ProgressGroup>
    </ShowcaseSection>
  );
}
