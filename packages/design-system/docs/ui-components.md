# UI/Interactive Components

UI and Interactive components handle user interactions, form inputs, and user-triggered actions. These components provide the interface elements users directly interact with.

---

## Button

The primary action component for user interactions. Supports multiple styles, sizes, and states.

### Purpose
- Primary and secondary action triggers
- Navigation actions
- Form submission
- Interactive elements with visual feedback

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `'primary'` | Button color variant (`'primary'`, `'secondary'`) |
| `size` | `string` | `'medium'` | Button size (`'small'`, `'medium'`, `'large'`) |
| `inverted` | `boolean` | `false` | Use inverted color scheme |
| `variant` | `object` | `null` | Responsive width/behavior variant object (e.g. `{small: 'grow', medium: 'shrink'}`), keyed by breakpoint. Overrides `width` if both are set |
| `width` | `string` | `null` | Shorthand for common responsive widths: `'snap'` (full-width on mobile, shrink on desktop), `'full'` (full-width always). Omit for shrink-to-content on all sizes |
| `href` | `string` | `null` | Link destination — renders as a `Link` instead of a touchable |
| `dummy` | `boolean` | `false` | Render as a plain `View` instead of a touchable, for buttons nested inside an already-clickable element |
| `onPress` | `function` | `null` | Press handler (ignored when `href` or `dummy` is set); ordinary action buttons use this |
| `type` | `string` | `null` | Use `'submit'` inside a web form to render a native submit button |
| `disabled` | `boolean` | `false` | Disable an action or submit button |
| `label` | `string` | `null` | Text rendered next to an optional `shape` icon (alternative to passing `children`) |
| `shape` | `string` | `null` | Icon shape to display before the label/children |
| `isLoading` | `boolean` | `false` | Show a centered `ActivityIndicator`, hide the content, and disable the action |
| `children` | `node` | `null` | Button content |

### Usage

```javascript
import { Button, Chunk, Section, Stripe } from '@cinderblock/design-system';

// Basic button
<Chunk>
  <Button onPress={() => alert('Clicked!')}>
    Click Me
  </Button>
</Chunk>

// Different sizes and colors
<Chunk>
  <Button size="small" color="secondary" label="Small Button" />
</Chunk>
<Chunk>
  <Button size="medium" color="primary" label="Medium Button" />
</Chunk>
<Chunk>
  <Button size="large" color="secondary" label="Large Button" />
</Chunk>

// Loading state
<Chunk>
  <Button isLoading={true} color="primary" label="Saving..." />
</Chunk>

// Native web form submission
<form onSubmit={handleSubmit}>
  <Chunk>
    <Button type="submit" isLoading={isSubmitting} label="Save" />
  </Chunk>
</form>

// Link button
<Chunk>
  <Button href="/about" label="About Us" />
</Chunk>

// Button with icon (shape names come from Feather icons, capitalized)
<Chunk>
  <Button onPress={handleSave} shape="Save" label="Save Changes" />
</Chunk>

// Responsive width: full-width on mobile, shrink-to-content on desktop
<Chunk>
  <Button width="snap" onPress={handleSubmit} label="Submit" />
</Chunk>
```

---

## Touch

Base touchable component that provides press feedback and handles touch interactions.

### Purpose
- Base component for creating touchable elements
- Provides consistent press feedback
- Handles loading states
- Foundation for other interactive components

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onPress` | `function` | `null` | Press handler |
| `noFeedback` | `boolean` | `false` | Disable press feedback |
| `isLoading` | `boolean` | `false` | Show loading state |
| `style` | `object` | `{}` | Additional styles |
| `children` | `node` | `null` | Content |

### Usage

```javascript
import { Touch, Text, Chunk } from '@cinderblock/design-system';

// Basic touchable element
<Chunk>
  <Touch onPress={() => console.log('Touched!')}>
    <Text>Tap me</Text>
  </Touch>
</Chunk>

// Touch without feedback
<Chunk>
  <Touch onPress={handlePress} noFeedback>
    <Text>No visual feedback</Text>
  </Touch>
</Chunk>

// Loading touch
<Chunk>
  <Touch onPress={handlePress} isLoading={isSubmitting}>
    <Text>Submit Form</Text>
  </Touch>
</Chunk>
```

---

## TextInput

Form text input component with auto-expansion and character counting features.

### Purpose
- Text input for forms
- Multi-line text areas
- Character counting and validation
- Auto-expanding height

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoExpand` | `boolean` | `true` | Auto-expand height for multiline |
| `multiline` | `boolean` | `false` | Enable multiline input |
| `accessibilityLabel` | `string` | `null` | Persistent programmatic name when a compact standalone control intentionally has no visible `Label` |
| `placeholder` | `string` | `null` | Placeholder text |
| `maxLength` | `number` | `null` | Maximum character count |
| `showCounter` | `boolean` | `false` | Show character counter (requires `maxLength`) |
| `value` | `string` | `''` | Input value |
| `onChange` | `function` | `() => {}` | Change handler — receives the raw DOM change event, not the value directly. Read the text with `event.target.value` |
| `onFocus` | `function` | `() => {}` | Focus handler |
| `onBlur` | `function` | `() => {}` | Blur handler |
| `onKeyPress` | `function` | `undefined` | Input-level keyboard handler; use `event.nativeEvent.key` as the cross-platform fallback |

### Usage

```javascript
import { TextInput, Chunk, Label } from '@cinderblock/design-system';

// Basic text input
// Note: onChange receives the DOM event, so read event.target.value
<Chunk>
  <Label htmlFor="name">Name</Label>
  <TextInput 
    id="name"
    placeholder="Enter your name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
</Chunk>

// Multiline with character counter
<Chunk>
  <Label htmlFor="description">Description</Label>
  <TextInput 
    id="description"
    multiline
    placeholder="Enter description..."
    maxLength={500}
    showCounter
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />
</Chunk>

// Email input
<Chunk>
  <Label htmlFor="email">Email</Label>
  <TextInput 
    id="email"
    placeholder="your@email.com"
    autoExpand={false}
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</Chunk>

// Compact standalone search. Forms should normally keep a visible Label.
<TextInput
  accessibilityLabel="Search patients"
  placeholder="Search by patient name"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
```

---

## CheckBox

Boolean input component with custom styling and label support.

### Purpose
- Boolean form inputs
- Option selection
- Form validation
- Accessible checkbox with custom styling

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | `false` | Checkbox state |
| `onChange` | `function` | `null` | Change handler; always receives the next boolean value |
| `label` | `string` | `null` | Checkbox label (clickable) |
| `id` | `string` | generated | Checkbox ID used to associate its visible label |

### Usage

```javascript
import { CheckBox, Chunk } from '@cinderblock/design-system';

// Basic checkbox
<Chunk>
  <CheckBox 
    id="terms"
    value={isChecked}
    onChange={setIsChecked}
    label="I agree to the terms"
  />
</Chunk>

// Multiple checkboxes
<Chunk>
  <CheckBox 
    id="notifications"
    value={notifications}
    onChange={setNotifications}
    label="Email notifications"
  />
</Chunk>
<Chunk>
  <CheckBox 
    id="marketing"
    value={marketing}
    onChange={setMarketing}
    label="Marketing emails"
  />
</Chunk>
```

---

## Picker

Dropdown selection component with custom styling.

### Purpose
- Dropdown selection from options
- Form select inputs
- Custom styled dropdown with arrow

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedValue` | `any` | `null` | Currently selected value |
| `onValueChange` | `function` | `null` | Selection change handler (receives the new value) |
| `style` | `object` | `null` | Additional styles for the select element |
| `children` | `node` | `null` | `Picker.Item` components |

All other props are passed through to react-native-web's `Picker`. The design system adds input styling and a chevron icon.

### Usage

```javascript
import { Picker, Chunk, Label } from '@cinderblock/design-system';

// Basic picker
<Chunk>
  <Label htmlFor="country">Country</Label>
  <Picker
    id="country"
    selectedValue={selectedCountry}
    onValueChange={setSelectedCountry}
  >
    <Picker.Item label="United States" value="us" />
    <Picker.Item label="Canada" value="ca" />
    <Picker.Item label="United Kingdom" value="uk" />
  </Picker>
</Chunk>
```

---

## Modal

Responsive overlay for a temporary page-like task. Treat the inside of a
standard Modal as a mini regular screen: it owns one or more visual regions and
H2-level content groups, using the same structural rhythm as a page.

### Purpose
- Dialog overlays
- Form modals
- Search, selection, and multi-step tasks
- Full-screen content overlays

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | `false` | Whether modal is visible |
| `accessibilityLabel` | `string` | none | Accessible dialog name. Required unless `aria-labelledby` points to a visible heading |
| `onRequestClose` | `function` | `() => {}` | Called with `escape`, `backdrop`, or `close-button`. Set `visible` to `false` in response |
| `onCompleteClose` | `function` | `() => {}` | Called after the close animation finishes |
| `dismissable` | `boolean` | `true` | Whether Escape and the standard close control may dismiss the dialog |
| `closeOnBackdropPress` | `boolean` | `true` | Whether backdrop presses request dismissal when the dialog is dismissible |
| `closeLabel` | `string` | `Close dialog` | Accessible name for the icon-only close control |
| `showCloseButton` | `boolean` | value of `dismissable` | Whether to render the standard close control |
| `initialFocusId` | `string` | none | ID of the preferred initial focus target inside the dialog |
| `initialFocusRef` | `ref` | none | Ref for the preferred initial focus target when an ID is unsuitable |
| `variant` | `modal` \| `prompt` | `modal` | Standard responsive sheet/dialog or compact prompt presentation |

Modal renders through a portal under `body`, marks `#__next` inert while it is
open, traps Tab and Shift+Tab inside the dialog, restores focus after closing,
and locks background scrolling. It uses a bottom sheet below the medium
breakpoint and respects `prefers-reduced-motion`. Enter retains native button
and form behavior; Modal does not provide a global Enter shortcut.

### Content composition

Use **`Modal > Stripe > Section(s) > Chunk > content`**.

- Include Stripe because the Modal is a temporary page surface and may contain
  one or more full-width visual regions.
- Do not include Bounds. Modal already limits its own width; adding Bounds
  double-constrains the content.
- The first Section commonly contains the `pageHead`. A peer H2-level group
  starts another Section.
- Do not add a Card merely to make the modal look contained. Modal already
  supplies the outer surface; use Card only when the content inside it contains
  a genuinely distinct object.

### Usage

```javascript
import { Modal, Button, Chunk, Text, Section, Stripe } from '@cinderblock/design-system';

function MyComponent() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Chunk>
        <Button onPress={() => setModalVisible(true)}>
          Open Modal
        </Button>
      </Chunk>

      <Modal 
        visible={modalVisible}
        accessibilityLabel="Modal title"
        onRequestClose={() => setModalVisible(false)}
      >
        <Stripe>
          <Section>
            <Chunk>
              <Text type="pageHead">Modal Title</Text>
            </Chunk>
            <Chunk>
              <Text>Modal content goes here...</Text>
            </Chunk>
            <Chunk>
              <Button onPress={() => setModalVisible(false)}>
                Close
              </Button>
            </Chunk>
          </Section>
        </Stripe>
      </Modal>
    </>
  );
}
```

---

## Prompter

Queue adapter for compact confirmation dialogs. `Prompter` renders the first
prompt descriptor, injects `onRequestClose` into its content, starts the close
animation through `hidePrompt(id)`, and removes the record through
`removePrompt(id)` after animation completion.

Unlike a standard Modal, a Prompt is a compact, card-like decision surface.
Its ordinary content structure is **`Prompter > Section > Chunk > content`**.
Do not add Stripe or Bounds, and do not wrap the whole prompt in Card: the
prompt presentation already supplies that visual boundary.

Prompter never renders Modal's corner close control. Prompt content must
provide an explicit cancel-like, acknowledgement, or alternative-choice
action. When `dismissable` is true, Escape and backdrop presses may still
request cancellation; `showCloseButton` cannot opt a Prompt back into the
corner control.

Each prompt accepts Modal's naming, focus, and dismissal props other than
`showCloseButton`, plus:

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Stable queue record ID |
| `showable` | `boolean` | `true` while open, `false` while closing |
| `content` | `element` | Prompt content; receives `onRequestClose` |
| `dismissable` | `boolean` | Controls Escape, backdrop, and standard close behavior |

Prompter deliberately does not invoke `onPressEnter`. A destructive action
must run only when its explicit button is activated. Keep queued records and
callbacks outside Cinderblock; application adapters may translate serializable
Redux descriptors into `content` elements at the root host.

```javascript
function RemovePrompt({ onRequestClose }) {
  return (
    <Section>
      <Chunk>
        <Text type="sectionHead">Remove exercise?</Text>
      </Chunk>
      <Chunk>
        <Text>This changes the current program without rewriting history.</Text>
      </Chunk>
      <Chunk>
        <Button label="Cancel" color="secondary" onPress={onRequestClose} />
        <Button label="Remove exercise" onPress={removeExercise} />
      </Chunk>
    </Section>
  );
}
```

For the reusable descriptor, registry, lifecycle, and conflict-policy pattern,
see [Global layer state integration](./global-layer-state.md).

---

## Tabs

Tab navigation component for switching between content sections.

### Purpose
- Tab-based navigation
- Content section switching
- Horizontal navigation

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedValue` | `string` | first tab's `value` | Currently selected tab |
| `onChange` | `function` | `null` | Tab change handler — receives the selected tab's `value` |
| `fullWidth` | `boolean` | `false` | Distribute tabs evenly across the full width |
| `id` | `string` | generated | Stable base used to associate tabs and tabpanels; specify one when rendering `Tabs.Panel` |
| `accessibilityLabel` | `string` | none | Accessible name for the tablist when context does not already provide one |

Tabs are declared as `Tabs.Item` children (there is no `tabs` array prop). Each `Tabs.Item` takes a `value` (unique identifier) and a `label` (display text); selection state and the `onChange` handler are passed down automatically.

On web, each item is a native `button` with `role="tab"`; `type="button"`
prevents accidental submission when Tabs appears inside a form. Only the
selected tab is in the Tab sequence. In a horizontal tab list, Arrow Right
selects the next tab, Arrow Left selects the previous tab, and Home/End select
the first/last tab. Up/Down retain their normal page-scrolling behavior. Pair
the list with `Tabs.Panel`; inactive panels are not rendered, and the active
panel is associated with its tab.

### Usage

```javascript
import { Tabs, Chunk, Text } from '@cinderblock/design-system';

function TabExample() {
  const [selectedTab, setSelectedTab] = useState('tab1');

  return (
    <>
      <Chunk>
        <Tabs 
          id="account-tabs"
          accessibilityLabel="Account sections"
          selectedValue={selectedTab}
          onChange={setSelectedTab}
        >
          <Tabs.Item value="tab1" label="Overview" />
          <Tabs.Item value="tab2" label="Details" />
          <Tabs.Item value="tab3" label="Settings" />
        </Tabs>
      </Chunk>
      
      <Tabs.Panel tabsId="account-tabs" value="tab1" selectedValue={selectedTab}>
        <Chunk><Text>Overview content</Text></Chunk>
      </Tabs.Panel>
      <Tabs.Panel tabsId="account-tabs" value="tab2" selectedValue={selectedTab}>
        <Chunk><Text>Details content</Text></Chunk>
      </Tabs.Panel>
      <Tabs.Panel tabsId="account-tabs" value="tab3" selectedValue={selectedTab}>
        <Chunk><Text>Settings content</Text></Chunk>
      </Tabs.Panel>
    </>
  );
}
```

---

## Dropdown System

A collection of components for creating contextual dropdown menus.

### Components
- `Dropdowner` - Container that renders all active dropdowns (mount once, near the root)
- `DropdownTouch` - Touchable trigger that measures its position and opens a dropdown
- `DropdownItem` - Individual menu item (supports `onPress`, `href`, or `dummy`)

### Purpose
- Context menus
- Action menus
- Option selection dropdowns
- Positioned overlay menus

### How it works

The dropdown system is state-agnostic: you own the `dropdowns` array (in React state, Redux, or context) and pass the management functions in as props. `DropdownTouch` wraps your trigger element and takes the dropdown `content` element plus the state functions; the `Dropdowner` container renders whatever is in the `dropdowns` array at the measured position. (See `ConnectedDropdowner` in the kitchensink starter for a Redux-wired example.)

- `DropdownTouch` props: `dropdown` (element to show), `dropdowns`, `addDropdown(content, {x, y, id, side})`, `hideDropdown(id)`, `clearDropdowns()`
- `Dropdowner` props: `dropdowns`, `hideDropdown(id)`, `removeDropdown(id)`
- `DropdownItem` props: `onPress` or `href` (or `dummy` to render unclickable), `children`

### Usage

```javascript
import { 
  Dropdowner, 
  DropdownTouch, 
  DropdownItem, 
  Button,
  Sectionless,
  Text 
} from '@cinderblock/design-system';

function DropdownExample() {
  // you own this state; could also live in Redux or context
  const [dropdowns, setDropdowns] = useState([]);
  const addDropdown = (content, position) =>
    setDropdowns(prev => [...prev, { ...position, content, visible: true }]);
  const hideDropdown = (id) =>
    setDropdowns(prev => prev.map(d => d.id === id ? { ...d, visible: false } : d));
  const removeDropdown = (id) =>
    setDropdowns(prev => prev.filter(d => d.id !== id));
  const clearDropdowns = () => setDropdowns([]);

  const menu = (
    <Sectionless>
      <DropdownItem onPress={() => console.log('Edit')}>
        <Text>Edit</Text>
      </DropdownItem>
      <DropdownItem onPress={() => console.log('Delete')}>
        <Text>Delete</Text>
      </DropdownItem>
    </Sectionless>
  );

  return (
    <>
      <DropdownTouch
        dropdown={menu}
        dropdowns={dropdowns}
        addDropdown={addDropdown}
        hideDropdown={hideDropdown}
        clearDropdowns={clearDropdowns}
      >
        <Button dummy shape="ChevronDown" label="Options" />
      </DropdownTouch>

      {/* mount once, near the root of the page */}
      <Dropdowner
        dropdowns={dropdowns}
        hideDropdown={hideDropdown}
        removeDropdown={removeDropdown}
      />
    </>
  );
}
```

---

## File Upload Components

### FileInput & PhotoInput

Components for handling file and photo uploads.

### Purpose
- File upload handling
- Photo selection and upload with preview and removal
- Form file inputs

### FileInput props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Pick a file'` | Placeholder text |
| `shape` | `string` | `'ChevronDown'` | Icon shape shown in the input |
| `onChangeFile` | `function` | `() => {}` | Receives `{file, preview, filename}` when a file is selected (`preview` is a data URL) |
| `onChange` | `function` | `() => {}` | Raw change handler for the underlying `<input type="file">` |
| `inputKey` | `string\|number` | `null` | Change this key to reset/clear the input |

### PhotoInput props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fileState` | `object` | required | Current file state (`{file, preview, filename}` or `{}`) — you hold this state |
| `onChangeFile` | `function` | required | Called with the new file state on select, or `{}` on remove |

### Usage

```javascript
import { FileInput, PhotoInput, Chunk, Label } from '@cinderblock/design-system';

// File input
<Chunk>
  <Label>Upload Document</Label>
  <FileInput 
    placeholder="Choose a document..."
    onChangeFile={(fileState) => setDocument(fileState)} 
  />
</Chunk>

// Photo input (controlled — shows preview thumbnail and a remove button)
<Chunk>
  <Label>Profile Photo</Label>
  <PhotoInput 
    fileState={photoState}
    onChangeFile={setPhotoState} 
  />
</Chunk>
```

---

## FakeInput

Touchable component that looks like a text input but acts as a button. Useful for triggering modals, pickers, or other complex input flows while keeping form styling consistent.

### Purpose
- Input-styled trigger for modals and pickers
- Date/location/category selectors
- Read-only, input-styled display with a press action

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `null` | Display text (rendered in hint color, like a placeholder) |
| `shape` | `string` | `null` | Optional icon shape shown at the right edge |
| `onPress` | `function` | `() => {}` | Press handler |
| `onFocus` | `function` | `() => {}` | Focus handler |
| `onBlur` | `function` | `() => {}` | Blur handler |
| `style` | `object` | `null` | Additional styles |

### Usage

```javascript
import { FakeInput, Chunk, Label } from '@cinderblock/design-system';

<Chunk>
  <Label>Event Date</Label>
  <FakeInput
    label={selectedDate ? selectedDate.toLocaleDateString() : 'Select a date'}
    shape="Calendar"
    onPress={() => setShowPicker(true)}
  />
</Chunk>
```

---

## Complete Form Example

The component composition is shown below. For validation, accessible error
associations, API failures, editing existing records, and repeatable fields,
use the canonical [form guide](./forms.md).

```javascript
import { 
  Stripe,
  Bounds,
  Section, 
  Chunk, 
  Flex,
  FlexItem,
  Text,
  TextInput,
  CheckBox,
  Picker,
  Button,
  Label
} from '@cinderblock/design-system';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    message: '',
    newsletter: false
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Stripe>
      <Bounds>
        <Section>
          <Chunk>
            <Text type="pageHead">Contact Us</Text>
          </Chunk>

          <form onSubmit={handleSubmit}>
          <Chunk>
            <Label htmlFor="name">Name</Label>
            <TextInput 
              id="name"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </Chunk>

          <Chunk>
            <Label htmlFor="email">Email</Label>
            <TextInput 
              id="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </Chunk>

          <Chunk>
            <Label htmlFor="country">Country</Label>
            <Picker
              id="country"
              selectedValue={formData.country}
              onValueChange={(country) => setFormData({...formData, country})}
            >
              <Picker.Item label="Select Country" value="" />
              <Picker.Item label="United States" value="us" />
              <Picker.Item label="Canada" value="ca" />
            </Picker>
          </Chunk>

          <Chunk>
            <Label htmlFor="message">Message</Label>
            <TextInput 
              id="message"
              multiline
              placeholder="Your message..."
              maxLength={500}
              showCounter
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </Chunk>

          <Chunk>
            <CheckBox 
              id="newsletter"
              value={formData.newsletter}
              onChange={(newsletter) => setFormData({...formData, newsletter})}
              label="Subscribe to newsletter"
            />
          </Chunk>

          <Chunk>
            <Flex>
              <FlexItem>
                <Button color="secondary" label="Cancel" />
              </FlexItem>
              <FlexItem>
                <Button type="submit" color="primary" label="Send Message" />
              </FlexItem>
            </Flex>
          </Chunk>
          </form>
        </Section>
      </Bounds>
    </Stripe>
  );
}
```

This demonstrates how UI components integrate with structural components to create functional, well-spaced forms that follow the design system's spacing and layout principles.
