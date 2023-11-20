import React, {useState, useRef, useEffect} from 'react';

import TabLayout, {Tab} from '@enact/sandstone/TabLayout';
import {Header, Panel} from '@enact/sandstone/Panels';
import $L from '@enact/i18n/$L';
import Home from './Home';
import Account from './Account';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Icon from '@enact/sandstone/Icon';
import MediaOverlay from '@enact/sandstone/MediaOverlay';
import ImageItem from '@enact/ui/ImageItem';
import { VirtualGridList } from '@enact/sandstone/VirtualList';

// hover 상태에 따라 video를 제어하는 Component
const HoverVideoOverlay = ({src, ...rest}) => {
	const [isHovering, setIsHovering] = useState(false);
	const videoRef = useRef(null);

	const handleMouseEnter = () => {
		setIsHovering(true);
		if (videoRef.current) {
			videoRef.current.play();
		}
	};

	const handleMouseLeave = () => {
		setIsHovering(false);
		if (videoRef.current) {
			videoRef.current.pause();
		}
	};

	return (
		<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<MediaOverlay {...rest}>
				<video ref={videoRef} muted loop>
					<source src={src} type="video/mp4" />
				</video>
			</MediaOverlay>
		</div>
	);
};

const Main = props => {
	return (
		<Panel>	
			<Header title="Quiz App" closeButtonBackgroundOpacity="transparent">
				<Button size="small" icon="profile" slot="slotAfter" />
			</Header>
			<TabLayout
				onSelect={function noRefCheck() {}}
				onTabAnimationEnd={function noRefCheck() {}}
				orientation="vertical"
				tabSize={null}
			>
				<Tab title={$L('Home')} icon="home">
					<Home />
				</Tab>
				<Tab icon="gear" title="Settings">
					<Button icon="demosync">Button 1</Button>
				</Tab>
				<Tab icon="list" title="History">
					<Item slotBefore={<Icon>playcircle</Icon>}>Single Item</Item>
				</Tab>
			</TabLayout>
		</Panel>
	);
};
export default Main;
