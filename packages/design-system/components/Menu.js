/**
 * DEPRECATED: Legacy menu component with click-outside behavior.
 * 
 * This component provides basic dropdown menu functionality but has limitations
 * with React Native compatibility due to DOM dependencies. The Dropdowner component
 * is recommended as a replacement for most use cases as it provides centralized
 * state management and better cross-platform support.
 * 
 * Note: This component relies on DOM methods and click event handling that
 * won't work in React Native environments. Use native menu components or
 * Dropdowner for React Native applications.
 * 
 * @deprecated Use Dropdowner component instead for better state management
 * 
 * @example
 * // Basic menu usage (deprecated pattern)
 * function UserMenu() {
 *   const menuRef = useRef(null);
 * 
 *   return (
 *     <View>
 *       <Touch onPress={() => menuRef.current.toggle()}>
 *         <Text>User Menu</Text>
 *       </Touch>
 *       
 *       <Menu ref={menuRef}>
 *         <Link href="/profile">Profile</Link>
 *         <Link href="/settings">Settings</Link>
 *         <Touch onPress={handleLogout}>
 *           <Text>Sign Out</Text>
 *         </Touch>
 *       </Menu>
 *     </View>
 *   );
 * }
 * 
 * @example
 * // Recommended alternative using Dropdowner
 * function ModernUserMenu() {
 *   const dropdown = (
 *     <Section>
 *       <DropdownItem href="/profile">Profile</DropdownItem>
 *       <DropdownItem href="/settings">Settings</DropdownItem>
 *       <DropdownItem onPress={handleLogout}>Sign Out</DropdownItem>
 *     </Section>
 *   );
 * 
 *   return (
 *     <DropdownTouch dropdown={dropdown}>
 *       <Text>User Menu</Text>
 *     </DropdownTouch>
 *   );
 * }
 */

// MENU
// this outclick stuff won't work on react native
// there's a lot that is counting on DOM stuff
// but maybe you should be using native components there for menus anyhow

// pretty sure dropdowner replaces this because it's managed centrally

import React, {useContext} from 'react';
import { View } from '../primitives';
import RevealBlock from './RevealBlock';
import ThemeContext from '../ThemeContext';
import ReactDOM from 'react-dom';

class Menu extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			visible: false,
			coords: {x: 0, y: 0}
		}
		this.toggle = this.toggle.bind(this);
	}
	toggle(){
		this.setState({visible: !this.state.visible});
	}
	
	render(){
		return(
			<ThemeContext.Consumer>
			{ ({styles}) => (
			<View 
				ref={ ref => this.menuContainer = ref }
				style={styles['menu-container']} 
				>
				{ this.state.visible && 
					<MenuComponent
						{...this.props}
						onRequestClose={this.toggle}
						/>
				}
			</View>
			)}
			</ThemeContext.Consumer>
		);
	}
};

class MenuComponent extends React.Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount(){
		setTimeout(()=>{
			document.addEventListener('click', this.handleClick, false);
		}, 1);
	}
	componentWillUnmount(){
		document.removeEventListener('click', this.handleClick, false);
	}
	handleClick(e) {
		if(ReactDOM.findDOMNode(this.outer).contains(e.target)){
			return false;
		}
		this.props.onRequestClose();
	}
	render(){
		const {
			children,
			visible,
		} = this.props;
		return (
			<View style={styles.menu} ref={ outer => this.outer = outer }>
				{this.props.children}
			</View>
		);
	}
}

export default Menu;