import axios from 'axios';
import { Service, Inject } from 'typedi';

import { Movie } from 'core/models/Movie';
import { TMDB_API_KEY } from 'core/repository';
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
				params: { api_key: TMDB_API_KEY },
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
			// found it on cache
			if (movie) return movie;
			const { data } = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
				params: { api_key: TMDB_API_KEY, query: title },
			});
			if (data.results.length > 0) {
				// pick the most likely (API sorts by popularity)
				const movieFetched: Movie = data.results[0];
				this.movieRepository.createBatch(false, [movieFetched]);
				return movieFetched;
			}
			return null;
		} catch (e) {
			console.log(e);
			return e;
		}
	}

	async listPopularMovies(): Promise<Movie[]> {
		try {
			const movies = await this.movieRepository.listPopular();
			// if its empty then fetch movies
			return movies.length === 0 ? this.refreshPopularMovies() : movies;
		} catch (e) {
			return e;
		}
	}

	async refreshPopularMovies(): Promise<Movie[]> {
		try {
			const movies = await this.movieRepository.listPopular();
			if (movies.length > 0) return movies;

			const { data } = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
				params: { api_key: TMDB_API_KEY },
			});
			const moviesFetched: Movie[] = data.results;
			await this.movieRepository.createBatch(true, moviesFetched);
			return moviesFetched;
		} catch (e) {
			return e;
		}
	}
}
