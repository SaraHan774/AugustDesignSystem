/**
 * AugustDesignSystem - Sheet (Bottom Sheet) Component
 *
 * Modal surface sliding up from the bottom with gesture support.
 * Follows iOS Human Interface Guidelines for bottom sheets.
 *
 * @example
 * ```tsx
 * // Basic sheet
 * <Sheet visible={showSheet} onClose={() => setShowSheet(false)}>
 *   <Text>Sheet content</Text>
 * </Sheet>
 *
 * // Sheet with snap points
 * <Sheet
 *   visible={showSheet}
 *   onClose={() => setShowSheet(false)}
 *   snapPoints={{ collapsed: 0.25, half: 0.5, expanded: 0.9 }}
 *   initialSnapPoint="half"
 * >
 *   <ScrollView>
 *     <Text>Scrollable content</Text>
 *   </ScrollView>
 * </Sheet>
 *
 * // Sheet with header and footer
 * <Sheet
 *   visible={showSheet}
 *   onClose={() => setShowSheet(false)}
 *   header={<Text>Header</Text>}
 *   footer={<Button title="Done" onPress={handleDone} />}
 * >
 *   <Text>Content</Text>
 * </Sheet>
 * ```
 */

import React, { useEffect, useMemo, useCallback } from 'react';
import { View, Pressable, ScrollView, Dimensions, BackHandler, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import {
  createSheetStyles,
  getSheetHeight,
  shouldDismiss,
  SHEET_DEFAULTS,
} from './Sheet.styles';
import type { SheetProps, SheetSnapPoint } from './Sheet.types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Animation configuration
const SPRING_CONFIG = {
  damping: 20,
  stiffness: 200,
};

/**
 * Sheet (Bottom Sheet) component.
 *
 * Features:
 * - Gesture-driven dismiss (swipe down)
 * - Multiple snap points
 * - Backdrop tap to dismiss
 * - Header and footer sections
 * - Scrollable content
 * - Safe area handling
 * - Hardware back button support (Android)
 */
export function Sheet({
  // Visibility
  visible,
  onClose,

  // Content
  children,
  header,
  footer,

  // Snap Points
  snapPoints: snapPointsProp,
  initialSnapPoint = 'half',
  onSnapPointChange,

  // Appearance
  showHandle = true,
  backgroundColor,
  backdropOpacity = SHEET_DEFAULTS.backdropOpacity,
  borderRadius = SHEET_DEFAULTS.borderRadius,

  // Behavior
  dismissOnSwipe = true,
  dismissOnBackdrop = true,
  safeArea = true,
  scrollable = true,

  // Accessibility
  testID,
  accessibilityLabel,

  // Styling
  style,
  contentStyle,
  headerStyle,
  footerStyle,
}: SheetProps): React.ReactElement | null {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Base styles
  const baseStyles = useMemo(() => createSheetStyles(theme), [theme]);

  // Snap points configuration
  const snapPoints = useMemo(
    () => ({
      ...SHEET_DEFAULTS.snapPoints,
      ...snapPointsProp,
    }),
    [snapPointsProp]
  );

  // Get initial snap point value
  const getSnapPointValue = useCallback(
    (point: SheetSnapPoint): number => {
      if (typeof point === 'number') return point;
      return snapPoints[point] || snapPoints.half;
    },
    [snapPoints]
  );

  // Animation values
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropAnim = useSharedValue(0);
  const isRendered = useSharedValue(visible);
  const currentSnapPoint = useSharedValue(getSnapPointValue(initialSnapPoint));
  const startY = useSharedValue(0);

  // Current sheet height based on snap point
  const sheetHeight = useMemo(
    () => getSheetHeight(getSnapPointValue(initialSnapPoint)),
    [initialSnapPoint, getSnapPointValue]
  );

  // Handle close
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Animate to snap point
  const animateToSnapPoint = useCallback(
    (point: number) => {
      const height = getSheetHeight(point);
      translateY.value = withSpring(SCREEN_HEIGHT - height, SPRING_CONFIG);
      currentSnapPoint.value = point;

      // Notify snap point change
      if (onSnapPointChange) {
        // Find matching named snap point
        let snapPointName: SheetSnapPoint = point;
        if (point === snapPoints.collapsed) snapPointName = 'collapsed';
        else if (point === snapPoints.half) snapPointName = 'half';
        else if (point === snapPoints.expanded) snapPointName = 'expanded';

        onSnapPointChange(snapPointName);
      }
    },
    [translateY, currentSnapPoint, snapPoints, onSnapPointChange]
  );

  // Update animations when visibility changes
  useEffect(() => {
    if (visible) {
      isRendered.value = true;
      backdropAnim.value = withTiming(1, { duration: 200 });
      const height = getSheetHeight(getSnapPointValue(initialSnapPoint));
      translateY.value = withSpring(SCREEN_HEIGHT - height, SPRING_CONFIG);
    } else {
      backdropAnim.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: 200 }, () => {
        isRendered.value = false;
      });
    }
  }, [visible, backdropAnim, translateY, initialSnapPoint, getSnapPointValue, isRendered]);

  // Handle hardware back button (Android)
  useEffect(() => {
    if (!visible || Platform.OS !== 'android') return;

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleClose();
      return true;
    });

    return () => backHandler.remove();
  }, [visible, handleClose]);

  // Pan gesture using Gesture API
  const panGesture = Gesture.Pan()
    .onStart(() => {
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      const newY = startY.value + event.translationY;
      // Allow dragging down but limit dragging up
      const minY = SCREEN_HEIGHT - getSheetHeight(snapPoints.expanded);
      translateY.value = Math.max(minY, newY);
    })
    .onEnd((event) => {
      const currentHeight = SCREEN_HEIGHT - translateY.value;

      if (dismissOnSwipe && shouldDismiss(translateY.value - (SCREEN_HEIGHT - sheetHeight), event.velocityY, sheetHeight)) {
        // Dismiss
        translateY.value = withTiming(SCREEN_HEIGHT, { duration: 200 });
        backdropAnim.value = withTiming(0, { duration: 200 });
        runOnJS(handleClose)();
      } else {
        // Snap to closest point
        const snapPointValues = Object.values(snapPoints).sort((a, b) => a - b);
        let closestPoint = snapPointValues[0];
        let minDiff = Math.abs(currentHeight / SCREEN_HEIGHT - closestPoint);

        for (const point of snapPointValues) {
          const diff = Math.abs(currentHeight / SCREEN_HEIGHT - point);
          if (diff < minDiff) {
            minDiff = diff;
            closestPoint = point;
          }
        }

        runOnJS(animateToSnapPoint)(closestPoint);
      }
    });

  // Animated backdrop style
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropAnim.value * backdropOpacity,
  }));

  // Animated sheet style
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Handle backdrop press
  const handleBackdropPress = useCallback(() => {
    if (dismissOnBackdrop) {
      handleClose();
    }
  }, [dismissOnBackdrop, handleClose]);

  // Don't render if not visible
  if (!visible && !isRendered.value) {
    return null;
  }

  // Content wrapper based on scrollable prop
  const ContentWrapper = scrollable ? ScrollView : View;
  const contentWrapperProps = scrollable
    ? {
        contentContainerStyle: baseStyles.scrollContent,
        showsVerticalScrollIndicator: false,
        bounces: true,
      }
    : {};

  return (
    <View style={baseStyles.overlay} pointerEvents={visible ? 'auto' : 'none'}>
      {/* Backdrop */}
      <Animated.View style={[baseStyles.backdrop, backdropStyle]}>
        <Pressable
          style={{ flex: 1 }}
          onPress={handleBackdropPress}
          accessibilityRole="button"
          accessibilityLabel="Close sheet"
        />
      </Animated.View>

      {/* Sheet */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            baseStyles.container,
            {
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
              backgroundColor: backgroundColor || theme.colors.background.primary,
              paddingBottom: safeArea ? insets.bottom : 0,
            },
            sheetStyle,
            style,
          ]}
          testID={testID}
          accessible
          accessibilityRole="none"
          accessibilityLabel={accessibilityLabel || 'Bottom sheet'}
          accessibilityViewIsModal
        >
          {/* Handle */}
          {showHandle && (
            <View style={baseStyles.handle}>
              <View style={baseStyles.handleBar} />
            </View>
          )}

          {/* Header */}
          {header && (
            <View style={[baseStyles.header, headerStyle]}>{header}</View>
          )}

          {/* Content */}
          <ContentWrapper style={[baseStyles.content, contentStyle]} {...contentWrapperProps}>
            {children}
          </ContentWrapper>

          {/* Footer */}
          {footer && (
            <View style={[baseStyles.footer, footerStyle]}>{footer}</View>
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

// Set display name for debugging
Sheet.displayName = 'Sheet';

export default Sheet;
