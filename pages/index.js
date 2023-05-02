import React, { Fragment, useContext, useEffect, useState } from 'react';

// COMPONENTS
import {
	Avatar,
	Bounds,
	Button,
	Card,
	CheckBox,
  Chip,
	Chunk,
	Flex,
	FlexItem,
	Header,
	Icon,
	Inline,
	Image,
  ImageSnap,
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
import {MEDIA_QUERIES_SINGLE} from 'cinderblock/styles/designConstants';
import StyleSheet from 'react-native-media-query';




export async function getStaticProps({ params }) {
  const fileRead = fs.readFileSync(path.resolve(process.cwd(), 'posts/test.mdx'));
  const mdxSource = await serialize(fileRead, {parseFrontmatter: true});
  return {
    props: {
    },
  };
};



export default function Home(props) {

  const { styles, SWATCHES, METRICS } = useContext(ThemeContext);

  return (
    <Page>
        <Stripe>

            <Section>
              <List 
                items={[1,2,3,4]}
                renderItem={()=>(
                  <Link href="/article">
                  <Flex>
                    <FlexItem>
                      <Chunk>
                        <Text type="sectionHead">A table that reads books aloud and summarizes</Text>
                      </Chunk>
                      <Chunk>
                        <Text type="small">Lorem ipsum dolor sit amet, adipiscing, sed do. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</Text>
                      </Chunk>
                    </FlexItem>
                    <FlexItem shrink>
                      <Chunk>
                        <Image 
                          source={{uri: 'https://i.imgur.com/y4WUgiU.jpg'}} 
                          resizeMode="cover" 
                          style={{width: 110, height: 110, borderRadius: 4}}
                          />
                      </Chunk>
                    </FlexItem>
                  </Flex>
                  </Link>
                )}
                />
            </Section>
        </Stripe> 

    </Page>
  )
}


