/**
 * Comprehensive mock for React Native internal modules in Storybook/Web environment
 *
 * These modules are used by react-native-gesture-handler, react-native-svg and other RN libraries
 * but aren't available in react-native-web.
 */

// PressabilityDebug mock
export const isEnabled = () => false;
export const PressabilityDebugView = () => null;

// codegenNativeComponent mock
// react-native-safe-area-context 등이 default export로 직접 import하므로
// 함수로 export해야 합니다.
export function codegenNativeComponent<T = {}>(
  componentName: string,
  options?: { interfaceOnly?: boolean }
) {
  // 웹 환경에서는 네이티브 컴포넌트가 없으므로 빈 컴포넌트 반환
  return (() => null) as unknown as T;
}

// ReactNativeViewConfigRegistry mock
export const customBubblingEventTypes: Record<string, unknown> = {};
export const customDirectEventTypes: Record<string, unknown> = {};
export function register(name: string, callback: () => unknown) {
  return name;
}
export function get(name: string) {
  return {};
}

// TurboModuleRegistry mock for react-native-svg fabric modules
// react-native-svg의 fabric 모듈들이 TurboModuleRegistry를 사용하지만
// react-native-web에는 이 export가 없어서 mock이 필요합니다.
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

// Default export는 codegenNativeComponent 함수로 설정
// react-native-safe-area-context가 default import로 사용합니다:
// import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
export default codegenNativeComponent;
