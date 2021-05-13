import {useEffect, useRef, useState} from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';

export const Artwork: React.FC<{artFile: String}> = ({artFile}) => {
	const frame = useCurrentFrame();
	const {height, width, fps, durationInFrames} = useVideoConfig();
	const artRef = useRef();

	const [state, setState] = useState({
		artWidth: 0,
		ratio: 0,
	});

	useEffect(() => {
		const artWidth = artRef.current ? artRef.current.offsetWidth : 0;

		setState({...state, artWidth, ratio: width / artWidth});

		// console.log('width', artRef.current ? artRef.current.offsetWidth : 0);
	}, []);

	const progress = spring({
		frame: frame,
		from: 1,
		to: 2,
		fps,
		config: {
			mass: 4,
			damping: 1000,
		},
	});

	const scaleDriver = spring({
		frame,
		fps,
		config: {
			mass: 4,
			damping: 1000,
		},
	});

	const zoom = interpolate(scaleDriver, [0, 1], [1, state.ratio]);

	const image = {
		maxHeight: height * 0.75,
		maxWidth: width * 0.75,
	};

	const src = require('../static/artImages/art1.jpg');

	// const src = require('../static/artImages/' + artFile + '.jpg');
	// console.log('🚀 ~ file: Artwork.tsx ~ line 17 ~ src', src);

	const ArtContainer = styled.div`
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	`;

	const Shadow = styled.div`
		font-size: 0;
		box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.2), 1px 2px 2px rgba(0, 0, 0, 0.2),
			8px 16px 16px rgba(0, 0, 0, 0.2), 12px 24px 32px rgba(0, 0, 0, 0.2),
			16px 32px 64px rgba(0, 0, 0, 0.2), 4px 8px 4px rgba(0, 0, 0, 0.09),
			8px 16px 8px rgba(0, 0, 0, 0.09), 16px 32px 16px rgba(0, 0, 0, 0.09),
			32px 64px 32px rgba(0, 0, 0, 0.09), 64px 128px 64px rgba(0, 0, 0, 0.09);
		transform: scale(${zoom});
		transform-origin: top;
	`;

	const imgStyle = {
		maxHeight: `${image.maxHeight}px`,
		width: 'auto',
		maxWidth: `${image.maxWidth}px`,
		height: 'auto',
	};

	const Art = styled.img`
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
		transform: scale(${zoom});
		transform-origin: top;
	`;

	// const onImgLoad = ({target: img}) => {
	// 	const width = img.naturalWidth;
	// 	const height = img.naturalHeight;

	// console.log('Bounding Rect: ', artRef.current.getBoundingClientRect());

	return (
		<ArtContainer>
			{/* <Shadow ref={artRef}>
				<Img style={imgStyle} src={src}></Img>
			</Shadow> */}
			<Art src={src} ref={artRef}></Art>
		</ArtContainer>
	);
};
