import { Service } from 'typedi';

import { Movie } from 'core/models/Movie';
import { Streaming } from 'core/models/Streaming';

import { IStreamingUsecase } from '../IStreamingUsecase';

type StreamingWithMovie = Streaming & { movieTitle: string };
@Service()
export class StreamingUsecaseMock implements IStreamingUsecase {
	streamings: StreamingWithMovie[] = [
		{
			android_url: '',
			ios_url: '',
			idProvider: 1,
			provider: { iconURL: '', id: 1, name: '' },
			web_url: '',
			movieTitle: 'title1',
		},
		{
			android_url: '',
			ios_url: '',
			idProvider: 2,
			provider: { iconURL: '', id: 2, name: '' },
			web_url: '',
			movieTitle: 'title1',
		},
		{
			android_url: '',
			ios_url: '',
			idProvider: 2,
			provider: { iconURL: '', id: 2, name: '' },
			web_url: '',
			movieTitle: 'title2',
		},
	];
	async listStreamingByMovie(movie: Movie): Promise<Streaming[]> {
		return this.streamings.filter((el) => el.movieTitle === movie.title);
	}
}
