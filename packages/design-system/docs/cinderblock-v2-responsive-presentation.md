# Cinderblock v2: responsive presentation research

Status: deferred on 2026-09-07. This is a record of an experiment and design
options, not a specification to implement in the calendar project.

## Decision and archive

Return active Cinderblock development to the structural spacing and heading
behavior from `50d3cf8`, the commit before `b0c7e1b` introduced the responsive
rhythm experiment. Preserve independent correctness, accessibility, theming,
and documentation improvements made alongside or after the experiment.

The full experiment is saved locally on `codex/cinderblock-v2-experiment` in
both repositories:

| Repository | Preserved work |
| --- | --- |
| `cinderblock` | Responsive structural metrics, experimental theme, `/rhythm-lab`, later interaction fixes, and the final uncommitted visual tuning captured when archiving |
| `pghcalendar` | `/admin-status-cinderblock`, the real-data test bed, alongside the original `/admin-status` control |

Cinderblock's archive starts from `b1cd346`; the calendar archive starts from
`f53b411`. The older `experiment/responsive-rhythm` and
`experiment/cinderblock-admin-parity` branches predate this final archive.
Do not assume these local branches have been pushed.

The calendar has a local `file:../../cinderblock/packages/design-system`
dependency. Switching Cinderblock in that shared checkout affects the calendar.
For a future v2 project, use separate sibling checkouts/worktrees and verify
the dependency resolves to the intended Cinderblock checkout before installing
or starting either app. Avoid changing the active calendar's dependency to
experiment with v2.

Example recovery layout, from clean working trees (the target directories must
not already exist):

```sh
mkdir -p ../cinderblock-v2-lab
git -C ../cinderblock worktree add --detach ../cinderblock-v2-lab/cinderblock codex/cinderblock-v2-experiment
git -C ../pghcalendar worktree add --detach ../cinderblock-v2-lab/pghcalendar codex/cinderblock-v2-experiment
```

The sibling names preserve the calendar's relative dependency. Install each
checkout's dependencies separately; do not reuse a node_modules symlink that
points back into the active repositories. Create a new working branch before
continuing v2 implementation. The original experiment's build commands and
test-bed details are in [experimental-responsive-rhythm.md](./experimental-responsive-rhythm.md).

## What we wanted to improve

The admin status page suggested stronger visual hierarchy: larger page
headings on large screens, more space between major regions, gentler surfaces,
and tighter composition on mobile. Keep Cinderblock's small semantic hierarchy
of Chunk, Section, and Stripe; avoid a public ladder of arbitrary spacing
utilities and avoid unrelated density choices across screens.

The experiment looked good at both viewport extremes, but a desktop viewport
can contain a narrow Modal (about 600px maximum) or Prompt (about 340px).
Viewport-based enhancements still enlarge the content in those small surfaces.
Solving that mismatch began to consume more framework design effort than the
calendar feature work warranted.

The experiment was opt-in through `experimentalStyleConfig`; the calendar's
normal `_app` theme never adopted the preset. The duplicate admin route and
rhythm lab did. Importing the preset through the package entry point also
generated its CSS even when the route was not being viewed.

## Composition principles to preserve

- Components should stack with predictable geometry. Callers should not need
  to identify the first or last visible child merely to repair spacing.
- `Section.paddingBottom + final Chunk.paddingBottom = Section.paddingTop`.
  Negative parent gutters must cancel the corresponding positive child gutter.
  Audit every addition, subtraction, negative value, and derived measurement
  when changing a spacing input.
- Flex handles arrangement and horizontal gutters. When it stacks, its
  enclosed Chunks or Sections supply vertical rhythm. A separate stacked gap
  should not be added automatically.
- Typography and spacing enhancements are presentation policy. Flex direction,
  List variants, and responsive image heights are layout behavior. Do not
  silently change the meaning of their existing viewport breakpoints.
- Preserve normal PageHead and SectionHead tracking unless deliberately
  exploring an optional theme. Tight tracking was not the preferred default.
- Preserve proportional line-height relationships rather than independently
  tuning every size/line-height combination.
- Base/mobile styling should be complete and attractive on its own. Native
  tablet apps may use those base presentation values; enhanced tablet styling
  is optional, not a prerequisite for shipping calendar improvements.

The enduring spacing documentation is
[style-generation.md](./style-generation.md#metrics-are-a-system-of-relationships).

## Last visual checkpoint

The saved working-tree tuning is authoritative; the experiment's older prose
may describe earlier heading values.

| Measurement | Base | Large viewport |
| --- | --- | --- |
| Chunk padding | 16 | 20 |
| Section-owned edge | 16 | 24 |
| Stripe-owned edge | 24 | 32 |
| Page gutter | 16 | 48 |
| PageHead size | 44 | 64 |
| PageHead line-height multiplier | 1.15 | 1.15 |
| Hero size / line height | 48 / 52 | 76 / 80 |

Visible gaps include neighboring structural contributions. For example, a
Stripe edge with an enclosed Section is 40px base / 56px large, and a full
boundary between two such Stripes is twice that. These are not new utilities.

The archive also captures an existing base `bigLineHeight` adjustment from
1.4 to 1.5, plus lab markup and theme color/weight tuning. The base line-height
edit is independent of responsive growth and should be preserved on main.

## Options explored, not implemented

| Option | Benefit | Cost or limit |
| --- | --- | --- |
| Moderate the existing viewport values | Minimal architectural change | Less dramatic desktop presentation; narrow desktop surfaces still share the viewport rules |
| Explicit component opt-in, analogous to `inverted` | Clear local choice, simple implementation | Repeated author decisions; related structural spacing must stay coordinated |
| Two configurations from existing METRICS/buildStyles/ThemeContext | Enhanced pages and base-sized dialog contents without measurements | Maintain two generated maps and an explicit presentation boundary; custom themes and paired spacing terms must remain coherent |
| Web-only presentation enhancements, native base values | Avoids native container machinery | Maintain a small additional web styling path; generate values from metrics rather than duplicating arithmetic |
| Guard wide CSS with `:not()` inside an explicit scope | Wide overrides simply do not match compact descendants | No native equivalent; current CSS generator hardcodes selectors; portals follow DOM ancestry on web |
| True container queries | Components adapt to arbitrary parent widths | New compiler/runtime integration, native measurement and subscriptions, first-layout behavior, nested boundary semantics, and more tests |

`inverted` established a useful precedent: authors explicitly acknowledge the
context of Text and Button. An explicit `compact` or `spacious` prop is a valid
alternative, not ruled out. A composition-wide setting reduces repeated
annotations but creates inheritance semantics. Color is more independent than
structural spacing, whose paired terms must agree. No prop name was adopted.

For a two-theme prototype, ordinary `buildStyles` can run with original metrics
and with wide typography/spacing resolved back to base values. Alternatively,
explicitly identified wide presentation rules can be omitted before calling
the existing stylesheet generator. Select both the styles and their media IDs
through the existing ThemeContext. A compact element must not retain normal
wide IDs, or web CSS will still override its base style.

Both alternatives can use the existing CSS generator and SSR `flush()`.
There is no need to own CSS serialization just to create two theme maps.
Cache generated configurations per theme instead of regenerating them for
every Modal render. Modal's outer shell can still use the normal viewport
rules while its content uses the base configuration.

The proposed selector adapter and `outsideCompact` annotation were never
implemented. A selector would conceptually be:

```css
@media screen and (min-width: 840px) {
  [data-media~="example-wide-id"]:not(:where(
    [data-cb-scope="compact"],
    [data-cb-scope="compact"] *
  )) { font-size: 64px; }
}
```

Do not blanket-disable large/xlarge queries or simply mask media context as a
presentation fix. List/Button use bounded breakpoint ranges; disabling a
large rule does not make a medium rule with `max-width: 839px` match a desktop
viewport. JavaScript-selected variants and CSS must agree if layout semantics
are ever changed. Keeping explicit layout responsiveness unchanged avoids
that broader project.

## NativeWind research

NativeWind provides real CSS container queries on web and a native runtime
based on `onLayout`, inherited React context, and reactive rule evaluation.
Named containers are supported. This is a useful reference implementation,
not a dependency adoption decision.

- [NativeWind container-query guide](https://www.nativewind.dev/v5/tailwind/plugins/container-queries)
- [NativeWind v4 announcement](https://www.nativewind.dev/blog/announcement-nativewind-v4)
- [React Native CSS engine](https://github.com/nativewind/react-native-css)

At the time of investigation, v5 was a preview with substantial toolchain and
native requirements. Recheck current versions before making a v2 decision.
Cinderblock is a Next.js Pages Router / React Native Web package today. Its
media context uses `window.matchMedia`; the installed native media-query
implementation evaluates window dimensions when creating styles and does not
subscribe to orientation changes itself. A complete native migration is
separate work, not something this visual experiment proved.

If revisited, distinguish shell viewport responsiveness from local content
responsiveness. Native containers need a first-render fallback and composed
onLayout callbacks; a breakpoint-valued context can reduce resize rerenders.
Web CSS queries preserve SSR behavior better than measuring every container
after hydration. CSS variables also cannot be substituted blindly for numeric
METRICS because buildStyles performs JavaScript arithmetic on those inputs.

## Near-term calendar direction

Restore the original geometry first. Preserve the image-background work,
interaction/accessibility fixes, general component corrections, and spacing
documentation. Keep the original admin status page. Archive the duplicate
admin and rhythm-lab routes with the experimental preset.

Consider a later, separate moderate visual pass using existing metrics and
viewport rules only. Candidates: a somewhat stronger constant Section rhythm,
modest heading sizes, the established tracking and line-height proportions,
and application-level colors or background treatments. Keep Chunk spacing
stable initially. Compare the actual calendar, a narrow Modal, and a Prompt
on a wide browser as well as mobile before accepting values.

That future pass has not selected or applied new values. If it requires a new
responsive engine, scope API, selector registry, or component measurement,
move it into the v2 project instead. The calendar should remain focused on
calendar work.
