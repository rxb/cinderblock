// ############################
// the animated.js way

show(){
	Animated.timing(
		this.state.visibility,{
			toValue: 1,
			easing: EASE,
			duration
		}
	).start(this.startHideTimeout);
}


<View
	style={{
		marginBottom: this.state.visibility.interpolate({
	    	inputRange: [0, 1],
	        outputRange: [-60, 0]
	    }),
		opacity: this.state.visibility
	}}
	/>


// ############################
// the css way

show(){
	const visibility = {
		value: 1,
		easing: EASE,
		duration
	}
	this.setState({
		nextAnimation: {
			visibility: visibility
		}
	})
}


interpolate(endValue, rangeOptions){

	return interpolatedEndValue;
}

render(){
	const {
		anims
	} = this.state;


	return(
		<View
			style={{
				transition: `all ${anims.visibility.duration} ${anims.visibility.easing}`,
				marginBottom: interpolate( anims.visibility.value, {
			    	inputRange: [0, 1],
			        outputRange: [-60, 0]
			    }),
				opacity: anims.visibility.value
			}}
			/>
	);
}

// ############################
// get you a wrapper that can do both


show(){
	const visibility = {
		value: 1,
		easing: EASE,
		duration
	}
	this.setState({
		nextAnimation: {
			visibility: visibility
		}
	})
}



getAnimatedStyles(anim, atrributes=[]){

	// linear interpolate
	function lerp(minX, maxX, minY, maxY, clampFlag) {
	  var slope = (maxY-minY)/(maxX-minX);
	  return clampFlag ?
	    function(x){ return ((x<minX?minX:x>maxX?maxX:x) - minX) * slope + minY }
	    :
	    function(x){ return (x-minX)*slope + minY }
	}

	// generate "to" styles
	let animatedStyles = {}, value, fnInterpolate;
	for(let key in attributes){
		if(attributes[key]){
			fnInterpolate = lerp(anim.inputRange[0], anim.inputRange[1], anim.outputRange[0], anim.outputRange[1], true);
			value = fnInterpolate(anim.value);
		}
		else{
			value = anim.value
		}
		animatedStyles[key] = value;
	});
	animatedStyles['transition'] = `all ${anim.duration} ${anim.easing}`;

	// ok
	return animatedStyles;
}


render(){

	return(
		<View
			style={[
				getAnimatedStyles(this.state.anims.visibility, {
					opacity: null,
					marginBottom: {
						inputRange: [0, 1],
			        	outputRange: [-60, 0]
			    	}
				}),
				{height: 10, width: 10, backgroundColor: 'red'}
			]}
			/>
	);
}
