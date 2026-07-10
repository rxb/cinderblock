# Content/Display Components

Content and Display components are responsible for presenting information, images, and structured content to users. These components handle typography, media display, and content organization.

---

## Text

The core typography component that handles all text rendering with semantic types and responsive behavior.

### Purpose
- All text rendering in the design system
- Semantic typography with proper accessibility
- Responsive text sizing
- Color and weight variations

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'body'` | Text type (`'pageHead'`, `'sectionHead'`, `'body'`, `'small'`, `'big'`, `'micro'`, `'hero'`, `'pageHeadKicker'`) |
| `color` | `string` | `'primary'` | Text color variant (`'primary'`, `'secondary'`, `'hint'`, `'tint'`) |
| `weight` | `string` | `null` | Font weight (`'strong'`) |
| `inverted` | `boolean` | `false` | Use inverted color scheme |
| `nowrap` | `boolean` | `false` | Prevent text wrapping |
| `chunk` | `boolean` | `false` | Add chunk-like spacing |
| `children` | `node` | `null` | Text content |

### Text Types

- **`hero`** - Oversized hero headings
- **`pageHead`** - Main page headings (H1 equivalent)
- **`pageHeadKicker`** - Small kicker text above a page heading
- **`sectionHead`** - Section headings (H2 equivalent)  
- **`body`** - Standard body text
- **`small`** - Smaller text for secondary content
- **`micro`** - Smallest text for fine print
- **`big`** - Larger text for emphasis

### Usage

```javascript
import { Text, Chunk, Section, Stripe } from '@cinderblock/design-system';

// Semantic headings
<Section>
  <Chunk>
    <Text type="pageHead">Main Page Title</Text>
  </Chunk>
  <Chunk>
    <Text type="sectionHead">Section Heading</Text>
  </Chunk>
  <Chunk>
    <Text>Regular body text with automatic responsive sizing.</Text>
  </Chunk>
</Section>

// Text variations
<Section>
  <Chunk>
    <Text weight="strong">Bold text for emphasis</Text>
  </Chunk>
  <Chunk>
    <Text color="secondary">Secondary colored text</Text>
  </Chunk>
  <Chunk>
    <Text type="small">Smaller text for captions</Text>
  </Chunk>
  <Chunk>
    <Text nowrap>This text will not wrap to next line</Text>
  </Chunk>
</Section>

// Inverted text for dark backgrounds
<Stripe style={{ backgroundColor: '#000' }}>
  <Section>
    <Chunk>
      <Text type="pageHead" inverted>Light text on dark background</Text>
    </Chunk>
  </Section>
</Stripe>
```

---

## Avatar

User profile image component with consistent sizing and circular styling.

### Purpose
- User profile images
- Consistent circular image display
- Multiple size options
- Fallback handling

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `string` | `'medium'` | Avatar size (`'xsmall'`, `'small'`, `'mid'`, `'medium'`, `'large'`, `'xlarge'`) |
| `source` | `object` | `null` | Image source (same as Image component) |
| `style` | `object` | `{}` | Additional styles |

### Usage

```javascript
import { Avatar, Chunk, Flex, FlexItem, Text } from '@cinderblock/design-system';

// Basic avatar
<Chunk>
  <Avatar 
    size="medium"
    source={{ uri: 'https://example.com/profile.jpg' }}
  />
</Chunk>

// Different sizes
<Flex>
  <FlexItem>
    <Avatar 
      size="small"
      source={{ uri: 'https://example.com/user1.jpg' }}
    />
  </FlexItem>
  <FlexItem>
    <Avatar 
      size="medium"
      source={{ uri: 'https://example.com/user2.jpg' }}
    />
  </FlexItem>
  <FlexItem>
    <Avatar 
      size="large"
      source={{ uri: 'https://example.com/user3.jpg' }}
    />
  </FlexItem>
</Flex>

// Avatar with text (common pattern)
<Flex>
  <FlexItem>
    <Avatar 
      size="medium"
      source={{ uri: 'https://example.com/john.jpg' }}
    />
  </FlexItem>
  <FlexItem>
    <Chunk>
      <Text weight="strong">John Doe</Text>
    </Chunk>
    <Chunk>
      <Text color="secondary">Software Developer</Text>
    </Chunk>
  </FlexItem>
</Flex>
```

---

## Icon

SVG icon component using the Feather icon library.

### Purpose
- Consistent icon rendering
- Feather icon library integration
- Scalable vector icons
- Color and size variations

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shape` | `string` | `null` | Icon name from Feather icons |
| `color` | `string` | theme `textSecondary` | Icon color |
| `size` | `string` | `'medium'` | Icon size (`'xsmall'`, `'small'`, `'medium'`, `'large'`, `'xlarge'`) |
| `style` | `object` | `{}` | Additional styles |

### Common Icon Shapes

Shape names are the PascalCase component names exported by [react-feather](https://github.com/feathericons/react-feather):

- `User`, `Users` - User/people icons
- `Home`, `Settings`, `Search` - Navigation icons
- `Edit`, `Trash`, `Save` - Action icons
- `ChevronDown`, `ChevronUp`, `ArrowRight` - Direction icons
- `Check`, `X`, `AlertCircle` - Status icons
- `Heart`, `Star`, `Bookmark` - Engagement icons

### Usage

```javascript
import { Icon, Button, Text, Chunk } from '@cinderblock/design-system';

// Basic icons
<Chunk>
  <Icon shape="User" />
  <Icon shape="Settings" />
  <Icon shape="Heart" />
</Chunk>

// Sized and colored icons
<Chunk>
  <Icon shape="Star" size="large" color="gold" />
  <Icon shape="Check" size="small" color="green" />
</Chunk>

// Icons in buttons
<Chunk>
  <Button onPress={handleSave}>
    <Icon shape="Save" /> Save
  </Button>
</Chunk>

// Icons with text
<Chunk>
  <Icon shape="User" />
  <Text>Profile</Text>
</Chunk>
```

---

## Picture

Responsive image component with consistent sizing behavior.

### Purpose
- Responsive image display
- Consistent image sizing
- Integration with design system
- Accessibility support

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `string`/`false` | `'medium'` | Predefined size variant (`'xsmall'`, `'small'`, `'medium'`, `'large'`, `'xlarge'`, or `false` for unconstrained) |
| `source` | `object` | `null` | Image source |
| `style` | `object` | `{}` | Additional styles |

### Usage

```javascript
import { Picture, Chunk, Text } from '@cinderblock/design-system';

// Basic image
<Chunk>
  <Picture 
    source={{ uri: 'https://example.com/photo.jpg' }}
    alt="Description of image"
  />
</Chunk>

// Sized image
<Chunk>
  <Picture 
    size="large"
    source={{ uri: 'https://example.com/hero.jpg' }}
    alt="Hero image"
  />
</Chunk>
```

---

## ImageRatio & ImageSnap

Specialized image components for specific layout needs.

### ImageRatio
Images with responsive heights maintained across breakpoints.

### ImageSnap  
Images that snap to specific sizing behaviors.

Both components take an `image` prop (a URL string, not a source object) and an optional `imageHeight` object with per-breakpoint heights (default `{small: 250, medium: 300, large: 350, xlarge: 450}`). Children are overlaid on the image.

### Usage

```javascript
import { ImageRatio, ImageSnap, Chunk } from '@cinderblock/design-system';

// Responsive-height image
<Chunk>
  <ImageRatio 
    image="https://example.com/video-thumbnail.jpg"
    imageHeight={{ small: 200, large: 350 }}
  />
</Chunk>

// Snap sizing image
<Chunk>
  <ImageSnap 
    image="https://example.com/product.jpg"
  />
</Chunk>
```

---

## Card

Content container component with optional shadows and borders.

### Purpose
- Content grouping and organization
- Visual hierarchy and separation
- Optional depth with shadows
- Consistent content containers

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shadow` | `boolean` | `false` | Add drop shadow |
| `style` | `object` | `{}` | Additional styles |
| `children` | `node` | `null` | Card content |

### Usage

```javascript
import { Card, Chunk, Text, Button } from '@cinderblock/design-system';

// Basic card
<Chunk>
  <Card>
    <Chunk>
      <Text type="sectionHead">Card Title</Text>
    </Chunk>
    <Chunk>
      <Text>Card content goes here...</Text>
    </Chunk>
    <Chunk>
      <Button>Card Action</Button>
    </Chunk>
  </Card>
</Chunk>

// Card with shadow
<Chunk>
  <Card shadow>
    <Chunk>
      <Text weight="strong">Featured Content</Text>
    </Chunk>
    <Chunk>
      <Text>This card has a drop shadow for emphasis.</Text>
    </Chunk>
  </Card>
</Chunk>
```

---

## List

Flexible list component supporting linear, grid, and scroll layouts with responsive behavior.

### Purpose
- Flexible list rendering
- Responsive layout switching
- Multiple display variants
- Pagination support

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string`/`object` | `'linear'` | List layout (`'linear'`, `'grid'`, `'scroll'`), or a responsive object like `{ small: 'scroll', large: 'grid' }` |
| `items` | `array` | `[]` | Array of items to render |
| `renderItem` | `function` | `item => item` | Item render function |
| `itemsInRow` | `object` | `{}` | Items per row for responsive breakpoints |
| `scrollItemWidth` | `number` | `null` | Width for scroll items |
| `paginated` | `boolean` | `false` | Enable pagination |
| `style` | `object` | `{}` | Additional styles |

### Usage

```javascript
import { List, Text, Card, Avatar } from '@cinderblock/design-system';

// Linear list
const users = [
  { id: 1, name: 'John Doe', role: 'Developer' },
  { id: 2, name: 'Jane Smith', role: 'Designer' },
  { id: 3, name: 'Bob Johnson', role: 'Manager' }
];

<List 
  variant="linear"
  items={users}
  renderItem={(user) => (
    <Card key={user.id}>
      <Text weight="strong">{user.name}</Text>
      <Text color="secondary">{user.role}</Text>
    </Card>
  )}
/>

// Grid list with responsive columns
<List 
  variant="grid"
  items={products}
  itemsInRow={{ small: 1, medium: 2, large: 3 }}
  renderItem={(product) => (
    <Card key={product.id}>
      <Picture source={{ uri: product.image }} />
      <Text weight="strong">{product.name}</Text>
      <Text>${product.price}</Text>
    </Card>
  )}
/>

// Horizontal scroll list
<List 
  variant="scroll"
  items={categories}
  scrollItemWidth={200}
  renderItem={(category) => (
    <Card key={category.id}>
      <Text>{category.name}</Text>
    </Card>
  )}
/>
```

---

## Header

Page and section header component with positioning options.

### Purpose
- Page-level headers
- Navigation headers
- Positioned header layouts
- Header styling consistency

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `string` | `'sticky'` | Header position (`'sticky'`, `'fixed'`, `'static'`, `'absolute'`) |
| `type` | `string` | `'separated'` | Header styling variant (e.g. `'separated'`, `'transparent'`) |
| `maxWidth` | `number` | `1100` | Maximum content width in pixels |
| `style` | `object` | `{}` | Additional styles |

### Usage

```javascript
import { Header, Text, Button, Flex, FlexItem } from '@cinderblock/design-system';

// Basic page header
<Header>
  <Flex justify="space-between" align="center">
    <FlexItem>
      <Text type="sectionHead">Page Title</Text>
    </FlexItem>
    <FlexItem>
      <Button>Action</Button>
    </FlexItem>
  </Flex>
</Header>

// Fixed header
<Header position="fixed">
  <Text type="pageHead">App Name</Text>
</Header>
```

---

## Link

Navigation link component using Next.js router for internal navigation.

### Purpose
- Internal navigation
- External links
- Router integration
- Consistent link styling

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `null` | Link destination |
| `onPress` | `function` | `null` | Additional callback to run on press |
| `target` | `string` | `null` | Link target (e.g. `'_blank'`) — disables router navigation |
| `children` | `node` | `null` | Link content |

### Usage

```javascript
import { Link, Text, Icon } from '@cinderblock/design-system';

// Internal navigation
<Link href="/about">
  <Text color="primary">About Us</Text>
</Link>

// Link with icon
<Link href="/profile">
  <Icon shape="User" />
  <Text>Profile</Text>
</Link>

// External link (opens in new tab, bypasses router)
<Link href="https://example.com" target="_blank">
  <Text>External Site</Text>
  <Icon shape="ExternalLink" />
</Link>
```

---

## Label

Form label component with proper accessibility and styling.

### Purpose
- Form field labels
- Accessible form labeling
- Consistent label styling
- Semantic form structure

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `'secondary'` | Label color |
| `style` | `object` | `{}` | Additional styles |
| `children` | `node` | `null` | Label text |

### Usage

```javascript
import { Label, TextInput, Chunk } from '@cinderblock/design-system';

// Form with labels
<Chunk>
  <Label>Full Name</Label>
  <TextInput placeholder="Enter your name" />
</Chunk>

<Chunk>
  <Label>Email Address</Label>
  <TextInput placeholder="your@email.com" />
</Chunk>
```

---

## Chip

Small tag-like UI elements for categories, labels, or status indicators.

### Purpose
- Tags and categories
- Status indicators
- Compact information display

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `null` | Text content of the chip |

### Usage

```javascript
import { Chip, Inline } from '@cinderblock/design-system';

// Tag list
<Inline>
  <Chip label="React" />
  <Chip label="JavaScript" />
  <Chip label="Design Systems" />
</Inline>
```

---

## Menu

Legacy dropdown menu component. **Deprecated** — prefer `Dropdowner`/`DropdownTouch`/`DropdownItem`, which provide centralized state management and better cross-platform support.

### Usage

```javascript
import { DropdownTouch, DropdownItem, Section, Text } from '@cinderblock/design-system';

// Recommended dropdown pattern
<DropdownTouch
  dropdown={
    <Section>
      <DropdownItem href="/profile">Profile</DropdownItem>
      <DropdownItem href="/settings">Settings</DropdownItem>
      <DropdownItem onPress={handleLogout}>Sign Out</DropdownItem>
    </Section>
  }
>
  <Text>User Menu</Text>
</DropdownTouch>
```

---

## Complete Content Example

Here's how content components work together to create a rich content layout:

```javascript
import { 
  Stripe,
  Bounds,
  Section,
  Chunk,
  Flex,
  FlexItem,
  Inline,
  Text,
  Avatar,
  Picture,
  Card,
  List,
  Link,
  Icon,
  Chip
} from '@cinderblock/design-system';

function ArticlePage() {
  const relatedArticles = [
    { id: 1, title: 'Getting Started', excerpt: 'Learn the basics...' },
    { id: 2, title: 'Advanced Topics', excerpt: 'Deep dive into...' },
    { id: 3, title: 'Best Practices', excerpt: 'Follow these guidelines...' }
  ];

  return (
    <>
      {/* Article Header */}
      <Stripe>
        <Bounds>
          <Section>
          <Chunk>
            <Text type="pageHead">How to Build Better Interfaces</Text>
          </Chunk>
          
          <Chunk>
            <Flex>
              <FlexItem>
                <Avatar 
                  size="small"
                  source={{ uri: 'https://example.com/author.jpg' }}
                />
              </FlexItem>
              <FlexItem>
                <Text weight="strong">Jane Smith</Text>
                <Text color="secondary">Published March 15, 2024</Text>
              </FlexItem>
            </Flex>
          </Chunk>

          <Chunk>
            <Inline>
              <Chip label="Design" />
              <Chip label="UI/UX" />
              <Chip label="Frontend" />
            </Inline>
          </Chunk>
          </Section>
        </Bounds>
      </Stripe>

      {/* Article Content */}
      <Stripe>
        <Bounds>
          <Section>
          <Chunk>
            <Picture 
              source={{ uri: 'https://example.com/article-hero.jpg' }}
              alt="Interface design example"
            />
          </Chunk>

          <Chunk>
            <Text>
              Building better interfaces requires understanding both user needs 
              and technical constraints. In this article, we'll explore...
            </Text>
          </Chunk>

          <Chunk>
            <Text type="sectionHead">Key Principles</Text>
          </Chunk>

          <Chunk>
            <Text>
              The foundation of good interface design rests on several 
              key principles that guide decision-making...
            </Text>
          </Chunk>
          </Section>
        </Bounds>
      </Stripe>

      {/* Related Articles */}
      <Stripe style={{ backgroundColor: '#f8f9fa' }}>
        <Bounds>
          <Section>
          <Chunk>
            <Text type="sectionHead">Related Articles</Text>
          </Chunk>
          
          <Chunk>
            <List 
              variant="grid"
              items={relatedArticles}
              itemsInRow={{ small: 1, medium: 2, large: 3 }}
              renderItem={(article) => (
                <Link href={`/articles/${article.id}`} key={article.id}>
                  <Card>
                    <Chunk>
                      <Text weight="strong">{article.title}</Text>
                    </Chunk>
                    <Chunk>
                      <Text color="secondary">{article.excerpt}</Text>
                    </Chunk>
                    <Chunk>
                      <Text color="primary">
                        Read more <Icon shape="ArrowRight" />
                      </Text>
                    </Chunk>
                  </Card>
                </Link>
              )}
            />
          </Chunk>
          </Section>
        </Bounds>
      </Stripe>
    </>
  );
}
```

This example shows how content components integrate seamlessly with structural components to create rich, accessible, and responsive content layouts that follow the design system's principles.