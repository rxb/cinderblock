import React from 'react';
import {
  Button,
  Card,
  Chunk,
  Flex,
  FlexItem,
  Icon,
  Link,
  Section,
  Text,
  TextInput
} from '@cinderblock/design-system';
import Page from '../components/Page';

export default function About() {
  return (
    <Page currentPage="about">
        <Section>
          <Chunk>
            <Text type="pageHead">About This Starter</Text>
          </Chunk>
          
          <Chunk>
            <Text>
              This is a minimal Next.js starter project powered by the Cinderblock Design System. 
              It provides a clean foundation for building modern web applications with a focus on 
              developer experience and design consistency.
            </Text>
          </Chunk>
          
          <Chunk>
            <Text>
              The starter includes essential components and configuration to get you up and running 
              quickly, without the complexity of a full-featured demo application.
            </Text>
          </Chunk>
        </Section>

        <Section>
          <Chunk>
            <Text type="sectionHead">What's Included</Text>
          </Chunk>

          <Chunk>
            <Card>
              <Section>
                <Chunk>
                  <Flex direction="row" align="center">
                    <FlexItem shrink>
                      <Icon shape="Package" size="medium" />
                    </FlexItem>
                    <FlexItem grow>
                      <Text type="sectionHead">Essential Components</Text>
                    </FlexItem>
                  </Flex>
                </Chunk>
                
                <Chunk>
                  <Text>
                    Pre-configured with the Cinderblock Design System, giving you access to 
                    layout components, forms, navigation, and more.
                  </Text>
                </Chunk>
              </Section>
            </Card>
          </Chunk>

          <Chunk>
            <Card>
              <Section>
                <Chunk>
                  <Flex direction="row" align="center">
                    <FlexItem shrink>
                      <Icon shape="Settings" size="medium" />
                    </FlexItem>
                    <FlexItem grow>
                      <Text type="sectionHead">Optimized Configuration</Text>
                    </FlexItem>
                  </Flex>
                </Chunk>
                
                <Chunk>
                  <Text>
                    Next.js configuration optimized for React Native Web integration, 
                    with proper Babel setup and module resolution.
                  </Text>
                </Chunk>
              </Section>
            </Card>
          </Chunk>

          <Chunk>
            <Card>
              <Section>
                <Chunk>
                  <Flex direction="row" align="center">
                    <FlexItem shrink>
                      <Icon shape="Zap" size="medium" />
                    </FlexItem>
                    <FlexItem grow>
                      <Text type="sectionHead">Ready to Customize</Text>
                    </FlexItem>
                  </Flex>
                </Chunk>
                
                <Chunk>
                  <Text>
                    Clean, minimal codebase that's easy to understand and extend. 
                    Start building your features right away.
                  </Text>
                </Chunk>
              </Section>
            </Card>
          </Chunk>
        </Section>

        <Section>
          <Chunk>
            <Text type="sectionHead">Quick Example</Text>
          </Chunk>
          
          <Chunk>
            <Text>
              Here's a simple example showing how easy it is to build with Cinderblock components:
            </Text>
          </Chunk>

          <Chunk>
            <Card>
              <Section>
                <Chunk>
                  <Text type="title">Contact Form</Text>
                </Chunk>
                
                <Chunk>
                  <TextInput placeholder="Your name" />
                </Chunk>
                
                <Chunk>
                  <TextInput placeholder="Your email" />
                </Chunk>
                
                <Chunk>
                  <TextInput 
                    placeholder="Your message" 
                    multiline 
                    style={{ minHeight: 100 }}
                  />
                </Chunk>
                
                <Chunk>
                  <Flex direction="row">
                    <FlexItem grow>
                      <Button type="secondary">Cancel</Button>
                    </FlexItem>
                    <FlexItem grow>
                      <Button onPress={() => alert('Form submitted!')}>
                        Send Message
                      </Button>
                    </FlexItem>
                  </Flex>
                </Chunk>
              </Section>
            </Card>
          </Chunk>
        </Section>

        <Section>
          <Chunk>
            <Text type="sectionHead">Next Steps</Text>
          </Chunk>
          
          <Chunk>
            <Text>
              Ready to start building? Here are some suggestions:
            </Text>
          </Chunk>

          <Chunk>
            <Text>• Customize the homepage in <Text weight="bold">pages/index.js</Text></Text>
          </Chunk>
          
          <Chunk>
            <Text>• Add new pages in the <Text weight="bold">pages/</Text> directory</Text>
          </Chunk>
          
          <Chunk>
            <Text>• Explore more components in the design system documentation</Text>
          </Chunk>
          
          <Chunk>
            <Text>• Check out the kitchensink demo for advanced examples</Text>
          </Chunk>

          <Chunk>
            <Flex direction="row" justify="center">
              <FlexItem shrink>
                <Link href="/">
                  <Button type="secondary">
                    Back to Home
                  </Button>
                </Link>
              </FlexItem>
            </Flex>
          </Chunk>
        </Section>
    </Page>
  );
}