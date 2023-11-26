import React, {useState} from 'react';
import MediaOverlay from '@enact/sandstone/MediaOverlay';
import css from './Media.module.css';

const Media = ({onClick, idx, src}) => {
	const [isHovering, setIsHovering] = useState(false);

	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			onClick(e); // Call the onClick handler when Enter is pressed
		}
	};
	const customTextStyles = {
		caption: {
			color: 'white',
			backgroundColor: 'rgba(255, 0, 0, 0.5)',
			fontSize: '20px',
			fontWeight: 'bold'
		}
		// ... 다른 CSS 클래스 정의
	};
	return (
		<MediaOverlay
			marqueeOn="focus"
			muted={!isHovering}
			noAutoPlay={!isHovering}
			progress={0.5}
			textAlign="end"
			caption="Program Name"
			imageOverlay={isHovering ? null : 'https://via.placeholder.com/1600x900'}
			className="font-light p-0 rounded-lg shadow-xl  w-48 h-24 object-cover transition duration-500 ease-in-out"
			css={customTextStyles}
			skin="light"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onFocus={() => setIsHovering(true)}
			onBlur={() => setIsHovering(false)}
			onKeyDown={handleKeyPress} // Handle key press event
			onClick={onClick}
			id={idx}
			tabIndex={0} // Make the div focusable
		>
			{isHovering && <source src={src} />}
		</MediaOverlay>
	);
};

export default Media;
