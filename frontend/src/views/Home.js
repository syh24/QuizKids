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

const Home = () => {
	return (
		<>
			<BodyText>{$L('Video List')}</BodyText>	
			<Scroller direction='vertical'>
				<div style={{display: 'flex', flexWrap: 'wrap', }}>
					<Media src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
					<Media src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
					<Media src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" />
					<Media src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" />
					<Media src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" />
					<Media src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" />
					<Media src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" />
					<Media src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" />
					<Media src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4" />
					<Media src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" />
					<Media src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4" />
					<Media src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4" />
					<Media src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4" />	
				</div>
			</Scroller>
		</>
	);
};

export default Home;
