import buildStyles from './buildStyles';
import {METRICS, SWATCHES} from './designConstants';

const styleConfig = {
	METRICS,
	SWATCHES,
	buildStyles,
	...buildStyles(METRICS, SWATCHES) // media query styles adds {styles, ids}
};

export default styleConfig;