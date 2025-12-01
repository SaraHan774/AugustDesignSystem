/**
 * react-native-web 확장 모듈
 *
 * react-native-web에는 없는 TurboModuleRegistry를 추가하여
 * react-native-svg의 fabric 모듈들이 웹 환경에서도 동작하도록 합니다.
 */

// react-native-web의 모든 export를 re-export
export * from 'react-native-web';

// Re-export AccessibilityInfo with enhanced web support
import { AccessibilityInfo as RNWAccessibilityInfo } from 'react-native-web';

// Enhanced AccessibilityInfo with methods that may not exist in react-native-web
export const AccessibilityInfo = {
  ...RNWAccessibilityInfo,
  // Ensure these methods exist and return proper values for web
  isReduceMotionEnabled: () => {
    // Check CSS prefers-reduced-motion media query
    if (typeof window !== 'undefined' && window.matchMedia) {
      return Promise.resolve(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    }
    return Promise.resolve(false);
  },
  isScreenReaderEnabled: () => Promise.resolve(false),
  isBoldTextEnabled: () => Promise.resolve(false),
  isGrayscaleEnabled: () => Promise.resolve(false),
  isInvertColorsEnabled: () => Promise.resolve(false),
  announceForAccessibility: (message: string) => {
    // Use ARIA live region for web accessibility announcements
    if (typeof document !== 'undefined') {
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;';
      announcement.textContent = message;
      document.body.appendChild(announcement);
      setTimeout(() => announcement.remove(), 1000);
    }
  },
  setAccessibilityFocus: () => {},
  addEventListener: (eventName: string, handler: Function) => {
    // Handle media query changes for reduceMotionChanged
    if (eventName === 'reduceMotionChanged' && typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const listener = (e: MediaQueryListEvent) => handler(e.matches);
      mediaQuery.addEventListener('change', listener);
      return {
        remove: () => mediaQuery.removeEventListener('change', listener),
      };
    }
    // Return a no-op subscription for other events
    return { remove: () => {} };
  },
};

// TurboModuleRegistry mock 추가
// react-native-svg의 fabric 모듈들이 사용하는 네이티브 모듈 레지스트리
export const TurboModuleRegistry = {
  get<T>(name: string): T | null {
    // 웹 환경에서는 네이티브 모듈이 없으므로 null 반환
    return null;
  },
  getEnforcing<T>(name: string): T {
    // getEnforcing은 모듈이 없으면 에러를 던지지만, 웹 환경에서는 mock 객체 반환
    // react-native-svg는 이 메서드를 사용하므로 빈 객체를 반환하여 에러 방지
    return {} as T;
  },
};

