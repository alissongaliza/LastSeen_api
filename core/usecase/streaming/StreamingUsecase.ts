import JustWatch from 'justwatch-api';
import _ from 'lodash';
import { Service, Inject } from 'typedi';

import { Movie } from 'core/models/Movie';
import { Streaming } from 'core/models/Streaming';
import { IStreamingRepository } from 'core/repository/IStreamingRepository';

import { IMovieUsecase } from '../IMovieUsecase';
import { IStreamingUsecase } from '../IStreamingUsecase';

@Service()
export class StreamingUsecase implements IStreamingUsecase {
	@Inject()
	movieUsecase: IMovieUsecase;
	@Inject()
	streamingRepository: IStreamingRepository;

	async listStreamingByMovie(movie: Movie): Promise<Streaming[]> {
		// title is used instead of id because streaming is searched on another API, so IDs are different
		const streams: Streaming[] = await this.streamingRepository.listByMovieId(movie.id);
		if (streams.length > 0) return streams;
		const movies = await new JustWatch().search({ query: movie.title });

		const foundMovie = movies.items.find((el) => el.title === movie.title);
		if (foundMovie) {
			const providers: Streaming[] = foundMovie.offers.map(({ provider_id, urls }) => {
				//each resolution (hd,sd,etc) is returned as a new provider, but
				//I'm only interested in the provider id, so I still have to remove the duplicates
				return {
					idProvider: provider_id,
					web_url: urls.standard_web,
					android_url: urls.deeplink_android,
					ios_url: urls.deeplink_ios,
				};
			});
			const uniqueStreams: Streaming[] = _.uniqBy(providers, 'idProvider'); //removes duplicates
			const formattedUniqueStreams = uniqueStreams.map((el) => ({ ...el, movieId: movie.id }));
			this.streamingRepository.createBatch(formattedUniqueStreams);
			return uniqueStreams;
		}
		return [];
	}
}
