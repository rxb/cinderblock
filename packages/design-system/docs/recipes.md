# Recipes — real-world page patterns

These patterns are distilled from production apps built on Cinderblock (the
original `starterkit` testbed and its knockoff pages). Each is a condensed
skeleton: swap in your own data and handlers. All follow the canonical
hierarchy `Stripe > Bounds > Section > Chunk`.

> Older codebases may use `variant="hscroll"` on `List`; the current API name
> is `'scroll'`.

## 1. Detail page with responsive action sidebar

Main content and a sidebar that sit side-by-side on large screens and stack
(content first) on small ones.

```jsx
<Stripe style={{ backgroundColor: SWATCHES.notwhite }}>
  <Bounds>
    <Section>
      <Flex direction="column" switchDirection="large" section>
        <FlexItem growFactor={1} section>
          <Chunk>
            <Card shadow>{/* main content */}</Card>
          </Chunk>
        </FlexItem>
        <FlexItem shrink section>
          <View style={{ minWidth: 320 }}>
            <Chunk>{/* primary actions */}</Chunk>
            <Chunk border>{/* linked row */}</Chunk>
            <Chunk border>{/* meta row */}</Chunk>
          </View>
        </FlexItem>
      </Flex>
    </Section>
  </Bounds>
</Stripe>
```

Key ideas: `direction="column" switchDirection="large"` = stacked until
`large`; `growFactor={1}` main column vs `shrink` sidebar; `section` on
Flex/FlexItem keeps section-scale gutters; `Chunk border` makes divider rows.

## 2. Responsive card feed (scroll on mobile, grid on desktop)

The single most common pattern. Works with paginated/infinite data.

```jsx
<List
  variant={{ small: 'scroll', medium: 'grid' }}
  itemsInRow={{ small: 1, medium: 2, large: 4 }}
  scrollItemWidth={300}
  items={items}
  renderItem={(item, i) => (
    <Chunk key={i}>
      <Link href={itemUrl(item)}>
        <Card>{/* card content */}</Card>
      </Link>
    </Chunk>
  )}
/>
```

## 3. Narrow auth/form page

```jsx
<Stripe style={{ flex: 1 }}>
  <Bounds small sparse>
    <Section>
      <Chunk><Text type="pageHead">Sign in</Text></Chunk>
    </Section>
    <Section>
      <form>
        <Chunk>
          <Label for="email">Email</Label>
          <TextInput id="email" value={formState.getFieldValue('email')}
            onChange={e => formState.setFieldValue('email', e.target.value)} />
          <FieldError error={formState.error?.fieldErrors?.email} />
        </Chunk>
        <Chunk>
          <Button label="Sign in" onPress={submitForm} isLoading={formState.loading} width="full" />
        </Chunk>
      </form>
    </Section>
  </Bounds>
</Stripe>
```

## 4. Form state, validation, and toast feedback

```jsx
const formState = useFormState({
  initialFields: { title: '', categoryId: null },
  toastableErrors: { BadRequest: 'Something went wrong', NotAuthenticated: 'Not signed in' },
  addToast: msg => dispatch(addToast(msg))
});

const submitForm = async () => {
  const error = Utils.runValidations(formState.fields, {
    title: { notEmpty: { msg: 'Title can\'t be blank' } }
  });
  formState.setError(error);
  if (!error) {
    formState.setLoading(true);
    try {
      await saveThing(formState.fields);
      dispatch(addToast('Saved!'));
    } catch (error) {
      formState.setError(error);
      formState.setLoading(false);
    }
  }
};
```

`formState.setFieldValues({a, b})` sets multiple fields atomically (e.g.
deriving a slug from a title field).

## 5. Full-bleed hero Stripe with background image

```jsx
<Stripe
  image="https://example.com/hero.jpg"
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

## 6. Compact header / chrome bar

`Sectionless` instead of `Section` skips the vertical rhythm — right for
toolbars and site headers.

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

## 7. Dark section with inverted text

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

## 8. Profile / identity header

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

## 9. Prompt (confirm dialog) content

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

## 10. Dropdown menu on a button

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

## 11. Modal with animated panel swap (login ↔ register)

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

## 12. Empty state

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

## 13. Selectable pill grid (List as a form control)

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

## 14. Animation touches (Bounce and RevealBlock)

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
      <Card>{/* item */}</Card>
    </Chunk>
  </RevealBlock>
))}
```

(See recipe 11 for the Modal + RevealBlock panel-swap pattern.)

## 15. App-level wiring (Page wrapper)

Every page renders inside a shared `Page` component that mounts the global
singletons once:

```jsx
const Page = ({ children }) => (
  <View style={{ minHeight: '100vh', flex: 1 }}>
    {children}
    <LoginModal />
    <ConnectedToaster />   {/* <Toaster toasts={state.toasts} ... /> */}
    <ConnectedPrompter />  {/* <Prompter prompts={state.prompts} ... /> */}
    <ConnectedDropdowner />
  </View>
);
```

Cinderblock has no state-management dependency — the app supplies state and
add/hide/remove actions (Redux in starterkit, but anything works). Then any
component can `dispatch(addToast('Saved!'))` or `dispatch(addPrompt(<MyPrompt />))`.
