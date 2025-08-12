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


const FullWidthAspectRatioImage = (props) => {
  const {
    url,
    style,
    alt,
    title,
    ...other
  } = props;

  return (
      <img 
        src={url}
        style={{
          ...style,
          backgroundColor: '#eee', 
          width: '100%', 
          margin: 0,
          padding: 0,
          display: 'block'
        }} 
        {...other}
        />
  )
};

const ArticleImage = (props) => {
  const { styles, SWATCHES, METRICS } = useContext(ThemeContext);

  const {
    caption,
    ...other
  } = props;

  return(
    <Chunk>
      <View style={{marginVertical: METRICS.pseudoLineHeight, backgroundColor: SWATCHES.shade, borderRadius: 10, overflow: 'hidden'}}>
        <FullWidthAspectRatioImage {...other} />
        <View style={{paddingVertical: 12, paddingHorizontal: 16}}>
          <Text type="small">{caption}</Text>
        </View>
      </View>
    </Chunk>
  )
}




export default function Home(props) {

  const { styles, SWATCHES, METRICS } = useContext(ThemeContext);

  return (
    <>
        <Stripe>
            <Section>
              <Chunk>
                <Text type="pageHead">About rgb.work</Text>
              </Chunk>
            </Section>
            <Section>
              <Chunk>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </Text>
              </Chunk>
              <Chunk>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </Text>
              </Chunk>
            </Section>
        </Stripe> 

    </>
  )
}


