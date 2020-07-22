import { Service } from 'typedi';

import { Genre } from 'core/models/Genre';

import { REDIS_GENRE } from 'util/constants';

import { IGenreRepository } from '../IGenreRepository';

import { redis } from '..';

@Service()
export class GenreRedis implements IGenreRepository {
	async findById(id: number): Promise<Genre | null> {
		const name = await redis.hget(REDIS_GENRE, id.toString());
		return name ? { id, name } : null;
	}
	async createBatch(genres: Genre[]): Promise<boolean> {
		const response = await redis.hmset(REDIS_GENRE, genres);
		return response === 'OK';
	}
}
