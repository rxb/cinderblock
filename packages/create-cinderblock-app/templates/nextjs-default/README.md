# {{PROJECT_NAME}}

A Next.js application built with the [Cinderblock Design System](https://github.com/rxb/cinderblock).

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About Cinderblock Design System

This project uses the Cinderblock Design System, which emphasizes structural hierarchy and responsive design. Learn more about the key concepts:

### Structural Hierarchy

Cinderblock uses a unique approach where spacing and layout come from structural components:

```jsx
<Stripe>       {/* Full-width sections */}
  <Section>    {/* Content areas */}
    <Chunk>    {/* Element spacing */}
      <Text type="pageHead">Your Content</Text>
    </Chunk>
    <Chunk>
      <Text>More content with proper spacing</Text>
    </Chunk>
  </Section>
</Stripe>
```

### Key Components

- **Structural**: `Stripe`, `Section`, `Chunk`, `Flex`, `FlexItem`
- **UI**: `Button`, `TextInput`, `Modal`, `Tabs`
- **Content**: `Text`, `Avatar`, `Icon`, `Picture`, `List`
- **Utility**: `LoadingBlock`, `RevealBlock`, `Bounce`

### Example Usage

```jsx
import { 
  Stripe, 
  Section, 
  Chunk, 
  Text, 
  Button 
} from '@cinderblock/design-system';

function HomePage() {
  return (
    <Stripe>
      <Section>
        <Chunk>
          <Text type="pageHead">Welcome to {{PROJECT_NAME}}</Text>
        </Chunk>
        <Chunk>
          <Text>Start building your app with Cinderblock components.</Text>
        </Chunk>
        <Chunk>
          <Button color="primary">Get Started</Button>
        </Chunk>
      </Section>
    </Stripe>
  );
}
```

## Learn More

- [Cinderblock Documentation](https://github.com/rxb/cinderblock/tree/main/packages/design-system/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Design System Components](https://github.com/rxb/cinderblock/tree/main/packages/design-system/docs)

## Project Structure

```
{{PROJECT_NAME}}/
├── pages/           # Next.js pages
├── components/      # Your custom components
├── public/          # Static assets
├── styles/          # Global styles
└── package.json
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

This project was created with `create-cinderblock-app`. To learn more about the Cinderblock Design System, visit the [main repository](https://github.com/rxb/cinderblock).