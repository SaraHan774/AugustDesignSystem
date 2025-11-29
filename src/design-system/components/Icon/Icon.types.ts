/**
 * AugustDesignSystem - Icon Component Types
 *
 * Type definitions for the Icon component with native-first approach.
 * Uses SF Symbols on iOS and Material Icons on Android/Web.
 */

import type { ReactNode } from 'react';
import type { ViewStyle, ColorValue } from 'react-native';

/**
 * Icon size variants following design system standards.
 * Sizes are based on common icon dimensions in iOS HIG.
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Icon size values in points.
 */
export const ICON_SIZES: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

/**
 * SF Symbol weight variants (iOS only).
 * Maps to SF Symbols weight values.
 */
export type IconWeight =
  | 'ultralight'
  | 'thin'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'heavy'
  | 'black';

/**
 * SF Symbol rendering modes (iOS only).
 * - monochrome: Single color
 * - hierarchical: Primary color with opacity variations
 * - palette: Multiple custom colors
 * - multicolor: System-defined multicolor
 */
export type IconRenderingMode = 'monochrome' | 'hierarchical' | 'palette' | 'multicolor';

/**
 * SF Symbol effect animations (iOS 17+).
 */
export type IconSymbolEffect = 'bounce' | 'pulse' | 'variableColor' | 'scale' | 'appear' | 'disappear';

/**
 * Semantic color options for icons.
 */
export type IconColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'tint'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | string; // Custom color

/**
 * Common icon names that map across platforms.
 * These are the abstract names used in the component.
 */
export type CommonIconName =
  // Actions
  | 'checkmark'
  | 'close'
  | 'plus'
  | 'minus'
  | 'search'
  | 'edit'
  | 'delete'
  | 'share'
  | 'copy'
  | 'paste'
  | 'refresh'
  | 'download'
  | 'upload'
  | 'send'
  | 'reply'
  | 'forward'
  // Navigation
  | 'back'
  | 'forward-nav'
  | 'up'
  | 'down'
  | 'menu'
  | 'more-horizontal'
  | 'more-vertical'
  | 'home'
  | 'settings'
  // Communication
  | 'chat'
  | 'chat-fill'
  | 'phone'
  | 'video'
  | 'mic'
  | 'mic-off'
  | 'speaker'
  | 'speaker-off'
  // Media
  | 'camera'
  | 'image'
  | 'play'
  | 'pause'
  | 'stop'
  | 'volume'
  | 'volume-off'
  // People
  | 'person'
  | 'person-fill'
  | 'people'
  | 'people-fill'
  // Status
  | 'info'
  | 'warning'
  | 'error'
  | 'success'
  | 'help'
  // Objects
  | 'attach'
  | 'link'
  | 'location'
  | 'calendar'
  | 'clock'
  | 'heart'
  | 'heart-fill'
  | 'star'
  | 'star-fill'
  | 'bookmark'
  | 'bookmark-fill'
  | 'bell'
  | 'bell-fill'
  | 'lock'
  | 'unlock'
  | 'eye'
  | 'eye-off'
  // Misc
  | string; // Allow custom/raw icon names

/**
 * Props for the Icon component.
 */
export interface IconProps {
  // ============================================================================
  // Content
  // ============================================================================

  /**
   * Icon name. Can be:
   * - Common name (e.g., 'checkmark') - mapped to platform-specific icon
   * - SF Symbol name (e.g., 'chevron.right') - used directly on iOS
   * - Material Icon name (e.g., 'check') - used directly on Android/Web
   */
  name?: CommonIconName;

  /**
   * Custom icon content. When provided, `name` is ignored.
   * Use this for custom SVG icons or other icon components.
   */
  children?: ReactNode;

  // ============================================================================
  // Size & Appearance
  // ============================================================================

  /**
   * Size of the icon.
   * @default 'md'
   */
  size?: IconSize | number;

  /**
   * Color of the icon. Can be:
   * - Semantic name (e.g., 'primary', 'error')
   * - Custom color string (e.g., '#FF0000', 'rgba(0,0,0,0.5)')
   * @default 'primary'
   */
  color?: IconColor;

  /**
   * SF Symbol weight (iOS only).
   * On Android/Web, this prop is ignored.
   * @default 'regular'
   */
  weight?: IconWeight;

  /**
   * SF Symbol rendering mode (iOS only).
   * On Android/Web, this prop is ignored.
   * @default 'monochrome'
   */
  renderingMode?: IconRenderingMode;

  // ============================================================================
  // Animation (iOS 17+)
  // ============================================================================

  /**
   * SF Symbol effect animation (iOS 17+ only).
   * On older iOS versions and other platforms, this prop is ignored.
   */
  symbolEffect?: IconSymbolEffect;

  /**
   * Whether the symbol effect is active.
   * @default true when symbolEffect is set
   */
  symbolEffectActive?: boolean;

  // ============================================================================
  // Accessibility
  // ============================================================================

  /**
   * Test ID for testing frameworks.
   */
  testID?: string;

  /**
   * Accessibility label for screen readers.
   * If not provided, icon is treated as decorative.
   */
  accessibilityLabel?: string;

  /**
   * Whether the icon should be hidden from accessibility tree.
   * @default true (icons are decorative by default)
   */
  accessibilityHidden?: boolean;

  // ============================================================================
  // Styling
  // ============================================================================

  /**
   * Custom style for the icon container.
   */
  style?: ViewStyle;
}

/**
 * Platform-specific icon mapping.
 */
export interface IconMapping {
  ios: string;
  android: string;
  web?: string;
}

/**
 * Icon map type for common icons.
 */
export type IconMap = Record<string, IconMapping>;