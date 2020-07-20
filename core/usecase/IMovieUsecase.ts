import { Movie } from 'core/models/Movie';

export abstract class IMovieUsecase {
	abstract findOneMovieById(id: number): Promise<Movie>;
	abstract findOneMovieByTitle(title: string): Promise<Movie>;
	abstract listPopularMovies(): Promise<Movie[]>;
}
