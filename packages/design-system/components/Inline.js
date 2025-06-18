import React, {useContext} from 'react';
import { View } from '../primitives';
import ThemeContext from '../ThemeContext';

/**
 * Horizontal layout component that simulates CSS `display: inline` behavior using flexbox.
 * Provides text-like spacing between elements with automatic wrapping.
 * 
 * Inline is designed for laying out elements horizontally with natural text-like spacing,
 * such as tags, buttons, links, or other UI elements that should flow like words in a sentence.
 * This is particularly useful in a React Native environment where traditional inline display
 * is not available.
 * 
 * Note: Spacing is optimized for body text sizes and may not look perfect with other text scales.
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.nowrap] - Prevent wrapping to new lines (white-space: nowrap equivalent)
 * @param {Object} [props.style] - Additional styles to apply to the container
 * @param {React.ReactNode} props.children - Elements to layout inline
 * 
 * @example
 * // Tags or labels with natural spacing
 * <Inline>
 *   <Chip>React</Chip>
 *   <Chip>JavaScript</Chip>
 *   <Chip>Design Systems</Chip>
 * </Inline>
 * 
 * @example
 * // Action buttons that flow naturally
 * <Inline>
 *   <Button variant="secondary">Cancel</Button>
 *   <Button color="primary">Save</Button>
 *   <Button variant="secondary">Save & Continue</Button>
 * </Inline>
 * 
 * @example
 * // Navigation links with text-like spacing
 * <Inline>
 *   <Link href="/">Home</Link>
 *   <Text>•</Text>
 *   <Link href="/products">Products</Link>
 *   <Text>•</Text>
 *   <Link href="/about">About</Link>
 * </Inline>
 * 
 * @example
 * // Prevent wrapping for single-line layouts
 * <Inline nowrap>
 *   <Icon shape="user" size="small" />
 *   <Text>John Doe</Text>
 *   <Icon shape="chevron-down" size="small" />
 * </Inline>
 */
const Inline = (props) => {
	const { styles } = useContext(ThemeContext);
	const {
		children,
		style,
		nowrap       // Boolean - prevent wrapping to new lines
	} = props;

	// Wrap each child in an inline item container for proper spacing
	const wrappedChildren = React.Children.map(children,
		(child, i) => {
			// Handle conditional rendering - "if" statements can return null components
			if(React.isValidElement(child)){
				return (
					<View style={[
						styles.inlineItem,                                    // Base inline item spacing
						(i==0 ? styles['inlineItem--firstChild'] : {})      // Remove left margin from first item
						]}>
						{child}
					</View>
				);
			}
		}
	);

	return(
		<View style={[
			styles.inline,                                          // Base inline container (flexbox with wrap)
			(nowrap ? styles['inline--noWrap'] : {}),             // Prevent wrapping variant
			style
			]}>
			{wrappedChildren}
		</View>
	);
}

export default Inline;