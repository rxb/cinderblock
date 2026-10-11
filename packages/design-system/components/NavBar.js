import React, {useContext, useEffect, useState} from 'react';
import {View} from '../primitives';
import ThemeContext from '../ThemeContext';
import Button from './Button';
import Header from './Header';
import Link from './Link';
import Popover, {PopoverItem} from './Popover';
import Text from './Text';

/**
 * Site navigation that adapts to screen width.
 *
 * At and above `collapseBelow`, items sit inline beside the brand and an
 * optional account button opens a Popover. Below it, a single menu button
 * opens a Popover holding the items and the account section. Both layouts are
 * rendered and switched with Cinderblock's `showAt`/`hideAt` media classes,
 * so server rendering and first paint agree and nothing shifts on load.
 *
 * Open state can be controlled or not:
 * - Controlled: pass `openMenu` (`'navigation'`, `'account'`, or `null`) with
 *   `onOpenMenu(name)` and `onCloseMenu()`. Use this to let a project's layer
 *   policy (for example `layersReducer`) coordinate menus with modals.
 * - Uncontrolled: omit `openMenu`; NavBar keeps its own state and still only
 *   ever has one menu open.
 *
 * Either way, menus close on Escape (topmost layer only), outside presses,
 * focus leaving, choosing an item, and window resize.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.brand - Logo or wordmark (wrap it in a Link)
 * @param {Array<{href: string, label: string, current?: boolean}>} props.items
 * @param {{label: string, content: React.ReactNode}} [props.account]
 *   Account trigger text and the panel content (sign out, settings, ...).
 *   Use forms for actions that must POST.
 * @param {('medium'|'large'|'xlarge')} [props.collapseBelow='medium']
 * @param {('navigation'|'account'|null)} [props.openMenu]
 * @param {Function} [props.onOpenMenu]
 * @param {Function} [props.onCloseMenu]
 * @param {string} [props.accessibilityLabel='Main'] - Navigation landmark name
 * @param {Object} [props.style] - Passed to Header
 */
const NavBar = (props) => {
	const {
		brand,
		items = [],
		account,
		collapseBelow = 'medium',
		openMenu,
		onOpenMenu,
		onCloseMenu,
		accessibilityLabel = 'Main',
		style,
		...headerProps
	} = props;
	const {styles, ids, SWATCHES} = useContext(ThemeContext);
	const [localMenu, setLocalMenu] = useState(null);
	const controlled = openMenu !== undefined;
	const activeMenu = controlled ? openMenu : localMenu;
	const open = (name) => (controlled ? onOpenMenu?.(name) : setLocalMenu(name));
	const close = () => (controlled ? onCloseMenu?.() : setLocalMenu(null));

	// A positioned panel can end up detached from its trigger after a resize
	// or rotation, and the layout may switch, so close it.
	useEffect(() => {
		if (!activeMenu) return undefined;
		const onResize = () => close();
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	});

	const wide = {style: styles.hide, dataSet: {media: ids[`showAt__${collapseBelow}`]}};
	const narrow = {style: styles.show, dataSet: {media: ids[`hideAt__${collapseBelow}`]}};

	const inlineItems = (
		<View
			accessibilityRole="navigation"
			aria-label={accessibilityLabel}
			style={{flexDirection: 'row', gap: 2}}
		>
			{items.map((item) => (
				<Link key={item.href} href={item.href} aria-current={item.current ? 'page' : undefined}>
					<View
						style={{
							backgroundColor: item.current ? SWATCHES.shade : 'transparent',
							borderRadius: 999,
							justifyContent: 'center',
							minHeight: 40,
							paddingHorizontal: 12,
						}}
					>
						<Text
							weight="strong"
							style={{color: item.current ? SWATCHES.textPrimary : SWATCHES.textSecondary}}
						>
							{item.label}
						</Text>
					</View>
				</Link>
			))}
		</View>
	);

	const accountPanel = account ? (
		<View style={{gap: 2}}>
			{account.content}
		</View>
	) : null;

	return (
		// The outermost banner is the sticky element: a sticky child can only
		// stick within its parent, and this wrapper is exactly header-height.
		// React Native Web also gives every View `z-index: 0`, making each a
		// stacking context, so the banner's z-index is what keeps open menus
		// above the page content that follows it.
		<View accessibilityRole="banner" style={{position: 'sticky', top: 0, zIndex: 20}}>
			<Header position="static" style={style} {...headerProps}>
				<View style={{alignItems: 'center', flexDirection: 'row', gap: 12}}>
					<View style={{flexShrink: 0}}>{brand}</View>
					<View style={{flex: 1}} />

					<View {...wide}>
						<View style={{alignItems: 'center', flexDirection: 'row', gap: 12}}>
							{inlineItems}
							{account ? (
								<Popover
									open={activeMenu === 'account'}
									onRequestOpen={() => open('account')}
									onRequestClose={close}
									accessibilityLabel={account.label}
									renderTrigger={(triggerProps) => (
										<Button
											{...triggerProps}
											color="secondary"
											size="small"
											label={account.label}
										/>
									)}
								>
									{accountPanel}
								</Popover>
							) : null}
						</View>
					</View>

					<View {...narrow}>
						<Popover
							open={activeMenu === 'navigation'}
							onRequestOpen={() => open('navigation')}
							onRequestClose={close}
							accessibilityLabel="Menu"
							width={320}
							renderTrigger={(triggerProps) => (
								<Button
									{...triggerProps}
									color="secondary"
									shape="Menu"
									accessibilityLabel="Menu"
								/>
							)}
						>
							<View accessibilityRole="navigation" aria-label={accessibilityLabel}>
								{items.map((item) => (
									<PopoverItem key={item.href} href={item.href} current={item.current}>
										{item.label}
									</PopoverItem>
								))}
							</View>
							{account ? (
								<View
									style={{
										borderTopColor: SWATCHES.borderSecondary,
										borderTopWidth: 1,
										marginTop: 6,
										paddingTop: 6,
									}}
								>
									{accountPanel}
								</View>
							) : null}
						</Popover>
					</View>
				</View>
			</Header>
		</View>
	);
};

export default NavBar;
