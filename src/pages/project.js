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



const IndexPage = () => (
		<View>

			<Helmet>
				<title>Project: Translation Party Installation</title>
			</Helmet>

			<Stripe style={{backgroundColor: '#FF2C00'}}>
				<Bounds style={{justifyContent: 'center', flex: 1}}>
					<Section>
						<Chunk>
							<Link to="/"><Text inverted>rgb.work</Text></Link>
						</Chunk>
					</Section>
				</Bounds>
			</Stripe>
			<Stripe style={{minHeight: '100vh'}}>
				<Bounds>
					<Section>
						<Chunk>
							<Image
								style={[
									{
										backgroundColor: 'pink',
										height: 320,
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

					<Section>
						<Flex direction="column" switchDirection="large">
							<FlexItem growFactor={1}>
								<Chunk>
									<Text >Some metadata</Text>
									<Text color="secondary">Role, responsibility, project type</Text>
								</Chunk>
							</FlexItem>
							<FlexItem growFactor={3}>
								<Chunk>
									<Text >Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae. Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae.</Text>
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
							</FlexItem>
						</Flex>
					</Section>
				</Bounds>
			</Stripe>



			<Stripe style={{backgroundColor: '#FF2C00'}}>
				<Bounds>
					<Section>
						<Chunk>
							<Text inverted>Footer stuff</Text>
						</Chunk>
					</Section>
				</Bounds>
			</Stripe>
		</View>
)

export default IndexPage
