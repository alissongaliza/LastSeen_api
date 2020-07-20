import Container from 'typedi';

import { IMovieUsecase } from './IMovieUsecase';
import { IProviderUsecase } from './IProviderUsecase';
import { IStreamingUsecase } from './IStreamingUsecase';
import { MovieUsecase } from './movie/MovieUsecase';
import { ProviderUsecase } from './provider/ProviderUsecase';
import { StreamingUsecase } from './streaming/StreamingUsecase';

export const setupUsecases = (): void => {
	Container.set(IMovieUsecase, Container.get(MovieUsecase));
	Container.set(IStreamingUsecase, Container.get(StreamingUsecase));
	Container.set(IProviderUsecase, Container.get(ProviderUsecase));
};
