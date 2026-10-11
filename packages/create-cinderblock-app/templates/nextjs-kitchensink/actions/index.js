// Plain action creators for app-level UI state.
// Layer actions (modals, prompts, toasts, popovers) come from Cinderblock's
// layer policy; see @cinderblock/design-system docs/global-layer-state.md.
import { layerActions } from '@cinderblock/design-system/layers';

export { layerActions };

let idCounter = 0;
const nextId = (prefix = 'ui') => `${prefix}-${Date.now().toString(36)}-${++idCounter}`;

// UI -- assorted global UI state
export const updateUi = (diff) => ({
	type: 'UPDATE_UI',
	payload: diff
});

export const resetUi = () => ({
	type: 'RESET_UI',
});

// TOASTS -- a convenience wrapper that gives each toast a unique id.
export const addToast = (message, options = {}) => layerActions.enqueueToast({
	id: nextId('toast'),
	message,
	...options
});

// PROMPTS -- store a serializable description, not React content.
// `kind` picks the renderer in components/LayerHost.js; `payload` carries ids.
export const openPrompt = (kind, payload = {}, options = {}) => layerActions.enqueuePrompt({
	id: nextId('prompt'),
	kind,
	payload,
	dismissable: true,
	...options
});

// POPOVERS -- only the open popover's id is stored; its content stays with
// its trigger.
export const openPopover = (id) => layerActions.openPopover({ id });
export const closePopover = (id) => layerActions.closePopover(id ? { id } : undefined);
