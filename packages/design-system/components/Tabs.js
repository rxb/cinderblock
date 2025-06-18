import React, {useContext} from 'react';
import { Touchable, View, } from '../primitives';
import Text  from './Text';
import Touch  from './Touch';
import ThemeContext from '../ThemeContext';

/**
 * Individual tab item component that handles selection state and interaction.
 * Used internally by the Tabs component but can be accessed via Tabs.Item.
 * 
 * @param {Object} props - Component props
 * @param {string} props.value - Unique identifier for this tab
 * @param {string} props.label - Display text for the tab
 * @param {boolean} [props.selected] - Whether this tab is currently selected
 * @param {boolean} [props.fullWidth] - Use full width layout instead of content-based width
 * @param {Function} [props.onChange] - Callback when tab is pressed
 */
const TabItem = (props) => {
	const { styles } = useContext(ThemeContext);
  const {
  	value,                   // Unique tab identifier
  	label,                   // Tab display text
  	selected,                // Selection state
  	fullWidth,               // Width behavior
  	onChange = () => {}      // Selection callback
  } = props;

  // Dynamic styling based on selection state
  const selectedStyle = (selected) ? {
    item: styles['tabItem--selected'],     // Selected tab background/border
    text: styles['tabText--selected']      // Selected tab text color
  } : {};
  
  // Width behavior based on fullWidth prop
  const widthStyle = (fullWidth) ? 
    styles['tabItem--fullWidth'] :         // Equal width distribution
    styles['tabItem--variableWidth'];      // Content-based width
    
  // Text weight for selected state
  const weightStyle = (selected) ? styles['textStrong'] : '';

  return (
  	<View style={[widthStyle, styles.tabItem, selectedStyle.item]}>
		<Touch
			onPress={() => onChange(value) }
			>
			<Text color="secondary" type="small" style={[selectedStyle.text, weightStyle]}>
        {label}
      </Text>
		</Touch>
	</View>
  )
}



/**
 * Tab navigation component that provides horizontal navigation between content sections.
 * Manages selection state and provides consistent styling for tab interfaces.
 * 
 * Tabs automatically manages the selected state and passes it down to child TabItem components.
 * It provides options for full-width layouts or content-based sizing.
 * 
 * @example
 * // Basic tabs with controlled selection
 * const [activeTab, setActiveTab] = useState('profile');
 * 
 * <Tabs selectedValue={activeTab} onChange={setActiveTab}>
 *   <Tabs.Item value="profile" label="Profile" />
 *   <Tabs.Item value="settings" label="Settings" />
 *   <Tabs.Item value="billing" label="Billing" />
 * </Tabs>
 * 
 * @example
 * // Full-width tabs that distribute evenly
 * <Tabs selectedValue={activeTab} onChange={setActiveTab} fullWidth>
 *   <Tabs.Item value="overview" label="Overview" />
 *   <Tabs.Item value="details" label="Details" />
 *   <Tabs.Item value="reviews" label="Reviews" />
 * </Tabs>
 * 
 * @example
 * // Complete tab interface with content switching
 * function TabInterface() {
 *   const [activeTab, setActiveTab] = useState('home');
 *   
 *   return (
 *     <>
 *       <Tabs selectedValue={activeTab} onChange={setActiveTab}>
 *         <Tabs.Item value="home" label="Home" />
 *         <Tabs.Item value="products" label="Products" />
 *         <Tabs.Item value="contact" label="Contact" />
 *       </Tabs>
 *       
 *       <Section>
 *         {activeTab === 'home' && <HomeContent />}
 *         {activeTab === 'products' && <ProductsContent />}
 *         {activeTab === 'contact' && <ContactContent />}
 *       </Section>
 *     </>
 *   );
 * }
 */
class Tabs extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			children,            // Tabs.Item components
			onChange,            // Selection change callback
			fullWidth,           // Full width layout option
			...other
		} = this.props;

		// Default to first tab if no selection provided
		const selectedValue = this.props.selectedValue || (children[0] && children[0].props.value);

		// Clone children and pass down selection state and handlers
		const childrenWithProps = React.Children.map(children, function (child) {
	        return React.cloneElement(child, {
	            selected: (selectedValue == child.props.value),  // Pass selection state
	            onChange,                                        // Pass change handler
	            fullWidth,                                       // Pass width behavior
	        });
	    });

		return(
			<ThemeContext.Consumer>
				{ ({styles}) => (
					<View
						style={[styles.tabs]}   // Base tabs container styling
						{...other}
						>
						{childrenWithProps}
					</View>
				)}
			</ThemeContext.Consumer>
		);
	}
}

// Expose TabItem as Tabs.Item for component composition
Tabs.Item = TabItem

export default Tabs;