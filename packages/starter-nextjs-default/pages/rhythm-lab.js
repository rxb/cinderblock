import React, {useState} from 'react';
import {
  Bounds,
  Button,
  Card,
  Chunk,
  Flex,
  FlexItem,
  List,
  Modal,
  Prompter,
  Section,
  Sectionless,
  Stripe,
  Tabs,
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

function ConfirmationContent({onRequestClose}) {
  return (
    <Section>
      <Chunk>
        <Text type="sectionHead">Remove sample exercise?</Text>
      </Chunk>
      <Chunk>
        <Text>This verifies that confirmation requires an explicit action.</Text>
      </Chunk>
      <Chunk>
        <Button
          id="prompt-review-consequence"
          color="secondary"
          label="Review consequence"
          onPress={() => {}}
        />
      </Chunk>
      <Flex direction="column" switchDirection="medium">
        <FlexItem>
          <Chunk>
            <Button
              color="secondary"
              label="Cancel"
              onPress={onRequestClose}
            />
          </Chunk>
        </FlexItem>
        <FlexItem>
          <Chunk>
            <Button
              label="Remove sample"
              onPress={onRequestClose}
            />
          </Chunk>
        </FlexItem>
      </Flex>
    </Section>
  );
}

export default function RhythmLab() {
  const { SWATCHES } = experimentalStyleConfig;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('exercises');
  const [prompts, setPrompts] = useState([]);

  const openPrompt = () => {
    setPrompts([{
      id: 'sample-removal',
      showable: true,
      dismissable: true,
      accessibilityLabel: 'Remove sample exercise',
      initialFocusId: 'prompt-review-consequence',
      onPressEnter: () => setPrompts([]),
      content: <ConfirmationContent />
    }]);
  };

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

            <Section>
              <Chunk>
                <Text type="sectionHead">Layer accessibility contract</Text>
              </Chunk>
              <Chunk>
                <Text color="secondary">
                  Modal focus stays contained and returns to its opener. Tabs
                  support Arrow keys, Home, and End. Prompts require an explicit
                  control rather than treating Enter as confirmation.
                </Text>
              </Chunk>
              <Flex direction="column" switchDirection="medium">
                <FlexItem shrink>
                  <Chunk>
                    <Button
                      id="open-layer-lab-modal"
                      label="Open layer example"
                      onPress={() => setModalVisible(true)}
                    />
                  </Chunk>
                </FlexItem>
                <FlexItem shrink>
                  <Chunk>
                    <Button
                      color="secondary"
                      label="Open confirmation"
                      onPress={openPrompt}
                    />
                  </Chunk>
                </FlexItem>
              </Flex>
            </Section>
          </Bounds>
        </Stripe>

        <Modal
          visible={modalVisible}
          accessibilityLabel="Layer accessibility example"
          initialFocusId="layer-lab-done"
          onRequestClose={() => setModalVisible(false)}
        >
          <Section>
            <Chunk>
              <Text type="pageHead">Layer accessibility example</Text>
            </Chunk>
            <Chunk>
              <Tabs
                id="layer-lab-source-tabs"
                accessibilityLabel="Example source"
                selectedValue={selectedTab}
                onChange={setSelectedTab}
                fullWidth
              >
                <Tabs.Item value="exercises" label="Exercises" />
                <Tabs.Item value="routines" label="Routines" />
              </Tabs>
            </Chunk>
            <Tabs.Panel
              tabsId="layer-lab-source-tabs"
              value="exercises"
              selectedValue={selectedTab}
            >
              <Chunk>
                <Text>Exercise search and results will live in this panel.</Text>
              </Chunk>
            </Tabs.Panel>
            <Tabs.Panel
              tabsId="layer-lab-source-tabs"
              value="routines"
              selectedValue={selectedTab}
            >
              <Chunk>
                <Text>Saved routine results will live in this panel.</Text>
              </Chunk>
            </Tabs.Panel>
            <Chunk>
              <Button
                id="layer-lab-done"
                label="Done"
                onPress={() => setModalVisible(false)}
              />
            </Chunk>
          </Section>
        </Modal>

        <Prompter
          prompts={prompts}
          hidePrompt={(id) => {
            setPrompts((current) => current.map((prompt) => (
              prompt.id === id ? {...prompt, showable: false} : prompt
            )));
          }}
          removePrompt={(id) => {
            setPrompts((current) => current.filter((prompt) => prompt.id !== id));
          }}
        />
      </Page>
    </ThemeContext.Provider>
  );
}
