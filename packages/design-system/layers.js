/**
 * Global layer policy and Escape arbitration.
 *
 * Two independent pieces live here, and neither depends on a state library:
 *
 * 1. `layersReducer` — a pure reducer with Cinderblock's default rules for
 *    modals, prompts, toasts, and popovers. A project keeps the state wherever
 *    it likes (Redux, React's useReducer, another store) and plugs this
 *    reducer in, wraps it, or replaces it with its own policy.
 * 2. `escapeStack` — tracks which Escape-dismissible layers are open, in
 *    order, so only the topmost one responds to Escape. Modal and Popover use
 *    it automatically; projects do not wire it.
 *
 * Records in layer state are plain, serializable data: an `id`, optional
 * `kind`/`payload` describing what to render, and a `phase`. Rendering content
 * from those records stays in the project.
 */

// ---------------------------------------------------------------------------
// Policy reducer
// ---------------------------------------------------------------------------

/**
 * Default layer policy:
 * - Only one modal task at a time; a second request while one is open or
 *   while prompts are waiting is ignored.
 * - Prompts form a FIFO queue, deduplicated by id. Queuing a prompt starts
 *   closing an open modal.
 * - At most one popover (dropdown, menu) is open. Opening one replaces any
 *   other, and opening a modal or prompt closes it.
 * - Toasts stack, deduplicated by id, and coexist with everything.
 * - Closing is a phase: request → 'closing' → complete removes the record, so
 *   exit animations can finish. Completion matches by id.
 */
export const initialLayersState = Object.freeze({
	modal: null,
	prompts: [],
	toasts: [],
	popover: null
});

const PREFIX = 'cinderblock/layers/';
export const LAYER_ACTION_TYPES = Object.freeze({
	openModal: `${PREFIX}openModal`,
	requestModalClose: `${PREFIX}requestModalClose`,
	completeModalClose: `${PREFIX}completeModalClose`,
	enqueuePrompt: `${PREFIX}enqueuePrompt`,
	requestPromptClose: `${PREFIX}requestPromptClose`,
	completePromptClose: `${PREFIX}completePromptClose`,
	enqueueToast: `${PREFIX}enqueueToast`,
	requestToastClose: `${PREFIX}requestToastClose`,
	completeToastClose: `${PREFIX}completeToastClose`,
	openPopover: `${PREFIX}openPopover`,
	closePopover: `${PREFIX}closePopover`,
	closeTransientLayers: `${PREFIX}closeTransientLayers`,
	closePositionedLayers: `${PREFIX}closePositionedLayers`
});

const action = (type) => (payload) => ({type, payload});

export const layerActions = Object.freeze({
	/** Open a modal task: `{id, kind?, payload?, dismissible?, ...}`. */
	openModal: action(LAYER_ACTION_TYPES.openModal),
	requestModalClose: action(LAYER_ACTION_TYPES.requestModalClose),
	completeModalClose: action(LAYER_ACTION_TYPES.completeModalClose),
	/** Queue a confirmation prompt: `{id, kind?, payload?, ...}`. */
	enqueuePrompt: action(LAYER_ACTION_TYPES.enqueuePrompt),
	requestPromptClose: action(LAYER_ACTION_TYPES.requestPromptClose),
	completePromptClose: action(LAYER_ACTION_TYPES.completePromptClose),
	/** Show a toast: `{id, message, ...}`. */
	enqueueToast: action(LAYER_ACTION_TYPES.enqueueToast),
	requestToastClose: action(LAYER_ACTION_TYPES.requestToastClose),
	completeToastClose: action(LAYER_ACTION_TYPES.completeToastClose),
	/** Open a popover by id: `{id}`. Replaces any open popover. */
	openPopover: action(LAYER_ACTION_TYPES.openPopover),
	/** Close the popover. With `{id}`, only if that popover is the open one. */
	closePopover: action(LAYER_ACTION_TYPES.closePopover),
	/** For route changes: close the modal, drop prompts, close the popover. */
	closeTransientLayers: () => ({type: LAYER_ACTION_TYPES.closeTransientLayers}),
	/** For resize or orientation changes: close positioned popovers only. */
	closePositionedLayers: () => ({type: LAYER_ACTION_TYPES.closePositionedLayers})
});

const withPhase = (record, phase) => ({...record, phase});

export function layersReducer(state = initialLayersState, incoming = {}) {
	const {type, payload} = incoming;
	switch (type) {
		case LAYER_ACTION_TYPES.openModal: {
			if (state.modal || state.prompts.length > 0) return state;
			return {...state, modal: withPhase(payload, 'open'), popover: null};
		}
		case LAYER_ACTION_TYPES.requestModalClose: {
			if (state.modal?.id !== payload?.id) return state;
			return {...state, modal: withPhase(state.modal, 'closing')};
		}
		case LAYER_ACTION_TYPES.completeModalClose: {
			if (state.modal?.id !== payload?.id) return state;
			return {...state, modal: null};
		}
		case LAYER_ACTION_TYPES.enqueuePrompt: {
			if (state.prompts.some((prompt) => prompt.id === payload.id)) return state;
			return {
				...state,
				modal: state.modal?.phase === 'open'
					? withPhase(state.modal, 'closing')
					: state.modal,
				prompts: [...state.prompts, withPhase(payload, 'open')],
				popover: null
			};
		}
		case LAYER_ACTION_TYPES.requestPromptClose: {
			if (!state.prompts.some((prompt) => prompt.id === payload?.id)) return state;
			return {
				...state,
				prompts: state.prompts.map((prompt) => (
					prompt.id === payload.id ? withPhase(prompt, 'closing') : prompt
				))
			};
		}
		case LAYER_ACTION_TYPES.completePromptClose: {
			if (!state.prompts.some((prompt) => prompt.id === payload?.id)) return state;
			return {
				...state,
				prompts: state.prompts.filter((prompt) => prompt.id !== payload.id)
			};
		}
		case LAYER_ACTION_TYPES.enqueueToast: {
			if (state.toasts.some((toast) => toast.id === payload.id)) return state;
			return {...state, toasts: [...state.toasts, {...payload, visible: true}]};
		}
		case LAYER_ACTION_TYPES.requestToastClose: {
			if (!state.toasts.some((toast) => toast.id === payload?.id)) return state;
			return {
				...state,
				toasts: state.toasts.map((toast) => (
					toast.id === payload.id ? {...toast, visible: false} : toast
				))
			};
		}
		case LAYER_ACTION_TYPES.completeToastClose: {
			if (!state.toasts.some((toast) => toast.id === payload?.id)) return state;
			return {...state, toasts: state.toasts.filter((toast) => toast.id !== payload.id)};
		}
		case LAYER_ACTION_TYPES.openPopover: {
			if (state.popover?.id === payload.id) return state;
			return {...state, popover: {...payload}};
		}
		case LAYER_ACTION_TYPES.closePopover: {
			if (!state.popover) return state;
			if (payload?.id && state.popover.id !== payload.id) return state;
			return {...state, popover: null};
		}
		case LAYER_ACTION_TYPES.closeTransientLayers: {
			return {
				...state,
				modal: state.modal ? withPhase(state.modal, 'closing') : null,
				prompts: [],
				popover: null
			};
		}
		case LAYER_ACTION_TYPES.closePositionedLayers: {
			return state.popover ? {...state, popover: null} : state;
		}
		default:
			return state;
	}
}

// ---------------------------------------------------------------------------
// Escape stack
// ---------------------------------------------------------------------------

/**
 * Creates an ordered stack of Escape-aware layers. The most recently
 * registered layer is topmost. Escape goes only to that layer: a dismissible
 * layer receives `onEscape`, and a non-dismissible one still consumes the key
 * so nothing beneath it closes.
 */
export function createEscapeStack() {
	const entries = [];
	let nextKey = 0;

	return {
		/** Register an open layer. Returns a function that unregisters it. */
		register({onEscape, dismissible = true}) {
			const entry = {key: nextKey++, onEscape, dismissible};
			entries.push(entry);
			return () => {
				const index = entries.indexOf(entry);
				if (index >= 0) entries.splice(index, 1);
			};
		},
		/** Handle a key event. Returns true when a layer consumed it. */
		handleKeyDown(event) {
			if (event.key !== 'Escape' || entries.length === 0) return false;
			const top = entries[entries.length - 1];
			event.preventDefault?.();
			event.stopPropagation?.();
			if (top.dismissible) top.onEscape?.(event);
			return true;
		},
		get size() {
			return entries.length;
		}
	};
}

let installed = false;

/**
 * The shared browser instance. It installs one capture-phase listener the
 * first time a layer registers, so pages with no open layers pay nothing.
 */
const sharedStack = createEscapeStack();
export const escapeStack = {
	register(entry) {
		if (!installed && typeof document !== 'undefined') {
			document.addEventListener('keydown', sharedStack.handleKeyDown, true);
			installed = true;
		}
		return sharedStack.register(entry);
	},
	get size() {
		return sharedStack.size;
	}
};
