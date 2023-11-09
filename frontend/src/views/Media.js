import MediaOverlay from '@enact/sandstone/MediaOverlay';
// rendering Media Overlay

const Media = (prop) => {
	return (
		<div>
			<MediaOverlay
                caption="DTV 7-1"
                marqueeOn="focus"
                muted
                progress={0.5}
                subtitle="07:00 AM - 08:00 AM"
                textAlign="end"
                title="Program Name"
            >
				<source src={prop.src} />
			</MediaOverlay>
		</div>
	);
};

export default Media;
