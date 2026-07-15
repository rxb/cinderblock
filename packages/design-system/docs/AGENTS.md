# Cinderblock — quick reference for AI agents

Cinderblock is a React Native Web design system (untyped JS, ESM) for Next.js
**Pages Router** apps. Spacing and layout come from **structure**, not from
margins. If you're adding margin/padding to space content apart, you're doing
it wrong — wrap things in the right structural component instead.

This file is the fast path. Full prop tables and prose live in the other files
in this directory (see the index at the bottom).

## The canonical page skeleton

```jsx
import { Stripe, Bounds, Section, Chunk, Text } from '@cinderblock/design-system';

<Stripe>                        {/* edge-to-edge background band */}
  <Bounds>                      {/* max-width constraint, centered */}
    <Section>                   {/* logical section, usually has a head */}
      <Chunk><Text type="sectionHead">Heading</Text></Chunk>
      <Chunk><Text>Paragraph-ish content. Chunk provides the spacing.</Text></Chunk>
    </Section>
    <Section>
      ...
    </Section>
  </Bounds>
</Stripe>
```

Rules:

- **Order is always `Stripe > Bounds > Section > Chunk > content`.** Never put
  `Bounds` inside `Section`.
- A page is usually several `Stripe`s stacked vertically (hero stripe, content
  stripe, footer stripe), each with its own `Bounds`.
- **Omit `Bounds` only for full-bleed content** — a fullscreen photo, a map,
  or an app-like screen whose entire layout is a `Flex`/`FlexItem` shell.
- Every leaf piece of content lives in a `Chunk`. Don't put two paragraphs in
  one `Chunk`; the `Chunk` *is* the spacing unit.
- `Sectionless` replaces `Section` when you need section-style horizontal
  padding without the vertical rhythm — the standard idiom inside `Card`s,
  compact header/chrome bars, and toolbars.
- `Stripe` natively supports hero background images: `image`, `imageStyle`,
  `imageFit`, `imagePosition`, and `imageHeight` as a breakpoint object (e.g.
  `{small: 488, large: 590}`). Use `imagePosition="top"` to keep the top of a
  covered image visible consistently across native and web.

## Component index (what to reach for)

Structure:
- `Stripe` — full-width horizontal band; background color/image (`image`,
  `imageHeight`, `imageFit`, `imagePosition`, `border`, `style`).
- `Bounds` — centers content and caps width. `small` / `medium` / `large` for
  narrower caps (auth/settings forms use `small`); `sparse` for a floating-card
  page look (`sparseBackgroundStyle` to style the backdrop).
- `Section` — logical grouping with vertical rhythm; `border`, `borderedContent`.
- `Chunk` — paragraph-level spacing unit; `inline` for a horizontal chunk.
- `Card` — bordered/elevated container (`shadow`); often the item inside `List`.
  **Card has NO built-in padding** — the interior is always
  `Card > Sectionless > Chunk`; bare `Chunk`s inside a `Card` sit flush
  against the border. Omit the `Sectionless` only for deliberate full-bleed
  content (image headers, maps, edge-to-edge divider lists).
- `Inline` — inline-flow row of small elements (icon + text), wraps by default
  (`nowrap` to prevent).

Layout:
- `Flex` / `FlexItem` — flexbox rows/columns with responsive direction
  switching. `Flex` props: `direction` ('row' default | 'column'),
  `switchDirection="<breakpoint>"` (flips direction at that breakpoint),
  `reverseDirection`, `reverseSwitchDirection`, `wrap`, `justify`, `align`,
  `flush` (no gutter), `nbsp` (text-space-sized gutter), `section`
  (section-sized gutter). `FlexItem` props: `shrink` (fit content),
  `growFactor` (0–7), `justify`, `align`, `flush`, `nbsp`, `section`.
- `List` — data-driven list that renders `items` via `renderItem`. `variant`
  is `'linear' | 'grid' | 'scroll'` **or a responsive object** like
  `{ small: 'scroll', medium: 'grid' }`. Grid uses `itemsInRow`
  (e.g. `{ small: 1, medium: 2, large: 4 }`); scroll uses `scrollItemWidth`.

Content:
- `Text` — the only text primitive. `type`: `micro | small | body | big |
  sectionHead | pageHead | hero | pageHeadKicker`. `color`: `primary |
  secondary | hint | tint`. `weight`: `strong`. Also `inverted`, `nowrap`,
  `chunk` (adds chunk spacing when used outside a `Chunk`).
- `Icon`, `Avatar` (`size`), `Picture`, `Image`, `ImageRatio`, `ImageSnap`, `Chip`, `Header`.

Interaction:
- `Button` — `label`, `onPress`, `color` ('primary' | 'secondary'), `size`,
  `width` ('full' | 'snap' — snap is full-width on mobile, shrink on desktop),
  `shape` (icon-only button, feather icon name), `isLoading` (spinner swaps in
  for the label), `inverted`, `dummy` (visual-only, no press handling — use
  when wrapped by another touchable like `DropdownTouch`).
- `Touch` (bare pressable), `Link` (navigation), `Tabs`, `Menu`. When using
  `Touch` for a custom control (pill, row, icon target), pass
  `accessibilityRole="button"` so it announces and keyboard-activates like
  the built-in `Button`.
- `Dropdowner` / `DropdownTouch` / `DropdownItem` — dropdown menus.
  `DropdownItem` takes `href` or `onPress`; onPress handlers should call the
  injected `onRequestClose()` after their side effect.
- `Modal`, `Prompter` (stacked confirm/dialog prompts), `Toaster` (toasts) —
  mounted **once at the app level** (in a shared `Page` wrapper) and driven by
  app state (e.g. Redux slices with add/hide/remove actions). Prompt and
  dropdown content are plain components that receive `onRequestClose` as a
  prop. Pair `Modal` with `RevealBlock visible={...}` to animate-swap panels
  (e.g. login ↔ register).

Forms:
- `TextInput`, `CheckBox`, `Picker`, `FileInput`, `PhotoInput`, `FakeInput`,
  `Label`, `FieldError`, and the `useFormState` hook (fields, setFieldValues,
  submitting state, error handling).

Utility:
- `useMediaContext()` — returns `{ small, medium, large, xlarge }` booleans
  for the current viewport; `initMediaProvider` sets it up in `_app`.
- `LoadingBlock`, `RevealBlock`, `Bounce`, `Reorderable`, `Map`,
  `ThemeContext`, `designConstants` (SWATCHES, METRICS, BREAKPOINTS).

## Responsive model

Breakpoints (min-width, px): `small: 0`, `medium: 480`, `large: 840`,
`xlarge: 1024`.

Three tools, in order of preference:
1. **Responsive props** — `List variant={{small:'scroll', large:'grid'}}`,
   `Flex switchDirection="large"`. Rendered as CSS media queries → SSR-safe,
   no flash.
2. **`useMediaContext()`** — JS conditionals for things CSS can't express.
   Client-side only; prefer responsive props when possible.
3. **`dataSet={{ media: ids }}`** with `react-native-media-query` for custom
   per-component media styles.

## Common patterns

Two-column detail page (stacks on small screens):

```jsx
<Stripe>
  <Bounds>
    <Section>
      <Flex direction="column" switchDirection="large" section>
        <FlexItem growFactor={1} section>
          <Chunk>{/* main content */}</Chunk>
        </FlexItem>
        <FlexItem shrink section>
          <Chunk>{/* sidebar, e.g. minWidth: 320 via style */}</Chunk>
        </FlexItem>
      </Flex>
    </Section>
  </Bounds>
</Stripe>
```

Responsive card feed:

```jsx
<List
  variant={{ small: 'scroll', medium: 'grid' }}
  itemsInRow={{ medium: 2, large: 3 }}
  scrollItemWidth={220}
  items={items}
  renderItem={(item) => (
    <Chunk key={item.id}>
      <Card>...</Card>
    </Chunk>
  )}
/>
```

Narrow form page:

```jsx
<Stripe>
  <Bounds small>
    <Section>
      <Chunk><Text type="pageHead">Sign in</Text></Chunk>
      <Chunk>
        <Label>Email</Label>
        <TextInput value={...} onChange={...} />
        <FieldError error={...} />
      </Chunk>
      <Chunk><Button label="Submit" onPress={...} /></Chunk>
    </Section>
  </Bounds>
</Stripe>
```

Label / value line-item row (price breakdowns, metadata):

```jsx
<Flex>
  <FlexItem><Text>$69 x 3 nights</Text></FlexItem>
  <FlexItem shrink><Text>$207</Text></FlexItem>
</Flex>
```

Fused segmented control (`flush` removes gutters so buttons visually join):

```jsx
<Flex flush>
  <FlexItem flush><Button shape="ArrowUp" style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}} /></FlexItem>
  <FlexItem flush><Button shape="ArrowDown" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}} /></FlexItem>
</Flex>
```

## Anti-patterns (do not do these)

1. **Margins for spacing.** Never `style={{marginBottom: 16}}` to separate
   content — add a `Chunk` / `Section` / `Stripe` boundary instead.
2. **`Bounds` inside `Section`.** The order is Stripe > Bounds > Section.
3. **Raw `<div>` / `<span>` / HTML tags.** This is React Native Web — use
   `View` and `Text` (both exported) or higher-level components.
4. **Raw text outside `Text`.** All copy goes through `<Text>`.
5. **App Router.** SSR style extraction requires Pages Router
   (`Document.getInitialProps` + `flush()`). Don't migrate or suggest it.
6. **Hand-rolled flexbox styles.** Use `Flex`/`FlexItem` props
   (`switchDirection`, `growFactor`, `shrink`) rather than `style={{display:
   'flex', ...}}`.
7. **Bare `Chunk`s inside a `Card`.** `Card` has no padding of its own; the
   interior idiom is `Card > Sectionless > Chunk`. Without the `Sectionless`,
   content sits flush against the card border.
8. **Assuming a page background.** `Stripe` is transparent by default and the
   components assume a light canvas. Give content stripes an explicit
   background (e.g. `SWATCHES.notwhite`) and set `color-scheme: light` (plus a
   white `html` background) in the app's global CSS — otherwise dark-mode
   browsers paint a black canvas behind the page.

## Doc index

- [structural-components.md](./structural-components.md) — Stripe, Bounds, Section, Chunk, Sectionless, Inline
- [content-components.md](./content-components.md) — Text, images, avatars, icons, Card, List
- [ui-components.md](./ui-components.md) — buttons, forms, modals, toasts, menus
- [utility-components.md](./utility-components.md) — hooks and helpers
- [responsive-system.md](./responsive-system.md) — breakpoints, utility classes, how the responsive system works
- [style-generation.md](./style-generation.md) — maintainer doc: how utility styles/media queries are generated
- [nextjs-integration.md](./nextjs-integration.md) — **read before debugging consumer integration**
