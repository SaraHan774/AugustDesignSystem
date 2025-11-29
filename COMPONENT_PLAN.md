# AugustDesignSystem - Component Implementation Plan

## Overview

This plan outlines new components to be added to the AugustDesignSystem. Components are prioritized based on:
- **iOS Human Interface Guidelines** and **Material Design 3** standards
- **Design system library consensus** (Polaris, Ant Design, Chakra UI, shadcn/ui, RN Paper, NativeBase, Tamagui)
- **Dependency order** - Components that others depend on come first
- **Chat SDK value** - Essential messaging functionality

---

## Existing Components (Already Built)

### Tokens (Complete)
- **Typography** - Full iOS HIG system (largeTitle, title1-3, headline, subheadline, body, callout, footnote, caption1-2)
- **Colors** - Light/dark mode with semantic colors (background, label, fill, separator, system, semantic, interactive, material)
- **Spacing** - Complete spacing system with utilities
- **Radius** - Border radius tokens with semantic variants
- **Shadows** - Shadow presets for elevation
- **Animation** - Duration and easing tokens
- **Sizes** - Component sizes, breakpoints, z-index, opacity

### Primitives
- **Box** - Layout primitive with token integration (spacing, colors, shadows, radius)

### Components
- **Button** - Variants (filled, tinted, gray, outlined, ghost), sizes, loading states, icons

### Chat Components
- **Avatar** - Single & group/stacked avatars (up to 3), status indicator, initials fallback, pressable
- **StatusBadge** - Online/offline/away status indicator
- **UnreadBadge** - Notification count badge
- **TypingIndicator** - Animated typing dots
- **MessageBubble** - Chat message containers
- **InputBar** - Chat text input with send button
- **ConversationListItem** - Chat list items with avatar, name, preview, timestamp

### Hooks (Complete)
- useThemedStyles, useTheme, useResponsive, useBreakpoint, useReducedMotion, useAccessibility, etc.

---

## Phase 1: Foundation Primitives (P0 - Critical)

> Essential primitives found in 86-100% of major design systems. These are dependencies for many other components.

### 1.1 Icon
**Priority:** P0 | **Effort:** Medium | **Consensus:** 100%

Native-first icon component using SF Symbols (iOS) and Material Symbols (Android/Web).

**Approach: Native-First**
- **iOS:** SF Symbols via `react-native-sfsymbols` or native module
- **Android/Web:** Material Symbols via `@expo/vector-icons` (MaterialIcons/MaterialCommunityIcons)
- **Fallback:** Custom SVG icons for brand-specific or missing icons

**Dependencies:**
```bash
npm install react-native-sfsymbols @expo/vector-icons react-native-svg
```

**Features:**
- Size variants: xs (12), sm (16), md (20), lg (24), xl (32)
- Color from theme tokens (primary, secondary, error, success, etc.)
- Weight variants for SF Symbols (ultralight to black)
- Rendering modes: monochrome, hierarchical, palette, multicolor (SF Symbols)
- Platform-specific icon mapping (e.g., "chevron.right" → "chevron-right")
- Animated symbol effects (iOS 17+): bounce, pulse, variableColor
- Fallback to custom SVG when native icon unavailable

**API Design:**
```tsx
// Basic usage - automatically uses SF Symbol on iOS, Material on Android
<Icon name="checkmark" size="md" color="success" />

// SF Symbol specific (iOS only, fallback on Android)
<Icon
  name="heart.fill"
  size="lg"
  color="error"
  weight="semibold"
  renderingMode="hierarchical"
/>

// With animation (iOS 17+)
<Icon name="bell" size="md" symbolEffect="bounce" />

// Custom/fallback icon
<Icon size="md" color="primary">
  <CustomBrandIcon />
</Icon>
```

**Icon Name Mapping:**
Will include a mapping file for common icons:
```ts
const iconMap = {
  // Action icons
  'checkmark': { ios: 'checkmark', android: 'check' },
  'close': { ios: 'xmark', android: 'close' },
  'search': { ios: 'magnifyingglass', android: 'search' },
  'send': { ios: 'paperplane.fill', android: 'send' },
  // Navigation
  'back': { ios: 'chevron.left', android: 'arrow-back' },
  'forward': { ios: 'chevron.right', android: 'arrow-forward' },
  // Chat specific
  'attach': { ios: 'paperclip', android: 'attach-file' },
  'camera': { ios: 'camera.fill', android: 'camera-alt' },
  'mic': { ios: 'mic.fill', android: 'mic' },
  // ... etc
};
```

**Why P0:** Required by SearchBar, Header, Toast, ActionMenu, ListItem, TabBar, Modal, etc.

---

### 1.2 Pressable (Enhanced)
**Priority:** P0 | **Effort:** Low | **Consensus:** 86%

Enhanced touchable primitive with haptics and visual states.

**Features:**
- Press states (pressed opacity/scale, disabled)
- Haptic feedback options (light, medium, heavy, none)
- Loading state with spinner overlay
- Ripple effect option (Android/Material)
- Scale/opacity press animations
- Accessibility built-in: role, label, hint

**Why P0:** Foundation for all interactive components beyond Button.

---

### 1.3 Divider
**Priority:** P0 | **Effort:** Low | **Consensus:** 100%

Visual separator between content sections.

**Variants:**
- `full` - Edge-to-edge separator
- `inset` - Left inset (iOS list style, typically 16pt or avatar width)
- `middle` - Inset on both sides
- `withLabel` - Centered text with lines on sides

**Features:**
- Horizontal and vertical orientation
- Custom thickness and color
- Label support for section headers

---

### 1.4 Spinner
**Priority:** P0 | **Effort:** Low | **Consensus:** 100%

Themed loading spinner/activity indicator.

**Features:**
- Sizes: xs, sm, md, lg
- Color variants (primary, secondary, onPrimary, onSurface)
- Optional label ("Loading...")
- Respects reduced motion preference

**Why P0:** Dependency for Button loading, SearchBar, Image loading, Skeleton, etc.

---

### 1.5 Toast / Snackbar
**Priority:** P0 | **Effort:** Medium | **Consensus:** 86%

Temporary notifications for action feedback.

**Variants:**
- `default` - Neutral, informational
- `success` - Green tint, checkmark icon
- `error` - Red tint, warning icon
- `warning` - Orange tint
- `info` - Blue tint

**Features:**
- Auto-dismiss with configurable duration (default 3-4s)
- Swipe to dismiss
- Action button support ("Undo", "Retry")
- Top or bottom positioning
- Queue management via ToastProvider context
- Imperative API: `toast.show()`, `toast.hide()`

**Use Cases:**
- "Message sent" confirmation
- "Connection restored" status
- "Failed to send - Tap to retry"
- "Copied to clipboard"

---

### 1.6 SearchBar
**Priority:** P0 | **Effort:** Medium | **Consensus:** 86%

iOS-style search input component.

**Features:**
- Search icon and placeholder
- Clear button (when has text)
- Cancel button (iOS style, animated slide-in)
- Loading state with spinner
- Focus/blur handling with keyboard
- Debounced onChange option

**Use Cases:**
- Conversation list search
- In-chat message search
- User/contact search

---

### 1.7 EmptyState
**Priority:** P0 | **Effort:** Low | **Consensus:** 86%

Component for empty lists, no results, or error states.

**Features:**
- Illustration/icon support (decorative)
- Title and description text
- Primary and secondary action buttons
- Variants: default, compact, fullscreen

**Use Cases:**
- Empty conversation list ("No conversations yet")
- No search results ("No messages found")
- Connection error state

---

## Phase 2: Core Experience (P1 - High Priority)

> Essential components for a functional app experience.

### 2.1 Header / NavigationBar
**Priority:** P1 | **Effort:** Medium | **Consensus:** 100%

Top navigation bar component (iOS navigation bar style).

**Variants:**
- `default` - Standard with centered title
- `large` - Large title (iOS 11+ style)
- `search` - With integrated search bar
- `chat` - Chat header with avatar, name, status

**Features:**
- Left/right action buttons
- Title and subtitle
- Background blur/transparency option
- Safe area handling
- Back button with custom icon

**Why P1:** Every screen needs navigation. iOS HIG: "Every app needs a navigation bar."

---

### 2.2 Modal / Dialog
**Priority:** P1 | **Effort:** Medium | **Consensus:** 100%

Centered modal dialog for alerts and confirmations.

**Variants:**
- `alert` - Simple alert with message and buttons
- `confirm` - Confirmation with cancel/confirm
- `custom` - Custom content

**Features:**
- Title, message, content areas
- Action buttons (1-3)
- Destructive action styling (red)
- Backdrop with tap-to-dismiss option
- Animated entrance/exit

**Use Cases:**
- Delete confirmation
- Error alerts
- Permission requests

---

### 2.3 Sheet (Bottom Sheet)
**Priority:** P1 | **Effort:** High | **Consensus:** 86%

Modal surface sliding up from bottom.

**Features:**
- Drag handle indicator
- Multiple snap points (25%, 50%, 90%)
- Gesture-driven dismiss
- Background overlay with tap-to-dismiss
- Safe area handling for home indicator

**Use Cases:**
- Message actions menu (copy, reply, delete, react)
- Attachment picker (photo, file, location)
- User profile quick view
- Share options

---

### 2.4 ListItem
**Priority:** P1 | **Effort:** Medium | **Consensus:** 100%

Configurable list row component (iOS table view cell style).

**Features:**
- Title and subtitle
- Left content (icon, avatar, image)
- Right content (value, chevron, switch, badge)
- Accessory types: none, disclosure (>), checkmark, detail (i)
- Destructive styling (red text)
- Selected/highlighted states
- Swipe actions (optional: delete, archive)

**Use Cases:**
- Settings screens
- Contact lists
- Menu items

---

### 2.5 ActionMenu / ContextMenu
**Priority:** P1 | **Effort:** Medium | **Consensus:** 86%

Contextual menu for actions (iOS context menu style).

**Features:**
- Menu items with icons
- Destructive item styling
- Grouped sections with dividers
- Nested submenus (optional)
- Long-press trigger support
- Animated appearance (scale + blur)

**Use Cases:**
- Message long-press menu (copy, reply, forward, delete, react)
- User profile actions (view, block, report)
- File/attachment options

---

### 2.6 Switch
**Priority:** P1 | **Effort:** Low | **Consensus:** 100%

iOS-style toggle switch.

**Features:**
- Animated thumb movement
- Custom track/thumb colors
- Disabled state
- Sizes: sm (smaller), md (default iOS 51x31)
- Haptic feedback on toggle

---

### 2.7 Progress
**Priority:** P1 | **Effort:** Low | **Consensus:** 100%

Progress indicators for ongoing operations.

**Variants:**
- `linear` - Horizontal progress bar
- `circular` - Circular/ring progress

**Features:**
- Determinate (with value) and indeterminate modes
- Size variants
- Color variants
- Label/percentage display option

**Why P1:** Essential for file uploads, downloads, media processing in chat.

---

### 2.8 Alert / Banner
**Priority:** P1 | **Effort:** Low | **Consensus:** 86%

Inline persistent notification (different from Toast - doesn't auto-dismiss).

**Variants:**
- `info` - Blue, informational
- `success` - Green, positive
- `warning` - Orange/yellow, caution
- `error` - Red, critical

**Features:**
- Icon + title + description
- Dismissible option
- Action button/link

**Use Cases:**
- "Connection lost - Messages will sync when you reconnect"
- "New version available"
- "Verify your email to enable all features"

---

### 2.9 Badge (Generic)
**Priority:** P1 | **Effort:** Low | **Consensus:** 100%

Generic badge component (extends beyond chat-specific UnreadBadge).

**Variants:**
- `count` - Numeric badge (1, 2, 99+)
- `dot` - Simple dot indicator
- `label` - Text label badge ("New", "Beta")

**Features:**
- Max count with overflow (99+)
- Color variants (primary, error, success, warning)
- Size variants (sm, md)
- Position anchoring (top-right, etc.)

---

### 2.10 Card
**Priority:** P1 | **Effort:** Medium | **Consensus:** 100%

Content grouping container.

**Variants:**
- `elevated` - With shadow
- `outlined` - With border
- `filled` - Solid background

**Features:**
- Header, content, footer sections
- Pressable option (for clickable cards)
- Custom padding
- Border radius from theme

**Use Cases:**
- Settings sections
- Message attachments preview
- User profile cards

---

### 2.11 MessageReactions
**Priority:** P1 | **Effort:** Medium | **Chat Value:** High

Emoji reactions display for messages.

**Features:**
- Reaction pills with emoji and count
- Selected state (highlighted) for user's own reactions
- Add reaction button (+)
- Overflow handling (max visible, +N more)
- Animated additions/removals
- Long-press to see who reacted

**Why P1 (moved from P2):** Core chat feature present in all modern messaging apps.

---

### 2.12 TabBar (Bottom Navigation)
**Priority:** P1 | **Effort:** Medium | **Consensus:** 100%

Bottom tab bar for main app navigation.

**Features:**
- 3-5 tab items
- Icon + label per item
- Badge support on tabs
- Active/inactive states with animation
- Safe area handling (bottom)
- Haptic feedback on selection

**Why P1 (moved from P2):** Primary navigation pattern for iOS apps per HIG.

---

## Phase 3: Enhanced Experience (P2 - Medium Priority)

### 3.1 Dropdown / Select
**Priority:** P2 | **Effort:** High

Dropdown selection component.

**Variants:**
- `default` - Standard dropdown
- `searchable` - With search/filter input
- `multi` - Multiple selection

**Features:**
- Trigger button showing current value
- Options list (modal on mobile)
- Search/filter functionality
- Grouped options with headers
- Disabled options

**Note:** Can use Sheet as interim solution for mobile.

---

### 3.2 TextInput (Enhanced)
**Priority:** P2 | **Effort:** Medium | **Consensus:** 100%

Enhanced text input with design system integration.

**Features:**
- Label and placeholder
- Helper text and error messages
- Character count
- Left/right icons or buttons
- Multiline support (textarea)
- Variants: outlined, filled, underlined
- Clear button
- Secure text entry (password)

---

### 3.3 Skeleton
**Priority:** P2 | **Effort:** Medium | **Consensus:** 86%

Loading placeholder components.

**Variants:**
- `text` - Text line placeholder
- `circular` - Avatar placeholder
- `rectangular` - Card/image placeholder

**Features:**
- Pulse or shimmer animation
- Configurable dimensions
- Respects reduced motion preference
- Composable (Skeleton.Text, Skeleton.Avatar, etc.)

---

### 3.4 ReadReceipts
**Priority:** P2 | **Effort:** Low | **Chat Value:** High

Message read status indicators.

**Features:**
- States: sending (clock), sent (single check), delivered (double check), read (filled/blue)
- Timestamp option
- Multiple reader avatars (for group chats)
- Animated state transitions

**Why P2 (moved from P3):** Core chat feature users expect.

---

### 3.5 ReplyPreview
**Priority:** P2 | **Effort:** Medium | **Chat Value:** High

Quoted message preview for replies.

**Features:**
- Colored bar indicating original sender
- Sender name
- Message preview (truncated)
- Media thumbnail (if replying to image/video)
- Dismiss button (when in composer)
- Tap to scroll to original message

**Why P2 (moved from P3):** Core chat feature for threaded conversations.

---

### 3.6 Tabs
**Priority:** P2 | **Effort:** Medium | **Consensus:** 100%

Tab navigation component (horizontal).

**Features:**
- Scrollable when many tabs
- Badge support per tab
- Icon + label or label only
- Animated indicator line
- Equal width or auto-width tabs

---

### 3.7 SegmentedControl
**Priority:** P2 | **Effort:** Medium | **Consensus:** 86%

iOS-style segmented control.

**Features:**
- 2-5 segments
- Animated selection sliding
- Disabled segments
- Icon or text segments
- Compact and regular sizes

---

### 3.8 Toolbar / ActionBar
**Priority:** P2 | **Effort:** Medium

Bottom or contextual toolbar for actions.

**Features:**
- Icon buttons with optional labels
- Flexible layout (spread, centered, grouped)
- Badge support on items
- Disabled states
- Safe area handling

**Use Cases:**
- Selection mode toolbar (delete, share, forward selected messages)
- Editor toolbars

---

### 3.9 Chip
**Priority:** P2 | **Effort:** Low | **Consensus:** 86%

Compact element for tags, filters, or suggestions.

**Variants:**
- `filter` - Toggleable filter chip
- `input` - Removable input chip (tags)
- `suggestion` - Action chip (quick replies)

**Features:**
- Icon support (left)
- Close/remove button (right)
- Selected state
- Disabled state

**Use Cases:**
- Quick reply suggestions
- Tag inputs
- Filter selections

---

### 3.10 Image
**Priority:** P2 | **Effort:** Medium

Standalone image component with states.

**Features:**
- Loading state (placeholder or skeleton)
- Error state (fallback image or icon)
- Aspect ratio preservation
- Resize modes (cover, contain, stretch)
- Blur placeholder (progressive loading)
- Pressable for full-screen view

**Use Cases:**
- Message attachments
- Media gallery

---

### 3.11 Popover
**Priority:** P2 | **Effort:** High | **Consensus:** 86%

Floating content anchored to trigger element.

**Features:**
- Auto-positioning (top, bottom, left, right)
- Arrow pointing to anchor
- Dismiss on outside tap
- Custom content

**Use Cases:**
- Rich tooltips
- Mini info panels
- Emoji picker anchor

---

## Phase 4: Specialized Features (P3 - Lower Priority)

### 4.1 Checkbox
**Priority:** P3 | **Effort:** Low | **Consensus:** 100%

Selectable checkbox component.

**Features:**
- Checked, unchecked, indeterminate states
- Label support (right side)
- Disabled state
- Animated check mark

---

### 4.2 Radio / RadioGroup
**Priority:** P3 | **Effort:** Low | **Consensus:** 100%

Radio button for single selection within a group.

**Features:**
- RadioGroup wrapper for managing selection
- Label support
- Disabled individual options or entire group
- Horizontal or vertical layout

---

### 4.3 VoiceMessageBubble
**Priority:** P3 | **Effort:** High | **Chat Value:** Medium

Audio message display and playback.

**Features:**
- Waveform visualization
- Play/pause control
- Playback progress indicator
- Duration display (total and current)
- Playback speed control (1x, 1.5x, 2x)

---

### 4.4 DateTimePicker
**Priority:** P3 | **Effort:** High

Date and time selection component.

**Recommendation:** Consider wrapping native pickers from `@react-native-community/datetimepicker`.

**Variants:**
- `date` - Date only
- `time` - Time only
- `datetime` - Both

---

### 4.5 Tooltip
**Priority:** P3 | **Effort:** Low

Simple text tooltip on hover/long-press.

**Recommendation:** Consider implementing as a mode of Popover.

**Features:**
- Auto-positioning
- Delay before show
- Simple text content

---

## Components Considered but Not Included

| Component | Reason |
|-----------|--------|
| **Text** | Typography tokens applied via `useThemedStyles` - no wrapper needed |
| **GroupAvatar** | Already included in Avatar component (supports `group` prop) |
| **Picker/WheelPicker** | Very high effort; recommend using native pickers |
| **FAB** | Not typical for iOS apps; use Button with positioning if needed |
| **Accordion** | Can be built from ListItem + animation; low priority |

---

## Implementation Summary

### Total: 31 New Components

| Priority | Count | Components |
|----------|-------|------------|
| **P0** | 7 | Icon, Pressable, Divider, Spinner, Toast, SearchBar, EmptyState |
| **P1** | 12 | Header, Modal, Sheet, ListItem, ActionMenu, Switch, Progress, Alert, Badge, Card, MessageReactions, TabBar |
| **P2** | 11 | Dropdown, TextInput, Skeleton, ReadReceipts, ReplyPreview, Tabs, SegmentedControl, Toolbar, Chip, Image, Popover |
| **P3** | 5 | Checkbox, Radio, VoiceMessageBubble, DateTimePicker, Tooltip |

### By Category

| Category | Components |
|----------|------------|
| **Foundation** | Icon, Pressable, Divider, Badge, Card |
| **Form** | Switch, TextInput, Checkbox, Radio, Dropdown |
| **Feedback** | Spinner, Toast, Alert, Progress, Skeleton |
| **Navigation** | Header, TabBar, Tabs, SegmentedControl, Toolbar |
| **Overlay** | Modal, Sheet, ActionMenu, Popover, Tooltip |
| **Chat** | MessageReactions, ReadReceipts, ReplyPreview, VoiceMessageBubble |
| **Selection** | Chip, Dropdown |
| **Media** | Image |

---

## Implementation Order (Dependency-Based)

```
Phase 1: No Dependencies
├── Icon
├── Pressable
├── Divider
└── Spinner

Phase 2: Depends on Phase 1
├── Toast (Icon, Pressable)
├── SearchBar (Icon, Spinner)
├── EmptyState (Icon)
└── Progress

Phase 3: Depends on Phase 1-2
├── Header (Icon, Pressable)
├── Modal (Icon, Pressable)
├── Alert (Icon)
├── Badge
├── Card
└── Switch

Phase 4: Depends on Phase 1-3
├── Sheet (Pressable)
├── ListItem (Icon, Pressable)
├── ActionMenu (Icon, Pressable, Sheet)
├── TabBar (Icon, Badge)
└── MessageReactions (Icon, Pressable)

Phase 5+: Build as needed
└── Remaining P2 and P3 components
```

---

## File Structure Pattern

Each component follows this structure:

```
src/design-system/components/ComponentName/
  index.ts                  # Export barrel
  ComponentName.tsx         # Main component
  ComponentName.types.ts    # TypeScript interfaces
  ComponentName.styles.ts   # Style factory functions
```

---

## Notes

- All components use existing design tokens (colors, typography, spacing, shadows, radius)
- All components support light and dark themes via `useTheme`
- Accessibility (a11y) is built-in: roles, labels, hints, Dynamic Type support
- Components work on iOS, Android, and Web via react-native-web
- Follow Apple HIG for iOS-native feel, Material 3 for Android adaptations
