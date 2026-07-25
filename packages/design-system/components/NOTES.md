# Notes about structural components

This file preserves the short conceptual overview. The maintained reference
and examples live in:

- `docs/AGENTS.md` for the fast-path composition rules;
- `docs/structural-components.md` for the complete structural guide;
- `docs/recipes.md` for production page patterns.

Cinderblock is not only a collection of visible controls. Structural
components create spacing, hierarchy, and page composition so individual
buttons, images, and text blocks do not need ad-hoc margins.

## Mental model

- `Page` is application-owned. It supplies metadata, global navigation, and
  app-level overlays, then renders page children directly. It should not wrap
  every page in one Stripe or Section.
- `Stripe` is a page-owned, full-width visual region. A page may have several.
- `Bounds` constrains content width inside a Stripe.
- `Section` is one page-outline content group. A page with only an H1 still
  needs one Section; each additional peer H2 normally begins another.
- `Chunk` is the ordinary unit of separation between leaf content elements.
- `Flex` and `FlexItem` arrange peer regions. They may sit between structural
  levels when, for example, two Sections become columns at a breakpoint.

The ordinary path is:

```jsx
<Page>
  <Stripe>
    <Bounds>
      <Section>
        <Chunk><Text type="pageHead">Page title</Text></Chunk>
        <Chunk><Text>Introductory content</Text></Chunk>
      </Section>
      <Section>
        <Chunk><Text type="sectionHead">A peer content group</Text></Chunk>
        <Chunk><Text>Content belonging to that heading</Text></Chunk>
      </Section>
    </Bounds>
  </Stripe>
</Page>
```

Plain FlexItems already grow equally. Use `shrink` for content-sized items, an
empty plain FlexItem as a spacer, and explicit `growFactor` values only to
describe unequal ratios. The `section` gutter is an advanced exception for
unusual Section/Flex inset conflicts, not a normal layout default.
