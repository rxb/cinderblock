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
import { METRICS } from 'cinderblock/designConstants';

import Header from '../components/Header';
import Footer from '../components/Footer';


const Kicker = (props) => (
	<Text type="micro" color="secondary" weight="strong">{props.children.toUpperCase()}</Text>
);

const Hr = (props) => (
	<View style={{
			marginVertical: METRICS.space / 2,
			marginHorizontal: METRICS.spaceSection,
			height: 0,
			borderTopWidth: 1,
			borderTopColor: swatches.border
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

			<Stripe style={{minHeight: '100vh'}}>
				<Bounds>
					<Section>
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
					</Section>

					<Section>
						<Chunk>

							<Text
								accessibilityRole="heading"
								accessibilityLevel="1"
								type="pageHead"
								>Translation Party Installation</Text>
						</Chunk>
					</Section>

					<Flex direction="column"  switchDirection="large">

						<FlexItem growFactor={firstCols[1]}>


							<Section>
								<Chunk>
									<Kicker>Intro</Kicker>
									<Text type="sectionHead">It was the best of times, it was the worst of times</Text>
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
								<Chunk>
									<Text>Web app feature</Text>
								</Chunk>
								<Chunk>
									<Text color="secondary">Lead: Product, UX, UI</Text>
									<Text color="secondary">Assisted: Research</Text>
								</Chunk>
							</Section>
						</FlexItem>
					</Flex>

				</Bounds>
			</Stripe>


			<Footer />

		</View>
)

export default IndexPage
