import 'reflect-metadata';

import { Movie } from 'core/models/Movie';
import { Streaming } from 'core/models/Streaming';

import { StreamingUsecaseMock } from '../streaming/StreamingUsecase.mock';

// describe('StreamingUsecaseAPI', () => {
// 	// using in-memory native(ts/js data structures) database
// 	setupRepository(MODE.TEST);
// 	// concrete class that makes API calls
// 	const streamingUsecase = Container.get(StreamingUsecase);
// 	const movie1: Movie = {
// 		id: 1,
// 		title: 'title1',
// 		genres: [{ id: 1, name: 'war' }],
// 		genre_ids: [1],
// 		original_language: '',
// 		original_title: '',
// 		overview: '',
// 		popularity: 1000,
// 		release_date: '',
// 		runtime: 1000,
// 		tagline: '',
// 		vote_average: 1000,
// 		vote_count: 1000,
// 		poster_path: '',
// 		poster_fullPath: '',
// 		streamingServices: [
// 			{ android_url: '', ios_url: '', idProvider: 1, provider: { iconURL: '', id: 1, name: '' }, web_url: '' },
// 		],
// 	};
// 	const movie2: Movie = {
// 		id: 1,
// 		title: 'title1',
// 		genres: [{ id: 1, name: 'war' }],
// 		genre_ids: [1],
// 		original_language: '',
// 		original_title: '',
// 		overview: '',
// 		popularity: 1000,
// 		release_date: '',
// 		runtime: 1000,
// 		tagline: '',
// 		vote_average: 1000,
// 		vote_count: 1000,
// 		poster_path: '',
// 		poster_fullPath: '',
// 		streamingServices: [
// 			{ android_url: '', ios_url: '', idProvider: 1, provider: { iconURL: '', id: 1, name: '' }, web_url: '' },
// 		],
// 	};
// 	it('listStreamings', async () => {
// 		// searches for streamings of ids from 1 to 100
// 		const streamings1: Streaming[] = await streamingUsecase.listStreamingByMovie(movie1);
// 		const streamings2: Streaming[] = await streamingUsecase.listStreamingByMovie(movie2);
// 		const streamingsIdem: Streaming[] = await streamingUsecase.listStreamingByMovie(movie1);
// 		expect(streamings1.length).toBeGreaterThan(0);
// 		// streaming 1 and 2 should be different
// 		expect(streamings1).not.toBe(streamings2);
// 		// testing idempotency
// 		expect(streamings1).toBe(streamingsIdem);
// 	});
// });
describe('StreamingUsecaseMock', () => {
	let streamingUsecase: StreamingUsecaseMock;
	beforeEach(() => (streamingUsecase = new StreamingUsecaseMock()));
	const movie1: Movie = {
		id: 1,
		title: 'title1',
		genres: [{ id: 1, name: 'war' }],
		genre_ids: [1],
		original_language: '',
		original_title: '',
		overview: '',
		popularity: 1000,
		release_date: '',
		runtime: 1000,
		tagline: '',
		vote_average: 1000,
		vote_count: 1000,
		poster_path: '',
		poster_fullPath: '',
		streamingServices: [
			{ android_url: '', ios_url: '', idProvider: 1, provider: { iconURL: '', id: 1, name: '' }, web_url: '' },
		],
	};
	const movie2: Movie = {
		id: 1,
		title: 'title1',
		genres: [{ id: 1, name: 'war' }],
		genre_ids: [1],
		original_language: '',
		original_title: '',
		overview: '',
		popularity: 1000,
		release_date: '',
		runtime: 1000,
		tagline: '',
		vote_average: 1000,
		vote_count: 1000,
		poster_path: '',
		poster_fullPath: '',
		streamingServices: [
			{ android_url: '', ios_url: '', idProvider: 1, provider: { iconURL: '', id: 1, name: '' }, web_url: '' },
		],
	};
	it('listStreamings', async () => {
		// searches for streamings of ids from 1 to 100
		const streamings1: Streaming[] = await streamingUsecase.listStreamingByMovie(movie1);
		const streamings2: Streaming[] = await streamingUsecase.listStreamingByMovie(movie2);
		const streamingsIdem: Streaming[] = await streamingUsecase.listStreamingByMovie(movie1);
		expect(streamings1.length).toBeGreaterThan(0);
		// streaming 1 and 2 should be different
		expect(streamings1).not.toBe(streamings2);
		// testing idempotency
		expect(streamings1).toStrictEqual(streamingsIdem);
	});
});
