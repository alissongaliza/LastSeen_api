import { Service } from 'typedi';

import { Genre } from 'core/models/Genre';

import { IGenreUsecase } from '../IGenreUsecase';

@Service()
export class GenreUsecaseMock implements IGenreUsecase {
	genres: Genre[] = [];
	findOneGenreById = async (id: number): Promise<Genre | null> => {
		const genre = this.genres.find((el) => el.id === id);
		return genre ? genre : null;
	};
	findManyGenresById = async (ids: number[]): Promise<Genre[]> => {
		const genres = this.genres.filter((el) => el.id in ids);
		return genres;
	};
	refreshAllGenres = async (): Promise<void> => {
		this.genres = [
			{ id: 1, name: 'War' },
			{ id: 2, name: 'Drama' },
			{ id: 3, name: 'Romance' },
		];
	};
}
