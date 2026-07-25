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

<Stripe>                        {/* major edge-to-edge visual region */}
  <Bounds>                      {/* max-width constraint, centered */}
    <Section>                   {/* page-level content group and inset */}
      <Chunk><Text type="pageHead">Page title</Text></Chunk>
      <Chunk><Text>Introductory content. No H2 is required here.</Text></Chunk>
    </Section>
    <Section>
      <Chunk><Text type="sectionHead">A peer H2-level group</Text></Chunk>
      <Chunk><Text>Content belonging to that heading.</Text></Chunk>
    </Section>
  </Bounds>
</Stripe>
```

Rules:

- The ordinary content path is **`Stripe > Bounds > Section > Chunk >
  content`**. Never put `Bounds` inside `Section`. `Flex`/`FlexItem` may sit
  between levels when they arrange peer Sections or peer Stripes.
- **Pages own their Stripes, Bounds, and Sections.** A shared `Page` or
  application shell owns metadata, global header/navigation, and app-level
  overlays, then renders page children directly. Do not put one catch-all
  Stripe or Section in the shell: that prevents pages from composing multiple
  visual regions or H2-level groups.
- A page may have only one `Stripe`; additional Stripes are less common but
  fully supported for heroes, background changes, full-bleed media, maps, or
  other major visual regions. Each ordinary content Stripe has its own Bounds.
- `Section` is the page-outline and spacing unit. The first Section commonly
  contains the `pageHead` (H1) and needs no `sectionHead`. Each additional peer
  `sectionHead` (H2) normally begins another Section. Do not put several
  unrelated H2-level groups in one Section merely because they share a Stripe.
- **Omit `Bounds` only for full-bleed content** — a fullscreen photo, a map,
  or an app-like screen whose entire layout is a `Flex`/`FlexItem` shell.
- Every leaf piece of content lives in a `Chunk`. Don't put two paragraphs in
  one `Chunk`; the `Chunk` *is* the spacing unit.
- **Section is the normal page-content container; Card is optional.** Use a
  Card only when content should read as a distinct object, record, selectable
  choice, or visually unified unit. A Card lives inside the appropriate
  Section and does not replace it. Ordinary page copy, forms, instructions,
  and status content usually need no Card.
- `Sectionless` replaces `Section` when you need section-style horizontal
  padding without the vertical rhythm — the standard idiom inside `Card`s,
  compact header/chrome bars, and toolbars.
- `Stripe` natively supports hero background images: `image`, `imageStyle`,
  `imageFit`, `imagePosition`, and `imageHeight` as a breakpoint object (e.g.
  `{small: 488, large: 590}`). Use `imagePosition="top"` to keep the top of a
  covered image visible consistently across native and web.

## Component index (what to reach for)

Structure:
- `Stripe` — major full-width visual region; background color/image (`image`,
  `imageHeight`, `imageFit`, `imagePosition`, `border`, `style`). It often
  marks a large content transition, but can also provide full-bleed visual or
  interactive content without introducing a heading.
- `Bounds` — centers content and caps width. `small` / `medium` / `large` for
  narrower caps (auth/settings forms use `small`); `sparse` for a floating-card
  page look (`sparseBackgroundStyle` to style the backdrop).
- `Section` — H2-level content grouping with vertical rhythm and horizontal
  inset; `border`, `borderedContent`. It is still required for a page that has
  only an H1.
- `Chunk` — paragraph-level spacing unit; `inline` for a horizontal chunk.
- `Card` — bordered/elevated container (`shadow`); often the item inside `List`.
  It is an optional object-like grouping inside a Section, not the default page
  content wrapper.
  **Card has NO built-in padding** — the interior is always
  `Card > Sectionless > Chunk`; bare `Chunk`s inside a `Card` sit flush
  against the border. Omit the `Sectionless` only for deliberate full-bleed
  content (image headers, maps, edge-to-edge divider lists).
- `Inline` — inline-flow row of small elements (icon + text), wraps by default
  (`nowrap` to prevent).

Layout:
- `Flex` / `FlexItem` — flexbox rows/columns with responsive direction
  switching. A plain `FlexItem` already grows with relative weight `1`, so
  plain siblings divide the row equally. Use `shrink` to fit content, an empty
  plain `FlexItem` as a spacer, and `growFactor` only for explicit unequal
  ratios such as `1:2`. `Flex` props: `direction` ('row' default | 'column'),
  `switchDirection="<breakpoint>"` (flips direction at that breakpoint),
  `reverseDirection`, `reverseSwitchDirection`, `wrap`, `justify`, `align`,
  `flush` (no gutter), `nbsp` (text-space-sized gutter), and the advanced
  `section` gutter. `FlexItem` props: `shrink` (fit content), `growFactor`
  (relative weight `1`–`7`), `justify`, `align`, `flush`, `nbsp`, `section`.
  Avoid `section` by default; it exists for rare layouts that must compensate
  for Section-scale horizontal insets.
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

Two equal content groups (stacked on small screens, side by side on large):

```jsx
<Stripe>
  <Bounds>
    <Flex direction="column" switchDirection="large">
      <FlexItem>
        <Section>
          <Chunk><Text type="sectionHead">Today</Text></Chunk>
          <Chunk>{/* first content group */}</Chunk>
        </Section>
      </FlexItem>
      <FlexItem>
        <Section>
          <Chunk><Text type="sectionHead">Assigned routine</Text></Chunk>
          <Chunk>{/* second content group */}</Chunk>
        </Section>
      </FlexItem>
    </Flex>
  </Bounds>
</Stripe>
```

Header with opposite-edge content:

```jsx
<Header>
  <Flex>
    <FlexItem shrink>{/* logo */}</FlexItem>
    <FlexItem /> {/* grows to consume the available space */}
    <FlexItem shrink>{/* navigation or actions */}</FlexItem>
  </Flex>
</Header>
```

Unequal `1:2` content ratio:

```jsx
<Flex>
  <FlexItem growFactor={1}>
    <Chunk>{/* one third */}</Chunk>
  </FlexItem>
  <FlexItem growFactor={2}>
    <Chunk>{/* two thirds */}</Chunk>
  </FlexItem>
</Flex>
```

Responsive full-bleed split region:

```jsx
<Flex direction="column" switchDirection="large" flush>
  <FlexItem flush>
    <Stripe>
      <Bounds>
        <Section>
          <Chunk>{/* list or other first region */}</Chunk>
        </Section>
      </Bounds>
    </Stripe>
  </FlexItem>
  <FlexItem flush>
    <Stripe>
      <Bounds>
        <Section>
          <Chunk>{/* map, image, or other second region */}</Chunk>
        </Section>
      </Bounds>
    </Stripe>
  </FlexItem>
</Flex>
```

Fixed-width action sidebar:

```jsx
<Stripe>
  <Bounds>
    <Section>
      <Flex direction="column" switchDirection="large">
        <FlexItem>
          <Chunk>{/* main content; plain item already grows */}</Chunk>
        </FlexItem>
        <FlexItem shrink>
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
9. **Putting a catch-all Stripe or Section in the shared page shell.** That
   silently limits every page to one background region and one content group.
   The page shell should render page-owned structural children directly.
10. **Using `growFactor={1}` on ordinary FlexItems.** Plain FlexItems already
    have equal weight `1`. Specify factors only when expressing an unequal
    ratio.
11. **Using `section` as the normal Flex gutter.** The ordinary Flex gutter is
    the default. `section` is an advanced escape hatch for unusual nested
    Section layouts and should not appear in routine rows or columns.
12. **Wrapping ordinary page content in Cards.** Section already provides the
    normal page grouping and spacing. Reserve Card for content with a real
    object-like boundary; never use it merely to create a white content box.

## Doc index

- [structural-components.md](./structural-components.md) — Stripe, Bounds, Section, Chunk, Sectionless, Inline
- [content-components.md](./content-components.md) — Text, images, avatars, icons, Card, List
- [ui-components.md](./ui-components.md) — buttons, forms, modals, toasts, menus
- [utility-components.md](./utility-components.md) — hooks and helpers
- [responsive-system.md](./responsive-system.md) — breakpoints, utility classes, how the responsive system works
- [style-generation.md](./style-generation.md) — maintainer doc: how utility styles/media queries are generated
- [nextjs-integration.md](./nextjs-integration.md) — **read before debugging consumer integration**
