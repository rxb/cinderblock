import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from '../primitives';
import { ActivityIndicator } from 'react-native';
import ThemeContext from '../ThemeContext';

import Icon from './Icon';

const LoadingBlock = (props) => {
	const { styles, SWATCHES } = useContext(ThemeContext);

		const {
			isLoading,
			children,
			style,
			...other
		} = props;

		return(
			<View style={[style, {opacity: (isLoading ? .33 : 1)}]}>
				{children}
			</View>
		);

		/*
		return(
			<View>
				<View style={[style, {opacity: (isLoading ? .25 : 1)}]}>
					{children}
				</View>
				{ isLoading &&
					<View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', top: 0, left: 0, right: 0, bottom: 0}}>
						<ActivityIndicator
							style={{marginTop: -16}}
							size='large'
							color={SWATCHES.tint}
							/>
					</View>
				}
			</View>

		);
		*/
}

export default LoadingBlock;