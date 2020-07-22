import { Service } from 'typedi';

import { Movie } from 'core/models/Movie';
import { Streaming } from 'core/models/Streaming';

@Service()
export abstract class IStreamingUsecase {
	abstract async listStreaming(movie: Movie): Promise<Streaming[]>;
}
