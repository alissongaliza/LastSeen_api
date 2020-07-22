import { Service } from 'typedi';

import { Movie } from 'core/models/Movie';

@Service()
export abstract class IMovieRepository {
	abstract async findById(id: number): Promise<Movie | null>;
	abstract async findByTitle(title: string): Promise<Movie | null>;
	abstract async listPopular(): Promise<Movie[]>;
	abstract async createBatch(popular: boolean, data: Movie[]): Promise<boolean>;
}
