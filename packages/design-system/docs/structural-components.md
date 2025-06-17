# Structural Components

Structural components are the foundation of the Cinderblock Design System. They handle layout, spacing, and page structure, ensuring consistent positioning without the need for inline styles or manual spacing.

## Core Philosophy

**Space and positioning comes from structure, not from individual components.** Structural components create the hierarchy that governs how your content flows and appears on the page.

## The Structural Hierarchy

```
Page (your app wrapper)
├── Stripe (full-width sections)
│   ├── Section (content areas)
│   │   ├── Chunk (element spacing)
│   │   │   └── [Content components]
│   │   └── Chunk
│   │       └── [Content components]
│   └── Section
└── Stripe
```

---

## Stripe

The outermost structural container. Goes edge-to-edge of the screen and provides the background context for your content.

### Purpose
- Creates horizontal sections across the full page width
- Provides background styling and context
- Acts as the main sectioning element (like HTML `<article>`)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `image` | `object` | `null` | Background image source |
| `border` | `string` | `null` | Border style (`'top'`, `'bottom'`, `'both'`) |
| `imageHeight` | `number` | `null` | Height for background image |
| `style` | `object` | `{}` | Additional styles |

### Usage

```javascript
import { Stripe, Section, Chunk, Text } from '@cinderblock/design-system';

// Basic stripe
<Stripe>
  <Section>
    <Chunk>
      <Text type="pageHead">Main Content</Text>
    </Chunk>
  </Section>
</Stripe>

// Stripe with background color
<Stripe style={{ backgroundColor: '#f5f5f5' }}>
  <Section>
    <Chunk>
      <Text>Content on gray background</Text>
    </Chunk>
  </Section>
</Stripe>

// Multiple stripes for different sections
<>
  <Stripe>
    <Section>
      <Chunk>
        <Text type="pageHead">Hero Section</Text>
      </Chunk>
    </Section>
  </Stripe>
  
  <Stripe style={{ backgroundColor: '#000', color: '#fff' }}>
    <Section>
      <Chunk>
        <Text type="sectionHead">Dark Section</Text>
      </Chunk>
    </Section>
  </Stripe>
</>
```

---

## Section

Content areas within Stripes. Sections provide the content boundaries and can have their own styling.

### Purpose
- Defines content areas within stripes
- Provides content boundaries and optional borders
- Semantic sectioning (like HTML `<section>`)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `border` | `string` | `null` | Border style (`'top'`, `'bottom'`, `'both'`) |
| `borderedContent` | `boolean` | `false` | Whether content has borders |
| `style` | `object` | `{}` | Additional styles |

### Usage

```javascript
// Basic section
<Stripe>
  <Section>
    <Chunk>
      <Text>Content in a section</Text>
    </Chunk>
  </Section>
</Stripe>

// Multiple sections in one stripe
<Stripe>
  <Section>
    <Chunk>
      <Text type="pageHead">Main Content</Text>
    </Chunk>
  </Section>
  
  <Section border="top">
    <Chunk>
      <Text type="sectionHead">Related Content</Text>
    </Chunk>
  </Section>
</Stripe>
```

---

## Chunk

The spacing component that prevents elements from touching each other. This is the core spacing unit of the design system.

### Purpose
- Provides consistent spacing between elements
- Prevents elements from touching each other
- Creates the vertical rhythm of the page

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inline` | `boolean` | `false` | Whether to display inline |
| `style` | `object` | `{}` | Additional styles |
| `border` | `string` | `null` | Border style |

### Usage

```javascript
// Basic chunk usage - each content element gets its own chunk
<Section>
  <Chunk>
    <Text type="pageHead">Page Title</Text>
  </Chunk>
  <Chunk>
    <Text>First paragraph with proper spacing.</Text>
  </Chunk>
  <Chunk>
    <Text>Second paragraph with proper spacing.</Text>
  </Chunk>
  <Chunk>
    <Button>Call to Action</Button>
  </Chunk>
</Section>

// Inline chunks for horizontal spacing
<Section>
  <Chunk>
    <Chunk inline>
      <Button>Cancel</Button>
    </Chunk>
    <Chunk inline>
      <Button color="primary">Save</Button>
    </Chunk>
  </Chunk>
</Section>
```

---

## Flex & FlexItem

Flexible layout components for creating responsive row/column layouts.

### Flex Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `string` | `'row'` | Flex direction (`'row'`, `'column'`) |
| `switchDirection` | `boolean` | `false` | Switch to column on mobile |
| `wrap` | `boolean` | `false` | Allow wrapping |
| `justify` | `string` | `'flex-start'` | Justify content |
| `align` | `string` | `'stretch'` | Align items |
| `flush` | `boolean` | `false` | Remove padding |
| `section` | `boolean` | `false` | Add section-level styling |

### FlexItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shrink` | `boolean` | `false` | Allow shrinking |
| `growFactor` | `number` | `1` | Flex grow factor |
| `justify` | `string` | `null` | Self justify |
| `align` | `string` | `null` | Self align |
| `flush` | `boolean` | `false` | Remove padding |

### Usage

```javascript
// Basic flex layout
<Section>
  <Chunk>
    <Flex>
      <FlexItem>
        <Avatar source={{ uri: 'https://example.com/avatar.jpg' }} />
      </FlexItem>
      <FlexItem>
        <Text weight="strong">John Doe</Text>
        <Text>Software Developer</Text>
      </FlexItem>
    </Flex>
  </Chunk>
</Section>

// Responsive flex that switches to column on mobile
<Section>
  <Chunk>
    <Flex switchDirection={true}>
      <FlexItem>
        <Text type="sectionHead">Main Content</Text>
        <Text>Primary content area</Text>
      </FlexItem>
      <FlexItem>
        <Text type="sectionHead">Sidebar</Text>
        <Text>Secondary content</Text>
      </FlexItem>
    </Flex>
  </Chunk>
</Section>

// Justified flex layout
<Section>
  <Chunk>
    <Flex justify="space-between" align="center">
      <FlexItem>
        <Text type="sectionHead">Title</Text>
      </FlexItem>
      <FlexItem>
        <Button>Action</Button>
      </FlexItem>
    </Flex>
  </Chunk>
</Section>
```

---

## Bounds

Content width constraints that control the maximum width of content for better readability.

### Purpose
- Constrains content width for optimal readability
- Provides different content width options
- Centers content horizontally

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `large` | `boolean` | `false` | Large content width |
| `medium` | `boolean` | `false` | Medium content width |
| `small` | `boolean` | `false` | Small content width |
| `sparse` | `boolean` | `false` | Extra spacing |
| `style` | `object` | `{}` | Additional styles |

### Usage

```javascript
// Constrain content width for better readability
<Stripe>
  <Section>
    <Bounds>
      <Chunk>
        <Text type="pageHead">Article Title</Text>
      </Chunk>
      <Chunk>
        <Text>This long article content will be constrained to an optimal reading width...</Text>
      </Chunk>
    </Bounds>
  </Section>
</Stripe>

// Different width constraints
<Stripe>
  <Section>
    <Bounds small>
      <Chunk>
        <Text>Narrow content</Text>
      </Chunk>
    </Bounds>
  </Section>
</Stripe>

<Stripe>
  <Section>
    <Bounds large>
      <Chunk>
        <Text>Wide content</Text>
      </Chunk>
    </Bounds>
  </Section>
</Stripe>
```

---

## Inline

Creates inline-like behavior using flexbox for horizontal layouts.

### Purpose
- Simulates inline behavior with flexbox
- Provides horizontal layout without manual spacing
- Handles wrapping and alignment

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `nowrap` | `boolean` | `false` | Prevent wrapping |
| `style` | `object` | `{}` | Additional styles |

### Usage

```javascript
// Inline layout for form elements
<Section>
  <Chunk>
    <Inline>
      <Label>Name:</Label>
      <TextInput placeholder="Enter your name" />
    </Inline>
  </Chunk>
</Section>

// Inline layout for buttons
<Section>
  <Chunk>
    <Inline>
      <Button>Cancel</Button>
      <Button color="primary">Save</Button>
      <Button>Delete</Button>
    </Inline>
  </Chunk>
</Section>
```

---

## Sectionless

Alternative container component that provides layout without section-specific styling.

### Purpose
- Container without section semantics
- Alternative to Section for special layouts
- Provides layout structure without section boundaries

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isFirstChild` | `boolean` | `false` | Whether this is the first child |
| `noBorder` | `boolean` | `false` | Remove borders |
| `style` | `object` | `{}` | Additional styles |

### Usage

```javascript
// Alternative container
<Stripe>
  <Sectionless>
    <Chunk>
      <Text>Content without section styling</Text>
    </Chunk>
  </Sectionless>
</Stripe>
```

---

## Complete Example

Here's how structural components work together to create a complete page layout:

```javascript
import { 
  Stripe, 
  Section, 
  Chunk, 
  Flex, 
  FlexItem, 
  Bounds, 
  Text, 
  Button, 
  Avatar 
} from '@cinderblock/design-system';

function ExamplePage() {
  return (
    <>
      {/* Hero Section */}
      <Stripe>
        <Section>
          <Bounds>
            <Chunk>
              <Text type="pageHead">Welcome to Our App</Text>
            </Chunk>
            <Chunk>
              <Text>This is the hero section with constrained width for better readability.</Text>
            </Chunk>
            <Chunk>
              <Button color="primary">Get Started</Button>
            </Chunk>
          </Bounds>
        </Section>
      </Stripe>

      {/* Feature Section */}
      <Stripe style={{ backgroundColor: '#f8f9fa' }}>
        <Section>
          <Chunk>
            <Text type="sectionHead">Features</Text>
          </Chunk>
          <Chunk>
            <Flex switchDirection={true}>
              <FlexItem>
                <Chunk>
                  <Text weight="strong">Easy to Use</Text>
                </Chunk>
                <Chunk>
                  <Text>Simple and intuitive interface.</Text>
                </Chunk>
              </FlexItem>
              <FlexItem>
                <Chunk>
                  <Text weight="strong">Responsive</Text>
                </Chunk>
                <Chunk>
                  <Text>Works on all devices.</Text>
                </Chunk>
              </FlexItem>
            </Flex>
          </Chunk>
        </Section>
      </Stripe>

      {/* Team Section */}
      <Stripe>
        <Section>
          <Chunk>
            <Text type="sectionHead">Our Team</Text>
          </Chunk>
          <Chunk>
            <Flex>
              <FlexItem>
                <Avatar source={{ uri: 'https://example.com/team1.jpg' }} />
              </FlexItem>
              <FlexItem>
                <Chunk>
                  <Text weight="strong">Jane Doe</Text>
                </Chunk>
                <Chunk>
                  <Text>Lead Developer</Text>
                </Chunk>
              </FlexItem>
            </Flex>
          </Chunk>
        </Section>
      </Stripe>
    </>
  );
}
```

This example demonstrates how structural components create a complete page layout with proper spacing, responsive behavior, and semantic structure—all without any inline styling or manual spacing calculations.