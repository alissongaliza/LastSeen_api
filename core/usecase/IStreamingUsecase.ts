import { Streaming } from 'core/models/Streaming';

export abstract class IStreamingUsecase {
	abstract async listStreaming(movieTitle?: string): Promise<Streaming[]>;
}
