/**
 * AugustDesignSystem - Avatar Component Types
 *
 * Type definitions for the Avatar component following Apple HIG.
 * Supports single avatars and stacked group avatars for chat applications.
 */

import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';
import type { PresenceStatus } from '../StatusBadge';

/**
 * Avatar sizes following design system scale.
 *
 * - `xs`: Extra small (24pt) - for inline mentions or compact lists
 * - `sm`: Small (32pt) - for message bubbles
 * - `md`: Medium (40pt) - default, for conversation lists
 * - `lg`: Large (56pt) - for profile headers
 * - `xl`: Extra large (80pt) - for full profile views
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Single avatar data structure.
 */
export interface AvatarData {
  /**
   * Image source for the avatar.
   * Can be a URL string or require() for local images.
   */
  source?: ImageSourcePropType | string;

  /**
   * Display name for generating initials fallback.
   */
  name?: string;

  /**
   * Custom fallback text instead of auto-generated initials.
   */
  initials?: string;
}

/**
 * Props for the Avatar component.
 */
export interface AvatarProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Image source for the avatar.
   * Can be a URL string or require() for local images.
   */
  source?: ImageSourcePropType | string;

  /**
   * Display name for generating initials fallback.
   * Used when image is not available.
   */
  name?: string;

  /**
   * Custom initials to display instead of auto-generated from name.
   * Max 2 characters recommended.
   */
  initials?: string;

  /**
   * Array of avatar data for group/stacked display.
   * When provided, displays stacked avatars (max 3 shown).
   */
  group?: AvatarData[];

  // ============================================================================
  // Visual Style
  // ============================================================================

  /**
   * Size of the avatar.
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * Whether to show a border around the avatar.
   * @default false
   */
  showBorder?: boolean;

  /**
   * Custom background color for initials fallback.
   * Uses theme tint color if not provided.
   */
  backgroundColor?: string;

  // ============================================================================
  // Status
  // ============================================================================

  /**
   * Online/offline presence status.
   * When provided, shows a status indicator dot.
   */
  status?: PresenceStatus;

  /**
   * Whether to show the status indicator.
   * @default true when status is provided
   */
  showStatus?: boolean;

  // ============================================================================
  // Events
  // ============================================================================

  /**
   * Handler called when the avatar is pressed.
   */
  onPress?: () => void;

  /**
   * Handler called when the image fails to load.
   */
  onImageError?: () => void;

  // ============================================================================
  // Accessibility
  // ============================================================================

  /**
   * Test ID for testing frameworks.
   */
  testID?: string;

  /**
   * Accessibility label for screen readers.
   * Defaults to name if not provided.
   */
  accessibilityLabel?: string;

  // ============================================================================
  // Styling
  // ============================================================================

  /**
   * Custom style for the avatar container.
   */
  style?: ViewStyle;

  /**
   * Custom style for the initials text.
   */
  textStyle?: TextStyle;

  /**
   * Custom icon to display as fallback instead of initials.
   */
  fallbackIcon?: ReactNode;
}

/**
 * Style props derived from Avatar state.
 */
export interface AvatarStyleProps {
  size: AvatarSize;
  showBorder: boolean;
  hasImage: boolean;
  isGroup: boolean;
}
