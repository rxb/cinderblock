import React, {useContext} from 'react';
import { View, Picker as PickerWeb } from 'react-native-web';
import Icon from './Icon';
import ThemeContext from '../ThemeContext';

/**
 * Styled dropdown picker component with custom chevron icon.
 * Provides a native select dropdown with design system styling.
 * 
 * Picker wraps React Native Web's Picker component with consistent styling
 * and a custom dropdown arrow. It maintains the native Picker.Item composition
 * pattern while providing design system integration.
 * 
 * @param {Object} props - Component props
 * @param {Function} [props.onValueChange] - Selection change callback
 * @param {any} [props.selectedValue] - Currently selected value
 * @param {boolean} [props.enabled=true] - Whether picker is interactive
 * @param {Object} [props.style] - Additional styles to apply
 * @param {React.ReactNode} props.children - Picker.Item components
 * 
 * @example
 * // Basic picker with options
 * function CountryPicker() {
 *   const [country, setCountry] = useState('us');
 * 
 *   return (
 *     <Picker
 *       selectedValue={country}
 *       onValueChange={setCountry}
 *     >
 *       <Picker.Item label="United States" value="us" />
 *       <Picker.Item label="Canada" value="ca" />
 *       <Picker.Item label="Mexico" value="mx" />
 *       <Picker.Item label="United Kingdom" value="uk" />
 *     </Picker>
 *   );
 * }
 * 
 * @example
 * // Form integration with validation
 * function ProfileForm() {
 *   const formState = useFormState({
 *     initialFields: { role: '', department: '' }
 *   });
 * 
 *   return (
 *     <Section>
 *       <Chunk>
 *         <Label>Job Role</Label>
 *         <Picker
 *           selectedValue={formState.getFieldValue('role')}
 *           onValueChange={(value) => formState.setFieldValue('role', value)}
 *         >
 *           <Picker.Item label="Select a role..." value="" />
 *           <Picker.Item label="Software Engineer" value="engineer" />
 *           <Picker.Item label="Product Manager" value="pm" />
 *           <Picker.Item label="Designer" value="designer" />
 *           <Picker.Item label="Data Scientist" value="data" />
 *         </Picker>
 *         <FieldError error={formState.error.fieldErrors?.role} />
 *       </Chunk>
 * 
 *       <Chunk>
 *         <Label>Department</Label>
 *         <Picker
 *           selectedValue={formState.getFieldValue('department')}
 *           onValueChange={(value) => formState.setFieldValue('department', value)}
 *         >
 *           <Picker.Item label="Engineering" value="eng" />
 *           <Picker.Item label="Product" value="product" />
 *           <Picker.Item label="Design" value="design" />
 *           <Picker.Item label="Marketing" value="marketing" />
 *         </Picker>
 *       </Chunk>
 *     </Section>
 *   );
 * }
 * 
 * @example
 * // Dynamic options from API
 * function LocationPicker() {
 *   const [locations, setLocations] = useState([]);
 *   const [selectedLocation, setSelectedLocation] = useState('');
 * 
 *   useEffect(() => {
 *     api.getLocations().then(setLocations);
 *   }, []);
 * 
 *   return (
 *     <Chunk>
 *       <Label>Office Location</Label>
 *       <Picker
 *         selectedValue={selectedLocation}
 *         onValueChange={setSelectedLocation}
 *         enabled={locations.length > 0}
 *       >
 *         <Picker.Item label="Select location..." value="" />
 *         {locations.map(location => (
 *           <Picker.Item
 *             key={location.id}
 *             label={location.name}
 *             value={location.id}
 *           />
 *         ))}
 *       </Picker>
 *     </Chunk>
 *   );
 * }
 */


/*
Have to use inheritance
because of Picker.Item
which would not be accessible
using composition.

Maybe there is a better way to do this.

class Picker extends PickerWeb{
	static defaultProps = {
		className: 'input',
		style: [styles.input, styles.text]
	}

	constructor(props){
		super(props);
	}

	render() {
            const elementsTree = super.render()
            return (
            	<View style={{position: 'relative'}}>
            		{elementsTree}
            		<View style={styles['input-icon']}>
            			<Icon shape="ChevronDown" color={SWATCHES.textHint} />
            		</View>
            	</View>
            );
      }
}*/

class Picker extends React.Component {
	render() {
		const {
			children,
			style,
			...otherProps
		} = this.props;
	
		return (
			<ThemeContext.Consumer>
			{ ({styles, SWATCHES}) => (
			<View style={{position: 'relative'}}>
				<PickerWeb 
					style={[{appearance: 'none'}, styles.input, styles.text, style]} 
					{...otherProps} 
					>
					{children}
				</PickerWeb>
				<View style={styles['input-icon']}>
					<Icon shape="ChevronDown" color={SWATCHES.textHint} />
				</View>
			</View>
			)}
			</ThemeContext.Consumer>
		)
	}
}

Picker.Item = PickerWeb.Item;

export default Picker;