import { Service } from 'typedi';

import { Streaming } from 'core/models/Streaming';
export type StreamingWithMovie = Streaming & {
	movieId: number;
};

@Service()
export abstract class IStreamingRepository {
	abstract async listByMovieId(movieId: number): Promise<Streaming[]>;
	abstract async createBatch(streams: StreamingWithMovie[]): Promise<boolean>;
}
