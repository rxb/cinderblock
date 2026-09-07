# Experimental Responsive Rhythm

Archived on 2026-09-07 for a future Cinderblock v2 project. The runnable preset
and test beds are preserved on `codex/cinderblock-v2-experiment` in Cinderblock
and pghcalendar; they are removed from the active main branches. See
[the v2 decision record](./cinderblock-v2-responsive-presentation.md) for the
final tuning, alternatives considered, and recovery instructions.

The remainder of this document describes the saved experiment. It tested a
more expressive Cinderblock default without arbitrary spacing utilities.

## Test beds

- `packages/starter-nextjs-default/pages/rhythm-lab.js` exercises headings,
  ordinary copy, buttons, peer Sections, cards, Lists, and responsive Flex
  composition.
- Nebby's `/admin-status-cinderblock` route exercises the same direction
  against a dense, real-world source dashboard. The original `/admin-status`
  route remains the control.

On the archive branches, both routes use `experimentalStyleConfig`. The
preset was route-scoped during evaluation and never became the package default.

## Structural rhythm

The experiment exposes only the three existing structural roles:

| Role | Small screens | Large screens |
|------|---------------|---------------|
| `Chunk` | 16px | 20px |
| peer `Section` separation | 32px | 48px |
| `Stripe` region edge | 40px | 56px |

These are semantic component roles, not a public spacing ladder. Component
internals may still use private microspacing where necessary.

The corresponding experimental metrics are:

```javascript
space: 16
spaceChunk: 16
spaceChunkAtLarge: 20
spaceSection: 16
spaceSectionAtLarge: 24
spaceStripe: 24
spaceStripeAtLarge: 32
pageGutter: 16
pageGutterAtLarge: 48
```

Section and Stripe totals include their neighboring structural space; the
metric values are therefore not the final visible gap on their own.
With the current values, a complete boundary between adjacent Stripes remains
clearly larger than the boundary between adjacent Sections: 80px versus 32px
on small screens and 112px versus 48px on large screens.

The experiment must preserve the compositional equations documented in
[style-generation.md](./style-generation.md#metrics-are-a-system-of-relationships).
In particular, responsive Chunk and Section values must change together so
that the final Chunk still completes its enclosing Section's bottom space.
Negative gutters and other compensating pairs must be audited as pairs rather
than adjusted independently.

## What the override-only pass taught us

An override alone could test palette, typography sizes, radii, width, and one
static rhythm, but it could not express three responsive structural levels.
The visual test beds justified a small set of internal changes:

- structural components now forward generated media-query IDs;
- `buildStyles` accepts separate small/large Chunk, Section, Stripe, and page
  gutter metrics;
- responsive Flex arrangements keep their vertical rhythm in their child
  Chunks instead of adding a direction-specific gap;
- ordinary FlexItems use `minWidth: 0`, allowing long content to wrap instead
  of starving peer columns;
- Chip merges caller styles with its defaults, stays intrinsic-width, and
  prevents label wrapping;
- Card and Chip surfaces use theme swatches instead of hard-coded colors;
- heading and kicker tracking can be themed;
- the starter follows the workspace symlink so the rhythm lab reflects branch
  edits during development.

## Deliberate non-goals

- No numeric spacing props or utility-class ladder.
- No page-wide compact/comfortable density switch.
- No large responsive table component. Dense records use `List` plus a
  responsive `Flex` row.
- No dashboard-specific component has been promoted into the package merely
  because Nebby needs it.

## Questions still under evaluation

- Whether semantic positive/warning/critical surfaces should become supported
  Card and Chip variants rather than experimental swatches.
- Whether a reusable statistic typography role is broadly useful or would
  overfit dashboards.
- Whether ambient page treatments such as gradients belong in Cinderblock
  defaults, an optional recipe, or application themes.
- Whether the 48px large-screen page gutter should remain fixed or gain one
  wider-screen step.

## Verification

In the paired archive checkouts, run the production builds in both test beds:

```sh
cd packages/starter-nextjs-default
npm run build

cd /path/to/pghcalendar/web_new
npm run build
```

Then compare `/rhythm-lab`, `/admin-status`, and
`/admin-status-cinderblock` at phone, tablet, and desktop widths.
