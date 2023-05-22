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

export async function getStaticPaths(){ 
  
   return { 
     paths: [
      { params: {
            category: 'projects'
         }
      },
      { params: {
            category: 'blog'
         }
      },
     ],
     fallback: false // basically swr, serve stale and regenerate in background
   }
 }

export async function getStaticProps({ params }) {
  const mdxFiles = await glob('posts/*.mdx', { cwd: process.cwd() });

  // get all posts content
  const postsPromises = mdxFiles.map( async (file, index) => {
    try{
      const fileRead = await fs.readFile(file, "utf8");
      const mdxSource = await serialize(fileRead, {parseFrontmatter: true}); 
      const {frontmatter} = mdxSource;
      const generatedExcerpt = fileRead.split(/---/g)[2].substring(0, 200).trim()+"…";
      const fileStats = await fs.stat(file);
      const slug = file.split('/')[1].split('.')[0];
      const post = {
        file: file,
        slug: slug,
        date: fileStats.birthtime.toISOString(),
        excerpt: generatedExcerpt,
        ...frontmatter
      }
      return post;
    }
    catch(e){
      console.log(`problem loading post ${file}`);
      console.error(e);
    }
  });
  let posts = await Promise.all(postsPromises);
  
  // filter only this category
  posts = posts.filter((p)=>{
   return p.category == params.category;
  })

  // sort by date
  posts.sort((a,b)=>{
    return new Date(b.date) - new Date(a.date);
  })

  return { 
    props: {
      posts,
      category: params.category
   }
  }
}



export default function Home(props) {

  const { styles, SWATCHES, METRICS } = useContext(ThemeContext);

  let pageTitle;
  switch(props.category){
      case 'projects':
         pageTitle = 'Projects'
         break;
      case 'blog':
         pageTitle = 'Blog'
         break;
  }

  return (
    <>
        <Stripe>
            <Section>
               <Chunk>
                  <Text type="pageHead">{pageTitle}</Text>
               </Chunk>
            </Section>
            <Section>

              <List 
                items={props.posts}
                renderItem={(post)=>(
                  <Link href={`/articles/${post.slug}`}>
                  <Flex>
                    <FlexItem>
                      <Chunk>
                        <Text type="sectionHead">{post.title}</Text>
                      </Chunk>
                      <Chunk>
                        <Text type="small">{post.excerpt}</Text>
                      </Chunk>
                    </FlexItem>
                    <FlexItem shrink>
                      <Chunk>
                        <Image 
                          source={{uri: post.image}} 
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

    </>
  )
}


