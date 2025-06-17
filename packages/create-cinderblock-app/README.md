# create-cinderblock-app

The official CLI for creating new projects with the [Cinderblock Design System](https://github.com/rxb/cinderblock).

## Quick Start

Create a new Cinderblock app in seconds:

```bash
npx create-cinderblock-app my-awesome-app
cd my-awesome-app
npm run dev
```

## Usage

### Interactive Mode (Recommended)

Run without arguments for an interactive setup:

```bash
npx create-cinderblock-app
```

You'll be prompted to:
- Choose a project name
- Select a template (Default, Blog, Dashboard)
- Pick a package manager (npm, yarn, pnpm)

### Command Line Arguments

You can also specify options directly:

```bash
# Basic usage
npx create-cinderblock-app my-app

# With specific template
npx create-cinderblock-app my-blog --template blog

# With package manager preference
npx create-cinderblock-app my-app --use-yarn

# All options
npx create-cinderblock-app my-dashboard --template dashboard --use-pnpm
```

### Available Options

| Option | Description | Default |
|--------|-------------|---------|
| `--template <name>` | Choose template: `default`, `blog` | `default` |
| `--use-npm` | Use npm for dependencies | Auto-detected |
| `--use-yarn` | Use yarn for dependencies | Auto-detected |
| `--use-pnpm` | Use pnpm for dependencies | Auto-detected |
| `--version` | Show version number | |
| `--help` | Show help information | |

## Templates

### Default Template

Basic Next.js starter with Cinderblock Design System integration.

**Includes:**
- Next.js 15 with React 19
- Cinderblock Design System components
- Pre-configured styling and theming
- Example pages and components
- Responsive layout examples

```bash
npx create-cinderblock-app my-app --template default
```

### Blog Template

Blog-focused template with MDX support and content management.

**Includes:**
- Everything from the default template
- MDX support for blog posts
- Category and tag system
- Date-based post organization
- Blog-specific page layouts

```bash
npx create-cinderblock-app my-blog --template blog
```

### Dashboard Template *(Coming Soon)*

Data-rich dashboard template with charts and analytics components.

**Will include:**
- Everything from the default template
- Dashboard layout components
- Chart and data visualization examples
- Form-heavy interfaces
- Admin panel patterns

## What You Get

Every Cinderblock app includes:

### 🏗️ Structural Hierarchy
```jsx
<Stripe>       // Full-width sections
  <Section>    // Content areas
    <Chunk>    // Element spacing
      <Text type="pageHead">Your Content</Text>
    </Chunk>
  </Section>
</Stripe>
```

### 🎨 Complete Component Library
- **Structural**: `Stripe`, `Section`, `Chunk`, `Flex`, `FlexItem`
- **UI**: `Button`, `TextInput`, `Modal`, `Tabs`, `CheckBox`
- **Content**: `Text`, `Avatar`, `Icon`, `Picture`, `List`, `Card`
- **Utility**: `LoadingBlock`, `RevealBlock`, `Bounce`, `useFormState`

### 📱 Responsive by Default
- Automatic layout switching on mobile
- Built-in media query support
- Responsive typography scaling
- Mobile-first approach

### ♿ Accessibility First
- Semantic HTML structure
- ARIA roles and properties
- Keyboard navigation support
- Screen reader compatibility

## Generated Project Structure

```
my-cinderblock-app/
├── pages/                 # Next.js pages
│   ├── _app.js           # App wrapper with theme
│   ├── _document.js      # HTML document structure
│   ├── index.js          # Homepage
│   └── api/              # API routes
├── components/           # Your custom components
│   ├── Page.js          # Page wrapper component
│   └── rgb/             # Template-specific components
├── public/              # Static assets
├── styles/              # Global styles
├── posts/               # Blog posts (blog template)
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
└── README.md           # Project documentation
```

## Available Scripts

In your created project, you can run:

### `npm run dev`
Runs the app in development mode on [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `.next` folder

### `npm start`
Runs the built app in production mode

### `npm run lint`
Runs ESLint to catch code issues

## Next Steps

After creating your project:

1. **Explore the components** - Check out the example pages to see Cinderblock components in action
2. **Read the docs** - Visit the [Cinderblock documentation](https://github.com/rxb/cinderblock/tree/main/packages/design-system/docs)
3. **Start building** - Replace the example content with your own
4. **Learn the hierarchy** - Understand the Stripe > Section > Chunk pattern
5. **Customize the theme** - Modify the design constants to match your brand

## Example: Building Your First Page

```jsx
import { 
  Stripe, 
  Section, 
  Chunk, 
  Flex, 
  FlexItem,
  Text, 
  Button, 
  Card 
} from '@cinderblock/design-system';

export default function MyPage() {
  return (
    <>
      {/* Hero Section */}
      <Stripe>
        <Section>
          <Chunk>
            <Text type="pageHead">Welcome to My App</Text>
          </Chunk>
          <Chunk>
            <Text>Start building amazing interfaces with Cinderblock.</Text>
          </Chunk>
          <Chunk>
            <Button color="primary">Get Started</Button>
          </Chunk>
        </Section>
      </Stripe>

      {/* Features Section */}
      <Stripe style={{ backgroundColor: '#f8f9fa' }}>
        <Section>
          <Chunk>
            <Text type="sectionHead">Features</Text>
          </Chunk>
          <Chunk>
            <Flex switchDirection={true}>
              <FlexItem>
                <Card>
                  <Chunk>
                    <Text weight="strong">Structural</Text>
                  </Chunk>
                  <Chunk>
                    <Text>Layout comes from hierarchy, not inline styles.</Text>
                  </Chunk>
                </Card>
              </FlexItem>
              <FlexItem>
                <Card>
                  <Chunk>
                    <Text weight="strong">Responsive</Text>
                  </Chunk>
                  <Chunk>
                    <Text>Built-in responsive behavior on all components.</Text>
                  </Chunk>
                </Card>
              </FlexItem>
            </Flex>
          </Chunk>
        </Section>
      </Stripe>
    </>
  );
}
```

## Troubleshooting

### Common Issues

**"Package not found" errors:**
- Make sure you're using `npx create-cinderblock-app` (not `npm create`)
- Check your internet connection
- Try clearing npm cache: `npm cache clean --force`

**Template not found:**
- Verify the template name is correct (`default`, `blog`)
- Try running without the `--template` flag to use interactive mode

**Permission errors:**
- On macOS/Linux, you might need to prefix with `sudo`
- Check that you have write permissions in the current directory

**Dependency installation fails:**
- Check your Node.js version (requires Node 16+)
- Try using a different package manager (`--use-yarn` or `--use-pnpm`)
- Clear package manager cache

### Getting Help

- 📖 [Cinderblock Documentation](https://github.com/rxb/cinderblock/tree/main/packages/design-system/docs)
- 🐛 [Report Issues](https://github.com/rxb/cinderblock/issues)
- 💬 [Discussions](https://github.com/rxb/cinderblock/discussions)

## Contributing

We welcome contributions! Please see our [contributing guide](https://github.com/rxb/cinderblock/blob/main/CONTRIBUTING.md) for details.

## License

ISC

---

Created with ❤️ by the Cinderblock team