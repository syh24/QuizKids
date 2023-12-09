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
import {useState, useEffect} from 'react';
import Detail from './Detail';

const Home = ({user_id}) => {
	const [currentVideoSrc, setCurrentVideoSrc] = useState('');
	const [currentVideoId, setCurrentVideoId] = useState('');

	const [videoSources, setVideoSources] = useState([
		// 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
		// 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
		// 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
		// 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
		// 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
		// 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
		// 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
		// 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
		// 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
		// 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
		// 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
		// 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
		// 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
	]);

	const fetchVideos = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URI}/api/videos/`
			);
			const data = await response.json();
			// const videoUrls = data.map(video => video.url_link);
			setVideoSources(data);
		} catch (error) {
			console.log('Eror fetching videos:', error);
		}
	};

	const getQuizByVideoId = async video_id => {
		const quizs = await (
			await fetch(
				`${process.env.REACT_APP_BACKEND_URI}/api/quiz/?video_id=${video_id}&count=6`
			)
		).json();

		//setMovies(json.data.movies);
		console.log('quizs:======================', quizs);
		return quizs;
	};

	// Updated to accept src directly
	const handleVideoSelect = video => {
		setCurrentVideoSrc(video ? video.url_link : '');
		setCurrentVideoId(video ? video.id : '');
	};

	const handleKeyPress = (event, src) => {
		if (event.key === 'Enter') {
			handleVideoSelect(src);
		}
	};

	// Use useEffect to fetch videos on component mount
	useEffect(() => {
		fetchVideos();
	}, []);

	return (
		<>
			{currentVideoSrc === '' ? (
				<>
					<div className="h-56 mt-12">
						<BodyText># 최신_영상 🔥</BodyText>
						<div className="flex overflow-x-auto  whitespace-nowrap h-full no-scrollbar">
							{videoSources.map((video, index) => (
								<div key={index} className="mr-2 flex-shrink-0">
									<Media
										onClick={() => handleVideoSelect(video)}
										onKeyDown={event => handleKeyPress(event, video.url_link)}
										idx={video.id}
										src={video.url_link}
										thumbSrc={video.thumbnail}
									/>
								</div>
							))}
						</div>
					</div>

					<div className="h-56">
						<BodyText>@헤이지니 Hey Jini님의 최신 영상</BodyText>
						<div className="flex overflow-x-auto whitespace-nowrap h-full no-scrollbar">
							{videoSources.map((video, index) => (
								<div key={index} className="mr-2 flex-shrink-0">
									<Media
										onClick={() => handleVideoSelect(video)}
										onKeyDown={event => handleKeyPress(event, video.url_link)}
										idx={video.id}
										src={video.url_link}
										thumbSrc={video.thumbnail}
									/>
								</div>
							))}
						</div>
					</div>
					<div className="h-56">
						<BodyText>#Quiz가_많은_영상 👀</BodyText>
						<div className="flex overflow-x-auto whitespace-nowrap h-full no-scrollbar">
							{videoSources.map((video, index) => (
								<div key={index} className="mr-2 flex-shrink-0">
									<Media
										onClick={() => handleVideoSelect(video)}
										onKeyDown={event => handleKeyPress(event, video.url_link)}
										idx={video.id}
										src={video.url_link}
										thumbSrc={video.thumbnail}
									/>
								</div>
							))}
						</div>
					</div>
				</>
			) : (
				<Detail
					src={currentVideoSrc}
					video_id={currentVideoId}
					onBack={() => handleVideoSelect('')}
					user_id={user_id}
				/>
			)}
		</>
	);
};

export default Home;
