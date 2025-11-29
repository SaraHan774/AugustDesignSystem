/**
 * ButtonShowcase - Displays all button variants and configurations
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@hooks';
import { Button } from '@components';
import { ShowcaseSection } from './ShowcaseSection';

interface ButtonGroupProps {
  title: string;
  children: React.ReactNode;
}

function ButtonGroup({ title, children }: ButtonGroupProps): React.ReactElement {
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
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttons}>{children}</View>
    </View>
  );
}

export function ButtonShowcase(): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    fullWidthContainer: {
      gap: theme.spacing.sm,
    },
  }));

  return (
    <ShowcaseSection
      title="Buttons"
      description="Interactive buttons with multiple variants, sizes, and states"
    >
      {/* Variants */}
      <ButtonGroup title="Variants">
        <Button title="Filled" variant="filled" />
        <Button title="Tinted" variant="tinted" />
        <Button title="Gray" variant="gray" />
        <Button title="Outlined" variant="outlined" />
        <Button title="Ghost" variant="ghost" />
      </ButtonGroup>

      {/* Sizes */}
      <ButtonGroup title="Sizes">
        <Button title="Small" size="sm" />
        <Button title="Medium" size="md" />
        <Button title="Large" size="lg" />
      </ButtonGroup>

      {/* Color Schemes */}
      <ButtonGroup title="Color Schemes">
        <Button title="Primary" colorScheme="primary" />
        <Button title="Destructive" colorScheme="destructive" />
        <Button title="Success" colorScheme="success" />
        <Button title="Neutral" colorScheme="neutral" />
      </ButtonGroup>

      {/* Outlined Variants */}
      <ButtonGroup title="Outlined Color Schemes">
        <Button title="Primary" variant="outlined" colorScheme="primary" />
        <Button title="Destructive" variant="outlined" colorScheme="destructive" />
        <Button title="Success" variant="outlined" colorScheme="success" />
        <Button title="Neutral" variant="outlined" colorScheme="neutral" />
      </ButtonGroup>

      {/* States */}
      <ButtonGroup title="States">
        <Button title="Normal" />
        <Button title="Disabled" disabled />
        <Button title="Loading" loading />
        <Button title="Loading..." loading loadingText="Loading..." />
      </ButtonGroup>

      {/* Full Width */}
      <ButtonGroup title="Full Width">
        <View style={styles.fullWidthContainer}>
          <Button title="Full Width Primary" fullWidth />
          <Button title="Full Width Outlined" variant="outlined" fullWidth />
        </View>
      </ButtonGroup>
    </ShowcaseSection>
  );
}
