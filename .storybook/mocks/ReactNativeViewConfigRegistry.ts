/**
 * Mock for ReactNativeViewConfigRegistry in Storybook/Web environment
 */

export const customBubblingEventTypes: Record<string, unknown> = {};
export const customDirectEventTypes: Record<string, unknown> = {};

export function register(name: string, callback: () => unknown) {
  return name;
}

export function get(name: string) {
  return {};
}

export default {
  customBubblingEventTypes,
  customDirectEventTypes,
  register,
  get,
};
