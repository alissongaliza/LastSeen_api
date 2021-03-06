import { Service } from 'typedi';

import { Movie } from 'core/models/Movie';

import { REDIS_MOVIE, REDIS_MOVIE_TABLE, REDIS_MOVIE_POPULAR } from 'util/constants';

import { IMovieRepository } from '../IMovieRepository';

import { redis } from '..';

@Service()
export class MovieRedis implements IMovieRepository {
	async findByTitle(title: string): Promise<Movie | null> {
		// search the id on the helper NAME-ID hash
		const movieId = await redis.hget(REDIS_MOVIE_TABLE, title);
		if (movieId) {
			return this.findById(parseInt(movieId));
		}
		return null;
	}
	async findById(id: number): Promise<Movie | null> {
		// first check the popular hash (only about 20 records)
		const moviePopularString = await redis.hget(REDIS_MOVIE_POPULAR, id.toString());
		if (moviePopularString) return JSON.parse(moviePopularString);
		// check regular movies hash
		const movieString = await redis.hget(REDIS_MOVIE, id.toString());
		if (movieString) return JSON.parse(movieString);
		return null;
	}
	async listPopular(): Promise<Movie[]> {
		const moviesPair = await redis.hgetall(REDIS_MOVIE_POPULAR);
		const movies: Movie[] = [];
		for (const k in moviesPair) {
			// unmarshalling
			movies.push(JSON.parse(moviesPair[k]));
		}
		return movies;
	}
	async createBatch(popular: boolean, data: Movie[]): Promise<boolean> {
		// main hash structure
		const moviesStringified = data.map((movie) => [movie.id, JSON.stringify(movie)]);
		// movie hash lookup table
		const moviesTable = data.map((movie) => [movie.title, movie.id]);
		// if popular then choose the popular movie hash
		const response1 = await redis.hmset(`${popular ? REDIS_MOVIE_POPULAR : REDIS_MOVIE}`, ...moviesStringified);
		const response2 = await redis.hmset(`${REDIS_MOVIE_TABLE}`, ...moviesTable);
		// 15 min
		redis.expire(REDIS_MOVIE, 900);
		// 5 mins
		redis.expire(REDIS_MOVIE_POPULAR, 300);
		return response1 === response2 && response1 === 'OK';
	}
}
