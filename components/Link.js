// LINK
// For internal routing
// captures the href and turns it into an onPress router push + scroll adjustment
// the onPress prop is just for additional actions, don't use this for onPress without an href, that's a job for Touch

import React, {useContext} from 'react';
import Touch from './Touch';
import Router from 'next/router'
import ThemeContext from '../ThemeContext';

/*
TODO:
Consider using https://github.com/fridays/next-routes
for nice dynamic routes like
http://tldr.cards/c/finance
http://tldr.cards/u/rxb
*/

const Link = (props) => {
	const { styles } = useContext(ThemeContext);

	const {
		href,
		children,
		onPress = () => {},
		...other
	} = props;

	return(
		<Touch
			accessibilityRole="link"
			href={href}
			onPress={(event)=>{
				event.preventDefault();
				onPress();
				if(!props.target){ // if opening new window, don't use router
					Router.push(href).then(()=>{window.scroll(0,0)}); // TODO: maybe use next/Link ?
				}
			}}
			{...other}
			>
				{children}
		</Touch>
	);

}


export default Link;