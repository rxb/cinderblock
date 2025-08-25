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
- Navigation (Header, Tabs, Dropdowner, etc.)
- Media components (Image, Avatar, Icon, etc.)
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
│   ├── rgb/             # Blog-specific components  
│   ├── ConnectedToaster.js    # Toast system integration
│   ├── ConnectedPrompter.js   # Modal system integration
│   └── ...              # Other connected components
├── pages/               # Next.js pages and routing
│   ├── index.js         # Homepage with blog posts
│   ├── about.js         # About page example
│   ├── articles/        # Dynamic blog post routing
│   └── categories/      # Category filtering
├── posts/               # MDX blog content
├── reducers/            # Redux state management
├── store/               # Redux store configuration
└── styles/              # Global styles and CSS modules
```

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
