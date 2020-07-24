import { Service } from 'typedi';

import { Genre } from 'core/models/Genre';

import { IGenreRepository } from '../IGenreRepository';

@Service()
export class GenreInMemory implements IGenreRepository {
	private genresHash: Map<string, Genre>;
	constructor() {
		this.genresHash = new Map();
	}
	findById = (id: number): Promise<Genre | null> =>
		new Promise((resolve) => {
			resolve(this.genresHash.has(id.toString()) ? this.genresHash.get(id.toString()) : null);
		});
	createBatch = (genres: Genre[]): Promise<boolean> =>
		new Promise((resolve) => {
			// allowing partial insertion for now
			genres.map((el) => this.genresHash.set(el.id.toString(), el));
			resolve(genres.length === this.genresHash.size);
		});
}
