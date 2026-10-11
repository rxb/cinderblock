import assert from 'node:assert/strict';
import {
	createEscapeStack,
	initialLayersState,
	layerActions as act,
	layersReducer as reduce
} from '../layers.js';

const run = (...actions) => actions.reduce(reduce, initialLayersState);
const modal = {id: 'modal-a', kind: 'edit', payload: {recordId: '1'}, dismissible: true};
const prompt = {id: 'prompt-a', kind: 'confirm', payload: {recordId: '1'}};

// Modal lifecycle: open → closing → removed, matched by id.
{
	const opened = run(act.openModal(modal));
	assert.equal(opened.modal.phase, 'open');
	assert.equal(reduce(opened, act.requestModalClose({id: 'other'})), opened);
	const closing = reduce(opened, act.requestModalClose({id: modal.id}));
	assert.equal(closing.modal.phase, 'closing');
	assert.equal(reduce(closing, act.completeModalClose({id: modal.id})).modal, null);
}

// Only one modal task; prompts waiting also block a new modal.
{
	const opened = run(act.openModal(modal));
	assert.equal(reduce(opened, act.openModal({...modal, id: 'modal-b'})), opened);
	const prompted = run(act.enqueuePrompt(prompt));
	assert.equal(reduce(prompted, act.openModal(modal)), prompted);
}

// Prompts are FIFO, deduplicated, and close an open modal first.
{
	const queued = run(act.openModal(modal), act.enqueuePrompt(prompt));
	assert.equal(queued.modal.phase, 'closing');
	assert.equal(reduce(queued, act.enqueuePrompt(prompt)), queued);
	const two = reduce(queued, act.enqueuePrompt({...prompt, id: 'prompt-b'}));
	assert.deepEqual(two.prompts.map((p) => p.id), ['prompt-a', 'prompt-b']);
	const done = reduce(reduce(two, act.requestPromptClose({id: 'prompt-a'})),
		act.completePromptClose({id: 'prompt-a'}));
	assert.deepEqual(done.prompts.map((p) => p.id), ['prompt-b']);
}

// One popover at a time; modals and prompts close it.
{
	const menu = run(act.openPopover({id: 'nav'}));
	assert.equal(menu.popover.id, 'nav');
	const replaced = reduce(menu, act.openPopover({id: 'account'}));
	assert.equal(replaced.popover.id, 'account');
	assert.equal(reduce(replaced, act.closePopover({id: 'nav'})), replaced);
	assert.equal(reduce(replaced, act.closePopover({id: 'account'})).popover, null);
	assert.equal(reduce(menu, act.closePopover()).popover, null);
	assert.equal(reduce(menu, act.openModal(modal)).popover, null);
	assert.equal(reduce(menu, act.enqueuePrompt(prompt)).popover, null);
}

// Route changes close transient layers; resize closes only popovers.
{
	const busy = run(act.openModal(modal), act.enqueuePrompt(prompt),
		act.enqueueToast({id: 't', message: 'Saved'}), act.openPopover({id: 'nav'}));
	const routed = reduce(busy, act.closeTransientLayers());
	assert.equal(routed.modal.phase, 'closing');
	assert.deepEqual(routed.prompts, []);
	assert.equal(routed.popover, null);
	assert.equal(routed.toasts.length, 1);
	const withModal = run(act.openModal(modal), act.openPopover({id: 'menu-in-modal'}));
	const resized = reduce(withModal, act.closePositionedLayers());
	assert.equal(resized.popover, null);
	assert.equal(resized.modal.phase, 'open');
}

// Toasts stack, deduplicate, hide, and remove.
{
	const toast = {id: 't', message: 'Saved'};
	const shown = run(act.enqueueToast(toast), act.enqueueToast(toast));
	assert.equal(shown.toasts.length, 1);
	const hidden = reduce(shown, act.requestToastClose({id: 't'}));
	assert.equal(hidden.toasts[0].visible, false);
	assert.deepEqual(reduce(hidden, act.completeToastClose({id: 't'})).toasts, []);
}

// State stays serializable and unknown actions are no-ops.
{
	const state = run(act.openModal(modal), act.enqueuePrompt(prompt), act.openPopover({id: 'nav'}));
	assert.deepEqual(JSON.parse(JSON.stringify(state)), state);
	assert.equal(reduce(state, {type: 'something/else'}), state);
}

// Escape reaches only the topmost layer; a non-dismissible top consumes it.
{
	const stack = createEscapeStack();
	const closed = [];
	const key = (k = 'Escape') => ({key: k, preventDefault() {}, stopPropagation() {}});
	const unregisterModal = stack.register({onEscape: () => closed.push('modal')});
	const unregisterMenu = stack.register({onEscape: () => closed.push('menu')});
	assert.equal(stack.handleKeyDown(key('Enter')), false);
	stack.handleKeyDown(key());
	assert.deepEqual(closed, ['menu']);
	unregisterMenu();
	stack.handleKeyDown(key());
	assert.deepEqual(closed, ['menu', 'modal']);
	const unregisterBlocking = stack.register({dismissible: false, onEscape: () => closed.push('blocking')});
	assert.equal(stack.handleKeyDown(key()), true);
	assert.deepEqual(closed, ['menu', 'modal']);
	unregisterBlocking();
	unregisterModal();
	assert.equal(stack.size, 0);
	assert.equal(stack.handleKeyDown(key()), false);
}

console.log('Layer policy and Escape stack invariants passed.');
