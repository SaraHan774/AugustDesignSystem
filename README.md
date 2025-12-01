# August Design System

A comprehensive React Native design system following Apple Human Interface Guidelines. Build beautiful, accessible, and consistent UIs for iOS, Android, and Web.

[![npm version](https://badge.fury.io/js/august-design-system.svg)](https://www.npmjs.com/package/august-design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Apple HIG Compliant** - Follows iOS design patterns and accessibility guidelines
- **Cross-Platform** - Works on iOS, Android, and Web (React Native Web)
- **Fully Typed** - Complete TypeScript support with comprehensive types
- **Themeable** - Light/dark mode support with customizable design tokens
- **Accessible** - Built-in accessibility hooks (reduced motion, screen reader, dynamic type)
- **30+ Components** - Foundation primitives, core UI, and chat SDK components
- **Rich Design Tokens** - Colors, typography, spacing, shadows, radius, animations

## Installation

```bash
npm install august-design-system
# or
yarn add august-design-system
```

### Peer Dependencies

Ensure you have the peer dependencies installed:

```bash
npm install react react-native
```

For web support:
```bash
npm install react-native-web
```

### Additional Dependencies

The design system uses these packages for enhanced functionality:
- `react-native-gesture-handler` - Touch interactions
- `react-native-reanimated` - Animations
- `react-native-safe-area-context` - Safe area handling
- `react-native-svg` - SVG rendering
- `react-native-vector-icons` - Icon support

## Quick Start

Wrap your app with the `ThemeProvider`:

```tsx
import { ThemeProvider, Button } from 'august-design-system';

function App() {
  return (
    <ThemeProvider>
      <Button title="Get Started" onPress={() => console.log('Pressed!')} />
    </ThemeProvider>
  );
}
```

## Documentation

View the full documentation and interactive examples:

**[Storybook Documentation](https://SaraHan774.github.io/AugustDesignSystem)**

## Components

### Foundation Primitives

| Component | Description |
|-----------|-------------|
| `Box` | Flexible layout primitive with theme-aware styling |
| `Pressable` | Enhanced touchable with haptic feedback and press states |
| `Icon` | Platform-native icon component |
| `Button` | Interactive button with multiple variants (filled, tinted, gray, outlined, ghost) |
| `Spinner` | Loading indicator with customizable size |
| `Divider` | Visual separator component |
| `Toast` | Notification component with ToastProvider |
| `SearchBar` | iOS-style search input |
| `EmptyState` | Placeholder content for empty views |

### Core UI Components

| Component | Description |
|-----------|-------------|
| `Switch` | iOS-style toggle switch |
| `Badge` | Generic badge (count, dot, label variants) |
| `Progress` | Linear and circular progress indicators |
| `Alert` | Inline notification/banner component |
| `Card` | Content grouping container |
| `Header` | Navigation bar (iOS navigation bar style) |
| `Modal` | Centered modal dialog |
| `Sheet` | Bottom sheet modal surface |
| `ListItem` | Configurable list row (iOS table view cell style) |
| `TabBar` | Bottom tab bar navigation |
| `ActionMenu` | Contextual action menu (iOS context menu style) |
| `MessageReactions` | Emoji reactions for messages |

### Chat SDK Components

| Component | Description |
|-----------|-------------|
| `Avatar` | User avatar with initials fallback and group support |
| `StatusBadge` | Online/offline presence indicator |
| `UnreadBadge` | Unread message count badge |
| `TypingIndicator` | Animated typing indicator |
| `MessageBubble` | Chat message bubble for text, images, and files |
| `InputBar` | Message input with attachments and error states |
| `ConversationListItem` | Chat list item with badges and status |

## Hooks

| Hook | Description |
|------|-------------|
| `useTheme` | Access theme context (colors, toggleColorMode, isDark) |
| `useThemedStyles` | Create theme-aware stylesheets |
| `useBreakpoint` | Current responsive breakpoint |
| `useResponsiveValue` | Responsive values based on screen size |
| `useDeviceType` | Detect device type (phone, tablet, desktop) |
| `useReducedMotion` | Respect reduced motion preferences |
| `useAccessibleAnimation` | Animations respecting accessibility settings |
| `useScreenReader` | Detect screen reader status |
| `useDynamicType` | Support iOS dynamic type scaling |
| `useHighContrast` | Detect high contrast mode |

## Usage Examples

### Button Variants

```tsx
import { Button } from 'august-design-system';

// Filled button (default)
<Button title="Primary" variant="filled" colorScheme="primary" />

// Outlined button
<Button title="Cancel" variant="outlined" colorScheme="neutral" />

// Destructive button
<Button title="Delete" variant="filled" colorScheme="destructive" />

// Loading state
<Button title="Save" loading loadingText="Saving..." />
```

### Core UI Components

```tsx
import {
  Card,
  Badge,
  Switch,
  Alert,
  ListItem,
  Header,
  SearchBar,
  Progress,
} from 'august-design-system';

// Card with content
<Card title="Settings" subtitle="Manage your preferences">
  <ListItem title="Notifications" accessory={<Switch value={true} />} />
  <ListItem title="Dark Mode" accessory={<Switch value={false} />} />
</Card>

// Badges
<Badge variant="count" count={5} />
<Badge variant="dot" colorScheme="success" />
<Badge variant="label" label="New" />

// Alert
<Alert
  type="info"
  title="Update Available"
  message="A new version is ready to install"
  onDismiss={() => {}}
/>

// Header
<Header
  title="Messages"
  leftAction={{ icon: 'arrow-back', onPress: goBack }}
  rightAction={{ icon: 'settings', onPress: openSettings }}
/>

// SearchBar
<SearchBar
  placeholder="Search conversations..."
  value={query}
  onChangeText={setQuery}
/>

// Progress
<Progress value={0.75} variant="linear" />
<Progress value={0.5} variant="circular" />
```

### Chat Components

```tsx
import {
  Avatar,
  MessageBubble,
  InputBar,
  ConversationListItem,
  TypingIndicator,
} from 'august-design-system';

// Avatar with status
<Avatar name="John Doe" size="lg" status="online" />

// Group avatar
<Avatar
  group={[
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' },
  ]}
  size="md"
/>

// Message bubble
<MessageBubble
  direction="outgoing"
  text="Hello! How are you?"
  timestamp={new Date()}
  status="read"
/>

// Typing indicator
<TypingIndicator users={['Alice', 'Bob']} />

// Conversation list item
<ConversationListItem
  id="conv-1"
  title="John Doe"
  subtitle="Hey, how are you?"
  timestamp={new Date()}
  unreadCount={3}
  avatarName="John Doe"
  presenceStatus="online"
  onPress={() => openChat('conv-1')}
/>
```

### Theming

```tsx
import { ThemeProvider, useTheme, createTheme } from 'august-design-system';

// Use the theme hook
function MyComponent() {
  const { theme, isDark, toggleColorMode } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background.primary }}>
      <Text style={{ color: theme.colors.label.primary }}>
        Hello World
      </Text>
    </View>
  );
}

// Custom theme
const customTheme = createTheme({
  colors: {
    interactive: {
      tint: '#FF6B6B',
    },
  },
});

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

### Design Tokens

Access design tokens directly:

```tsx
import { spacing, typography, radius, lightColors } from 'august-design-system/tokens';

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,      // 16pt
    borderRadius: radius.md,  // 12pt
  },
  text: {
    ...typography.body,
    color: lightColors.label.primary,
  },
});
```

### useThemedStyles Hook

Create theme-aware stylesheets:

```tsx
import { useThemedStyles } from 'august-design-system';

function MyComponent() {
  const styles = useThemedStyles((theme) => ({
    container: {
      backgroundColor: theme.colors.background.primary,
      padding: theme.spacing.lg,
    },
    title: {
      ...theme.typography.headline,
      color: theme.colors.label.primary,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Themed Content</Text>
    </View>
  );
}
```

### Accessibility Hooks

```tsx
import {
  useReducedMotion,
  useAccessibleAnimation,
  useDynamicType,
} from 'august-design-system';

function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();
  const animConfig = useAccessibleAnimation({
    duration: 300,
    useNativeDriver: true,
  });

  // Animation respects user's motion preferences
}

function ScaledText() {
  const { fontScale } = useDynamicType();

  // Text scales with iOS dynamic type settings
}
```

## Imports

All exports are available from the main entry point:

```tsx
import {
  // Components
  Button,
  Card,
  Modal,
  Avatar,

  // Theme
  ThemeProvider,
  useTheme,
  createTheme,

  // Tokens
  spacing,
  typography,
  radius,
  lightColors,

  // Hooks
  useThemedStyles,
  useReducedMotion,
} from 'august-design-system';
```

### Subpath Imports (bundlers with ESM support)

For bundlers that fully support package exports (Webpack, Vite):

```tsx
import { Button, Card } from 'august-design-system/components';
import { ThemeProvider } from 'august-design-system/theme';
import { spacing } from 'august-design-system/tokens';
import { useThemedStyles } from 'august-design-system/hooks';
```

> **Note:** Metro bundler (React Native) has experimental support for package exports. If subpath imports don't work, use the main entry point instead.

## API Reference

### ThemeProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `ThemeConfig` | `defaultTheme` | Custom theme configuration |
| `colorMode` | `'light' \| 'dark' \| 'system'` | `'system'` | Color mode preference |
| `children` | `ReactNode` | - | Child components |

### Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Button label text |
| `variant` | `'filled' \| 'tinted' \| 'gray' \| 'outlined' \| 'ghost'` | `'filled'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `colorScheme` | `'primary' \| 'destructive' \| 'success' \| 'neutral'` | `'primary'` | Color scheme |
| `disabled` | `boolean` | `false` | Disable button |
| `loading` | `boolean` | `false` | Show loading indicator |
| `fullWidth` | `boolean` | `false` | Take full width |
| `onPress` | `() => void` | - | Press handler |

## Development

### Prerequisites

- Node.js >= 20
- React Native development environment set up

### Running Locally

```bash
# Install dependencies
npm install

# Run Storybook (interactive component playground)
npm run storybook

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web

# Build the library
npm run build

# Run type checking
npm run typecheck

# Run tests
npm test
```

### Building Storybook

```bash
npm run build-storybook
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

Built with love for the React Native community.