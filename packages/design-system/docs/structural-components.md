# Structural Components

Structural components are the foundation of the Cinderblock Design System. They handle layout, spacing, and page structure, ensuring consistent positioning without the need for inline styles or manual spacing.

## Core Philosophy

**Space and positioning comes from structure, not from individual components.** Structural components create the hierarchy that governs how your content flows and appears on the page.

## The Structural Hierarchy

```
Page shell (metadata, global header/navigation, overlays)
└── Page-owned content
    ├── Stripe (major full-width visual region)
    │   └── Bounds (max-width constraint, directly under Stripe)
    │       ├── Section (one page-outline content group)
    │       │   ├── Chunk (element spacing)
    │       │   │   └── [Content components]
    │       │   └── Chunk
    │       │       └── [Content components]
    │       └── Section
    └── Stripe
```

The ordinary content path is **Stripe > Bounds > Section > Chunk**. Bounds
sits directly under Stripe and constrains content to a readable max-width. It
can be omitted for full-bleed content (a fullscreen photo or map) or app-like
layouts where the whole screen is a Flex/FlexItem shell.

Flex and FlexItem are layout adapters rather than additional hierarchy levels.
They may sit between structural levels when they arrange peer regions:

```
Stripe
└── Bounds
    └── Flex
        ├── FlexItem
        │   └── Section
        └── FlexItem
            └── Section
```

Each arranged region still keeps its own internal structural order.

## Page ownership versus the shared shell

A shared Page component or application shell should own only things that are
truly global:

- metadata and route-level concerns;
- the site or application header and navigation;
- global modals, prompts, dropdowns, toasts, and loading UI;
- the outer main-content landmark.

It should then render `children` directly. Individual pages own their Stripes,
Bounds, Sections, page title, and section headings:

```jsx
const Page = ({ title, children }) => (
  <View style={{ minHeight: '100vh', flex: 1 }}>
    <Head><title>{title}</title></Head>
    <SiteHeader />
    <View accessibilityRole="main">{children}</View>
    <AppOverlays />
  </View>
);

const PatientDetail = () => (
  <Page title="Patient">
    <Stripe>{/* page-owned title and primary content */}</Stripe>
    <Stripe>{/* optional second background or full-bleed region */}</Stripe>
  </Page>
);
```

Do not make the shell render one catch-all Stripe, Bounds, or Section around
every page. That makes multiple backgrounds, full-bleed content, and multiple
peer Sections awkward or impossible.

## Headings and Sections

Section is the structural counterpart to an H2-level content group; it is not
a heading by itself.

- A page with only a `pageHead` (H1) still has one Section.
- The first Section commonly contains the `pageHead`, introduction, and
  primary content without a `sectionHead`.
- Each additional peer `sectionHead` (H2) normally starts a new Section.
- Several unrelated H2-level groups should not be placed in one Section merely
  because they share a Stripe or background.
- When H2-level groups sit side by side at larger widths, place each Section
  inside its own FlexItem.

Section also supplies the page's vertical rhythm and horizontal inset. In the
current implementation the horizontal inset is created with margin rather
than padding, which matters when nesting Sections inside other layouts.

## Section is primary; Card is optional

Section is the normal unit of page content. Most pages can be composed entirely
from Stripes, Bounds, Sections, Chunks, and their leaf content without using a
Card at all.

Card adds a stronger visual and conceptual boundary. Use it when a group should
behave like an object:

- a selectable product, plan, article preview, or option;
- a draggable or independently arranged dashboard object;
- a summary with its own identity and actions;
- a deliberately unified callout that should be perceived as one thing.

Do not add a Card merely because content needs spacing, a background, or a place
to live. Ordinary instructions, paragraphs, forms, progress, page-level status,
and H2-level groups belong directly in their Section.

A Card does not replace Section. The ordinary form is simply:

```jsx
<Stripe>
  <Bounds>
    <Section>
      <Chunk><Text type="sectionHead">Account information</Text></Chunk>
      <Chunk><Text>Name, contact details, and preferences.</Text></Chunk>
      <Chunk><Button label="Edit account" /></Chunk>
    </Section>
  </Bounds>
</Stripe>
```

If that content later becomes a selectable preview, movable object, or
self-contained summary with its own actions, place the Card inside the existing
Section. Inside a Card, use Sectionless for interior padding. A card title
should use ordinary emphasized text unless it truly begins a new page-outline
section.

---

## Stripe

The largest page-owned structural container. It spans the full available width
and provides the visual background context for a major region.

### Purpose
- Creates major horizontal regions across the full page width
- Provides background styling, images, maps, or other full-bleed content
- Lets a page change visual context without coupling that decision to the
  shared application shell

A Stripe often accompanies a large content transition, but it does not require
a new heading. Heroes, full-bleed photos, maps, and responsive application
regions are all legitimate Stripes.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `image` | `string` | `null` | Background image URL |
| `border` | `boolean` | `false` | Add border styling |
| `imageHeight` | `object` | `{small: 225, medium: 325, large: 400, xlarge: 450}` | Responsive heights for background image |
| `imageFit` | `string` | `'cover'` | Cross-platform image scaling (`cover`, `contain`, `fill`, `none`, or `scale-down`) |
| `imagePosition` | `string \| object` | `'center'` | Cross-platform focal position, such as `'top'`, `'bottom right'`, or `{top: 0, left: '35%'}` |
| `imageStyle` | `object` | `{}` | Additional styles applied to the background image |
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

// Top-aligned hero image. Positioning behaves consistently on native and web.
<Stripe
  image="/hero.jpg"
  imagePosition="top"
  imageHeight={{ small: 300, large: 500 }}
>
  <Bounds>
    <Section>
      <Chunk><Text type="hero">Hero content</Text></Chunk>
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

H2-level content areas within Stripes, normally inside Bounds. Sections provide
the page's vertical rhythm, horizontal inset, and optional visual boundaries.

### Purpose
- Groups content that belongs to one page-outline level
- Provides vertical spacing, horizontal inset, and optional borders
- Holds a page H1 when no H2 is needed, or begins a peer H2-level group

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `border` | `boolean` | `false` | Add border around the entire section |
| `borderedContent` | `boolean` | `false` | Add top border to content (useful for lists) |
| `style` | `object` | `{}` | Additional styles |

### Usage

```javascript
// Page with an H1 and no H2
<Stripe>
  <Bounds>
    <Section>
      <Chunk>
        <Text type="pageHead">Account</Text>
      </Chunk>
      <Chunk>
        <Text>This page does not need an H2, but it still needs a Section.</Text>
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
    
    <Section>
      <Chunk>
        <Text type="sectionHead">Related Content</Text>
      </Chunk>
      <Chunk>
        <Text>Content belonging to this H2-level group.</Text>
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
| `align` | `string` | `'stretch'` | Align items |
| `flush` | `boolean` | `false` | Remove spacing between items |
| `nbsp` | `boolean` | `false` | Text-space-like spacing between items |
| `section` | `boolean` | `false` | Advanced Section-scale gutter; avoid for ordinary layouts |

### FlexItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shrink` | `boolean` | `false` | Shrink to content size |
| `growFactor` | `number` | `1` effectively | Explicit relative flex weight (`1`–`7`); plain items already use weight `1` |
| `justify` | `string` | `null` | Self justify |
| `align` | `string` | `null` | Self align |
| `flush` | `boolean` | `false` | Remove spacing around item |
| `nbsp` | `boolean` | `false` | Text-space-like spacing around item |
| `section` | `boolean` | `false` | Advanced Section-scale inset compensation |

### Usage

```javascript
// Equal columns: plain FlexItems already grow with equal weight
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

// Opposite-edge header content: shrink + flexible spacer + shrink
<Header>
  <Flex>
    <FlexItem shrink><Text weight="strong">Brand</Text></FlexItem>
    <FlexItem />
    <FlexItem shrink><Button>Account</Button></FlexItem>
  </Flex>
</Header>

// Explicit 1:2 ratio. Factors describe relative shares.
<Flex>
  <FlexItem growFactor={1}><Text>One third</Text></FlexItem>
  <FlexItem growFactor={2}><Text>Two thirds</Text></FlexItem>
</Flex>
```

### Sizing rules

- Plain FlexItems divide available space equally. `growFactor={1}` is therefore
  redundant unless it is paired with a different factor.
- Use `shrink` when an item should fit its content instead of taking an equal
  share.
- Place an empty plain `<FlexItem />` between two `shrink` items to push them
  to opposite edges.
- Use `growFactor` only to express an explicit ratio such as `1:2` or `2:3`.
- Use `shrink` rather than `growFactor={0}` for a non-growing item.
- `align="stretch"` is the effective default and normally does not need to be
  written.

### The advanced `section` gutter

The `section` prop on Flex and FlexItem changes the normal gutter to a much
larger, Section-scale inset. It exists for unusual layouts where Section's
horizontal inset interacts with the Flex gutter. It is not the normal way to
space cards, columns, label/value rows, or header content.

Start without `section`. Add it only after identifying a specific nested
Section spacing problem, and document that reason near the layout.

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
