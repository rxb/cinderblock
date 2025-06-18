import React, {Fragment, useContext, useState} from 'react';
import { View, Image } from 'react-native-web';
import Icon from './Icon';
import Text from './Text';
import Touch from './Touch';
import ThemeContext from '../ThemeContext';

/**
 * Button component styled to look like a form input field.
 * Provides input-like appearance for triggering actions or modals.
 * 
 * FakeInput creates a touchable element that visually mimics a text input
 * but functions as a button. This is useful for triggering modals, pickers,
 * or other complex input interactions while maintaining form consistency.
 * The component includes focus states and icon support.
 * 
 * @param {Object} props - Component props
 * @param {Function} [props.onPress] - Press event handler
 * @param {Function} [props.onFocus] - Focus event handler
 * @param {Function} [props.onBlur] - Blur event handler
 * @param {string} props.label - Display text for the fake input
 * @param {string} [props.shape] - Icon shape to display
 * @param {Object} [props.style] - Additional styles to apply
 * 
 * @example
 * // Date picker trigger
 * function DateSelector() {
 *   const [selectedDate, setSelectedDate] = useState(null);
 *   const [showPicker, setShowPicker] = useState(false);
 * 
 *   const formatDate = (date) => {
 *     return date ? date.toLocaleDateString() : 'Select a date';
 *   };
 * 
 *   return (
 *     <Chunk>
 *       <Label>Event Date</Label>
 *       <FakeInput
 *         label={formatDate(selectedDate)}
 *         shape="Calendar"
 *         onPress={() => setShowPicker(true)}
 *       />
 *       
 *       <Modal visible={showPicker} onRequestClose={() => setShowPicker(false)}>
 *         <DatePicker
 *           date={selectedDate}
 *           onDateChange={setSelectedDate}
 *           onConfirm={() => setShowPicker(false)}
 *         />
 *       </Modal>
 *     </Chunk>
 *   );
 * }
 * 
 * @example
 * // Location picker with geocoding
 * function LocationInput() {
 *   const [location, setLocation] = useState(null);
 *   const [showMap, setShowMap] = useState(false);
 * 
 *   const getLocationLabel = () => {
 *     if (location) {
 *       return `${location.city}, ${location.state}`;
 *     }
 *     return 'Choose location on map';
 *   };
 * 
 *   return (
 *     <Chunk>
 *       <Label>Event Location</Label>
 *       <FakeInput
 *         label={getLocationLabel()}
 *         shape="MapPin"
 *         onPress={() => setShowMap(true)}
 *       />
 *       
 *       <Modal visible={showMap} onRequestClose={() => setShowMap(false)}>
 *         <MapPicker
 *           onLocationSelect={setLocation}
 *           onClose={() => setShowMap(false)}
 *         />
 *       </Modal>
 *     </Chunk>
 *   );
 * }
 * 
 * @example
 * // Multi-select categories
 * function CategorySelector() {
 *   const [selectedCategories, setSelectedCategories] = useState([]);
 *   const [showSelector, setShowSelector] = useState(false);
 * 
 *   const getCategoryLabel = () => {
 *     if (selectedCategories.length === 0) {
 *       return 'Select categories';
 *     }
 *     if (selectedCategories.length === 1) {
 *       return selectedCategories[0].name;
 *     }
 *     return `${selectedCategories.length} categories selected`;
 *   };
 * 
 *   return (
 *     <Chunk>
 *       <Label>Product Categories</Label>
 *       <FakeInput
 *         label={getCategoryLabel()}
 *         shape="Tag"
 *         onPress={() => setShowSelector(true)}
 *       />
 *       
 *       <Modal visible={showSelector} onRequestClose={() => setShowSelector(false)}>
 *         <CategoryMultiSelect
 *           selectedCategories={selectedCategories}
 *           onSelectionChange={setSelectedCategories}
 *           onClose={() => setShowSelector(false)}
 *         />
 *       </Modal>
 *     </Chunk>
 *   );
 * }
 * 
 * @example
 * // File picker alternative
 * function AttachmentInput() {
 *   const [attachments, setAttachments] = useState([]);
 * 
 *   const handleAddAttachment = () => {
 *     // Open native file picker or custom modal
 *     openFilePicker().then(files => {
 *       setAttachments(prev => [...prev, ...files]);
 *     });
 *   };
 * 
 *   const getAttachmentLabel = () => {
 *     if (attachments.length === 0) {
 *       return 'Add attachments';
 *     }
 *     return `${attachments.length} file(s) attached`;
 *   };
 * 
 *   return (
 *     <Chunk>
 *       <Label>Attachments</Label>
 *       <FakeInput
 *         label={getAttachmentLabel()}
 *         shape="Paperclip"
 *         onPress={handleAddAttachment}
 *       />
 *     </Chunk>
 *   );
 * }
 */



const FakeInput = (props) => {
	const { styles, SWATCHES } = useContext(ThemeContext);
	
	const {
		onPress = ()=>{},
		onFocus = ()=>{},
		onBlur = ()=>{},
		label,
		shape,
		style,
		...other
	} = props;

	const [hasFocus, setHasFocus] = useState();

		return (
			<Touch
				accessibilityRole="button"
				onPress={onPress}
				onFocus={()=>{
					setHasFocus(true);
					onFocus();
				}}
				onBlur={()=>{
					setHasFocus(false);
					onBlur();
				}}
				style={[
					styles.input,
					(hasFocus) ? styles['input--focus'] : {},
					style,
				]}
				>
				<Text color="hint">{label}</Text>
				{shape &&
					<View style={styles['input-icon']}>
						<Icon shape={shape} color={SWATCHES.textHint} />
					</View>
				}
			</Touch>
		);
	
}

export default FakeInput;