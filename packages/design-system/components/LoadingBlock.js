import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from '../primitives';
import { ActivityIndicator } from 'react-native';
import ThemeContext from '../ThemeContext';

import Icon from './Icon';

/**
 * Loading state wrapper component that provides visual feedback during async operations.
 * Applies opacity changes to indicate loading state while preserving layout and content.
 * 
 * LoadingBlock is designed for progressive disclosure patterns where content remains
 * visible but appears disabled during loading. This maintains visual context while
 * clearly indicating that interaction is temporarily unavailable.
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.isLoading] - Whether the loading state is active
 * @param {Object} [props.style] - Additional styles to apply to the container
 * @param {React.ReactNode} props.children - Content to wrap with loading state
 * 
 * @example
 * // Form submission with loading state
 * <LoadingBlock isLoading={submitting}>
 *   <Chunk><TextInput label="Name" value={name} onChange={setName} /></Chunk>
 *   <Chunk><TextInput label="Email" value={email} onChange={setEmail} /></Chunk>
 *   <Chunk><Button onPress={handleSubmit}>Submit</Button></Chunk>
 * </LoadingBlock>
 * 
 * @example
 * // Data fetching with loading overlay
 * <LoadingBlock isLoading={loading}>
 *   <List items={products} renderItem={renderProduct} />
 * </LoadingBlock>
 * 
 * @example
 * // Button with loading state
 * <LoadingBlock isLoading={saving}>
 *   <Button onPress={handleSave}>
 *     {saving ? 'Saving...' : 'Save Changes'}
 *   </Button>
 * </LoadingBlock>
 * 
 * @example
 * // Card content with loading state
 * function ProductCard({ product, isUpdating }) {
 *   return (
 *     <Card>
 *       <LoadingBlock isLoading={isUpdating}>
 *         <Chunk><Text type="sectionHead">{product.name}</Text></Chunk>
 *         <Chunk><Text>{product.description}</Text></Chunk>
 *         <Chunk><Text>${product.price}</Text></Chunk>
 *       </LoadingBlock>
 *     </Card>
 *   );
 * }
 */
const LoadingBlock = (props) => {
	const { styles, SWATCHES } = useContext(ThemeContext);

		const {
			isLoading,      // Boolean - whether loading state is active
			children,       // Content to wrap
			style,          // Additional container styles
			...other
		} = props;

		return(
			<View 
        style={[
          style, 
          {opacity: (isLoading ? .33 : 1)}  // Reduce opacity when loading
        ]}
        {...other}
      >
				{children}
			</View>
		);

		// Alternative implementation with overlay spinner (currently unused):
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