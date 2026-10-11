import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { layerActions } from '@/actions';

import NextTopLoader from 'nextjs-toploader';
import Router from 'next/router'
import Head from 'next/head'

import { View } from '@cinderblock/design-system';
import { Layout } from './rgb/Layout';
import LayerHost from './LayerHost';

// _app wraps every page in Page; a page may also render <Page title=...> to
// set its own title. The nested one only contributes head tags.
const InsidePage = createContext(false);

function PageHead({ title, description }) {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
		</Head>
	);
}

function Page({
	title = "Cinderblock Kitchensink",
	description = "Comprehensive showcase of Cinderblock Design System components",
	children
}) {
	const nested = useContext(InsidePage);
	if (nested) {
		return (
			<>
				<PageHead title={title} description={description} />
				{children}
			</>
		);
	}
	return <PageShell title={title} description={description}>{children}</PageShell>;
}

function PageShell({ title, description, children }) {
	const dispatch = useDispatch();

	// Framework events are the app's job: tell the layer policy when the
	// route changes (close the modal, prompts, and popover) and when the
	// window resizes (close positioned popovers only).
	useEffect(() => {
		const closeTransient = () => dispatch(layerActions.closeTransientLayers());
		const closePositioned = () => dispatch(layerActions.closePositionedLayers());
		Router.events.on('routeChangeStart', closeTransient);
		window.addEventListener('resize', closePositioned);
		return () => {
			Router.events.off('routeChangeStart', closeTransient);
			window.removeEventListener('resize', closePositioned);
		};
	}, [dispatch]);

	return (
		<InsidePage.Provider value={true}>
			<View style={{ minHeight: '100vh', flex: 1 }}>
				<NextTopLoader showSpinner={false} />
				<PageHead title={title} description={description} />
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<Layout>
					{children}
				</Layout>

				{/* global ui: prompts and toasts, rendered from layer state */}
				<LayerHost />
			</View>
		</InsidePage.Provider>
	);
}

export default Page;
