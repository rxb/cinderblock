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
		href: '/recipes/detail',
		title: 'Detail page',
		description: 'Two-column layout with a responsive action sidebar, divider rows, prompts, and dropdowns.',
	},
	{
		href: '/recipes/feed',
		title: 'Card feed',
		description: 'List that side-scrolls on mobile and becomes a grid on desktop, plus a dark inverted section and empty state.',
	},
	{
		href: '/recipes/form',
		title: 'Form page',
		description: 'Narrow bounds, useFormState, validation, field errors, a selectable pill grid, and toast feedback.',
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
					</Section>
					<Section>
						<List
							variant={{ small: 'linear', medium: 'grid' }}
							itemsInRow={{ medium: 3 }}
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
