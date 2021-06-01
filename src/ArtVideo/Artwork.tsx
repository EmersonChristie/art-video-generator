import {useCallback, useState} from 'react';
import {
	continueRender,
	delayRender,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import styled from 'styled-components';

export const Artwork: React.FC<{artFile: string}> = ({artFile}) => {
	const src = require('../static/artImages/square.jpg');
	// const src = require('../static/artImages/diptych.jpg');

	const frame = useCurrentFrame();
	const {height, width, fps, durationInFrames} = useVideoConfig();

	// const artRef = useRef();

	// const [state, setState] = useState({
	// 	artWidth: 1,
	// 	artHeight: 1,
	// 	widthRatio: 1,
	// 	heightRatio: 1,
	// });

	const image = {
		maxHeight: height * 0.75,
		maxWidth: width * 0.75,
	};

	const [handle] = useState(() => delayRender());

	const onLoad = useCallback(
		({target: img}) => {
			// const artWidth = img.offsetWidth;
			// const artHeight = img.offsetHeight;
			// const screenWidth = window.innerWidth;
			// const screenHeight = window.innerHeight;

			// setState({
			// 	...state,
			// 	artWidth,
			// 	artHeight,
			// 	widthRatio: screenWidth / artWidth,
			// 	heightRatio: screenHeight / artHeight,
			// });

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
			(1 / 8) * durationInFrames, // zoom in until 1/8 through frames
			(7 / 8) * durationInFrames, // zoom out starting at 7/8 duration
			durationInFrames,
		],
		[1, 4, 4, 1] // Using standard scale
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
			(3 / 8) * durationInFrames,
			(5 / 8) * durationInFrames,
			(7 / 8) * durationInFrames,
			durationInFrames,
		],
		[0, 0, 50, 50, 0, 0], // TODO find adequate ratio depending on images aspect ratio
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
			(5 / 8) * durationInFrames,
			(7 / 8) * durationInFrames,
			durationInFrames,
		],
		[0, 0, 0, 50, 50, 0], // pan half the width of the artwork
		{
			extrapolateRight: 'clamp',
		}
	);

	const ArtContainer = styled.div`
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	`;

	const StyledImg = styled.img`
		max-height: ${image.maxHeight}px;
		width: auto;
		max-width: ${image.maxWidth}px;
		height: auto;
		font-size: 0;
		box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.2), 1px 2px 2px rgba(0, 0, 0, 0.2),
			8px 16px 16px rgba(0, 0, 0, 0.2), 12px 24px 32px rgba(0, 0, 0, 0.2),
			16px 32px 64px rgba(0, 0, 0, 0.2), 4px 8px 4px rgba(0, 0, 0, 0.09),
			8px 16px 8px rgba(0, 0, 0, 0.09), 16px 32px 16px rgba(0, 0, 0, 0.09),
			32px 64px 32px rgba(0, 0, 0, 0.09), 64px 128px 64px rgba(0, 0, 0, 0.09);
		transform: scale(${zoom}) translate(-${panX}%, -${panY}%); // interpolate animation with drivers
		transform-origin: 25% 25%;
	`;

	return (
		<ArtContainer>
			<StyledImg src={src} onLoad={onLoad}></StyledImg>
		</ArtContainer>
	);
};
