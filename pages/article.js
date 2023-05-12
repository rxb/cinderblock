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

const ArticleYoutube = (props) => {
  return(
    <Chunk>
    <div className="video-container">
      <iframe width="100%" height="100%"
      src={`https://www.youtube.com/embed/${props.videoId}?modestbranding=1`}>
      </iframe>
    </div>
    </Chunk>
  );
}

const ArticleGithub = (props) => {
  const { styles, SWATCHES, METRICS } = useContext(ThemeContext);

  return(
    <Card style={{backgroundColor: SWATCHES.shade, borderWidth: 0}}>
      <Section>
        <Flex>
          <FlexItem>
            <Chunk>
              <Flex flush>
                <FlexItem flush shrink justify="center">
                  <Icon 
                    color={SWATCHES.textPrimary}
                    shape="GitHub" 
                    size="small" 
                    style={{ marginRight: 5}} 
                    />
                </FlexItem>
                <FlexItem flush>
                  <Text weight="strong">github.com/rxb/starterkit</Text>
                </FlexItem>
              </Flex>
              <Text>Why did I make an entire framework of my own? </Text>
            </Chunk>
          </FlexItem>
          <FlexItem shrink justify="center">
            <Chunk>
            <Icon 
              shape="ArrowRight" 
              />
            </Chunk>
          </FlexItem>
        </Flex>
      </Section>
    </Card>
  );
}

const mdxComponents = {
      ArticleImage,
      ArticleYoutube,
      ArticleGithub,
      h1: ({children, ...props}) => <Text chunk type="pageHead" {...props}>{children}</Text>,
      h2: ({children, ...props}) => <Text chunk type="sectionHead" {...props}>{children}</Text>,
      p: ({children, ...props}) => <Text chunk {...props}>{children}</Text>,
      img: (props) => <FullWidthAspectRatioImage {...props} />,
};


export async function getStaticProps({ params }) {
  const fileRead = fs.readFileSync(path.resolve(process.cwd(), 'posts/test.mdx'));
  const mdxSource = await serialize(fileRead, {parseFrontmatter: true});
  return {
    props: {
      mdxSource
    },
  };
};



export default function Home(props) {

  const { styles, SWATCHES, METRICS } = useContext(ThemeContext);

  return (
    <Page>
        <Stripe>
            <Section>
              <Chunk>
                <Text type="pageHead">{props.mdxSource.frontmatter.title}</Text>
              </Chunk>
              <Chunk>
                {props.mdxSource.frontmatter.category == 'blog' &&
                  <Text type="small" weight="strong">March 12, 2022</Text>
                }
                {props.mdxSource.frontmatter.category == 'project' &&
                  <Text type="small" color="secondary">Project</Text>
                }
                
              </Chunk>
              <MDXRemote {...props.mdxSource} components={mdxComponents} />
            </Section>
        </Stripe> 

    </Page>
  )
}


