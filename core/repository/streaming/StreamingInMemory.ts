import { Service } from 'typedi';

import { Streaming } from 'core/models/Streaming';

import { IStreamingRepository, StreamingWithMovie } from '../IStreamingRepository';

@Service()
export class StreamingInMemory implements IStreamingRepository {
	private streamingsHash: StreamingWithMovie[];
	constructor() {
		this.streamingsHash = [];
	}
	listByMovieId = (movieId: number): Promise<Streaming[]> =>
		new Promise((resolve) => {
			resolve(this.streamingsHash.filter((el) => el.movieId === movieId));
		});
	createBatch = (streams: StreamingWithMovie[]): Promise<boolean> =>
		new Promise((resolve) => {
			// allowing partial insertion for now
			streams.map((el) => this.streamingsHash.push(el));
			resolve(streams.length === this.streamingsHash.length);
		});
}
