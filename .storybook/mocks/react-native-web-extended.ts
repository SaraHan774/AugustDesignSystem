/**
 * react-native-web 확장 모듈
 * 
 * react-native-web에는 없는 TurboModuleRegistry를 추가하여
 * react-native-svg의 fabric 모듈들이 웹 환경에서도 동작하도록 합니다.
 */

// react-native-web의 모든 export를 re-export
export * from 'react-native-web';

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

