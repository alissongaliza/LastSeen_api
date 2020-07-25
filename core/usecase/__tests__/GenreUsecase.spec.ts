import 'reflect-metadata';

import { GenreUsecaseMock } from '../genre/GenreUsecase.mock';

// describe('GenreUsecaseAPI', () => {
// 	setupRepository(MODE.TEST);
// 	const genreUsecase = Container.get(GenreUsecase);
// 	it('findOneGenreById', async () => {
// 		// searches for genres of ids from 1 to 100
// 		const genre = await genreUsecase.findOneGenreById(1);
// 		expect(genre).toBeNull();

// 		genreUsecase.refreshAllGenres();
// 		const newGenre1 = await genreUsecase.findOneGenreById(1);
// 		const newGenre2 = await genreUsecase.findOneGenreById(2);
// 		const newGenreIdem = await genreUsecase.findOneGenreById(1);
// 		expect(newGenre1).toBeTruthy();
// 		// genre 1 and genre 2 should be differente
// 		expect(newGenre1).not.toBe(newGenre2);
// 		// testing idempotency
// 		expect(newGenre1).toBe(newGenreIdem);
// 	});
// 	it('findManyGenreById and updateAllGenres', async () => {
// 		// grouping testes sounds bad so I should change this in the future
// 		// searches for genres of ids from 1 to 100
// 		const range: number[] = [...Array(100).keys()];
// 		const genres = await genreUsecase.findManyGenresById(range);
// 		expect(genres.length).toBe(0);

// 		genreUsecase.refreshAllGenres();
// 		const newGenres1 = await genreUsecase.findManyGenresById(range);
// 		const newGenresIdem = await genreUsecase.findManyGenresById(range);
// 		expect(newGenres1.length).toBeGreaterThan(0);
// 		// testing idempotency
// 		expect(newGenres1).toBe(newGenresIdem);
// 	});
// });

describe('GenreUsecaseMock', () => {
	let genreUsecase: GenreUsecaseMock;
	beforeEach(() => (genreUsecase = new GenreUsecaseMock()));
	it('findOneGenreById', async () => {
		// searches for genres of ids from 1 to 100
		const genre = await genreUsecase.findOneGenreById(1);
		expect(genre).toBeNull();

		genreUsecase.refreshAllGenres();
		const newGenre1 = await genreUsecase.findOneGenreById(1);
		const newGenre2 = await genreUsecase.findOneGenreById(2);
		const newGenreIdem = await genreUsecase.findOneGenreById(1);
		expect(newGenre1).toBeTruthy();
		// genre 1 and genre 2 should be differente
		expect(newGenre1).not.toBe(newGenre2);
		// testing idempotency
		expect(newGenre1).toStrictEqual(newGenreIdem);
	});
	it('findManyGenreById and updateAllGenres', async () => {
		// grouping testes sounds bad so I should change this in the future
		// searches for genres of ids from 1 to 100
		const range: number[] = [...Array(100).keys()];
		const genres = await genreUsecase.findManyGenresById(range);
		expect(genres.length).toBe(0);

		genreUsecase.refreshAllGenres();
		const newGenres1 = await genreUsecase.findManyGenresById(range);
		const newGenresIdem = await genreUsecase.findManyGenresById(range);
		expect(newGenres1.length).toBeGreaterThan(0);
		// testing idempotency
		expect(newGenres1).toStrictEqual(newGenresIdem);
	});
});
