// Renders app-wide prompts and toasts from the Redux `layers` state.
// Mount once (Page.js does). Cinderblock stays unaware of Redux: this host
// reads the serializable records and passes ordinary props to Prompter and
// Toaster, then dispatches Cinderblock's layer actions back.
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Chunk, Prompter, Section, Text, Toaster } from '@cinderblock/design-system';
import { addToast, layerActions } from '@/actions';

// Prompt content is a plain component. Prompter injects onRequestClose.
const DeleteRecipePrompt = ({ onRequestClose, onConfirm }) => (
	<Section>
		<Chunk>
			<Text type="sectionHead" compact>Really delete?</Text>
		</Chunk>
		<Chunk>
			<Text>This can&apos;t be undone.</Text>
		</Chunk>
		<Chunk>
			<Button onPress={() => { onConfirm(); onRequestClose(); }} label="Delete" width="full" />
			<Button onPress={onRequestClose} color="secondary" label="Cancel" width="full" />
		</Chunk>
	</Section>
);

// The registry: each prompt `kind` maps to the content it renders. Records in
// the store hold only the kind and ids, never React elements or callbacks.
const PROMPTS = {
	'delete-recipe': {
		label: 'Delete recipe',
		render: (prompt, dispatch) => (
			<DeleteRecipePrompt onConfirm={() => dispatch(addToast('Deleted'))} />
		)
	}
};

export default function LayerHost() {
	const dispatch = useDispatch();
	const prompts = useSelector((state) => state.layers.prompts);
	const toasts = useSelector((state) => state.layers.toasts);

	const prompt = prompts[0];
	const entry = prompt ? PROMPTS[prompt.kind] : null;

	return (
		<>
			{prompt && entry ? (
				<Prompter
					prompts={[{
						id: prompt.id,
						showable: prompt.phase === 'open',
						dismissable: prompt.dismissable !== false,
						accessibilityLabel: entry.label,
						content: entry.render(prompt, dispatch)
					}]}
					hidePrompt={(id) => dispatch(layerActions.requestPromptClose({ id }))}
					removePrompt={(id) => dispatch(layerActions.completePromptClose({ id }))}
				/>
			) : null}

			<Toaster
				toasts={toasts}
				hideToast={(id) => dispatch(layerActions.requestToastClose({ id }))}
				removeToast={(id) => dispatch(layerActions.completeToastClose({ id }))}
			/>
		</>
	);
}
