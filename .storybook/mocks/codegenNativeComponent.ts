/**
 * Mock for codegenNativeComponent in Storybook/Web environment
 * 
 * react-native-safe-area-context 등이 이 함수를 사용하여 네이티브 컴포넌트를 생성합니다.
 * 웹 환경에서는 네이티브 컴포넌트가 없으므로 빈 컴포넌트를 반환합니다.
 */

// codegenNativeComponent는 제네릭 타입과 옵션을 받을 수 있습니다
export default function codegenNativeComponent<T = {}>(
  componentName: string,
  options?: { interfaceOnly?: boolean }
) {
  // 웹 환경에서는 네이티브 컴포넌트가 없으므로 빈 컴포넌트 반환
  // react-native-safe-area-context가 이 함수의 반환값을 default export로 사용하므로
  // 컴포넌트 형태로 반환해야 합니다.
  return (() => null) as unknown as T;
}
