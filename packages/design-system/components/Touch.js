import React, {useContext} from 'react';
import { Touchable, View } from '../primitives';
import Text from './Text';
import ThemeContext from '../ThemeContext';

/**
 * Visual feedback states for touch interactions.
 * Provides consistent opacity changes during press states.
 */
const stateStyles = {
	active: {opacity: .5},   // Pressed or loading state
	default: {opacity: 1}    // Normal state
};

/**
 * Base touchable component that provides consistent touch feedback and interaction patterns.
 * The foundation for all interactive elements in the design system.
 * 
 * Touch serves as the base component for buttons, links, and other interactive elements.
 * It provides visual feedback during interactions and handles press states consistently
 * across the design system. Other components like Button and Link build upon Touch.
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.noFeedback] - Disable visual feedback during press
 * @param {boolean} [props.isLoading] - Show loading state (applies active styling)
 * @param {Function} [props.onPress] - Press event handler
 * @param {Object} [props.style] - Additional styles to apply
 * @param {React.ReactNode} props.children - Content to make touchable
 * 
 * @example
 * // Basic touchable element
 * <Touch onPress={() => console.log('pressed')}>
 *   <Text>Tap me</Text>
 * </Touch>
 * 
 * @example
 * // Custom interactive card
 * <Touch onPress={() => navigate('/details')}>
 *   <Card>
 *     <Chunk><Text type="sectionHead">Product Name</Text></Chunk>
 *     <Chunk><Text>Product description...</Text></Chunk>
 *   </Card>
 * </Touch>
 * 
 * @example
 * // Touch without visual feedback
 * <Touch noFeedback onPress={handlePress}>
 *   <Icon shape="settings" />
 * </Touch>
 * 
 * @example
 * // Loading state
 * <Touch isLoading onPress={handleSubmit}>
 *   <Text>{isLoading ? 'Saving...' : 'Save'}</Text>
 * </Touch>
 */
class Touch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPressed: false  // Track press state for visual feedback
		}
	}

	render() {
		const {
			children,      // Content to make touchable
			style,         // Additional styles
			noFeedback,    // Disable visual feedback
			isLoading,     // Loading state
			...other       // Additional props (onPress, accessibilityRole, etc.)
		} = this.props;

		const {
			isPressed
		} = this.state

		// Apply active styling when pressed or loading
		const stateStyle = (isPressed || isLoading) ? stateStyles.active : stateStyles.default;

		return(
			<ThemeContext.Consumer>
			{ ({styles}) => (
				<Touchable
					{...other}
					onPressIn={()=>{
						// Apply pressed state for visual feedback
						if(!noFeedback){
							this.setState({isPressed: true});
						}
					}}
					onPressOut={()=>{
						// Remove pressed state when touch ends
						if(!noFeedback){
							this.setState({isPressed: false});
						}
					}}
					>
					<View
						style={ [ styles.touch, stateStyle, style ]}
						{...other}
						>
						<React.Fragment>
							{children}
						</React.Fragment>
					</View>
				</Touchable>
				)}
			</ThemeContext.Consumer>
		);
	}
}


export default Touch;