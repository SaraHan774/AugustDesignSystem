/**
 * SwitchShowcase - Displays all switch variants and configurations
 */

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@hooks';
import { Switch } from '@components';
import { ShowcaseSection } from './ShowcaseSection';

interface SwitchRowProps {
  label: string;
  children: React.ReactNode;
}

function SwitchRow({ label, children }: SwitchRowProps): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.separator.opaque,
    },
    label: {
      ...theme.typography.body,
      color: theme.colors.label.primary,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

export function SwitchShowcase(): React.ReactElement {
  const [basicValue, setBasicValue] = useState(false);
  const [smallValue, setSmallValue] = useState(true);
  const [customColorValue, setCustomColorValue] = useState(true);
  const [disabledValue] = useState(true);

  const styles = useThemedStyles((theme) => ({
    container: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.radius.md,
      paddingHorizontal: theme.spacing.lg,
    },
    group: {
      marginBottom: theme.spacing.xl,
    },
    groupTitle: {
      ...theme.typography.subheadline,
      color: theme.colors.label.secondary,
      marginBottom: theme.spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
  }));

  return (
    <ShowcaseSection
      title="Switch"
      description="iOS-style toggle switches with smooth animations"
    >
      {/* Basic Usage */}
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Basic Usage</Text>
        <View style={styles.container}>
          <SwitchRow label="Notifications">
            <Switch value={basicValue} onValueChange={setBasicValue} />
          </SwitchRow>
        </View>
      </View>

      {/* Sizes */}
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Sizes</Text>
        <View style={styles.container}>
          <SwitchRow label="Small">
            <Switch value={smallValue} onValueChange={setSmallValue} size="sm" />
          </SwitchRow>
          <SwitchRow label="Medium (Default)">
            <Switch value={basicValue} onValueChange={setBasicValue} size="md" />
          </SwitchRow>
        </View>
      </View>

      {/* Custom Colors */}
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Custom Colors</Text>
        <View style={styles.container}>
          <SwitchRow label="Green Track">
            <Switch
              value={customColorValue}
              onValueChange={setCustomColorValue}
              trackColorOn="#34C759"
            />
          </SwitchRow>
          <SwitchRow label="Orange Track">
            <Switch
              value={customColorValue}
              onValueChange={setCustomColorValue}
              trackColorOn="#FF9500"
            />
          </SwitchRow>
        </View>
      </View>

      {/* States */}
      <View style={styles.group}>
        <Text style={styles.groupTitle}>States</Text>
        <View style={styles.container}>
          <SwitchRow label="Disabled (On)">
            <Switch value={disabledValue} onValueChange={() => {}} disabled />
          </SwitchRow>
          <SwitchRow label="Disabled (Off)">
            <Switch value={false} onValueChange={() => {}} disabled />
          </SwitchRow>
        </View>
      </View>
    </ShowcaseSection>
  );
}
