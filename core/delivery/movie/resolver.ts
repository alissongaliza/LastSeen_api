import { Resolver, ResolverInterface, Query, FieldResolver, Root, Arg } from 'type-graphql';
import { Inject } from 'typedi';

import { Movie } from 'core/models/Movie';
import { Streaming } from 'core/models/Streaming';
import { IGenreUsecase } from 'core/usecase/IGenreUsecase';
import { IMovieUsecase } from 'core/usecase/IMovieUsecase';
import { IStreamingUsecase } from 'core/usecase/IStreamingUsecase';

import { IMAGE_URL } from 'util/constants';

import { MovieGraphQL } from './model';

@Resolver(MovieGraphQL)
export class MovieResolver implements ResolverInterface<MovieGraphQL> {
	@Inject()
	genreUsecase: IGenreUsecase;
	@Inject()
	movieUsecase: IMovieUsecase;
	@Inject()
	streamingUsecase: IStreamingUsecase;

	@Query(() => MovieGraphQL)
	async searchByTitle(@Arg('title') title: string): Promise<Movie | null> {
		return this.movieUsecase.findOneMovieByTitle(title);
	}
	@Query(() => MovieGraphQL)
	async searchById(@Arg('id') id: number): Promise<Movie | null> {
		return this.movieUsecase.findOneMovieById(id);
	}
	@Query(() => [MovieGraphQL])
	async searchPopularMovies(): Promise<Movie[]> {
		return this.movieUsecase.listPopularMovies();
	}
	@FieldResolver()
	poster_fullPath(@Root() movie: Movie): string {
		return `${IMAGE_URL}${movie.poster_path}`;
	}
	@FieldResolver()
	async streamingServices(@Root() movie: Movie): Promise<Streaming[]> {
		return await this.streamingUsecase.listStreaming(movie);
	}
}
