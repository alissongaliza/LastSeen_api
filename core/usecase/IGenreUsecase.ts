import { Service } from 'typedi';

import { Genre } from 'core/models/Genre';

@Service()
export abstract class IGenreUsecase {
	abstract findOneGenreById(id: number): Promise<Genre | null>;
	abstract findManyGenresById(ids: number[]): Promise<Genre[]>;
	abstract refreshAllGenres(): Promise<void>;
}
