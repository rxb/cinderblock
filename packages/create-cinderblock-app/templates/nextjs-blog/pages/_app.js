import React, { useEffect, } from 'react';
import Head from 'next/head';

// REDUX
import { Provider } from 'react-redux';
import { useStore } from '../store';
import { logOut, logInSuccess, updateUi } from '../actions';

// STYLE
import { ThemeContext, styleConfig, designConstants, initMediaProvider } from 'cinderblock';
const { MEDIA_QUERY_PARAMS_SINGLE } = designConstants;
const MediaProvider = initMediaProvider(MEDIA_QUERY_PARAMS_SINGLE);
import Page from '@/components/Page';

// CONFIG STYLES
const METRICS = {
  ...styleConfig.METRICS,
  fontFamily: `'Plus Jakarta Sans', ${styleConfig.METRICS.fontFamily}`,
  textStrongWeight: 700,
	textLabelWeight: 700,
	textBigWeight: 700,
  textSectionHeadWeight: 700,
  textPageHeadWeight: 800
};
const SWATCHES = {
  ...styleConfig.SWATCHES
};

const themedStyleConfig = {
	...styleConfig,
  SWATCHES: SWATCHES,
  METRICS: METRICS,
	...styleConfig.buildStyles(METRICS, SWATCHES) // media query styles adds {styles, ids}
}


export default function App({ Component, pageProps }) {

  const store = useStore(pageProps.initialReduxState)
  
	return (
		<ThemeContext.Provider value={themedStyleConfig}>
			<MediaProvider>
        <Provider store={store}>
          <Page>
            <Head>
              <link rel="preconnect" href="https://fonts.googleapis.com" /> 
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin /> 
              <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap" rel="stylesheet" />
            </Head>
            <Component {...pageProps} />
          </Page>
        </Provider>
      </MediaProvider>
		</ThemeContext.Provider>
  );
}