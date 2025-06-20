# Cinderblock Next.js Starter

A minimal, clean starting point for building modern web applications with the Cinderblock Design System and Next.js.

## Purpose

This starter provides the essential foundation for new projects without the complexity of advanced features or demos. It's designed to get you building quickly with a clean, understandable codebase.

## What's Included

### ⚡ **Essential Setup**
- Next.js 15 with React 19
- Cinderblock Design System integration
- Optimized Babel configuration for React Native Web
- Clean, minimal project structure

### 🎨 **Basic Components**
- Header navigation example
- Responsive layout patterns
- Form component demonstration
- Card-based content sections

### 📱 **Production Ready**
- Optimized build configuration
- Responsive design patterns
- Accessible component usage
- Clean code structure

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
├── pages/
│   ├── _app.js          # App configuration with design system
│   ├── _document.js     # HTML document setup
│   ├── index.js         # Homepage
│   ├── about.js         # Example page
│   └── api/hello.js     # API route example
├── public/              # Static assets
├── styles/              # Global styles
├── next.config.js       # Next.js configuration
└── jsconfig.json        # JavaScript configuration
```

## Customization

### Update the Homepage
Edit `pages/index.js` to customize the main landing page with your content.

### Add New Pages
Create new files in the `pages/` directory. Next.js automatically creates routes based on the file structure.

### Styling
The project uses the Cinderblock Design System for styling. Global styles can be added to `styles/globals.css`.

## Comparison with Kitchensink

| Feature | nextjs-starter | nextjs-kitchensink |
|---------|----------------|-------------------|
| **Complexity** | Minimal, clean slate | Full-featured showcase |
| **Purpose** | Project foundation | Learning & reference |
| **Components** | Essential examples | Comprehensive gallery |
| **Dependencies** | Core packages only | Advanced integrations |
| **Setup Time** | Immediate | Exploration focused |

## When to Use This Starter

✅ **Perfect for:**
- New project development
- Clean starting point
- Learning Cinderblock basics
- MVP development
- Client projects

❌ **Not ideal for:**
- Exploring all design system features
- Advanced pattern examples
- Complex state management demos

For comprehensive examples, check out the `nextjs-kitchensink` package.

## Next Steps

1. **Customize** `pages/index.js` with your content
2. **Add pages** by creating files in the `pages/` directory  
3. **Explore components** in the [Cinderblock documentation](https://github.com/rxb/cinderblock)
4. **Build features** using the design system components

## Create New Projects

For new projects, use the CLI tool:

```bash
npx create-cinderblock-app my-project --template default
```

## Learn More

- [Cinderblock Design System](https://github.com/rxb/cinderblock)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)

## Deploy

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
