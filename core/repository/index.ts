import Redis from 'ioredis';
import Container from 'typedi';

import { MODE } from 'util/enum';

import { GenreInMemory } from './genre/GenreInMemory';
import { GenreRedis } from './genre/GenreRedis';
import { IGenreRepository } from './IGenreRepository';
import { IMovieRepository } from './IMovieRepository';
import { IStreamingRepository } from './IStreamingRepository';
import { MovieInMemory } from './movie/MovieInMemory';
import { MovieRedis } from './movie/MovieRedis';
import { StreamingInMemory } from './streaming/StreamingInMemory';
import { StreamingRedis } from './streaming/StreamingRedis';

export const redis = new Redis(6379, 'lastseen-redis');
export const setupRepository = async (mode: MODE): Promise<void> => {
	switch (mode) {
		case MODE.REGULAR: {
			Container.set(IGenreRepository, new GenreRedis());
			Container.set(IMovieRepository, new MovieRedis());
			Container.set(IStreamingRepository, new StreamingRedis());
			break;
		}
		case MODE.TEST: {
			Container.set(IGenreRepository, new GenreInMemory());
			Container.set(IMovieRepository, new MovieInMemory());
			Container.set(IStreamingRepository, new StreamingInMemory());
			break;
		}
	}
};
