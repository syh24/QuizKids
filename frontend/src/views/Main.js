import React, {useState, useRef, useEffect} from 'react';

import TabLayout, {Tab} from '@enact/sandstone/TabLayout';
import {Header, Panel} from '@enact/sandstone/Panels';
import $L from '@enact/i18n/$L';
import Home from './Home';
// import Account from './Account';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Icon from '@enact/sandstone/Icon';
import imgsrc_ from './cat_1.png';
import imgsrc__ from './cat_2.png';
import imgsrc___ from './penguin.png';
import imgsrc____ from './dog.png';
import imgsrc_____ from './dog_1.png';
import Account from './Account';
import Profile from './Profile';
import MediaOverlay from '@enact/sandstone/MediaOverlay';

const imagePaths = ['src/views/dog.png', 'src/views/dog_1.png', 'src/views/cat_1.png', 'src/views/cat_2.png', 'src/views/penguin.png'];

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
	const [imgIdx, setImgIdx] = useState(0);
	
	const onClick = () => {
		console.log('hello');
	};

	const setProfile = (idx) => {
		setImgIdx(idx);
	}

	return (
		<Panel className="bg-white">
			{/* <Header title="Quiz App" closeButtonBackgroundOpacity="transparent">
				<Button
					size="small"
					icon="profile"
					slot="slotAfter"
					onClick={onClick}
				/>
			</Header> */}
			<TabLayout
				onSelect={function noRefCheck() {}}
				onTabAnimationEnd={function noRefCheck() {}}
				orientation="vertical"
				tabSize={null}
			>

				<Tab title="Profile" icon={imagePaths[imgIdx]}>
					<Profile imgSrc={imagePaths[imgIdx]} nickName="nickName" sex="M" userAge="0" setProfile={setProfile}/>
				</Tab>
				<Tab title={$L('Home')} icon="home">
					<Home />
				</Tab>
				<Tab icon="gear" title="Settings">
					<Button icon="demosync">Button 1</Button>
					<Button icon="demosync">Button 2</Button>
					<Button icon="demosync">Button 3</Button>
					<Button icon="demosync">Button 4</Button>
					<Button icon="demosync">Button 5</Button>
				</Tab>
				<Tab icon="list" title="History">
					<Item slotBefore={<Icon>playcircle</Icon>}>Single Item</Item>
				</Tab>
				<Tab icon="profile" title="login"> 
					<Account />
				</Tab>
			</TabLayout>
		</Panel>
	);
};

export default Main;
export {imagePaths};