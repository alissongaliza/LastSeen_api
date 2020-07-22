import { Service } from 'typedi';

import { Genre } from 'core/models/Genre';

@Service()
export abstract class IGenreRepository {
	abstract async findById(id: number): Promise<Genre | null>;
	// abstract async listByIds(ids: number[]): Promise<Genre[]>;
	abstract async createBatch(genres: Genre[]): Promise<boolean>;
}
