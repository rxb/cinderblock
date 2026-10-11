# Cinderblock Next.js Kitchensink

A comprehensive demonstration and playground for the Cinderblock Design System components and patterns.

## Purpose

This project showcases **all** features, components, and patterns available in the Cinderblock Design System. It serves as:

- **Component Gallery**: Interactive examples of every design system component
- **Pattern Library**: Common UI patterns and combinations 
- **Feature Showcase**: Advanced functionality like responsive design, animations, forms
- **Development Reference**: Real-world usage examples for developers
- **Design Documentation**: Visual reference for designers and stakeholders

## What's Included

### 🎨 **All Design System Components**
- Layout components (Section, Chunk, Flex, etc.)
- Typography and text styling
- Interactive elements (Button, Touch, Link, etc.)
- Form components (TextInput, CheckBox, Picker, etc.)
- Navigation (NavBar, Tabs, Popover, etc.)
- Media components (Image, Avatar, Icon, etc.)
- Cross-platform image-backed Stripe with explicit fit and focal positioning
- Feedback components (Modal, Toast, Prompter, etc.)
- Animation components (Bounce, RevealBlock, etc.)

### 📱 **Responsive Design Patterns**
- Mobile-first responsive layouts
- Breakpoint demonstrations
- Media query context usage
- Adaptive component behavior

### 🔧 **Advanced Features**
- Redux state management integration
- MDX blog functionality with dynamic routing
- File upload and photo management
- Drag-and-drop reordering
- Form validation patterns
- Authentication flows
- API integration examples

### 🎬 **Interactive Demonstrations**
- Live component playground
- Real-time responsive preview
- Interactive configuration panels
- Copy-paste code examples

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
├── components/           # Cinderblock component integrations
│   ├── rgb/             # Blog-specific components (Layout uses NavBar)
│   ├── Page.js          # Page shell: head tags, route and resize cleanup
│   └── LayerHost.js     # Renders prompts and toasts from layer state
├── pages/               # Next.js pages and routing
│   ├── index.js         # Homepage with blog posts
│   ├── about.js         # About page example
│   ├── articles/        # Dynamic blog post routing
│   └── categories/      # Category filtering
├── posts/               # MDX blog content
├── reducers/            # Redux state (layers come from Cinderblock's layersReducer)
├── store/               # Redux store configuration
└── styles/              # Global styles and CSS modules
```

## Global layers

Modals, prompts, toasts, and popovers follow Cinderblock's layer policy
(`@cinderblock/design-system/layers`): one popover open at a time, opening a
prompt closes it, and route changes clear transient layers. This starter is
the reference wiring:

- `reducers/index.js` mounts `layersReducer` at `state.layers`.
- `actions/index.js` wraps `layerActions` with id-generating helpers
  (`addToast`, `openPrompt`, `openPopover`, `closePopover`).
- `components/LayerHost.js` maps each prompt `kind` to its content, so the
  store holds only serializable records.
- `components/Page.js` dispatches `closeTransientLayers` on route changes and
  `closePositionedLayers` on resize.
- `components/rgb/Layout.js` (NavBar menus) and `pages/recipes/detail.js`
  (a Popover action menu that opens a prompt) read the open popover from the
  store.

See the design system's `docs/global-layer-state.md` for the full policy.

## Comparison with nextjs-starter

| Feature | nextjs-starter | nextjs-kitchensink |
|---------|---------------|-------------------|
| **Purpose** | Clean starting point | Comprehensive showcase |
| **Complexity** | Minimal, essential setup | Full-featured demonstration |
| **Components** | Basic examples | All components showcased |
| **Features** | Core functionality only | Advanced patterns & integrations |
| **Use Case** | New project foundation | Learning & reference |

## For New Projects

If you're starting a new project, consider using the minimal `nextjs-starter` or the `create-cinderblock-app` CLI:

```bash
npx create-cinderblock-app my-project --template default
```

This kitchensink is ideal for:
- Learning the design system
- Testing component combinations  
- Reference implementation examples
- Design system documentation
- Component development and testing

## Learn More

- [Cinderblock Design System](https://github.com/rxb/cinderblock)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
