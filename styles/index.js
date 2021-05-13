import buildStyles from './buildStyles';
import {METRICS, SWATCHES} from './designConstants';

const styleConfig = {
	METRICS,
	SWATCHES,
	buildStyles,
	styles: buildStyles(METRICS, SWATCHES)
};

export default styleConfig;