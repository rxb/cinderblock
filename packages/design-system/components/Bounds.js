import React, {useContext} from 'react';
import { View } from '../primitives';
import ThemeContext from '../ThemeContext';

/**
 * Content width constraint component that provides responsive max-width boundaries.
 * Prevents content from becoming too wide on large screens while maintaining readability.
 * 
 * Bounds typically wraps content within Sections to create centered, readable layouts.
 * The 'sparse' variant creates special background effects for hero sections or callouts.
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.small] - Use small max-width constraint
 * @param {boolean} [props.medium] - Use medium max-width constraint  
 * @param {boolean} [props.large] - Use large max-width constraint
 * @param {boolean} [props.sparse] - Enable sparse layout with background effects
 * @param {Object} [props.sparseBackgroundStyle] - Additional styles for sparse background
 * @param {Object} [props.style] - Additional styles to apply
 * @param {React.ReactNode} props.children - Content to constrain within bounds
 * 
 * @example
 * // Basic content bounds for readability
 * <Stripe>
 *   <Section>
 *     <Bounds>
 *       <Chunk><Text type="pageHead">Article Title</Text></Chunk>
 *       <Chunk><Text>Long form content that needs width constraints...</Text></Chunk>
 *     </Bounds>
 *   </Section>
 * </Stripe>
 * 
 * @example
 * // Different width constraints
 * <Bounds small>  {/* Narrow for forms or focused content */}
 *   <TextInput label="Email" />
 * </Bounds>
 * 
 * <Bounds large>  {/* Wide for data tables or complex layouts */}
 *   <List variant="grid" items={products} />
 * </Bounds>
 * 
 * @example
 * // Sparse variant for hero sections with background effects
 * <Stripe image="/hero.jpg">
 *   <Section>
 *     <Bounds sparse sparseBackgroundStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
 *       <Chunk><Text type="pageHead" color="white">Hero Title</Text></Chunk>
 *       <Chunk><Button color="primary">Get Started</Button></Chunk>
 *     </Bounds>
 *   </Section>
 * </Stripe>
 */
const Bounds = (props) => {
	const { styles, ids, METRICS } = useContext(ThemeContext);
	const {
		style,
		sparseBackgroundStyle,   // Additional styles for sparse background layer
		large,                   // Boolean - use large max-width
		medium,                  // Boolean - use medium max-width
		small,                   // Boolean - use small max-width
		sparse,                  // Boolean - enable sparse layout with backgrounds
		children
	} = props;
	
	// Build style array with size variants
	const finalStyles = [
		styles.bounds,                                    // Base bounds styles with default max-width
		...[large ? styles["bounds--large"] : {}],      // Large max-width variant
		...[medium ? styles["bounds--medium"] : {}],    // Medium max-width variant
		...[small ? styles["bounds--small"] : {}],      // Small max-width variant
		style
	];

	// Sparse variant creates layered background effects
	if(sparse){
		return(
			<>
			{/* Background layer for sparse effects */}
			<View 
				style={[styles["bounds-background--sparse"], sparseBackgroundStyle]}
				dataSet={{ media: ids['bounds-background--sparse']}}
				/>
			{/* Content container with sparse styling */}
			<View 
				style={[finalStyles, styles["bounds--sparse"]]}
				dataSet={{ media: ids['bounds--sparse']}}
				>
				{/* Inner content wrapper */}
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
	// Standard bounds container
	else{
		return(
			<View style={finalStyles}>
				{children}
			</View>
		);
	}

}


export default Bounds;