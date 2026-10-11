import React, {useCallback, useContext, useEffect, useId, useRef} from 'react';
import ThemeContext from '../ThemeContext';
import Link from './Link';
import Text from './Text';
import Touch from './Touch';
import {escapeStack} from '../layers';

const FOCUSABLE_SELECTOR = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled]):not([type="hidden"])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * A controlled panel anchored to its trigger: menus, account panels, and
 * collapsed navigation. Web only, like the rest of Cinderblock's layers.
 *
 * Popover does not decide whether it is open; the project does, so a layer
 * policy (for example `layersReducer`, which keeps one popover open at a
 * time) can coordinate it with modals and route changes. Popover reports
 * every reason it should close through `onRequestClose(reason)`:
 *
 * - `'escape'` — only when it is the topmost layer (see `escapeStack`); focus
 *   returns to the trigger.
 * - `'outside'` — a pointer press outside the trigger and panel.
 * - `'blur'` — keyboard focus moved out of the trigger and panel.
 * - `'select'` — a link or button inside the panel was activated
 *   (`closeOnSelect`, on by default). Submit buttons are left alone so their
 *   form can submit.
 * - `'toggle'` — the trigger was pressed while open.
 *
 * The trigger is rendered by `renderTrigger(triggerProps)`; spread the props
 * onto a Button or other pressable so it carries `id`, `aria-expanded`,
 * `aria-controls`, and the toggle handler. This follows the disclosure
 * pattern, which suits navigation; it does not impose ARIA menu semantics.
 *
 * @example
 * <Popover
 *   open={open}
 *   onRequestOpen={() => setOpen(true)}
 *   onRequestClose={() => setOpen(false)}
 *   accessibilityLabel="Account"
 *   renderTrigger={(triggerProps) => (
 *     <Button {...triggerProps} color="secondary" label="Account" />
 *   )}
 * >
 *   <PopoverItem href="/settings">Settings</PopoverItem>
 * </Popover>
 */
const Popover = (props) => {
	const {
		open = false,
		onRequestOpen = () => {},
		onRequestClose = () => {},
		renderTrigger,
		children,
		align = 'end',
		width = 280,
		closeOnSelect = true,
		accessibilityLabel,
	} = props;
	const {SWATCHES, METRICS} = useContext(ThemeContext);
	const generatedId = useId();
	const triggerId = `${generatedId}-trigger`;
	const panelId = `${generatedId}-panel`;
	const wrapperRef = useRef(null);
	const panelRef = useRef(null);
	const requestCloseRef = useRef(onRequestClose);
	requestCloseRef.current = onRequestClose;

	const focusTrigger = useCallback(() => {
		document.getElementById(triggerId)?.focus?.({preventScroll: true});
	}, [triggerId]);

	useEffect(() => {
		if (!open) return undefined;
		const wrapper = wrapperRef.current;

		const unregisterEscape = escapeStack.register({
			onEscape: () => {
				requestCloseRef.current('escape');
				focusTrigger();
			}
		});
		const onPointerDown = (event) => {
			if (wrapper && !wrapper.contains(event.target)) {
				requestCloseRef.current('outside');
			}
		};
		const onFocusOut = (event) => {
			const next = event.relatedTarget;
			if (next && wrapper && !wrapper.contains(next)) {
				requestCloseRef.current('blur');
			}
		};
		document.addEventListener('pointerdown', onPointerDown, true);
		wrapper?.addEventListener('focusout', onFocusOut);

		// Move focus to the first item so keyboard and screen reader users
		// land inside the panel they just opened. Effects run after the panel
		// is in the document, so no frame delay is needed (animation frames
		// do not run in background tabs).
		// Like Modal, skip anything without layout (hidden inputs, collapsed
		// content), which cannot take focus.
		const first = Array.from(panelRef.current?.querySelectorAll(FOCUSABLE_SELECTOR) ?? [])
			.find((element) => element.getClientRects().length > 0);
		first?.focus?.({preventScroll: true});

		return () => {
			unregisterEscape();
			document.removeEventListener('pointerdown', onPointerDown, true);
			wrapper?.removeEventListener('focusout', onFocusOut);
		};
	}, [open, focusTrigger]);

	const onPanelClick = (event) => {
		if (!closeOnSelect) return;
		const target = event.target.closest?.('a[href], button');
		if (!target || target.disabled) return;
		if (target.matches('button[type="submit"]')) return;
		requestCloseRef.current('select');
	};

	const triggerProps = {
		id: triggerId,
		'aria-expanded': open,
		'aria-controls': panelId,
		onPress: () => (open ? onRequestClose('toggle') : onRequestOpen()),
	};

	return (
		<div ref={wrapperRef} style={{position: 'relative'}}>
			{renderTrigger(triggerProps)}
			<div
				ref={panelRef}
				id={panelId}
				role="region"
				aria-label={accessibilityLabel}
				hidden={!open}
				onClick={onPanelClick}
				style={{
					position: 'absolute',
					top: 'calc(100% + 8px)',
					[align === 'start' ? 'left' : 'right']: 0,
					zIndex: 50,
					width: `min(${width}px, calc(100vw - 32px))`,
					boxSizing: 'border-box',
					padding: 6,
					backgroundColor: SWATCHES.backgroundWhite,
					border: `1px solid ${SWATCHES.borderSecondary}`,
					borderRadius: METRICS.cardBorderRadius ?? METRICS.borderRadius,
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), 0 16px 40px rgba(0, 0, 0, 0.10)',
				}}
			>
				{open ? children : null}
			</div>
		</div>
	);
};

/**
 * A row inside a Popover: a link (`href`), an action (`onPress`), or plain
 * content. `current` marks the page you are on.
 */
export const PopoverItem = ({href, onPress, current = false, disabled = false, children}) => {
	const {SWATCHES, METRICS} = useContext(ThemeContext);
	const rowStyle = {
		alignItems: 'center',
		backgroundColor: current ? SWATCHES.shade : 'transparent',
		borderRadius: METRICS.borderRadius,
		flexDirection: 'row',
		minHeight: 44,
		opacity: disabled ? 0.5 : 1,
		paddingHorizontal: 12,
	};
	const label = (
		<Text weight="strong" style={{color: current ? SWATCHES.textPrimary : SWATCHES.textSecondary}}>
			{children}
		</Text>
	);
	if (href && !disabled) {
		return (
			<Link href={href} aria-current={current ? 'page' : undefined} style={rowStyle}>
				{label}
			</Link>
		);
	}
	if (onPress || disabled) {
		return (
			<Touch
				onPress={disabled ? undefined : onPress}
				disabled={disabled}
				accessibilityRole="button"
				accessibilityState={{disabled}}
				style={rowStyle}
			>
				{label}
			</Touch>
		);
	}
	return <div style={{padding: '8px 12px'}}>{children}</div>;
};

export default Popover;
