import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToast, closePopover, openPopover, openPrompt } from '@/actions';

import {
	Avatar,
	Bounds,
	Button,
	Chunk,
	Flex,
	FlexItem,
	Icon,
	Inline,
	Section,
	Stripe,
	Text,
	View,
	ThemeContext,
	Popover,
	PopoverItem,
} from '@cinderblock/design-system';

import Page from '@/components/Page';

const ACTIONS_MENU_ID = 'recipe-actions';

function DetailRecipe() {
	const dispatch = useDispatch();
	const { SWATCHES } = useContext(ThemeContext);
	// Only the open popover's id is stored; opening a prompt closes it.
	const actionsOpen = useSelector((state) => state.layers.popover?.id === ACTIONS_MENU_ID);

	return (
		<Page title="Detail page recipe — Cinderblock Kitchensink">
			{/* RECIPE: detail page with responsive action sidebar.
			    Main content and sidebar sit side-by-side >= large,
			    and stack (content first) below that. */}
			<Stripe style={{ backgroundColor: SWATCHES.notwhite }}>
				<Bounds>
					<Flex direction="column" switchDirection="large">

						{/* main column: ordinary content belongs in Section */}
						<FlexItem>
							<Section>
								<Chunk>
									<Text type="pageHeadKicker">Recipe</Text>
									<Text type="pageHead">Chocolate babka</Text>
								</Chunk>
								<Chunk>
									<Text>
										A rich, swirled yeast bread. This Section is the main
										content column; it grows to fill available space while
										the sidebar shrinks to fit its content.
									</Text>
								</Chunk>
								<Chunk>
									<Text>
										Resize the window: below the &quot;large&quot; breakpoint the
										sidebar drops beneath the main content.
									</Text>
								</Chunk>
							</Section>
						</FlexItem>

						{/* sidebar: a peer responsive region with its own Section */}
						<FlexItem shrink>
							<Section>
								<View style={{ minWidth: 320 }}>

									{/* primary actions row */}
									<Chunk>
										<Flex nbsp>
											<FlexItem nbsp>
												<Button
													shape="Heart"
													color="secondary"
													width="full"
													onPress={() => dispatch(addToast('Saved!'))}
												/>
											</FlexItem>
											<FlexItem nbsp>
												<Button
													shape="Share2"
													color="secondary"
													width="full"
													onPress={() => dispatch(addToast('Link copied'))}
												/>
											</FlexItem>
											<FlexItem nbsp>
												<Popover
													open={actionsOpen}
													onRequestOpen={() => dispatch(openPopover(ACTIONS_MENU_ID))}
													onRequestClose={() => dispatch(closePopover(ACTIONS_MENU_ID))}
													accessibilityLabel="More actions"
													width={200}
													renderTrigger={(triggerProps) => (
														<Button
															{...triggerProps}
															shape="MoreVertical"
															color="secondary"
															width="full"
															accessibilityLabel="More actions"
														/>
													)}
												>
													<PopoverItem onPress={() => dispatch(addToast('Reported. Thanks!'))}>
														Report
													</PopoverItem>
													{/* The prompt is registered by kind in components/LayerHost.js */}
													<PopoverItem onPress={() => dispatch(openPrompt('delete-recipe'))}>
														Delete
													</PopoverItem>
												</Popover>
											</FlexItem>
										</Flex>
									</Chunk>

									{/* divider rows via Chunk border */}
									<Chunk border>
										<Flex>
											<FlexItem>
												<Text weight="strong">Comments (12)</Text>
												<Text type="small" color="secondary">Join the discussion</Text>
											</FlexItem>
											<FlexItem shrink justify="center">
												<Icon shape="ChevronRight" color={SWATCHES.textHint} />
											</FlexItem>
										</Flex>
									</Chunk>
									<Chunk border>
										<Flex>
											<FlexItem shrink justify="center">
												<Avatar size="mid" source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} />
											</FlexItem>
											<FlexItem justify="center">
												<Text weight="strong">Maintained by Ada</Text>
												<Text type="small" color="secondary">Last updated last week</Text>
											</FlexItem>
										</Flex>
									</Chunk>

									{/* label / value line items */}
									<Chunk border>
										<Flex>
											<FlexItem><Text color="secondary">Prep time</Text></FlexItem>
											<FlexItem shrink><Text>45 min</Text></FlexItem>
										</Flex>
										<Flex>
											<FlexItem><Text color="secondary">Servings</Text></FlexItem>
											<FlexItem shrink><Text>8</Text></FlexItem>
										</Flex>
									</Chunk>

								</View>
							</Section>
						</FlexItem>
					</Flex>
				</Bounds>
			</Stripe>
		</Page>
	);
}

export default DetailRecipe;
