/**
 * AugustDesignSystem - Icon Mapping
 *
 * Maps common icon names to platform-specific icon names.
 * - iOS: SF Symbols names
 * - Android/Web: Material Icons names (from @expo/vector-icons)
 */

import type { IconMap } from './Icon.types';

/**
 * Common icon name mappings across platforms.
 *
 * SF Symbols reference: https://developer.apple.com/sf-symbols/
 * Material Icons reference: https://fonts.google.com/icons
 */
export const iconMap: IconMap = {
  // ===========================================================================
  // Actions
  // ===========================================================================
  'checkmark': {
    ios: 'checkmark',
    android: 'check',
  },
  'close': {
    ios: 'xmark',
    android: 'close',
  },
  'plus': {
    ios: 'plus',
    android: 'add',
  },
  'minus': {
    ios: 'minus',
    android: 'remove',
  },
  'search': {
    ios: 'magnifyingglass',
    android: 'search',
  },
  'edit': {
    ios: 'pencil',
    android: 'edit',
  },
  'delete': {
    ios: 'trash',
    android: 'delete',
  },
  'share': {
    ios: 'square.and.arrow.up',
    android: 'share',
  },
  'copy': {
    ios: 'doc.on.doc',
    android: 'content-copy',
  },
  'paste': {
    ios: 'doc.on.clipboard',
    android: 'content-paste',
  },
  'refresh': {
    ios: 'arrow.clockwise',
    android: 'refresh',
  },
  'download': {
    ios: 'arrow.down.circle',
    android: 'file-download',
  },
  'upload': {
    ios: 'arrow.up.circle',
    android: 'file-upload',
  },
  'send': {
    ios: 'paperplane.fill',
    android: 'send',
  },
  'reply': {
    ios: 'arrowshape.turn.up.left',
    android: 'reply',
  },
  'forward': {
    ios: 'arrowshape.turn.up.right',
    android: 'forward',
  },

  // ===========================================================================
  // Navigation
  // ===========================================================================
  'back': {
    ios: 'chevron.left',
    android: 'arrow-back',
  },
  'forward-nav': {
    ios: 'chevron.right',
    android: 'arrow-forward',
  },
  'up': {
    ios: 'chevron.up',
    android: 'keyboard-arrow-up',
  },
  'down': {
    ios: 'chevron.down',
    android: 'keyboard-arrow-down',
  },
  'menu': {
    ios: 'line.3.horizontal',
    android: 'menu',
  },
  'more-horizontal': {
    ios: 'ellipsis',
    android: 'more-horiz',
  },
  'more-vertical': {
    ios: 'ellipsis',
    android: 'more-vert',
  },
  'home': {
    ios: 'house',
    android: 'home',
  },
  'settings': {
    ios: 'gearshape',
    android: 'settings',
  },

  // ===========================================================================
  // Communication
  // ===========================================================================
  'chat': {
    ios: 'bubble.left',
    android: 'chat-bubble-outline',
  },
  'chat-fill': {
    ios: 'bubble.left.fill',
    android: 'chat-bubble',
  },
  'phone': {
    ios: 'phone',
    android: 'phone',
  },
  'video': {
    ios: 'video',
    android: 'videocam',
  },
  'mic': {
    ios: 'mic.fill',
    android: 'mic',
  },
  'mic-off': {
    ios: 'mic.slash.fill',
    android: 'mic-off',
  },
  'speaker': {
    ios: 'speaker.wave.2.fill',
    android: 'volume-up',
  },
  'speaker-off': {
    ios: 'speaker.slash.fill',
    android: 'volume-off',
  },

  // ===========================================================================
  // Media
  // ===========================================================================
  'camera': {
    ios: 'camera.fill',
    android: 'camera-alt',
  },
  'image': {
    ios: 'photo',
    android: 'image',
  },
  'play': {
    ios: 'play.fill',
    android: 'play-arrow',
  },
  'pause': {
    ios: 'pause.fill',
    android: 'pause',
  },
  'stop': {
    ios: 'stop.fill',
    android: 'stop',
  },
  'volume': {
    ios: 'speaker.wave.2.fill',
    android: 'volume-up',
  },
  'volume-off': {
    ios: 'speaker.slash.fill',
    android: 'volume-off',
  },

  // ===========================================================================
  // People
  // ===========================================================================
  'person': {
    ios: 'person',
    android: 'person-outline',
  },
  'person-fill': {
    ios: 'person.fill',
    android: 'person',
  },
  'people': {
    ios: 'person.2',
    android: 'people-outline',
  },
  'people-fill': {
    ios: 'person.2.fill',
    android: 'people',
  },

  // ===========================================================================
  // Status
  // ===========================================================================
  'info': {
    ios: 'info.circle',
    android: 'info-outline',
  },
  'warning': {
    ios: 'exclamationmark.triangle',
    android: 'warning',
  },
  'error': {
    ios: 'exclamationmark.circle',
    android: 'error-outline',
  },
  'success': {
    ios: 'checkmark.circle',
    android: 'check-circle-outline',
  },
  'help': {
    ios: 'questionmark.circle',
    android: 'help-outline',
  },

  // ===========================================================================
  // Objects
  // ===========================================================================
  'attach': {
    ios: 'paperclip',
    android: 'attach-file',
  },
  'link': {
    ios: 'link',
    android: 'link',
  },
  'location': {
    ios: 'location.fill',
    android: 'location-on',
  },
  'calendar': {
    ios: 'calendar',
    android: 'event',
  },
  'clock': {
    ios: 'clock',
    android: 'schedule',
  },
  'heart': {
    ios: 'heart',
    android: 'favorite-outline',
  },
  'heart-fill': {
    ios: 'heart.fill',
    android: 'favorite',
  },
  'star': {
    ios: 'star',
    android: 'star-outline',
  },
  'star-fill': {
    ios: 'star.fill',
    android: 'star',
  },
  'bookmark': {
    ios: 'bookmark',
    android: 'bookmark-outline',
  },
  'bookmark-fill': {
    ios: 'bookmark.fill',
    android: 'bookmark',
  },
  'bell': {
    ios: 'bell',
    android: 'notifications-none',
  },
  'bell-fill': {
    ios: 'bell.fill',
    android: 'notifications',
  },
  'lock': {
    ios: 'lock.fill',
    android: 'lock',
  },
  'unlock': {
    ios: 'lock.open.fill',
    android: 'lock-open',
  },
  'eye': {
    ios: 'eye',
    android: 'visibility',
  },
  'eye-off': {
    ios: 'eye.slash',
    android: 'visibility-off',
  },
  'document': {
    ios: 'doc',
    android: 'description',
  },
  'folder': {
    ios: 'folder',
    android: 'folder',
  },

  // ===========================================================================
  // Arrows & Indicators
  // ===========================================================================
  'arrow-up': {
    ios: 'arrow.up',
    android: 'arrow-upward',
  },
  'arrow-down': {
    ios: 'arrow.down',
    android: 'arrow-downward',
  },
  'arrow-left': {
    ios: 'arrow.left',
    android: 'arrow-back',
  },
  'arrow-right': {
    ios: 'arrow.right',
    android: 'arrow-forward',
  },
  'external-link': {
    ios: 'arrow.up.right.square',
    android: 'open-in-new',
  },

  // ===========================================================================
  // Read Receipts (Chat specific)
  // ===========================================================================
  'check-single': {
    ios: 'checkmark',
    android: 'check',
  },
  'check-double': {
    ios: 'checkmark', // Will render two checkmarks
    android: 'done-all',
  },
  'clock-pending': {
    ios: 'clock',
    android: 'schedule',
  },
};

/**
 * Get platform-specific icon name from common name.
 */
export function getPlatformIconName(
  commonName: string,
  platform: 'ios' | 'android' | 'web'
): string {
  const mapping = iconMap[commonName];

  if (!mapping) {
    // If no mapping found, return the name as-is (assume it's a platform-specific name)
    return commonName;
  }

  if (platform === 'ios') {
    return mapping.ios;
  }

  // Android and web use the same Material Icons
  return mapping.web || mapping.android;
}

/**
 * Check if an icon name is a common name (has mapping).
 */
export function isCommonIconName(name: string): boolean {
  return name in iconMap;
}