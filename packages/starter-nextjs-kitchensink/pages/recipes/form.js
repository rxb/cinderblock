import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '@/actions';

import {
	Bounds,
	Button,
	Chunk,
	FieldError,
	Icon,
	Inline,
	Label,
	List,
	Section,
	Stripe,
	Text,
	TextInput,
	Touch,
	View,
	ThemeContext,
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
	const { SWATCHES } = useContext(ThemeContext);

	const formState = useFormState({
		initialFields: {
			title: '',
			description: '',
			categoryId: null,
		},
		toastableErrors: {
			BadRequest: 'Something went wrong',
		},
		addToast: msg => dispatch(addToast(msg)),
	});

	const submitForm = async () => {
		const error = Utils.runValidations(formState.fields, {
			title: {
				notEmpty: { msg: "Title can't be blank" },
			},
			categoryId: {
				notNull: { msg: 'Pick a category' },
			},
		});
		formState.setError(error);
		if (!error) {
			formState.setLoading(true);
			// pretend to save
			await new Promise(resolve => setTimeout(resolve, 800));
			formState.setLoading(false);
			formState.resetFields();
			dispatch(addToast('Saved!'));
		}
	};

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
						<form>
							<Chunk>
								<Label for="title">Title</Label>
								<TextInput
									id="title"
									value={formState.getFieldValue('title')}
									onChange={e => formState.setFieldValue('title', e.target.value)}
								/>
								<FieldError error={formState.error?.fieldErrors?.title} />
							</Chunk>
							<Chunk>
								<Label for="description">Description</Label>
								<TextInput
									id="description"
									multiline
									value={formState.getFieldValue('description')}
									onChange={e => formState.setFieldValue('description', e.target.value)}
								/>
							</Chunk>

							{/* RECIPE: selectable pill grid — List as a form control */}
							<Chunk>
								<Label>Category</Label>
								<List
									variant={{ small: 'grid' }}
									itemsInRow={{ small: 2, medium: 3 }}
									items={CATEGORIES}
									renderItem={(category, i) => {
										const selected = category.id === formState.getFieldValue('categoryId');
										return (
											<Touch key={i} onPress={() => formState.setFieldValue('categoryId', category.id)}>
												<View style={{
													paddingVertical: 8,
													paddingHorizontal: 12,
													borderRadius: 32,
													backgroundColor: selected ? SWATCHES.tint : SWATCHES.shade,
												}}>
													<Inline>
														{selected && <Icon shape="Check" color="white" size="small" />}
														<Text type="small" inverted={selected} weight={selected ? 'strong' : undefined}>
															{category.name}
														</Text>
													</Inline>
												</View>
											</Touch>
										);
									}}
								/>
								<FieldError error={formState.error?.fieldErrors?.categoryId} />
							</Chunk>

							<Chunk>
								<Button
									label="Save post"
									onPress={submitForm}
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
