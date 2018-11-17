import React, {Fragment} from 'react'
import {Text as RNText} from 'react-native';
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
	Touch,
	View
} from 'cinderblock';
import swatches from 'cinderblock/styles/swatches';
import styles from 'cinderblock/styles/styles';
import { METRICS } from 'cinderblock/designConstants';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from '../components/Link';
import Lightbox from '../components/Lightbox';
import Hr from '../components/Hr';


const Kicker = (props) => (
	<Text type="small" color="secondary" style={{fontSize: METRICS.smallSize * .9}}>{props.children.toUpperCase()}</Text>
);



const ExpandIcon = () => (
	<View style={{backgroundColor: 'white', position: 'absolute', bottom: 8, right: 8, width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowRadius: 12, shadowColor: 'rgba(0,0,0,.05)'}}>
		<Icon
			shape="Maximize2"
			color={swatches.textPrimary}
			/>
	</View>
)


const firstCols = [2,5];
const secondCols = [5,3];


class ProjectPage extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			lightboxVisible: false
		}
	}

	render(){
		return (
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
									>Translation Party</Text>
							</Chunk>
						</Section>



						<Flex direction="column"  switchDirection="large" rowReverse="large">

							<FlexItem growFactor={firstCols[0]}>

									<Section>
										<Chunk>
											<Text type="small" weight="strong">Project type</Text>
											<Text type="small" color="secondary">Interactive installation art</Text>
										</Chunk>
										<Chunk>
											<Text type="small"  weight="strong">Role</Text>
											<Text color="secondary" type="small">Lead: Product, UX, UI</Text>
											<Text color="secondary" type="small">Assisted: Research</Text>
										</Chunk>
										<Chunk>
											<Text type="small"  weight="strong">Client</Text>
											<Text type="small" color="secondary">Museum of the Moving Image</Text>
										</Chunk>
									</Section>

							</FlexItem>

							<FlexItem growFactor={firstCols[1]}>

								<Section>
									<Chunk>
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
										<Touch
											onPress={()=>{
												this.setState({lightboxVisible: true});
											}}
											style={styles.pseudoLineHeight}
											>
											<Image
												style={[
													{
														backgroundColor: 'pink',
														height: 200,
														borderRadius: 5,
													},

												]}
												source={{uri: 'https://file.mockplus.com/image/2018/06/6ae1974b-3202-4646-a1f4-a4dcdaca2fec.png'}}
												/>
												<ExpandIcon />
										</Touch>
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
										<Touch
											onPress={()=>{
												this.setState({lightboxVisible: true});
											}}
											style={styles.pseudoLineHeight}
											>
											<Image
												style={[
													{
														backgroundColor: 'pink',
														height: 200,
														borderRadius: 5,
													},
												]}
												source={{uri: 'https://file.mockplus.com/image/2018/06/6ae1974b-3202-4646-a1f4-a4dcdaca2fec.png'}}
												/>
											<ExpandIcon />
										</Touch>
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

						</Flex>

					</Bounds>
				</Stripe>


				<Footer />

					<Lightbox
						visible={this.state.lightboxVisible}
						onRequestClose={()=>{
							this.setState({lightboxVisible: false});
						}}
						items={[
				    		{
				    			image: "https://file.mockplus.com/image/2018/06/6ae1974b-3202-4646-a1f4-a4dcdaca2fec.png",
				    			title: "Look at this stuff",
				    			description: "Isn't it neat?"
				    		},
				    		{
				    			image: "https://www.tvovermind.com/wp-content/uploads/2016/12/episode-12-bojack-roof-640x428.png",
				    			title: "Hollywoo Celebrities and Stars",
				    			description: "Do they know things?"
				    		},
				    		{
				    			image: "http://49.media.tumblr.com/d249d248c5952623a2c210d3f31593ef/tumblr_mk7i8vYdn91qbabvao1_500.gif",
				    			title: "Is this a crossover episode?",
				    			description: "I'm out of quotes"
				    		}
						]}
						/>

			</View>
		)
	}
}

export default ProjectPage
