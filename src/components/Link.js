import React from 'react';
import { navigate } from "gatsby"
import { Link } from 'cinderblock';

export default (props) => (
	<Link
		routingFn={(href) => {
			if(href.includes(':')){
				// is a full url
				window.location = href;
			}
			else{
				// is a local url
				navigate(href);
			}
		}}
		{...props}
		/>
);