/**
 * AugustDesignSystem - Header/NavigationBar Component
 *
 * iOS-style navigation bar with multiple variants and configurations.
 * Follows Apple Human Interface Guidelines for navigation bars.
 *
 * @example
 * ```tsx
 * // Standard header with title
 * <Header title="Messages" />
 *
 * // Header with back button
 * <Header
 *   title="Chat"
 *   showBackButton
 *   onBackPress={() => navigation.goBack()}
 * />
 *
 * // Header with actions
 * <Header
 *   title="Settings"
 *   rightActions={[
 *     { key: 'edit', label: 'Edit', onPress: handleEdit }
 *   ]}
 * />
 *
 * // Large title header
 * <Header variant="large" title="Inbox" />
 *
 * // Chat header variant
 * <Header
 *   variant="chat"
 *   title="John Doe"
 *   subtitle="Online"
 *   avatar={<Avatar name="John Doe" />}
 *   status="online"
 *   onChatPress={handleChatPress}
 * />
 *
 * // Search header variant
 * <Header
 *   variant="search"
 *   title="Search"
 *   searchValue={query}
 *   onSearchChange={setQuery}
 *   searchPlaceholder="Search messages..."
 * />
 * ```
 */

import React, { useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { Icon } from '../Icon';
import { SearchBar } from '../SearchBar';
import {
  createHeaderStyles,
  getBackgroundStyle,
  getHeaderHeight,
  getStatusColor,
} from './Header.styles';
import type { HeaderProps, HeaderAction } from './Header.types';

/**
 * Header/NavigationBar component.
 *
 * Features:
 * - Standard, large title, search, and chat variants
 * - Back button with optional label
 * - Left and right action buttons
 * - Safe area handling
 * - Background blur support (requires expo-blur)
 * - Full accessibility support
 */
export function Header({
  // Content
  variant = 'default',
  title,
  subtitle,
  titleElement,

  // Left Actions
  showBackButton = false,
  onBackPress,
  backIcon = 'back',
  backLabel,
  leftActions,
  leftElement,

  // Right Actions
  rightActions,
  rightElement,

  // Appearance
  background = 'solid',
  backgroundColor,
  showBorder = true,
  safeArea = true,

  // Search
  searchPlaceholder,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  searchLoading,

  // Chat
  avatar,
  status,
  onChatPress,

  // Accessibility
  testID,

  // Styling
  style,
  titleStyle,
  subtitleStyle,
}: HeaderProps): React.ReactElement {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Base styles
  const baseStyles = useMemo(() => createHeaderStyles(theme), [theme]);

  // Background style
  const bgStyle = useMemo(
    () => getBackgroundStyle(background, theme, backgroundColor),
    [background, theme, backgroundColor]
  );

  // Header height
  const headerHeight = useMemo(() => getHeaderHeight(variant), [variant]);

  // Render action button
  const renderAction = (action: HeaderAction) => (
    <Pressable
      key={action.key}
      style={[baseStyles.actionButton, action.disabled && baseStyles.actionDisabled]}
      onPress={action.onPress}
      disabled={action.disabled}
      accessibilityRole="button"
      accessibilityLabel={action.accessibilityLabel || action.label}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      {action.icon ? (
        <Icon
          name={action.icon}
          size="lg"
          color={action.color || theme.colors.interactive.tint}
        />
      ) : action.label ? (
        <Text
          style={[
            baseStyles.actionLabel,
            action.color && { color: action.color },
          ]}
        >
          {action.label}
        </Text>
      ) : null}
    </Pressable>
  );

  // Render back button
  const renderBackButton = () => {
    if (!showBackButton) return null;

    return (
      <Pressable
        style={baseStyles.backButtonContainer}
        onPress={onBackPress}
        accessibilityRole="button"
        accessibilityLabel={backLabel || 'Go back'}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Icon name={backIcon} size="lg" color={theme.colors.interactive.tint} />
        {backLabel && (
          <Text style={baseStyles.backLabel}>{backLabel}</Text>
        )}
      </Pressable>
    );
  };

  // Render left section
  const renderLeft = () => {
    if (leftElement) return <View style={baseStyles.leftSection}>{leftElement}</View>;

    return (
      <View style={baseStyles.leftSection}>
        {renderBackButton()}
        {leftActions?.map(renderAction)}
      </View>
    );
  };

  // Render right section
  const renderRight = () => {
    if (rightElement) return <View style={baseStyles.rightSection}>{rightElement}</View>;

    return (
      <View style={baseStyles.rightSection}>
        {rightActions?.map(renderAction)}
      </View>
    );
  };

  // Render title for default variant
  const renderDefaultTitle = () => {
    if (titleElement) return titleElement;

    return (
      <View style={baseStyles.centerSection}>
        {title && (
          <Text style={[baseStyles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text style={[baseStyles.subtitle, subtitleStyle]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
    );
  };

  // Render chat variant content
  const renderChatContent = () => (
    <Pressable
      style={baseStyles.chatContent}
      onPress={onChatPress}
      disabled={!onChatPress}
      accessibilityRole={onChatPress ? 'button' : undefined}
    >
      {avatar && <View style={baseStyles.chatAvatar}>{avatar}</View>}

      <View style={baseStyles.chatInfo}>
        {title && (
          <Text style={[baseStyles.chatName, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}
        {(subtitle || status) && (
          <View style={baseStyles.statusRow}>
            {status && (
              <View
                style={[
                  baseStyles.statusDot,
                  { backgroundColor: getStatusColor(status, theme) },
                ]}
              />
            )}
            <Text style={[baseStyles.chatStatus, subtitleStyle]} numberOfLines={1}>
              {subtitle || status}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );

  // Render large title row
  const renderLargeTitle = () => (
    <View style={baseStyles.largeContainer}>
      <Text style={[baseStyles.largeTitle, titleStyle]}>{title}</Text>
    </View>
  );

  // Render search bar
  const renderSearchBar = () => (
    <View style={baseStyles.searchContainer}>
      <SearchBar
        value={searchValue || ''}
        onChangeText={onSearchChange || (() => {})}
        placeholder={searchPlaceholder}
        onSubmit={onSearchSubmit ? () => onSearchSubmit() : undefined}
        loading={searchLoading}
      />
    </View>
  );

  // Determine if border should be shown
  const shouldShowBorder = showBorder && background !== 'transparent';

  return (
    <View
      style={[
        baseStyles.wrapper,
        bgStyle,
        safeArea && { paddingTop: insets.top },
        shouldShowBorder && baseStyles.border,
        style,
      ]}
      testID={testID}
      accessible
      accessibilityRole="header"
    >
      {/* Main row */}
      <View style={baseStyles.container}>
        {renderLeft()}

        {variant === 'chat' ? renderChatContent() : renderDefaultTitle()}

        {renderRight()}
      </View>

      {/* Large title row */}
      {variant === 'large' && renderLargeTitle()}

      {/* Search bar row */}
      {variant === 'search' && renderSearchBar()}
    </View>
  );
}

// Set display name for debugging
Header.displayName = 'Header';

export default Header;
