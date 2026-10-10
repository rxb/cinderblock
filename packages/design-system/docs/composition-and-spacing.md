# How Cinderblock's spaces fit together

This guide describes the restored implementation as of 2026-09-08. The final
section proposes a way to discuss future metrics; it does not introduce new
metrics or change the current styles.

Components contribute parts of a finished composition. METRICS supply the
inputs, and the equations in buildStyles explain how those parts fit. Keep
both the arithmetic and the component responsibilities visible when tuning
the design. `sectionSpace - space` is executable documentation: it says that
the enclosing Section reserves part of its bottom edge for its final Chunk.

## Who owns which space?

In this guide, `space` means `METRICS.space`, and `sectionSpace` means
`METRICS.spaceSection`. The default values happen to be equal; their roles
are different.

| Component | Responsibility | Current spacing expression |
| --- | --- | --- |
| Chunk | Trailing space after a piece of content | Bottom padding = `space` |
| Section | Content-group edges and horizontal inset | Top = `sectionSpace`; bottom = `sectionSpace - space`; left/right **margins** = `space` |
| Stripe | Outer region space and a background/image surface | Top/bottom padding = `sectionSpace`; left/right padding = 0 below 480px, `space` at 480px+ |
| Bounds | Center and cap content width | Width = 100%, maximum = `boundsWidth`, automatic horizontal margins; ordinary Bounds adds no padding |
| Sectionless | A compact interior, commonly inside Card | Top and left/right padding = `space`; no bottom padding of its own |
| Card | Visual boundary around an object | Border, surface, radius; no content padding |
| Flex / FlexItem | Arrangement and paired horizontal gutters | Parent left margin = `-base`; each item's left padding = `base` |
| Text | Typography | Ordinary text types add no structural padding; the explicit `chunk` prop applies Chunk spacing |

The ordinary page composition is:

```text
Stripe                 outer region and breathing room
└── Bounds             centered width limit
    ├── Section        content-group edges and horizontal inset
    │   ├── Chunk      content and its trailing space
    │   └── Chunk      final content and the group's remaining bottom space
    └── Section        next peer group
```

Flex can arrange peers between these levels. It does not become another level
of vertical hierarchy. A shared Page shell supplies navigation, metadata,
and global layers; the page chooses its structural components.

## Vertical space is completed by composition

The ordinary Section/Chunk relationship is:

```javascript
section: {
  paddingTop: sectionSpace,
  paddingBottom: sectionSpace - space,
},
chunk: {
  paddingBottom: space,
},
```

For a nonempty Section with the expected trailing Chunk contribution:

```text
Visible top edge    = sectionSpace
Visible bottom edge = (sectionSpace - space) + space
                    = sectionSpace
Between Chunks     = space
Between Sections   = sectionSpace + sectionSpace
```

With today's default `space = sectionSpace = 20`, Section's own bottom
padding is zero. This does not mean its visible bottom edge has no space: the
last Chunk supplies 20px. Peer Chunks have 20px between them; peer Sections
have 40px. Hierarchy already exists even when the two input metrics are equal.

Sectionless uses the same principle with fewer terms:

```text
Top edge    = space
Bottom edge = 0 + final Chunk's space
            = space
```

For an ordinary Stripe whose first and last groups are Sections:

```text
Visible region edge        = Stripe padding + Section edge
                           = sectionSpace + sectionSpace
Between two such Stripes   = 4 × sectionSpace
```

At the current defaults those are 40px region edges and an 80px gap between
content across adjacent Stripes. They arise from composing components; they
are not separately specified spacing levels. A full-bleed Stripe without
Sections has a different composition and therefore different totals.

These equalities describe layout boxes, not the perceived distance to the ink
inside a line of text. Font metrics and line height also affect visual space.

## Where the guarantees apply

The final visible content must contribute the expected trailing `space`.
Conditional rendering can remove or replace complete Chunks without needing
first/last spacing flags, as long as the remaining composition still fulfills
that contract. A wrapper such as a form can preserve it if it introduces no
additional vertical space. An empty Section or a final bare control, an
arbitrarily nested Section, or an extra Chunk wrapper does not necessarily
fulfill it. Do not make all component combinations promise equal edges.

Also keep `sectionSpace >= space` when using nonnegative padding: a proposed
Section edge of 16 with a trailing Chunk of 20 requires negative bottom
padding, which is not a sound cross-platform spacing solution.

Bordered Section variants deliberately change the edge formulas: `border`
uses top padding `1.25 × sectionSpace` and top margin `.25 × sectionSpace`;
`borderedContent` removes top padding and uses the quarter-space top margin.
List's first-row handling and Inline's first-item handling are separate local
rules. The ordinary Section equations should not be generalized over those
variants without inspecting their contributions.

## Horizontal space has two owners, around a width limit

Section gives content its normal inset. Stripe adds outer horizontal breathing
room at the medium breakpoint. Both are intentional parts of the current
system. Section uses margins, so the group's border is inset too; replacing
those with padding would change that behavior.

For `Stripe > Bounds > Section`, before Bounds reaches its maximum width:

```text
Horizontal content inset = Stripe padding + Section margin
Below 480px              = 0 + space
At 480px and above       = space + space
```

Once Bounds reaches its maximum width, centering creates additional space.
Stripe padding is outside Bounds; Section margins are inside it. Moving an
inset from one to the other is a change of responsibility, not merely another
way to spell the same total.

For a simple full-width Stripe, let `W` be its available width, `P` its
horizontal padding, `B` the Bounds width, and `S` Section's margin:

```text
B = min(boundsWidth, W - 2P)
Content width = B - 2S
Content inset from the Stripe edge = (W - B) / 2 + S
```

These formulas exclude extra borders, custom styles, and nonstandard wrappers.
They explain why adding Stripe padding may leave content unchanged on a very
wide screen, while adding Section margin always narrows content inside Bounds.

## Small surfaces use smaller compositions

| Surface | Ordinary composition | Consequence |
| --- | --- | --- |
| Page | Stripe > Bounds > Section > Chunk | Region space, width cap, group space |
| Standard Modal | Modal > Stripe > Section > Chunk | Region and group space; Modal constrains width |
| Prompt | Prompter > Section > Chunk | Group space without a Stripe contribution |
| Card interior | Card > Sectionless > Chunk | Balanced compact interior without page-region space |

Modal and Prompter render caller-supplied content; they do not insert Stripe
or Section. These are documented composition conventions, not enforced child
types. A caller could put Stripe in a Prompt, but normal prompts omit it.
This existing distinction is relevant when deciding which metric should grow.

## Horizontal compensation preserves alignment

Flex uses a negative outer offset to cancel its first child's positive gutter:

```text
Ordinary Flex: parent -base + child base = 0 outer offset
Flush:         parent 0 + child 0 = 0
Nbsp:          parent -(2 × pseudoLineHeight) + child (2 × pseudoLineHeight) = 0
Section:       parent -(2 × space) + child (2 × space) = 0
```

The ordinary Flex gutter uses `base` (16 by default), not `space` (20).
Apply corresponding gutter modifiers to parent and items. The advanced
`section` gutter is an existing special case; it is not the ordinary gutter
for every layout containing a Section.

When Flex stacks, its children still carry their Chunk/Section vertical
spacing. An extra direction-dependent vertical gap would add another term.

Grid Lists similarly pair `-space` on the container with `space` on the item.
The scroll List pairs extra bottom padding with an equal negative bottom
margin. ImageSnap uses `-space` for its small-screen offset, then `space / 2`
and a `space` horizontal inset at medium widths. Such expressions document
compensation; review both sides when changing an input.

## Propose inputs, then derive the result

Current principal inputs are:

| Metric | Current default | Existing responsibilities |
| --- | --- | --- |
| `base` | 16 | Typography foundation and ordinary Flex gutter |
| `space` | 20 | Chunk spacing, Section horizontal inset, medium Stripe inset, Sectionless, grid gutters, ImageSnap, plus local tabs/header/menu/toast measurements |
| `spaceSection` | Getter returning `space` | Section vertical edges and border variants, Stripe vertical padding, large sparse Bounds vertical padding |
| `pseudoLineHeight` | 6 | Small local control spacing and the `nbsp` gutter |

Metric proposals should name the input, applicable viewport range, fallback,
and all affected equations. Avoid independently specifying a new padding for
each consumer. Do not split a shared metric into more tokens merely to give
every component its own control.

For example, a possible small extension is **`METRICS.spaceSectionAtLarge`**.
This follows the existing `spaceSection` naming; `sectionSpaceAtLarge` below
is only its local variable name. The key is not currently implemented.

```javascript
// Proposed resolution, not current runtime code.
const space = METRICS.space;
const sectionSpace = METRICS.spaceSection;
const sectionSpaceAtLarge = METRICS.spaceSectionAtLarge ?? sectionSpace;
```

| Input | Below 840px | At 840px and above |
| --- | --- | --- |
| `space` | Existing `space` | Same `space` |
| Section-scale vertical metric | Existing `spaceSection` | Proposed `spaceSectionAtLarge`, falling back to `spaceSection` |
| Hero type | Existing `heroSize` and derived line height | Existing `heroAtLargeSize` and derived line height, with values still to be chosen |

If accepted, every vertical `spaceSection` expression would use the resolved
large value at that breakpoint: Section top and compensated bottom, its border
variants, Stripe top/bottom, and sparse Bounds vertical padding. Chunk,
Sectionless, horizontal insets, Flex gutters, and layout breakpoints would
continue using their existing inputs. In particular, the existing `Flex
section` gutter depends on `space`, despite its name.

An arithmetic illustration, **not selected design values**, is `space = 20`,
`spaceSection = 20`, and `spaceSectionAtLarge = 24`:

```text
Large Section bottom = 24 - 20 = 4
Completed bottom     = 4 + 20 = 24 = Section top
Peer Section gap     = 24 + 24 = 48
Stripe region edge   = 24 + 24 = 48
Prompt edge          = 24 (no Stripe)
Horizontal inset     = unchanged
```

This example increases Prompt vertical space too, because Prompt contains a
Section. If the intention is only to enlarge outer regions, that is a
different proposal for Stripe's responsibility and should be named explicitly.
Keep the ownership decision separate from choosing its numeric value.

The Hero/PageHead proposal is similarly about existing roles: Hero can carry
more expressive scaling while PageHead remains suitable for ordinary UI.
Derive each Hero line height from its size and a chosen proportion. No new
scope, container measurement, or typography role is needed to try those values.

## How a metric change flows through the implementation

1. Define the metric and any derived getters in the style configuration.
2. Resolve its value for each applicable existing viewport breakpoint.
3. Run the complete equations in buildStyles for every dependent style.
4. Pass the generated styles and media IDs through ThemeContext and the
   components' existing style/dataSet paths.
5. Check the resulting compositions, including narrow dialogs on wide screens.

Adding a key to METRICS alone does not implement responsive behavior;
buildStyles must consume it and components must forward any media IDs. The
proposal above would use the existing media-query mechanism. It does not
propose a replacement responsive engine or automatic container-relative rules.

Getters are evaluated when read, and styles are generated when buildStyles
runs. Object spread evaluates getters into ordinary values. For example,
spreading a default METRICS object and then overriding `space` does not
automatically recompute the spread `spaceSection` value. Rebind the intended
relationships in an override before rebuilding styles:

```javascript
const METRICS = {
  ...styleConfig.METRICS,
  space: chosenSpace,
  get spaceSection() { return this.space; },
};
```

The same caution applies to typography size/line-height getters. Expressions
make dependencies clear, but a previously generated stylesheet is not a live
reactive graph of those getters.

Before selecting values, record: the metric change; its fallback; the full
consumer list; preserved equations; resulting visible spaces; and the pages,
modals, prompts, cards, and conditional-content cases used to review it.
The existing `npm run test:spacing` checks core equations under several metric
configurations and viewport widths. It complements visual review rather than
proving every possible composition.

See [style-generation.md](./style-generation.md) for the generator mechanics,
[structural-components.md](./structural-components.md) for component APIs, and
[the v2 record](./cinderblock-v2-responsive-presentation.md) for the archived
broader experiment.
