import React, {useRef, useEffect} from 'react';
import { Animated } from '../primitives';

/**
 * Bounce animation component that scales content up and down when triggered.
 * Creates a quick "bounce" effect by scaling the content larger then back to normal size.
 * 
 * The Bounce component watches a prop value and triggers a scale animation whenever
 * that value changes. This creates engaging micro-interactions for user feedback,
 * notifications, or highlighting important content changes.
 * 
 * @param {Object} props - Component props
 * @param {any} props.watchProp - Value to watch for changes (triggers animation)
 * @param {number} [props.scale=1.3] - Maximum scale factor during bounce
 * @param {React.ReactNode} props.children - Content to animate
 * 
 * @example
 * // Bounce when counter updates
 * function ScoreDisplay() {
 *   const [score, setScore] = useState(0);
 * 
 *   return (
 *     <Bounce watchProp={score}>
 *       <Text type="title">{score} points</Text>
 *     </Bounce>
 *   );
 * }
 * 
 * @example
 * // Bounce notification badge when count changes
 * function NotificationBadge() {
 *   const { unreadCount } = useNotifications();
 * 
 *   return (
 *     <Bounce watchProp={unreadCount} scale={1.2}>
 *       <View style={styles.badge}>
 *         <Text color="white">{unreadCount}</Text>
 *       </View>
 *     </Bounce>
 *   );
 * }
 * 
 * @example
 * // Bounce button after successful action
 * function LikeButton() {
 *   const [liked, setLiked] = useState(false);
 *   const [likeCount, setLikeCount] = useState(42);
 * 
 *   const handleLike = () => {
 *     setLiked(!liked);
 *     setLikeCount(prev => liked ? prev - 1 : prev + 1);
 *   };
 * 
 *   return (
 *     <Touch onPress={handleLike}>
 *       <Bounce watchProp={likeCount} scale={1.15}>
 *         <Icon 
 *           shape={liked ? "heart-filled" : "heart"} 
 *           color={liked ? "red" : "gray"} 
 *         />
 *       </Bounce>
 *     </Touch>
 *   );
 * }
 * 
 * @example
 * // Bounce form field when validation error occurs
 * function ValidatedInput() {
 *   const [value, setValue] = useState('');
 *   const [error, setError] = useState(null);
 * 
 *   const validate = (input) => {
 *     const isValid = input.length >= 3;
 *     setError(isValid ? null : 'Too short');
 *     return isValid;
 *   };
 * 
 *   return (
 *     <Chunk>
 *       <Bounce watchProp={error} scale={1.05}>
 *         <TextInput
 *           value={value}
 *           onChange={(val) => {
 *             setValue(val);
 *             validate(val);
 *           }}
 *           style={error ? styles.errorInput : styles.input}
 *         />
 *       </Bounce>
 *       <FieldError error={error} />
 *     </Chunk>
 *   );
 * }
 */
const Bounce = (props) => {

		const {
			watchProp,
			children,
			scale = 1.3
		} = props;

		const anim = useRef(new Animated.Value(1)).current;
		const bounce = () => {
			Animated.sequence([
				Animated.timing(anim, {
					toValue: scale,
					duration: 75
				 }),
				 Animated.timing(anim, {
					toValue: 1,
					duration: 75
				 }),
			]).start();
		 };
		 
		 useEffect(()=>{
			console.log('bounce');
			bounce();
		 }, [watchProp]);

		 useEffect(()=>{
			console.log('watching: '+watchProp);
		 }, []);

		return(
			<Animated.View
				style={{
					transform: [
						{ scale: anim }
					]
				}}
				>
				{children}
			</Animated.View>
		);
}

export default Bounce;