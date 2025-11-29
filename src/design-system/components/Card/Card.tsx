/**
 * AugustDesignSystem - Card Component
 *
 * Content grouping container with header, content, and footer sections.
 * Supports elevated, outlined, and filled variants.
 *
 * @example
 * ```tsx
 * // Basic elevated card
 * <Card>
 *   <Text>Card content</Text>
 * </Card>
 *
 * // Outlined card with custom padding
 * <Card variant="outlined" padding="lg">
 *   <Text>Card content</Text>
 * </Card>
 *
 * // Card with header and footer
 * <Card
 *   header={<Card.Header title="Settings" subtitle="Manage preferences" />}
 *   footer={<Card.Footer><Button title="Save" /></Card.Footer>}
 * >
 *   <Text>Settings content</Text>
 * </Card>
 *
 * // Pressable card
 * <Card pressable onPress={handlePress}>
 *   <Text>Tap me</Text>
 * </Card>
 * ```
 */

import React, { useMemo, useCallback } from 'react';
import { View, Text, Pressable as RNPressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import {
  createCardStyles,
  getVariantStyles,
  getCardPadding,
  getCardBorderRadius,
} from './Card.styles';
import type { CardProps, CardHeaderProps, CardFooterProps } from './Card.types';

// Create animated pressable
const AnimatedPressable = Animated.createAnimatedComponent(RNPressable);

/**
 * Card component for content grouping.
 *
 * Features:
 * - Three visual variants (elevated, outlined, filled)
 * - Configurable padding and border radius
 * - Header and footer sections
 * - Pressable option with press animation
 * - Full accessibility support
 */
export function Card({
  // Content
  children,
  header,
  footer,

  // Appearance
  variant = 'elevated',
  padding = 'md',
  borderRadius = 'lg',
  backgroundColor: backgroundColorProp,
  borderColor: borderColorProp,

  // Interaction
  pressable = false,
  onPress,
  onLongPress,
  disabled = false,

  // Accessibility
  testID,
  accessibilityLabel,
  accessibilityHint,

  // Styling
  style,
  contentStyle,
  headerStyle,
  footerStyle,
}: CardProps): React.ReactElement {
  const { theme } = useTheme();

  // Base styles
  const baseStyles = useMemo(() => createCardStyles(theme), [theme]);

  // Variant styles
  const variantStyles = useMemo(
    () => getVariantStyles(variant, theme),
    [variant, theme]
  );

  // Padding value
  const paddingValue = useMemo(
    () => getCardPadding(padding, theme),
    [padding, theme]
  );

  // Border radius value
  const borderRadiusValue = useMemo(
    () => getCardBorderRadius(borderRadius, theme),
    [borderRadius, theme]
  );

  // Animation for press state
  const pressed = useSharedValue(0);

  // Handle press in
  const handlePressIn = useCallback(() => {
    if (pressable && !disabled) {
      pressed.value = withTiming(1, { duration: 100 });
    }
  }, [pressable, disabled, pressed]);

  // Handle press out
  const handlePressOut = useCallback(() => {
    pressed.value = withTiming(0, { duration: 150 });
  }, [pressed]);

  // Animated style for press effect
  const animatedStyle = useAnimatedStyle(() => {
    if (!pressable) return {};

    return {
      opacity: 1 - pressed.value * 0.1,
      transform: [{ scale: 1 - pressed.value * 0.02 }],
    };
  }, [pressable]);

  // Combined container style
  const containerStyle = useMemo(
    () => [
      baseStyles.container,
      variantStyles,
      { borderRadius: borderRadiusValue },
      backgroundColorProp && { backgroundColor: backgroundColorProp },
      borderColorProp && variant === 'outlined' && { borderColor: borderColorProp },
      disabled && baseStyles.disabled,
      style,
    ],
    [
      baseStyles,
      variantStyles,
      borderRadiusValue,
      backgroundColorProp,
      borderColorProp,
      variant,
      disabled,
      style,
    ]
  );

  // Content with padding
  const renderContent = () => (
    <View style={[baseStyles.content, { padding: paddingValue }, contentStyle]}>
      {children}
    </View>
  );

  // Accessibility props
  const accessibilityProps = useMemo(
    () => ({
      accessible: true,
      accessibilityRole: pressable ? ('button' as const) : undefined,
      accessibilityLabel,
      accessibilityHint,
      accessibilityState: pressable ? { disabled } : undefined,
    }),
    [pressable, accessibilityLabel, accessibilityHint, disabled]
  );

  // Render card content
  const cardContent = (
    <>
      {header && (
        <View
          style={[
            baseStyles.header,
            { padding: paddingValue },
            !!children && baseStyles.headerWithContent,
            headerStyle,
          ]}
        >
          {header}
        </View>
      )}

      {children && renderContent()}

      {footer && (
        <View
          style={[
            baseStyles.footer,
            { padding: paddingValue },
            footerStyle,
          ]}
        >
          {footer}
        </View>
      )}
    </>
  );

  // Render as pressable if needed
  if (pressable) {
    return (
      <AnimatedPressable
        testID={testID}
        onPress={disabled ? undefined : onPress}
        onLongPress={disabled ? undefined : onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[containerStyle, animatedStyle]}
        {...accessibilityProps}
      >
        {cardContent}
      </AnimatedPressable>
    );
  }

  // Render as static view
  return (
    <View testID={testID} style={containerStyle} {...accessibilityProps}>
      {cardContent}
    </View>
  );
}

/**
 * Card.Header - Header section for cards.
 */
function CardHeader({
  children,
  title,
  subtitle,
  left,
  right,
  style,
}: CardHeaderProps): React.ReactElement {
  const { theme } = useTheme();
  const baseStyles = useMemo(() => createCardStyles(theme), [theme]);

  // If children provided, render directly
  if (children) {
    return <View style={style}>{children}</View>;
  }

  // Render structured header
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
      {left && <View style={baseStyles.headerLeft}>{left}</View>}

      <View style={baseStyles.headerTextContainer}>
        {title && <Text style={baseStyles.headerTitle}>{title}</Text>}
        {subtitle && <Text style={baseStyles.headerSubtitle}>{subtitle}</Text>}
      </View>

      {right && <View style={baseStyles.headerRight}>{right}</View>}
    </View>
  );
}

/**
 * Card.Footer - Footer section for cards.
 */
function CardFooter({ children, style }: CardFooterProps): React.ReactElement {
  return <View style={style}>{children}</View>;
}

// Attach subcomponents
Card.Header = CardHeader;
Card.Footer = CardFooter;

// Set display names for debugging
Card.displayName = 'Card';
CardHeader.displayName = 'Card.Header';
CardFooter.displayName = 'Card.Footer';

export default Card;
