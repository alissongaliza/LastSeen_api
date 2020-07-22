import Redis from 'ioredis';
import Container from 'typedi';

import { GenreRedis } from './genre/GenreRedis';
import { IGenreRepository } from './IGenreRepository';
import { IMovieRepository } from './IMovieRepository';
import { IStreamingRepository } from './IStreamingRepository';
import { MovieRedis } from './movie/MovieRedis';
import { StreamingRedis } from './streaming/StreamingRedis';

export const redis = new Redis(6379, 'lastseen-redis');
export const setupRepository = async (): Promise<void> => {
	Container.set(IGenreRepository, new GenreRedis());
	Container.set(IMovieRepository, new MovieRedis());
	Container.set(IStreamingRepository, new StreamingRedis());
};
