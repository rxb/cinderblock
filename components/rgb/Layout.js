import React, { Fragment, useState, useEffect, useRef, useContext } from 'react';

import {
	Avatar,
	Bounds,
	Button,
	Card,
	CheckBox,
	Chunk,
	Flex,
	FlexItem,
	Header,
	Icon,
	Inline,
	Image,
	LoadingBlock,
	Link,
	List,
	Tabs,
	Touch,
	Menu,
	Modal,
	Picker,
	RevealBlock,
	Section,
	Sectionless,
	Stripe,
	Text,
	TextInput,
	View,
	ThemeContext
} from 'cinderblock';


const SiteMenu = (props) => {
	const { styles, SWATCHES, METRICS } = useContext(ThemeContext);
   return(
		<>
			<Chunk>
				<Text weight="strong">Home</Text>
				<Text color="secondary">Projects</Text>
				<Text color="secondary">Blog</Text>
				<Text color="secondary">About</Text>
			</Chunk> 
			<Chunk>
				<Inline>
					<Button 
						shape="Twitter"
						color="secondary"
						size="small"
						/>
					<Button 
						shape="Instagram"
						color="secondary"
						size="small"
						/> 
					<Button 
						shape="GitHub"
						color="secondary"
						size="small"
						/>        
				</Inline>           
			</Chunk>
		</>
	)
}

const SiteLogo = (props) => {
	const { styles, SWATCHES, METRICS } = useContext(ThemeContext);
	const {
		style = {}
	} = props;
   return(
		<Image 
			source={{uri: 'computer.png'}} 
			resizeMode="contain" 
			style={style} 
			/>
	);
}

const Layout = (props) => {
	const { styles, ids, SWATCHES, METRICS } = useContext(ThemeContext);

   return(
			<Flex direction="row" flush>
				<FlexItem 
					shrink 
					flush 
					style={styles['hide']}
					dataSet={{ media: ids["showAt__large"] }}
					>
					<Stripe style={{borderRightWidth: 1, borderRightColor: SWATCHES.border, minHeight: '100%'}}>
						<View style={{minWidth: 240, position: 'sticky', top: 20}}>
							<Section style={{alignItems: 'flex-start'}}>
								<SiteLogo style={{width: 118, height: 118, marginTop: -14, marginBottom: 19}} />
								<Chunk>
									<Text weight="strong">Richard Boenigk</Text>
									<Text color="secondary">Hacking + Designing</Text>
								</Chunk>
							</Section>
							<Section border>
								<SiteMenu />
							</Section>
						</View>
					</Stripe> 
				</FlexItem>
				<FlexItem flush>
					<View dataSet={{ media: ids["hideAt__large"] }}>
						<Header 
							position="static"
							type="separated"
							>
							<Flex flush>
								<FlexItem shrink flush justify="center">
									<SiteLogo style={{width: 45, height: 45, marginTop: -2, marginRight: 12}} />
								</FlexItem>
								<FlexItem flush justify="center">
									<Text weight="strong" type="small">rgb.work</Text>
									<Text color="secondary" type="micro">Hacking + Designing</Text>
								</FlexItem>
								<FlexItem shrink flush  justify="center">
									<Icon 
										shape="Menu"
										/>
								</FlexItem>
							</Flex>
						</Header>
					</View>
					{props.children}
            </FlexItem>
         </Flex>
   )
}

export default Layout;