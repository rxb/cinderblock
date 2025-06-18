import React, {useContext} from 'react';
import { View, Text, StyleSheet } from '../primitives';
import ThemeContext from '../ThemeContext';

/**
 * Compact tag/label component for displaying categories, metadata, and status information.
 * Provides consistent styling for small pieces of supplementary information.
 * 
 * Chip is designed for displaying short text labels in a visually distinct container.
 * Common use cases include tags, categories, status indicators, and metadata that
 * supplements main content without overwhelming it.
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Text content to display in the chip
 * @param {Object} [props.style] - Additional styles to apply (inherited through props)
 * 
 * @example
 * // Basic category tags
 * <Inline>
 *   <Chip label="React" />
 *   <Chip label="JavaScript" />
 *   <Chip label="Design Systems" />
 * </Inline>
 * 
 * @example
 * // Article metadata with chips
 * <Section>
 *   <Chunk><Text type="sectionHead">Getting Started with React</Text></Chunk>
 *   <Chunk>
 *     <Inline>
 *       <Text color="secondary">Tags:</Text>
 *       <Chip label="Tutorial" />
 *       <Chip label="Beginner" />
 *       <Chip label="Frontend" />
 *     </Inline>
 *   </Chunk>
 *   <Chunk><Text>Article content...</Text></Chunk>
 * </Section>
 * 
 * @example
 * // Product features or specifications
 * <Card>
 *   <Chunk><Text type="sectionHead">Premium Plan</Text></Chunk>
 *   <Chunk>
 *     <Inline>
 *       <Chip label="Unlimited Users" />
 *       <Chip label="24/7 Support" />
 *       <Chip label="Advanced Analytics" />
 *     </Inline>
 *   </Chunk>
 * </Card>
 * 
 * @example
 * // Status indicators in lists
 * <List 
 *   items={projects}
 *   renderItem={(project) => (
 *     <Card>
 *       <Flex justify="space-between" align="center">
 *         <FlexItem>
 *           <Text weight="strong">{project.name}</Text>
 *         </FlexItem>
 *         <FlexItem shrink>
 *           <Chip label={project.status} />
 *         </FlexItem>
 *       </Flex>
 *     </Card>
 *   )}
 * />
 */
const Chip = (props) => {
	const { styles } = useContext(ThemeContext);

	const { label, ...other } = props;

	return(
		<View style={styles.chip} {...other}>
			<Text style={[styles.text, styles.textSmall, styles.chipText]}>
				{label}
			</Text>
		</View>
	);
}


export default Chip;