import React, {useContext} from 'react';
import { View } from '../primitives';
import ThemeContext from '../ThemeContext';

const Bounds = (props) => {
	const { styles, ids, METRICS } = useContext(ThemeContext);
	const {
		style,
		sparseBackgroundStyle,
		large,
		medium,
		small,
		sparse,
		children
	} = props;
	const finalStyles = [
		styles.bounds,
		...[large ? styles["bounds--large"] : {}],  
		...[medium ? styles["bounds--medium"] : {}],
		...[small ? styles["bounds--small"] : {}],
		style
	];

	if(sparse){
		return(
			<>
			<View 
				style={[styles["bounds-background--sparse"], sparseBackgroundStyle]}
				dataSet={{ media: ids['bounds-background--sparse']}}
				/>
			<View 
				style={[finalStyles, styles["bounds--sparse"]]}
				dataSet={{ media: ids['bounds--sparse']}}
				>
				<View 
					style={styles["bounds-content--sparse"]}
					dataSet={{ media: ids['bounds-content--sparse']}}
					>
					{children}
				</View>
			</View>
			</>
		);
	}
	else{
		return(
			<View style={finalStyles}>
				{children}
			</View>
		);
	}

}


export default Bounds;