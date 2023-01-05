import React, { Fragment, useContext, useEffect, useState } from 'react';

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
import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';


const mdxComponents = {
      h1: ({children, ...props}) => <Text type="pageHead" {...props}>{children}</Text>,
      h2: ({children, ...props}) => <Text type="sectionHead" {...props}>{children}</Text>,
      p: ({children, ...props}) => <Text {...props}>{children}</Text>,
      img: ({ src, ...props }) => <Image source={{uri: src}} {...props} style={{minHeight: 100, minWidth: 100}} />,
};


export async function getStaticProps({ params }) {
  const fileContents = fs.readFileSync(path.resolve(process.cwd(), 'posts/test.md'));
  const postData = await serialize(fileContents);
  return {
    props: {
      postData,
    },
  };
};

export default function Home(props) {

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
              <MDXRemote {...props.postData} components={mdxComponents} />
              {/* <Markdown options={markdownOptions}>{props.postData}</Markdown> */}
            </Section>
          </Bounds>
        </Stripe> 
      </FlexItem>
    </Flex>
    </Page>
  )
}
