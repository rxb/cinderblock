import React from 'react';

import {
	Bounds,
	Card,
	Chunk,
	Link,
	List,
	Section,
	Stripe,
	Text,
} from '@cinderblock/design-system';

import Page from '@/components/Page';

const RECIPES = [
	{
		href: '/recipes/composition',
		title: 'Page composition',
		description: 'The ordinary Stripe, Bounds, Section, and Chunk path with no Card required.',
	},
	{
		href: '/recipes/detail',
		title: 'Detail page',
		description: 'Card-free detail content with a responsive action sidebar, divider rows, prompts, and dropdowns.',
	},
	{
		href: '/recipes/directory',
		title: 'Record directory',
		description: 'Responsive page-head actions and a direct linear List whose rows do not need Cards.',
	},
	{
		href: '/recipes/form',
		title: 'Form page',
		description: 'Narrow bounds, useFormState, validation, field errors, a selectable pill grid, and toast feedback.',
	},
	{
		href: '/recipes/feed',
		title: 'Card feed',
		description: 'The optional object treatment: selectable previews that side-scroll on mobile and become a grid.',
	},
];

function RecipesIndex() {
	return (
		<Page title="Recipes — Cinderblock Kitchensink">
			<Stripe>
				<Bounds>
					<Section>
						<Chunk>
							<Text type="pageHead">Recipes</Text>
						</Chunk>
						<Chunk>
							<Text>
								Live versions of the patterns in the design system&apos;s{' '}
								<Link href="https://github.com/rxb/cinderblock/blob/main/packages/design-system/docs/recipes.md" target="_blank">
									<Text color="tint">docs/recipes.md</Text>
								</Link>
								. Each page is a working, self-contained example.
							</Text>
						</Chunk>
						<Chunk>
							<Text color="secondary">
								This index intentionally uses Cards because each recipe is a
								selectable preview. The recipe pages begin with ordinary
								Section-first composition.
							</Text>
						</Chunk>
					</Section>
					<Section>
						<List
							variant={{ small: 'linear', medium: 'grid' }}
							itemsInRow={{ medium: 2, large: 3 }}
							items={RECIPES}
							renderItem={(recipe, i) => (
								<Chunk key={i}>
									<Link href={recipe.href}>
										<Card>
											<Section>
												<Chunk>
													<Text type="big" weight="strong">{recipe.title}</Text>
													<Text color="secondary" type="small">{recipe.description}</Text>
												</Chunk>
											</Section>
										</Card>
									</Link>
								</Chunk>
							)}
						/>
					</Section>
				</Bounds>
			</Stripe>
		</Page>
	);
}

export default RecipesIndex;
