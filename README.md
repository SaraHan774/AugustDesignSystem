# August Design System

A comprehensive React Native design system following Apple Human Interface Guidelines. Build beautiful, accessible, and consistent UIs for iOS, Android, and Web.

[![npm version](https://badge.fury.io/js/august-design-system.svg)](https://www.npmjs.com/package/august-design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Apple HIG Compliant** - Follows iOS design patterns and accessibility guidelines
- **Cross-Platform** - Works on iOS, Android, and Web (React Native Web)
- **Fully Typed** - Complete TypeScript support with comprehensive types
- **Themeable** - Light/dark mode support with customizable design tokens
- **Accessible** - Built-in accessibility support with proper labels and roles
- **Chat SDK Components** - Ready-to-use messaging components

## Installation

```bash
npm install august-design-system
# or
yarn add august-design-system
```

### Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react react-native react-native-safe-area-context
```

For web support:
```bash
npm install react-native-web
```

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

### Core Components

| Component | Description |
|-----------|-------------|
| `Button` | Interactive button with multiple variants (filled, tinted, outlined, ghost) |

### Chat SDK Components

| Component | Description |
|-----------|-------------|
| `Avatar` | User avatar with initials fallback and group support |
| `MessageBubble` | Chat message bubble for text, images, and files |
| `InputBar` | Message input with attachments and error states |
| `ConversationListItem` | Chat list item with badges and status |
| `StatusBadge` | Online/offline presence indicator |
| `UnreadBadge` | Unread message count badge |
| `TypingIndicator` | Animated typing indicator |

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

### Chat Components

```tsx
import {
  Avatar,
  MessageBubble,
  InputBar,
  ConversationListItem
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
import { spacing, typography, radius, colors } from 'august-design-system/tokens';

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,      // 16pt
    borderRadius: radius.md,  // 12pt
  },
  text: {
    ...typography.body,
    color: colors.label.primary,
  },
});
```

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

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

Built with love for the React Native community.