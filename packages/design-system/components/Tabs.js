import React, {useContext} from 'react';
import { Touchable, View, } from '../primitives';
import Text  from './Text';
import Touch  from './Touch';
import ThemeContext from '../ThemeContext';

const TabItem = (props) => {
	const { styles } = useContext(ThemeContext);
  const {
  	value,
  	label,
  	selected,
  	fullWidth,
  	onChange = () => {}
  } = props;

  const selectedStyle = (selected) ? {item: styles['tabItem--selected'], text: styles['tabText--selected']} : {};
  const widthStyle = (fullWidth) ? styles['tabItem--fullWidth'] : styles['tabItem--variableWidth'];
  const weightStyle = (selected) ? styles['textStrong'] : '';

  return (
  	<View style={[widthStyle, styles.tabItem, selectedStyle.item]}>
		<Touch
			onPress={() => onChange(value) }
			>
			<Text color="secondary" type="small" style={[selectedStyle.text, weightStyle]}>{label}</Text>
		</Touch>
	</View>
  )
}



class Tabs extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			children,
			onChange,
			fullWidth,
			...other
		} = this.props;

		// default to first tab
		const selectedValue = this.props.selectedValue || children[0].props.value;

		// pass selectedness to child
		const childrenWithProps = React.Children.map(children, function (child) {
	        return React.cloneElement(child, {
	            selected: (selectedValue == child.props.value),
	            onChange,
	            fullWidth,
	        });
	    });

		return(
			<ThemeContext.Consumer>
				{ ({styles}) => (
					<View
						style={[styles.tabs]}
						{...other}
						>
						{childrenWithProps}
					</View>
				)}
			</ThemeContext.Consumer>
		);
	}
}

Tabs.Item = TabItem

export default Tabs;