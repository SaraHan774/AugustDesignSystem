# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-11-29

### Added

#### Core Components
- **Button** - Versatile button component with 5 variants (filled, tinted, gray, outlined, ghost), 3 sizes, 4 color schemes, and loading states

#### Chat SDK Components
- **Avatar** - User avatar with initials fallback, online status indicator, and group avatar support (up to 3 stacked)
- **MessageBubble** - Chat message bubble supporting text, images, and files with delivery status indicators
- **InputBar** - Message input component with send button, attachment support, and error banner
- **ConversationListItem** - Chat list item with avatar, preview, timestamp, unread badge, and typing indicator
- **StatusBadge** - Online/offline presence indicator with multiple sizes and styles
- **UnreadBadge** - Unread message count badge with overflow handling (99+)
- **TypingIndicator** - Animated typing indicator with dots, text, and bubble variants

#### Theme System
- **ThemeProvider** - Context provider for theming
- **useTheme** - Hook for accessing theme and color mode
- **createTheme** - Factory function for custom themes
- Light and dark theme support with system preference detection

#### Design Tokens
- **Colors** - Semantic color tokens for light/dark modes
- **Typography** - Font styles following iOS typography scale
- **Spacing** - Consistent spacing scale (4, 8, 12, 16, 20, 24, 32pt)
- **Radius** - Border radius tokens (sm, md, lg, xl, full)
- **Shadows** - Platform-specific shadow definitions
- **Animation** - Duration and easing presets

#### Hooks
- **useThemedStyles** - Create themed stylesheets
- **useBreakpoint** - Responsive breakpoint detection
- **useResponsiveValue** - Responsive value selection
- **useAccessibility** - Accessibility utilities

#### Infrastructure
- TypeScript support with complete type definitions
- ESM and CommonJS builds
- Storybook documentation
- GitHub Actions CI/CD pipeline
- Automated npm publishing on release

### Technical Details
- Minimum React version: 18.0.0
- Minimum React Native version: 0.70.0
- Optional React Native Web support
- Full accessibility support (WCAG AA compliant)
- Tree-shakeable exports