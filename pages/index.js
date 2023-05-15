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
import fs from 'fs/promises';
import dayjs from 'dayjs';
import path from 'path';
import {glob} from 'glob'
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import {MEDIA_QUERIES_SINGLE} from 'cinderblock/styles/designConstants';
import StyleSheet from 'react-native-media-query';
import POSTS_CONFIG from "../posts/config.json" assert { type: "json" };

export async function getStaticProps() {
  const mdxFiles = await glob('posts/*.mdx', { cwd: process.cwd() });

  // get all posts content
  const postsPromises = mdxFiles.map( async (file, index) => {
    try{
      const fileRead = await fs.readFile(file);
      const mdxSource = await serialize(fileRead, {parseFrontmatter: true}); 
      const fileStats = await fs.stat(file); 
      const post = {
        file: file,
        mdxSource,
        date: mdxSource.frontmatter.date || fileStats.birthtime.toISOString()
      }
      return post;
    }
    catch(e){
      console.log(`problem loading post ${file}`);
      console.error(e);
    }
  });
  let posts = await Promise.all(postsPromises);
  

  // sort by date
  posts.sort((a,b)=>{
    return new Date(b.date) - new Date(a.date);
  })

  // pinned posts
  const {pinned = []} = POSTS_CONFIG;
  pinned.reverse().forEach( p => {     
    const foundIdx = posts.findIndex(el => el.file == `posts/${p}`);
    if(foundIdx > -1){
      const foundItem = posts[foundIdx];
      posts.splice(foundIdx, 1);
      posts.unshift(foundItem);
    }
    else{
      console.log('pinned post not found');
    }
  });
  
  return { 
    props: {
      posts,
      POSTS_CONFIG
    }
  }
}



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


