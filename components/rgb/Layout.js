import React, { Fragment, useState, useEffect, useRef, useContext } from 'react';
import Head from "next/head";
import {useRouter} from 'next/router'
import { connect, useDispatch, useSelector } from 'react-redux';
import { updateUi } from '@/actions';

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


export const SiteMenu = (props) => {
	const { styles, SWATCHES, METRICS } = useContext(ThemeContext);
	const router = useRouter()
	const { version = 'mobile' } = props;

	let menuItems = [
		{path: "/", label: "Home"},
		{path: "/projects", label: "Projects"},
		{path: "/blog", label: "Blog"},
		{path: "/about", label: "About"},
	];
	menuItems = menuItems.map((m, i)=>{
		if(m.path == router.pathname){
			m.active = true;
		}
		return m;
	});
	

   return(
		<>
			<Chunk>
				{ menuItems.map((m, i)=>{
					return(
						<Link href={m.path}>
							<Text 
								style={[ 
									(version == 'mobile' && i>0) ? {marginTop: 12} : {}
								]}
								type={ (version == 'mobile') ? 'sectionHead' : 'body' }
								//weight={m.active ? 'strong' : ''}
								//color={m.active ? 'primary' : 'secondary'}
								>{m.label}</Text>
						</Link>

					);
				})}

			</Chunk> 
			<Chunk>
				<Inline>
					<Button 
						shape="Twitter"
						color="secondary"
						size="small"
						href="https://twitter.com/richardboenigk"
						style={(version == 'mobile') ? {marginRight: 2} : {}}
						/>
					<Button 
						shape="Instagram"
						color="secondary"
						size="small"
						href="https://instagram.com/rbgk"
						style={(version == 'mobile') ? {marginRight: 2} : {}}
						/> 
					<Button 
						shape="GitHub"
						color="secondary"
						size="small"
						href="https://github.com/rxb"
						style={(version == 'mobile') ? {marginRight: 2} : {}}
						/>        
				</Inline>           
			</Chunk>
		</>
	)
}

export const SiteLogo = (props) => {
	const {
		style = {},
		activeScreen = false
	} = props;

	const defaultImage = 'computer.png';
	//const activeImage = 'computer_christmas.png';
	const activeImage = 'computer_dinosaur.png';


	const [imageSrc, setImageSrc] = useState(defaultImage);
	const activateScreen = () => {
		setImageSrc(activeImage)
	}
	const deActivateScreen = () => {
		if(!activeScreen){
			setImageSrc(defaultImage)
		}
	}
	useEffect(()=>{
		if(activeScreen){
			activateScreen();
		}
		else{
			deActivateScreen();
		}
	}, [activeScreen])

   return(
		<>
			<Head>
				<link
					rel="preload"
					href={activeImage}
					as="image"
				/>
			</Head>
			<View
				onMouseOver={activateScreen}
				onMouseOut={deActivateScreen}
				>
				<Image 
					source={{uri: imageSrc}} 
					resizeMode="contain" 
					style={style} 
					/>
			</View>
		</>
	);
}

export const NarrowMenu = (props) => {
	const { styles, SWATCHES, METRICS } = useContext(ThemeContext);
	const ui = useSelector(state => state.ui);
	const [visible, setVisible] = useState(false);
	const [displayBlock, setDisplayBlock] = useState(false);
	useEffect(()=>{
		if(ui.siteMenuOverlayActive){
			setDisplayBlock(true);
			setTimeout(()=>{
				setVisible(true);
			}, 5);
		}
		else{
			setVisible(false);
			setTimeout(()=>{
				setDisplayBlock(false);
			}, 300);
		}
	}, [ui.siteMenuOverlayActive]);
	return(
		<Stripe style={{
			backgroundColor: 'white', 
			position: 'absolute',
			top: 0, left: 0, right: 0,
			shadowColor: 'rgba(0,0,0,.35)',
			shadowRadius: 25,
			transitionProperty: "all",
			transitionDuration: "250ms",
			transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
			opacity: visible ? 1 : 0,
			transform:[
				{translateY: visible ? 0 : -10},
			],
			display: displayBlock ? 'block' : 'none'
			}}>
				<Section style={{
					marginTop: 60,
					paddingBottom: '0px!important',
					borderTopWidth: 1,
					borderTopColor: SWATCHES.border,
				}}>
				<View>
					<SiteMenu version="mobile" />
				</View>
				</Section>
		</Stripe>
	);
}

export const Layout = (props) => {
	const { styles, ids, SWATCHES, METRICS } = useContext(ThemeContext);
	const dispatch = useDispatch();
	const ui = useSelector(state => state.ui);

   return(
			<Flex direction="row" flush style={{flex: 1, maxWidth: 1000, alignSelf: 'center'}}>
				<FlexItem 
					shrink 
					flush 
					style={styles['hide']}
					dataSet={{ media: ids["showAt__large"] }}
					>
					<Stripe style={{borderRightWidth: 1, borderRightColor: SWATCHES.border, minHeight: '100%'}}>
						<View style={{minWidth: 240, position: 'sticky', top: 20}}>
							<Link href="/">
							<Section style={{alignItems: 'flex-start'}}>
								<SiteLogo style={{width: 118, height: 118, marginTop: -14, marginBottom: 19}} />
								<Chunk>
									<Text weight="strong">Richard Boenigk</Text>
									<Text color="secondary">Hacking + Designing</Text>
								</Chunk>
							</Section>
							</Link>
							<Section border>
								<SiteMenu version="desktop" />
							</Section>
						</View>
					</Stripe> 
				</FlexItem>
				<FlexItem flush>
					<View dataSet={{ media: ids["hideAt__large"] }} style={{zIndex: 2}}>
						<Header 
							position="static"
							type="transparent"
							>
							<Flex flush>
								<FlexItem flush>
									<Link href="/">
										<Flex flush>
										<FlexItem shrink flush justify="center">
											<SiteLogo 
												activeScreen={ui.siteMenuOverlayActive}
												style={{
													width: 45, 
													height: 45, 
													marginTop: -2, 
													marginRight: 12, 
													marginLeft: 5
												}} 
												/>
										</FlexItem>
										<FlexItem flush justify="center">
											
											<Text weight="strong" type="small">rgb.work</Text>
											<Text color="secondary" type="micro">Hacking + Designing</Text>
										</FlexItem>
									</Flex>
								</Link>
								</FlexItem>
								<FlexItem shrink justify="center">
									<Touch
										onPress={()=>{
											dispatch(updateUi({ siteMenuOverlayActive: !ui.siteMenuOverlayActive}))
										}}>
										<View >
										<Icon 
											shape={ui.siteMenuOverlayActive ? 'X' : 'Menu'}
											/>
										</View>
									</Touch>
								</FlexItem>
							</Flex>
						</Header>
						<NarrowMenu />
					</View>
					{props.children}
            </FlexItem>
         </Flex>
   )
}