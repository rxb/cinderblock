import React from 'react';
import {
  Bounds,
  Button,
  Chunk,
  Flex,
  FlexItem,
  Icon,
  Label,
  Section,
  Stripe,
  Text,
  TextInput
} from '@cinderblock/design-system';
import Page from '../components/Page';

const INCLUDED_ITEMS = [
  {
    icon: 'Package',
    title: 'Essential components',
    description: 'Layout, forms, navigation, and content primitives are already configured.'
  },
  {
    icon: 'Settings',
    title: 'Optimized configuration',
    description: 'Next.js and React Native Web work together through the included setup.'
  },
  {
    icon: 'Zap',
    title: 'Ready to customize',
    description: 'The intentionally small codebase is easy to understand and extend.'
  }
];

export default function About() {
  return (
    <Page currentPage="about">
      <Stripe>
        <Bounds>
          <Section>
            <Chunk>
              <Text type="pageHead">About this starter</Text>
            </Chunk>
            <Chunk>
              <Text>
                This minimal Next.js starter provides a clean foundation for
                modern applications built with Cinderblock.
              </Text>
            </Chunk>
            <Chunk>
              <Text>
                Ordinary content lives directly in Sections; no additional
                visual container is required.
              </Text>
            </Chunk>
          </Section>

          <Section>
            <Chunk>
              <Text type="sectionHead">What&apos;s included</Text>
            </Chunk>

            {INCLUDED_ITEMS.map(item => (
              <Chunk border key={item.title}>
                <Flex align="center">
                  <FlexItem shrink>
                    <Icon shape={item.icon} size="medium" />
                  </FlexItem>
                  <FlexItem>
                    <Text type="big" weight="strong">{item.title}</Text>
                    <Text color="secondary">{item.description}</Text>
                  </FlexItem>
                </Flex>
              </Chunk>
            ))}
          </Section>

          <Section>
            <Chunk>
              <Text type="sectionHead">Contact form example</Text>
            </Chunk>
            <Chunk>
              <Label htmlFor="contact-name">Name</Label>
              <TextInput id="contact-name" name="name" />
            </Chunk>
            <Chunk>
              <Label htmlFor="contact-email">Email</Label>
              <TextInput id="contact-email" name="email" inputMode="email" />
            </Chunk>
            <Chunk>
              <Label htmlFor="contact-message">Message</Label>
              <TextInput
                id="contact-message"
                name="message"
                multiline
                style={{ minHeight: 100 }}
              />
            </Chunk>
            <Chunk>
              <Flex direction="column" switchDirection="medium">
                <FlexItem>
                  <Button
                    href="/"
                    color="secondary"
                    label="Cancel"
                    width="full"
                  />
                </FlexItem>
                <FlexItem>
                  <Button
                    label="Send message"
                    width="full"
                    onPress={() => alert('Form submitted!')}
                  />
                </FlexItem>
              </Flex>
            </Chunk>
          </Section>

          <Section>
            <Chunk>
              <Text type="sectionHead">Next steps</Text>
            </Chunk>
            <Chunk>
              <Text>Customize the homepage in pages/index.js.</Text>
            </Chunk>
            <Chunk>
              <Text>Add new routes in the pages directory.</Text>
            </Chunk>
            <Chunk>
              <Text>Explore the kitchensink for advanced, conditional patterns.</Text>
            </Chunk>
            <Chunk>
              <Button
                href="/"
                color="secondary"
                label="Back to home"
                width="snap"
              />
            </Chunk>
          </Section>
        </Bounds>
      </Stripe>
    </Page>
  );
}
