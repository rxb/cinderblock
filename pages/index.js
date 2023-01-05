import React, { Fragment, useContext } from 'react';

// COMPONENTS
import {
	Avatar,
	Bounds,
	Button,
	Card,
	CheckBox,
	Chunk,
	Flex,
	FlexItem,
	Header,
	Icon,
	Inline,
	Image,
	Label,
	List,
	Link,
	Modal,
	Picker,
	Section,
	Sectionless,
	Stripe,
	Text,
	TextInput,
	Touch,
	useMediaContext,
	View,
	ThemeContext,
	designConstants
} from 'cinderblock';

import Page from '@/components/Page';

export default function Home() {
  const { styles, SWATCHES, METRICS } = useContext(ThemeContext);

  return (
    <Page>
    <Flex direction="column" switchDirection="large" >
      <FlexItem shrink>
        <Stripe style={{borderRightWidth: 1, borderRightColor: SWATCHES.border, minHeight: '100vh'}}>
          <View style={{minWidth: 240}}>
            <Section>
              <Chunk>
                <Text weight="strong">Richard Boenigk</Text>
                <Text color="secondary">Hacking + Designing</Text>
              </Chunk>
            </Section>
            <Section border>
              <Chunk>
                <Text weight="strong">Home</Text>
                <Text color="secondary">Projects</Text>
                <Text color="secondary">Blog</Text>
                <Text color="secondary">About</Text>
              </Chunk> 
              <Chunk>
                <Inline>
                <Button 
                  shape="Twitter"
                  color="secondary"
                  size="small"
                  />
                <Button 
                  shape="Instagram"
                  color="secondary"
                  size="small"
                  /> 
                <Button 
                  shape="GitHub"
                  color="secondary"
                  size="small"
                  />        
                </Inline>           
              </Chunk>
            </Section>
          </View>
        </Stripe> 
      </FlexItem>
      <FlexItem>
        <Stripe>
          <Bounds>
            <Section>
              <Text type="pageHead">Hey</Text>
            </Section>
          </Bounds>
        </Stripe> 
      </FlexItem>
    </Flex>
    </Page>
  )
}
