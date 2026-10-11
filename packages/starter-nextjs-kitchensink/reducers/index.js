import { combineReducers } from 'redux';
import { layersReducer } from '@cinderblock/design-system/layers';
import authentication from './authentication'
import ui from './ui'

// Modals, prompts, toasts, and popovers use Cinderblock's default layer
// policy: one modal, a FIFO prompt queue, one popover at a time, and
// route/resize cleanup. The app owns where the state lives (here) and what
// each prompt kind renders (components/LayerHost.js).
const reducers = {
	authentication,
	ui,
	layers: layersReducer
};

export default combineReducers(reducers);
