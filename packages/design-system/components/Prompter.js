import React from 'react';
import Modal from './Modal';

/**
 * Queue adapter for confirmation and decision dialogs. The first descriptor is
 * displayed; hiding it starts Modal's close animation and completion removes
 * it before the next prompt is shown.
 *
 * Prompter deliberately does not turn Enter into confirmation. Native buttons
 * and forms retain their ordinary keyboard behavior, and destructive actions
 * only run when their explicit control is activated.
 */
class Prompt extends React.Component {
	static defaultProps = {
		onRequestClose: () => {},
		onCompleteClose: () => {},
		hidePrompt: () => {},
		removePrompt: () => {},
		dismissable: true,
		showable: false,
	};

	constructor(props) {
		super(props);
		this.onRequestClose = this.onRequestClose.bind(this);
		this.onCompleteClose = this.onCompleteClose.bind(this);
	}

	onRequestClose(reason) {
		this.props.hidePrompt(this.props.id);
		this.props.onRequestClose(reason);
	}

	onCompleteClose() {
		this.props.removePrompt(this.props.id);
		this.props.onCompleteClose();
	}

	render() {
		const {
			accessibilityLabel,
			content,
			dismissable,
			hidePrompt,
			id,
			onCompleteClose,
			onPressEnter,
			onRequestClose,
			removePrompt,
			showable,
			...other
		} = this.props;
		const promptContent = React.isValidElement(content)
			? React.cloneElement(content, {
				onRequestClose: this.onRequestClose,
				onCompleteClose: this.onCompleteClose,
			})
			: content;
		const hasLabelledBy = Boolean(other['aria-labelledby']);
		const resolvedAccessibilityLabel = accessibilityLabel
			?? (hasLabelledBy ? undefined : 'Confirmation');

		return (
			<Modal
				{...other}
				visible={showable}
				variant="prompt"
				dismissable={dismissable}
				accessibilityLabel={resolvedAccessibilityLabel}
				onRequestClose={this.onRequestClose}
				onCompleteClose={this.onCompleteClose}
			>
				{promptContent}
			</Modal>
		);
	}
}

class Prompter extends React.Component {
	render() {
		const {prompts = [], ...other} = this.props;
		const currentPrompt = prompts[0];
		return currentPrompt ? (
			<Prompt
				{...currentPrompt}
				{...other}
				showable={currentPrompt.showable}
			/>
		) : null;
	}
}

export default Prompter;
