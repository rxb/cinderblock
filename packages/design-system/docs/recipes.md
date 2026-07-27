# Recipes — real-world page patterns

These patterns are distilled from production apps built on Cinderblock (the
original `starterkit` testbed and its knockoff pages). Each is a condensed
skeleton: swap in your own data and handlers. Ordinary content follows the
canonical hierarchy `Stripe > Bounds > Section > Chunk`; Flex/FlexItem may sit
between levels when arranging peer Sections or peer Stripes.

> Older codebases may use `variant="hscroll"` on `List`; the current API name
> is `'scroll'`.

## 1. Ordinary page composition

Start here. Most pages need only the structural path and no Card:

```jsx
<Stripe>
  <Bounds>
    <Section>
      <Chunk>
        <Text type="pageHead">Account</Text>
        <Text color="secondary">Manage your profile and preferences.</Text>
      </Chunk>
      <Chunk><Text>Primary page content belongs directly in this Section.</Text></Chunk>
    </Section>

    <Section>
      <Chunk><Text type="sectionHead">Notifications</Text></Chunk>
      <Chunk><Text>Each peer H2-level group begins another Section.</Text></Chunk>
      <Chunk><Button label="Edit notifications" /></Chunk>
    </Section>
  </Bounds>
</Stripe>
```

Section provides page grouping and inset; Chunk provides content rhythm. Add
Flex or List when content needs arrangement. Add Card only when a group needs
to become a distinct object.

## 2. Detail page with responsive action sidebar

Main content and a sidebar that sit side-by-side on large screens and stack
(content first) on small ones. Each peer region keeps its own Section.

```jsx
<Stripe style={{ backgroundColor: SWATCHES.notwhite }}>
  <Bounds>
    <Flex direction="column" switchDirection="large">
      <FlexItem>
        <Section>
          <Chunk><Text type="pageHead">Chocolate babka</Text></Chunk>
          <Chunk><Text>{/* main detail content */}</Text></Chunk>
        </Section>
      </FlexItem>
      <FlexItem shrink>
        <Section>
          <View style={{ minWidth: 320 }}>
            <Chunk>{/* primary actions */}</Chunk>
            <Chunk border>{/* linked row */}</Chunk>
            <Chunk border>{/* meta row */}</Chunk>
          </View>
        </Section>
      </FlexItem>
    </Flex>
  </Bounds>
</Stripe>
```

Key ideas: `direction="column" switchDirection="large"` = stacked until
`large`; the plain main FlexItem already grows while `shrink` fits the sidebar
to its content; `Chunk border` makes divider rows. No Card or `section` gutter
is needed for ordinary detail content.

## 3. Page head with actions and a direct record list

Use a linear List directly in the page Section when the records are the page's
primary content and do not need to read as separate Card objects.

```jsx
<Stripe>
  <Bounds>
    <Section>
      <Flex direction="column" switchDirection="medium">
        <FlexItem>
          <Chunk>
            <Text type="pageHead">Patients</Text>
            <Text color="secondary">24 active patients · 3 need review</Text>
          </Chunk>
        </FlexItem>
        <FlexItem shrink justify="flex-end">
          <Chunk>
            <Inline nowrap>
              <Button
                shape="Search"
                accessibilityLabel="Search patients"
                onPress={openSearch}
              />
              <Button href="/patients/new" label="Add patient" width="snap" />
            </Inline>
          </Chunk>
        </FlexItem>
      </Flex>

      <List
        variant="linear"
        items={patients}
        renderItem={patient => (
          <Flex direction="column" switchDirection="large">
            <FlexItem>
              <Text weight="strong">{patient.name}</Text>
            </FlexItem>
            <FlexItem>
              <Text>{patient.summary}</Text>
            </FlexItem>
            <FlexItem>
              <Text color="secondary">{patient.context}</Text>
            </FlexItem>
          </Flex>
        )}
      />
    </Section>
  </Bounds>
</Stripe>
```

Keep the title and its short supporting summary in one Chunk so they read as
one page-head unit. Put actions in a peer FlexItem so they stack below the
title on narrow screens and align opposite it when space permits.

A linear List may sit directly in Section when its own item dividers and row
layout provide the necessary rhythm. Wrap the List in a Chunk when it needs
ordinary content spacing. Build each row in the mobile reading order first;
responsive Flex layout should rearrange that same order, not create a different
information hierarchy. Use a Card only when each record needs a stronger
object-like boundary.

The current List implementation keys generated row wrappers by array position.
Keep rows stateless when filtering or reordering them; add a stable
`keyExtractor` capability before placing local state or focus ownership inside
sortable rows.

## 4. Narrow auth/form page

```jsx
<Stripe style={{ flex: 1 }}>
  <Bounds small sparse>
    <Section>
      <Chunk><Text type="pageHead">Sign in</Text></Chunk>
    </Section>
    <Section>
      <form onSubmit={submitForm} noValidate>
        <Chunk>
          <Label htmlFor="email">Email</Label>
          <TextInput
            id="email"
            value={formState.getFieldValue('email')}
            onChange={event => formState.setFieldValue('email', event.target.value)}
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? 'email-error' : undefined}
          />
          <FieldError id="email-error" error={emailError} />
        </Chunk>
        <Chunk>
          <Button type="submit" label="Sign in" isLoading={formState.loading} width="full" />
        </Chunk>
      </form>
    </Section>
  </Bounds>
</Stripe>
```

## 5. Optional responsive Card feed

Use this when every item is genuinely a selectable preview or distinct object.
It is not the default treatment for ordinary linear rows.

```jsx
<List
  variant={{ small: 'scroll', medium: 'grid' }}
  itemsInRow={{ small: 1, medium: 2, large: 4 }}
  scrollItemWidth={300}
  items={items}
  renderItem={(item, i) => (
    <Chunk key={i}>
      <Link href={itemUrl(item)}>
        <Card><Sectionless>{/* selectable preview */}</Sectionless></Card>
      </Link>
    </Chunk>
  )}
/>
```

## 6. Form state, validation, and toast feedback

```jsx
const formState = useFormState({
  initialFields: { title: '', categoryId: null },
  toastableErrors: { BadRequest: 'Something went wrong', NotAuthenticated: 'Not signed in' },
  addToast: msg => dispatch(addToast(msg))
});

const submitForm = async (event) => {
  event.preventDefault();
  if (formState.loading) return;

  const error = Utils.runValidations(formState.fields, {
    title: { notEmpty: { msg: 'Title can\'t be blank' } }
  });
  formState.setError(error);
  if (error) return;

  formState.setLoading(true);
  try {
    await saveThing(formState.fields);
    dispatch(addToast('Saved!'));
  } catch (error) {
    formState.setError(error);
  } finally {
    formState.setLoading(false);
  }
};
```

`formState.setFieldValues({a, b})` sets multiple fields atomically (e.g.
deriving a slug from a title field). Use `replaceFields(record)` to replace the
complete form after loading an existing record. See [forms.md](./forms.md) for
the full state contract, accessible errors, multi-step forms, uploads,
repeatable rows, and optimistic updates.

## 7. Full-bleed Stripe patterns

### Hero with a background image

```jsx
<Stripe
  image="https://example.com/hero.jpg"
  imagePosition="top"
  imageHeight={{ small: 488, medium: 588, large: 590 }}
  style={{ backgroundColor: '#FFD324' }}
>
  <Bounds>
    <Section>
      <Chunk><Text type="hero" inverted>Big headline</Text></Chunk>
      <Chunk><Button label="Get started" /></Chunk>
    </Section>
  </Bounds>
</Stripe>
```

A floating card straddling the hero's bottom edge: give the next Stripe's
first Card a negative top margin (e.g. `style={{marginTop: -68}}`).

### Responsive split region

For a map/list, photo/content, or other pair of full-bleed visual regions, put
one Stripe in each FlexItem. They stack on small screens and sit side by side
at the selected breakpoint:

```jsx
<Flex direction="column" switchDirection="large" flush>
  <FlexItem flush>
    <Stripe style={{ backgroundColor: SWATCHES.notwhite }}>
      <Bounds>
        <Section>
          <Chunk>{/* list or primary content */}</Chunk>
        </Section>
      </Bounds>
    </Stripe>
  </FlexItem>
  <FlexItem flush>
    <Stripe>
      <Bounds>
        <Section>
          <Chunk>{/* map, photo, or interactive region */}</Chunk>
        </Section>
      </Bounds>
    </Stripe>
  </FlexItem>
</Flex>
```

This is an intentional exception to visually stacking peer Stripes. Each
FlexItem still owns a complete Stripe subtree.

## 8. Compact header / chrome bar

`Sectionless` instead of `Section` skips the vertical rhythm — right for
toolbars and site headers. Plain FlexItems grow, so a blank one is the spacer
between two content-sized (`shrink`) items.

```jsx
<Stripe style={{ paddingVertical: 0 }}>
  <Bounds>
    <Sectionless>
      <Flex>
        <FlexItem shrink><Chunk><Text type="big" weight="strong">Brand</Text></Chunk></FlexItem>
        <FlexItem><Chunk>{/* search */}</Chunk></FlexItem>
        <FlexItem shrink>
          <Chunk>
            <Inline>
              <Button size="small" color="secondary" label="Log in" />
              <Button size="small" label="Sign up" />
            </Inline>
          </Chunk>
        </FlexItem>
      </Flex>
    </Sectionless>
  </Bounds>
</Stripe>
```

## 9. Dark section with inverted text

```jsx
<Stripe style={{ backgroundColor: SWATCHES.backgroundDark }}>
  <Bounds>
    <Section>
      <Chunk><Text type="sectionHead" inverted>Featured</Text></Chunk>
      <List variant={{ small: 'scroll', large: 'grid' }} itemsInRow={{ large: 4 }} items={items}
        renderItem={(item, i) => (
          <Chunk key={i}>
            <Card style={{ backgroundColor: 'rgba(255,255,255,.05)' }}>
              <Sectionless>
                <Chunk><Text weight="strong" inverted>{item.name}</Text></Chunk>
              </Sectionless>
            </Card>
          </Chunk>
        )} />
    </Section>
  </Bounds>
</Stripe>
```

## 10. Profile / identity header

```jsx
<Section>
  <Chunk><Avatar source={{ uri: user.photoUrl }} size="xlarge" /></Chunk>
  <Chunk>
    <Text type="pageHead">{user.name}</Text>
    <Text color="secondary">@{user.urlKey}</Text>
  </Chunk>
</Section>
<Section border>
  <Chunk><Text>{user.bio}</Text></Chunk>
</Section>
```

Inline icon-with-text (flows with the text baseline, no Flex needed):

```jsx
<Text nowrap>
  <Icon shape="MapPin" size="small" style={{ verticalAlign: 'middle' }} />
  <Text type="small"> Brooklyn, NY</Text>
</Text>
```

## 11. Prompt (confirm dialog) content

Prompts are plain components dispatched into the app-level `Prompter`;
`onRequestClose` is injected automatically.

```jsx
const DeletePrompt = ({ thing, onRequestClose }) => (
  <Section>
    <Chunk><Text type="sectionHead">Really delete?</Text></Chunk>
    <Chunk><Text>This can't be undone.</Text></Chunk>
    <Chunk>
      <Button onPress={() => { deleteThing(thing); onRequestClose(); }} label="Delete" width="full" />
      <Button onPress={onRequestClose} color="secondary" label="Cancel" width="full" />
    </Chunk>
  </Section>
);
// anywhere: dispatch(addPrompt(<DeletePrompt thing={thing} />))
```

## 12. Dropdown menu on a button

```jsx
<DropdownTouch dropdown={
  <>
    <DropdownItem href={settingsUrl}><Text color="tint">Settings</Text></DropdownItem>
    <DropdownItem onPress={() => { share(); onRequestClose(); }}>
      <Text color="tint">Share</Text>
    </DropdownItem>
  </>
}>
  <Button dummy shape="MoreVertical" color="secondary" />
</DropdownTouch>
```

`dummy` keeps the Button visual-only so the wrapping touchable handles the press.

## 13. Modal with animated panel swap (login ↔ register)

```jsx
<Modal visible={visible} onRequestClose={close}>
  <Stripe>
    <RevealBlock visible={mode === 'login'} animateExit={false}>
      <Section>{/* login form */}</Section>
    </RevealBlock>
    <RevealBlock visible={mode === 'register'} animateExit={false}>
      <Section>{/* register form */}</Section>
    </RevealBlock>
  </Stripe>
</Modal>
```

## 14. Empty state

```jsx
<View style={{ minHeight: '55vh', backgroundColor: SWATCHES.shade, borderRadius: METRICS.cardBorderRadius }}>
  <View style={styles.absoluteCenter}>
    <Chunk style={{ alignItems: 'center' }}>
      <Icon shape="File" size="xlarge" color={SWATCHES.textHint} />
      <Text color="hint">No results</Text>
    </Chunk>
  </View>
</View>
```

## 15. Selectable pill grid (List as a form control)

`List` isn't just for cards — use it to lay out any repeated control.

```jsx
<List
  variant={{ small: 'grid' }}
  itemsInRow={{ small: 2, large: 3 }}
  items={categories}
  renderItem={(category, i) => {
    const selected = category.id === formState.getFieldValue('categoryId');
    return (
      <Touch key={i} onPress={() => formState.setFieldValue('categoryId', category.id)}>
        <View style={{ padding: 8, borderRadius: 32,
          backgroundColor: selected ? SWATCHES.tint : SWATCHES.shade }}>
          <Inline>
            {selected && <Icon shape="Check" color="white" size="small" />}
            <Text type="small" inverted={selected}>{category.name}</Text>
          </Inline>
        </View>
      </Touch>
    );
  }}
/>
```

## 16. Animation touches (Bounce and RevealBlock)

`Bounce` scales its child whenever `watchProp` changes — right for counters
and toggle feedback:

```jsx
<Bounce watchProp={voteCount} scale={1.4}>
  <Text weight="strong">{voteCount}</Text>
</Bounce>
```

`RevealBlock` animates content in/out; stagger with `delay` for lists:

```jsx
{items.map((item, index) => (
  <RevealBlock key={item.id} visible={visible} delay={index * 100}>
    <Chunk>
      <Card><Sectionless>{/* item */}</Sectionless></Card>
    </Chunk>
  </RevealBlock>
))}
```

(See recipe 13 for the Modal + RevealBlock panel-swap pattern.)

## 17. App-level wiring (Page wrapper)

Every page renders inside a shared `Page` component that owns global chrome and
mounts global singletons once. It must not own the page's Stripe, Bounds, or
Section structure:

```jsx
const Page = ({ title, children }) => (
  <View style={{ minHeight: '100vh', flex: 1 }}>
    <Head><title>{title}</title></Head>
    <SiteHeader />
    <View accessibilityRole="main">{children}</View>
    <LoginModal />
    <ConnectedToaster />   {/* <Toaster toasts={state.toasts} ... /> */}
    <ConnectedPrompter />  {/* <Prompter prompts={state.prompts} ... /> */}
    <ConnectedDropdowner />
  </View>
);
```

The route component supplies its own page structure:

```jsx
<Page title="Patient detail">
  <Stripe>
    <Bounds>
      <Section>
        <Chunk><Text type="pageHead">Patient name</Text></Chunk>
      </Section>
      <Section>
        <Chunk><Text type="sectionHead">Today</Text></Chunk>
        <Chunk>{/* progress */}</Chunk>
      </Section>
    </Bounds>
  </Stripe>
  <Stripe style={{ backgroundColor: SWATCHES.backgroundShade }}>
    <Bounds>
      <Section>
        <Chunk><Text type="sectionHead">Assigned routine</Text></Chunk>
        <Chunk>{/* routine */}</Chunk>
      </Section>
    </Bounds>
  </Stripe>
</Page>
```

This boundary is deliberate: the shell is shared, while each page controls how
many visual regions and H2-level groups it needs.

Cinderblock has no state-management dependency — the app supplies state and
add/hide/remove actions (Redux in starterkit, but anything works). Then any
component can `dispatch(addToast('Saved!'))` or `dispatch(addPrompt(<MyPrompt />))`.

Without Redux, a ~50-line React context works fine: a provider that owns the
`toasts`/`prompts` arrays, renders `<Toaster>`/`<Prompter>` after `children`,
and exposes `addToast(message)` / `addPrompt(render)` through a hook. For
prompts, have `addPrompt` take a render callback and inject the close function:

```jsx
const addPrompt = (render) => {
  const id = nextId++;
  const close = () => hidePrompt(id);
  setPrompts(prev => [...prev, { id, content: render(close), showable: true }]);
};
// usage: addPrompt(close => <ConfirmThing onConfirm={() => { doIt(); close(); }} onCancel={close} />)
```
