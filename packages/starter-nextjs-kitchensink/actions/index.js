// Plain action creators for the app-level UI state
// (toasts, prompts, dropdowns, misc ui) consumed by the
// Connected* wrappers around Cinderblock's Toaster/Prompter/Dropdowner.

let idCounter = 0;
const nextId = () => `ui-${Date.now().toString(36)}-${++idCounter}`;

// UI -- assorted global UI state
export const updateUi = (diff) => ({
	type: 'UPDATE_UI',
	payload: diff
});

export const resetUi = () => ({
	type: 'RESET_UI',
});

// TOASTS
export const addToast = (message, options = {}) => ({
	type: 'ADD_TOAST',
	payload: {
		message: message,
		id: nextId(),
		visible: true,
		...options
	}
});

export const showToast = (id) => ({
	type: 'SHOW_TOAST',
	payload: {
		id: id,
	}
});

export const hideToast = (id) => ({
	type: 'HIDE_TOAST',
	payload: {
		id: id,
	}
});

export const removeToast = (id) => ({
	type: 'REMOVE_TOAST',
	payload: {
		id: id,
	}
});

export const addDelayedToast = (message, options = {}) => ({
	type: 'ADD_DELAYED_TOAST',
	payload: {
		message: message,
		id: nextId(),
		visible: false,
		delayed: true,
		...options
	}
});

export const showDelayedToasts = () => ({
	type: 'SHOW_DELAYED_TOASTS',
	payload: {}
});

// PROMPTS
export const addPrompt = (content, options = {}) => ({
	type: 'ADD_PROMPT',
	payload: {
		content: content,
		id: nextId(),
		showable: true,
		...options
	}
});

export const hidePrompt = (id) => ({
	type: 'HIDE_PROMPT',
	payload: {
		id: id,
	}
});

export const removePrompt = (id) => ({
	type: 'REMOVE_PROMPT',
	payload: {
		id: id,
	}
});

// DROPDOWNS
export const addDropdown = (content, options = {}) => ({
	type: 'ADD_DROPDOWN',
	payload: {
		content: content,
		id: nextId(),
		visible: true,
		...options
	}
});

export const hideDropdown = (id) => ({
	type: 'HIDE_DROPDOWN',
	payload: {
		id: id,
	}
});

export const removeDropdown = (id) => ({
	type: 'REMOVE_DROPDOWN',
	payload: {
		id: id,
	}
});

export const clearDropdowns = () => ({
	type: 'CLEAR_DROPDOWNS',
});
