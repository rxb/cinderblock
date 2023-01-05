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


const FullWidthAspectRatioImage = (props) => {
  const {
    url,
    style,
    alt,
    title,
    ...other
  } = props;

  return (
    <Chunk>
      <div style={{borderRadius: 10, overflow: 'hidden'}}>
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
      </div>
    </Chunk>
  )
};

const mdxComponents = {
      h1: ({children, ...props}) => <Text chunk type="pageHead" {...props}>{children}</Text>,
      h2: ({children, ...props}) => <Text chunk type="sectionHead" {...props}>{children}</Text>,
      p: ({children, ...props}) => <Text chunk {...props}>{children}</Text>,
      img: (props) => <FullWidthAspectRatioImage {...props} />,
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
            <Section style={{alignItems: 'flex-start'}}>
                <Image source={{uri: 'computer.png'}} resizeMode="contain" style={{width: 118, height: 118, marginTop: -14, marginBottom: 20}} />
    
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
            </Section>
          </Bounds>
        </Stripe> 
      </FlexItem>
    </Flex>
    </Page>
  )
}
