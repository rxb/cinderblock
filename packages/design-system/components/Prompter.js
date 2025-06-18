import React, { useContext } from 'react';
import { Animated, Easing, Touchable, View } from '../primitives';
import { ScrollView } from 'react-native-web';
import ThemeContext from '../ThemeContext';

import Card from './Card';
import Chunk from './Chunk';
import Stripe from './Stripe';
import Touch from './Touch';
import Icon from './Icon';
import Section from './Section';
import { EASE } from '../styles/designConstants';

/**
 * Modal prompt system for user confirmation and form dialogs.
 * Displays modal overlays with keyboard navigation and backdrop dismissal.
 * 
 * The Prompter system manages a queue of modal prompts, each with customizable
 * content, dismissal behavior, and keyboard handling. Prompts slide up from
 * the bottom with smooth animations and support Enter/Escape key interactions.
 * 
 * Features:
 * - Keyboard navigation (Enter to confirm, Escape to dismiss)
 * - Backdrop click dismissal (when dismissable)
 * - Smooth slide-up animations with transform effects
 * - Queue-based management (first prompt in queue is displayed)
 * - iOS compatibility considerations for fixed positioning
 * 
 * Note: There are known input focus issues in iOS versions < 11.3 where
 * fixed positioning behaves unexpectedly with the software keyboard.
 * 
 * @example
 * // Basic confirmation prompt
 * function DeleteConfirmation() {
 *   const [prompts, setPrompts] = useState([]);
 * 
 *   const showDeletePrompt = (itemName) => {
 *     const id = Date.now();
 *     const content = (
 *       <Section>
 *         <Chunk><Text type="title">Delete {itemName}?</Text></Chunk>
 *         <Chunk><Text>This action cannot be undone.</Text></Chunk>
 *         
 *         <Chunk>
 *           <Flex direction="row">
 *             <FlexItem grow>
 *               <Button 
 *                 type="secondary" 
 *                 onPress={() => hidePrompt(id)}
 *               >
 *                 Cancel
 *               </Button>
 *             </FlexItem>
 *             <FlexItem grow>
 *               <Button 
 *                 onPress={() => {
 *                   handleDelete(itemName);
 *                   hidePrompt(id);
 *                 }}
 *               >
 *                 Delete
 *               </Button>
 *             </FlexItem>
 *           </Flex>
 *         </Chunk>
 *       </Section>
 *     );
 * 
 *     setPrompts(prev => [...prev, { id, content, showable: true }]);
 *   };
 * 
 *   const hidePrompt = (id) => {
 *     setPrompts(prev => prev.map(p => p.id === id ? { ...p, showable: false } : p));
 *   };
 * 
 *   const removePrompt = (id) => {
 *     setPrompts(prev => prev.filter(p => p.id !== id));
 *   };
 * 
 *   return (
 *     <View>
 *       <Button onPress={() => showDeletePrompt('Important Document')}>
 *         Delete Item
 *       </Button>
 *       
 *       <Prompter
 *         prompts={prompts}
 *         hidePrompt={hidePrompt}
 *         removePrompt={removePrompt}
 *       />
 *     </View>
 *   );
 * }
 * 
 * @example
 * // Form input prompt
 * function AddTagPrompt() {
 *   const [prompts, setPrompts] = useState([]);
 *   const [tagName, setTagName] = useState('');
 * 
 *   const showAddTagPrompt = () => {
 *     const id = Date.now();
 *     const content = (
 *       <Section>
 *         <Chunk><Text type="title">Add New Tag</Text></Chunk>
 *         
 *         <Chunk>
 *           <TextInput
 *             value={tagName}
 *             onChange={setTagName}
 *             placeholder="Tag name"
 *             autoFocus
 *           />
 *         </Chunk>
 *         
 *         <Chunk>
 *           <Flex direction="row">
 *             <FlexItem grow>
 *               <Button 
 *                 type="secondary" 
 *                 onPress={() => {
 *                   setTagName('');
 *                   hidePrompt(id);
 *                 }}
 *               >
 *                 Cancel
 *               </Button>
 *             </FlexItem>
 *             <FlexItem grow>
 *               <Button 
 *                 onPress={() => {
 *                   if (tagName.trim()) {
 *                     handleAddTag(tagName.trim());
 *                     setTagName('');
 *                     hidePrompt(id);
 *                   }
 *                 }}
 *                 disabled={!tagName.trim()}
 *               >
 *                 Add Tag
 *               </Button>
 *             </FlexItem>
 *           </Flex>
 *         </Chunk>
 *       </Section>
 *     );
 * 
 *     setPrompts(prev => [...prev, { 
 *       id, 
 *       content, 
 *       showable: true,
 *       onPressEnter: () => {
 *         if (tagName.trim()) {
 *           handleAddTag(tagName.trim());
 *           setTagName('');
 *           hidePrompt(id);
 *         }
 *       }
 *     }]);
 *   };
 * 
 *   return (
 *     <View>
 *       <Button onPress={showAddTagPrompt}>Add Tag</Button>
 *       <Prompter prompts={prompts} />
 *     </View>
 *   );
 * }
 * 
 * @example
 * // Non-dismissable critical prompt
 * function CriticalUpdate() {
 *   const [prompts, setPrompts] = useState([]);
 * 
 *   const showUpdatePrompt = () => {
 *     const id = Date.now();
 *     const content = (
 *       <Section>
 *         <Chunk><Text type="title">Critical Update Required</Text></Chunk>
 *         <Chunk>
 *           <Text>A security update is required to continue using the app.</Text>
 *         </Chunk>
 *         
 *         <Chunk>
 *           <Button onPress={() => window.location.reload()}>
 *             Update Now
 *           </Button>
 *         </Chunk>
 *       </Section>
 *     );
 * 
 *     setPrompts(prev => [...prev, { 
 *       id, 
 *       content, 
 *       showable: true,
 *       dismissable: false  // Cannot be dismissed by backdrop or Escape
 *     }]);
 *   };
 * 
 *   return (
 *     <View>
 *       <Button onPress={showUpdatePrompt}>Simulate Critical Update</Button>
 *       <Prompter prompts={prompts} />
 *     </View>
 *   );
 * }
 */

/*

know that there is an input bug in ios versions < 11.3
fixed positioning gets weird

*/


class Prompt extends React.Component {

	static defaultProps = {
		onPressEnter: () => { },
		onRequestClose: () => { },
		onCompleteClose: () => { },
		dismissable: true,
		visible: false
	}

	constructor(props) {
		super(props);
		this.state = {
			display: 'none',
			visibilityValue: new Animated.Value(0)
		}
		this.onKeyPress = this.onKeyPress.bind(this);
		this.onRequestClose = this.onRequestClose.bind(this);
		this.onCompleteClose = this.onCompleteClose.bind(this);
	}

	componentDidMount() {
		document.addEventListener("keydown", this.onKeyPress, false);
		if (this.props.showable) {
			setTimeout(() => {
				this.open();
			}, 1);
		}
	}
	componentWillUnmount() {
		document.removeEventListener("keydown", this.onKeyPress, false);
	}

	onKeyPress(event) {
		if (this.props.showable) {
			if (event.keyCode === 27 && this.props.dismissable) {
				this.props.onRequestClose();
			}
			else if (event.keyCode === 13) {
				this.props.onPressEnter();
			}
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.showable != prevProps.showable) {
			if (this.props.showable) {
				this.open();
			}
			else {
				this.close();
			}
		}
	}

	onRequestClose() {
		this.props.hidePrompt(this.props.id);
		this.props.onRequestClose();
	}

	onCompleteClose() {
		this.props.removePrompt(this.props.id)
		this.props.onCompleteClose();
	}

	open() {
		const duration = 250;
		this.setState({ display: 'flex' })
		Animated.timing(
			this.state.visibilityValue, {
			toValue: 1,
			easing: EASE,
			duration
		}
		).start();
	}

	close() {
		const duration = 250;
		Animated.timing(
			this.state.visibilityValue, {
			toValue: 0,
			easing: EASE,
			duration
		}
		).start(() => {
			this.setState({ display: 'none' });
			this.onCompleteClose();
		});
	}


	render() {
		const {
			dismissable,
			content,
			...other
		} = this.props;


		const promptContent = React.cloneElement(content, {
			onRequestClose: this.onRequestClose,
			onCompleteClose: this.onCompleteClose
		});

		return (
			<ThemeContext.Consumer>
				{ ({ styles }) => (
					<Animated.View style={[
						styles['modal-container'],
						{
							display: this.state.display,
							opacity: this.state.visibilityValue
						}
					]}>

						<Touch
							onPress={(dismissable) ? this.onRequestClose : () => { }}
							noFeedback
						>
							<View style={[styles['modal-backdrop']]} />
						</Touch>
						<Animated.View style={[
							styles['prompt'],
							{
								transform: [{
									translateY: this.state.visibilityValue.interpolate({
										inputRange: [0, 1],
										outputRange: [150, 0]
									}),
								}]
							}
						]}>
							<Stripe>
								{promptContent}
							</Stripe>
						</Animated.View>
					</Animated.View>
				)}
			</ThemeContext.Consumer>
		);
	}
}


class Prompter extends React.Component {

	render() {
		const {
			children,
			prompts,
			...other
		} = this.props;
		const thisPrompt = this.props.prompts[0];
		if (thisPrompt) {
			return (
				<Prompt
					showable={thisPrompt.showable}
					{...thisPrompt}
					{...other}
				/>
			);
		}
		else {
			return false;
		}
	}

}



export default Prompter;