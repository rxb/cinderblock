import React, {useContext, useId} from 'react';
import {createElement, Platform, StyleSheet, View} from '../primitives';
import Text from './Text';
import Touch from './Touch';
import ThemeContext from '../ThemeContext';

const NativeTab = (props) => createElement('button', props);
const safeIdPart = (value) => String(value).replace(/[^a-zA-Z0-9_-]/g, '-');
const tabId = (tabsId, value) => `${tabsId}-tab-${safeIdPart(value)}`;
const panelId = (tabsId, value) => `${tabsId}-panel-${safeIdPart(value)}`;

const TabItem = ({
	allValues,
	fullWidth,
	index,
	label,
	onChange = () => {},
	selected,
	tabsId,
	value,
}) => {
	const {styles} = useContext(ThemeContext);
	const selectedStyle = selected ? {
		item: styles['tabItem--selected'],
		text: styles['tabText--selected'],
	} : {};
	const widthStyle = fullWidth
		? styles['tabItem--fullWidth']
		: styles['tabItem--variableWidth'];
	const weightStyle = selected ? styles.textStrong : '';

	const selectAndFocus = (nextIndex) => {
		const nextValue = allValues[nextIndex];
		onChange(nextValue);
		if (typeof document !== 'undefined') {
			window.requestAnimationFrame(() => {
				document.getElementById(tabId(tabsId, nextValue))?.focus();
			});
		}
	};

	const onKeyDown = (event) => {
		let nextIndex = null;
		switch (event.key) {
			case 'ArrowRight':
				nextIndex = (index + 1) % allValues.length;
				break;
			case 'ArrowLeft':
				nextIndex = (index - 1 + allValues.length) % allValues.length;
				break;
			case 'Home':
				nextIndex = 0;
				break;
			case 'End':
				nextIndex = allValues.length - 1;
				break;
			default:
				return;
		}
		event.preventDefault();
		selectAndFocus(nextIndex);
	};

	const content = (
		<Text color="secondary" type="small" style={[selectedStyle.text, weightStyle]}>
			{label}
		</Text>
	);
	const webProps = {
		id: tabId(tabsId, value),
		role: 'tab',
		'aria-controls': panelId(tabsId, value),
		'aria-selected': selected,
		tabIndex: selected ? 0 : -1,
	};

	if (Platform.OS === 'web') {
		return (
			<NativeTab
				{...webProps}
				type="button"
				onClick={() => onChange(value)}
				onKeyDown={onKeyDown}
				style={StyleSheet.flatten([
					styles.touch,
					{
						appearance: 'none',
						backgroundColor: 'transparent',
						borderStyle: 'solid',
						borderTopWidth: 0,
						borderRightWidth: 0,
						borderBottomWidth: 0,
						borderLeftWidth: 0,
						cursor: 'pointer',
					},
					widthStyle,
					styles.tabItem,
					selectedStyle.item,
				])}
			>
				{content}
			</NativeTab>
		);
	}

	return (
		<View style={[widthStyle, styles.tabItem, selectedStyle.item]}>
			<Touch
				id={tabId(tabsId, value)}
				accessibilityRole="tab"
				accessibilityState={{selected}}
				aria-controls={panelId(tabsId, value)}
				tabIndex={selected ? 0 : -1}
				onPress={() => onChange(value)}
			>
				{content}
			</Touch>
		</View>
	);
};

const Tabs = ({
	accessibilityLabel,
	children,
	fullWidth,
	id,
	onChange,
	selectedValue,
	...other
}) => {
	const {styles} = useContext(ThemeContext);
	const generatedId = useId().replace(/:/g, '');
	const tabsId = id || `tabs-${generatedId}`;
	const items = React.Children.toArray(children).filter(React.isValidElement);
	const values = items.map((child) => child.props.value);
	const activeValue = selectedValue ?? values[0];

	return (
		<View
			id={tabsId}
			accessibilityRole="tablist"
			accessibilityLabel={accessibilityLabel}
			style={styles.tabs}
			{...other}
		>
			{items.map((child, index) => React.cloneElement(child, {
				allValues: values,
				fullWidth,
				index,
				onChange,
				selected: activeValue === child.props.value,
				tabsId,
			}))}
		</View>
	);
};

const TabPanel = ({children, selectedValue, tabsId, value, ...other}) => {
	if (selectedValue !== value) return null;
	return (
		<View
			id={panelId(tabsId, value)}
			accessibilityRole="tabpanel"
			aria-labelledby={tabId(tabsId, value)}
			tabIndex={0}
			{...other}
		>
			{children}
		</View>
	);
};

Tabs.Item = TabItem;
Tabs.Panel = TabPanel;

export default Tabs;
