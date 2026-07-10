import React, { useContext, useState } from 'react';

import {
	Bounds,
	Button,
	Card,
	Chunk,
	Icon,
	List,
	Section,
	Sectionless,
	Stripe,
	Text,
	View,
	ThemeContext,
} from '@cinderblock/design-system';

import Page from '@/components/Page';

const ITEMS = [
	{ name: 'Sourdough basics', meta: '12 lessons' },
	{ name: 'Laminated doughs', meta: '8 lessons' },
	{ name: 'Bagels at home', meta: '5 lessons' },
	{ name: 'Enriched breads', meta: '9 lessons' },
	{ name: 'Whole grain loaves', meta: '7 lessons' },
	{ name: 'Pizza dough deep dive', meta: '6 lessons' },
	{ name: 'Pastry cream & fillings', meta: '10 lessons' },
	{ name: 'Croissant lab', meta: '4 lessons' },
];

function FeedRecipe() {
	const { styles, SWATCHES, METRICS } = useContext(ThemeContext);
	const [showItems, setShowItems] = useState(true);

	return (
		<Page title="Card feed recipe — Cinderblock Kitchensink">

			{/* RECIPE: responsive card feed.
			    'scroll' = side-scrolling cards on small screens,
			    'grid' with itemsInRow columns from medium up. */}
			<Stripe>
				<Bounds>
					<Section>
						<Chunk>
							<Text type="pageHead">Card feed</Text>
							<Text color="secondary">Side-scrolls on mobile, grid on desktop. Resize to see it switch.</Text>
						</Chunk>
						<Chunk>
							<Button
								size="small"
								color="secondary"
								label={showItems ? 'Simulate empty state' : 'Restore items'}
								onPress={() => setShowItems(!showItems)}
							/>
						</Chunk>

						{showItems &&
							<List
								variant={{ small: 'scroll', medium: 'grid' }}
								itemsInRow={{ medium: 2, large: 4 }}
								scrollItemWidth={260}
								items={ITEMS}
								renderItem={(item, i) => (
									<Chunk key={i}>
										<Card>
											<Sectionless>
												<Chunk>
													<Text weight="strong">{item.name}</Text>
													<Text type="small" color="secondary">{item.meta}</Text>
												</Chunk>
											</Sectionless>
										</Card>
									</Chunk>
								)}
							/>
						}

						{/* RECIPE: empty state */}
						{!showItems &&
							<Chunk>
								<View style={{ minHeight: '40vh', backgroundColor: SWATCHES.shade, borderRadius: METRICS.cardBorderRadius }}>
									<View style={styles.absoluteCenter}>
										<Chunk style={{ alignItems: 'center' }}>
											<Icon shape="File" size="xlarge" color={SWATCHES.textHint} />
											<Text color="hint">No results</Text>
										</Chunk>
									</View>
								</View>
							</Chunk>
						}
					</Section>
				</Bounds>
			</Stripe>

			{/* RECIPE: dark section with inverted text and frosted cards */}
			<Stripe style={{ backgroundColor: SWATCHES.backgroundDark }}>
				<Bounds>
					<Section>
						<Chunk>
							<Text type="sectionHead" inverted>Featured collections</Text>
							<Text inverted color="secondary">The inverted prop flips text for dark backgrounds.</Text>
						</Chunk>
						<List
							variant={{ small: 'scroll', large: 'grid' }}
							itemsInRow={{ large: 4 }}
							scrollItemWidth={260}
							items={ITEMS.slice(0, 4)}
							renderItem={(item, i) => (
								<Chunk key={i}>
									<Card style={{ backgroundColor: 'rgba(255,255,255,.05)', borderWidth: 0 }}>
										<Sectionless>
											<Chunk>
												<Text weight="strong" inverted>{item.name}</Text>
												<Text type="small" inverted color="secondary">{item.meta}</Text>
											</Chunk>
										</Sectionless>
									</Card>
								</Chunk>
							)}
						/>
					</Section>
				</Bounds>
			</Stripe>
		</Page>
	);
}

export default FeedRecipe;
