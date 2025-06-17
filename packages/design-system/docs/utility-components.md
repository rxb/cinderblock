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
          <Icon shape="heart" /> {likes}
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
      <Icon shape="bell" />
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

Comprehensive form state management hook with validation, error handling, and submission states.

### Purpose
- Form state management
- Field validation
- Error handling and display
- Submission state tracking

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialFields` | `object` | `{}` | Initial form field values |
| `onChange` | `function` | `null` | Form change handler |
| `toastableErrors` | `boolean` | `false` | Show errors as toasts |
| `addToast` | `function` | `null` | Toast addition function |

### Returns

| Property | Type | Description |
|----------|------|-------------|
| `fields` | `object` | Current form field values |
| `setField` | `function` | Set individual field value |
| `setFields` | `function` | Set multiple field values |
| `fieldErrors` | `object` | Field-specific error messages |
| `setFieldErrors` | `function` | Set field errors |
| `submitting` | `boolean` | Whether form is submitting |
| `setSubmitting` | `function` | Set submission state |
| `handleSubmit` | `function` | Form submission handler |

### Usage

```javascript
import { useFormState, TextInput, Button, Label, Chunk, Text } from '@cinderblock/design-system';

function ContactForm() {
  const {
    fields,
    setField,
    fieldErrors,
    setFieldErrors,
    submitting,
    handleSubmit
  } = useFormState({
    initialFields: {
      name: '',
      email: '',
      message: ''
    },
    onChange: (fields) => {
      // Validation on change
      const errors = {};
      if (!fields.name) errors.name = 'Name is required';
      if (!fields.email) errors.email = 'Email is required';
      if (fields.email && !fields.email.includes('@')) {
        errors.email = 'Invalid email format';
      }
      setFieldErrors(errors);
    }
  });

  const onSubmit = async () => {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(fields)
      });
      // Success handling
    } catch (error) {
      setFieldErrors({ submit: 'Failed to send message' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Chunk>
        <Label>Name</Label>
        <TextInput 
          value={fields.name}
          onChange={(name) => setField('name', name)}
          placeholder="Your name"
        />
        {fieldErrors.name && (
          <Text color="error">{fieldErrors.name}</Text>
        )}
      </Chunk>

      <Chunk>
        <Label>Email</Label>
        <TextInput 
          value={fields.email}
          onChange={(email) => setField('email', email)}
          placeholder="your@email.com"
        />
        {fieldErrors.email && (
          <Text color="error">{fieldErrors.email}</Text>
        )}
      </Chunk>

      <Chunk>
        <Label>Message</Label>
        <TextInput 
          multiline
          value={fields.message}
          onChange={(message) => setField('message', message)}
          placeholder="Your message..."
        />
      </Chunk>

      <Chunk>
        <Button 
          type="submit" 
          isLoading={submitting}
          color="primary"
        >
          {submitting ? 'Sending...' : 'Send Message'}
        </Button>
      </Chunk>

      {fieldErrors.submit && (
        <Chunk>
          <Text color="error">{fieldErrors.submit}</Text>
        </Chunk>
      )}
    </form>
  );
}
```

---

## Reorderable

Drag-and-drop reordering component for interactive list management.

### Purpose
- Interactive list reordering
- Drag-and-drop functionality
- Touch-friendly reordering
- Custom drag handles

### Usage

```javascript
import { Reorderable, List, Card, Text, Icon } from '@cinderblock/design-system';

function ReorderableList() {
  const [items, setItems] = useState([
    { id: 1, text: 'First item' },
    { id: 2, text: 'Second item' },
    { id: 3, text: 'Third item' }
  ]);

  const handleReorder = (newOrder) => {
    setItems(newOrder);
  };

  return (
    <Reorderable 
      items={items}
      onReorder={handleReorder}
      renderItem={(item) => (
        <Card key={item.id}>
          <Flex>
            <FlexItem>
              <Icon shape="menu" /> {/* Drag handle */}
            </FlexItem>
            <FlexItem>
              <Text>{item.text}</Text>
            </FlexItem>
          </Flex>
        </Card>
      )}
    />
  );
}
```

---

## Prompter

User confirmation and prompt dialog system.

### Purpose
- User confirmations
- Alert dialogs
- Decision prompts
- Destructive action confirmations

### Usage

```javascript
import { Prompter, Button, Chunk } from '@cinderblock/design-system';

function DeleteButton() {
  const [showPrompt, setShowPrompt] = useState(false);

  const handleDelete = () => {
    setShowPrompt(true);
  };

  const confirmDelete = () => {
    // Perform deletion
    console.log('Item deleted');
    setShowPrompt(false);
  };

  return (
    <>
      <Button color="danger" onPress={handleDelete}>
        Delete Item
      </Button>

      <Prompter
        visible={showPrompt}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setShowPrompt(false)}
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

### Usage

```javascript
import { Toaster, Button, useToast } from '@cinderblock/design-system';

function MyComponent() {
  const { addToast } = useToast();

  const showSuccess = () => {
    addToast({
      type: 'success',
      message: 'Operation completed successfully!',
      duration: 3000
    });
  };

  const showError = () => {
    addToast({
      type: 'error',
      message: 'Something went wrong. Please try again.',
      duration: 5000
    });
  };

  return (
    <>
      <Chunk>
        <Button onPress={showSuccess}>
          Show Success Toast
        </Button>
      </Chunk>
      
      <Chunk>
        <Button onPress={showError}>
          Show Error Toast
        </Button>
      </Chunk>

      <Toaster />
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

Map integration component for location display and interaction.

### Purpose
- Location display
- Interactive maps
- Geographic data visualization
- Location selection

### Usage

```javascript
import { Map, Chunk } from '@cinderblock/design-system';

function LocationPicker() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <Chunk>
      <Map
        center={{ lat: 37.7749, lng: -122.4194 }}
        zoom={12}
        onLocationSelect={setSelectedLocation}
        markers={[
          { lat: 37.7749, lng: -122.4194, title: 'San Francisco' }
        ]}
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
  Section,
  Chunk,
  Flex,
  FlexItem,
  Text,
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
  
  const {
    fields,
    setField,
    fieldErrors,
    submitting,
    handleSubmit
  } = useFormState({
    initialFields: { message: '' }
  });

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
        <Section>
          <Chunk>
            <Flex justify="space-between" align="center">
              <FlexItem>
                <Text type="pageHead">Dashboard</Text>
              </FlexItem>
              <FlexItem>
                <Bounce watchProp={notifications}>
                  <Button onPress={() => setNotifications(n => n + 1)}>
                    🔔 {notifications}
                  </Button>
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
                <Chunk>
                  <Text type="sectionHead">Quick Actions</Text>
                </Chunk>
                
                <form onSubmit={handleSubmit(async () => {
                  // Simulate API call
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  setField('message', '');
                })}>
                  <Chunk>
                    <TextInput
                      placeholder="Send a message..."
                      value={fields.message}
                      onChange={(message) => setField('message', message)}
                      multiline
                    />
                  </Chunk>
                  
                  <Chunk>
                    <Button 
                      type="submit"
                      isLoading={submitting}
                      color="primary"
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Chunk>
                </form>
              </Card>
            </Chunk>
          </RevealBlock>
        </Section>
      </Stripe>

      <Toaster />
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