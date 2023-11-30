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
import {useState} from 'react';
import Detail from './Detail';

const History = () => {
	const [currentVideoSrc, setCurrentVideoSrc] = useState('');
	const [videoSources, setVideoSources] = useState([
		'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
		'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
		'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
		'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
		'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
		'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
		'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
		'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
		'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
		'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
		'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
		'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
		'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
	]);

	// Updated to accept src directly
	const handleVideoSelect = src => {
		setCurrentVideoSrc(src ? src : '');
	};

	const handleKeyPress = (event, src) => {
		if (event.key === 'Enter') {
			handleVideoSelect(src);
		}
	};

	return (
		<>
			{currentVideoSrc === '' ? (
				<>
					<div className="h-56">
						<BodyText>내가 본 동영상</BodyText>
						<div className="flex overflow-x-auto  whitespace-nowrap h-full no-scrollbar">
							{videoSources.map((src, index) => (
								<div key={index} className="mr-2 flex-shrink-0">
									<Media
										onClick={() => handleVideoSelect(src)}
										onKeyDown={event => handleKeyPress(event, src)}
										idx={index}
										src={src}
									/>
								</div>
							))}
						</div>
					</div>

					<div className="h-56">
						<BodyText>내 퀴즈 동영상</BodyText>
						<div className="flex overflow-x-auto whitespace-nowrap h-full no-scrollbar">
							{videoSources.map((src, index) => (
								<div key={index} className="mr-2 flex-shrink-0">
									<Media
										onClick={() => handleVideoSelect(src)}
										onKeyDown={event => handleKeyPress(event, src)}
										idx={index}
										src={src}
									/>
								</div>
							))}
						</div>
					</div>
				</>
			) : (
				<Detail src={currentVideoSrc} onBack={() => handleVideoSelect('')} />
			)}
		</>
	);
};

export default History;
