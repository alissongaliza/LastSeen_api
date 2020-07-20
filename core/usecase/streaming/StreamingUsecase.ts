import JustWatch from 'justwatch-api';
import _ from 'lodash';

import { Streaming } from 'core/models/Streaming';

import { IStreamingUsecase } from '../IStreamingUsecase';

export class StreamingUsecase implements IStreamingUsecase {
	async listStreaming(movieTitle?: string): Promise<Streaming[]> {
		const movies = await new JustWatch().search({ query: movieTitle });

		const providers = movies.items[0].offers.map(({ provider_id, urls }) => {
			//each resolution (hd,sd,etc) is returned as a new provider, but
			//I'm only interested in the provider id, so I still have to remove the duplicates
			return {
				id: provider_id,
				web_url: urls.standard_web,
				android_url: urls.deeplink_android,
				ios_url: urls.deeplink_ios,
			};
		});
		return _.uniqBy(providers, 'id'); //removes duplicates
	}
}
