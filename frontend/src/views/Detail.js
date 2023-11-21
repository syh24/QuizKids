import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import Button from '@enact/sandstone/Button';
// import AddQuiz from './AddQuiz';
import {View, Text, useState} from 'react';
import styles from './Video.module.css';
import {VirtualGridList, VirtualList} from '@enact/sandstone/VirtualList';

import QuizCreationOverlay from './QuizCreationOverlay';

const Detail = props => {
	const [isPaused, setIsPaused] = useState(false);
	const [showQuizOverlay, setShowQuizOverlay] = useState(false); // State to control quiz overlay visibility
	const [currentTimestamp, setCurrentTimestamp] = useState(0);

	const onPause = event => {
		//console.log("current time : ", Math.floor(event.currentTime)); // save paused time
		setIsPaused(current => !current);
		setCurrentTimestamp(Math.floor(event.currentTime));
	};

	const onPlay = event => {
		setIsPaused(current => !current);
	};

	// Handler to toggle quiz overlay
	const toggleQuizOverlay = () => {
		setShowQuizOverlay(current => !current);
	};

	return (
		<div className="relative h-[70vh] scale-100 origin-top w-[70vw] flex justify-start mx-auto">
			<div className={`absolute top-0 right-0 ${isPaused ? '' : 'hidden'}`}>
				<Button
					icon="plus"
					size="small"
					className="m-2.5 z-50"
					onClick={() => setShowQuizOverlay(true)}
				/>
			</div>
			<VideoPlayer
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
			>
				<source src={props.src} type="video/mp4" />
				<infoComponents>
					A video about some things happening to and around some characters.{' '}
					{/* will be replaced by prob */}
					Very exciting stuff.
				</infoComponents>
				<MediaControls
					jumpBackwardIcon="jumpbackward"
					jumpForwardIcon="jumpforward"
					pauseIcon="pause"
					playIcon="play"
				></MediaControls>
			</VideoPlayer>

			{/* Quiz Creation Overlay */}
			{showQuizOverlay && (
				<QuizCreationOverlay
					onClose={() => setShowQuizOverlay(false)}
					timestamp={currentTimestamp}
				/>
			)}
		</div>
	);
};

export default Detail;
