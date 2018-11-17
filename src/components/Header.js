import React, {Fragment} from 'react'
import Link from './Link'

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

const Header = (props) => {
	return(
		<Stripe style={{backgroundColor: '#FF2C00'}}>
			<Bounds style={{justifyContent: 'center', flex: 1}}>
				<Section style={{paddingTop: 0, paddingBottom: 0}}>
					<Chunk style={{paddingBottom: 0}}>
						<Link href="/"><Text inverted type="big" style={{fontWeight: 800}}>rgb.work</Text></Link>
					</Chunk>
				</Section>
			</Bounds>
		</Stripe>
	);
}

export default Header;