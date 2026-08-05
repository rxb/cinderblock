import React from 'react';
import {
  Bounds,
  Button,
  Card,
  Chunk,
  Flex,
  FlexItem,
  List,
  Section,
  Sectionless,
  Stripe,
  Text,
  ThemeContext,
  experimentalStyleConfig
} from '@cinderblock/design-system';
import Page from '../components/Page';

const FEATURES = [
  ['Small structure', 'Chunks keep related content close without exposing arbitrary spacing levels.'],
  ['Peer groups', 'Sections separate ideas at the middle level of the page hierarchy.'],
  ['Major regions', 'Stripes create the largest visual pause and may change the page surface.']
];

const CARDS = [
  ['A quieter card', 'The larger radius and softer border keep the card distinct without making it feel boxed in.'],
  ['Responsive composition', 'Flex changes direction at an intentional breakpoint while the content order stays stable.'],
  ['Limited hierarchy', 'The page is assembled from three structural spacing roles, including on small screens.']
];

export default function RhythmLab() {
  const { SWATCHES } = experimentalStyleConfig;

  return (
    <ThemeContext.Provider value={experimentalStyleConfig}>
      <Page title="Cinderblock rhythm lab">
        <Stripe style={{ backgroundColor: SWATCHES.canvas }}>
          <Bounds>
            <Section>
              <Chunk>
                <Text type="pageHead">A calmer, more expressive default rhythm</Text>
              </Chunk>
              <Chunk>
                <Text type="big" color="secondary">
                  This route tests typography, region spacing, peer sections, cards,
                  lists, and responsive Flex composition with an experimental theme.
                </Text>
              </Chunk>
              <Flex direction="column" switchDirection="medium">
                <FlexItem shrink>
                  <Chunk>
                    <Button label="Primary action" />
                  </Chunk>
                </FlexItem>
                <FlexItem shrink>
                  <Chunk>
                    <Button color="secondary" label="Secondary action" />
                  </Chunk>
                </FlexItem>
              </Flex>
            </Section>

            <Section>
              <Chunk>
                <Text type="sectionHead">Three structural levels</Text>
              </Chunk>
              <List
                variant={{ small: 'linear', large: 'grid' }}
                itemsInRow={{ large: 3 }}
                items={FEATURES}
                renderItem={([title, description]) => (
                  <Chunk>
                    <Text type="big" weight="strong">{title}</Text>
                    <Text color="secondary">{description}</Text>
                  </Chunk>
                )}
              />
            </Section>
          </Bounds>
        </Stripe>

        <Stripe>
          <Bounds>
            <Section>
              <Chunk>
                <Text type="sectionHead">Card and layout pressure test</Text>
              </Chunk>
              <List
                variant="grid"
                itemsInRow={{ small: 1, medium: 2, large: 3 }}
                items={CARDS}
                renderItem={([title, description]) => (
                  <Card style={{ backgroundColor: SWATCHES.surface }}>
                    <Sectionless>
                      <Chunk>
                        <Text type="big" weight="strong">{title}</Text>
                      </Chunk>
                      <Chunk>
                        <Text color="secondary">{description}</Text>
                      </Chunk>
                    </Sectionless>
                  </Card>
                )}
              />
            </Section>

            <Section>
              <Chunk>
                <Text type="sectionHead">Long-form section</Text>
              </Chunk>
              <Chunk>
                <Text>
                  A design system should make the common page feel composed before
                  the application adds local CSS. This paragraph is deliberately
                  ordinary: it checks whether the structural rhythm still works when
                  the content is neither a card nor a dashboard statistic.
                </Text>
              </Chunk>
            </Section>
          </Bounds>
        </Stripe>
      </Page>
    </ThemeContext.Provider>
  );
}
