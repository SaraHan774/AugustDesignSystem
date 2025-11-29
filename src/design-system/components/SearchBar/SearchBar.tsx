/**
 * AugustDesignSystem - SearchBar Component
 *
 * An iOS-style search bar with animated cancel button, clear functionality,
 * and loading state support.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SearchBar
 *   value={query}
 *   onChangeText={setQuery}
 *   placeholder="Search conversations..."
 * />
 *
 * // With loading state
 * <SearchBar
 *   value={query}
 *   onChangeText={setQuery}
 *   loading={isSearching}
 * />
 *
 * // With callbacks
 * <SearchBar
 *   value={query}
 *   onChangeText={setQuery}
 *   onSubmit={handleSearch}
 *   onCancel={handleCancel}
 * />
 * ```
 */

import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
  Keyboard,
  type TextInput as TextInputType,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import { createSearchBarStyles } from './SearchBar.styles';
import type { SearchBarProps } from './SearchBar.types';

/**
 * iOS-style SearchBar component.
 *
 * Features:
 * - Animated cancel button on focus
 * - Clear button when has text
 * - Loading state with spinner
 * - Debounced onChange (optional)
 * - Full accessibility support
 */
export function SearchBar({
  // Value & Content
  value = '',
  placeholder = 'Search',

  // Events
  onChangeText,
  onSubmit,
  onFocus,
  onBlur,
  onClear,
  onCancel,

  // State
  loading = false,
  disabled = false,
  autoFocus = false,

  // Behavior
  showCancelButton = true,
  cancelButtonText = 'Cancel',
  debounceDelay = 0,
  returnKeyType = 'search',
  autoCapitalize = 'none',
  autoCorrect = true,

  // Accessibility
  testID,
  accessibilityLabel = 'Search',
  accessibilityHint,

  // Styling
  style,
  inputContainerStyle,
  inputStyle,
  cancelButtonStyle,
}: SearchBarProps): React.ReactElement {
  const { theme } = useTheme();
  const inputRef = useRef<TextInputType>(null);

  // Local state
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  // Animation value for cancel button
  const cancelButtonWidth = useSharedValue(0);
  const cancelButtonOpacity = useSharedValue(0);

  // Styles
  const baseStyles = useMemo(() => createSearchBarStyles(theme), [theme]);

  // Debounce timer ref
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync external value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Handle focus
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();

    if (showCancelButton) {
      cancelButtonWidth.value = withTiming(70, { duration: 200 });
      cancelButtonOpacity.value = withTiming(1, { duration: 200 });
    }
  }, [onFocus, showCancelButton, cancelButtonWidth, cancelButtonOpacity]);

  // Handle blur
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();

    // Only hide cancel button if there's no text
    if (showCancelButton && !localValue) {
      cancelButtonWidth.value = withTiming(0, { duration: 200 });
      cancelButtonOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [onBlur, showCancelButton, localValue, cancelButtonWidth, cancelButtonOpacity]);

  // Handle text change
  const handleChangeText = useCallback(
    (text: string) => {
      setLocalValue(text);

      if (debounceDelay > 0) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
          onChangeText?.(text);
        }, debounceDelay);
      } else {
        onChangeText?.(text);
      }
    },
    [onChangeText, debounceDelay]
  );

  // Handle submit
  const handleSubmit = useCallback(() => {
    onSubmit?.(localValue);
  }, [onSubmit, localValue]);

  // Handle clear
  const handleClear = useCallback(() => {
    setLocalValue('');
    onChangeText?.('');
    onClear?.();
    inputRef.current?.focus();
  }, [onChangeText, onClear]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    setLocalValue('');
    onChangeText?.('');
    onCancel?.();
    Keyboard.dismiss();

    cancelButtonWidth.value = withTiming(0, { duration: 200 });
    cancelButtonOpacity.value = withTiming(0, { duration: 200 });
  }, [onChangeText, onCancel, cancelButtonWidth, cancelButtonOpacity]);

  // Cancel button animated style
  const cancelButtonAnimatedStyle = useAnimatedStyle(() => ({
    width: cancelButtonWidth.value,
    opacity: cancelButtonOpacity.value,
    overflow: 'hidden' as const,
  }));

  // Show clear button when there's text
  const showClearButton = localValue.length > 0 && !loading;

  return (
    <View style={[baseStyles.container, style]} testID={testID}>
      <View
        style={[
          baseStyles.inputContainer,
          isFocused && baseStyles.inputContainerFocused,
          disabled && baseStyles.inputContainerDisabled,
          inputContainerStyle,
        ]}
      >
        {/* Search icon or loading spinner */}
        <View style={baseStyles.iconContainer}>
          {loading ? (
            <Spinner size="sm" color="secondary" />
          ) : (
            <Icon name="search" size="sm" color="secondary" />
          )}
        </View>

        {/* Input */}
        <TextInput
          ref={inputRef}
          style={[baseStyles.input, inputStyle]}
          value={localValue}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmit}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.label.tertiary}
          editable={!disabled}
          autoFocus={autoFocus}
          returnKeyType={returnKeyType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          clearButtonMode="never"
          accessible
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
          accessibilityRole="search"
          testID={testID ? `${testID}-input` : undefined}
        />

        {/* Clear button */}
        {showClearButton && (
          <Pressable
            style={baseStyles.clearButton}
            onPress={handleClear}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            testID={testID ? `${testID}-clear` : undefined}
          >
            <Icon name="close" size="sm" color="tertiary" />
          </Pressable>
        )}
      </View>

      {/* Cancel button */}
      {showCancelButton && (
        <Animated.View style={cancelButtonAnimatedStyle}>
          <Pressable
            style={baseStyles.cancelButton}
            onPress={handleCancel}
            accessibilityRole="button"
            accessibilityLabel="Cancel search"
            testID={testID ? `${testID}-cancel` : undefined}
          >
            <Text
              style={[baseStyles.cancelButtonText, cancelButtonStyle]}
              numberOfLines={1}
            >
              {cancelButtonText}
            </Text>
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
}

// Set display name for debugging
SearchBar.displayName = 'SearchBar';

export default SearchBar;
