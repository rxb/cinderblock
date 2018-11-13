import React from 'react'
import {Link} from 'gatsby'

import { View, Text, Image, StyleSheet } from '../kit/components/Primitives';
import DumbButton from '../kit/components/DumbButton';
import Stripe from '../kit/components/Stripe';
import Bounds from '../kit/components/Bounds';
import Section from '../kit/components/Section';
import Chunk from '../kit/components/Chunk';
import Flex from '../kit/components/Flex';
import FlexItem from '../kit/components/FlexItem';
import List from '../kit/components/List';
import styles from '../kit/styles/styles';

const PortfolioData = [
	{title: 'Meetup Recipes', subtitle: 'Lorem ipsum vitae at risus lacus ad lorem'},
	{title: 'Translation Party', subtitle: 'Lorem ipsum vitae at risus lacus ad lorem'},
	{title: 'Big Ups', subtitle: 'Lorem ipsum vitae at risus lacus ad lorem'},
	{title: 'WTF Has Obama Done So Far', subtitle: 'Lorem ipsum vitae at risus lacus ad lorem'},
	{title: 'Meetup 4.0', subtitle: 'Lorem ipsum vitae at risus lacus ad lorem'},
	{title: 'Vampire Club', subtitle: 'UV protection for the fashionable and undead'},
	{title: 'Join UX', subtitle: 'Lorem ipsum vitae at risus lacus ad lorem'},
	{title: 'Swarm Design System', subtitle: 'Lorem ipsum vitae at risus lacus ad lorem'},
	{title: 'Double Feature Finder', subtitle: 'Lorem ipsum vitae at risus lacus ad lorem'},
];


const PortfolioItem = (props)=>(
	<Link to="page-2">
		<Chunk>
			<View>
				<View
					style={{
						backgroundColor: 'pink',
						height: 240,
						borderRadius: 5
					}}
					/>
				<h3>{props.title}</h3>
				<Text style={styles.text}>{props.subtitle}</Text>
			</View>
		</Chunk>
	</Link>
);

const IndexPage = () => (
	<Flex direction="column" switchDirection="atMedium" noGutters>
		<FlexItem growFactor={1}>
			<Stripe>
				<Bounds>
					<Section>
						<Chunk>
							<h1 id="h1-welcome">Richard Boenigk</h1>
						</Chunk>
						<Chunk>
							<p>Well here we are</p>
						</Chunk>
					</Section>
					<Section>
						<Chunk>
							<p>Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae.</p>
						</Chunk>
					</Section>
					<Section>
						<Chunk>
							<View
								style={{
									backgroundColor: 'aqua',
									width: 64,
									height: 64,
									borderRadius: 32
								}}
								/>
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
