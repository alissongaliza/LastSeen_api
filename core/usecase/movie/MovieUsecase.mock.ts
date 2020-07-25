import { Service, Inject } from 'typedi';

import { Movie } from 'core/models/Movie';
import { IMovieRepository } from 'core/repository/IMovieRepository';

import { IMovieUsecase } from '../IMovieUsecase';

@Service()
export class MovieUsecaseMock implements IMovieUsecase {
	@Inject()
	movieRepository: IMovieRepository;
	movies: Movie[] = [];
	findOneMovieById = async (id: number): Promise<Movie | null> => {
		const movie = this.movies.find((el) => el.id === id);
		return movie ? movie : null;
	};
	findOneMovieByTitle = async (title: string): Promise<Movie | null> => {
		const movie = this.movies.find((el) => el.title === title);
		return movie ? movie : null;
	};

	listPopularMovies = async (): Promise<Movie[]> =>
		this.movies.length === 0 ? this.refreshPopularMovies() : this.movies;
	refreshPopularMovies = async (): Promise<Movie[]> => {
		this.movies = [
			{
				id: 1,
				title: 'title',
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
			},
			{
				id: 2,
				title: 'title2',
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
			},
		];
		return this.movies;
	};
}
