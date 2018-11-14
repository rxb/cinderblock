import React, {Fragment} from 'react'
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

const Footer = (props) => {
	return(
		<Stripe style={{backgroundColor: swatches.backgroundDark}}>
			<Bounds>
				<Section>
					<Chunk>
						<Text inverted>Footer stuff</Text>
					</Chunk>
				</Section>
			</Bounds>
		</Stripe>
	);
}

export default Footer;