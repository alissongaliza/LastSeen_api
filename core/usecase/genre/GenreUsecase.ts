import axios from 'axios';
import { Service, Inject } from 'typedi';

import { Genre } from 'core/models/Genre';
import { IGenreRepository } from 'core/repository/IGenreRepository';

import { TMDB_BASE_URL } from 'util/constants';

import { IGenreUsecase } from '../IGenreUsecase';

@Service()
export class GenreUsecase implements IGenreUsecase {
	@Inject()
	genreRepository: IGenreRepository;
	async findOneGenreById(id: number): Promise<Genre | null> {
		try {
			const genre = await this.genreRepository.findById(id);
			return genre;
		} catch (e) {
			console.log(e);
			return e;
		}
	}
	async findManyGenresById(ids: number[]): Promise<Genre[]> {
		try {
			const promises = ids.map(async (id) => this.genreRepository.findById(id));
			const genres = await Promise.all(promises);
			const validGenres: Genre[] = [];
			genres.map((el) => (el ? validGenres.push(el) : null));
			return validGenres;

			// const { data } = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
			// 	params: { api_key: process.env.TMDB_API_KEY },
			// });
		} catch (e) {
			console.log(e);
			return e;
		}
	}
	async refreshAllGenres(): Promise<void> {
		try {
			const { data } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
				params: { api_key: process.env.TMDB_API_KEY },
			});
			this.genreRepository.createBatch(data.genres);
		} catch (e) {
			console.log(e);
		}
	}
}
