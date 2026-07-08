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
/**
 * Whether an href points off-app. Anything with a URL scheme (http:, https:,
 * mailto:, tel:, …) or a protocol-relative "//host" is external; relative and
 * root-relative ("/about") paths are internal. This — not the `target` prop —
 * is what decides router vs. browser navigation. `target` only controls where
 * an external link opens (new tab vs. same tab).
 */
const isExternalHref = (href) => {
	if (typeof href !== 'string') return false;
	return /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href);
};

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
			accessibilityRole="link"
			href={href}
			onPress={(event)=>{
				event.preventDefault();         // Take over from the default handler
				onPress();                      // Execute additional callback

				if(isExternalHref(href)){
					// External link: hand off to the browser. `target` only
					// chooses the destination context.
					if(typeof window !== 'undefined' && href){
						if(props.target){
							window.open(href, props.target, 'noopener,noreferrer');
						}
						else {
							window.location.href = href;
						}
					}
				}
				else {
					// Internal link: client-side navigation via Next.js router
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