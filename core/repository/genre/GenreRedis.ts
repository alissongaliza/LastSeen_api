import { Service } from 'typedi';

import { Genre } from 'core/models/Genre';

import { REDIS_GENRE } from 'util/constants';

import { redis } from '..';

import { IGenreRepository } from '../IGenreRepository';

@Service()
export class GenreRedis implements IGenreRepository {
	async findById(id: number): Promise<Genre | null> {
		const name = await redis.hget(REDIS_GENRE, id.toString());
		return name ? { id, name } : null;
	}
	// async listByIds(ids: number[]): Promise<Genre[]> {
	// const names = await redis.hmget(
	// 	REDIS_GENRE,
	// 	ids.map((el) => el.toString())
	// );
	// console.log(names);
	// throw 'a';
	// return name ? { id, name } : null;
	// }
	async createBatch(genres: Genre[]): Promise<boolean> {
		// main hash structure
		const genreStringified = genres.map((genre) => [`${genre.id}`, genre.name]);
		const response1 = await redis.hmset(REDIS_GENRE, ...genreStringified);
		return response1 === 'OK';
	}
}
