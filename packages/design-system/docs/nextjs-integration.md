# Next.js Integration Guide

How to consume `@cinderblock/design-system` in a Next.js app, including every
configuration landmine discovered while integrating it into a real Next 15 +
React 19 + TypeScript + Clerk app (the Outpost project, July 2026). If a fresh
integration misbehaves, check this file first.

## TL;DR requirements

| Requirement | Why |
|---|---|
| **Pages Router** (not App Router) | SSR style extraction lives in `Document.getInitialProps` |
| `transpilePackages` for the design system, Expo packages, React Native, RNW, and media-query | packages ship untranspiled JS/TypeScript; keeping React Native in Webpack's graph lets the web alias apply during Pages SSR |
| Define `__DEV__` from Next's `options.dev` value | Expo modules expect Metro's development global |
| Prefer `.web.ts` / `.web.tsx` during module resolution | Expo Image ships platform-specific TypeScript entry points |
| Webpack alias `react-native$` → `react-native-web` | RNW convention |
| Skip ALL custom webpack config when `nextRuntime === 'edge'` | breaks middleware (e.g. Clerk) otherwise |
| Path-alias ONLY stateful singletons | path aliases bypass the package `exports` field |
| Declare Cinderblock's runtime deps in the consumer when using a `file:` dep | npm does not hoist a file-dep's deps out of another workspace |

## 1. Router choice: Pages Router only

Cinderblock's server-side style extraction uses
`AppRegistry.getApplication(...).getStyleElement()` plus `flush()` from
`react-native-media-query`, both of which must run in
`Document.getInitialProps` — a **Pages Router** mechanism with no App Router
equivalent. All Cinderblock starters are Pages Router.

App Router support would require reworking the library around
`useServerInsertedHTML` (style registry pattern). Until that happens, consumers
must use Pages Router. Note that a Pages Router app can still use middleware,
API routes, and modern Next features — this constraint is about `pages/` vs
`app/` only.

## 2. next.config.js — the known-good recipe

```js
const path = require('path');
const fs = require('fs');

module.exports = {
  transpilePackages: [
    '@cinderblock/design-system',
    'expo',
    'expo-image',
    'expo-modules-core',
    'react-native',
    'react-native-media-query',
    'react-native-web'
  ],

  webpack: (config, options) => {
    // (a) The edge runtime (middleware) must keep Next's own react resolution.
    // Aliasing react below breaks the react-server export condition and kills
    // middleware (Clerk's clerkMiddleware, for example) with:
    //   "The 'react' package in this environment is not configured correctly"
    if (options.nextRuntime === 'edge') {
      return config;
    }

    // Metro normally supplies this global for Expo modules.
    config.plugins.push(
      new options.webpack.DefinePlugin({
        __DEV__: JSON.stringify(options.dev)
      })
    );

    // (b) no fs on client and that's ok
    config.resolve.fallback = { fs: false };

    // (c) Only needed when consuming the design system via a file:/link dep:
    // keeps module paths inside node_modules so transpilePackages matches and
    // walk-up resolution uses the consumer's node_modules.
    config.resolve.symlinks = false;

    // (d) RNW convention
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web'
    };

    // (e) Force single copies of packages with SHARED STATE only.
    // ⚠️ Do NOT add stateless deps (uuid, dayjs, react-feather, validator...)
    // to this list: webpack path aliases bypass the package `exports` field,
    // which hard-breaks exports-only packages (uuid >= 11 has "main": null).
    // Stateless deps resolve fine via normal walk-up resolution.
    const singletons = ['react', 'react-dom', 'prop-types', 'react-native-web', 'react-native-media-query'];
    singletons.forEach((item) => {
      const resolved = path.resolve(__dirname, 'node_modules', item);
      if (fs.existsSync(resolved)) {
        config.resolve.alias[item] = resolved;
      }
    });

    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      '.js',
      ...config.resolve.extensions
    ];

    return config;
  }
};
```

History of each rule:

- **(a) edge skip** — without it, `next dev` throws the react-server error the
  moment any middleware compiles. This is the single most confusing failure in
  the list because the error points at React, not at the webpack config.
- **(c) symlinks=false** — `transpilePackages` matches on `node_modules/<name>`
  in the resolved path. With a symlinked `file:` dep, webpack's default
  symlink resolution rewrites paths to the real location (outside
  `node_modules`), so transpilation silently stops matching.
- **(e) exports-field bypass** — discovered when upgrading uuid 9 → 14: uuid
  became exports-map-only, and the old starter config aliased *every* peer dep
  by path, producing `Module not found: Can't resolve 'uuid'`. The fix is to
  alias only what genuinely needs to be a singleton.
- **Expo Image transpilation and extensions** — `expo-image` publishes
  platform-specific TypeScript source. Next must transpile the Expo packages
  and resolve `.web.ts` / `.web.tsx` before the generic native files.
- **React Native in `transpilePackages`** — Expo installs `react-native`
  transitively. During Pages Router production builds, Next may otherwise
  externalize that package before Webpack applies the `react-native$` alias.
  Node then attempts to parse native Flow syntax while collecting page data
  and fails with `Unexpected token 'typeof'`. Keeping `react-native` inside
  Webpack's graph allows the alias to resolve it to `react-native-web`.
- **`__DEV__`** — Metro defines this global automatically; Next does not. Map
  it to `options.dev` so Expo modules work during SSR and production builds.

## 3. Consuming the package

### Option A: npm registry / tarball (production, deploys)

`npm install @cinderblock/design-system` (or the packed `.tgz`). Dependencies
resolve normally; skip `resolve.symlinks = false`.

### Option B: `file:` link to a local checkout (active library development)

```json
"@cinderblock/design-system": "file:../Repos/cinderblock/packages/design-system"
```

Gives live-editing of the library from the consumer app. Two consequences:

1. **Declare the library's runtime deps in the consumer's package.json.**
   npm does NOT install a file-dep's dependencies into the consumer when the
   target lives inside another workspace/monorepo (it assumes the target's own
   tree provides them — but with `resolve.symlinks = false`, resolution happens
   in the consumer's tree). Copy the `dependencies` of this package:
   `@react-native/assets-registry`, `body-scroll-lock`, `dayjs`, `expo`,
   `expo-image`, `prop-types`, `react-feather`,
   `react-native-media-query`, `react-native-web`, `uuid`, `validator`, and the
   optional `react-dnd` + `react-dnd-html5-backend` (required — `index.js`
   imports `Reorderable` unconditionally).
2. **`file:` deps don't deploy.** Vercel/CI can't reach outside the repo.
   Before deploying, switch to a published version or vendor the package.

Either way, add this override (react-native-media-query pins an old RNW peer):

```json
"overrides": {
  "react-native-media-query": {
    "react-native-web": "$react-native-web"
  }
}
```

## 4. `_app` and `_document`

Copy from `packages/starter-nextjs-default` (`pages/_app.js`, `pages/_document.js`).
The essential parts:

- `_app`: `ThemeContext.Provider` with a built style config
  (`styleConfig.buildStyles(METRICS, SWATCHES)`) wrapping `MediaProvider`
  (`initMediaProvider(designConstants.MEDIA_QUERY_PARAMS_SINGLE)`).
- `_document`: the `AppRegistry`/`flush()` style extraction in
  `getInitialProps`, plus the web-only CSS hacks block.
- **Load web fonts in `_document`'s `<Head>`, not `_app`'s** — Next warns (and
  deprioritizes the stylesheet) if a `<link rel="stylesheet">` goes through
  `next/head`.

Third-party providers (e.g. Clerk's `ClerkProvider`) wrap *outside*
`ThemeContext.Provider` in `_app` with no interference.

**Pin the canvas to light.** Cinderblock components assume a light page:
`Stripe` is transparent by default, `Card` and text colors are designed
against white. If the app's global CSS gives `html`/`body` no background,
dark-mode browsers paint a black canvas behind the page and the whole app
renders "dark" by accident. Add to `_document`'s web-only CSS block:

```css
html {
  color-scheme: light;
  background-color: white;
}
```

and give content stripes an explicit background (e.g.
`<Stripe style={{ backgroundColor: SWATCHES.notwhite }}>`).

## 5. TypeScript consumers

The library is untyped JS. Consumers need a module shim:

```ts
// src/types/cinderblock.d.ts
declare module '@cinderblock/design-system';
```

Everything imports as `any`. Generating real `.d.ts` files for the library is
an open TODO — prop tables in `docs/*.md` are the reference until then.

## 6. Version facts (as of 2026-07)

- Peer deps are ranges: `next ^15`, `react ^19`, `react-dom ^19`. (They were
  exact pins — `19.0.0` — which broke consumers needing React security patches;
  e.g. `@clerk/nextjs` requires `~19.0.3+`. Keep peers as ranges.)
- `react-native-web` 0.21.2 and `uuid` ^14 — verified working with React 19.1
  and Next 15.5, SSR + production build + no hydration errors.
- Known deprecation warning in console: `TouchableWithoutFeedback is
  deprecated. Please use Pressable.` Harmless; fixing it means migrating
  `Touch`/touchable usages to `Pressable` inside the library.
- `body-scroll-lock` stays at 3.x (4.x is still beta-only).

## 7. Verifying an integration

A consumer integration is healthy when:

1. `next dev` boots with middleware present (no react-server error).
2. A page using `Text`/`Button`/`Card` returns fully-styled SSR HTML
   (`curl` shows content + `<style>` blocks, not a bare shell).
3. The browser console shows no hydration warnings on load.
4. `next build` completes.

Gotcha when driving the app with browser automation: Cinderblock inputs are
controlled React components — keystrokes sent before hydration completes are
silently discarded when React takes over. Wait for hydration before typing.

## 8. Form-layer facts that aren't obvious from the component docs

- `TextInput` uses web-style `onChange` (event, read `e.target.value`) — not
  React Native's `onChangeText`.
- `Picker` (`Picker.Item` children) passes the value directly to
  `onValueChange`; `CheckBox` passes the next boolean to `onChange`.
- `Toaster` is purely presentational — there is no toast hook/provider; the
  app owns the toasts array (`{id, message, visible, autoHide, hideDelay}`)
  and passes `hideToast`/`removeToast` callbacks.
- `useFormState`'s `error.fieldErrors` shape matches
  `{ [fieldName]: message }`; `FieldError` takes the message string via its
  `error` prop and renders nothing when falsy.
- `Button` takes `label` (or children), `onPress`, `isLoading`, `size`,
  `color`, and `width="snap"` for mobile-full/desktop-shrink. Use
  `type="submit"` with a form `onSubmit` handler on web; loading disables that
  submit action. Pass `dummy` when wrapping it in a `Link` to avoid nested
  interactive elements.
- [forms.md](./forms.md) is the canonical guide for label/error associations,
  field callback contracts, validation, and loading existing records.
