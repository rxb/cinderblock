import React, {useContext} from 'react';
import { View, Image } from '../primitives';
import ThemeContext from '../ThemeContext';
import {getActiveStyles} from '../utils';

const VALID_TYPES = {
	transparent: "Transparent"
}

const VALID_POSITIONS = {
	static: "static",			// moves with scroll, takes up space
	absolute: "absolute", 	// moves with scroll, doesn't take up space (almost always transparent)
	sticky: "sticky", 		// does not move with scroll, but initially takes up space
	fixed: "fixed"				// does not move with scroll, doesn't take up space
}

const Header = (props) => {
	const { styles, ids } = useContext(ThemeContext);

	const {
		children,
		style,
		maxWidth = 1100,
		position = 'sticky',
		type = 'separated'
	} = props

	const styleKeys = [
		'header',
		...[type ? `header${VALID_TYPES[type]}` : undefined ]
	];
	const {activeStyles, activeIds} = getActiveStyles(styleKeys, styles, ids);

	return(
		<View 
			style={[ activeStyles, style, {position: VALID_POSITIONS[position]} ]}
			dataSet={{ media: activeIds}}
			>
			<View style={{maxWidth: maxWidth, alignSelf: 'center', width: '100%'}}>
				<View 
					style={[styles['header-section']]}
					dataSet={{ media: ids['header-section']}}
					>
					{children}
				</View>
			</View>
		</View>
	);


}

export default Header;