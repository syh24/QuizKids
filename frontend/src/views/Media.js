import React, {useState} from 'react';
import MediaOverlay from '@enact/sandstone/MediaOverlay';

const Media = ({onClick, idx, src}) => {
	const [isHovering, setIsHovering] = useState(false);
	return (
		<div
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			className="rounded-2xl overflow-hidden"
			onClick = {onClick} // added for detailed video
			id={idx}
		>
			<MediaOverlay
				marqueeOn="focus"
				muted={!isHovering}
				noAutoPlay={!isHovering}
				progress={0.5}
				textAlign="end"
				title="Program Name"
				imageOverlay={
					isHovering ? null : 'https://via.placeholder.com/1600x900'
				} // Show image when not hovering
				className="rounded-2xl overflow-hidden"
			>
				{/* Only set the source if we are hovering */}
				{isHovering && <source src={src} />}
			</MediaOverlay>
		</div>
	);
};

export default Media;
