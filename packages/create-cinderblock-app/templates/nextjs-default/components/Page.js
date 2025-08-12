import React, { useEffect } from 'react';
import Head from 'next/head';
import NextTopLoader from 'nextjs-toploader';
import Router from 'next/router';
import {
  Flex,
  FlexItem,
  Header,
  Link,
  Stripe,
  Text,
  View
} from '@cinderblock/design-system';

/**
 * Simple page layout component for consistent header and content structure.
 * Provides a clean, minimal layout pattern for the starter application.
 */
function Page({ 
  title = "My App", 
  currentPage,
  children, 
  ...props 
}) {
  // router-related UI config (minimal version for default template)
  useEffect(() => {
    // Add router event handlers here if needed for future functionality
    // Router.onRouteChangeStart = (url) => {
    //   // Add any route start logic here
    // }
    // Router.onRouteChangeComplete = () => {
    //   // Add any route complete logic here
    // }
  }, []);

  return (
    <View style={{ minHeight: '100vh', flex: 1 }}>
      <NextTopLoader showSpinner={false} />
      <Head>
        <title>{title}</title>
        <meta name="description" content="Built with Cinderblock Design System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header Navigation */}
      <Header>
        <Flex direction="row" align="center">
          <FlexItem>
            <Link href="/">
              <Text type="title">{title}</Text>
            </Link>
          </FlexItem>
          
          <FlexItem grow justify="end">
            <Flex direction="row" align="center">
              <FlexItem>
                <Link href="/">
                  <Text weight={currentPage === 'home' ? 'bold' : 'normal'}>
                    Home
                  </Text>
                </Link>
              </FlexItem>
              <FlexItem>
                <Link href="/about">
                  <Text weight={currentPage === 'about' ? 'bold' : 'normal'}>
                    About
                  </Text>
                </Link>
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      </Header>

      {/* Main Content */}
      <Stripe>
        {children}
      </Stripe>
    </View>
  );
}

export default Page;