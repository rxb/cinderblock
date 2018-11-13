import React, {Fragment} from 'react'
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
		<View>
			<Stripe style={{backgroundColor: '#FF2C00', minHeight: '75vh'}}>
				<Bounds style={{justifyContent: 'center', flex: 1}}>
				<Flex direction="column" switchDirection="atMedium" noGutters>
					<FlexItem>
						<Section>
							<Chunk>
								<h1 id="h1-welcome" style={{fontSize: 100, color: 'white', lineHeight: 1}}>rgb.&#8203;work</h1>
							</Chunk>
							<Chunk>
								<p style={{color: 'white', fontWeight: 700, fontSize: 24}}>Richard Boenigk</p>
								<p style={{color: 'white', fontSize: 24, opacity: .85}}>Designer, Hacker</p>
							</Chunk>
							{/*
							<Chunk>
								<View
									style={{
										backgroundColor: 'aqua',
										width: 24,
										height: 24,
										borderRadius: 12
									}}
									/>
							</Chunk>
							*/}
						</Section>
					</FlexItem>
					<FlexItem>
						<Section>
							<Chunk>
								<p style={{color: 'white', fontSize: 18, marginTop: 22}}>Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae. Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae.</p>
							</Chunk>
							<Chunk>
								<p style={{color: 'white', fontSize: 18, textDecoration: 'underline'}}>hello@rgb.work</p>
							</Chunk>
						</Section>
					</FlexItem>
				</Flex>
				</Bounds>
			</Stripe>

			<Stripe style={{ flex: 1}}>
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
		</View>
)

export default IndexPage
