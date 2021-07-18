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

export const TMDB_API_KEY = JSON.parse(process.env?.secrets ?? '')?.TMDB_API_KEY;
const REDIS_CLUSTER_PORT = parseInt(JSON.parse(process.env?.secrets ?? '')?.REDIS_CLUSTER_PORT);
const REDIS_CLUSTER_HOST = JSON.parse(process.env?.secrets ?? '')?.REDIS_CLUSTER_HOST;

export const redis = new Redis(REDIS_CLUSTER_PORT ?? 6379, REDIS_CLUSTER_HOST ?? '');

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
