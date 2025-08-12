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
  Text
} from '@cinderblock/design-system';
import Page from '../components/Page';

export default function Home() {
  return (
    <Page currentPage="home">
        <Section>
          <Chunk>
            <Text type="pageHead" align="center">
              Welcome to Cinderblock
            </Text>
          </Chunk>
          
          <Chunk>
            <Text align="center">
              A powerful design system for building beautiful React applications.
            </Text>
          </Chunk>
          
          <Chunk>
            <Flex direction="row" justify="center">
              <FlexItem shrink>
                <Button onPress={() => alert('Getting started!')}>
                  Get Started
                </Button>
              </FlexItem>
            </Flex>
          </Chunk>
        </Section>

        {/* Feature Cards */}
        <Section>
          <Chunk>
            <Text type="sectionHead" align="center">
              Key Features
            </Text>
          </Chunk>

          <Flex direction="row" wrap>
            <FlexItem basis="33%" style={{ minWidth: 280 }}>
              <Card>
                <Section>
                  <Chunk>
                    <Flex direction="row" align="center">
                      <FlexItem shrink>
                        <Icon shape="Zap" size="medium" />
                      </FlexItem>
                      <FlexItem grow>
                        <Text type="sectionHead">Fast Development</Text>
                      </FlexItem>
                    </Flex>
                  </Chunk>
                  
                  <Chunk>
                    <Text>
                      Pre-built components and patterns to accelerate your development workflow.
                    </Text>
                  </Chunk>
                </Section>
              </Card>
            </FlexItem>

            <FlexItem basis="33%" style={{ minWidth: 280 }}>
              <Card>
                <Section>
                  <Chunk>
                    <Flex direction="row" align="center">
                      <FlexItem shrink>
                        <Icon shape="Smartphone" size="medium" />
                      </FlexItem>
                      <FlexItem grow>
                        <Text type="sectionHead">Responsive Design</Text>
                      </FlexItem>
                    </Flex>
                  </Chunk>
                  
                  <Chunk>
                    <Text>
                      Mobile-first responsive components that work beautifully on any device.
                    </Text>
                  </Chunk>
                </Section>
              </Card>
            </FlexItem>

            <FlexItem basis="33%" style={{ minWidth: 280 }}>
              <Card>
                <Section>
                  <Chunk>
                    <Flex direction="row" align="center">
                      <FlexItem shrink>
                        <Icon shape="Layers" size="medium" />
                      </FlexItem>
                      <FlexItem grow>
                        <Text type="sectionHead">Design System</Text>
                      </FlexItem>
                    </Flex>
                  </Chunk>
                  
                  <Chunk>
                    <Text>
                      Consistent, accessible components with thoughtful design patterns.
                    </Text>
                  </Chunk>
                </Section>
              </Card>
            </FlexItem>
          </Flex>
        </Section>

        {/* Getting Started */}
        <Section>
          <Chunk>
            <Text type="sectionHead" align="center">
              Next Steps
            </Text>
          </Chunk>

          <Chunk>
            <Card>
              <Section>
                <Chunk>
                  <Text type="title">Start Building</Text>
                </Chunk>
                
                <Chunk>
                  <Text>
                    This starter includes the essential setup for building with Cinderblock. 
                    Start by editing <Text weight="bold">pages/index.js</Text> to customize this page.
                  </Text>
                </Chunk>
                
                <Chunk>
                  <Flex direction="row">
                    <FlexItem grow>
                      <Button 
                        type="secondary" 
                        onPress={() => window.open('https://github.com/rxb/cinderblock')}
                      >
                        View Documentation
                      </Button>
                    </FlexItem>
                    <FlexItem grow>
                      <Link href="/about">
                        <Button>
                          See Example Page
                        </Button>
                      </Link>
                    </FlexItem>
                  </Flex>
                </Chunk>
              </Section>
            </Card>
          </Chunk>
        </Section>
    </Page>
  );
}