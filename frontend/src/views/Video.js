import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import Button from '@enact/sandstone/Button';
import { View, Text } from 'react';
import styles from "./Video.module.css";
import {VirtualGridList, VirtualList} from '@enact/sandstone/VirtualList';

const Video = (prop) => {
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
			<VideoPlayer				
				autoCloseTimeout={7000}
				backButtonAriaLabel="go to previous"
				feedbackHideDelay={3000}
				initialJumpDelay={400}
				jumpDelay={200}
				loop
				miniFeedbackHideDelay={2000}
				muted
				title="Sandstone VideoPlayer Sample Video"
				titleHideDelay={4000}
			>
				<source src={prop.src} type="video/mp4" />
				<infoComponents>
					A video about some things happening to and around some characters.
					Very exciting stuff.
				</infoComponents>
				<MediaControls
					jumpBackwardIcon="jumpbackward"
					jumpForwardIcon="jumpforward"
					pauseIcon="pause"
					playIcon="play"
				>
					<Button icon="list" size="small" />
					<Button icon="playspeed" size="small" />
					<Button icon="speakercenter" size="small" />
					<Button icon="miniplayer" size="small" />
					<Button icon="subtitle" size="small" />
				</MediaControls>
			</VideoPlayer>
		</div>
	);
};

export default Video;
