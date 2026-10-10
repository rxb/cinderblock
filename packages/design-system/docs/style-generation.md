# Style Generation System (maintainer doc)

> **Audience: library maintainers.** If you're *using* Cinderblock, you want
> [responsive-system.md](./responsive-system.md) — this file documents the
> internal pipeline that turns METRICS, SWATCHES, component relationships, and
> breakpoint definitions into generated styles.

Cinderblock generates its component styles and responsive utilities from a
shared style configuration. This keeps component geometry, themes, and
breakpoint behavior consistent without requiring callers to reproduce the
system's layout logic.

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

## METRICS are a system of relationships

Start with [How Cinderblock's spaces fit together](./composition-and-spacing.md)
for the component responsibility map, horizontal versus vertical ownership,
and composition contracts. This section explains how to preserve those
relationships while generating styles.

`METRICS` are inputs to `buildStyles`; they are not a list of unrelated CSS
values. `buildStyles` combines them into component geometry, including
equations that let Cinderblock components stack without callers having to
identify first children, last children, or currently visible children.

The central example is the relationship between `Section` and `Chunk`:

```javascript
section: {
  paddingTop: sectionSpace,
  paddingBottom: sectionSpace - chunkSpace,
},

chunk: {
  paddingBottom: chunkSpace,
},
```

A correctly structured Section ends in a Chunk, so its visible bottom space is:

```text
Section paddingBottom + final Chunk paddingBottom
= (sectionSpace - chunkSpace) + chunkSpace
= sectionSpace
```

The Section therefore has equal visible space above and below its content
without a `firstChild` or `lastChild` prop. Conditional rendering can remove
one Chunk or replace it with another without changing the spacing logic.

This is the Cinderblock construction model: components bring predictable
geometry and fit together by composition. A metric change is correct only when
the resulting equations still balance.

### Token values are not always visible distances

A token may represent one term in a larger equation. For example:

```text
visible Section edge = Section-owned space
visible peer-Section gap = previous Section edge + next Section edge
visible Stripe edge = Stripe padding + enclosed Section edge
```

This means `sectionSpace: 24` does not necessarily produce a single visible
24px gap everywhere. Read the surrounding component equation before changing
or documenting a metric.

### Compensating values must move together

Negative values, subtraction, addition, and fractional multipliers in
`buildStyles` often encode a compensation rather than an isolated visual
choice. Common patterns include:

```javascript
// The child gutter cancels the parent's negative outer offset.
list:     { marginLeft: -1 * gutter },
listItem: { paddingLeft: gutter },

// A one-pixel overlap prevents adjacent borders from doubling.
item: {
  marginTop: -1,
  borderTopWidth: 1,
},

// Extra overflow space is removed from document flow.
scroller: {
  paddingBottom: overflowAllowance,
  marginBottom: -1 * overflowAllowance,
},
```

Never change only one side of a compensating pair. If a new responsive value
is introduced, every term in the relationship must use the value for the same
breakpoint.

### Structural tokens and local component measurements

The active structural inputs are `METRICS.space` and `METRICS.spaceSection`.
Ordinary Flex gutters use `base`, while the `nbsp` gutter uses
`pseudoLineHeight`. `space` also appears in List gutters and local tabs,
header, menu, and toast measurements. `spaceSection` supplies both Section and
Stripe vertical space. Similar names do not guarantee the same dependencies:
the advanced `Flex section` gutter uses `space`, not `spaceSection`.

Propose a metric and its scope before assigning separate values to components.
Trace all its consumers and preserve existing responsibilities. A change that
splits a shared responsibility into independent metrics needs an explicit
reason; it is not merely a numeric adjustment. The extra Chunk/Stripe/gutter
metrics from the v2 experiment are archived and are not supported on main.

### Responsive equations

Main retains the original structural spacing. A possible extension,
`spaceSectionAtLarge`, is documented as a proposal in
[the composition guide](./composition-and-spacing.md#propose-inputs-then-derive-the-result).
It would retain the same equations at the large breakpoint, with `space`
remaining stable. For example, this partial illustration shows the Section
terms; a complete implementation must also handle Stripe, border variants,
and sparse Bounds:

```javascript
// Proposed example, not a currently implemented metric.
const space = METRICS.space;
const sectionSpace = METRICS.spaceSection;
const sectionSpaceAtLarge = METRICS.spaceSectionAtLarge ?? sectionSpace;

section: {
  paddingTop: sectionSpace,
  paddingBottom: sectionSpace - space,

  [MEDIA_QUERIES_SINGLE.large]: {
    paddingTop: sectionSpaceAtLarge,
    paddingBottom: sectionSpaceAtLarge - space,
  },
},

chunk: {
  paddingBottom: space,
},
```

Use an absent-value fallback so existing themes preserve their behavior, and
keep `sectionSpace >= space` wherever their difference becomes padding.
Generate the stylesheet again after changing metrics. Object spread evaluates
getters; rebind derived getters in theme overrides where their dependencies
change, as described in the composition guide.

Do not update only the most visible component. Search for every reference to
the original metric and determine whether it is:

1. another term in the same structural equation;
2. a paired negative/positive compensation;
3. a local component measurement that should remain stable; or
4. an accidental coupling that now deserves its own semantic variable.

Media-query styles also require the component to forward the generated
`ids[styleKey]` through its `dataSet.media` value. A responsive definition in
`buildStyles` will not affect React Native Web if its generated media ID never
reaches the rendered primitive.

### Spacing-change audit

Before changing `space`, `spaceSection`, or introducing responsive structural
metrics:

1. Search the original `buildStyles` for every reference to the affected
   metric.
2. Search for arithmetic expressions and negative values, especially `-1 *
   value`, `A - B`, `A + B`, and matching parent/child padding and margin.
3. Write down the visible equation before changing its terms.
4. Update all terms at every affected breakpoint.
5. Confirm that structural components forward their generated media IDs.
6. Verify at least these compositions:
   - one Section containing one Chunk;
   - one Section containing several Chunks;
   - consecutive peer Sections;
   - Sectionless containing one and several Chunks;
   - a Stripe containing Bounds and Section;
   - responsive Flex arrangements containing structurally wrapped content;
   - Lists or scrollers that use negative gutter compensation.
7. Test conditional content by removing the first, middle, and final logical
   item. The caller should not need positional spacing props to repair the
   result.

Useful invariants include:

```text
Section bottom padding + final Chunk padding = Section top padding
parent negative gutter + child positive gutter = zero outer offset
Stripe padding + Section edge = intended region edge
```

If one of these cannot be stated clearly, the spacing behavior probably needs
to be understood before its metrics are changed.

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

// Note: button variants (button--grow, button--shrink) use the ranged
// stylesForBreakpoints instead, since Button specifies a variant per breakpoint
```

### `stylesForBreakpoints(baseKey, styles, single)`

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

- **One-time generation** - All utilities are generated once when `buildStyles()` runs, then shared via ThemeContext
- **Deduplication** - Identical media queries are automatically consolidated
- **Note** - The full utility set is always generated; utilities are not tree-shaken per usage

### Memory Usage

- **Shared objects** - Common style objects are reused across utilities
- **CSS optimization** - React Native Web optimizes the generated CSS

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
