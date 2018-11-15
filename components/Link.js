import React from 'react';
import Touch from './Touch';


/*
Consider using https://github.com/fridays/next-routes
for nice dynamic routes like
http://tldr.cards/c/finance
http://tldr.cards/u/rxb

Don't worry about it for now

*/

class Link extends React.Component {

	render() {
		const {
			href,
			children,
			...other
		} = this.props;

		return(
				<Touch
					accessibilityRole="link"
					href={href}
					onPress={(event)=>{
						if(!this.props.target){ // if opening new window, don't use router
							event.preventDefault();
							Link.routingFn();
							//Router.push(href).then(()=>{window.scroll(0,0)});
						}
					}}
					{...other}
					>
						{children}
				</Touch>
		);
	}
}

Link.routingFn = (href) => {
	console.error("Link.routingFn not configured.");
};


export default Link;