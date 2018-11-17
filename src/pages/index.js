import React, {Fragment} from 'react'
import {Helmet} from "react-helmet";

import {
	Bounds,
	Button,
	Card,
	Chunk,
	Icon,
	Inline,
	Image,
	Flex,
	FlexItem,
	List,
	Section,
	Sectionless,
	Stripe,
	Text,
	View
} from 'cinderblock';
import swatches from 'cinderblock/styles/swatches';
import styles from 'cinderblock/styles/styles';
import { WithMatchMedia } from 'cinderblock/components/WithMatchMedia';

import Footer from '../components/Footer';
import Link from '../components/Link';


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
	<Link href="project_2" style={{textDecorationLine: 'none'}}>
		<Chunk>
			<Card
				style={{
					borderWidth: 0,
					shadowColor: 'rgba(0,0,0,.1)',
					shadowRadius: 10
				}}>
				<Image
					style={{
						backgroundColor: 'pink',
						height: 240,
						borderTopLeftRadius: 5,
						borderTopRightRadius: 5,
					}}
					source={{uri: 'https://file.mockplus.com/image/2018/06/6ae1974b-3202-4646-a1f4-a4dcdaca2fec.png'}}
					/>
				<Sectionless>
					<Chunk>
						<Text weight="strong">{props.title}</Text>
						<Text color="secondary">{props.subtitle}</Text>
					</Chunk>
				</Sectionless>
			</Card>
		</Chunk>
	</Link>
);


const HeroStripe = WithMatchMedia((props) => {
	const {
		media
	} = props;


	const heroFontSize = (media && media.medium) ? 96 : 76;
	const heroMarginTop = (media && media.large) ? -16 : 6; // the "lowercaseness" requires some special treatment

	return(
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
									style={{fontSize: heroFontSize, lineHeight: heroFontSize, marginTop: heroMarginTop}}
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
											<Link href="https://instagram.com/rbgk">
												<Icon shape="Instagram" color={swatches.textPrimaryInverted} size="medium" style={{marginLeft: 6}} />
											</Link>
											<Link href="https://twitter.com/richardboenigk">
												<Icon shape="Twitter" color={swatches.textPrimaryInverted} size="medium" style={{marginLeft: 6}} />
											</Link>
											<Link href="https://github.com/rxb">
												<Icon shape="GitHub" color={swatches.textPrimaryInverted} size="medium" style={{marginLeft: 6}} />
											</Link>
											<Link href="https://linkedin.com/in/rgb-work">
												<Icon shape="Linkedin" color={swatches.textPrimaryInverted} size="medium" style={{marginLeft: 6}} />
											</Link>
										</Inline>
									</FlexItem>
								</Flex>
							</Chunk>
						</Section>
					</FlexItem>
				</Flex>
				</Bounds>
			</Stripe>
	);
});

class IndexPage extends React.Component {

	render(){
		return (
			<View>
				<Helmet>
					<title>rgb.work | Richard Boenigk</title>
				</Helmet>

				<HeroStripe />

				<Stripe style={{ flex: 1}}>
					<Bounds>
						<Section>
							<Chunk>
								<Text type="sectionHead">Featured projects</Text>
							</Chunk>

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

				<Footer />
			</View>
		)
	}
}

export default IndexPage
