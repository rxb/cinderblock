# Utility/Behavioral Components

Utility and Behavioral components provide functionality, animations, state management, and specialized behaviors that enhance the user experience. These components handle complex interactions, animations, and application state.

---

## LoadingBlock

Simple loading state component that reduces opacity to indicate loading status.

### Purpose
- Visual loading state indication
- Non-blocking loading feedback
- Maintains layout during loading
- Simple opacity-based feedback

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isLoading` | `boolean` | `false` | Whether to show loading state |
| `style` | `object` | `{}` | Additional styles |
| `children` | `node` | `null` | Content to show loading state for |

### Usage

```javascript
import { LoadingBlock, Button, Text, Chunk } from '@cinderblock/design-system';

function MyComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoadingBlock isLoading={isSubmitting}>
      <Chunk>
        <Text>Form content that dims while loading</Text>
      </Chunk>
      <Chunk>
        <Button onPress={handleSubmit}>
          Submit Form
        </Button>
      </Chunk>
    </LoadingBlock>
  );
}

// Loading entire sections
<LoadingBlock isLoading={isPageLoading}>
  <Section>
    <Chunk>
      <Text type="pageHead">Page Content</Text>
    </Chunk>
    <Chunk>
      <Text>This entire section dims during loading...</Text>
    </Chunk>
  </Section>
</LoadingBlock>
```

---

## RevealBlock

Advanced animated component for entrance and exit effects with extensive customization options.

### Purpose
- Smooth content transitions
- Staggered entrance animations
- Scroll-triggered reveals
- Complex animation sequences

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | `false` | Whether content is visible |
| `delay` | `number` | `0` | Animation delay in milliseconds |
| `duration` | `number` | `180` | Animation duration in milliseconds |
| `offset` | `number` | `100` | Movement offset for slide animation |
| `fromTop` | `boolean` | `false` | Slide from top instead of bottom |
| `animateEntrance` | `boolean` | `true` | Enable entrance animation |
| `animateExit` | `boolean` | `true` | Enable exit animation |
| `scrollIntoView` | `boolean` | `false` | Scroll element into view when visible |
| `style` | `object` | `{}` | Additional styles |

### Usage

```javascript
import { RevealBlock, Button, Text, Chunk } from '@cinderblock/design-system';

function AnimatedContent() {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <Chunk>
        <Button onPress={() => setShowContent(!showContent)}>
          {showContent ? 'Hide' : 'Show'} Content
        </Button>
      </Chunk>

      <RevealBlock 
        visible={showContent}
        duration={300}
        offset={50}
      >
        <Chunk>
          <Text>This content slides in from below!</Text>
        </Chunk>
      </RevealBlock>
    </>
  );
}

// Staggered animations
function StaggeredList() {
  const [showItems, setShowItems] = useState(false);
  const items = ['First', 'Second', 'Third', 'Fourth'];

  return (
    <>
      <Chunk>
        <Button onPress={() => setShowItems(true)}>
          Reveal List
        </Button>
      </Chunk>

      {items.map((item, index) => (
        <RevealBlock
          key={item}
          visible={showItems}
          delay={index * 100}
          fromTop={index % 2 === 0}
        >
          <Chunk>
            <Text>{item} item with staggered animation</Text>
          </Chunk>
        </RevealBlock>
      ))}
    </>
  );
}

// Scroll-triggered reveal
<RevealBlock 
  visible={isInViewport}
  scrollIntoView={true}
  duration={400}
>
  <Chunk>
    <Text>This reveals when scrolled into view</Text>
  </Chunk>
</RevealBlock>
```

---

## Bounce

Simple animation component that creates a bounce effect when a watched property changes.

### Purpose
- Visual feedback for state changes
- Draw attention to updates
- Celebration animations
- Property change indicators

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `watchProp` | `any` | `null` | Property to watch for changes |
| `scale` | `number` | `1.3` | Maximum scale during bounce |
| `children` | `node` | `null` | Content to animate |

### Usage

```javascript
import { Bounce, Button, Text, Chunk, Icon } from '@cinderblock/design-system';

function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <Chunk>
      <Button onPress={() => setLikes(likes + 1)}>
        <Bounce watchProp={likes}>
          <Icon shape="Heart" /> {likes}
        </Bounce>
      </Button>
    </Chunk>
  );
}

// Bounce on different triggers
function NotificationBadge() {
  const [notifications, setNotifications] = useState(0);

  return (
    <Bounce watchProp={notifications} scale={1.5}>
      <Icon shape="Bell" />
      {notifications > 0 && (
        <Text>{notifications}</Text>
      )}
    </Bounce>
  );
}

// Custom scale bounce
<Bounce watchProp={score} scale={2.0}>
  <Text type="big">🎉 {score}</Text>
</Bounce>
```

---

## useFormState

Comprehensive form state management hook with error handling and loading states.

### Purpose
- Form state management
- Field value get/set helpers
- Error handling and display (converts Feathers.js validation errors into `error.fieldErrors`)
- Loading state tracking

### Parameters

Options object:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `initialFields` | `object` | `{}` | Initial form field values |
| `onChange` | `function` | `() => {}` | Called (debounced) whenever fields change; receives the fields object |
| `toastableErrors` | `object` | `{}` | Map of error `name` → toast message to show when that error is set |
| `addToast` | `function` | `console.error` | Toast function used for toastable errors |

### Returns

| Property | Type | Description |
|----------|------|-------------|
| `fields` | `object` | Current form field values |
| `setFieldValue` | `function` | `setFieldValue(key, value)` — set one field |
| `getFieldValue` | `function` | `getFieldValue(key)` — get one field (returns `''` if unset) |
| `setFieldValues` | `function` | `setFieldValues({...})` — merge multiple field values |
| `resetFields` | `function` | Reset to `initialFields` |
| `loading` | `boolean` | Loading state |
| `setLoading` | `function` | Set loading state |
| `error` | `object` | Current error; API validation errors are exposed as `error.fieldErrors[fieldName]` |
| `setError` | `function` | Set error (Feathers.js errors are converted automatically) |

Note: there is no built-in submit handler — write your own submit function using `setLoading`/`setError`.

### Usage

```javascript
import { useFormState, TextInput, Button, Label, Chunk, FieldError } from '@cinderblock/design-system';

function ContactForm() {
  const formState = useFormState({
    initialFields: {
      name: '',
      email: '',
      message: ''
    },
    onChange: (fields) => {
      // fires (debounced) as fields are edited
      console.log('Form changed:', fields);
    }
  });

  const handleSubmit = async () => {
    formState.setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formState.fields)
      });
      formState.resetFields();
    } catch (error) {
      formState.setError(error); // validation errors land in error.fieldErrors
    }
    formState.setLoading(false);
  };

  return (
    <>
      <Chunk>
        <Label>Name</Label>
        <TextInput 
          value={formState.getFieldValue('name')}
          onChange={(e) => formState.setFieldValue('name', e.target.value)}
          placeholder="Your name"
        />
        <FieldError error={formState.error.fieldErrors?.name} />
      </Chunk>

      <Chunk>
        <Label>Email</Label>
        <TextInput 
          value={formState.getFieldValue('email')}
          onChange={(e) => formState.setFieldValue('email', e.target.value)}
          placeholder="your@email.com"
        />
        <FieldError error={formState.error.fieldErrors?.email} />
      </Chunk>

      <Chunk>
        <Label>Message</Label>
        <TextInput 
          multiline
          value={formState.getFieldValue('message')}
          onChange={(e) => formState.setFieldValue('message', e.target.value)}
          placeholder="Your message..."
        />
      </Chunk>

      <Chunk>
        <Button 
          onPress={handleSubmit}
          isLoading={formState.loading}
          color="primary"
          label="Send Message"
        />
      </Chunk>
    </>
  );
}
```

---

## Reorderable

Drag-and-drop reordering component for interactive list management.

### Purpose
- Interactive list reordering
- Drag-and-drop functionality (web only, via react-dnd)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string\|number` | required | Unique identifier for the item |
| `index` | `number` | required | Current position of the item |
| `moveItem` | `function` | required | `moveItem(dragIndex, hoverIndex)` — reorder your items array |
| `children` | `node` | `null` | Content to make draggable |

Reorderable wraps a single item — render one per list item, inside a `DndProvider`. Requires the optional peer dependencies `react-dnd` and `react-dnd-html5-backend`; without them it renders children without drag functionality and logs a warning.

### Usage

```javascript
import { Reorderable, Card, Sectionless, Chunk, Text } from '@cinderblock/design-system';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function ReorderableList() {
  const [items, setItems] = useState([
    { id: 1, text: 'First item' },
    { id: 2, text: 'Second item' },
    { id: 3, text: 'Third item' }
  ]);

  const moveItem = useCallback((dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];
    const newItems = [...items];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);
    setItems(newItems);
  }, [items]);

  return (
    <DndProvider backend={HTML5Backend}>
      {items.map((item, i) => (
        <Reorderable key={item.id} id={item.id} index={i} moveItem={moveItem}>
          <Card>
            <Sectionless>
              <Chunk>
                <Text>{item.text}</Text>
              </Chunk>
            </Sectionless>
          </Card>
        </Reorderable>
      ))}
    </DndProvider>
  );
}
```

---

## Prompter

Queue-based modal prompt system for confirmations and lightweight dialogs.

### Purpose
- User confirmations
- Alert dialogs
- Decision prompts
- Destructive action confirmations

### How it works

Like Toaster and Dropdowner, Prompter is state-agnostic: you own a `prompts` array (React state, Redux, or context) and pass management functions in as props. Each prompt object provides its own `content` element; the first prompt in the queue is displayed. There are no `title`/`message`/`onConfirm` props — you compose the prompt body yourself.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `prompts` | `array` | Queue of prompt objects: `{id, content, showable, dismissable?, onPressEnter?, onRequestClose?, onCompleteClose?}` |
| `hidePrompt` | `function` | `hidePrompt(id)` — set that prompt's `showable` to `false` (starts the close animation) |
| `removePrompt` | `function` | `removePrompt(id)` — remove the prompt from the array after closing |

Prompt object fields: `content` (element, receives injected `onRequestClose`/`onCompleteClose` props), `showable` (boolean, controls visibility), `dismissable` (default `true`; when `false`, backdrop click and Escape are ignored), `onPressEnter` (Enter key handler).

### Usage

```javascript
import { Prompter, Button, Chunk, Section, Text } from '@cinderblock/design-system';

function DeleteButton() {
  const [prompts, setPrompts] = useState([]);

  const hidePrompt = (id) =>
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, showable: false } : p));
  const removePrompt = (id) =>
    setPrompts(prev => prev.filter(p => p.id !== id));

  const showDeletePrompt = () => {
    const id = Date.now();
    const content = (
      <Section>
        <Chunk><Text type="sectionHead">Confirm deletion</Text></Chunk>
        <Chunk><Text>This action cannot be undone.</Text></Chunk>
        <Chunk>
          <Button color="secondary" onPress={() => hidePrompt(id)} label="Cancel" />
        </Chunk>
        <Chunk>
          <Button
            onPress={() => {
              console.log('Item deleted');
              hidePrompt(id);
            }}
            label="Delete"
          />
        </Chunk>
      </Section>
    );
    setPrompts(prev => [...prev, { id, content, showable: true }]);
  };

  return (
    <>
      <Button onPress={showDeletePrompt} label="Delete Item" />

      {/* mount once, near the root of the page */}
      <Prompter
        prompts={prompts}
        hidePrompt={hidePrompt}
        removePrompt={removePrompt}
      />
    </>
  );
}
```

---

## Toaster

Toast notification system for temporary message display.

### Purpose
- Success notifications
- Error messages
- Information alerts
- Non-blocking feedback

### How it works

Toaster is state-agnostic — there is no `useToast` hook exported by the library. You own the `toasts` array (React state, Redux, or context) and pass management functions in as props. Each toast is `{id, message, visible, autoHide?, hideDelay?}`; `autoHide` defaults to `true` and `hideDelay` defaults to `2500` ms. Mount one Toaster near the root of the app. (See `ConnectedToaster` in the kitchensink starter for a Redux-wired example.)

### Props

| Prop | Type | Description |
|------|------|-------------|
| `toasts` | `array` | Toast objects to display |
| `hideToast` | `function` | `hideToast(id)` — set that toast's `visible` to `false` (starts the exit animation) |
| `removeToast` | `function` | `removeToast(id)` — remove the toast from the array after hiding |

### Usage

```javascript
import { Toaster, Button, Chunk } from '@cinderblock/design-system';

function MyComponent() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, options = {}) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, visible: true, ...options }]);
  };
  const hideToast = (id) =>
    setToasts(prev => prev.map(t => t.id === id ? { ...t, visible: false } : t));
  const removeToast = (id) =>
    setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <>
      <Chunk>
        <Button
          onPress={() => addToast('Operation completed successfully!')}
          label="Show Success Toast"
        />
      </Chunk>
      
      <Chunk>
        <Button
          onPress={() => addToast('Something went wrong.', { hideDelay: 5000 })}
          label="Show Error Toast"
        />
      </Chunk>

      {/* mount once, near the root of the app */}
      <Toaster
        toasts={toasts}
        hideToast={hideToast}
        removeToast={removeToast}
      />
    </>
  );
}
```

---

## FieldError

Form validation error display component.

### Purpose
- Form field error display
- Validation feedback
- Accessible error messaging
- Consistent error styling

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `error` | `string` | `null` | Error message; renders nothing when falsy, so it's safe to include unconditionally |
| `style` | `object` | `null` | Additional styles for the error text |

### Usage

```javascript
import { FieldError, TextInput, Label, Chunk } from '@cinderblock/design-system';

function ValidatedInput({ value, onChange, error, label, ...props }) {
  return (
    <Chunk>
      <Label>{label}</Label>
      <TextInput 
        value={value}
        onChange={onChange}
        {...props}
      />
      <FieldError error={error} />
    </Chunk>
  );
}

// Usage in form
<ValidatedInput
  label="Email"
  value={email}
  onChange={setEmail}
  error={emailError}
  placeholder="your@email.com"
/>
```

---

## Map

Placeholder map component. The current implementation renders an empty `View` — the Leaflet integration is commented out in the source (`components/Map.js`) to avoid bundle size and compatibility issues.

### Purpose (when the Leaflet implementation is enabled)
- Location display with OpenStreetMap tiles
- Marker clustering
- Popup support and bounds fitting

### Intended usage (Leaflet implementation, currently disabled)

```javascript
import { Map, Chunk } from '@cinderblock/design-system';

function StoreLocations() {
  return (
    <Chunk>
      <Map
        center={[37.7749, -122.4194]}    // [lat, lon] array
        zoom={12}
        markers={[
          { lat: 37.7749, lon: -122.4194, title: 'San Francisco' }
        ]}
        cluster={true}
        fitBounds={true}
        style={{ height: 400, width: '100%' }}
      />
    </Chunk>
  );
}
```

---

## Complete Example: Interactive Dashboard

Here's how utility/behavioral components work together to create an interactive dashboard:

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
  Button,
  Card,
  LoadingBlock,
  RevealBlock,
  Bounce,
  useFormState,
  Toaster
} from '@cinderblock/design-system';

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [notifications, setNotifications] = useState(0);

  // toast state (Toaster is state-agnostic; see Toaster section)
  const [toasts, setToasts] = useState([]);
  const addToast = (message) =>
    setToasts(prev => [...prev, { id: Date.now(), message, visible: true }]);
  const hideToast = (id) =>
    setToasts(prev => prev.map(t => t.id === id ? { ...t, visible: false } : t));
  const removeToast = (id) =>
    setToasts(prev => prev.filter(t => t.id !== id));

  const formState = useFormState({
    initialFields: { message: '' }
  });

  const sendMessage = async () => {
    formState.setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    formState.resetFields();
    formState.setLoading(false);
    addToast('Message sent!');
  };

  // Simulate loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setShowStats(true);
    }, 2000);
  }, []);

  const stats = [
    { label: 'Users', value: 1234, delay: 0 },
    { label: 'Revenue', value: '$56,789', delay: 100 },
    { label: 'Orders', value: 890, delay: 200 },
    { label: 'Growth', value: '+12%', delay: 300 }
  ];

  return (
    <>
      <Stripe>
        <Bounds>
          <Section>
          <Chunk>
            <Flex justify="space-between" align="center">
              <FlexItem>
                <Text type="pageHead">Dashboard</Text>
              </FlexItem>
              <FlexItem>
                <Bounce watchProp={notifications}>
                  <Button
                    onPress={() => setNotifications(n => n + 1)}
                    label={`🔔 ${notifications}`}
                  />
                </Bounce>
              </FlexItem>
            </Flex>
          </Chunk>

          <LoadingBlock isLoading={isLoading}>
            <Chunk>
              <Flex switchDirection={true}>
                {stats.map((stat, index) => (
                  <FlexItem key={stat.label}>
                    <RevealBlock 
                      visible={showStats}
                      delay={stat.delay}
                      fromTop={index % 2 === 0}
                    >
                      <Card shadow>
                        <Chunk>
                          <Text color="secondary">{stat.label}</Text>
                        </Chunk>
                        <Chunk>
                          <Text type="big" weight="strong">
                            {stat.value}
                          </Text>
                        </Chunk>
                      </Card>
                    </RevealBlock>
                  </FlexItem>
                ))}
              </Flex>
            </Chunk>
          </LoadingBlock>

          <RevealBlock visible={showStats} delay={600}>
            <Chunk>
              <Card>
                <Sectionless>
                  <Chunk>
                    <Text type="sectionHead">Quick Actions</Text>
                  </Chunk>

                  <Chunk>
                    <TextInput
                      placeholder="Send a message..."
                      value={formState.getFieldValue('message')}
                      onChange={(e) => formState.setFieldValue('message', e.target.value)}
                      multiline
                    />
                  </Chunk>

                  <Chunk>
                    <Button 
                      onPress={sendMessage}
                      isLoading={formState.loading}
                      color="primary"
                      label="Send Message"
                    />
                  </Chunk>
                </Sectionless>
              </Card>
            </Chunk>
          </RevealBlock>
          </Section>
        </Bounds>
      </Stripe>

      <Toaster
        toasts={toasts}
        hideToast={hideToast}
        removeToast={removeToast}
      />
    </>
  );
}
```

This example demonstrates how utility and behavioral components enhance user interactions with:

- **Loading states** that maintain layout during data fetching
- **Staggered animations** that create engaging entrance effects  
- **Interactive feedback** through bounce animations
- **Form state management** with validation and submission handling
- **Toast notifications** for user feedback
- **Responsive reveals** that create a progressive disclosure experience

The combination creates a polished, interactive interface that feels responsive and engaging while maintaining the structural hierarchy principles of the design system.