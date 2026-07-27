import React from 'react';

import {
	Bounds,
	Button,
	Chunk,
	Section,
	Stripe,
	Text,
} from '@cinderblock/design-system';

import Page from '@/components/Page';

function CompositionRecipe() {
	return (
		<Page title="Page composition recipe — Cinderblock Kitchensink">
			<Stripe>
				<Bounds>
					<Section>
						<Chunk>
							<Text type="pageHeadKicker">Recipe</Text>
							<Text type="pageHead">Ordinary page composition</Text>
							<Text color="secondary">
								Section is the normal home for page content. This page needs
								no Card.
							</Text>
						</Chunk>
						<Chunk>
							<Text>
								The first Section holds the page title, introduction, and
								primary content without inventing another visual container.
							</Text>
						</Chunk>
					</Section>

					<Section>
						<Chunk>
							<Text type="sectionHead">A peer content group</Text>
						</Chunk>
						<Chunk>
							<Text>
								Each additional H2-level group begins another Section. Chunk
								provides the rhythm between its individual pieces of content.
							</Text>
						</Chunk>
						<Chunk>
							<Button
								href="/recipes/directory"
								label="See the directory recipe"
								width="snap"
							/>
						</Chunk>
					</Section>
				</Bounds>
			</Stripe>
		</Page>
	);
}

export default CompositionRecipe;
