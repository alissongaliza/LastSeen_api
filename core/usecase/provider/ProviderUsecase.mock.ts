import { Service } from 'typedi';

import { Provider } from 'core/models/Provider';

import { IProviderUsecase } from '../IProviderUsecase';

@Service()
export class ProviderUsecaseMock implements IProviderUsecase {
	async listProviders(): Promise<Provider[]> {
		const providers: Provider[] = [
			{ iconURL: 'netflix.com', id: 1, name: 'netflix' },
			{ iconURL: 'primevideo.com', id: 2, name: 'primevideo' },
		];
		return providers;
	}
}
