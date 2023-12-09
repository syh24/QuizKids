import React, {useRef, useEffect} from 'react';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import Button from '@enact/sandstone/Button';
// import AddQuiz from './AddQuiz';
import {View, Text, useState} from 'react';
import styles from './Video.module.css';
import {VirtualGridList, VirtualList} from '@enact/sandstone/VirtualList';

import QuizCreationOverlay from './QuizCreationOverlay';
import QuizSolveOverlay from './QuizSolveOverlay';

const Detail = props => {
	const [isPaused, setIsPaused] = useState(false);
	const [showQuizAddOverlay, setShowQuizAddOverlay] = useState(false); // State to control quiz add overlay
	const [showQuizSolveOverlay, setShowQuizSolveOverlay] = useState(false); // State to control quiz solve overlay
	const [currentTimestamp, setCurrentTimestamp] = useState(0);

	const [processedTimestamps, setProcessedTimestamps] = useState([]); // State to store processed timestamps(quizs)
	// const timestamps = [3, 8, 12]; // 예: 3초, 18초, 12초에 문제..

	const [quizs, setQuizs] = useState([]);
	const [quizTimeStamps, setQuizTimeStamps] = useState([]);

	const [currentQuiz, setCurrentQuiz] = useState(null);

	const [showButton, setShowButton] = useState(true); // Skip to past view history button
	const [lastViewedStopPoint, setLastViewedStopPoint] = useState(0); // State to store last viewed stop point

	const onPause = event => {
		//console.log("current time : ", Math.floor(event.currentTime)); // save paused time
		setIsPaused(true);
		setCurrentTimestamp(Math.floor(event.currentTime));
	};

	const onPlay = event => {
		setIsPaused(false);
	};

	// Handler to toggle quiz overlay
	const toggleQuizOverlay = () => {
		setShowQuizAddOverlay(current => !current);
	};

	const videoPlayerRef = useRef(null);

	const handlePause = () => {
		// VideoPlayer의 pause 메소드 호출
		console.log('Paused by handlePause!!');
		videoPlayerRef.current.pause();
	};

	const handlePlay = () => {
		console.log('Played by handlePlay!!');
		videoPlayerRef.current.play();
	};

	const [videoSrc, setVideoSrc] = useState(props.src);

	// 특정 시간으로 이동하는 함수
	const moveToTime = time => {
		console.log('Skipped!!');
		const newSrc = `${props.src}#t=${time}`;
		setVideoSrc(newSrc); // URL을 업데이트하여 비디오 리로드
		setShowButton(false); // 버튼 숨기기
	};

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		if (videoPlayerRef.current) {
	// 			const currentTime = videoPlayerRef.current.currentTime;
	// 			setCurrentTimestamp(currentTime);
	// 			console.log('current time : ', Math.floor(currentTime));

	// 			// 지정된 타임스탬프에 도달했는지 확인
	// 			if (timestamps.includes(Math.floor(currentTime))) {
	// 				videoPlayerRef.current.pause();
	// 				console.log('show quiz solve!!!');
	// 				setShowQuizSolveOverlay(true);
	// 			}
	// 		}
	// 	}, 1000); // 매 1초마다 현재 시간 업데이트

	// 	return () => clearInterval(interval);
	// }, [timestamps]);

	// Fetch quizzes when component mounts or video_id changes
	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_BACKEND_URI}/api/quiz/?video_id=${props.video_id}&count=6`
				);
				const quizData = await response.json();

				console.log(
					'Quiz data 가져옴: ',
					props.video_id,
					' id의 비디오에 대한 퀴즈 목록: ',
					quizData
				);
				setQuizs(quizData);
				const timestamps = quizData.map(quiz => parseInt(quiz.quiz_time, 10));
				console.log('timestamps: ', timestamps);
				setQuizTimeStamps(timestamps);

				// Call the function to post to videoHistories
				// postVideoHistory();
			} catch (error) {
				console.error('Error fetching quizzes:', error);
			}
		};

		// 사용자의 마지막 시청 시점을 가져오는 함수
		const fetchLastViewHistory = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_BACKEND_URI}/api/viewHistories/${props.user_id}?video_id=${props.video_id}`
				);
				const data = await response.json();

				if (data && data.length > 0) {
					console.log('Last view history:', data[0].stop_point);
					setLastViewedStopPoint(data[0].stop_point);
				}
			} catch (error) {
				console.error('Error fetching last view history:', error);
			}
		};

		// const postVideoHistory = async () => {
		// 	try {
		// 		const postData = {
		// 			user_id: props.user_id,
		// 			video_id: props.video_id,
		// 			stop_point:
		// 		};

		// 		await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/videoHistories`, {
		// 			method: 'POST',
		// 			headers: {
		// 				'Content-Type': 'application/json'
		// 			},
		// 			body: JSON.stringify(postData)
		// 		});

		// 		console.log('Posted to videoHistories successfully');
		// 	} catch (error) {
		// 		console.error('Error posting to videoHistories:', error);
		// 	}
		// };

		fetchQuizzes();
		fetchLastViewHistory();

		// // 3초 후 버튼 숨기기
		// const timer = setTimeout(() => {
		// 	setShowButton(false);
		// }, 3000);
		// return () => clearTimeout(timer);
	}, [props.video_id]);

	// 비디오 로드 완료 후 5초 뒤 버튼 숨기기
	const handleLoadedData = () => {
		const timer = setTimeout(() => {
			setShowButton(false);
		}, 5000);

		return () => clearTimeout(timer);
	};

	const handleTimeUpdate = event => {
		const currentTime = Math.floor(event.target.currentTime);
		setCurrentTimestamp(currentTime);

		// Check if the current time matches a quiz timestamp
		const quizIndex = quizTimeStamps.findIndex(time => time === currentTime);

		console.log('Aurrent time : ', Math.floor(currentTime));

		console.log('Current video playing ID: ', props.video_id);

		console.log('비교 대상인 quizTimeStamps: ', quizTimeStamps);

		// 비동기 함수를 즉시 실행
		(async () => {
			console.log('VIDEO HISTORY PUSHING...');
			try {
				const postData = {
					user_id: props.user_id,
					video_id: props.video_id,
					stop_point: currentTime
				};

				await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/viewHistories`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(postData)
				});

				console.log('Posted to videoHistories successfully');
			} catch (error) {
				console.error('Error posting to videoHistories:', error);
			}
		})();

		// 지정된 타임스탬프에 도달했는지 확인
		if (
			quizIndex !== -1 &&
			quizTimeStamps.includes(currentTime) &&
			!processedTimestamps.includes(currentTime)
		) {
			videoPlayerRef.current.pause();
			setCurrentQuiz(quizs[quizIndex]); // Set the current quiz
			setShowQuizSolveOverlay(true);
			// 현재 타임스탬프를 처리된 타임스탬프 목록에 추가
			setProcessedTimestamps(prev => [...prev, currentTime]);
		}
	};

	return (
		<div className="">
			<div
				className={`popupvideo absolute top-10 right-0 ${
					isPaused && !showQuizAddOverlay ? '' : 'hidden'
				}`}
			>
				<Button
					icon="plus"
					size="small"
					className="m-4 z-50"
					onClick={() => setShowQuizAddOverlay(true)}
					tabIndex={0}
				>
					퀴즈 추가하기
				</Button>
			</div>

			<VideoPlayer
				ref={videoPlayerRef}
				onLoadedData={handleLoadedData}
				onTimeUpdate={handleTimeUpdate}
				autoCloseTimeout={7000}
				backButtonAriaLabel="go to previous"
				feedbackHideDelay={3000}
				initialJumpDelay={400}
				jumpDelay={200}
				loop
				miniFeedbackHideDelay={2000}
				muted={false}
				title="Sandstone VideoPlayer Sample Video" // will be replaced by prop.title
				titleHideDelay={4000}
				onBack={props.onBack} // when click back button, will back to the home screen
				onPause={onPause}
				onPlay={onPlay}
				className="z-0"
			>
				<source src={videoSrc} type="video/mp4" />
				<infoComponents>
					A video about some things happening to and around some characters.{' '}
					{/* will be replaced by prob */}
					Very exciting stuff.
				</infoComponents>
				<MediaControls
					// jumpBackwardIcon="jumpbackward"
					// jumpForwardIcon="jumpforward"
					pauseIcon="pause"
					playIcon="play"
				></MediaControls>
			</VideoPlayer>
			{showButton && (
				<button
					onClick={() => moveToTime(lastViewedStopPoint)}
					className="spottable fixed bottom-36 right-12 overflow-hidden bg-primary text-white font-bold py-2 px-4 rounded flex justify-center items-center 
				transition duration-300 ease-in-out	focus:bg-primary focus:shadow-xl focus:text-black  focus:scale-110
				hover:bg-primary hover:shadow-xl hover:text-black  hover:scale-110"
					style={{
						zIndex: 1000 // z-index를 높여서 VideoPlayer 위에 표시
					}}
					onAnimationEnd={() => setShowButton(false)} // 애니메이션이 끝나면 버튼 숨기기
				>
					<span className="block z-10">이어서 풀기</span>
					<span
						className="absolute top-0 left-0 h-full bg-bold"
						style={{animation: 'fill 5s linear', zIndex: -1}}
					></span>
				</button>
			)}
			{/* <Button onClick={handlePause} className="z-50">
				PAUSE!!
			</Button> */}
			{/* Quiz Creation Overlay */}
			{showQuizAddOverlay && (
				<QuizCreationOverlay
					onClose={() => setShowQuizAddOverlay(false)}
					timestamp={currentTimestamp}
					video_id={props.video_id}
					src={props.src}
					className="z-50"
					user_id={props.user_id}
				/>
			)}
			{showQuizSolveOverlay && (
				<QuizSolveOverlay
					onClose={() => setShowQuizSolveOverlay(false)}
					timestamp={currentTimestamp}
					quiz={currentQuiz} // Pass quizs as prop
					video_id={props.video_id}
					src={props.src}
					className="z-50"
					user_id={props.user_id}
					handlePlay={handlePlay}
				/>
			)}
		</div>
	);
};

export default Detail;
