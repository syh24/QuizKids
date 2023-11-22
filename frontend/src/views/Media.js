import React, {useState} from 'react';
import MediaOverlay from '@enact/sandstone/MediaOverlay';

const Media = ({onClick, idx, src}) => {
	const [isHovering, setIsHovering] = useState(false);

	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			onClick(e); // Call the onClick handler when Enter is pressed
		}
	};

	return (
		<div
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onFocus={() => setIsHovering(true)}
			onBlur={() => setIsHovering(false)}
			onKeyDown={handleKeyPress} // Handle key press event
			className="rounded-2xl overflow-hidden"
			onClick={onClick}
			id={idx}
			tabIndex={0} // Make the div focusable
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
				}
			>
				{isHovering && <source src={src} />}
			</MediaOverlay>
		</div>
	);
};

export default Media;
