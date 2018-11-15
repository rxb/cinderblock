import React, {Fragment} from 'react'
import {Helmet} from "react-helmet";
import {Link} from 'gatsby'

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
import { METRICS } from 'cinderblock/designConstants';

import Header from '../components/Header';
import Footer from '../components/Footer';


const Kicker = (props) => (
	<Text type="small" color="secondary">{props.children.toUpperCase()}</Text>
);

const Hr = (props) => (
	<View style={{
			marginVertical: METRICS.space / 2,
			marginHorizontal: METRICS.spaceSection,
			height: 0,
			borderTopWidth: 2,
			borderTopColor: swatches.border,
			borderTopStyle: 'dotted'
		}}
		/>
)


const firstCols = [2,5];
const secondCols = [5,3];

const IndexPage = () => (
		<View>

			<Helmet>
				<title>Project: Translation Party Installation</title>
			</Helmet>

			<Header />

			<Stripe
				image={'https://file.mockplus.com/image/2018/06/6ae1974b-3202-4646-a1f4-a4dcdaca2fec.png'}
				/>

			<Stripe>
				<Bounds>
					<Section>
						{/*
						<Chunk>
							<Image
								style={[
									{
										backgroundColor: 'pink',
										height: 380,
										borderRadius: 5,
									},
									styles.pseudoLineHeight
								]}
								source={{uri: 'https://file.mockplus.com/image/2018/06/6ae1974b-3202-4646-a1f4-a4dcdaca2fec.png'}}
								/>
						</Chunk>
						*/}

						<Chunk>

							<Text
								accessibilityRole="heading"
								accessibilityLevel="1"
								type="pageHead"
								>Translation Party (Art Installation)</Text>
						</Chunk>
					</Section>



					<Flex direction="column"  switchDirection="large">

						<FlexItem growFactor={firstCols[1]}>

							<Section>
								<Chunk>
									<Kicker>Overview</Kicker>
									<Text type="sectionHead">It was the best of times, but like, not</Text>
								</Chunk>
								<Chunk>
									<Text>Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae. Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae.</Text>
								</Chunk>
								<Chunk>
									<Text>Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae. Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae.</Text>
								</Chunk>
							</Section>

							<Hr />

							<Section>

								<Chunk>
									<Kicker>Process</Kicker>
									<Text type="sectionHead">Make hay while the sun shines</Text>
								</Chunk>
								<Chunk>
									<Text>Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae. Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae.</Text>
								</Chunk>
								<Chunk>
									<Text>Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae. Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae.</Text>
								</Chunk>
								<Chunk style={{flex: 1}}>
									<Image
										style={[
											{
												backgroundColor: 'pink',
												height: 200,
												borderRadius: 5,
											},
											styles.pseudoLineHeight
										]}
										source={{uri: 'https://file.mockplus.com/image/2018/06/6ae1974b-3202-4646-a1f4-a4dcdaca2fec.png'}}
										/>
								</Chunk>

							</Section>

							<Hr />

							<Section>

								<Chunk>
									<Kicker>Outcomes</Kicker>
									<Text type="sectionHead">This is an interesting story</Text>
								</Chunk>
								<Chunk>
									<Text>Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae. Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae.</Text>
								</Chunk>
								<Chunk>
									<Text>Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae. Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae.</Text>
								</Chunk>

								<Chunk style={{flex: 1}}>
									<Image
										style={[
											{
												backgroundColor: 'pink',
												height: 200,
												borderRadius: 5,
											},
											styles.pseudoLineHeight
										]}
										source={{uri: 'https://file.mockplus.com/image/2018/06/6ae1974b-3202-4646-a1f4-a4dcdaca2fec.png'}}
										/>
								</Chunk>
							</Section>

							<Hr />

							<Section>
								<Chunk>
									<Kicker>Postscript</Kicker>
									<Text type="sectionHead">There's no business like show business</Text>
								</Chunk>
								<Chunk>
									<Text>Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae. Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae.</Text>
								</Chunk>
								<Chunk>
									<Text>Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae. Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae.</Text>
								</Chunk>
							</Section>

						</FlexItem>
						<FlexItem growFactor={firstCols[0]}>



							<Section>
								<Card>
									<Sectionless>
										<Chunk>
											<Text type="small">Project</Text>
											<Text type="small" color="secondary">Interactive installation art</Text>
										</Chunk>
										<Chunk>
											<Text type="small">Role</Text>
											<Text color="secondary" type="small">Lead: Product, UX, UI</Text>
											<Text color="secondary" type="small">Assisted: Research</Text>
										</Chunk>
										<Chunk>
											<Text type="small">Client</Text>
											<Text type="small" color="secondary">Museum of the Moving Image</Text>
										</Chunk>
									</Sectionless>
								</Card>
							</Section>
						</FlexItem>
					</Flex>

				</Bounds>
			</Stripe>


			<Footer />

		</View>
)

export default IndexPage
