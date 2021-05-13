import {Composition} from 'remotion';
import {ArtVideo} from './ArtVideo';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="ArtVideo"
				component={ArtVideo}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					artFile: 'art1',
				}}
			/>
		</>
	);
};
