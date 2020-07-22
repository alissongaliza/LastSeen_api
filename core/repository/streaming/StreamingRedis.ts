import { Service } from 'typedi';

import { Streaming } from 'core/models/Streaming';

import { REDIS_MOVIE_STREAMING } from 'util/constants';
import { iterateHash } from 'util/functions';

import { IStreamingRepository } from '../IStreamingRepository';

import { redis } from '..';

type StreamingWithMovie = Streaming & {
	movieId: number;
};
@Service()
export class StreamingRedis implements IStreamingRepository {
	async listByMovieId(movieId: number): Promise<Streaming[]> {
		// search movieId on streaming hash
		const parsedStreams: Streaming[] = [];
		let cursor = 0;
		let values;
		do {
			({ cursor, values } = await iterateHash(REDIS_MOVIE_STREAMING, cursor, `${movieId}:*`, 20));
			for (let i = 1; i < values.length; i += 2) {
				const streaming: Streaming = JSON.parse(values[i]);
				parsedStreams.push(streaming);
			}
		} while (cursor != 0);
		return parsedStreams;
	}
	async createBatch(streamings: StreamingWithMovie[]): Promise<boolean> {
		// main hash structure
		const streamingStringified = streamings.map((streaming) => [
			`${streaming.movieId}:${streaming.idProvider}`,
			JSON.stringify(streaming),
		]);
		const response1 = await redis.hmset(REDIS_MOVIE_STREAMING, ...streamingStringified);
		return response1 === 'OK';
	}
}
