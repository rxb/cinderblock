# Structural Components

Structural components are the foundation of the Cinderblock Design System. They handle layout, spacing, and page structure, ensuring consistent positioning without the need for inline styles or manual spacing.

## Core Philosophy

**Space and positioning comes from structure, not from individual components.** Structural components create the hierarchy that governs how your content flows and appears on the page.

## The Structural Hierarchy

```
Page (your app wrapper)
├── Stripe (full-width sections)
│   └── Bounds (max-width constraint, directly under Stripe)
│       ├── Section (content areas)
│       │   ├── Chunk (element spacing)
│       │   │   └── [Content components]
│       │   └── Chunk
│       │       └── [Content components]
│       └── Section
└── Stripe
```

Bounds sits directly under Stripe and constrains content to a readable max-width. It can be legitimately omitted for full-bleed content (a fullscreen photo or map) or app-like layouts where the whole screen is a Flex/FlexItem shell — but for a normal page skeleton, the hierarchy is **Stripe > Bounds > Section > Chunk**.

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
| `image` | `string` | `null` | Background image URL |
| `border` | `boolean` | `false` | Add border styling |
| `imageHeight` | `object` | `{small: 225, medium: 325, large: 400, xlarge: 450}` | Responsive heights for background image |
| `style` | `object` | `{}` | Additional styles |

### Usage

```javascript
import { Stripe, Bounds, Section, Chunk, Text } from '@cinderblock/design-system';

// Basic stripe
<Stripe>
  <Bounds>
    <Section>
      <Chunk>
        <Text type="pageHead">Main Content</Text>
      </Chunk>
    </Section>
  </Bounds>
</Stripe>

// Stripe with background color
<Stripe style={{ backgroundColor: '#f5f5f5' }}>
  <Bounds>
    <Section>
      <Chunk>
        <Text>Content on gray background</Text>
      </Chunk>
    </Section>
  </Bounds>
</Stripe>

// Multiple stripes for different sections
<>
  <Stripe>
    <Bounds>
      <Section>
        <Chunk>
          <Text type="pageHead">Hero Section</Text>
        </Chunk>
      </Section>
    </Bounds>
  </Stripe>
  
  <Stripe style={{ backgroundColor: '#000' }}>
    <Bounds>
      <Section>
        <Chunk>
          <Text type="sectionHead" inverted>Dark Section</Text>
        </Chunk>
      </Section>
    </Bounds>
  </Stripe>
</>
```

---

## Section

Content areas within Stripes (inside Bounds). Sections provide the content boundaries and can have their own styling.

### Purpose
- Defines content areas within stripes
- Provides content boundaries and optional borders
- Semantic sectioning (like HTML `<section>`)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `border` | `boolean` | `false` | Add border around the entire section |
| `borderedContent` | `boolean` | `false` | Add top border to content (useful for lists) |
| `style` | `object` | `{}` | Additional styles |

### Usage

```javascript
// Basic section
<Stripe>
  <Bounds>
    <Section>
      <Chunk>
        <Text>Content in a section</Text>
      </Chunk>
    </Section>
  </Bounds>
</Stripe>

// Multiple sections in one stripe
<Stripe>
  <Bounds>
    <Section>
      <Chunk>
        <Text type="pageHead">Main Content</Text>
      </Chunk>
    </Section>
    
    <Section border>
      <Chunk>
        <Text type="sectionHead">Related Content</Text>
      </Chunk>
    </Section>
  </Bounds>
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
| `border` | `boolean` | `false` | Add border styling |

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
| `direction` | `string` | `'row'` | Starting flex direction (`'row'`, `'column'`) |
| `switchDirection` | `string` | `null` | Breakpoint name at which direction switches (`'small'`, `'medium'`, `'large'`, `'xlarge'`) |
| `reverseDirection` | `boolean` | `false` | Reverse the starting direction |
| `reverseSwitchDirection` | `boolean` | `false` | Reverse the switched direction |
| `wrap` | `boolean` | `false` | Allow wrapping |
| `justify` | `string` | `null` | Justify content |
| `align` | `string` | `null` | Align items |
| `flush` | `boolean` | `false` | Remove spacing between items |
| `nbsp` | `boolean` | `false` | Text-space-like spacing between items |
| `section` | `boolean` | `false` | Section-like spacing between items |

### FlexItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shrink` | `boolean` | `false` | Shrink to content size |
| `growFactor` | `number` | `null` | Flex grow factor (`0`–`7`) |
| `justify` | `string` | `null` | Self justify |
| `align` | `string` | `null` | Self align |
| `flush` | `boolean` | `false` | Remove spacing around item |
| `nbsp` | `boolean` | `false` | Text-space-like spacing around item |
| `section` | `boolean` | `false` | Section-like spacing around item |

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

// Responsive flex that switches direction at the medium breakpoint
<Section>
  <Chunk>
    <Flex switchDirection="medium">
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

Content width constraints that control the maximum width of content for better readability. Bounds sits directly under Stripe and wraps Sections: **Stripe > Bounds > Section > Chunk**. Omit Bounds only for full-bleed content (fullscreen photo, map) or app-like Flex/FlexItem screen shells.

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
| `sparse` | `boolean` | `false` | Sparse layout with layered background effects (hero sections, callouts) |
| `sparseBackgroundStyle` | `object` | `null` | Additional styles for the sparse background layer |
| `style` | `object` | `{}` | Additional styles |

### Usage

```javascript
// Constrain content width for better readability
<Stripe>
  <Bounds>
    <Section>
      <Chunk>
        <Text type="pageHead">Article Title</Text>
      </Chunk>
      <Chunk>
        <Text>This long article content will be constrained to an optimal reading width...</Text>
      </Chunk>
    </Section>
  </Bounds>
</Stripe>

// Different width constraints
<Stripe>
  <Bounds small>
    <Section>
      <Chunk>
        <Text>Narrow content</Text>
      </Chunk>
    </Section>
  </Bounds>
</Stripe>

<Stripe>
  <Bounds large>
    <Section>
      <Chunk>
        <Text>Wide content</Text>
      </Chunk>
    </Section>
  </Bounds>
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
| `noBorder` | `boolean` | `false` | Legacy prop for border control (unused) |
| `style` | `object` | `{}` | Additional styles |

### Usage

```javascript
// Alternative container (e.g. inside a Card or Modal)
<Card>
  <Sectionless>
    <Chunk>
      <Text>Content without section styling</Text>
    </Chunk>
  </Sectionless>
</Card>
```

---

## Complete Example

Here's how structural components work together to create a complete page layout:

```javascript
import { 
  Stripe, 
  Bounds, 
  Section, 
  Chunk, 
  Flex, 
  FlexItem, 
  Text, 
  Button, 
  Avatar 
} from '@cinderblock/design-system';

function ExamplePage() {
  return (
    <>
      {/* Hero Section */}
      <Stripe>
        <Bounds>
          <Section>
            <Chunk>
              <Text type="pageHead">Welcome to Our App</Text>
            </Chunk>
            <Chunk>
              <Text>This is the hero section with constrained width for better readability.</Text>
            </Chunk>
            <Chunk>
              <Button color="primary">Get Started</Button>
            </Chunk>
          </Section>
        </Bounds>
      </Stripe>

      {/* Feature Section */}
      <Stripe style={{ backgroundColor: '#f8f9fa' }}>
        <Bounds>
          <Section>
            <Chunk>
              <Text type="sectionHead">Features</Text>
            </Chunk>
            <Chunk>
              <Flex switchDirection="medium">
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
        </Bounds>
      </Stripe>

      {/* Team Section */}
      <Stripe>
        <Bounds>
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
        </Bounds>
      </Stripe>
    </>
  );
}
```

This example demonstrates how structural components create a complete page layout with proper spacing, responsive behavior, and semantic structure—all without any inline styling or manual spacing calculations.