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
	const timestamps = [3, 8, 12]; // 예: 3초, 18초, 12초에 문제..

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
		videoPlayerRef.current.pause();
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

	const handleTimeUpdate = event => {
		const currentTime = Math.floor(event.target.currentTime);
		setCurrentTimestamp(currentTime);
		console.log('Aurrent time : ', Math.floor(currentTime));

		// 지정된 타임스탬프에 도달했는지 확인
		if (
			timestamps.includes(currentTime) &&
			!processedTimestamps.includes(currentTime)
		) {
			videoPlayerRef.current.pause();
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
			<Button onClick={handlePause} className="z-50">
				PAUSE!!
			</Button>
			{/* Quiz Creation Overlay */}
			{showQuizAddOverlay && (
				<QuizCreationOverlay
					onClose={() => setShowQuizAddOverlay(false)}
					timestamp={currentTimestamp}
					video_id={props.video_id}
					src={props.src}
					className="z-50"
				/>
			)}
			{showQuizSolveOverlay && (
				<QuizSolveOverlay
					onClose={() => setShowQuizSolveOverlay(false)}
					timestamp={currentTimestamp}
					video_id={props.video_id}
					src={props.src}
					className="z-50"
				/>
			)}
		</div>
	);
};

export default Detail;
