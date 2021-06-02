import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Artwork} from './ArtVideo/Artwork';

export const ArtVideo: React.FC<{filePath: string}> = ({filePath}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	const opacity = interpolate(
		frame,
		[videoConfig.durationInFrames - 25, videoConfig.durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
		<div
			style={{
				flex: '1',
				justifyContent: 'center',
				alignItems: 'center',
				background: 'white',
			}}
		>
			<Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
				<Artwork filePath={filePath} />
			</Sequence>
		</div>
	);
};
