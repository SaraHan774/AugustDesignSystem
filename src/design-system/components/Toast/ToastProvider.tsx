/**
 * AugustDesignSystem - Toast Provider
 *
 * Context provider for managing toasts with an imperative API.
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from './Toast';
import type {
  ToastContextValue,
  ToastProviderProps,
  ToastConfig,
  ToastState,
} from './Toast.types';

// Create context
const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Generate unique ID for toasts.
 */
function generateId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * ToastProvider component for managing toast notifications.
 *
 * @example
 * ```tsx
 * // Wrap your app
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 *
 * // Use in components
 * function MyComponent() {
 *   const toast = useToast();
 *
 *   const handleSuccess = () => {
 *     toast.show({
 *       message: 'Operation successful!',
 *       variant: 'success',
 *     });
 *   };
 *
 *   return <Button onPress={handleSuccess} title="Do Something" />;
 * }
 * ```
 */
export function ToastProvider({
  children,
  defaultPosition = 'bottom',
  defaultDuration = 4000,
  maxToasts = 3,
  offset = { top: 50, bottom: 50 },
}: ToastProviderProps): React.ReactElement {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const insets = useSafeAreaInsets();
  const toastIdRef = useRef(0);

  // Show a toast
  const show = useCallback(
    (config: ToastConfig): string => {
      const id = config.id || generateId();

      const newToast: ToastState = {
        ...config,
        id,
        visible: true,
        position: config.position || defaultPosition,
        duration: config.duration ?? defaultDuration,
      };

      setToasts((prev) => {
        // Remove oldest if at max
        const updated = prev.length >= maxToasts ? prev.slice(1) : prev;
        return [...updated, newToast];
      });

      return id;
    },
    [defaultPosition, defaultDuration, maxToasts]
  );

  // Hide a specific toast
  const hide = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, visible: false } : toast
      )
    );

    // Remove from list after animation
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 300);
  }, []);

  // Hide all toasts
  const hideAll = useCallback(() => {
    setToasts((prev) => prev.map((toast) => ({ ...toast, visible: false })));

    // Clear list after animation
    setTimeout(() => {
      setToasts([]);
    }, 300);
  }, []);

  // Update a toast
  const update = useCallback((id: string, config: Partial<ToastConfig>) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, ...config } : toast
      )
    );
  }, []);

  // Context value
  const contextValue = useMemo<ToastContextValue>(
    () => ({
      show,
      hide,
      hideAll,
      update,
    }),
    [show, hide, hideAll, update]
  );

  // Separate toasts by position
  const topToasts = toasts.filter((t) => t.position === 'top');
  const bottomToasts = toasts.filter((t) => t.position === 'bottom');

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* Top toasts container */}
      {topToasts.length > 0 && (
        <View
          style={[
            styles.container,
            styles.containerTop,
            { top: insets.top + (offset.top || 0) },
          ]}
          pointerEvents="box-none"
        >
          {topToasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              onHide={() => hide(toast.id)}
              testID={`toast-${toast.id}`}
            />
          ))}
        </View>
      )}

      {/* Bottom toasts container */}
      {bottomToasts.length > 0 && (
        <View
          style={[
            styles.container,
            styles.containerBottom,
            { bottom: insets.bottom + (offset.bottom || 0) },
          ]}
          pointerEvents="box-none"
        >
          {bottomToasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              onHide={() => hide(toast.id)}
              testID={`toast-${toast.id}`}
            />
          ))}
        </View>
      )}
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  containerTop: {
    top: 0,
  },
  containerBottom: {
    bottom: 0,
  },
});

/**
 * Hook to access toast API.
 *
 * @example
 * ```tsx
 * const { show, hide, hideAll } = useToast();
 *
 * // Show a toast
 * const id = show({ message: 'Hello!', variant: 'success' });
 *
 * // Hide specific toast
 * hide(id);
 *
 * // Hide all toasts
 * hideAll();
 * ```
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

// Set display name for debugging
ToastProvider.displayName = 'ToastProvider';
