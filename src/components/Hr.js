import React from 'react';
import {View} from 'react-native';
import { METRICS } from 'cinderblock/designConstants';
import swatches from 'cinderblock//styles/swatches';

// TODO: extract styles

const Hr = (props) => (
	<View style={{
			marginVertical: METRICS.space * .5,
			marginHorizontal: METRICS.spaceSection,
			height: 0,
			borderTopWidth: 2,
			borderTopColor: (props.inverted) ? swatches.borderInverted : swatches.border,
			borderTopStyle: 'dotted'
		}}
		/>
)

export default Hr;