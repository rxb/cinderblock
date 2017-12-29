import React from 'react';
import { View } from './Primitives';
import styles from '../styles/styles';


class Inline extends React.Component {
	render() {
		const {
			children,
		} = this.props;


		return(
			<View style={styles.inline}>
				{children}
			</View>
		);
	}
}

export default Inline;