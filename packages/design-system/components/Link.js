import React, {useContext} from 'react';
import Touch from './Touch';
import Router from 'next/router'
import ThemeContext from '../ThemeContext';

/**
 * Navigation component that provides client-side routing with Next.js integration.
 * Handles internal navigation using Next.js router while maintaining accessibility.
 * 
 * Link automatically prevents default browser navigation and uses Next.js Router.push()
 * for single-page app behavior. It also handles scroll restoration and provides
 * proper semantic HTML with accessibility attributes.
 * 
 * For actions without navigation, use Touch component instead.
 * 
 * @param {Object} props - Component props
 * @param {string} props.href - Navigation destination URL (internal routes)
 * @param {Function} [props.onPress] - Additional callback to execute on link press
 * @param {string} [props.target] - Link target (_blank, etc.) - disables router navigation
 * @param {React.ReactNode} props.children - Link content (text, icons, etc.)
 * 
 * @example
 * // Basic internal navigation
 * <Link href="/products">
 *   <Text>View Products</Text>
 * </Link>
 * 
 * @example
 * // Navigation with icon and text
 * <Link href="/dashboard">
 *   <Inline>
 *     <Icon shape="home" size="small" />
 *     <Text>Dashboard</Text>
 *   </Inline>
 * </Link>
 * 
 * @example
 * // Link with additional action (analytics, etc.)
 * <Link 
 *   href="/checkout"
 *   onPress={() => trackEvent('checkout_started')}
 * >
 *   <Button color="primary">Proceed to Checkout</Button>
 * </Link>
 * 
 * @example
 * // External link (opens in new tab, bypasses router)
 * <Link href="https://external-site.com" target="_blank">
 *   <Text>External Resource</Text>
 * </Link>
 * 
 * @example
 * // Navigation breadcrumbs
 * <Inline>
 *   <Link href="/"><Text>Home</Text></Link>
 *   <Text>></Text>
 *   <Link href="/products"><Text>Products</Text></Link>
 *   <Text>></Text>
 *   <Text>Current Page</Text>
 * </Inline>
 */
const Link = (props) => {
	const { styles } = useContext(ThemeContext);

	const {
		href,                    // Navigation destination
		children,                // Link content
		onPress = () => {},      // Additional callback
		...other
	} = props;

	return(
		<Touch
			accessibilityRole="link"    // Semantic HTML and screen reader support
			href={href}
			onPress={(event)=>{
				event.preventDefault();         // Prevent default browser navigation
				onPress();                      // Execute additional callback
				
				// Use router for internal navigation, allow browser for external links
				if(!props.target){ 
					Router.push(href).then(()=>{
						window.scroll(0,0);        // Scroll to top after navigation
					});
				}
			}}
			{...other}
			>
				{children}
		</Touch>
	);

}


export default Link;