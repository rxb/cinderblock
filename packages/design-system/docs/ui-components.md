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
| `color` | `string` | `'primary'` | Button color variant |
| `size` | `string` | `'medium'` | Button size (`'small'`, `'medium'`, `'large'`) |
| `inverted` | `boolean` | `false` | Use inverted color scheme |
| `variant` | `string` | `null` | Style variant |
| `width` | `string` | `null` | Button width |
| `href` | `string` | `null` | Link destination (makes it a link) |
| `onPress` | `function` | `null` | Press handler |
| `label` | `string` | `null` | Accessible label |
| `shape` | `string` | `null` | Button shape variant |
| `isLoading` | `boolean` | `false` | Show loading state |
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
  <Button size="small" color="secondary">Small Button</Button>
</Chunk>
<Chunk>
  <Button size="medium" color="primary">Medium Button</Button>
</Chunk>
<Chunk>
  <Button size="large" color="danger">Large Button</Button>
</Chunk>

// Loading state
<Chunk>
  <Button isLoading={true} color="primary">
    Saving...
  </Button>
</Chunk>

// Link button
<Chunk>
  <Button href="/about">
    About Us
  </Button>
</Chunk>

// Button with icon
<Chunk>
  <Button onPress={handleSave}>
    <Icon shape="save" /> Save Changes
  </Button>
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
| `placeholder` | `string` | `null` | Placeholder text |
| `maxLength` | `number` | `null` | Maximum character count |
| `showCounter` | `boolean` | `false` | Show character counter |
| `value` | `string` | `''` | Input value |
| `onChange` | `function` | `() => {}` | Change handler |
| `onFocus` | `function` | `() => {}` | Focus handler |
| `onBlur` | `function` | `() => {}` | Blur handler |

### Usage

```javascript
import { TextInput, Chunk, Label } from '@cinderblock/design-system';

// Basic text input
<Chunk>
  <Label>Name</Label>
  <TextInput 
    placeholder="Enter your name"
    value={name}
    onChange={setName}
  />
</Chunk>

// Multiline with character counter
<Chunk>
  <Label>Description</Label>
  <TextInput 
    multiline
    placeholder="Enter description..."
    maxLength={500}
    showCounter
    value={description}
    onChange={setDescription}
  />
</Chunk>

// Email input
<Chunk>
  <Label>Email</Label>
  <TextInput 
    placeholder="your@email.com"
    autoExpand={false}
    value={email}
    onChange={setEmail}
  />
</Chunk>
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
| `onChange` | `function` | `() => {}` | Change handler |
| `label` | `string` | `null` | Checkbox label |

### Usage

```javascript
import { CheckBox, Chunk } from '@cinderblock/design-system';

// Basic checkbox
<Chunk>
  <CheckBox 
    value={isChecked}
    onChange={setIsChecked}
    label="I agree to the terms"
  />
</Chunk>

// Multiple checkboxes
<Chunk>
  <CheckBox 
    value={notifications}
    onChange={setNotifications}
    label="Email notifications"
  />
</Chunk>
<Chunk>
  <CheckBox 
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

Standard picker props plus custom styling options.

### Usage

```javascript
import { Picker, Chunk, Label } from '@cinderblock/design-system';

// Basic picker
<Chunk>
  <Label>Country</Label>
  <Picker
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

Full-screen overlay component for dialogs and modal content.

### Purpose
- Dialog overlays
- Form modals
- Confirmation dialogs
- Full-screen content overlays

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | `false` | Whether modal is visible |
| `onRequestClose` | `function` | `null` | Close request handler |
| `onCompleteClose` | `function` | `null` | Complete close handler |

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

## Tabs

Tab navigation component for switching between content sections.

### Purpose
- Tab-based navigation
- Content section switching
- Horizontal navigation

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedValue` | `string` | `null` | Currently selected tab |
| `onChange` | `function` | `null` | Tab change handler |
| `fullWidth` | `boolean` | `false` | Full width tabs |

### Usage

```javascript
import { Tabs, Chunk, Text } from '@cinderblock/design-system';

function TabExample() {
  const [selectedTab, setSelectedTab] = useState('tab1');

  const tabs = [
    { value: 'tab1', label: 'Overview' },
    { value: 'tab2', label: 'Details' },
    { value: 'tab3', label: 'Settings' }
  ];

  return (
    <>
      <Chunk>
        <Tabs 
          selectedValue={selectedTab}
          onChange={setSelectedTab}
          tabs={tabs}
        />
      </Chunk>
      
      <Chunk>
        {selectedTab === 'tab1' && <Text>Overview content</Text>}
        {selectedTab === 'tab2' && <Text>Details content</Text>}
        {selectedTab === 'tab3' && <Text>Settings content</Text>}
      </Chunk>
    </>
  );
}
```

---

## Dropdown System

A collection of components for creating contextual dropdown menus.

### Components
- `Dropdowner` - Main dropdown container
- `DropdownTouch` - Touchable dropdown trigger
- `DropdownItem` - Individual dropdown items

### Purpose
- Context menus
- Action menus
- Option selection dropdowns
- Positioned overlay menus

### Usage

```javascript
import { 
  Dropdowner, 
  DropdownTouch, 
  DropdownItem, 
  Button,
  Icon,
  Text 
} from '@cinderblock/design-system';

function DropdownExample() {
  return (
    <Dropdowner>
      <DropdownTouch>
        <Button>
          Options <Icon shape="chevron-down" />
        </Button>
      </DropdownTouch>
      
      <DropdownItem onPress={() => console.log('Edit')}>
        <Icon shape="edit" />
        <Text>Edit</Text>
      </DropdownItem>
      
      <DropdownItem onPress={() => console.log('Delete')}>
        <Icon shape="trash" />
        <Text>Delete</Text>
      </DropdownItem>
    </Dropdowner>
  );
}
```

---

## File Upload Components

### FileInput & PhotoInput

Components for handling file and photo uploads.

### Purpose
- File upload handling
- Photo selection and upload
- Form file inputs

### Usage

```javascript
import { FileInput, PhotoInput, Chunk, Label } from '@cinderblock/design-system';

// File input
<Chunk>
  <Label>Upload Document</Label>
  <FileInput onFileSelect={handleFileSelect} />
</Chunk>

// Photo input
<Chunk>
  <Label>Profile Photo</Label>
  <PhotoInput onPhotoSelect={handlePhotoSelect} />
</Chunk>
```

---

## FakeInput

Non-interactive component that looks like an input but isn't editable.

### Purpose
- Display-only input styling
- Read-only form fields
- Input-styled content display

### Usage

```javascript
import { FakeInput, Chunk, Label } from '@cinderblock/design-system';

<Chunk>
  <Label>User ID</Label>
  <FakeInput>12345</FakeInput>
</Chunk>
```

---

## Complete Form Example

Here's how UI components work together to create a complete form:

```javascript
import { 
  Stripe,
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

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <Stripe>
      <Section>
        <Chunk>
          <Text type="pageHead">Contact Us</Text>
        </Chunk>

        <Chunk>
          <Label>Name</Label>
          <TextInput 
            placeholder="Your name"
            value={formData.name}
            onChange={(name) => setFormData({...formData, name})}
          />
        </Chunk>

        <Chunk>
          <Label>Email</Label>
          <TextInput 
            placeholder="your@email.com"
            value={formData.email}
            onChange={(email) => setFormData({...formData, email})}
          />
        </Chunk>

        <Chunk>
          <Label>Country</Label>
          <Picker
            selectedValue={formData.country}
            onValueChange={(country) => setFormData({...formData, country})}
          >
            <Picker.Item label="Select Country" value="" />
            <Picker.Item label="United States" value="us" />
            <Picker.Item label="Canada" value="ca" />
          </Picker>
        </Chunk>

        <Chunk>
          <Label>Message</Label>
          <TextInput 
            multiline
            placeholder="Your message..."
            maxLength={500}
            showCounter
            value={formData.message}
            onChange={(message) => setFormData({...formData, message})}
          />
        </Chunk>

        <Chunk>
          <CheckBox 
            value={formData.newsletter}
            onChange={(newsletter) => setFormData({...formData, newsletter})}
            label="Subscribe to newsletter"
          />
        </Chunk>

        <Chunk>
          <Flex>
            <FlexItem>
              <Button>Cancel</Button>
            </FlexItem>
            <FlexItem>
              <Button color="primary" onPress={handleSubmit}>
                Send Message
              </Button>
            </FlexItem>
          </Flex>
        </Chunk>
      </Section>
    </Stripe>
  );
}
```

This demonstrates how UI components integrate with structural components to create functional, well-spaced forms that follow the design system's spacing and layout principles.