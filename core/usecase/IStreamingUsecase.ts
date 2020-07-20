import { Service } from 'typedi';

import { Streaming } from 'core/models/Streaming';

@Service()
export abstract class IStreamingUsecase {
	abstract async listStreaming(movieTitle?: string): Promise<Streaming[]>;
}
