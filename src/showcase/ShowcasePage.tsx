/**
 * ShowcasePage - Main design system showcase container
 */

import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles, useTheme } from '../design-system';
import {
  ColorShowcase,
  TypographyShowcase,
  SpacingShowcase,
  ButtonShowcase,
  ShadowShowcase,
  RadiusShowcase,
  // Chat Components
  StatusBadgeShowcase,
  UnreadBadgeShowcase,
  AvatarShowcase,
  TypingIndicatorShowcase,
  MessageBubbleShowcase,
  InputBarShowcase,
  ConversationListItemShowcase,
} from './components';

function Header(): React.ReactElement {
  const { theme, isDark, toggleColorMode } = useTheme();
  const insets = useSafeAreaInsets();

  const styles = useThemedStyles((t) => ({
    container: {
      paddingTop: insets.top + t.spacing.lg,
      paddingHorizontal: t.spacing.lg,
      paddingBottom: t.spacing.xl,
      backgroundColor: t.colors.background.primary,
      borderBottomWidth: 1,
      borderBottomColor: t.colors.separator.opaque,
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: t.spacing.sm,
    },
    title: {
      ...t.typography.largeTitle,
      color: t.colors.label.primary,
      fontWeight: '700',
    },
    themeToggle: {
      backgroundColor: t.colors.fill.secondary,
      paddingHorizontal: t.spacing.md,
      paddingVertical: t.spacing.sm,
      borderRadius: t.radius.full,
      flexDirection: 'row',
      alignItems: 'center',
      gap: t.spacing.xs,
    },
    themeIcon: {
      fontSize: 16,
    },
    themeText: {
      ...t.typography.subheadline,
      color: t.colors.label.primary,
      fontWeight: '600',
    },
    subtitle: {
      ...t.typography.body,
      color: t.colors.label.secondary,
    },
    versionBadge: {
      backgroundColor: t.colors.interactive.tint,
      paddingHorizontal: t.spacing.sm,
      paddingVertical: t.spacing.xxs,
      borderRadius: t.radius.full,
      alignSelf: 'flex-start',
      marginTop: t.spacing.sm,
    },
    versionText: {
      ...t.typography.caption2,
      color: '#FFFFFF',
      fontWeight: '600',
    },
  }));

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>August</Text>
        <Pressable style={styles.themeToggle} onPress={toggleColorMode}>
          <Text style={styles.themeIcon}>{isDark ? '🌙' : '☀️'}</Text>
          <Text style={styles.themeText}>{isDark ? 'Dark' : 'Light'}</Text>
        </Pressable>
      </View>
      <Text style={styles.subtitle}>
        React Native Design System
      </Text>
      <View style={styles.versionBadge}>
        <Text style={styles.versionText}>v1.0.0</Text>
      </View>
    </View>
  );
}

export function ShowcasePage(): React.ReactElement {
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles((theme) => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.secondary,
    },
    scrollContent: {
      paddingTop: theme.spacing.xl,
      paddingBottom: insets.bottom + theme.spacing.xxxl,
    },
  }));

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Design Tokens */}
        <ColorShowcase />
        <TypographyShowcase />
        <SpacingShowcase />
        <ShadowShowcase />
        <RadiusShowcase />

        {/* Base Components */}
        <ButtonShowcase />

        {/* Chat SDK Components */}
        <StatusBadgeShowcase />
        <UnreadBadgeShowcase />
        <AvatarShowcase />
        <TypingIndicatorShowcase />
        <MessageBubbleShowcase />
        <InputBarShowcase />
        <ConversationListItemShowcase />
      </ScrollView>
    </View>
  );
}
