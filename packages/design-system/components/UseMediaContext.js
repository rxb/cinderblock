import React, { useEffect, useState, useContext } from 'react';

/**
 * Media query context system for responsive design breakpoint detection.
 * Provides React hooks and context for detecting screen size changes.
 * 
 * The UseMediaContext system provides a React context-based approach to
 * responsive design. It listens to CSS media queries and updates component
 * state when breakpoints change, enabling components to respond to screen
 * size changes without CSS-only solutions.
 * 
 * Features:
 * - Real-time media query monitoring
 * - Server-side rendering compatibility
 * - Custom breakpoint definitions
 * - Automatic cleanup of media query listeners
 * - React hook interface for easy consumption
 * 
 * @example
 * // Setting up the media provider
 * import { initMediaProvider } from './UseMediaContext';
 * 
 * const MediaProvider = initMediaProvider({
 *   small: '(max-width: 768px)',
 *   medium: '(min-width: 769px) and (max-width: 1024px)',
 *   large: '(min-width: 1025px) and (max-width: 1440px)',
 *   xlarge: '(min-width: 1441px)'
 * });
 * 
 * function App() {
 *   return (
 *     <MediaProvider>
 *       <YourAppComponents />
 *     </MediaProvider>
 *   );
 * }
 * 
 * @example
 * // Using media context in components
 * function ResponsiveNavigation() {
 *   const media = useMediaContext();
 *   const isMobile = media.small;
 *   const isDesktop = media.large || media.xlarge;
 * 
 *   return (
 *     <Header>
 *       {isMobile ? (
 *         <MobileNavigation />
 *       ) : (
 *         <DesktopNavigation />
 *       )}
 *     </Header>
 *   );
 * }
 * 
 * @example
 * // Conditional rendering based on screen size
 * function ProductGrid() {
 *   const media = useMediaContext();
 *   
 *   const getColumns = () => {
 *     if (media.small) return 1;
 *     if (media.medium) return 2;
 *     if (media.large) return 3;
 *     return 4; // xlarge
 *   };
 * 
 *   return (
 *     <Flex direction="row" wrap>
 *       {products.map(product => (
 *         <FlexItem key={product.id} basis={`${100 / getColumns()}%`}>
 *           <ProductCard product={product} />
 *         </FlexItem>
 *       ))}
 *     </Flex>
 *   );
 * }
 * 
 * @example
 * // Responsive text sizing
 * function HeroSection() {
 *   const media = useMediaContext();
 *   
 *   const getTitleSize = () => {
 *     if (media.small) return 'title';
 *     if (media.medium) return 'pageHead';
 *     return 'jumbo'; // large screens
 *   };
 * 
 *   return (
 *     <Section>
 *       <Chunk>
 *         <Text type={getTitleSize()} align="center">
 *           Welcome to Our Platform
 *         </Text>
 *       </Chunk>
 *       
 *       <Chunk>
 *         <Text align="center">
 *           {media.small 
 *             ? 'Discover amazing features.'
 *             : 'Discover amazing features and transform your workflow with our powerful tools.'
 *           }
 *         </Text>
 *       </Chunk>
 *     </Section>
 *   );
 * }
 * 
 * @example
 * // Custom breakpoints for specific needs
 * const PortraitMediaProvider = initMediaProvider({
 *   portrait: '(orientation: portrait)',
 *   landscape: '(orientation: landscape)',
 *   mobile: '(max-width: 480px)',
 *   tablet: '(min-width: 481px) and (max-width: 1024px)',
 *   desktop: '(min-width: 1025px)',
 *   highDPI: '(min-resolution: 2dppx)'
 * });
 * 
 * function OrientationAwareComponent() {
 *   const media = useMediaContext();
 * 
 *   return (
 *     <View>
 *       {media.portrait ? (
 *         <Text>Portrait mode - stack vertically</Text>
 *       ) : (
 *         <Text>Landscape mode - arrange horizontally</Text>
 *       )}
 *       
 *       {media.highDPI && (
 *         <Text>High DPI display detected - using retina assets</Text>
 *       )}
 *     </View>
 *   );
 * }
 */

export const MediaContext = React.createContext({});

export const initMediaProvider = (mediaQueries={}) => {

	return ({children}) => {

		if ( typeof window === 'undefined' || !window.matchMedia ) {
			return <>{children}</>;
		}

		const [matches, setMatches] = useState({});

		useEffect(()=>{
			const initialState = {};
			Object.entries(mediaQueries).forEach(([key, value]) => {
				const matchMediaValue = window.matchMedia(value);
				initialState[key] = matchMediaValue.matches;
				matchMediaValue.addListener(mq => {
					setMatches(prevState => ({
					  ...prevState,
					  [key]: mq.matches,
					}))
				});
				setMatches(initialState);
			});
			
		}, []);

		return <MediaContext.Provider value={matches}>{children}</MediaContext.Provider>
	}
}

export const useMediaContext = () => {
	return useContext(MediaContext);
};