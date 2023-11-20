import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import Button from '@enact/sandstone/Button';
import AddQuiz from './AddQuiz';
import { View, Text, useState } from 'react';
import styles from "./Video.module.css";
import {VirtualGridList, VirtualList} from '@enact/sandstone/VirtualList';

const Detail = (props) => {
    const [isPaused, setIsPaused] = useState(false);

    const onPause = (event) => {
        //console.log("current time : ", Math.floor(event.currentTime)); // save paused time
        setIsPaused((current) => !current);
    };

    const onPlay = (event) => {
        setIsPaused((current) => !current);
    }

	return (
		<div
			style={{
				height: '70vh',
				transform: 'scale()',
				transformOrigin: 'top',
				width: '70vw',
				display: 'flex',
				justifyContent: 'flex-start',
				margin: '0 auto',
			}}
		>
            <div>{isPaused ? <Button icon="plus" size="small">AddQuiz!</Button> : null}</div>
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
                    A video about some things happening to and around some characters. {/* will be replaced by prob */}
                    Very exciting stuff.
                </infoComponents>
                <MediaControls
                    jumpBackwardIcon="jumpbackward"
                    jumpForwardIcon="jumpforward"
                    pauseIcon="pause"
                    playIcon="play"
                >
                </MediaControls>
            </VideoPlayer>
		</div>
	);
};

export default Detail;
