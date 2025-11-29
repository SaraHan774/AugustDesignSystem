/**
 * PressableShowcase - Displays Pressable component variants and configurations
 */

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useThemedStyles } from '@hooks';
import { Pressable, Icon } from '@components';
import { ShowcaseSection } from './ShowcaseSection';

interface PressableGroupProps {
  title: string;
  children: React.ReactNode;
}

function PressableGroup({ title, children }: PressableGroupProps): React.ReactElement {
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
    items: {
      gap: theme.spacing.sm,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.items}>{children}</View>
    </View>
  );
}

export function PressableShowcase(): React.ReactElement {
  const styles = useThemedStyles((theme) => ({
    pressableItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.fill.tertiary,
      padding: theme.spacing.md,
      borderRadius: theme.radius.md,
      gap: theme.spacing.md,
    },
    pressableContent: {
      flex: 1,
    },
    pressableTitle: {
      ...theme.typography.body,
      color: theme.colors.label.primary,
      fontWeight: '600',
    },
    pressableSubtitle: {
      ...theme.typography.footnote,
      color: theme.colors.label.secondary,
      marginTop: 2,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.interactive.tint,
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },
    chip: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.fill.secondary,
      borderRadius: theme.radius.full,
    },
    chipText: {
      ...theme.typography.footnote,
      color: theme.colors.label.primary,
      fontWeight: '500',
    },
  }));

  const handlePress = (message: string) => {
    Alert.alert('Pressed', message);
  };

  return (
    <ShowcaseSection
      title="Pressable"
      description="Enhanced touchable with haptics, animations, and press states"
    >
      {/* Animation Types */}
      <PressableGroup title="Press Animations">
        <Pressable
          style={styles.pressableItem}
          pressAnimation="opacity"
          onPress={() => handlePress('Opacity animation')}
        >
          <View style={styles.iconContainer}>
            <Icon name="star" size="md" color="white" />
          </View>
          <View style={styles.pressableContent}>
            <Text style={styles.pressableTitle}>Opacity Animation</Text>
            <Text style={styles.pressableSubtitle}>Fades on press</Text>
          </View>
          <Icon name="chevronRight" size="sm" color="tertiary" />
        </Pressable>

        <Pressable
          style={styles.pressableItem}
          pressAnimation="scale"
          onPress={() => handlePress('Scale animation')}
        >
          <View style={styles.iconContainer}>
            <Icon name="heart" size="md" color="white" />
          </View>
          <View style={styles.pressableContent}>
            <Text style={styles.pressableTitle}>Scale Animation</Text>
            <Text style={styles.pressableSubtitle}>Shrinks on press</Text>
          </View>
          <Icon name="chevronRight" size="sm" color="tertiary" />
        </Pressable>

        <Pressable
          style={styles.pressableItem}
          pressAnimation="both"
          onPress={() => handlePress('Both animations')}
        >
          <View style={styles.iconContainer}>
            <Icon name="bookmark" size="md" color="white" />
          </View>
          <View style={styles.pressableContent}>
            <Text style={styles.pressableTitle}>Both Animations</Text>
            <Text style={styles.pressableSubtitle}>Opacity + scale</Text>
          </View>
          <Icon name="chevronRight" size="sm" color="tertiary" />
        </Pressable>

        <Pressable
          style={styles.pressableItem}
          pressAnimation="none"
          onPress={() => handlePress('No animation')}
        >
          <View style={styles.iconContainer}>
            <Icon name="settings" size="md" color="white" />
          </View>
          <View style={styles.pressableContent}>
            <Text style={styles.pressableTitle}>No Animation</Text>
            <Text style={styles.pressableSubtitle}>Static press</Text>
          </View>
          <Icon name="chevronRight" size="sm" color="tertiary" />
        </Pressable>
      </PressableGroup>

      {/* Haptic Feedback */}
      <PressableGroup title="Haptic Feedback">
        <View style={styles.row}>
          <Pressable
            style={styles.chip}
            hapticFeedback="light"
            onPress={() => handlePress('Light haptic')}
          >
            <Text style={styles.chipText}>Light</Text>
          </Pressable>
          <Pressable
            style={styles.chip}
            hapticFeedback="medium"
            onPress={() => handlePress('Medium haptic')}
          >
            <Text style={styles.chipText}>Medium</Text>
          </Pressable>
          <Pressable
            style={styles.chip}
            hapticFeedback="heavy"
            onPress={() => handlePress('Heavy haptic')}
          >
            <Text style={styles.chipText}>Heavy</Text>
          </Pressable>
          <Pressable
            style={styles.chip}
            hapticFeedback="none"
            onPress={() => handlePress('No haptic')}
          >
            <Text style={styles.chipText}>None</Text>
          </Pressable>
        </View>
      </PressableGroup>

      {/* Disabled State */}
      <PressableGroup title="Disabled State">
        <Pressable
          style={styles.pressableItem}
          disabled
          onPress={() => handlePress('Should not trigger')}
        >
          <View style={[styles.iconContainer, { opacity: 0.5 }]}>
            <Icon name="close" size="md" color="white" />
          </View>
          <View style={styles.pressableContent}>
            <Text style={[styles.pressableTitle, { opacity: 0.5 }]}>Disabled Pressable</Text>
            <Text style={[styles.pressableSubtitle, { opacity: 0.5 }]}>Cannot be pressed</Text>
          </View>
        </Pressable>
      </PressableGroup>
    </ShowcaseSection>
  );
}
