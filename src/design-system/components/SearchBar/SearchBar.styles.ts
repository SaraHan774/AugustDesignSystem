/**
 * AugustDesignSystem - SearchBar Component Styles
 *
 * Style utilities for the iOS-style SearchBar component.
 */

import { StyleSheet } from 'react-native';
import type { Theme } from '../../types';

/**
 * Create base styles for SearchBar component.
 */
export function createSearchBarStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.fill.tertiary,
      borderRadius: theme.radius.sm,
      height: 36,
      paddingHorizontal: theme.spacing.sm,
    },

    inputContainerFocused: {
      // Slight visual emphasis when focused
    },

    inputContainerDisabled: {
      opacity: 0.5,
    },

    iconContainer: {
      marginRight: theme.spacing.xs,
    },

    input: {
      flex: 1,
      height: '100%',
      ...theme.typography.body,
      color: theme.colors.label.primary,
      padding: 0,
      margin: 0,
    },

    clearButton: {
      padding: theme.spacing.xs,
      marginLeft: theme.spacing.xs,
    },

    cancelButton: {
      marginLeft: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
    },

    cancelButtonText: {
      ...theme.typography.body,
      color: theme.colors.interactive.tint,
    },
  });
}
