/**
 * AugustDesignSystem - EmptyState Component
 *
 * A component for displaying placeholder content when lists or views have no data.
 * Follows iOS HIG and Material Design 3 empty state patterns.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <EmptyState
 *   title="No Messages"
 *   description="Start a conversation to see messages here."
 *   icon="message"
 * />
 *
 * // With action
 * <EmptyState
 *   title="No Results"
 *   description="Try adjusting your search terms."
 *   icon="search"
 *   action={{
 *     label: "Clear Search",
 *     onPress: handleClear,
 *   }}
 * />
 *
 * // With illustration
 * <EmptyState
 *   title="Welcome!"
 *   description="Get started by creating your first project."
 *   illustration={<WelcomeIllustration />}
 *   action={{
 *     label: "Create Project",
 *     onPress: handleCreate,
 *   }}
 * />
 * ```
 */

import React, { useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '../../theme';
import { Icon } from '../Icon';
import { createEmptyStateStyles, getSizeStyles } from './EmptyState.styles';
import type { EmptyStateProps, EmptyStateAction } from './EmptyState.types';

/**
 * EmptyState component for displaying placeholder content.
 */
export function EmptyState({
  // Content
  title,
  description,
  icon,
  customIcon,
  illustration,

  // Actions
  action,
  secondaryAction,

  // Appearance
  size = 'md',
  layout = 'vertical',
  fillContainer = true,

  // Accessibility
  testID,
  accessibilityLabel,

  // Styling
  style,
  titleStyle,
  descriptionStyle,
  iconContainerStyle,
  actionsStyle,
}: EmptyStateProps): React.ReactElement {
  const { theme } = useTheme();

  // Styles
  const styles = useMemo(
    () => createEmptyStateStyles(theme, size, layout, fillContainer),
    [theme, size, layout, fillContainer]
  );

  const sizeStyles = useMemo(() => getSizeStyles(size, theme), [size, theme]);

  // Map icon sizes to our Icon component sizes
  const iconSizeMap: Record<number, 'sm' | 'md' | 'lg' | 'xl'> = {
    32: 'md',
    48: 'lg',
    64: 'xl',
  };

  // Render icon/illustration
  const renderVisual = () => {
    if (illustration) {
      return (
        <View style={styles.illustrationContainer}>{illustration}</View>
      );
    }

    if (customIcon) {
      return (
        <View style={[styles.iconContainer, iconContainerStyle]}>
          {customIcon}
        </View>
      );
    }

    if (icon) {
      return (
        <View style={[styles.iconContainer, iconContainerStyle]}>
          <Icon
            name={icon}
            size={iconSizeMap[sizeStyles.iconSize] || 'lg'}
            color="secondary"
          />
        </View>
      );
    }

    return null;
  };

  // Render action button
  const renderAction = (actionConfig: EmptyStateAction, isPrimary: boolean) => {
    const variant = actionConfig.variant || (isPrimary ? 'primary' : 'secondary');

    const buttonStyles = {
      primary: styles.primaryButton,
      secondary: styles.secondaryButton,
      tertiary: styles.tertiaryButton,
    };

    const textStyles = {
      primary: styles.primaryButtonText,
      secondary: styles.secondaryButtonText,
      tertiary: styles.tertiaryButtonText,
    };

    return (
      <Pressable
        key={actionConfig.label}
        style={buttonStyles[variant]}
        onPress={actionConfig.onPress}
        accessibilityRole="button"
        accessibilityLabel={actionConfig.label}
        testID={testID ? `${testID}-${isPrimary ? 'action' : 'secondary-action'}` : undefined}
      >
        <Text style={textStyles[variant]}>{actionConfig.label}</Text>
      </Pressable>
    );
  };

  const hasActions = action || secondaryAction;

  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      accessible
      accessibilityRole="none"
      accessibilityLabel={accessibilityLabel || `${title}. ${description || ''}`}
    >
      <View style={styles.contentWrapper}>
        {renderVisual()}

        <View style={styles.textContainer}>
          <Text
            style={[styles.title, titleStyle]}
            accessibilityRole="header"
          >
            {title}
          </Text>

          {description && (
            <Text style={[styles.description, descriptionStyle]}>
              {description}
            </Text>
          )}
        </View>
      </View>

      {hasActions && (
        <View style={[styles.actionsContainer, actionsStyle]}>
          {action && renderAction(action, true)}
          {secondaryAction && renderAction(secondaryAction, false)}
        </View>
      )}
    </View>
  );
}

// Set display name for debugging
EmptyState.displayName = 'EmptyState';

export default EmptyState;
