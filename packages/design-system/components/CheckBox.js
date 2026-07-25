import React, {useContext, useId} from 'react';
import { Platform, StyleSheet, Touchable, CheckBox as CheckBoxNative } from '../primitives';
import Label from './Label';
import Inline from './Inline';
import ThemeContext from '../ThemeContext';

/**
 * Boolean form control with a directly associated label.
 *
 * `onChange` always receives the next boolean value. On web the component uses
 * a native checkbox and label, so clicking the label, pressing Space, and
 * submitting the control through ordinary form interactions all work as
 * expected.
 *
 * @param {Object} props - Component props
 * @param {string} [props.id] - Stable ID used to associate the label and input; generated when omitted
 * @param {string|React.ReactNode} props.label - Visible checkbox label
 * @param {boolean} props.value - Current checked state
 * @param {Function} props.onChange - Called with the next boolean value
 * @param {boolean} [props.disabled=false] - Disable the checkbox
 *
 * @example
 * <CheckBox
 *   id="reminders"
 *   value={reminders}
 *   onChange={setReminders}
 *   label="Send me reminders"
 * />
 */
const CheckBox = (props) => {
	const { SWATCHES } = useContext(ThemeContext);
	const {
		id,
		label,
		onChange = () => {},
		value = false,
		disabled = false,
		style,
		...other
	} = props;
	const generatedId = useId();
	const controlId = id || generatedId;

	const inputStyle = StyleSheet.flatten([
		{
			width: 24,
			height: 24,
			accentColor: SWATCHES.tint,
			cursor: disabled ? 'default' : 'pointer'
		},
		style
	]);

	if(Platform.OS === 'web'){
		const input = React.createElement('input', {
			...other,
			id: controlId,
			type: 'checkbox',
			checked: Boolean(value),
			disabled,
			onChange: event => onChange(event.target.checked),
			style: inputStyle
		});

		return (
			<Inline style={{alignItems: 'center'}}>
				{input}
				<Label htmlFor={controlId} style={{cursor: disabled ? 'default' : 'pointer'}}>
					{label}
				</Label>
			</Inline>
		);
	}

	return (
		<Inline style={{alignItems: 'center'}}>
			<CheckBoxNative
				{...other}
				value={Boolean(value)}
				disabled={disabled}
				onValueChange={onChange}
				color={SWATCHES.tint}
				style={inputStyle}
			/>
			<Touchable
				disabled={disabled}
				onPress={() => onChange(!Boolean(value))}
			>
				<Label>{label}</Label>
			</Touchable>
		</Inline>
	);
};

export default CheckBox;
