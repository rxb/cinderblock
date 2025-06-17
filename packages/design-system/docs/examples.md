# Usage Examples and Common Patterns

This guide demonstrates common design patterns and real-world examples using the Cinderblock Design System. These patterns show how to combine components effectively to create polished, responsive interfaces.

## Table of Contents

1. [Page Layout Patterns](#page-layout-patterns)
2. [Form Patterns](#form-patterns)
3. [Content Display Patterns](#content-display-patterns)
4. [Navigation Patterns](#navigation-patterns)
5. [Responsive Patterns](#responsive-patterns)
6. [Animation Patterns](#animation-patterns)
7. [Best Practices](#best-practices)
8. [Common Anti-Patterns](#common-anti-patterns)

---

## Page Layout Patterns

### Basic Landing Page

A typical landing page with hero section, features, and call-to-action.

```javascript
import {
  Stripe,
  Section,
  Chunk,
  Flex,
  FlexItem,
  Bounds,
  Text,
  Button,
  Picture,
  Card,
  Icon
} from '@cinderblock/design-system';

function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <Stripe>
        <Section>
          <Bounds>
            <Chunk>
              <Text type="pageHead">
                Build Better Apps Faster
              </Text>
            </Chunk>
            <Chunk>
              <Text>
                Our design system helps you create consistent, 
                beautiful interfaces with minimal effort.
              </Text>
            </Chunk>
            <Chunk>
              <Button color="primary" size="large">
                Get Started
              </Button>
            </Chunk>
          </Bounds>
        </Section>
      </Stripe>

      {/* Features Section */}
      <Stripe style={{ backgroundColor: '#f8f9fa' }}>
        <Section>
          <Chunk>
            <Text type="sectionHead">Features</Text>
          </Chunk>
          <Chunk>
            <Flex switchDirection={true}>
              <FlexItem>
                <Card>
                  <Chunk>
                    <Icon shape="zap" size={32} />
                  </Chunk>
                  <Chunk>
                    <Text weight="strong">Fast Development</Text>
                  </Chunk>
                  <Chunk>
                    <Text>Pre-built components speed up development</Text>
                  </Chunk>
                </Card>
              </FlexItem>
              <FlexItem>
                <Card>
                  <Chunk>
                    <Icon shape="smartphone" size={32} />
                  </Chunk>
                  <Chunk>
                    <Text weight="strong">Responsive</Text>
                  </Chunk>
                  <Chunk>
                    <Text>Works perfectly on all devices</Text>
                  </Chunk>
                </Card>
              </FlexItem>
              <FlexItem>
                <Card>
                  <Chunk>
                    <Icon shape="heart" size={32} />
                  </Chunk>
                  <Chunk>
                    <Text weight="strong">Accessible</Text>
                  </Chunk>
                  <Chunk>
                    <Text>Built with accessibility in mind</Text>
                  </Chunk>
                </Card>
              </FlexItem>
            </Flex>
          </Chunk>
        </Section>
      </Stripe>

      {/* CTA Section */}
      <Stripe>
        <Section>
          <Bounds small>
            <Chunk>
              <Text type="sectionHead">Ready to get started?</Text>
            </Chunk>
            <Chunk>
              <Text>Join thousands of developers building with our system.</Text>
            </Chunk>
            <Chunk>
              <Flex justify="center">
                <FlexItem>
                  <Button color="primary">Start Building</Button>
                </FlexItem>
              </Flex>
            </Chunk>
          </Bounds>
        </Section>
      </Stripe>
    </>
  );
}
```

### Article/Blog Layout

Content-focused layout with proper typography hierarchy.

```javascript
function ArticleLayout() {
  return (
    <>
      {/* Article Header */}
      <Stripe>
        <Section>
          <Bounds>
            <Chunk>
              <Text type="pageHead">
                The Future of Design Systems
              </Text>
            </Chunk>
            <Chunk>
              <Flex>
                <FlexItem>
                  <Avatar 
                    size="small"
                    source={{ uri: '/author-avatar.jpg' }}
                  />
                </FlexItem>
                <FlexItem>
                  <Text weight="strong">Sarah Johnson</Text>
                  <Text color="secondary">March 15, 2024 • 5 min read</Text>
                </FlexItem>
              </Flex>
            </Chunk>
          </Bounds>
        </Section>
      </Stripe>

      {/* Article Content */}
      <Stripe>
        <Section>
          <Bounds>
            <Chunk>
              <Picture 
                source={{ uri: '/article-hero.jpg' }}
                alt="Design system components"
              />
            </Chunk>

            <Chunk>
              <Text>
                Design systems have revolutionized how we build digital products. 
                They provide consistency, efficiency, and scalability that traditional 
                approaches simply can't match.
              </Text>
            </Chunk>

            <Chunk>
              <Text type="sectionHead">Why Structure Matters</Text>
            </Chunk>

            <Chunk>
              <Text>
                Unlike many design systems that focus purely on visual components, 
                Cinderblock emphasizes structural hierarchy. This means...
              </Text>
            </Chunk>

            <Chunk>
              <Card style={{ backgroundColor: '#f0f8ff' }}>
                <Chunk>
                  <Text weight="strong">💡 Pro Tip</Text>
                </Chunk>
                <Chunk>
                  <Text>
                    Always start with structure (Stripe, Section, Chunk) 
                    before adding content components.
                  </Text>
                </Chunk>
              </Card>
            </Chunk>
          </Bounds>
        </Section>
      </Stripe>
    </>
  );
}
```

### Dashboard Layout

Data-rich interface with cards, metrics, and interactive elements.

```javascript
function DashboardLayout() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  const metrics = [
    { label: 'Total Users', value: '12,345', change: '+12%', positive: true },
    { label: 'Revenue', value: '$45,678', change: '+8%', positive: true },
    { label: 'Orders', value: '1,234', change: '-3%', positive: false },
    { label: 'Conversion', value: '3.2%', change: '+0.5%', positive: true }
  ];

  return (
    <>
      {/* Dashboard Header */}
      <Stripe>
        <Section>
          <Chunk>
            <Flex justify="space-between" align="center">
              <FlexItem>
                <Text type="pageHead">Dashboard</Text>
              </FlexItem>
              <FlexItem>
                <Picker
                  selectedValue={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <Picker.Item label="Last Week" value="week" />
                  <Picker.Item label="Last Month" value="month" />
                  <Picker.Item label="Last Year" value="year" />
                </Picker>
              </FlexItem>
            </Flex>
          </Chunk>

          {/* Metrics Grid */}
          <Chunk>
            <Flex switchDirection={true}>
              {metrics.map((metric) => (
                <FlexItem key={metric.label}>
                  <Card shadow>
                    <Chunk>
                      <Text color="secondary">{metric.label}</Text>
                    </Chunk>
                    <Chunk>
                      <Text type="big" weight="strong">
                        {metric.value}
                      </Text>
                    </Chunk>
                    <Chunk>
                      <Text color={metric.positive ? 'success' : 'error'}>
                        {metric.change}
                      </Text>
                    </Chunk>
                  </Card>
                </FlexItem>
              ))}
            </Flex>
          </Chunk>
        </Section>
      </Stripe>

      {/* Charts Section */}
      <Stripe style={{ backgroundColor: '#f8f9fa' }}>
        <Section>
          <Chunk>
            <Text type="sectionHead">Analytics</Text>
          </Chunk>
          <Chunk>
            <Card>
              <Chunk>
                <Text weight="strong">Revenue Trend</Text>
              </Chunk>
              <Chunk>
                {/* Chart component would go here */}
                <div style={{ height: 300, backgroundColor: '#eee', 
                             display: 'flex', alignItems: 'center', 
                             justifyContent: 'center' }}>
                  <Text color="secondary">Chart Component</Text>
                </div>
              </Chunk>
            </Card>
          </Chunk>
        </Section>
      </Stripe>
    </>
  );
}
```

---

## Form Patterns

### Contact Form

Complete contact form with validation and submission handling.

```javascript
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
      company: '',
      message: '',
      newsletter: false
    },
    onChange: (fields) => {
      // Real-time validation
      const errors = {};
      if (fields.name && fields.name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
      }
      if (fields.email && !fields.email.includes('@')) {
        errors.email = 'Please enter a valid email';
      }
      setFieldErrors(errors);
    }
  });

  const onSubmit = async () => {
    // Validate required fields
    const errors = {};
    if (!fields.name) errors.name = 'Name is required';
    if (!fields.email) errors.email = 'Email is required';
    if (!fields.message) errors.message = 'Message is required';
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      });
      
      // Reset form on success
      setField('name', '');
      setField('email', '');
      setField('company', '');
      setField('message', '');
      setField('newsletter', false);
      
    } catch (error) {
      setFieldErrors({ submit: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <Stripe>
      <Section>
        <Bounds medium>
          <Chunk>
            <Text type="pageHead">Get in Touch</Text>
          </Chunk>
          
          <Chunk>
            <Text>
              Have a question or want to work together? 
              We'd love to hear from you.
            </Text>
          </Chunk>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Chunk>
              <Label>Name *</Label>
              <TextInput 
                value={fields.name}
                onChange={(name) => setField('name', name)}
                placeholder="Your full name"
              />
              <FieldError error={fieldErrors.name} />
            </Chunk>

            <Chunk>
              <Label>Email *</Label>
              <TextInput 
                value={fields.email}
                onChange={(email) => setField('email', email)}
                placeholder="your@email.com"
              />
              <FieldError error={fieldErrors.email} />
            </Chunk>

            <Chunk>
              <Label>Company</Label>
              <TextInput 
                value={fields.company}
                onChange={(company) => setField('company', company)}
                placeholder="Your company (optional)"
              />
            </Chunk>

            <Chunk>
              <Label>Message *</Label>
              <TextInput 
                multiline
                value={fields.message}
                onChange={(message) => setField('message', message)}
                placeholder="Tell us about your project..."
                maxLength={1000}
                showCounter
              />
              <FieldError error={fieldErrors.message} />
            </Chunk>

            <Chunk>
              <CheckBox 
                value={fields.newsletter}
                onChange={(newsletter) => setField('newsletter', newsletter)}
                label="Subscribe to our newsletter for updates"
              />
            </Chunk>

            <Chunk>
              <Flex>
                <FlexItem>
                  <Button type="button">
                    Cancel
                  </Button>
                </FlexItem>
                <FlexItem>
                  <Button 
                    type="submit" 
                    color="primary"
                    isLoading={submitting}
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </FlexItem>
              </Flex>
            </Chunk>

            <FieldError error={fieldErrors.submit} />
          </form>
        </Bounds>
      </Section>
    </Stripe>
  );
}
```

### Multi-Step Form

Progressive form with steps and validation.

```javascript
function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const {
    fields,
    setField,
    fieldErrors,
    setFieldErrors
  } = useFormState({
    initialFields: {
      // Step 1: Personal Info
      firstName: '',
      lastName: '',
      email: '',
      
      // Step 2: Address
      address: '',
      city: '',
      country: '',
      
      // Step 3: Preferences
      notifications: true,
      marketing: false
    }
  });

  const validateStep = (step) => {
    const errors = {};
    
    switch (step) {
      case 1:
        if (!fields.firstName) errors.firstName = 'First name required';
        if (!fields.lastName) errors.lastName = 'Last name required';
        if (!fields.email) errors.email = 'Email required';
        break;
      case 2:
        if (!fields.address) errors.address = 'Address required';
        if (!fields.city) errors.city = 'City required';
        if (!fields.country) errors.country = 'Country required';
        break;
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  return (
    <Stripe>
      <Section>
        <Bounds medium>
          <Chunk>
            <Text type="pageHead">Create Account</Text>
          </Chunk>

          {/* Progress Indicator */}
          <Chunk>
            <Flex>
              {Array.from({ length: totalSteps }, (_, i) => (
                <FlexItem key={i + 1}>
                  <div style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: i + 1 <= currentStep ? '#007bff' : '#e9ecef',
                    color: i + 1 <= currentStep ? 'white' : '#6c757d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Text>{i + 1}</Text>
                  </div>
                </FlexItem>
              ))}
            </Flex>
          </Chunk>

          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <RevealBlock visible={true}>
              <Chunk>
                <Text type="sectionHead">Personal Information</Text>
              </Chunk>
              
              <Chunk>
                <Flex switchDirection={true}>
                  <FlexItem>
                    <Label>First Name</Label>
                    <TextInput 
                      value={fields.firstName}
                      onChange={(firstName) => setField('firstName', firstName)}
                      placeholder="John"
                    />
                    <FieldError error={fieldErrors.firstName} />
                  </FlexItem>
                  <FlexItem>
                    <Label>Last Name</Label>
                    <TextInput 
                      value={fields.lastName}
                      onChange={(lastName) => setField('lastName', lastName)}
                      placeholder="Doe"
                    />
                    <FieldError error={fieldErrors.lastName} />
                  </FlexItem>
                </Flex>
              </Chunk>

              <Chunk>
                <Label>Email</Label>
                <TextInput 
                  value={fields.email}
                  onChange={(email) => setField('email', email)}
                  placeholder="john@example.com"
                />
                <FieldError error={fieldErrors.email} />
              </Chunk>
            </RevealBlock>
          )}

          {/* Step 2: Address */}
          {currentStep === 2 && (
            <RevealBlock visible={true}>
              <Chunk>
                <Text type="sectionHead">Address Information</Text>
              </Chunk>
              
              <Chunk>
                <Label>Street Address</Label>
                <TextInput 
                  value={fields.address}
                  onChange={(address) => setField('address', address)}
                  placeholder="123 Main St"
                />
                <FieldError error={fieldErrors.address} />
              </Chunk>

              <Chunk>
                <Flex switchDirection={true}>
                  <FlexItem>
                    <Label>City</Label>
                    <TextInput 
                      value={fields.city}
                      onChange={(city) => setField('city', city)}
                      placeholder="San Francisco"
                    />
                    <FieldError error={fieldErrors.city} />
                  </FlexItem>
                  <FlexItem>
                    <Label>Country</Label>
                    <Picker
                      selectedValue={fields.country}
                      onValueChange={(country) => setField('country', country)}
                    >
                      <Picker.Item label="Select Country" value="" />
                      <Picker.Item label="United States" value="us" />
                      <Picker.Item label="Canada" value="ca" />
                      <Picker.Item label="United Kingdom" value="uk" />
                    </Picker>
                    <FieldError error={fieldErrors.country} />
                  </FlexItem>
                </Flex>
              </Chunk>
            </RevealBlock>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <RevealBlock visible={true}>
              <Chunk>
                <Text type="sectionHead">Preferences</Text>
              </Chunk>
              
              <Chunk>
                <CheckBox 
                  value={fields.notifications}
                  onChange={(notifications) => setField('notifications', notifications)}
                  label="Send me email notifications"
                />
              </Chunk>

              <Chunk>
                <CheckBox 
                  value={fields.marketing}
                  onChange={(marketing) => setField('marketing', marketing)}
                  label="Send me marketing emails"
                />
              </Chunk>
            </RevealBlock>
          )}

          {/* Navigation */}
          <Chunk>
            <Flex justify="space-between">
              <FlexItem>
                {currentStep > 1 && (
                  <Button onPress={prevStep}>
                    Previous
                  </Button>
                )}
              </FlexItem>
              <FlexItem>
                {currentStep < totalSteps ? (
                  <Button color="primary" onPress={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button color="primary">
                    Create Account
                  </Button>
                )}
              </FlexItem>
            </Flex>
          </Chunk>
        </Bounds>
      </Section>
    </Stripe>
  );
}
```

---

## Content Display Patterns

### Product Grid

E-commerce style product listing with filtering.

```javascript
function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading products
    setTimeout(() => {
      setProducts([
        { id: 1, name: 'Wireless Headphones', price: 99, category: 'electronics', image: '/headphones.jpg' },
        { id: 2, name: 'Coffee Mug', price: 15, category: 'home', image: '/mug.jpg' },
        { id: 3, name: 'Laptop Stand', price: 45, category: 'electronics', image: '/stand.jpg' },
        // ... more products
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(p => p.category === category);

  return (
    <Stripe>
      <Section>
        <Chunk>
          <Flex justify="space-between" align="center" switchDirection={true}>
            <FlexItem>
              <Text type="pageHead">Products</Text>
            </FlexItem>
            <FlexItem>
              <Picker
                selectedValue={category}
                onValueChange={setCategory}
              >
                <Picker.Item label="All Categories" value="all" />
                <Picker.Item label="Electronics" value="electronics" />
                <Picker.Item label="Home & Garden" value="home" />
                <Picker.Item label="Clothing" value="clothing" />
              </Picker>
            </FlexItem>
          </Flex>
        </Chunk>

        <LoadingBlock isLoading={isLoading}>
          <Chunk>
            <List 
              variant="grid"
              items={filteredProducts}
              itemsInRow={{ mobile: 1, tablet: 2, desktop: 4 }}
              renderItem={(product) => (
                <Card key={product.id} shadow>
                  <Picture 
                    source={{ uri: product.image }}
                    alt={product.name}
                  />
                  <Chunk>
                    <Text weight="strong">{product.name}</Text>
                  </Chunk>
                  <Chunk>
                    <Text type="big" color="primary">
                      ${product.price}
                    </Text>
                  </Chunk>
                  <Chunk>
                    <Button color="primary" width="full">
                      Add to Cart
                    </Button>
                  </Chunk>
                </Card>
              )}
            />
          </Chunk>
        </LoadingBlock>

        {filteredProducts.length === 0 && !isLoading && (
          <Chunk>
            <Text color="secondary">
              No products found in this category.
            </Text>
          </Chunk>
        )}
      </Section>
    </Stripe>
  );
}
```

### Team Directory

Employee listing with search and filters.

```javascript
function TeamDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('all');
  
  const team = [
    { id: 1, name: 'Sarah Johnson', role: 'Product Manager', department: 'product', avatar: '/sarah.jpg' },
    { id: 2, name: 'Mike Chen', role: 'Senior Developer', department: 'engineering', avatar: '/mike.jpg' },
    { id: 3, name: 'Lisa Rodriguez', role: 'UX Designer', department: 'design', avatar: '/lisa.jpg' },
    // ... more team members
  ];

  const filteredTeam = team.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = department === 'all' || member.department === department;
    return matchesSearch && matchesDepartment;
  });

  return (
    <Stripe>
      <Section>
        <Chunk>
          <Text type="pageHead">Our Team</Text>
        </Chunk>

        {/* Search and Filter */}
        <Chunk>
          <Flex switchDirection={true}>
            <FlexItem>
              <TextInput 
                placeholder="Search team members..."
                value={searchTerm}
                onChange={setSearchTerm}
              />
            </FlexItem>
            <FlexItem>
              <Picker
                selectedValue={department}
                onValueChange={setDepartment}
              >
                <Picker.Item label="All Departments" value="all" />
                <Picker.Item label="Engineering" value="engineering" />
                <Picker.Item label="Design" value="design" />
                <Picker.Item label="Product" value="product" />
                <Picker.Item label="Marketing" value="marketing" />
              </Picker>
            </FlexItem>
          </Flex>
        </Chunk>

        {/* Team Grid */}
        <Chunk>
          <List 
            variant="grid"
            items={filteredTeam}
            itemsInRow={{ mobile: 1, tablet: 2, desktop: 3 }}
            renderItem={(member) => (
              <Card key={member.id}>
                <Chunk>
                  <Flex align="center">
                    <FlexItem>
                      <Avatar 
                        size="medium"
                        source={{ uri: member.avatar }}
                      />
                    </FlexItem>
                    <FlexItem>
                      <Text weight="strong">{member.name}</Text>
                      <Text color="secondary">{member.role}</Text>
                    </FlexItem>
                  </Flex>
                </Chunk>
                <Chunk>
                  <Button href={`/team/${member.id}`} width="full">
                    View Profile
                  </Button>
                </Chunk>
              </Card>
            )}
          />
        </Chunk>

        {filteredTeam.length === 0 && (
          <Chunk>
            <Text color="secondary">
              No team members found matching your criteria.
            </Text>
          </Chunk>
        )}
      </Section>
    </Stripe>
  );
}
```

---

## Responsive Patterns

### Responsive Navigation

Navigation that adapts to different screen sizes.

```javascript
function ResponsiveNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile } = useMediaContext();

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <Stripe>
      <Section>
        <Flex justify="space-between" align="center">
          <FlexItem>
            <Text type="sectionHead">Logo</Text>
          </FlexItem>
          
          {/* Desktop Menu */}
          {!isMobile && (
            <FlexItem>
              <Inline>
                {menuItems.map(item => (
                  <Link key={item.label} href={item.href}>
                    <Text>{item.label}</Text>
                  </Link>
                ))}
                <Button color="primary">Get Started</Button>
              </Inline>
            </FlexItem>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <FlexItem>
              <Button onPress={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Icon shape={mobileMenuOpen ? 'x' : 'menu'} />
              </Button>
            </FlexItem>
          )}
        </Flex>

        {/* Mobile Menu */}
        {isMobile && (
          <RevealBlock visible={mobileMenuOpen}>
            <Chunk>
              {menuItems.map(item => (
                <Chunk key={item.label}>
                  <Link href={item.href}>
                    <Text>{item.label}</Text>
                  </Link>
                </Chunk>
              ))}
              <Chunk>
                <Button color="primary" width="full">
                  Get Started
                </Button>
              </Chunk>
            </Chunk>
          </RevealBlock>
        )}
      </Section>
    </Stripe>
  );
}
```

### Responsive Card Layout

Cards that adapt their layout based on screen size.

```javascript
function ResponsiveCards() {
  const cards = [
    { title: 'Feature 1', description: 'Description of feature 1' },
    { title: 'Feature 2', description: 'Description of feature 2' },
    { title: 'Feature 3', description: 'Description of feature 3' },
    { title: 'Feature 4', description: 'Description of feature 4' }
  ];

  return (
    <Stripe>
      <Section>
        <Chunk>
          <Text type="pageHead">Features</Text>
        </Chunk>

        {/* Responsive grid: 1 column mobile, 2 tablet, 4 desktop */}
        <Chunk>
          <List 
            variant="grid"
            items={cards}
            itemsInRow={{ mobile: 1, tablet: 2, desktop: 4 }}
            renderItem={(card) => (
              <Card key={card.title} shadow>
                <Chunk>
                  <Text weight="strong">{card.title}</Text>
                </Chunk>
                <Chunk>
                  <Text>{card.description}</Text>
                </Chunk>
              </Card>
            )}
          />
        </Chunk>
      </Section>
    </Stripe>
  );
}
```

---

## Animation Patterns

### Staggered List Animation

Items that animate in with delays for visual interest.

```javascript
function StaggeredList() {
  const [visible, setVisible] = useState(false);
  
  const items = [
    'First item to animate',
    'Second item follows',
    'Third item continues',
    'Fourth item completes'
  ];

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <Stripe>
      <Section>
        <Chunk>
          <Button onPress={() => setVisible(!visible)}>
            {visible ? 'Hide' : 'Show'} List
          </Button>
        </Chunk>

        {items.map((item, index) => (
          <RevealBlock
            key={item}
            visible={visible}
            delay={index * 100}
            fromTop={index % 2 === 0}
          >
            <Chunk>
              <Card>
                <Text>{item}</Text>
              </Card>
            </Chunk>
          </RevealBlock>
        ))}
      </Section>
    </Stripe>
  );
}
```

### Interactive Feedback

Combining animations for engaging interactions.

```javascript
function InteractiveFeedback() {
  const [likes, setLikes] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [shared, setShared] = useState(false);

  return (
    <Stripe>
      <Section>
        <Chunk>
          <Card>
            <Chunk>
              <Text type="sectionHead">Engaging Content</Text>
            </Chunk>
            <Chunk>
              <Text>
                This is some engaging content that users can interact with 
                using the buttons below.
              </Text>
            </Chunk>
            <Chunk>
              <Flex>
                <FlexItem>
                  <Button onPress={() => setLikes(likes + 1)}>
                    <Bounce watchProp={likes}>
                      <Icon shape="heart" /> {likes}
                    </Bounce>
                  </Button>
                </FlexItem>
                <FlexItem>
                  <Button onPress={() => setBookmarked(!bookmarked)}>
                    <Bounce watchProp={bookmarked}>
                      <Icon 
                        shape={bookmarked ? 'bookmark' : 'bookmark'} 
                        color={bookmarked ? 'primary' : 'secondary'}
                      />
                    </Bounce>
                  </Button>
                </FlexItem>
                <FlexItem>
                  <Button onPress={() => setShared(!shared)}>
                    <Bounce watchProp={shared}>
                      <Icon shape="share" />
                    </Bounce>
                  </Button>
                </FlexItem>
              </Flex>
            </Chunk>
          </Card>
        </Chunk>
      </Section>
    </Stripe>
  );
}
```

---

## Best Practices

### ✅ DO: Follow the Structural Hierarchy

```javascript
// ✅ GOOD: Proper hierarchy
<Stripe>
  <Section>
    <Chunk>
      <Text type="pageHead">Title</Text>
    </Chunk>
    <Chunk>
      <Text>Content with proper spacing</Text>
    </Chunk>
  </Section>
</Stripe>
```

### ✅ DO: Use Semantic Text Types

```javascript
// ✅ GOOD: Semantic text types
<Chunk>
  <Text type="pageHead">Main Page Title</Text>
</Chunk>
<Chunk>
  <Text type="sectionHead">Section Title</Text>
</Chunk>
<Chunk>
  <Text>Regular body text</Text>
</Chunk>
```

### ✅ DO: Leverage Responsive Components

```javascript
// ✅ GOOD: Built-in responsive behavior
<Flex switchDirection={true}>
  <FlexItem>Content 1</FlexItem>
  <FlexItem>Content 2</FlexItem>
</Flex>

<List 
  variant="grid"
  itemsInRow={{ mobile: 1, tablet: 2, desktop: 3 }}
  items={items}
  renderItem={renderItem}
/>
```

### ✅ DO: Use Loading States

```javascript
// ✅ GOOD: Loading feedback
<LoadingBlock isLoading={isSubmitting}>
  <Button onPress={handleSubmit}>
    Submit Form
  </Button>
</LoadingBlock>
```

---

## Common Anti-Patterns

### ❌ DON'T: Skip Structural Components

```javascript
// ❌ BAD: No structural hierarchy
<div>
  <Text type="pageHead">Title</Text>
  <Text>Content without proper spacing</Text>
  <Button>Action</Button>
</div>

// ✅ GOOD: Proper structure
<Stripe>
  <Section>
    <Chunk>
      <Text type="pageHead">Title</Text>
    </Chunk>
    <Chunk>
      <Text>Content with proper spacing</Text>
    </Chunk>
    <Chunk>
      <Button>Action</Button>
    </Chunk>
  </Section>
</Stripe>
```

### ❌ DON'T: Use Inline Styles for Spacing

```javascript
// ❌ BAD: Inline spacing
<div style={{ marginBottom: 20 }}>
  <Text>Content</Text>
</div>
<div style={{ marginBottom: 20 }}>
  <Button>Action</Button>
</div>

// ✅ GOOD: Structural spacing
<Chunk>
  <Text>Content</Text>
</Chunk>
<Chunk>
  <Button>Action</Button>
</Chunk>
```

### ❌ DON'T: Nest Chunks Inappropriately

```javascript
// ❌ BAD: Unnecessary nesting
<Chunk>
  <Chunk>
    <Chunk>
      <Text>Over-chunked content</Text>
    </Chunk>
  </Chunk>
</Chunk>

// ✅ GOOD: Appropriate chunking
<Chunk>
  <Text>Properly chunked content</Text>
</Chunk>
```

### ❌ DON'T: Ignore Responsive Behavior

```javascript
// ❌ BAD: Fixed layout
<div style={{ display: 'flex' }}>
  <div>Content 1</div>
  <div>Content 2</div>
</div>

// ✅ GOOD: Responsive layout
<Flex switchDirection={true}>
  <FlexItem>Content 1</FlexItem>
  <FlexItem>Content 2</FlexItem>
</Flex>
```

---

## Summary

The Cinderblock Design System shines when you:

1. **Embrace the structural hierarchy** - Use Stripe > Section > Chunk consistently
2. **Let components handle spacing** - Avoid inline margins and padding
3. **Use semantic text types** - pageHead, sectionHead, body for proper hierarchy
4. **Leverage built-in responsive behavior** - switchDirection, itemsInRow, etc.
5. **Provide loading and error states** - Use LoadingBlock and FieldError components
6. **Animate thoughtfully** - Use RevealBlock and Bounce for engaging interactions
7. **Validate forms properly** - Use useFormState for comprehensive form handling

By following these patterns and avoiding common pitfalls, you'll create interfaces that are consistent, responsive, accessible, and maintainable—all while letting the design system handle the complex layout and styling decisions for you.