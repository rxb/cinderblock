import React, { useEffect, } from 'react';
import Head from 'next/head'

// STYLE
import { ThemeContext, styleConfig, designConstants, initMediaProvider } from 'cinderblock';
const { MEDIA_QUERY_PARAMS_SINGLE } = designConstants;
const MediaProvider = initMediaProvider(MEDIA_QUERY_PARAMS_SINGLE);

// CONFIG STYLES
const METRICS = styleConfig.METRICS;
const SWATCHES = styleConfig.SWATCHES;
const themedStyleConfig = {
	...styleConfig,
	METRICS: METRICS,
	...styleConfig.buildStyles(METRICS, SWATCHES) // media query styles adds {styles, ids}
}

// create-next-app
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
	return (
		
		<ThemeContext.Provider value={themedStyleConfig}>
			<MediaProvider>
        <Head>
						<meta name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no" />
				</Head>
        <Component {...pageProps} />
        </MediaProvider>
		</ThemeContext.Provider>
  );
}