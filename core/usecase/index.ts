import Container from 'typedi';

import { GenreUsecase } from './genre/GenreUsecase';
import { IGenreUsecase } from './IGenreUsecase';
import { IMovieUsecase } from './IMovieUsecase';
import { IProviderUsecase } from './IProviderUsecase';
import { IStreamingUsecase } from './IStreamingUsecase';
import { MovieUsecase } from './movie/MovieUsecase';
import { ProviderUsecase } from './provider/ProviderUsecase';
import { StreamingUsecase } from './streaming/StreamingUsecase';

const preLoadGenres = async (): Promise<void> => {
	const genreUsecase = Container.get(GenreUsecase);
	await genreUsecase.updateAllGenres();
};

export const setupUsecases = (): void => {
	Container.set(IMovieUsecase, Container.get(MovieUsecase));
	Container.set(IStreamingUsecase, Container.get(StreamingUsecase));
	Container.set(IProviderUsecase, Container.get(ProviderUsecase));
	Container.set(IGenreUsecase, Container.get(GenreUsecase));
	preLoadGenres();
};
