import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { closePopover, openPopover } from '@/actions';

import {
	Image,
	Link,
	NavBar,
	PopoverItem,
	Text,
	View
} from '@cinderblock/design-system';

const MENU_ITEMS = [
	{ path: "/", label: "Home" },
	{ path: "/categories/projects", label: "Projects" },
	{ path: "/categories/blog", label: "Blog" },
	{ path: "/about", label: "About" },
];

// NavBar menus are popovers, so their open state lives in the shared layer
// store: only one is ever open, and dialogs, route changes, and resizes
// close them.
const NAV_MENU_IDS = {
	navigation: 'site-nav-navigation',
	account: 'site-nav-elsewhere'
};

export const SiteLogo = (props) => {
	const {
		style = {},
		activeScreen = false
	} = props;

	const defaultImage = '/computer.jpeg';
	const activeImage = '/computer_dinosaur.jpeg';

	const [imageSrc, setImageSrc] = useState(defaultImage);
	const activateScreen = () => {
		setImageSrc(activeImage)
	}
	const deActivateScreen = () => {
		if(!activeScreen){
			setImageSrc(defaultImage)
		}
	}
	useEffect(()=>{
		if(activeScreen){
			activateScreen();
		}
		else{
			deActivateScreen();
		}
	}, [activeScreen])

   return(
		<>
			<Head>
				<link
					rel="preload"
					href={activeImage}
					as="image"
				/>
			</Head>
			<View
				onMouseOver={activateScreen}
				onMouseOut={deActivateScreen}
				>
				<Image
					source={{uri: imageSrc}}
					resizeMode="contain"
					style={style}
					/>
			</View>
		</>
	);
}

const SiteBrand = ({ menuOpen }) => (
	<Link href="/" accessibilityLabel="rgb.work home">
		<View style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
			<SiteLogo activeScreen={menuOpen} style={{ width: 40, height: 40 }} />
			<View>
				<Text weight="strong" type="small">rgb.work</Text>
				<Text color="secondary" type="micro">Hacking + Designing</Text>
			</View>
		</View>
	</Link>
);

// Lucide has no brand logos, so external profiles are plain text links.
const Elsewhere = () => (
	<>
		<PopoverItem href="https://twitter.com/richardboenigk">Twitter</PopoverItem>
		<PopoverItem href="https://instagram.com/rbgk">Instagram</PopoverItem>
		<PopoverItem href="https://github.com/rxb">GitHub</PopoverItem>
	</>
);

export const Layout = (props) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const popoverId = useSelector((state) => state.layers.popover?.id);
	const openMenu = Object.keys(NAV_MENU_IDS)
		.find((menu) => NAV_MENU_IDS[menu] === popoverId) ?? null;

	return (
		<>
			<NavBar
				brand={<SiteBrand menuOpen={Boolean(openMenu)} />}
				items={MENU_ITEMS.map((item) => ({
					href: item.path,
					label: item.label,
					current: router.asPath === item.path
				}))}
				account={{ label: 'Elsewhere', content: <Elsewhere /> }}
				openMenu={openMenu}
				onOpenMenu={(menu) => dispatch(openPopover(NAV_MENU_IDS[menu]))}
				onCloseMenu={() => dispatch(closePopover())}
			/>
			{props.children}
		</>
	);
}
