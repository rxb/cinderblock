import React from 'react';
import {createPortal} from 'react-dom';
import {Animated, ScrollView, View} from '../primitives';
import ThemeContext from '../ThemeContext';

import Button from './Button';
import Touch from './Touch';
import {MediaContext} from './UseMediaContext';
import {EASE} from '../styles/designConstants';

import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

const FOCUSABLE_SELECTOR = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
	'[contenteditable="true"]',
].join(',');

const animationDuration = () => (
	typeof window !== 'undefined'
	&& window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
		? 0
		: 250
);

const schedule = (callback) => {
	if (typeof window !== 'undefined' && window.requestAnimationFrame) {
		window.requestAnimationFrame(callback);
	}
	else {
		setTimeout(callback, 0);
	}
};

/**
 * Blocking dialog/sheet with a portal, semantic dialog contract, focus
 * containment and restoration, background inertness, and body scroll locking.
 *
 * Give every Modal either `accessibilityLabel` or `aria-labelledby`. The
 * optional `initialFocusRef` selects the first focused control; otherwise the
 * first focusable descendant (or the dialog itself) receives focus.
 */
class Modal extends React.Component {
	static contextType = MediaContext;

	static defaultProps = {
		onRequestClose: () => {},
		onCompleteClose: () => {},
		visible: false,
		dismissable: true,
		closeOnBackdropPress: true,
		closeLabel: 'Close dialog',
		variant: 'modal',
	};

	constructor(props) {
		super(props);
		this.state = {
			display: 'none',
			portalTarget: null,
			visibilityValue: new Animated.Value(0),
		};
		this.dialogRef = React.createRef();
		this.scrollRef = React.createRef();
		this.previouslyFocusedElement = null;
		this.backgroundElement = null;
		this.backgroundAriaHidden = null;
		this.backgroundWasInert = false;
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	componentDidMount() {
		document.addEventListener('keydown', this.onKeyDown, true);
		this.setState({portalTarget: document.body}, () => {
			if (this.props.visible) this.open();
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.visible !== prevProps.visible) {
			if (this.props.visible) this.open();
			else this.close();
		}
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.onKeyDown, true);
		this.unlockBody();
		this.restoreBackground();
		this.restoreFocus();
	}

	getFocusableElements() {
		const dialog = this.dialogRef.current;
		if (!dialog) return [];
		return Array.from(dialog.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
			(element) => (
				!element.hasAttribute('disabled')
				&& element.tabIndex >= 0
				&& element.getAttribute('aria-hidden') !== 'true'
				&& element.getClientRects().length > 0
			)
		);
	}

	focusInitialElement() {
		const dialog = this.dialogRef.current;
		if (!dialog) return;
		const requestedById = this.props.initialFocusId
			? document.getElementById(this.props.initialFocusId)
			: null;
		const requested = dialog.contains(requestedById)
			? requestedById
			: this.props.initialFocusRef?.current;
		const markedRoot = dialog.querySelector('[data-modal-initial-focus="true"], [autofocus]');
		const marked = markedRoot?.matches?.(FOCUSABLE_SELECTOR)
			&& markedRoot.tabIndex >= 0
			? markedRoot
			: markedRoot?.querySelector?.(FOCUSABLE_SELECTOR);
		const target = requested || marked || this.getFocusableElements()[0] || dialog;
		target.focus?.({preventScroll: true});
	}

	onKeyDown(event) {
		if (!this.props.visible || this.state.display === 'none') return;

		if (event.key === 'Escape' && this.props.dismissable) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onRequestClose('escape');
			return;
		}

		if (event.key !== 'Tab') return;
		const dialog = this.dialogRef.current;
		const focusable = this.getFocusableElements();
		if (!dialog || focusable.length === 0) {
			event.preventDefault();
			dialog?.focus?.({preventScroll: true});
			return;
		}

		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		const active = document.activeElement;
		if (!dialog.contains(active)) {
			event.preventDefault();
			(event.shiftKey ? last : first).focus();
		}
		else if (event.shiftKey && active === first) {
			event.preventDefault();
			last.focus();
		}
		else if (!event.shiftKey && active === last) {
			event.preventDefault();
			first.focus();
		}
	}

	makeBackgroundInert() {
		const background = document.getElementById('__next');
		if (!background) return;
		this.backgroundElement = background;
		this.backgroundAriaHidden = background.getAttribute('aria-hidden');
		this.backgroundWasInert = background.hasAttribute('inert');
		background.setAttribute('aria-hidden', 'true');
		background.setAttribute('inert', '');
	}

	restoreBackground() {
		const background = this.backgroundElement;
		if (!background) return;
		if (this.backgroundAriaHidden === null) background.removeAttribute('aria-hidden');
		else background.setAttribute('aria-hidden', this.backgroundAriaHidden);
		if (!this.backgroundWasInert) background.removeAttribute('inert');
		this.backgroundElement = null;
	}

	lockBody() {
		const target = this.scrollRef.current || this.dialogRef.current;
		if (target) disableBodyScroll(target);
	}

	unlockBody() {
		const target = this.scrollRef.current || this.dialogRef.current;
		if (target) enableBodyScroll(target);
	}

	restoreFocus() {
		const previous = this.previouslyFocusedElement;
		this.previouslyFocusedElement = null;
		if (previous?.isConnected) schedule(() => previous.focus?.({preventScroll: true}));
	}

	open() {
		if (!this.state.portalTarget) return;
		this.previouslyFocusedElement = document.activeElement;
		this.makeBackgroundInert();
		this.setState({display: 'flex'}, () => {
			this.lockBody();
			schedule(() => this.focusInitialElement());
			Animated.timing(this.state.visibilityValue, {
				toValue: 1,
				easing: EASE,
				duration: animationDuration(),
				useNativeDriver: false,
			}).start();
		});
	}

	close() {
		if (this.state.display === 'none') return;
		Animated.timing(this.state.visibilityValue, {
			toValue: 0,
			easing: EASE,
			duration: animationDuration(),
			useNativeDriver: false,
		}).start(() => {
			this.setState({display: 'none'});
			this.unlockBody();
			this.restoreBackground();
			this.restoreFocus();
			this.props.onCompleteClose();
		});
	}

	render() {
		const {
			accessibilityLabel,
			children,
			closeLabel,
			closeOnBackdropPress,
			dismissable,
			initialFocusId,
			initialFocusRef,
			onCompleteClose,
			onPressEnter,
			onRequestClose,
			showCloseButton = dismissable,
			style,
			variant,
			visible,
			...dialogProps
		} = this.props;
		const media = this.context;
		const isFull = variant !== 'prompt' && !media.medium;

		const modal = (
			<ThemeContext.Consumer>
				{({styles, METRICS}) => (
					<Animated.View
						style={[
							styles['modal-container'],
							{display: this.state.display, opacity: this.state.visibilityValue},
						]}
					>
						{dismissable && closeOnBackdropPress ? (
							<Touch
								onPress={() => onRequestClose('backdrop')}
								noFeedback
								accessible={false}
								accessibilityElementsHidden
								importantForAccessibility="no-hide-descendants"
								aria-hidden="true"
								tabIndex={-1}
							>
								<View style={styles['modal-backdrop']} />
							</Touch>
						) : (
							<View
								style={styles['modal-backdrop']}
								accessibilityElementsHidden
								importantForAccessibility="no-hide-descendants"
								aria-hidden="true"
							/>
						)}

						<Animated.View
							ref={this.dialogRef}
							accessibilityRole="dialog"
							accessibilityLabel={accessibilityLabel}
							accessibilityViewIsModal
							aria-modal="true"
							tabIndex={-1}
							{...dialogProps}
							style={[
								variant === 'prompt'
									? styles.prompt
									: isFull ? styles['modal--full'] : styles.modal,
								{
									transform: [{
										translateY: this.state.visibilityValue.interpolate({
											inputRange: [0, 1],
											outputRange: [variant === 'prompt' ? 150 : 180, 0],
										}),
									}],
								},
								style,
							]}
						>
							{showCloseButton ? (
								<View style={{position: 'absolute', top: METRICS.base, right: METRICS.base, zIndex: 5}}>
									<Button
										shape="X"
										size="small"
										color="secondary"
										accessibilityLabel={closeLabel}
										onPress={() => onRequestClose('close-button')}
									/>
								</View>
							) : null}
							<ScrollView ref={this.scrollRef}>
								{children}
							</ScrollView>
						</Animated.View>
					</Animated.View>
				)}
			</ThemeContext.Consumer>
		);

		return this.state.portalTarget
			? createPortal(modal, this.state.portalTarget)
			: null;
	}
}

export default Modal;
