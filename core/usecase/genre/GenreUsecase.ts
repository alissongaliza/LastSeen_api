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
	async findOneGenreById(id: number): Promise<Genre> {
		try {
			const { data } = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
				params: { api_key: process.env.TMDB_API_KEY },
			});
			return data.results;
		} catch (e) {
			console.log(e);
			return e;
		}
	}
	async updateAllGenres(): Promise<void> {
		try {
			const { data: genres } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
				params: { api_key: process.env.TMDB_API_KEY },
			});
			this.genreRepository.createBatch(genres);
		} catch (e) {
			console.log(e);
		}
	}
}
