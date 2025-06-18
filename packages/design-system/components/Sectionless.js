import React, {useContext} from 'react';
import { View } from '../primitives';
import ThemeContext from '../ThemeContext';

/**
 * Container component that provides section-like spacing without borders.
 * Alternative to Section for content that needs consistent spacing without visual separation.
 * 
 * Sectionless provides the same structural benefits as Section (consistent spacing,
 * layout management) but without the visual borders or background styling.
 * This is useful for content areas that need spacing consistency but should
 * appear as part of the parent container.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to wrap in sectionless container
 * @param {boolean} [props.isFirstChild] - Whether this is the first child element
 * @param {boolean} [props.noBorder] - Legacy prop for border control (unused)
 * @param {Object} [props.style] - Additional styles to apply
 * 
 * @example
 * // Card content without internal borders
 * function ProductCard({ product }) {
 *   return (
 *     <Card>
 *       <Sectionless>
 *         <Chunk><Text type="title">{product.name}</Text></Chunk>
 *         <Chunk><Text color="hint">${product.price}</Text></Chunk>
 *         <Chunk><Text>{product.description}</Text></Chunk>
 *         
 *         <Chunk>
 *           <Button onPress={() => addToCart(product)}>Add to Cart</Button>
 *         </Chunk>
 *       </Sectionless>
 *     </Card>
 *   );
 * }
 * 
 * @example
 * // Modal content with consistent spacing
 * function SettingsModal() {
 *   return (
 *     <Modal>
 *       <Sectionless>
 *         <Chunk><Text type="title">Settings</Text></Chunk>
 *         
 *         <Chunk>
 *           <Label>Notifications</Label>
 *           <CheckBox
 *             value={notifications}
 *             onChange={setNotifications}
 *             label="Enable push notifications"
 *           />
 *         </Chunk>
 *         
 *         <Chunk>
 *           <Label>Theme</Label>
 *           <Picker
 *             selectedValue={theme}
 *             onValueChange={setTheme}
 *           >
 *             <Picker.Item label="Light" value="light" />
 *             <Picker.Item label="Dark" value="dark" />
 *             <Picker.Item label="Auto" value="auto" />
 *           </Picker>
 *         </Chunk>
 *         
 *         <Chunk>
 *           <Flex direction="row">
 *             <FlexItem grow>
 *               <Button type="secondary" onPress={closeModal}>
 *                 Cancel
 *               </Button>
 *             </FlexItem>
 *             <FlexItem grow>
 *               <Button onPress={saveSettings}>
 *                 Save
 *               </Button>
 *             </FlexItem>
 *           </Flex>
 *         </Chunk>
 *       </Sectionless>
 *     </Modal>
 *   );
 * }
 * 
 * @example
 * // List item content without borders
 * function CommentItem({ comment }) {
 *   return (
 *     <View style={styles.commentItem}>
 *       <Sectionless>
 *         <Chunk>
 *           <Flex direction="row" align="center">
 *             <FlexItem shrink>
 *               <Avatar size="small" image={comment.author.avatar} />
 *             </FlexItem>
 *             <FlexItem grow>
 *               <Text weight="bold">{comment.author.name}</Text>
 *               <Text color="hint" size="small">{comment.createdAt}</Text>
 *             </FlexItem>
 *           </Flex>
 *         </Chunk>
 *         
 *         <Chunk>
 *           <Text>{comment.content}</Text>
 *         </Chunk>
 *         
 *         <Chunk>
 *           <Inline>
 *             <Touch onPress={() => likeComment(comment.id)}>
 *               <Text color="hint" size="small">
 *                 ♥ {comment.likes} likes
 *               </Text>
 *             </Touch>
 *             <Touch onPress={() => replyToComment(comment.id)}>
 *               <Text color="hint" size="small">Reply</Text>
 *             </Touch>
 *           </Inline>
 *         </Chunk>
 *       </Sectionless>
 *     </View>
 *   );
 * }
 * 
 * @example
 * // Form sections without visual separation
 * function ProfileForm() {
 *   return (
 *     <View>
 *       <Sectionless>
 *         <Chunk><Text type="sectionHead">Personal Information</Text></Chunk>
 *         <Chunk><TextInput placeholder="First Name" /></Chunk>
 *         <Chunk><TextInput placeholder="Last Name" /></Chunk>
 *         <Chunk><TextInput placeholder="Email" /></Chunk>
 *       </Sectionless>
 *       
 *       <Sectionless>
 *         <Chunk><Text type="sectionHead">Preferences</Text></Chunk>
 *         <Chunk>
 *           <CheckBox label="Marketing emails" />
 *         </Chunk>
 *         <Chunk>
 *           <CheckBox label="Product updates" />
 *         </Chunk>
 *       </Sectionless>
 *     </View>
 *   );
 * }
 */


const Sectionless = (props) => {
	const { styles } = useContext(ThemeContext);

	const {
		children,
		isFirstChild,
		noBorder,
		style,
		...other
	} = props

	return(
		<View 
			style={[
				styles.sectionless,
				style
			]} 
			{...other}
			>
			{children}
		</View>
	);
}


export default Sectionless;