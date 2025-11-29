/**
 * TypingIndicatorShowcase - Displays all TypingIndicator variants and configurations
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@hooks';
import { TypingIndicator } from '../../../design-system/components/Chat';
import { ShowcaseSection } from '../ShowcaseSection';

interface ShowcaseGroupProps {
  title: string;
  children: React.ReactNode;
}

function ShowcaseGroup({ title, children }: ShowcaseGroupProps): React.ReactElement {
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
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
      alignItems: 'center',
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.items}>{children}</View>
    </View>
  );
}

export function TypingIndicatorShowcase(): React.ReactElement {
  return (
    <ShowcaseSection
      title="TypingIndicator"
      description="Animated typing indicators for real-time chat feedback"
    >
      {/* Variants */}
      <ShowcaseGroup title="Variants">
        <TypingIndicator isTyping variant="dots" />
        <TypingIndicator isTyping variant="bubble" />
        <TypingIndicator isTyping variant="text" />
      </ShowcaseGroup>

      {/* Sizes */}
      <ShowcaseGroup title="Sizes (Dots)">
        <TypingIndicator isTyping variant="dots" size="sm" />
        <TypingIndicator isTyping variant="dots" size="md" />
        <TypingIndicator isTyping variant="dots" size="lg" />
      </ShowcaseGroup>

      {/* Text Variant with Users */}
      <ShowcaseGroup title="Text Variant with Users">
        <TypingIndicator isTyping variant="text" typingUsers={['John']} />
        <TypingIndicator isTyping variant="text" typingUsers={['Alice', 'Bob']} />
        <TypingIndicator isTyping variant="text" typingUsers={['User 1', 'User 2', 'User 3']} />
      </ShowcaseGroup>

      {/* Custom Text */}
      <ShowcaseGroup title="Custom Text">
        <TypingIndicator isTyping variant="text" text="Someone is writing..." />
        <TypingIndicator isTyping variant="text" text="Composing a message..." />
      </ShowcaseGroup>

      {/* Bubble Variant */}
      <ShowcaseGroup title="Bubble Variant (like a message)">
        <TypingIndicator isTyping variant="bubble" size="sm" />
        <TypingIndicator isTyping variant="bubble" size="md" />
        <TypingIndicator isTyping variant="bubble" size="lg" />
      </ShowcaseGroup>
    </ShowcaseSection>
  );
}
