import React, { Fragment, useState, useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addToast,
	showToast,
	clearDropdowns,
	showDelayedToasts,
	updateUi
} from '@/actions';

import NProgress from 'nprogress'
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
import Layout from './rgb/Layout';

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
		NProgress.configure({ trickle: true, trickleSpeed: 400, showSpinner: false });
		Router.onRouteChangeStart = (url) => {
			NProgress.start();
		}
		Router.onRouteChangeComplete = () => {
			NProgress.done();
			dispatch(clearDropdowns());
			//dispatch(updateUi({searchOverlayActive: false, searchHeaderActive: false}));
			setTimeout(() => dispatch(showDelayedToasts()), 500);
		}
		Router.onRouteChangeError = () => NProgress.done();
	}, []);

	// dismiss dropdowns on window resize
	useEffect(() => {
		function handleResize() {
			dispatch(clearDropdowns());
			//dispatch(updateUi({searchOverlayActive: false, searchHeaderActive: false}));
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<View style={{ minHeight: '100vh', flex: 1 }}>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" /> 
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin /> 
				<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap" rel="stylesheet" />
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