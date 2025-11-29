/**
 * AugustDesignSystem - Avatar Component Styles
 *
 * Style definitions for the Avatar component following Apple HIG.
 */

import { StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import type { Theme } from '@types';
import type { AvatarSize } from './Avatar.types';

/**
 * Get avatar dimensions based on size.
 */
export function getAvatarSize(size: AvatarSize): number {
  const sizes: Record<AvatarSize, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
  };
  return sizes[size];
}

/**
 * Get border width based on size.
 */
export function getAvatarBorderWidth(size: AvatarSize): number {
  const widths: Record<AvatarSize, number> = {
    xs: 1.5,
    sm: 2,
    md: 2,
    lg: 2.5,
    xl: 3,
  };
  return widths[size];
}

/**
 * Get font size for initials based on avatar size.
 */
export function getInitialsFontSize(size: AvatarSize): number {
  const fontSizes: Record<AvatarSize, number> = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 20,
    xl: 28,
  };
  return fontSizes[size];
}

/**
 * Get stacked avatar offset (overlap amount).
 */
export function getStackOffset(size: AvatarSize): number {
  const avatarSize = getAvatarSize(size);
  // Overlap by ~40% of the avatar size
  return Math.round(avatarSize * 0.4);
}

/**
 * Get stacked avatar scale for secondary avatars.
 */
export function getStackScale(size: AvatarSize): number {
  const scales: Record<AvatarSize, number> = {
    xs: 0.85,
    sm: 0.8,
    md: 0.75,
    lg: 0.7,
    xl: 0.65,
  };
  return scales[size];
}

/**
 * Get status indicator position offset.
 */
export function getStatusOffset(size: AvatarSize): { bottom: number; right: number } {
  const offsets: Record<AvatarSize, { bottom: number; right: number }> = {
    xs: { bottom: -1, right: -1 },
    sm: { bottom: 0, right: 0 },
    md: { bottom: 0, right: 0 },
    lg: { bottom: 2, right: 2 },
    xl: { bottom: 4, right: 4 },
  };
  return offsets[size];
}

/**
 * Get status indicator size for avatar size.
 */
export function getStatusSize(size: AvatarSize): 'sm' | 'md' | 'lg' {
  const statusSizes: Record<AvatarSize, 'sm' | 'md' | 'lg'> = {
    xs: 'sm',
    sm: 'sm',
    md: 'md',
    lg: 'md',
    xl: 'lg',
  };
  return statusSizes[size];
}

/**
 * Generate initials from a name.
 * Returns up to 2 characters from the first and last name.
 */
export function generateInitials(name?: string): string {
  if (!name) return '';

  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  const first = parts[0].charAt(0);
  const last = parts[parts.length - 1].charAt(0);
  return (first + last).toUpperCase();
}

/**
 * Generate a consistent background color based on name.
 * Uses a hash to ensure the same name always gets the same color.
 */
export function getAvatarBackgroundColor(name: string | undefined, theme: Theme): string {
  if (!name) return theme.colors.fill.secondary;

  // Color palette for avatar backgrounds
  const colors = [
    theme.colors.system.blue,
    theme.colors.system.green,
    theme.colors.system.orange,
    theme.colors.system.purple,
    theme.colors.system.pink,
    theme.colors.system.teal,
    theme.colors.system.indigo,
    theme.colors.system.cyan,
  ];

  // Simple hash based on name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

/**
 * Create base Avatar styles.
 */
export function createAvatarStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      position: 'relative',
    },

    avatar: {
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },

    avatarRounded: {
      borderRadius: 9999, // Fully rounded
    },

    avatarBordered: {
      borderColor: theme.colors.background.primary,
    },

    image: {
      width: '100%',
      height: '100%',
    },

    initials: {
      color: '#FFFFFF',
      fontWeight: '600',
      textAlign: 'center',
    },

    // Group/stacked avatar styles
    groupContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    stackedAvatar: {
      position: 'absolute',
    },

    // Status indicator positioning
    statusContainer: {
      position: 'absolute',
      zIndex: 10,
    },
  });
}

/**
 * Generate dynamic styles based on Avatar props.
 */
export function getDynamicAvatarStyles(
  size: AvatarSize,
  showBorder: boolean,
  backgroundColor: string | undefined,
  name: string | undefined,
  theme: Theme
): { container: ViewStyle; avatar: ViewStyle; initials: TextStyle } {
  const avatarSize = getAvatarSize(size);
  const borderWidth = showBorder ? getAvatarBorderWidth(size) : 0;
  const fontSize = getInitialsFontSize(size);
  const bgColor = backgroundColor || getAvatarBackgroundColor(name, theme);

  const containerStyle: ViewStyle = {
    width: avatarSize,
    height: avatarSize,
  };

  const avatarStyle: ViewStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: bgColor,
  };

  if (showBorder) {
    avatarStyle.borderWidth = borderWidth;
    avatarStyle.borderColor = theme.colors.background.primary;
  }

  const initialsStyle: TextStyle = {
    fontSize,
    lineHeight: fontSize * 1.2,
  };

  return {
    container: containerStyle,
    avatar: avatarStyle,
    initials: initialsStyle,
  };
}

/**
 * Get group container width based on number of avatars.
 */
export function getGroupContainerWidth(
  size: AvatarSize,
  count: number
): number {
  const avatarSize = getAvatarSize(size);
  const offset = getStackOffset(size);
  // First avatar is full width, subsequent avatars overlap
  return avatarSize + (Math.min(count, 3) - 1) * (avatarSize - offset);
}
