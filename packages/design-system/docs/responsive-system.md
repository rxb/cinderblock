# Responsive System

Cinderblock's responsive system is built on a sophisticated foundation that combines JavaScript-first media queries with automatic CSS generation. Unlike traditional CSS media queries, this system provides type-safe, cross-platform responsive utilities that work seamlessly across React Native and React Native Web.

## Philosophy

**Responsive behavior comes from the component system, not from manual CSS breakpoints.** Components automatically adapt to screen sizes using predefined breakpoints and utility classes, ensuring consistent responsive behavior across your entire application.

## How It Works

### 1. React Native Media Query Integration

Cinderblock uses the [`react-native-media-query`](https://www.npmjs.com/package/react-native-media-query) library, which:

- **In React Native**: Provides JavaScript-based media query evaluation
- **In React Native Web**: Compiles JavaScript media queries into real CSS media queries
- **Cross-platform**: Same responsive code works on web and mobile

### 2. Automatic Style Generation

The system generates responsive utilities automatically from breakpoint definitions:

```javascript
// From designConstants.js
export const BREAKPOINT_SIZES = {
  "small": 0,      // 0px and up
  "medium": 480,   // 480px and up  
  "large": 840,    // 840px and up
  "xlarge": 1024   // 1024px and up
}
```

These breakpoints generate utilities like:
- `showAt__large` - Show element at 840px and up
- `hideAt__medium` - Hide element at 480px and up
- `flex--row__large` - Switch to row layout at 840px and up

### 3. Two Types of Media Queries

#### Single Breakpoint Queries (`MEDIA_QUERIES_SINGLE`)
Used when you want a style to apply from a breakpoint onwards:

```javascript
// Generates: @media screen and (min-width: 840px)
[MEDIA_QUERIES_SINGLE.large]: {
  display: 'block'
}
```

#### Ranged Breakpoint Queries (`MEDIA_QUERIES`)
Used when you want different styles for each breakpoint range:

```javascript
// Generates: @media screen and (min-width: 480px) and (max-width: 839px)
[MEDIA_QUERIES.medium]: {
  fontSize: 18
}
```

### 4. The `ids` System

When styles are created with `MediaQueryStyleSheet.create()`, it returns two things:

```javascript
const { styles, ids } = MediaQueryStyleSheet.create({
  ...stylesForSingleBreakpoints('showAt', {
    display: 'unset'
  })
});
```

- **`styles`** - Style objects for React Native
- **`ids`** - CSS class names for React Native Web

## Usage in Components

### Basic Responsive Utilities

```javascript
import { View, ThemeContext } from '@cinderblock/design-system';

function ResponsiveElement() {
  const { styles, ids } = useContext(ThemeContext);
  
  return (
    <View 
      style={styles['hide']}
      dataSet={{ media: ids["showAt__large"] }}
    >
      This element is hidden by default, shows at large screens
    </View>
  );
}
```

### Built-in Component Responsive Behavior

Many components have built-in responsive behavior:

```javascript
// Flex automatically switches direction on mobile
<Flex switchDirection={true}>
  <FlexItem>Desktop: side by side</FlexItem>
  <FlexItem>Mobile: stacked</FlexItem>
</Flex>

// List shows different items per row at different breakpoints
<List 
  variant="grid"
  itemsInRow={{ mobile: 1, tablet: 2, desktop: 3 }}
  items={products}
/>

// Text automatically scales at larger breakpoints
<Text type="pageHead">
  Responsive typography
</Text>
```

## Available Breakpoints

| Breakpoint | Min Width | Use Case |
|------------|-----------|----------|
| `small` | 0px | Mobile phones |
| `medium` | 480px | Large phones, small tablets |
| `large` | 840px | Tablets, small laptops |
| `xlarge` | 1024px | Laptops, desktops |

## Generated Media Queries

### Single Breakpoint (min-width only)
```css
/* showAt__medium */
@media screen and (min-width: 480px) {
  .showAt__medium { display: unset; }
}

/* hideAt__large */  
@media screen and (min-width: 840px) {
  .hideAt__large { display: none; }
}
```

### Ranged Breakpoints (min-width and max-width)
```css
/* medium breakpoint only */
@media screen and (min-width: 480px) and (max-width: 839px) {
  .list-item--grid__medium { flex-basis: 50%; }
}
```

## Style Generation Functions

### `stylesForSingleBreakpoints(baseKey, styles)`

Creates utilities that apply from a breakpoint onwards:

```javascript
stylesForSingleBreakpoints('showAt', {
  display: 'unset'
})

// Generates:
// showAt: { display: 'unset' }
// showAt__small: { '@media screen and (min-width: 0px)': { display: 'unset' } }
// showAt__medium: { '@media screen and (min-width: 480px)': { display: 'unset' } }
// showAt__large: { '@media screen and (min-width: 840px)': { display: 'unset' } }
// showAt__xlarge: { '@media screen and (min-width: 1024px)': { display: 'unset' } }
```

### `stylesForBreakpoints(baseKey, styles)`

Creates utilities for specific breakpoint ranges:

```javascript
stylesForBreakpoints('list-item--grid', {
  paddingLeft: 16
})

// Generates styles for each breakpoint range:
// list-item--grid__small: 0px - 479px
// list-item--grid__medium: 480px - 839px  
// list-item--grid__large: 840px - 1023px
// list-item--grid__xlarge: 1024px+
```

## How React Native Web Compilation Works

When your app runs in React Native Web:

1. **JavaScript media queries** are detected in style objects
2. **CSS classes** are automatically generated with proper `@media` rules
3. **`dataSet.media`** attributes connect elements to CSS classes
4. **Browser** applies styles based on screen size

```javascript
// This JavaScript...
style={styles['hide']}
dataSet={{ media: ids["showAt__large"] }}

// Becomes this CSS...
.hide { display: none; }
@media screen and (min-width: 840px) {
  .showAt__large { display: unset; }
}

// And this HTML...
<div class="hide showAt__large">Content</div>
```

## Performance Benefits

- **Zero runtime cost** - Media queries compile to CSS, no JavaScript evaluation
- **Automatic optimization** - Duplicate media queries are consolidated  
- **Small bundle size** - Only generates CSS for utilities you actually use
- **Native performance** - Leverages browser's built-in media query engine

## Best Practices

### ✅ DO: Use Built-in Component Props

```javascript
// Good: Use component-level responsive props
<Flex switchDirection={true}>
  <FlexItem>Content</FlexItem>
</Flex>

<List itemsInRow={{ mobile: 1, desktop: 2 }} />
```

### ✅ DO: Use Utility Classes for Show/Hide

```javascript
// Good: Use responsive utilities for visibility
<View 
  style={styles['hide']}
  dataSet={{ media: ids["showAt__large"] }}
>
  Desktop-only content
</View>
```

### ❌ DON'T: Create Custom Media Queries

```javascript
// Bad: Don't create ad-hoc breakpoints
const customStyle = {
  '@media screen and (min-width: 600px)': {
    display: 'block'
  }
}
```

### ❌ DON'T: Use CSS Media Queries Directly

```css
/* Bad: Don't write CSS media queries */
@media (min-width: 768px) {
  .my-element { display: block; }
}
```

## Debugging Responsive Behavior

### Inspect Generated CSS Classes

In browser dev tools, look for generated classes:

```css
.showAt__large_abc123 { display: unset; }
@media screen and (min-width: 840px) {
  .showAt__large_abc123 { display: unset; }
}
```

### Check Component Props

Many responsive issues can be solved with component props:

```javascript
// Debug: Check if switchDirection is working
<Flex switchDirection={true} style={{ border: '1px solid red' }}>
  <FlexItem>Item 1</FlexItem>
  <FlexItem>Item 2</FlexItem>
</Flex>
```

### Verify Breakpoint Values

Check that your expected breakpoints match the system:

```javascript
import { BREAKPOINT_SIZES } from '@cinderblock/design-system/styles/designConstants';
console.log(BREAKPOINT_SIZES); // { small: 0, medium: 480, large: 840, xlarge: 1024 }
```

This responsive system provides a powerful, performant, and consistent way to handle responsive design across platforms while maintaining the structural hierarchy principles that make Cinderblock unique.