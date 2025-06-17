# Responsive Examples

This guide demonstrates practical responsive design patterns using Cinderblock's responsive utilities and component system. These examples show how to create adaptive layouts that work seamlessly across all screen sizes.

## Navigation Patterns

### Responsive Header Navigation

A header that transforms from mobile hamburger menu to desktop navigation bar.

```javascript
import { 
  Header, 
  Flex, 
  FlexItem, 
  View, 
  Text, 
  Button, 
  Icon, 
  Link,
  Inline,
  ThemeContext 
} from '@cinderblock/design-system';

function ResponsiveHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { styles, ids } = useContext(ThemeContext);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <Header>
      <Flex justify="space-between" align="center">
        {/* Logo */}
        <FlexItem>
          <Link href="/">
            <Text type="sectionHead" weight="strong">Brand</Text>
          </Link>
        </FlexItem>

        {/* Desktop Navigation - Hidden on mobile, shown on large screens */}
        <View 
          style={styles['hide']}
          dataSet={{ media: ids["showAt__large"] }}
        >
          <FlexItem>
            <Inline>
              {menuItems.map(item => (
                <Link key={item.href} href={item.href}>
                  <Text>{item.label}</Text>
                </Link>
              ))}
              <Button color="primary">Get Started</Button>
            </Inline>
          </FlexItem>
        </View>

        {/* Mobile Menu Button - Shown on mobile, hidden on large screens */}
        <View 
          style={styles['show']}
          dataSet={{ media: ids["hideAt__large"] }}
        >
          <FlexItem>
            <Button onPress={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon shape={mobileMenuOpen ? 'x' : 'menu'} />
            </Button>
          </FlexItem>
        </View>
      </Flex>

      {/* Mobile Menu Dropdown - Only visible when menu is open */}
      {mobileMenuOpen && (
        <View 
          style={styles['show']}
          dataSet={{ media: ids["hideAt__large"] }}
        >
          <Section>
            {menuItems.map(item => (
              <Chunk key={item.href}>
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
          </Section>
        </View>
      )}
    </Header>
  );
}
```

### Tab Navigation with Responsive Behavior

Tabs that switch to a dropdown menu on smaller screens.

```javascript
function ResponsiveTabs({ tabs, activeTab, onTabChange }) {
  const { styles, ids } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      {/* Desktop Tabs - Hidden on mobile, shown on medium screens and up */}
      <View 
        style={styles['hide']}
        dataSet={{ media: ids["showAt__medium"] }}
      >
        <Tabs 
          selectedValue={activeTab}
          onChange={onTabChange}
          tabs={tabs}
          fullWidth
        />
      </View>

      {/* Mobile Dropdown - Shown on mobile, hidden on medium screens and up */}
      <View 
        style={styles['show']}
        dataSet={{ media: ids["hideAt__medium"] }}
      >
        <Chunk>
          <Button 
            onPress={() => setDropdownOpen(!dropdownOpen)}
            width="full"
          >
            <Text>{tabs.find(t => t.value === activeTab)?.label}</Text>
            <Icon shape={dropdownOpen ? 'chevron-up' : 'chevron-down'} />
          </Button>
        </Chunk>

        {dropdownOpen && (
          <Card>
            {tabs.map(tab => (
              <Chunk key={tab.value}>
                <Button 
                  width="full"
                  variant={tab.value === activeTab ? 'primary' : 'secondary'}
                  onPress={() => {
                    onTabChange(tab.value);
                    setDropdownOpen(false);
                  }}
                >
                  <Text>{tab.label}</Text>
                </Button>
              </Chunk>
            ))}
          </Card>
        )}
      </View>
    </>
  );
}
```

## Content Layout Patterns

### Responsive Article Layout

Article layout with adaptive sidebar and progressive content disclosure.

```javascript
function ArticleLayout({ article, relatedArticles }) {
  const { styles, ids } = useContext(ThemeContext);

  return (
    <Stripe>
      <Section>
        <Flex>
          {/* Main Article Content */}
          <FlexItem>
            <Chunk>
              <Text type="pageHead">{article.title}</Text>
            </Chunk>

            {/* Article metadata - Always visible */}
            <Chunk>
              <Flex align="center">
                <FlexItem shrink>
                  <Avatar 
                    size="small"
                    source={{ uri: article.author.avatar }}
                  />
                </FlexItem>
                <FlexItem>
                  <Text weight="strong">{article.author.name}</Text>
                  <Text color="secondary">{article.publishedDate}</Text>
                </FlexItem>
              </Flex>
            </Chunk>

            {/* Read time - Only on medium screens and up */}
            <View 
              style={styles['hide']}
              dataSet={{ media: ids["showAt__medium"] }}
            >
              <Chunk>
                <Text color="secondary">
                  {article.readTime} min read • {article.wordCount} words
                </Text>
              </Chunk>
            </View>

            <Chunk>
              <Picture 
                source={{ uri: article.featuredImage }}
                alt={article.title}
              />
            </Chunk>

            <Chunk>
              <Text>{article.content}</Text>
            </Chunk>

            {/* Article tags - Only on large screens */}
            <View 
              style={styles['hide']}
              dataSet={{ media: ids["showAt__large"] }}
            >
              <Chunk>
                <Text weight="strong">Tags:</Text>
                <Inline>
                  {article.tags.map(tag => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </Inline>
              </Chunk>
            </View>
          </FlexItem>

          {/* Sidebar - Only visible on large screens */}
          <View 
            style={styles['hide']}
            dataSet={{ media: ids["showAt__large"] }}
          >
            <FlexItem shrink style={{ maxWidth: 300 }}>
              <Card>
                <Chunk>
                  <Text type="sectionHead">Related Articles</Text>
                </Chunk>
                {relatedArticles.map(related => (
                  <Chunk key={related.id}>
                    <Link href={`/articles/${related.slug}`}>
                      <Text weight="strong">{related.title}</Text>
                      <Text color="secondary" size="small">
                        {related.excerpt}
                      </Text>
                    </Link>
                  </Chunk>
                ))}
              </Card>
            </FlexItem>
          </View>
        </Flex>

        {/* Related articles for mobile - Only visible on small/medium screens */}
        <View 
          style={styles['show']}
          dataSet={{ media: ids["hideAt__large"] }}
        >
          <Chunk>
            <Text type="sectionHead">Related Articles</Text>
          </Chunk>
          <Chunk>
            <List 
              variant={{ small: 'linear' }}
              items={relatedArticles.slice(0, 3)}
              renderItem={(related) => (
                <Card key={related.id}>
                  <Link href={`/articles/${related.slug}`}>
                    <Text weight="strong">{related.title}</Text>
                    <Text color="secondary">{related.excerpt}</Text>
                  </Link>
                </Card>
              )}
            />
          </Chunk>
        </View>
      </Section>
    </Stripe>
  );
}
```

### Dashboard Layout

Responsive dashboard with adaptive grid and progressive disclosure.

```javascript
function Dashboard({ metrics, charts, notifications }) {
  const { styles, ids } = useContext(ThemeContext);

  return (
    <>
      {/* Metrics Overview */}
      <Stripe>
        <Section>
          <Chunk>
            <Text type="pageHead">Dashboard</Text>
          </Chunk>

          {/* Key Metrics - Responsive grid */}
          <Chunk>
            <List 
              variant={{ small: 'linear', medium: 'grid' }}
              itemsInRow={{ mobile: 1, tablet: 2, desktop: 4 }}
              items={metrics}
              renderItem={(metric) => (
                <Card key={metric.id} shadow>
                  <Chunk>
                    <Text color="secondary">{metric.label}</Text>
                  </Chunk>
                  <Chunk>
                    <Text type="big" weight="strong">
                      {metric.value}
                    </Text>
                  </Chunk>
                  {/* Change indicator - Only on medium screens and up */}
                  <View 
                    style={styles['hide']}
                    dataSet={{ media: ids["showAt__medium"] }}
                  >
                    <Chunk>
                      <Text color={metric.change > 0 ? 'success' : 'error'}>
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </Text>
                    </Chunk>
                  </View>
                </Card>
              )}
            />
          </Chunk>
        </Section>
      </Stripe>

      {/* Charts and Analytics */}
      <Stripe style={{ backgroundColor: '#f8f9fa' }}>
        <Section>
          <Flex switchDirection="large">
            {/* Main Chart */}
            <FlexItem>
              <Card>
                <Chunk>
                  <Text type="sectionHead">Revenue Trend</Text>
                </Chunk>
                <Chunk>
                  <charts.RevenueChart />
                </Chunk>
              </Card>
            </FlexItem>

            {/* Secondary Charts - Side by side on desktop, stacked on mobile */}
            <FlexItem>
              <Chunk>
                <Card>
                  <Chunk>
                    <Text weight="strong">User Growth</Text>
                  </Chunk>
                  <Chunk>
                    <charts.UserGrowthChart />
                  </Chunk>
                </Card>
              </Chunk>

              {/* Detailed analytics - Only on large screens */}
              <View 
                style={styles['hide']}
                dataSet={{ media: ids["showAt__large"] }}
              >
                <Chunk>
                  <Card>
                    <Chunk>
                      <Text weight="strong">Conversion Funnel</Text>
                    </Chunk>
                    <Chunk>
                      <charts.ConversionFunnelChart />
                    </Chunk>
                  </Card>
                </Chunk>
              </View>
            </FlexItem>
          </Flex>
        </Section>
      </Stripe>

      {/* Notifications and Activity - Only on large screens */}
      <View 
        style={styles['hide']}
        dataSet={{ media: ids["showAt__large"] }}
      >
        <Stripe>
          <Section>
            <Chunk>
              <Text type="sectionHead">Recent Activity</Text>
            </Chunk>
            <Chunk>
              <List 
                variant={{ small: 'linear' }}
                items={notifications}
                renderItem={(notification) => (
                  <Card key={notification.id}>
                    <Flex align="center">
                      <FlexItem shrink>
                        <Icon shape={notification.icon} />
                      </FlexItem>
                      <FlexItem>
                        <Text>{notification.message}</Text>
                        <Text color="secondary" size="small">
                          {notification.timestamp}
                        </Text>
                      </FlexItem>
                    </Flex>
                  </Card>
                )}
              />
            </Chunk>
          </Section>
        </Stripe>
      </View>
    </>
  );
}
```

## E-commerce Patterns

### Product Grid with Adaptive Cards

Product listing that adapts the amount of information shown based on screen size.

```javascript
function ProductGrid({ products, category }) {
  const { styles, ids } = useContext(ThemeContext);

  return (
    <Stripe>
      <Section>
        <Chunk>
          <Text type="pageHead">{category.name}</Text>
        </Chunk>

        <Chunk>
          <List 
            variant={{ small: 'linear', medium: 'grid' }}
            itemsInRow={{ mobile: 1, tablet: 2, desktop: 3, large: 4 }}
            items={products}
            renderItem={(product) => (
              <Card key={product.id} shadow>
                <Chunk>
                  <Picture 
                    source={{ uri: product.image }}
                    alt={product.name}
                  />
                </Chunk>

                <Chunk>
                  <Text weight="strong">{product.name}</Text>
                </Chunk>

                {/* Brand - Only on medium screens and up */}
                <View 
                  style={styles['hide']}
                  dataSet={{ media: ids["showAt__medium"] }}
                >
                  <Chunk>
                    <Text color="secondary">{product.brand}</Text>
                  </Chunk>
                </View>

                <Chunk>
                  <Flex justify="space-between" align="center">
                    <FlexItem>
                      <Text type="big" color="primary" weight="strong">
                        ${product.price}
                      </Text>
                    </FlexItem>
                    
                    {/* Rating - Only on large screens */}
                    <View 
                      style={styles['hide']}
                      dataSet={{ media: ids["showAt__large"] }}
                    >
                      <FlexItem>
                        <Inline>
                          <Icon shape="star" size={16} />
                          <Text size="small">{product.rating}</Text>
                        </Inline>
                      </FlexItem>
                    </View>
                  </Flex>
                </Chunk>

                {/* Description - Only on large screens */}
                <View 
                  style={styles['hide']}
                  dataSet={{ media: ids["showAt__large"] }}
                >
                  <Chunk>
                    <Text size="small" color="secondary">
                      {product.shortDescription}
                    </Text>
                  </Chunk>
                </View>

                <Chunk>
                  <Button color="primary" width="full">
                    Add to Cart
                  </Button>
                </Chunk>

                {/* Quick actions - Only on medium screens and up */}
                <View 
                  style={styles['hide']}
                  dataSet={{ media: ids["showAt__medium"] }}
                >
                  <Chunk>
                    <Flex>
                      <FlexItem>
                        <Button variant="secondary">
                          <Icon shape="heart" />
                        </Button>
                      </FlexItem>
                      <FlexItem>
                        <Button variant="secondary">
                          <Icon shape="share" />
                        </Button>
                      </FlexItem>
                    </Flex>
                  </Chunk>
                </View>
              </Card>
            )}
          />
        </Chunk>
      </Section>
    </Stripe>
  );
}
```

### Responsive Checkout Form

Multi-step checkout that adapts its layout and information density.

```javascript
function CheckoutForm({ cart, shippingMethods, paymentMethods }) {
  const [currentStep, setCurrentStep] = useState(1);
  const { styles, ids } = useContext(ThemeContext);

  return (
    <Stripe>
      <Section>
        <Flex switchDirection="medium">  
          {/* Checkout Form */}
          <FlexItem>
            <Chunk>
              <Text type="pageHead">Checkout</Text>
            </Chunk>

            {/* Progress indicator - Only on medium screens and up */}
            <View 
              style={styles['hide']}
              dataSet={{ media: ids["showAt__medium"] }}
            >
              <Chunk>
                <Flex>
                  {[1, 2, 3].map(step => (
                    <FlexItem key={step}>
                      <Flex align="center">
                        <FlexItem shrink>
                          <View style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            backgroundColor: step <= currentStep ? '#007bff' : '#e9ecef',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Text color={step <= currentStep ? 'white' : 'secondary'}>
                              {step}
                            </Text>
                          </View>
                        </FlexItem>
                        <FlexItem>
                          <Text size="small">
                            {step === 1 ? 'Shipping' : step === 2 ? 'Payment' : 'Review'}
                          </Text>
                        </FlexItem>
                      </Flex>
                    </FlexItem>
                  ))}
                </Flex>
              </Chunk>
            </View>

            {/* Form Content */}
            <Card>
              {currentStep === 1 && <ShippingForm />}
              {currentStep === 2 && <PaymentForm />}
              {currentStep === 3 && <ReviewForm />}
            </Card>
          </FlexItem>

          {/* Order Summary - Sidebar on desktop, bottom on mobile */}
          <FlexItem shrink>
            <Card>
              <Chunk>
                <Text type="sectionHead">Order Summary</Text>
              </Chunk>

              {cart.items.map(item => (
                <Chunk key={item.id}>
                  <Flex align="center">
                    {/* Product image - Only on large screens */}
                    <View 
                      style={styles['hide']}
                      dataSet={{ media: ids["showAt__large"] }}
                    >
                      <FlexItem shrink>
                        <Picture 
                          size="small"
                          source={{ uri: item.image }}
                          alt={item.name}
                        />
                      </FlexItem>
                    </View>

                    <FlexItem>
                      <Text weight="strong">{item.name}</Text>
                      <Text color="secondary">Qty: {item.quantity}</Text>
                    </FlexItem>

                    <FlexItem shrink>
                      <Text>${item.price * item.quantity}</Text>
                    </FlexItem>
                  </Flex>
                </Chunk>
              ))}

              <Chunk>
                <Flex justify="space-between">
                  <FlexItem>
                    <Text weight="strong">Total</Text>
                  </FlexItem>
                  <FlexItem shrink>
                    <Text type="big" weight="strong">
                      ${cart.total}
                    </Text>
                  </FlexItem>
                </Flex>
              </Chunk>
            </Card>
          </FlexItem>
        </Flex>
      </Section>
    </Stripe>
  );
}
```

## Form Patterns

### Responsive Contact Form

Contact form that adapts its layout and field arrangement.

```javascript
function ContactForm() {
  const { 
    fields, 
    setField, 
    fieldErrors, 
    submitting, 
    handleSubmit 
  } = useFormState({
    initialFields: {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      preferredContact: 'email'
    }
  });

  const { styles, ids } = useContext(ThemeContext);

  return (
    <Stripe>
      <Section>
        <Bounds medium>
          <Chunk>
            <Text type="pageHead">Get in Touch</Text>
          </Chunk>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Name and Email - Side by side on medium screens and up */}
            <Chunk>
              <Flex switchDirection="medium">
                <FlexItem>
                  <Label>Name *</Label>
                  <TextInput 
                    value={fields.name}
                    onChange={(name) => setField('name', name)}
                    placeholder="Your name"
                  />
                  <FieldError error={fieldErrors.name} />
                </FlexItem>

                <FlexItem>
                  <Label>Email *</Label>
                  <TextInput 
                    value={fields.email}
                    onChange={(email) => setField('email', email)}
                    placeholder="your@email.com"
                  />
                  <FieldError error={fieldErrors.email} />
                </FlexItem>
              </Flex>
            </Chunk>

            {/* Company and Phone - Only on medium screens and up, side by side */}
            <View 
              style={styles['hide']}
              dataSet={{ media: ids["showAt__medium"] }}
            >
              <Chunk>
                <Flex>
                  <FlexItem>
                    <Label>Company</Label>
                    <TextInput 
                      value={fields.company}
                      onChange={(company) => setField('company', company)}
                      placeholder="Your company"
                    />
                  </FlexItem>

                  <FlexItem>
                    <Label>Phone</Label>
                    <TextInput 
                      value={fields.phone}
                      onChange={(phone) => setField('phone', phone)}
                      placeholder="(555) 123-4567"
                    />
                  </FlexItem>
                </Flex>
              </Chunk>
            </View>

            {/* Company and Phone - Stacked on small screens */}
            <View 
              style={styles['show']}
              dataSet={{ media: ids["hideAt__medium"] }}
            >
              <Chunk>
                <Label>Company</Label>
                <TextInput 
                  value={fields.company}
                  onChange={(company) => setField('company', company)}
                  placeholder="Your company"
                />
              </Chunk>

              <Chunk>
                <Label>Phone</Label>
                <TextInput 
                  value={fields.phone}
                  onChange={(phone) => setField('phone', phone)}
                  placeholder="(555) 123-4567"
                />
              </Chunk>
            </View>

            {/* Message */}
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

            {/* Preferred contact method - Only on large screens */}
            <View 
              style={styles['hide']}
              dataSet={{ media: ids["showAt__large"] }}
            >
              <Chunk>
                <Label>Preferred Contact Method</Label>
                <Picker
                  selectedValue={fields.preferredContact}
                  onValueChange={(method) => setField('preferredContact', method)}
                >
                  <Picker.Item label="Email" value="email" />
                  <Picker.Item label="Phone" value="phone" />
                  <Picker.Item label="Either" value="either" />
                </Picker>
              </Chunk>
            </View>

            {/* Submit button */}
            <Chunk>
              <Button 
                type="submit"
                color="primary"
                isLoading={submitting}
                width="full"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </Chunk>
          </form>
        </Bounds>
      </Section>
    </Stripe>
  );
}
```

## Best Practices Summary

### ✅ Progressive Enhancement
Start with mobile-first design, then enhance for larger screens:

```javascript
// Default: Mobile layout
<View style={styles['show']}>
  <MobileComponent />
</View>

// Enhanced: Desktop layout
<View 
  style={styles['hide']}
  dataSet={{ media: ids["showAt__large"] }}
>
  <DesktopComponent />
</View>
```

### ✅ Content Prioritization
Show most important content first, add details for larger screens:

```javascript
// Always visible: Essential info
<Text>{product.name}</Text>
<Text>${product.price}</Text>

// Large screens only: Additional details
<View dataSet={{ media: ids["showAt__large"] }}>
  <Text>{product.description}</Text>
  <Text>SKU: {product.sku}</Text>
</View>
```

### ✅ Use Component Props When Available
Prefer built-in responsive behavior over manual utilities:

```javascript
// ✅ Good: Built-in responsive behavior
<Flex switchDirection="large">  // Switches from column to row at large breakpoint
<List variant={{ small: 'linear', large: 'grid' }} itemsInRow={{ mobile: 1, desktop: 3 }} />
<Button variant={{ small: 'grow', large: 'shrink' }} />

// ⚠️ Only use manual utilities when component props aren't available
<View dataSet={{ media: ids["showAt__large"] }}>
  <CustomComponent />
</View>
```

### ✅ Component-Level Responsive Props
Many components have built-in responsive behavior:

```javascript
// Flex: switchDirection is the breakpoint name where direction switches
<Flex direction="row" switchDirection="large">        // row until large, then column
<Flex direction="column" switchDirection="medium">    // column until medium, then row

// List: variant and itemsInRow use breakpoint objects
<List variant={{ small: 'linear', large: 'grid' }} itemsInRow={{ mobile: 1, tablet: 2, desktop: 4 }} />

// Button: variant affects width/sizing behavior
<Button variant={{ small: 'grow', large: 'shrink' }} />

// These props are internally converted to CSS classes with media queries
```

These patterns demonstrate how Cinderblock's responsive system creates adaptive, user-friendly interfaces that work seamlessly across all device sizes while maintaining the structural hierarchy that makes the system unique.