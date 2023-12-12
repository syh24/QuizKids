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

	const [videoSources, setVideoSources] = useState([]);
	const [popularVideoSources, setPopularVideoSources] = useState([]);
	const [idVideoSources, setIdVideoSources] = useState([]);

	const [popularId, setPopularId] = useState('');

	const fetchVideos = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URI}/api/videos?order_by=createdAt&order_type=desc`
			);
			const data = await response.json();
			// const videoUrls = data.map(video => video.url_link);
			setVideoSources(data);
		} catch (error) {
			console.log('Eror fetching videos:', error);
		}
	};

	// 조회수 많은 영상
	const fetchPopularVideos = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URI}/api/videos?order_by=hit&order_type=desc`
			);
			const data = await response.json();
			// const videoUrls = data.map(video => video.url_link);
			setPopularVideoSources(data);
		} catch (error) {
			console.log('Eror fetching videos:', error);
		}
	};

	// 인기 있는 사람의 영상
	const fetchIdVideos = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URI}/api/videos/${user_id}/favorite`
			);
			const data = await response.json();

			const fetchedPopularId = data[0].user_id; // 여기서 가져온 ID를 저장
			setPopularId(data[0].nickname);

			console.log('fetchedPopularId: ', fetchedPopularId); // 바로 사용 가능

			// 다음 fetch 호출에서 fetchedPopularId 사용
			const responseVideos = await fetch(
				`${process.env.REACT_APP_BACKEND_URI}/api/videos?user_id=${fetchedPopularId}`
			);
			const videosData = await responseVideos.json();
			setIdVideoSources(videosData);
		} catch (error) {
			console.log('Error fetching videos:', error);
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
		fetchPopularVideos();
		fetchIdVideos();
	}, []);

	return (
		<>
			{currentVideoSrc === '' ? (
				<>
					<div className="h-56 mt-12">
						<BodyText># 최신_영상</BodyText>
						<div className="flex overflow-x-auto  whitespace-nowrap h-full no-scrollbar">
							{videoSources.map((video, index) => (
								<div key={index} className="mr-2 flex-shrink-0">
									<Media
										onClick={() => handleVideoSelect(video)}
										onKeyDown={event => handleKeyPress(event, video.url_link)}
										idx={video.id}
										src={video.url_link}
										thumbSrc={video.thumbnail}
										name={video.name}
									/>
								</div>
							))}
						</div>
					</div>

					<div className="h-56">
						<BodyText># 조회수가_많은_영상</BodyText>
						<div className="flex overflow-x-auto whitespace-nowrap h-full no-scrollbar">
							{popularVideoSources.map((video, index) => (
								<div key={index} className="mr-2 flex-shrink-0">
									<Media
										onClick={() => handleVideoSelect(video)}
										onKeyDown={event => handleKeyPress(event, video.url_link)}
										idx={video.id}
										src={video.url_link}
										thumbSrc={video.thumbnail}
										name={video.name}
									/>
								</div>
							))}
						</div>
					</div>
					<div className="h-56">
						<BodyText>
							#자주_보는_
							<span className="italic font-extrabold">@{popularId}</span>님의
							최신 영상
						</BodyText>
						<div className="flex overflow-x-auto whitespace-nowrap h-full no-scrollbar">
							{idVideoSources.map((video, index) => (
								<div key={index} className="mr-2 flex-shrink-0">
									<Media
										onClick={() => handleVideoSelect(video)}
										onKeyDown={event => handleKeyPress(event, video.url_link)}
										idx={video.id}
										src={video.url_link}
										thumbSrc={video.thumbnail}
										name={video.name}
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
