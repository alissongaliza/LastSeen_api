import axios from 'axios';
import { Service, Inject } from 'typedi';

import { Movie } from 'core/models/Movie';
import { IMovieRepository } from 'core/repository/IMovieRepository';

import { TMDB_BASE_URL } from 'util/constants';

import { IMovieUsecase } from '../IMovieUsecase';

@Service()
export class MovieUsecase implements IMovieUsecase {
	@Inject()
	movieRepository: IMovieRepository;
	async findOneMovieById(id: number): Promise<Movie | null> {
		try {
			const movie = await this.movieRepository.findById(id);
			// found it on cache
			if (movie) return movie;
			const { data } = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
				params: { api_key: process.env.TMDB_API_KEY },
			});
			const movieFetched: Movie = data.result;
			this.movieRepository.createBatch(false, [movieFetched]);
			return movieFetched;
		} catch (e) {
			console.log(e);
			return e;
		}
	}
	async findOneMovieByTitle(title: string): Promise<Movie | null> {
		try {
			const movie = await this.movieRepository.findByTitle(title);
			if (movie) return movie;
			const { data } = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
				params: { api_key: process.env.TMDB_API_KEY, query: title },
			});
			// found it on cache
			const movieFetched: Movie = data.result;
			this.movieRepository.createBatch(false, [movieFetched]);
			return movieFetched;
		} catch (e) {
			console.log(e);
			return e;
		}
	}

	async listPopularMovies(): Promise<Movie[]> {
		try {
			const movies = await this.movieRepository.listPopular();
			if (movies.length > 0) return movies;

			const { data } = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
				params: { api_key: process.env.TMDB_API_KEY },
			});
			const moviesFetched: Movie[] = data.results;
			console.log(await this.movieRepository.createBatch(true, moviesFetched));
			return moviesFetched;
		} catch (e) {
			return e;
		}
	}
}
