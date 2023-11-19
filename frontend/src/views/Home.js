import Alert from '@enact/sandstone/Alert';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import css from './Main.module.less';
import $L from '@enact/i18n/$L';
import {useConfigs} from '../hooks/configs';
import {usePopup} from './HomeState';
import {VirtualGridList, VirtualList} from '@enact/sandstone/VirtualList';
import Media from './Media';
import ImageItem from '@enact/sandstone/ImageItem';
import Scroller from '@enact/ui/Scroller';
import MediaOverlay from '@enact/sandstone/MediaOverlay';
import { useState } from 'react';
import Detail from './Detail';

const Home = () => {
	const [currentVideoSrc, setCurrentVideoSrc] = useState("");
	const [videoSources, setVideoSources] = useState([
		"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
		"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
		"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
		"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
		"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
		"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
		"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
		"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
		"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
		"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
		"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
	])
	
	const onClickVideo = (event) => {
		currentVideoSrc === "" ? setCurrentVideoSrc(event.target.currentSrc) : setCurrentVideoSrc("");
	};

	return (
		<>
		{currentVideoSrc === "" ? 
			(
				<>
					<BodyText>{$L('Video List')}</BodyText>
					<Scroller direction='vertical'>
					<div style={{ display: 'flex', flexWrap: 'wrap' }}>
						{videoSources.map((src, index) => (
						<Media onClick={onClickVideo} idx={index} src={src} key={index} />
						))}
					</div>
					</Scroller>
				</>
			) : 
			(
				<Detail src={currentVideoSrc} onBack={onClickVideo}/>
			)
		}
		</>
	);
};

export default Home;
