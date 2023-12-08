import BodyText from '@enact/sandstone/BodyText';
import Media from './Media';
import {useState, useEffect} from 'react';
import Detail from './Detail';

const EMPTY = 0;

const History = ({userID}) => {
	const [currentVideoSrc, setCurrentVideoSrc] = useState('');
	const [viewHistory, setViewHistory] = useState([]);
	const [quizHistory, setQuizHistory] = useState([]);
	const [videoIdx, setVideoIdx] = useState([]);
	const [quizIdx, setQuizIdx] = useState([]);

	const [viewSrc, setViewSrc] = useState([]);
	const [quizSrc, setQuizSrc] = useState([]);

	const getViewHistories = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URI}/api/viewHistories/${userID}`
			);
			const data = await response.json();
			
			setViewHistory(data);
			if(data.length === EMPTY) return;

			// view history video idx 가져오기
			const videoIds = data.map(item => item.video_id);
			console.log(videoIds);
			const viewSubQuery = `video_id=${videoIds.join(',')}`;

			console.log(viewSubQuery);
			//setVideoIdx(videoIds);

			// history video fetch
			const viewResponse = await fetch(
				`${process.env.REACT_APP_BACKEND_URI}/api/videos?${viewSubQuery}`
			);
			const viewData = await viewResponse.json();
			console.log('view Data', viewData);
			setViewSrc(viewData);

		} catch (error) {
			console.log('Eror fetching videos:', error);
		}
	};

	const getQuizHistories = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URI}/api/quiz?user_id=${userID}&order_by=updatedAt&order_type=DESC`
			);
			const data = await response.json();
			
			if(data.length === EMPTY) return;

			setQuizHistory(data);

			// quiz history video idx 가져오기
			const quizIds = [...new Set(data.map(item => item.video_id))]; // 중복 비디오 제거
			const quizSubQuery = `video_id=${quizIds.join(',')}`;
			
			console.log('quisSubQuery', quizSubQuery);
			
			const viewResponse = await fetch(
				`${process.env.REACT_APP_BACKEND_URI}/api/videos?${quizSubQuery}`
			);

			const viewData = await viewResponse.json();
			setQuizSrc(viewData);
			console.log('quiz data', viewData);
		} catch (error) {
			console.log('Eror fetching videos:', error);
		}
	};

	useEffect(()=>{getViewHistories();}, []);
	useEffect(()=>{getQuizHistories();}, []);

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
							{viewSrc.map((video, index) => (
								<div key={index} className="mr-2 flex-shrink-0">
									<Media
										onClick={() => handleVideoSelect(video.url_link)}
										onKeyDown={event => handleKeyPress(event, video.url_link)}
										idx={index}
										src={video.url_link}
										thumbSrc={video.thumbnail}
									/>
								</div>
							))}
						</div>
					</div>

					<div className="h-56">
						<BodyText>내 퀴즈 동영상</BodyText>
						<div className="flex overflow-x-auto whitespace-nowrap h-full no-scrollbar">
							{quizSrc.map((video, index) => (
								<div key={index} className="mr-2 flex-shrink-0">
									<Media
										onClick={() => handleVideoSelect(video.url_link)}
										onKeyDown={event => handleKeyPress(event, video.url_link)}
										idx={index}
										src={video.url_link}
										thumbSrc={video.thumbnail}
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
