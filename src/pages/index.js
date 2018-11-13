import React, {Fragment} from 'react'
import {Helmet} from "react-helmet";
import {Link} from 'gatsby'

import {
	Bounds,
	Button,
	Chunk,
	Icon,
	Inline,
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
import styles from 'cinderblock/styles/styles';


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
					style={[
						{
							backgroundColor: 'pink',
							height: 240,
							borderRadius: 5,
						},
						styles.pseudoLineHeight
					]}
					/>
				<Text weight="strong">{props.title}</Text>
				<Text>{props.subtitle}</Text>
			</View>
		</Chunk>
	</Link>
);

const IndexPage = () => (
		<View>
			<Helmet>
				<title>rgb.work | Richard Boenigk</title>
			</Helmet>
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
									style={{fontSize: 96, lineHeight: 96, marginTop: -16}}
									>rgb.&#8203;work</Text>
							</Chunk>
						</Section>
						<Section>
							<Chunk>
								<Text inverted type="big">Richard Boenigk</Text>
								<Text inverted type="big" color="secondary">Designer, Hacker</Text>
							</Chunk>
						</Section>
					</FlexItem>
					<FlexItem>
						<Section>
							<Chunk>
								<Text inverted>Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae. Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae.</Text>
							</Chunk>
							<Chunk>
								<Flex direction="row">
									<FlexItem>
										<Text inverted weight="strong" style={{textDecorationLine: 'underline'}}>hello@rgb.work</Text>
									</FlexItem>
									<FlexItem style={{justifyContent: 'center'}}>
										<Inline>
											<Icon shape="Instagram" color={swatches.textPrimaryInverted} size="medium" style={{marginLeft: 3}} />
											<Icon shape="Twitter" color={swatches.textPrimaryInverted} size="medium" style={{marginLeft: 3}} />
											<Icon shape="Linkedin" color={swatches.textPrimaryInverted} size="medium" style={{marginLeft: 3}} />
										</Inline>
									</FlexItem>
								</Flex>
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
							itemsInRow={{
								small: 1,
								medium: 2,
								large: 2
							}}
							renderItem={PortfolioItem}
							scrollItemWidth={300}
							items={PortfolioData}
							/>
					</Section>
				</Bounds>
			</Stripe>
		</View>
)

export default IndexPage
