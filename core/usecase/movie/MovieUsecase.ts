import axios from 'axios';

import { Movie } from 'core/models/Movie';

import { TMDB_BASE_URL } from 'util/constants';

import { IMovieUsecase } from '../IMovieUsecase';

export class MovieUsecase implements IMovieUsecase {
	async findOneMovieById(id: number): Promise<Movie> {
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
	async findOneMovieByTitle(title: string): Promise<Movie> {
		try {
			const { data } = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
				params: { api_key: process.env.TMDB_API_KEY, query: title },
			});
			return data.results;
		} catch (e) {
			console.log(e);
			return e;
		}
	}

	async listPopularMovies(): Promise<Movie[]> {
		try {
			const { data } = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
				params: { api_key: process.env.TMDB_API_KEY },
			});
			return data.results;
		} catch (e) {
			return e;
		}
	}
}
