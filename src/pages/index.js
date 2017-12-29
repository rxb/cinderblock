import React from 'react'
import Link from 'gatsby-link'
import { View, Text, Image, StyleSheet } from '../kit/components/Primitives';
import DumbButton from '../kit/components/DumbButton';
import Stripe from '../kit/components/Stripe';
import Bounds from '../kit/components/Bounds';
import Section from '../kit/components/Section';
import Chunk from '../kit/components/Chunk';
import Flex from '../kit/components/Flex';
import FlexItem from '../kit/components/FlexItem';
import List from '../kit/components/List';


const PortfolioData = [
	{title: 'Meetup Recipes', subtitle: 'Lorem ipsum vitae at risus lacus ad lorem'},
	{title: 'Translation Party', subtitle: 'Lorem ipsum vitae at risus lacus ad lorem'},
	{title: 'Big Ups', subtitle: 'Lorem ipsum vitae at risus lacus ad lorem'},
	{title: 'WTF Has Obama Done So Far', subtitle: 'Lorem ipsum vitae at risus lacus ad lorem'},
	{title: 'Meetup 4.0', subtitle: 'Lorem ipsum vitae at risus lacus ad lorem'},
	{title: 'Join UX', subtitle: 'Lorem ipsum vitae at risus lacus ad lorem'},
	{title: 'Swarm Design System', subtitle: 'Lorem ipsum vitae at risus lacus ad lorem'},
	{title: 'Double Feature Finder', subtitle: 'Lorem ipsum vitae at risus lacus ad lorem'},
];


const PortfolioItem = (props)=>(
	<Chunk>
		<View>
			<View
				style={{
					backgroundColor: 'pink',
					height: 240,
					borderRadius: 5
				}}
				/>
			<h2>{props.title}</h2>
			<p>{props.subtitle}</p>
		</View>
	</Chunk>
);

const IndexPage = () => (
	<Flex direction="column" switchDirection="atMedium">
		<FlexItem growFactor={1}>
			<Stripe>
				<Bounds>
					<Section>
						<Chunk>
							<h1>Richard Boenigk</h1>
							<p>Well here we are</p>
						</Chunk>
						<Chunk>
							<Link to="/page-2/">Go to page 2</Link>
						</Chunk>
					</Section>
				</Bounds>
			</Stripe>
		</FlexItem>
		<FlexItem growFactor={2}>
			<Stripe style={{backgroundColor: '#fafafa', flex: 1}}>
				<Bounds>
					<Section>
						<List
							variant="grid"
							items={PortfolioData}
							renderItem={PortfolioItem}
							/>
					</Section>
				</Bounds>
			</Stripe>
		</FlexItem>
	</Flex>
)

export default IndexPage
