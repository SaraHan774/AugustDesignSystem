/**
 * AugustDesignSystem - Component Type Definitions
 *
 * Shared type definitions for component props and behaviors.
 */

import type { ReactNode } from 'react';
import type {
  ViewStyle,
  TextStyle,
  ImageStyle,
  AccessibilityRole,
  AccessibilityState,
  GestureResponderEvent,
  LayoutChangeEvent,
} from 'react-native';

// =============================================================================
// BASE COMPONENT PROPS
// =============================================================================

/**
 * Base props shared by all components.
 */
export interface BaseComponentProps {
  /**
   * Test ID for testing frameworks.
   */
  readonly testID?: string;

  /**
   * Accessibility label for screen readers.
   */
  readonly accessibilityLabel?: string;

  /**
   * Accessibility hint providing additional context.
   */
  readonly accessibilityHint?: string;

  /**
   * Accessibility role defining the component's purpose.
   */
  readonly accessibilityRole?: AccessibilityRole;

  /**
   * Accessibility state for interactive elements.
   */
  readonly accessibilityState?: AccessibilityState;

  /**
   * Whether to show component.
   * @default true
   */
  readonly visible?: boolean;
}

/**
 * Props for components that accept children.
 */
export interface ContainerProps extends BaseComponentProps {
  readonly children?: ReactNode;
}

/**
 * Props for components with custom styling.
 */
export interface StylableProps {
  /**
   * Custom style overrides.
   */
  readonly style?: ViewStyle | ViewStyle[];
}

/**
 * Combined base props for stylable containers.
 */
export interface StylableContainerProps extends ContainerProps, StylableProps {}

// =============================================================================
// INTERACTIVE COMPONENT PROPS
// =============================================================================

/**
 * Interactive states for pressable components.
 */
export interface InteractiveState {
  readonly pressed: boolean;
  readonly hovered: boolean;
  readonly focused: boolean;
}

/**
 * Props for pressable/interactive components.
 */
export interface PressableProps extends BaseComponentProps {
  /**
   * Handler for press events.
   */
  readonly onPress?: (event: GestureResponderEvent) => void;

  /**
   * Handler for long press events.
   */
  readonly onLongPress?: (event: GestureResponderEvent) => void;

  /**
   * Handler for press in events.
   */
  readonly onPressIn?: (event: GestureResponderEvent) => void;

  /**
   * Handler for press out events.
   */
  readonly onPressOut?: (event: GestureResponderEvent) => void;

  /**
   * Whether the component is disabled.
   * @default false
   */
  readonly disabled?: boolean;

  /**
   * Delay before onLongPress is triggered in milliseconds.
   * @default 500
   */
  readonly delayLongPress?: number;

  /**
   * Haptic feedback type on press.
   */
  readonly hapticFeedback?: 'light' | 'medium' | 'heavy' | 'selection' | 'none';
}

// =============================================================================
// LAYOUT PROPS
// =============================================================================

/**
 * Spacing shorthand props.
 */
export interface SpacingProps {
  readonly margin?: number | string;
  readonly marginTop?: number | string;
  readonly marginRight?: number | string;
  readonly marginBottom?: number | string;
  readonly marginLeft?: number | string;
  readonly marginHorizontal?: number | string;
  readonly marginVertical?: number | string;

  readonly padding?: number | string;
  readonly paddingTop?: number | string;
  readonly paddingRight?: number | string;
  readonly paddingBottom?: number | string;
  readonly paddingLeft?: number | string;
  readonly paddingHorizontal?: number | string;
  readonly paddingVertical?: number | string;
}

/**
 * Flexbox layout props.
 */
export interface FlexProps {
  readonly flex?: number;
  readonly flexGrow?: number;
  readonly flexShrink?: number;
  readonly flexBasis?: number | string;
  readonly flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  readonly flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  readonly alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  readonly alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  readonly alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around';
  readonly justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
}

/**
 * Combined layout props.
 */
export interface LayoutProps extends SpacingProps, FlexProps {
  readonly width?: number | string;
  readonly height?: number | string;
  readonly minWidth?: number | string;
  readonly maxWidth?: number | string;
  readonly minHeight?: number | string;
  readonly maxHeight?: number | string;
  readonly aspectRatio?: number;
  readonly position?: 'relative' | 'absolute';
  readonly top?: number | string;
  readonly right?: number | string;
  readonly bottom?: number | string;
  readonly left?: number | string;
  readonly zIndex?: number;
}

// =============================================================================
// TYPOGRAPHY COMPONENT PROPS
// =============================================================================

/**
 * Text variant based on typography scale.
 */
export type TextVariant =
  | 'largeTitle'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'headline'
  | 'subheadline'
  | 'body'
  | 'callout'
  | 'footnote'
  | 'caption1'
  | 'caption2';

/**
 * Text alignment options.
 */
export type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';

/**
 * Typography-specific props.
 */
export interface TypographyProps extends BaseComponentProps {
  /**
   * Text variant from the typography scale.
   * @default 'body'
   */
  readonly variant?: TextVariant;

  /**
   * Text color - can be semantic or custom.
   */
  readonly color?: string;

  /**
   * Text alignment.
   */
  readonly align?: TextAlign;

  /**
   * Number of lines before truncation.
   */
  readonly numberOfLines?: number;

  /**
   * Whether text is selectable.
   * @default false
   */
  readonly selectable?: boolean;

  /**
   * Custom text style overrides.
   */
  readonly style?: TextStyle | TextStyle[];
}

// =============================================================================
// FEEDBACK COMPONENT PROPS
// =============================================================================

/**
 * Loading indicator props.
 */
export interface LoadingProps extends BaseComponentProps {
  /**
   * Size of the loading indicator.
   * @default 'md'
   */
  readonly size?: 'sm' | 'md' | 'lg';

  /**
   * Color of the loading indicator.
   */
  readonly color?: string;

  /**
   * Whether to show loading text.
   */
  readonly label?: string;
}

/**
 * Progress indicator props.
 */
export interface ProgressProps extends BaseComponentProps {
  /**
   * Progress value between 0 and 1.
   */
  readonly value: number;

  /**
   * Size of the progress indicator.
   * @default 'md'
   */
  readonly size?: 'sm' | 'md' | 'lg';

  /**
   * Color of the progress fill.
   */
  readonly color?: string;

  /**
   * Color of the progress track.
   */
  readonly trackColor?: string;

  /**
   * Whether to show the progress percentage.
   * @default false
   */
  readonly showLabel?: boolean;
}

// =============================================================================
// FORM COMPONENT PROPS
// =============================================================================

/**
 * Common input props.
 */
export interface InputBaseProps extends BaseComponentProps {
  /**
   * Input value.
   */
  readonly value?: string;

  /**
   * Handler for value changes.
   */
  readonly onChangeText?: (text: string) => void;

  /**
   * Placeholder text.
   */
  readonly placeholder?: string;

  /**
   * Whether the input is disabled.
   * @default false
   */
  readonly disabled?: boolean;

  /**
   * Whether the input is in error state.
   * @default false
   */
  readonly error?: boolean;

  /**
   * Error message to display.
   */
  readonly errorMessage?: string;

  /**
   * Label for the input.
   */
  readonly label?: string;

  /**
   * Helper text below the input.
   */
  readonly helperText?: string;

  /**
   * Handler for focus events.
   */
  readonly onFocus?: () => void;

  /**
   * Handler for blur events.
   */
  readonly onBlur?: () => void;
}

// =============================================================================
// EVENT HANDLERS
// =============================================================================

/**
 * Layout event handler type.
 */
export type LayoutHandler = (event: LayoutChangeEvent) => void;

/**
 * Standard event handler.
 */
export type EventHandler<T = void> = T extends void
  ? () => void
  : (value: T) => void;

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Make specific properties required.
 */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Make specific properties optional.
 */
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Extract style type from component.
 */
export type StyleType = ViewStyle | TextStyle | ImageStyle;

/**
 * Merge two types with the second taking precedence.
 */
export type Merge<T, U> = Omit<T, keyof U> & U;

/**
 * Props that can be passed to native components.
 */
export type NativeProps<T> = Omit<T, 'style'> & {
  style?: StyleType | StyleType[];
};
