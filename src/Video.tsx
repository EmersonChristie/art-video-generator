import {Composition} from 'remotion';
import {ArtVideo} from './ArtVideo';

/*
TODOS

- Artwork props to pass to cli: image file, artist, title, year, dimensions
- Config props: Video duration, focal points (most interesting parts of painting to zoom into)

- 

**/

export const RemotionVideo: React.FC = () => {
	// TODO add as CLI input props
	const videoDuration = 120; // Duration in Seconds
	const fps = 30; // frames per second

	const frames = videoDuration * fps;

	return (
		<>
			<Composition
				id="ArtVideo"
				component={ArtVideo}
				durationInFrames={frames}
				fps={fps}
				width={1920}
				height={1080}
				defaultProps={{
					filePath: '/Users/patriciaqualls/dev/art-video-generator/src/static/artImages/wide.jpg',
				}}
			/>
		</>
	);
};
