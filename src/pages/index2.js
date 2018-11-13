import React, {Fragment} from 'react'
import {Link} from 'gatsby'

import {
	Bounds,
	Button,
	Chunk,
	Image,
	Flex,
	FlexItem,
	List,
	Section,
	Stripe,
	Text,
	View
} from 'cinderblock';
import swatches from 'cinderblock/styles/swatches';


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
				<Text weight="strong">{props.title}</Text>
				<Text>{props.subtitle}</Text>
			</View>
		</Chunk>
	</Link>
);

const IndexPage = () => (
		<View>
			<Stripe style={{backgroundColor: '#FF2C00', minHeight: '75vh'}}>
				<Bounds style={{justifyContent: 'center', flex: 1}}>
				<Flex direction="column" switchDirection="large" noGutters>
					<FlexItem>
						<Section>
							<Chunk>
								<Text
									inverted
									accessibilityRole="heading"
									accessibilityLevel="1"
									type="hero"
									style={{fontSize: 96, lineHeight: 96, marginTop: -12}}
									>rgb.&#8203;work</Text>
							</Chunk>
							<Chunk>
								<Text inverted type="big">Richard Boenigk</Text>
								<Text inverted type="big" color="secondary">Designer, Hacker</Text>
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
								<Text inverted>Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae. Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae.</Text>
							</Chunk>
							<Chunk>
								<Text inverted>hello@rgb.work</Text>
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
