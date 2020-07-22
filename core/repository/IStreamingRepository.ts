import { Service } from 'typedi';

import { Streaming } from 'core/models/Streaming';
type StreamingWithMovie = Streaming & {
	movieId: number;
};

@Service()
export abstract class IStreamingRepository {
	abstract async listByMovieId(movieId: number): Promise<Streaming[]>;
	abstract async createBatch(streamings: StreamingWithMovie[]): Promise<boolean>;
}
