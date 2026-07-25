import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '@/actions';

import {
	Bounds,
	Button,
	CheckBox,
	Chunk,
	FieldError,
	Label,
	Picker,
	Section,
	Stripe,
	Text,
	TextInput,
	useFormState,
	Utils,
} from '@cinderblock/design-system';

import Page from '@/components/Page';

const CATEGORIES = [
	{ id: 1, name: 'Breads' },
	{ id: 2, name: 'Pastry' },
	{ id: 3, name: 'Savory' },
	{ id: 4, name: 'Desserts' },
	{ id: 5, name: 'Drinks' },
	{ id: 6, name: 'Other' },
];

function FormRecipe() {
	const dispatch = useDispatch();
	const titleRef = useRef(null);
	const categoryRef = useRef(null);

	const formState = useFormState({
		initialFields: {
			title: '',
			description: '',
			categoryId: '',
			sendReminder: false,
		},
		toastableErrors: {
			BadRequest: 'Something went wrong',
		},
		addToast: msg => dispatch(addToast(msg)),
	});

	const submitForm = async (event) => {
		event?.preventDefault();
		if(formState.loading){
			return;
		}

		const error = Utils.runValidations(formState.fields, {
			title: {
				notEmpty: { msg: "Title can't be blank" },
			},
			categoryId: {
				notEmpty: { msg: 'Pick a category' },
			},
		});
		formState.setError(error);

		if(error){
			const firstInvalidField = error.errors?.[0]?.path;
			({title: titleRef, categoryId: categoryRef})[firstInvalidField]?.current?.focus();
			return;
		}

		formState.setLoading(true);
		// Pretend to save. A real form would catch its API error and call setError.
		await new Promise(resolve => setTimeout(resolve, 800));
		formState.resetFields();
		formState.setLoading(false);
		dispatch(addToast('Saved!'));
	};

	const titleError = formState.error?.fieldErrors?.title;
	const categoryError = formState.error?.fieldErrors?.categoryId;

	return (
		<Page title="Form recipe — Cinderblock Kitchensink">
			{/* RECIPE: narrow form page.
			    Bounds small keeps form width readable;
			    useFormState + Utils.runValidations + FieldError + toasts. */}
			<Stripe style={{ flex: 1 }}>
				<Bounds small>
					<Section>
						<Chunk>
							<Text type="pageHead">New post</Text>
							<Text color="secondary">Submit empty to see validation and field errors.</Text>
						</Chunk>
					</Section>
					<Section>
						<form onSubmit={submitForm} noValidate>
							<Chunk>
								<Label htmlFor="title">Title</Label>
								<TextInput
									ref={titleRef}
									id="title"
									name="title"
									value={formState.getFieldValue('title')}
									onChange={e => formState.setFieldValue('title', e.target.value)}
									aria-invalid={Boolean(titleError)}
									aria-describedby={titleError ? 'title-error' : undefined}
								/>
								<FieldError id="title-error" error={titleError} />
							</Chunk>
							<Chunk>
								<Label htmlFor="description">Description</Label>
								<TextInput
									id="description"
									name="description"
									multiline
									value={formState.getFieldValue('description')}
									onChange={e => formState.setFieldValue('description', e.target.value)}
								/>
							</Chunk>

							<Chunk>
								<Label htmlFor="categoryId">Category</Label>
								<Picker
									ref={categoryRef}
									id="categoryId"
									name="categoryId"
									selectedValue={formState.getFieldValue('categoryId')}
									onValueChange={value => formState.setFieldValue('categoryId', value)}
									aria-invalid={Boolean(categoryError)}
									aria-describedby={categoryError ? 'category-error' : undefined}
								>
									<Picker.Item label="Pick a category" value="" />
									{CATEGORIES.map(category => (
										<Picker.Item key={category.id} label={category.name} value={category.id} />
									))}
								</Picker>
								<FieldError id="category-error" error={categoryError} />
							</Chunk>

							<Chunk>
								<CheckBox
									id="sendReminder"
									name="sendReminder"
									value={formState.getFieldValue('sendReminder')}
									onChange={value => formState.setFieldValue('sendReminder', value)}
									label="Send me a reminder about this post"
								/>
							</Chunk>

							<Chunk>
								<Button
									type="submit"
									label="Save post"
									isLoading={formState.loading}
									width="full"
								/>
							</Chunk>
						</form>
					</Section>
				</Bounds>
			</Stripe>
		</Page>
	);
}

export default FormRecipe;
