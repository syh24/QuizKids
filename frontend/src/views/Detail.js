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
				postVideoHistory();
			} catch (error) {
				console.error('Error fetching quizzes:', error);
			}
		};

		const postVideoHistory = async () => {
			try {
				const postData = {
					user_id: props.user_id,
					video_id: props.video_id
				};

				await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/videoHistories`, {
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
		};

		fetchQuizzes();
	}, [props.video_id]);

	const handleTimeUpdate = event => {
		const currentTime = Math.floor(event.target.currentTime);
		setCurrentTimestamp(currentTime);

		// Check if the current time matches a quiz timestamp
		const quizIndex = quizTimeStamps.findIndex(time => time === currentTime);

		console.log('Aurrent time : ', Math.floor(currentTime));

		console.log('Current video playing ID: ', props.video_id);

		console.log('비교 대상인 quizTimeStamps: ', quizTimeStamps);
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
				spotlightDisabled={showQuizAddOverlay}
			>
				<source src={props.src} type="video/mp4" />
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
