import React from 'react';
import { View, Text } from './Primitives';
import styles from '../styles/styles';
import Card from './Card';
import Link from './Link';
import Icon from './Icon';
import Section from './Section';


/*

how to hide/show?
a prop?
a method?
(i'm guessing a prop but who knows)

how to hide/remove an element with animations
layoutanimation vs csstransitiongroup (is there a way to code-split this?)
animated is cross-platform
but how do you animate something that has been removed?

i think the basic idea for modal is
don't directly change the thing that renders it
request to dismiss it
and change that value after the animation runs

*/


class Modal extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			children,
			onRequestClose,
			visible,
			...other
		} = this.props;


		if(visible){
			return(
				<View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
					<View style={[styles['modal']]}>
						<Card>
							{children}
						</Card>
					</View>
					<View style={[styles['modal-backdrop']]} />
				</View>
			);
		}
		else{
			return false;
		}
	}
}


export default Modal;