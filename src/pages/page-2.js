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
import styles from '../kit/styles/styles';

const SecondPage = () => (
	<View>
	<Stripe>
	  	<Bounds>
	  		<Section>
	  		</Section>
	  	</Bounds>
	  </Stripe>
	  <Stripe
	  	image="./static/images/duotone.jpg"
	  	style={{height: 320}}
	  	>
	  	<Bounds>
	  	</Bounds>
	  </Stripe>
	  <Stripe>
	  	<Bounds>
	  		<Section>
				<Chunk>
					<Text style={styles.textSmall}>INSTALLATION ART</Text>
			    	<h2>Translation Party</h2>
			    </Chunk>
				<Chunk>
					<Text style={styles.text}>Lorem ipsum vitae at risus lacus ad lorem, Curabitur facilisis. Nunc eu vulputate vel ornare. Mi quis, condimentum luctus id Sed vitae.</Text>
				</Chunk>
		    </Section>
	    </Bounds>
	  </Stripe>
	</View>
)

export default SecondPage
