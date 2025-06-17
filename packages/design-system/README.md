# Cinderblock Design System

A comprehensive React/React Native Web design system focused on structural hierarchy and responsive design.

## Overview

Cinderblock is unique among design systems because it's not just about visual elements like buttons and inputs. It includes many components that explicitly exist to provide space and structure for visual elements. The system enforces a clear hierarchical structure that handles spacing and positioning through components rather than inline styles.

## Key Philosophy

**Space and positioning is almost never explicitly defined inline.** Instead, space and positioning comes from the structural hierarchy of components. This approach ensures consistent spacing, responsive behavior, and maintainable layouts.

## Installation

```bash
npm install @cinderblock/design-system
```

## Basic Usage

```javascript
import { Stripe, Section, Chunk, Text, Button } from '@cinderblock/design-system';

function MyPage() {
  return (
    <Stripe>
      <Section>
        <Chunk>
          <Text type="pageHead">Welcome to My App</Text>
        </Chunk>
        <Chunk>
          <Text>This is a paragraph with proper spacing.</Text>
        </Chunk>
        <Chunk>
          <Button onPress={() => alert('Hello!')}>
            Click Me
          </Button>
        </Chunk>
      </Section>
    </Stripe>
  );
}
```

## Structural Hierarchy

The design system enforces this hierarchy:

```
Page (not in design system - your app wrapper)
├── Stripe (full-width background sections)
│   ├── Section (content areas within stripes)
│   │   ├── Chunk (spacing between elements)
│   │   │   └── [Your content components]
│   │   └── Chunk
│   │       └── [Your content components]
│   └── Section
└── Stripe
```

## Component Categories

### Structural Components
Handle layout, spacing, and page structure:
- `Stripe` - Full-width background sections
- `Section` - Content areas within stripes  
- `Chunk` - Standard spacing between elements
- `Flex` & `FlexItem` - Flexible layouts
- `Bounds` - Content width constraints
- `Inline` - Inline layouts
- `Sectionless` - Alternative containers

### UI/Interactive Components
Handle user interactions:
- `Button` - Primary actions
- `TextInput` - Form inputs
- `CheckBox` - Boolean inputs
- `Picker` - Dropdowns
- `Modal` - Overlays
- `Tabs` - Tab navigation
- And more...

### Content/Display Components
Display information and content:
- `Text` - Typography system
- `Avatar` - Profile images
- `Icon` - SVG icons
- `Picture` - Responsive images
- `Card` - Content containers
- `List` - Flexible lists
- And more...

### Utility/Behavioral Components
Provide functionality and behaviors:
- `LoadingBlock` - Loading states
- `RevealBlock` - Animated reveals
- `Bounce` - Animation effects
- `Toaster` - Notifications
- And more...

## Responsive Design

Components include built-in responsive behavior using media queries. The system provides:
- Responsive breakpoints through `useMediaContext`
- Automatic layout switching (e.g., Flex direction changes)
- Responsive typography scaling
- Adaptive spacing and sizing

## Theme System

All components consume a central `ThemeContext` for consistent styling:

```javascript
import { ThemeContext } from '@cinderblock/design-system';

function MyComponent() {
  const { styles, SWATCHES, METRICS } = useContext(ThemeContext);
  // Access theme values
}
```

## Documentation

Detailed component documentation is available in the [docs](./docs/) folder:

- [Structural Components](./docs/structural-components.md)
- [UI/Interactive Components](./docs/ui-components.md)
- [Content/Display Components](./docs/content-components.md)
- [Utility/Behavioral Components](./docs/utility-components.md)
- [Usage Examples](./docs/examples.md)

## Development

This design system is built for React and React Native Web, providing consistent behavior across web and mobile platforms.

### Peer Dependencies

- React 19.0.0
- React DOM 19.0.0
- React Native Web 0.20.0
- React Redux ^9.1.2

## Contributing

When adding new components, follow these principles:

1. **Structural components** handle spacing and layout
2. **Visual components** focus on appearance and interaction
3. **All components** should consume ThemeContext for consistency
4. **Responsive behavior** should be built-in, not added later
5. **Accessibility** should be considered from the start

## License

ISC
