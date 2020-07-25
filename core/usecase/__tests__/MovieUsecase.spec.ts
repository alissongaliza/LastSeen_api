import 'reflect-metadata';
import { MovieUsecaseMock } from '../movie/MovieUsecase.mock';

// describe('MovieUsecaseAPI', () => {
// 	setupRepository(MODE.TEST);
// 	const movieUsecase = Container.get(MovieUsecase);
// 	it('findOneMovieById', async () => {
// 		// searches for movies of ids from 1 to 100
// 		const movie = await movieUsecase.findOneMovieById(1);
// 		expect(movie).toBeNull();

// 		movieUsecase.refreshPopularMovies();
// 		const newMovie1 = await movieUsecase.findOneMovieById(1);
// 		const newMovieIdem = await movieUsecase.findOneMovieById(1);
// 		expect(newMovie1).toBeTruthy();
// 		// testing idempotency
// 		expect(newMovie1).toBe(newMovieIdem);
// 	});
// 	it('findOneMovieByTitle', async () => {
// 		const newMovie1 = await movieUsecase.findOneMovieByTitle('title');
// 		const newMovie2 = await movieUsecase.findOneMovieByTitle('title2');
// 		const newMovieIdem = await movieUsecase.findOneMovieByTitle('title');
// 		expect(newMovie1).toBeTruthy();
// 		// movie 1 and movie 2 should be different
// 		expect(newMovie2).not.toBe(newMovie1);
// 		// testing idempotency
// 		expect(newMovie1).toBe(newMovieIdem);
// 	});
// 	it('refreshPopularMovies and listPopularMovies', async () => {
// 		// grouping testes sounds bad so I should change this in the future
// 		const movies1 = await movieUsecase.listPopularMovies();
// 		const moviesIdem = await movieUsecase.listPopularMovies();
// 		expect(movies1.length).toBeGreaterThan(0);
// 		// testing idempotency
// 		expect(movies1).toBe(moviesIdem);
// 	});
// });

describe('MovieUsecaseMock', () => {
	let movieUsecase: MovieUsecaseMock;
	beforeEach(() => (movieUsecase = new MovieUsecaseMock()));
	it('findOneMovieById', async () => {
		// searches for movies of ids from 1 to 100
		const movie = await movieUsecase.findOneMovieById(1);
		expect(movie).toBeNull();

		movieUsecase.refreshPopularMovies();
		const newMovie1 = await movieUsecase.findOneMovieById(1);
		const newMovieIdem = await movieUsecase.findOneMovieById(1);
		expect(newMovie1).toBeTruthy();
		// testing idempotency
		expect(newMovie1).toStrictEqual(newMovieIdem);
	});
	it('findOneMovieByTitle', async () => {
		const movie = await movieUsecase.findOneMovieByTitle('title');
		expect(movie).toBeNull();

		movieUsecase.refreshPopularMovies();
		const newMovie1 = await movieUsecase.findOneMovieByTitle('title');
		const newMovie2 = await movieUsecase.findOneMovieByTitle('title2');
		const newMovieIdem = await movieUsecase.findOneMovieByTitle('title');
		expect(newMovie1).toBeTruthy();
		// movie 1 and movie 2 should be different
		expect(newMovie2).not.toBe(newMovie1);
		// testing idempotency
		expect(newMovie1).toStrictEqual(newMovieIdem);
	});
	it('refreshPopularMovies and listPopularMovies', async () => {
		// grouping testes sounds bad so I should change this in the future
		const movies1 = await movieUsecase.listPopularMovies();
		const moviesIdem = await movieUsecase.listPopularMovies();
		expect(movies1.length).toBeGreaterThan(0);
		// testing idempotency
		expect(movies1).toStrictEqual(moviesIdem);
	});
});
