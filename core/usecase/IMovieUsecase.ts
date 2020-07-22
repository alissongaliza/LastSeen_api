import { Service } from 'typedi';

import { Movie } from 'core/models/Movie';

@Service()
export abstract class IMovieUsecase {
	abstract findOneMovieById(id: number): Promise<Movie | null>;
	abstract findOneMovieByTitle(title: string): Promise<Movie | null>;
	abstract listPopularMovies(): Promise<Movie[]>;
}
