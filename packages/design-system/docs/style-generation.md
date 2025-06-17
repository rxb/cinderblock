# Style Generation System

Cinderblock's responsive utilities are automatically generated through a sophisticated style generation system. This system takes breakpoint definitions and creates comprehensive sets of responsive utilities, ensuring consistency and eliminating manual work.

## Overview

The style generation system transforms simple style definitions into complete responsive utility sets:

```javascript
// Input: Simple style definition
stylesForSingleBreakpoints('showAt', {
  display: 'unset'
})

// Output: Complete responsive utility set
{
  'showAt': { display: 'unset' },
  'showAt__small': { '@media screen and (min-width: 0px)': { display: 'unset' } },
  'showAt__medium': { '@media screen and (min-width: 480px)': { display: 'unset' } },
  'showAt__large': { '@media screen and (min-width: 840px)': { display: 'unset' } },
  'showAt__xlarge': { '@media screen and (min-width: 1024px)': { display: 'unset' } }
}
```

## Core Functions

### `stylesForSingleBreakpoints(baseKey, styles)`

Creates utilities that apply from a breakpoint onwards (min-width only).

#### Purpose
Use when you want a style to "turn on" at a breakpoint and remain active for all larger screens.

#### Parameters
- **`baseKey`** (string) - The base name for the utility class
- **`styles`** (object) - The CSS styles to apply

#### Generated Pattern
- `baseKey` - Base style (no media query)
- `baseKey__small` - Applies at small breakpoint (0px+)
- `baseKey__medium` - Applies at medium breakpoint (480px+)
- `baseKey__large` - Applies at large breakpoint (840px+)
- `baseKey__xlarge` - Applies at xlarge breakpoint (1024px+)

#### Example

```javascript
stylesForSingleBreakpoints('showAt', {
  display: 'unset'
})

// Generates:
{
  'showAt': { 
    display: 'unset' 
  },
  'showAt__small': { 
    '@media screen and (min-width: 0px)': { 
      display: 'unset' 
    } 
  },
  'showAt__medium': { 
    '@media screen and (min-width: 480px)': { 
      display: 'unset' 
    } 
  },
  'showAt__large': { 
    '@media screen and (min-width: 840px)': { 
      display: 'unset' 
    } 
  },
  'showAt__xlarge': { 
    '@media screen and (min-width: 1024px)': { 
      display: 'unset' 
    } 
  }
}
```

#### Common Use Cases

```javascript
// Visibility utilities
stylesForSingleBreakpoints('showAt', { display: 'unset' })
stylesForSingleBreakpoints('hideAt', { display: 'none' })

// Layout changes
stylesForSingleBreakpoints('flex--row', { flexDirection: 'row' })
stylesForSingleBreakpoints('flex--column', { flexDirection: 'column' })

// Button variants
stylesForSingleBreakpoints('button--grow', { 
  alignSelf: 'stretch', 
  flex: 1 
})
```

### `stylesForBreakpoints(baseKey, styles, single = false)`

Creates utilities for specific breakpoint ranges (min-width and max-width).

#### Purpose
Use when you want different styles for each breakpoint range, not cumulative styles.

#### Parameters
- **`baseKey`** (string) - The base name for the utility class
- **`styles`** (object) - The CSS styles to apply
- **`single`** (boolean) - If true, uses single breakpoints (calls `stylesForSingleBreakpoints`)

#### Generated Pattern
- `baseKey` - Base style (no media query)
- `baseKey__small` - Applies only at small breakpoint (0px - 479px)
- `baseKey__medium` - Applies only at medium breakpoint (480px - 839px)
- `baseKey__large` - Applies only at large breakpoint (840px - 1023px)
- `baseKey__xlarge` - Applies only at xlarge breakpoint (1024px+)

#### Example

```javascript
stylesForBreakpoints('list-item--grid', {
  paddingLeft: 16,
  borderTopWidth: 1
})

// Generates:
{
  'list-item--grid': { 
    paddingLeft: 16,
    borderTopWidth: 1
  },
  'list-item--grid__small': { 
    '@media screen and (min-width: 0px) and (max-width: 479px)': { 
      paddingLeft: 16,
      borderTopWidth: 1
    } 
  },
  'list-item--grid__medium': { 
    '@media screen and (min-width: 480px) and (max-width: 839px)': { 
      paddingLeft: 16,
      borderTopWidth: 1
    } 
  },
  'list-item--grid__large': { 
    '@media screen and (min-width: 840px) and (max-width: 1023px)': { 
      paddingLeft: 16,
      borderTopWidth: 1
    } 
  },
  'list-item--grid__xlarge': { 
    '@media screen and (min-width: 1024px)': { 
      paddingLeft: 16,
      borderTopWidth: 1
    } 
  }
}
```

#### Common Use Cases

```javascript
// List grid items
stylesForBreakpoints('list-item--grid', {
  paddingLeft: 16,
  borderTopWidth: 0
})

// Component variants that differ per breakpoint
stylesForBreakpoints('card--mobile', {
  padding: 12,
  borderRadius: 8
})
```

## Advanced Generation Patterns

### Dynamic Grid Generation

The system includes sophisticated logic for generating grid utilities:

```javascript
// Generates utilities for 1-8 items per row
...(()=>{
  let gridObj = {};
  [1,2,3,4,5,6,7,8].forEach( factor => {
    gridObj = {...gridObj, ...stylesForBreakpoints(`list-item--grid--${factor}`, {
      flexBasis: `${100/factor}%`
    })}
  });
  return gridObj;
})()

// Results in utilities like:
// list-item--grid--1__medium (100% width)
// list-item--grid--2__medium (50% width) 
// list-item--grid--3__medium (33.33% width)
// list-item--grid--4__medium (25% width)
```

### Flex Grow Factor Generation

```javascript
// Generate flex grow utilities dynamically
...(()=>{
  const growObj = {};
  for(let factor of FLEX_GROW_FACTORS){
    growObj[`flex-item--${factor}`] = { flex: factor };
  }
  return growObj;
})()

// With FLEX_GROW_FACTORS = [1, 2, 3, 4, 5, 6, 7]
// Results in:
// flex-item--1 { flex: 1 }
// flex-item--2 { flex: 2 }
// flex-item--3 { flex: 3 }
// etc.
```

## Breakpoint Configuration

### Breakpoint Definitions

```javascript
// From designConstants.js
export const BREAKPOINT_SIZES = {
  "small": 0,      // Mobile phones
  "medium": 480,   // Large phones, small tablets
  "large": 840,    // Tablets, small laptops
  "xlarge": 1024   // Laptops, desktops
}
```

### Media Query Generation

```javascript
// Generate media query parameters
export const buildMediaQueryParams = (single, bp_sizes = BREAKPOINT_SIZES) => {
  const params = {};
  const keys = Object.keys(bp_sizes);
  
  keys.forEach( (key, index) => {
    const firstPart = `screen and (min-width: ${bp_sizes[key]}px)`;
    const secondPart = (!single && index+1 < keys.length) 
      ? ` and (max-width: ${bp_sizes[keys[index+1]]-1}px)` 
      : "";
    params[key] = firstPart + secondPart;
  });
  
  return params;
}

// Single breakpoint queries (min-width only)
export const MEDIA_QUERY_PARAMS_SINGLE = buildMediaQueryParams(true);
// Result:
// {
//   small: "screen and (min-width: 0px)",
//   medium: "screen and (min-width: 480px)", 
//   large: "screen and (min-width: 840px)",
//   xlarge: "screen and (min-width: 1024px)"
// }

// Ranged breakpoint queries (min-width and max-width)
export const MEDIA_QUERY_PARAMS = buildMediaQueryParams(false);
// Result:
// {
//   small: "screen and (min-width: 0px) and (max-width: 479px)",
//   medium: "screen and (min-width: 480px) and (max-width: 839px)",
//   large: "screen and (min-width: 840px) and (max-width: 1023px)", 
//   xlarge: "screen and (min-width: 1024px)"
// }
```

### CSS Media Query Generation

```javascript
// Add @media prefix to create complete CSS media queries
export const buildMediaQueries = (params) => {
  const queries = {};
  Object.keys(params).forEach( (key, index) => {
    queries[key] = `@media ${params[key]}`;
  })
  return queries;
}

export const MEDIA_QUERIES = buildMediaQueries(MEDIA_QUERY_PARAMS);
export const MEDIA_QUERIES_SINGLE = buildMediaQueries(MEDIA_QUERY_PARAMS_SINGLE);
```

## Integration with React Native Media Query

### Style Creation

```javascript
import MediaQueryStyleSheet from 'react-native-media-query';

const buildStyles = (METRICS, SWATCHES) => {
  const { styles: cleanStyles, ids } = MediaQueryStyleSheet.create({
    
    // Base styles
    'show': {
      display: 'unset',
    },
    'hide': {
      display: 'none',
    },
    
    // Generated responsive utilities
    ...stylesForSingleBreakpoints('showAt', {
      display: 'unset'
    }),
    ...stylesForSingleBreakpoints('hideAt', {
      display: 'none'
    }),
    
    // More generated utilities...
    
  });

  const styles = StyleSheet.create(cleanStyles);
  return { styles, ids };
}
```

### Usage in Components

```javascript
function MyComponent() {
  const { styles, ids } = useContext(ThemeContext);
  
  return (
    <View 
      style={styles['hide']}
      dataSet={{ media: ids["showAt__large"] }}
    >
      Content
    </View>
  );
}
```

## Creating Custom Utilities

### Adding New Utilities

To add new responsive utilities, modify `buildStyles.js`:

```javascript
// Add to the MediaQueryStyleSheet.create() object
const buildStyles = (METRICS, SWATCHES) => {
  const { styles: cleanStyles, ids } = MediaQueryStyleSheet.create({
    
    // Existing utilities...
    
    // Your custom utilities
    ...stylesForSingleBreakpoints('fadeAt', {
      opacity: 1
    }),
    
    ...stylesForBreakpoints('customComponent', {
      padding: 16,
      backgroundColor: '#f0f0f0'
    }),
    
  });
  
  return { styles, ids };
}
```

### Custom Breakpoint Logic

For more complex responsive behavior:

```javascript
// Custom responsive patterns
'responsive-text': {
  fontSize: METRICS.bodySize,
  [MEDIA_QUERIES_SINGLE.medium]: {
    fontSize: METRICS.bigSize,
  },
  [MEDIA_QUERIES_SINGLE.large]: {
    fontSize: METRICS.sectionHeadSize,
  }
},

// Dynamic sizing based on breakpoints
...(()=>{
  const textSizes = {};
  Object.keys(BREAKPOINT_SIZES).forEach(breakpoint => {
    textSizes[`text--${breakpoint}`] = {
      [MEDIA_QUERIES_SINGLE[breakpoint]]: {
        fontSize: METRICS[`${breakpoint}Size`] || METRICS.bodySize
      }
    };
  });
  return textSizes;
})()
```

## Performance Considerations

### Efficient Generation

- **Lazy evaluation** - Utilities are only generated when the style object is created
- **Deduplication** - Identical media queries are automatically consolidated
- **Tree shaking** - Unused utilities are eliminated in production builds

### Memory Usage

- **Shared objects** - Common style objects are reused across utilities
- **Minimal overhead** - Only the styles you use contribute to bundle size
- **CSS optimization** - React Native Web optimizes the generated CSS

### Development vs Production

```javascript
// Development: All utilities available for debugging
if (__DEV__) {
  // Include debug utilities
  debugStyles = {
    ...stylesForSingleBreakpoints('debug-showAt', {
      outline: '2px solid red'
    })
  };
}

// Production: Only utilities actually used
// Webpack/Metro will tree-shake unused utilities automatically
```

## Best Practices

### ✅ DO: Use Generator Functions

```javascript
// Good: Use the generation functions for consistency
...stylesForSingleBreakpoints('myUtility', {
  transform: 'scale(1.1)'
})
```

### ✅ DO: Follow Naming Conventions

```javascript
// Good: Clear, consistent naming
...stylesForSingleBreakpoints('slideInAt', { transform: 'translateX(0)' })
...stylesForBreakpoints('card--compact', { padding: 8 })
```

### ❌ DON'T: Create Duplicate Utilities

```javascript
// Bad: Don't create utilities that already exist
...stylesForSingleBreakpoints('displayAt', { display: 'block' }) // showAt already exists
```

### ❌ DON'T: Hardcode Media Queries

```javascript
// Bad: Don't hardcode media queries
'my-component': {
  '@media screen and (min-width: 768px)': {
    display: 'block'
  }
}

// Good: Use the generation system
...stylesForSingleBreakpoints('my-component', {
  display: 'block'
})
```

The style generation system provides a powerful, maintainable way to create comprehensive responsive utilities while ensuring consistency and performance across your application.