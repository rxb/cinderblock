import React, { Fragment, useState, useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addToast,
	showToast,
	clearDropdowns,
	showDelayedToasts,
	updateUi
} from '@/actions';

import NextTopLoader from 'nextjs-toploader';
import Router from 'next/router'
import Head from 'next/head'

import {
	Avatar,
	Bounds,
	Button,
	Card,
	CheckBox,
	Chunk,
	Flex,
	FlexItem,
	Header,
	Icon,
	Inline,
	Image,
	LoadingBlock,
	Link,
	List,
	Tabs,
	Touch,
	Menu,
	Modal,
	Picker,
	RevealBlock,
	Section,
	Sectionless,
	Stripe,
	Text,
	TextInput,
	View,
	ThemeContext
} from 'cinderblock';
import {Layout, SiteMenu} from './rgb/Layout';

import ConnectedToaster from './ConnectedToaster';
import ConnectedPrompter from './ConnectedPrompter';
import ConnectedDropdowner from './ConnectedDropdowner';
import { addToastableErrors } from '@/components/utils';

function Page(props) {
	const { styles, SWATCHES, METRICS } = useContext(ThemeContext);

	// data from redux
	const dispatch = useDispatch();
	const ui = useSelector(state => state.ui);

	// router-related UI config	
	useEffect(() => {
		Router.onRouteChangeStart = (url) => {
			dispatch(updateUi({siteMenuOverlayActive: false}));
		}
		Router.onRouteChangeComplete = () => {
			dispatch(clearDropdowns());
			setTimeout(() => dispatch(showDelayedToasts()), 500);
		}
	}, []);

	// dismiss dropdowns on window resize
	useEffect(() => {
		function handleResize() {
			dispatch(clearDropdowns());
			dispatch(updateUi({siteMenuOverlayActive: false}));
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<View style={{ minHeight: '100vh', flex: 1 }}>
			<NextTopLoader showSpinner={false} />
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" /> 
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin /> 
				<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap" rel="stylesheet" />
			</Head>

			<Layout>
				{props.children}
			</Layout>

			{/* global ui */}
			<ConnectedToaster />
			<ConnectedPrompter />
			<ConnectedDropdowner />

			
		</View>
	);
}

export default Page;