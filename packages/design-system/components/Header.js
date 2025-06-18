import React, {useContext} from 'react';
import { View, Image } from '../primitives';
import ThemeContext from '../ThemeContext';
import {getActiveStyles} from '../utils';

/**
 * Page header component with responsive positioning and styling options.
 * Provides site-wide navigation header with flexible positioning behavior.
 * 
 * Header creates a full-width navigation area with centered content constraints.
 * It supports multiple positioning modes (sticky, fixed, static, absolute) and
 * styling variations. The component includes responsive design integration and
 * proper semantic structure for page headers.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Header content (nav, logo, etc.)
 * @param {number} [props.maxWidth=1100] - Maximum content width in pixels
 * @param {string} [props.position='sticky'] - Header positioning behavior
 * @param {string} [props.type='separated'] - Header styling variant
 * @param {Object} [props.style] - Additional styles to apply
 * 
 * @example
 * // Basic site header with navigation
 * function SiteHeader() {
 *   return (
 *     <Header>
 *       <Flex direction="row" align="center">
 *         <FlexItem>
 *           <Link href="/">
 *             <Text type="title">My App</Text>
 *           </Link>
 *         </FlexItem>
 *         
 *         <FlexItem grow justify="end">
 *           <Inline>
 *             <Link href="/about">About</Link>
 *             <Link href="/contact">Contact</Link>
 *             <Button onPress={handleLogin}>Sign In</Button>
 *           </Inline>
 *         </FlexItem>
 *       </Flex>
 *     </Header>
 *   );
 * }
 * 
 * @example
 * // Fixed header with transparent background
 * function OverlayHeader() {
 *   return (
 *     <Header
 *       position="fixed"
 *       type="transparent"
 *       maxWidth={1200}
 *     >
 *       <Flex direction="row" align="center">
 *         <FlexItem>
 *           <Text color="white" type="title">Brand</Text>
 *         </FlexItem>
 *         
 *         <FlexItem grow justify="end">
 *           <Button type="ghost" color="white">
 *             Get Started
 *           </Button>
 *         </FlexItem>
 *       </Flex>
 *     </Header>
 *   );
 * }
 * 
 * @example
 * // Static header with search
 * function SearchHeader() {
 *   const [searchQuery, setSearchQuery] = useState('');
 * 
 *   return (
 *     <Header position="static">
 *       <Flex direction="row" align="center" switchDirection="md">
 *         <FlexItem>
 *           <Link href="/">
 *             <Text type="title">Search App</Text>
 *           </Link>
 *         </FlexItem>
 *         
 *         <FlexItem grow>
 *           <View style={{ maxWidth: 400 }}>
 *             <TextInput
 *               value={searchQuery}
 *               onChange={setSearchQuery}
 *               placeholder="Search products..."
 *               shape="Search"
 *             />
 *           </View>
 *         </FlexItem>
 *         
 *         <FlexItem shrink>
 *           <Avatar size="small" />
 *         </FlexItem>
 *       </Flex>
 *     </Header>
 *   );
 * }
 * 
 * @example
 * // Responsive header with mobile menu
 * function ResponsiveHeader() {
 *   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 *   const { isMobile } = useMediaContext();
 * 
 *   return (
 *     <Header>
 *       <Flex direction="row" align="center">
 *         <FlexItem>
 *           <Text type="title">Logo</Text>
 *         </FlexItem>
 *         
 *         <FlexItem grow justify="end">
 *           {isMobile ? (
 *             <Touch onPress={() => setMobileMenuOpen(!mobileMenuOpen)}>
 *               <Icon shape="Menu" />
 *             </Touch>
 *           ) : (
 *             <Inline>
 *               <Link href="/products">Products</Link>
 *               <Link href="/about">About</Link>
 *               <Link href="/contact">Contact</Link>
 *             </Inline>
 *           )}
 *         </FlexItem>
 *       </Flex>
 *       
 *       <RevealBlock visible={mobileMenuOpen && isMobile}>
 *         <Section>
 *           <Chunk><Link href="/products">Products</Link></Chunk>
 *           <Chunk><Link href="/about">About</Link></Chunk>
 *           <Chunk><Link href="/contact">Contact</Link></Chunk>
 *         </Section>
 *       </RevealBlock>
 *     </Header>
 *   );
 * }
 */

const VALID_TYPES = {
	transparent: "Transparent"
}

const VALID_POSITIONS = {
	static: "static",			// moves with scroll, takes up space
	absolute: "absolute", 	// moves with scroll, doesn't take up space (almost always transparent)
	sticky: "sticky", 		// does not move with scroll, but initially takes up space
	fixed: "fixed"				// does not move with scroll, doesn't take up space
}

const Header = (props) => {
	const { styles, ids } = useContext(ThemeContext);

	const {
		children,
		style,
		maxWidth = 1100,
		position = 'sticky',
		type = 'separated'
	} = props

	const styleKeys = [
		'header',
		...[type ? `header${VALID_TYPES[type]}` : undefined ]
	];
	const {activeStyles, activeIds} = getActiveStyles(styleKeys, styles, ids);

	return(
		<View 
			style={[ activeStyles, style, {position: VALID_POSITIONS[position]} ]}
			dataSet={{ media: activeIds}}
			>
			<View style={{maxWidth: maxWidth, alignSelf: 'center', width: '100%'}}>
				<View 
					style={[styles['header-section']]}
					dataSet={{ media: ids['header-section']}}
					>
					{children}
				</View>
			</View>
		</View>
	);


}

export default Header;