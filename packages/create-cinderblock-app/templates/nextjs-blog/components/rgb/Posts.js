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
} from '@cinderblock/design-system';

import dayjs from 'dayjs';

export const PostList = (props) => {
   const {posts} = props;

   return posts.map((post, i)=>(
      <Section border={i>0}>
          <Link href={`/articles/${post.slug}`}>
          <Flex section>
            <FlexItem section>
              <Chunk>
                <Text type="sectionHead">{post.title}</Text>
              </Chunk>
              <Chunk>
                <Text type="small">{post.excerpt}</Text>
              </Chunk>
            </FlexItem>
            <FlexItem shrink section>
              <Chunk style={{flex: 1}}>
                <Image 
                  //source={{uri: post.image}} 
                  source={{uri: `https://loremflickr.com/180/180/moderndesign?random=${i}`}}
                  resizeMode="cover" 
                  style={{
                    width: 180, 
                    flex: 1,
                    minHeight: 120, 
                    borderRadius: 8
                  }}
                  />
              </Chunk>
            </FlexItem>
          </Flex>
        </Link>
      </Section>
    ))
}