import { Service } from 'typedi';

import { Movie } from 'core/models/Movie';

import { IMovieRepository } from '../IMovieRepository';

@Service()
export class MovieInMemory implements IMovieRepository {
	private moviesHash: Map<string, Movie>;
	private popularMoviesHash: Map<string, Movie>;
	constructor() {
		this.moviesHash = new Map();
		this.popularMoviesHash = new Map();
	}
	findById = (id: number): Promise<Movie | null> =>
		new Promise((resolve) => {
			resolve(this.moviesHash.has(id.toString()) ? this.moviesHash.get(id.toString()) : null);
		});
	findByTitle = (title: string): Promise<Movie | null> =>
		new Promise((resolve) => {
			this.moviesHash.forEach((v) => {
				if (v.title === title) resolve(v);
			});
			resolve(null);
		});
	listPopular = (): Promise<Movie[]> =>
		new Promise((resolve) => {
			resolve(Object.values(this.popularMoviesHash));
		});
	createBatch = (popular: boolean, data: Movie[]): Promise<boolean> =>
		new Promise((resolve) => {
			// allowing partial insertion for now
			data.map((el) =>
				popular ? this.popularMoviesHash.set(el.id.toString(), el) : this.moviesHash.set(el.id.toString(), el)
			);
			resolve(data.length === this.moviesHash.size);
		});
}
