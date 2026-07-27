import React from 'react';
import {
  Bounds,
  Button,
  Chunk,
  Flex,
  FlexItem,
  Icon,
  Section,
  Stripe,
  Text
} from '@cinderblock/design-system';
import Page from '../components/Page';

const FEATURES = [
  {
    icon: 'Zap',
    title: 'Fast development',
    description: 'Pre-built components and patterns accelerate your development workflow.'
  },
  {
    icon: 'Smartphone',
    title: 'Responsive design',
    description: 'Mobile-first responsive components work beautifully on any device.'
  },
  {
    icon: 'Layers',
    title: 'Structural system',
    description: 'Consistent hierarchy and spacing keep applications coherent as they grow.'
  }
];

export default function Home() {
  return (
    <Page currentPage="home">
      <Stripe
        image="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1800&q=80"
        imageFit="cover"
        imagePosition="top"
        imageStyle={{ opacity: 0.45 }}
        imageHeight={{ small: 360, medium: 420, large: 500 }}
        style={{ backgroundColor: '#172033' }}
      >
        <Bounds>
          <Section>
            <Chunk>
              <Text type="pageHead" align="center" inverted>
                Welcome to Cinderblock
              </Text>
            </Chunk>
            <Chunk>
              <Text align="center" inverted>
                A structural design system for building responsive React applications.
              </Text>
            </Chunk>
            <Chunk>
              <Flex justify="center">
                <FlexItem shrink>
                  <Button
                    label="Get started"
                    onPress={() => alert('Getting started!')}
                  />
                </FlexItem>
              </Flex>
            </Chunk>
          </Section>
        </Bounds>
      </Stripe>

      <Stripe>
        <Bounds>
          <Section>
            <Chunk>
              <Text type="sectionHead" align="center">
                Key features
              </Text>
            </Chunk>

            <Flex direction="column" switchDirection="large">
              {FEATURES.map(feature => (
                <FlexItem key={feature.title}>
                  <Chunk>
                    <Flex align="center">
                      <FlexItem shrink>
                        <Icon shape={feature.icon} size="medium" />
                      </FlexItem>
                      <FlexItem>
                        <Text type="big" weight="strong">{feature.title}</Text>
                      </FlexItem>
                    </Flex>
                  </Chunk>
                  <Chunk>
                    <Text>{feature.description}</Text>
                  </Chunk>
                </FlexItem>
              ))}
            </Flex>
          </Section>

          <Section>
            <Chunk>
              <Text type="sectionHead">Start building</Text>
            </Chunk>
            <Chunk>
              <Text>
                This starter includes the essential setup for Cinderblock.
                Start by editing <Text weight="strong">pages/index.js</Text> to
                customize this page.
              </Text>
            </Chunk>
            <Chunk>
              <Flex direction="column" switchDirection="medium">
                <FlexItem>
                  <Button
                    color="secondary"
                    label="View documentation"
                    width="full"
                    onPress={() => window.open('https://github.com/rxb/cinderblock')}
                  />
                </FlexItem>
                <FlexItem>
                  <Button
                    href="/about"
                    label="See example page"
                    width="full"
                  />
                </FlexItem>
              </Flex>
            </Chunk>
          </Section>
        </Bounds>
      </Stripe>
    </Page>
  );
}
