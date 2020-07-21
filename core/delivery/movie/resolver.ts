import axios from 'axios';
import JustWatch from 'justwatch-api';
import _ from 'lodash';
import { Resolver, ResolverInterface, Query, FieldResolver, Root, Arg } from 'type-graphql';

import { Genre } from 'core/models/Genre';
import { Movie } from 'core/models/Movie';
import { Streaming } from 'core/models/Streaming';

import { TMDB_BASE_URL, IMAGE_URL } from 'util/constants';

import { MovieGraphQL } from './model';

@Resolver(MovieGraphQL)
export class MovieResolver implements ResolverInterface<MovieGraphQL> {
	@Query(() => MovieGraphQL)
	async searchByTitle(@Arg('title') title: string): Promise<Movie> {
		try {
			const { data } = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
				params: { api_key: process.env.TMDB_API_KEY, query: title },
			});
			return data.results;
		} catch (e) {
			return e;
		}
	}
	@Query(() => MovieGraphQL)
	async searchById(@Arg('id') id: number): Promise<Movie> {
		try {
			const { data } = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
				params: { api_key: process.env.TMDB_API_KEY },
			});
			return data.results;
		} catch (e) {
			return e;
		}
	}
	@Query(() => [MovieGraphQL])
	async searchPopularMovies(): Promise<Movie[]> {
		try {
			const { data } = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
				params: { api_key: process.env.TMDB_API_KEY },
			});
			return data.results;
		} catch (e) {
			return e;
		}
	}
	@FieldResolver()
	poster_fullPath(@Root() movie: Movie): string {
		return `${IMAGE_URL}${movie.poster_path}`;
	}
	@FieldResolver()
	async streamingServices(@Root() movie: Movie): Promise<Streaming[]> {
		const movies = await new JustWatch().search({ query: movie.title });

		if (movies.items[0].offers == undefined) return [];
		const providers = movies.items[0].offers.map(({ provider_id, urls }) => {
			//each resolution (hd,sd,etc) is returned as a new provider, but
			//I'm only interested in the provider id, so I still have to remove the duplicates
			return {
				idProvider: provider_id,
				web_url: urls.standard_web,
				android_url: urls.deeplink_android,
				ios_url: urls.deeplink_ios,
			};
		});
		return _.uniqBy(providers, 'id');
	}

	@FieldResolver()
	genres(@Root() { genre_ids }): Genre[] {
		return genre_ids;
	}
}
// };
// Genre: {

// },
