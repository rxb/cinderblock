# Responsive Utilities

Cinderblock provides a comprehensive set of responsive utility classes that allow you to show, hide, and modify elements based on screen size. These utilities are automatically generated from the breakpoint system and provide a consistent, performant way to create responsive layouts.

## Overview

Responsive utilities follow a consistent naming pattern:
- **`utilityName__breakpoint`** - Apply utility at breakpoint and larger screens
- Available breakpoints: `small`, `medium`, `large`, `xlarge`

## Visibility Utilities

### Show At Breakpoint

Show elements starting at a specific breakpoint and larger.

| Utility | Breakpoint | Behavior |
|---------|------------|----------|
| `showAt__small` | 0px+ | Show on all screens |
| `showAt__medium` | 480px+ | Show on medium screens and up |
| `showAt__large` | 840px+ | Show on large screens and up |
| `showAt__xlarge` | 1024px+ | Show on extra large screens and up |

#### Usage

```javascript
import { View, ThemeContext } from '@cinderblock/design-system';

function ResponsiveNavigation() {
  const { styles, ids } = useContext(ThemeContext);
  
  return (
    <>
      {/* Desktop navigation - hidden by default, shows on large screens */}
      <View 
        style={styles['hide']}
        dataSet={{ media: ids["showAt__large"] }}
      >
        <DesktopNavigation />
      </View>
      
      {/* Mobile navigation - shows by default, hidden on large screens */}
      <View 
        style={styles['show']}
        dataSet={{ media: ids["hideAt__large"] }}
      >
        <MobileNavigation />
      </View>
    </>
  );
}
```

### Hide At Breakpoint

Hide elements starting at a specific breakpoint and larger.

| Utility | Breakpoint | Behavior |
|---------|------------|----------|
| `hideAt__small` | 0px+ | Hide on all screens |
| `hideAt__medium` | 480px+ | Hide on medium screens and up |
| `hideAt__large` | 840px+ | Hide on large screens and up |
| `hideAt__xlarge` | 1024px+ | Hide on extra large screens and up |

#### Usage

```javascript
function ResponsiveSidebar() {
  const { styles, ids } = useContext(ThemeContext);
  
  return (
    <View 
      style={styles['show']}
      dataSet={{ media: ids["hideAt__medium"] }}
    >
      {/* Sidebar shows on small screens, hides on medium and up */}
      <Sidebar />
    </View>
  );
}
```

## Layout Utilities

### Flex Direction

Control flex direction at different breakpoints.

| Utility | Breakpoint | Behavior |
|---------|------------|----------|
| `flex--row__small` | 0px+ | Row layout on small screens and up |
| `flex--row__medium` | 480px+ | Row layout on medium screens and up |
| `flex--row__large` | 840px+ | Row layout on large screens and up |
| `flex--column__small` | 0px+ | Column layout on small screens and up |
| `flex--column__medium` | 480px+ | Column layout on medium screens and up |
| `flex--column__large` | 840px+ | Column layout on large screens and up |

#### Usage

```javascript
function ResponsiveLayout() {
  const { styles, ids } = useContext(ThemeContext);
  
  return (
    <Flex 
      style={[styles['flex--column'], styles['flex--row__large']]}
      dataSet={{ media: ids["flex--row__large"] }}
    >
      <FlexItem>
        {/* Stacked on mobile, side-by-side on desktop */}
        <Text>Main Content</Text>
      </FlexItem>
      <FlexItem>
        <Text>Sidebar</Text>
      </FlexItem>
    </Flex>
  );
}
```

### Button Variants

Button behavior that changes at breakpoints.

| Utility | Breakpoint | Behavior |
|---------|------------|----------|
| `button--grow__medium` | 480px+ | Full-width button on medium screens and up |
| `button--shrink__large` | 840px+ | Auto-width button on large screens and up |
| `buttonText--iconOnly__small` | 0px+ | Hide button text, show only icon |

#### Usage

```javascript
function ResponsiveButton() {
  const { styles, ids } = useContext(ThemeContext);
  
  return (
    <Button 
      style={styles['button--grow']}
      dataSet={{ media: ids["button--grow__medium"] }}
    >
      <Icon shape="save" />
      <Text 
        style={styles['buttonText']}
        dataSet={{ media: ids["buttonText--iconOnly__small"] }}
      >
        Save Document
      </Text>
    </Button>
  );
}
```

## Component-Specific Utilities

### List Grid Items

Control how many items appear per row in grid lists.

| Utility | Description |
|---------|-------------|
| `list-item--grid--1__[breakpoint]` | 1 item per row |
| `list-item--grid--2__[breakpoint]` | 2 items per row |
| `list-item--grid--3__[breakpoint]` | 3 items per row |
| `list-item--grid--4__[breakpoint]` | 4 items per row |
| `list-item--grid--5__[breakpoint]` | 5 items per row |
| `list-item--grid--6__[breakpoint]` | 6 items per row |

#### Usage

```javascript
function ResponsiveGrid() {
  return (
    <List 
      variant="grid"
      itemsInRow={{ mobile: 1, tablet: 2, desktop: 4 }}
      items={products}
      renderItem={(product) => (
        <Card key={product.id}>
          <Picture source={{ uri: product.image }} />
          <Text>{product.name}</Text>
        </Card>
      )}
    />
  );
}
```

## Advanced Usage Patterns

### Progressive Disclosure

Show more information as screen size increases.

```javascript
function ProductCard({ product }) {
  const { styles, ids } = useContext(ThemeContext);
  
  return (
    <Card>
      <Chunk>
        <Picture source={{ uri: product.image }} />
      </Chunk>
      
      <Chunk>
        <Text weight="strong">{product.name}</Text>
      </Chunk>
      
      {/* Price always visible */}
      <Chunk>
        <Text type="big" color="primary">${product.price}</Text>
      </Chunk>
      
      {/* Description only on medium screens and up */}
      <View 
        style={styles['hide']}
        dataSet={{ media: ids["showAt__medium"] }}
      >
        <Chunk>
          <Text color="secondary">{product.description}</Text>
        </Chunk>
      </View>
      
      {/* Full details only on large screens and up */}
      <View 
        style={styles['hide']}
        dataSet={{ media: ids["showAt__large"] }}
      >
        <Chunk>
          <Text>SKU: {product.sku}</Text>
          <Text>In Stock: {product.inventory}</Text>
        </Chunk>
      </View>
    </Card>
  );
}
```

### Responsive Navigation Patterns

```javascript
function HeaderNavigation() {
  const { styles, ids } = useContext(ThemeContext);
  
  return (
    <Header>
      <Flex justify="space-between" align="center">
        <FlexItem>
          <Text type="sectionHead">Brand Logo</Text>
        </FlexItem>
        
        {/* Desktop menu */}
        <View 
          style={styles['hide']}
          dataSet={{ media: ids["showAt__large"] }}
        >
          <FlexItem>
            <Inline>
              <Link href="/"><Text>Home</Text></Link>
              <Link href="/about"><Text>About</Text></Link>
              <Link href="/contact"><Text>Contact</Text></Link>
              <Button color="primary">Sign Up</Button>
            </Inline>
          </FlexItem>
        </View>
        
        {/* Mobile menu button */}
        <View 
          style={styles['show']}
          dataSet={{ media: ids["hideAt__large"] }}
        >
          <FlexItem>
            <Button onPress={toggleMobileMenu}>
              <Icon shape="menu" />
            </Button>
          </FlexItem>
        </View>
      </Flex>
    </Header>
  );
}
```

### Adaptive Content Layout

```javascript
function ArticleLayout({ article }) {
  const { styles, ids } = useContext(ThemeContext);
  
  return (
    <Stripe>
      <Section>
        <Flex>
          {/* Main content */}
          <FlexItem>
            <Chunk>
              <Text type="pageHead">{article.title}</Text>
            </Chunk>
            <Chunk>
              <Text>{article.content}</Text>
            </Chunk>
          </FlexItem>
          
          {/* Sidebar - only shows on large screens */}
          <View 
            style={styles['hide']}
            dataSet={{ media: ids["showAt__large"] }}
          >
            <FlexItem shrink>
              <Card>
                <Chunk>
                  <Text type="sectionHead">Related Articles</Text>
                </Chunk>
                <Chunk>
                  <RelatedArticles />
                </Chunk>
              </Card>
            </FlexItem>
          </View>
        </Flex>
      </Section>
    </Stripe>
  );
}
```

## Debugging Utilities

### Check Applied Classes

Use browser dev tools to inspect which utility classes are applied:

```html
<!-- Element with responsive utilities -->
<div class="hide showAt__large_abc123">
  Desktop content
</div>
```

### CSS Output

The utilities generate CSS like this:

```css
.hide { display: none; }
.show { display: unset; }

@media screen and (min-width: 840px) {
  .showAt__large_abc123 { display: unset; }
}

@media screen and (min-width: 840px) {
  .hideAt__large_abc123 { display: none; }
}
```

## Best Practices

### ✅ DO: Combine with Default Styles

```javascript
// Good: Set default state, then override with utility
<View 
  style={styles['hide']}  // Default: hidden
  dataSet={{ media: ids["showAt__large"] }}  // Show on large screens
>
  Desktop navigation
</View>
```

### ✅ DO: Use Semantic Class Combinations

```javascript
// Good: Clear intent with meaningful combinations
<View 
  style={styles['show']}  // Default: visible
  dataSet={{ media: ids["hideAt__medium"] }}  // Hide on medium and up
>
  Mobile-only content
</View>
```

### ❌ DON'T: Overuse Utilities

```javascript
// Bad: Too many responsive utilities make code hard to follow
<View 
  style={[styles['hide'], styles['show']]}
  dataSet={{ 
    media: [
      ids["showAt__small"], 
      ids["hideAt__medium"], 
      ids["showAt__large"]
    ].join(' ')
  }}
>
  Complex visibility pattern - use component logic instead
</View>
```

### ✅ DO: Prefer Component Props When Available

```javascript
// Good: Use built-in responsive behavior
<Flex switchDirection={true}>
  <FlexItem>Content</FlexItem>
</Flex>

// Instead of manual utilities
<Flex 
  style={styles['flex--column']}
  dataSet={{ media: ids["flex--row__large"] }}
>
  <FlexItem>Content</FlexItem>
</Flex>
```

## Performance Notes

- **Zero runtime cost** - Utilities compile to CSS, no JavaScript overhead
- **Automatic deduplication** - Identical media queries are consolidated
- **Tree shaking** - Only utilities you use are included in the final CSS
- **Browser optimization** - Leverages native CSS media query performance

The responsive utility system provides a powerful way to create adaptive layouts while maintaining consistency with Cinderblock's structural hierarchy approach.