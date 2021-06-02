import {useCallback, useState} from 'react';
import {
	continueRender,
	delayRender,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
	spring
} from 'remotion';
import styled from 'styled-components';

export const Artwork: React.FC<{filePath: string}> = ({filePath}) => {
	// const src = require('/Users/patriciaqualls/dev/art-video-generator/src/static/artImages/art1.jpg');
	const src = require("../static/artImages/" + filePath);

	const frame = useCurrentFrame();
	const {height, width, fps, durationInFrames} = useVideoConfig();

	const image = {
		maxHeight: height * 0.75,
		maxWidth: width * 0.75,
	};

	const pause = 50;

	const [handle] = useState(() => delayRender());

	const onLoad = useCallback(
		({target: img}) => {
			// Continue the delayed render when image loaded
			continueRender(handle);
		},
		[handle]
	);


	// Zoom using current frame
	const zoom = interpolate(
		frame,
		[
			0,
			90,
			(1 / 8) * durationInFrames, // zoom in until 1/8 through frames
			(7 / 8) * durationInFrames, // zoom out starting at 7/8 duration
			durationInFrames - 90,
			durationInFrames
		],
		[1, 1, 4, 4, 1, 1] // Using standard scale
	);

	/*
	0 = Begin zoom in to top left corner
	1/8 = end zoom in to top left corner, begin pan down
	1/4 
	3/8 = Begin pan X right
	1/2
	5/8 = End pan X right, begin pan Y up
	3/4 
	7/8 = End pan Y up, begin Zoom out while pan X left back to center
	**/

	const panY = interpolate(
		frame,
		[
			0,
			(1 / 8) * durationInFrames,
			(1 / 8) * durationInFrames + pause,
			(3 / 8) * durationInFrames,
			(5 / 8) * durationInFrames,
			(5 / 8) * durationInFrames + pause,
			(7 / 8) * durationInFrames,
			durationInFrames,
		],
		[0, 0, 0, 75, 75, 75, 0, 0], // TODO find adequate ratio depending on images aspect ratio
		{
			extrapolateRight: 'clamp',
		}
	);
	const panX = interpolate(
		frame,
		[
			0,
			(1 / 8) * durationInFrames,
			(3 / 8) * durationInFrames,
			(3 / 8) * durationInFrames + pause,
			(5 / 8) * durationInFrames,
			(7 / 8) * durationInFrames,
			durationInFrames - 90,

			durationInFrames,
		],
		[0, 0, 0, 0, 50, 50, 0, 0], // pan half the width of the artwork
		{
			extrapolateRight: 'clamp',
		}
	);

	// const panX = interpolate(
	// 	frame,
	// 	[
	// 		0,
	// 		(1 / 8) * durationInFrames,
	// 		(3 / 8) * durationInFrames,
	// 		(5 / 8) * durationInFrames,
	// 		(7 / 8) * durationInFrames,
	// 		durationInFrames,
	// 	],
	// 	[0, 0, 0, 50, 50, 0], // pan half the width of the artwork
	// 	{
	// 		extrapolateRight: 'clamp',
	// 	}
	// );

	// Styled Components
	const ArtContainer = styled.div`
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		font-size: 0;

	`;

	const StyledImg = styled.img`
	max-height: ${image.maxHeight}px;
	width: auto;
	max-width: ${image.maxWidth}px;
	height: auto;
	font-size: 0;
	box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.18), 1px 2px 2px rgba(0, 0, 0, 0.15),
		8px 16px 16px rgba(0, 0, 0, 0.18), 12px 24px 32px rgba(0, 0, 0, 0.15),
		16px 32px 64px rgba(0, 0, 0, 0.18), 4px 8px 4px rgba(0, 0, 0, 0.1),
		8px 16px 8px rgba(0, 0, 0, 0.09), 16px 32px 16px rgba(0, 0, 0, 0.1),
		32px 64px 32px rgba(0, 0, 0, 0.09), 64px 128px 64px rgba(0, 0, 0, 0.1),
		2px -2px 4px rgba(0, 0, 0, 0.08),
		4px -8px 8px rgba(0, 0, 0, 0.08), 8px -16px 16px rgba(0, 0, 0, 0.08),
		16px -32px 32px rgba(0, 0, 0, 0.08), 32px -64px 64px rgba(0, 0, 0, 0.08),
		inset 0 0 30px 30px rgba(0, 0, 0, 0.3);
	transform: scale(${zoom}) translate(-${panX}%, -${panY}%);
	transform-origin: 20% 0;
`;

	return (
		<ArtContainer>
			<StyledImg src={src} onLoad={onLoad}></StyledImg>
		</ArtContainer>
	);
};
