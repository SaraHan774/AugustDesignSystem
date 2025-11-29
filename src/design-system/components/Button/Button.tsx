/**
 * AugustDesignSystem - Button Component
 *
 * A versatile button component following Apple Human Interface Guidelines.
 * Supports multiple variants, sizes, and states with proper accessibility.
 *
 * @example
 * ```tsx
 * // Primary filled button (default)
 * <Button title="Continue" onPress={handlePress} />
 *
 * // Destructive action
 * <Button
 *   title="Delete"
 *   variant="filled"
 *   colorScheme="destructive"
 *   onPress={handleDelete}
 * />
 *
 * // Outlined secondary button
 * <Button
 *   title="Cancel"
 *   variant="outlined"
 *   colorScheme="neutral"
 *   onPress={handleCancel}
 * />
 *
 * // With loading state
 * <Button
 *   title="Save"
 *   loading={isSaving}
 *   loadingText="Saving..."
 *   onPress={handleSave}
 * />
 *
 * // With icons
 * <Button
 *   title="Add to Cart"
 *   leftIcon={<CartIcon />}
 *   onPress={handleAddToCart}
 * />
 * ```
 */

import React, { useCallback, useMemo } from 'react';
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  type PressableStateCallbackType,
} from 'react-native';
import { useTheme } from '@theme';
import type { ButtonProps } from './Button.types';
import {
  createButtonStyles,
  getDynamicButtonStyles,
  getButtonShadow,
  getIconSize,
  getIconGap,
  getButtonHeight,
} from './Button.styles';

/**
 * Button component following Apple HIG design patterns.
 *
 * Features:
 * - Five visual variants (filled, tinted, gray, outlined, ghost)
 * - Three sizes (sm, md, lg) - all meeting touch target guidelines
 * - Four color schemes (primary, destructive, success, neutral)
 * - Loading state with customizable indicator position
 * - Left and right icon support
 * - Full accessibility support
 * - Haptic feedback (when available)
 */
export function Button({
  // Content
  title,
  children,

  // Visual style
  variant = 'filled',
  size = 'md',
  colorScheme = 'primary',
  fullWidth = false,

  // Icons
  leftIcon,
  rightIcon,
  iconOnly = false,

  // State
  disabled = false,
  loading = false,
  loadingPosition = 'center',
  loadingText,

  // Events
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  delayLongPress = 500,

  // Haptics
  hapticFeedback = 'light',

  // Accessibility
  testID,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  accessibilityState,

  // Styling
  style,
  textStyle,
  pressedStyle,
  disabledStyle,
}: ButtonProps): React.ReactElement {
  const { theme } = useTheme();

  // Create base styles
  const baseStyles = useMemo(() => createButtonStyles(theme), [theme]);

  // Determine if button is interactive
  const isInteractive = !disabled && !loading;

  // Get accessibility state
  const computedAccessibilityState = useMemo(() => ({
    disabled: !isInteractive,
    busy: loading,
    ...accessibilityState,
  }), [isInteractive, loading, accessibilityState]);

  // Get accessibility label
  const computedAccessibilityLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    if (loading && loadingText) return loadingText;
    if (title) return title;
    return undefined;
  }, [accessibilityLabel, loading, loadingText, title]);

  // Handle press with haptic feedback
  const handlePress = useCallback(
    (event: any) => {
      if (!isInteractive) return;

      // Trigger haptic feedback (platform-specific implementation would go here)
      // For now, this is a placeholder for haptic feedback integration
      if (hapticFeedback !== 'none') {
        // TODO: Integrate with react-native-haptic-feedback or expo-haptics
      }

      onPress?.(event);
    },
    [isInteractive, hapticFeedback, onPress]
  );

  // Icon size and gap
  const iconSize = getIconSize(size, theme);
  const iconGap = getIconGap(size, theme);

  // Render loading indicator
  const renderLoadingIndicator = useCallback(
    (color: string) => (
      <ActivityIndicator
        size={size === 'sm' ? 'small' : 'small'}
        color={color}
        testID={testID ? `${testID}-loading` : undefined}
      />
    ),
    [size, testID]
  );

  // Render button content
  const renderContent = useCallback(
    (pressed: boolean) => {
      const dynamicStyles = getDynamicButtonStyles(
        variant,
        size,
        colorScheme,
        pressed,
        theme
      );

      const textColor = dynamicStyles.text.color as string;
      const showLoadingInCenter = loading && loadingPosition === 'center' && !loadingText;

      return (
        <View
          style={[
            baseStyles.content,
            { gap: iconGap },
            showLoadingInCenter && baseStyles.hiddenContent,
          ]}
        >
          {/* Left icon or left loading indicator */}
          {loading && loadingPosition === 'left' ? (
            renderLoadingIndicator(textColor)
          ) : leftIcon ? (
            <View style={{ width: iconSize, height: iconSize }}>
              {leftIcon}
            </View>
          ) : null}

          {/* Text content */}
          {!iconOnly && (children || title) && (
            <Text
              style={[
                baseStyles.text,
                dynamicStyles.text,
                textStyle,
              ]}
              numberOfLines={1}
            >
              {loading && loadingText ? loadingText : (children || title)}
            </Text>
          )}

          {/* Right icon or right loading indicator */}
          {loading && loadingPosition === 'right' ? (
            renderLoadingIndicator(textColor)
          ) : rightIcon ? (
            <View style={{ width: iconSize, height: iconSize }}>
              {rightIcon}
            </View>
          ) : null}
        </View>
      );
    },
    [
      variant,
      size,
      colorScheme,
      theme,
      loading,
      loadingPosition,
      loadingText,
      leftIcon,
      rightIcon,
      iconOnly,
      children,
      title,
      iconSize,
      iconGap,
      baseStyles,
      textStyle,
      renderLoadingIndicator,
    ]
  );

  // Render center loading indicator (overlay)
  const renderCenterLoading = useCallback(
    (textColor: string) => {
      if (!loading || loadingPosition !== 'center' || loadingText) {
        return null;
      }

      return (
        <View style={[baseStyles.loadingContainer, { height: getButtonHeight(size, theme) }]}>
          {renderLoadingIndicator(textColor)}
        </View>
      );
    },
    [loading, loadingPosition, loadingText, size, theme, baseStyles, renderLoadingIndicator]
  );

  // Pressable style function
  const getPressableStyle = useCallback(
    ({ pressed }: PressableStateCallbackType) => {
      const dynamicStyles = getDynamicButtonStyles(
        variant,
        size,
        colorScheme,
        pressed,
        theme
      );

      const shadow = getButtonShadow(variant, pressed, theme);

      return [
        baseStyles.container,
        dynamicStyles.container,
        shadow,
        fullWidth && baseStyles.fullWidth,
        iconOnly && baseStyles.iconOnly,
        disabled && baseStyles.disabled,
        disabled && disabledStyle,
        loading && baseStyles.loading,
        pressed && pressedStyle,
        style,
      ];
    },
    [
      variant,
      size,
      colorScheme,
      theme,
      baseStyles,
      fullWidth,
      iconOnly,
      disabled,
      disabledStyle,
      loading,
      pressedStyle,
      style,
    ]
  );

  return (
    <Pressable
      testID={testID}
      onPress={handlePress}
      onLongPress={isInteractive ? onLongPress : undefined}
      onPressIn={isInteractive ? onPressIn : undefined}
      onPressOut={isInteractive ? onPressOut : undefined}
      delayLongPress={delayLongPress}
      disabled={!isInteractive}
      accessibilityLabel={computedAccessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={computedAccessibilityState}
      style={getPressableStyle}
    >
      {({ pressed }) => {
        const dynamicStyles = getDynamicButtonStyles(
          variant,
          size,
          colorScheme,
          pressed,
          theme
        );
        const textColor = dynamicStyles.text.color as string;

        return (
          <>
            {renderContent(pressed)}
            {renderCenterLoading(textColor)}
          </>
        );
      }}
    </Pressable>
  );
}

// Set display name for debugging
Button.displayName = 'Button';
