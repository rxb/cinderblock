import React, { useMemo, useState } from 'react';

import {
	Bounds,
	Button,
	Chunk,
	Flex,
	FlexItem,
	Inline,
	Link,
	List,
	Section,
	Stripe,
	Text,
	TextInput,
	View,
} from '@cinderblock/design-system';

import Page from '@/components/Page';

const RECORDS = [
	{ id: 1, name: 'Ada Lovelace', summary: '12 recent updates', context: 'Last active today' },
	{ id: 2, name: 'Grace Hopper', summary: '8 recent updates', context: 'Last active yesterday' },
	{ id: 3, name: 'Katherine Johnson', summary: '15 recent updates', context: 'Last active Monday' },
	{ id: 4, name: 'Margaret Hamilton', summary: '6 recent updates', context: 'Last active last week' },
];

function DirectoryRecipe() {
	const [searchActive, setSearchActive] = useState(false);
	const [query, setQuery] = useState('');

	const visibleRecords = useMemo(() => {
		const normalizedQuery = query.trim().toLocaleLowerCase();
		if(!normalizedQuery){
			return RECORDS;
		}

		return RECORDS.filter(record =>
			record.name.toLocaleLowerCase().includes(normalizedQuery)
		);
	}, [query]);

	const closeSearch = () => {
		setQuery('');
		setSearchActive(false);
	};

	return (
		<Page title="Record directory recipe — Cinderblock Kitchensink">
			<Stripe>
				<Bounds>
					<Section>
						{searchActive ? (
							<View accessibilityRole="search">
								<Chunk>
									<TextInput
										autoFocus
										accessibilityLabel="Search records"
										placeholder="Search by name"
										value={query}
										onChange={event => setQuery(event.target.value)}
									/>
								</Chunk>
								<Chunk>
									<Button
										label="Cancel"
										color="secondary"
										width="snap"
										onPress={closeSearch}
									/>
								</Chunk>
							</View>
						) : (
							<>
								<Chunk>
									<Text type="pageHead">Records</Text>
									<Text color="secondary">
										{RECORDS.length} active records
									</Text>
								</Chunk>
								<Chunk>
									<Inline nowrap>
										<Button
											shape="Search"
											accessibilityLabel="Search records"
											onPress={() => setSearchActive(true)}
										/>
										<Button
											href="/recipes/form"
											label="Add record"
											width="snap"
										/>
									</Inline>
								</Chunk>
							</>
						)}

						{searchActive ? (
							<Chunk>
								<Text color="secondary">
									{visibleRecords.length}{' '}
									{visibleRecords.length === 1 ? 'record' : 'records'} shown
								</Text>
							</Chunk>
						) : null}

						{visibleRecords.length ? (
							<List
								variant="linear"
								items={visibleRecords}
								renderItem={record => (
									<Flex direction="column" switchDirection="large">
										<FlexItem>
											<Link href="/recipes/detail">
												<Text weight="strong">{record.name}</Text>
											</Link>
										</FlexItem>
										<FlexItem>
											<Text>{record.summary}</Text>
										</FlexItem>
										<FlexItem>
											<Text color="secondary">{record.context}</Text>
										</FlexItem>
									</Flex>
								)}
							/>
						) : (
							<Chunk>
								<Text>No records match “{query.trim()}”.</Text>
							</Chunk>
						)}
					</Section>
				</Bounds>
			</Stripe>
		</Page>
	);
}

export default DirectoryRecipe;
