import { Service } from 'typedi';

import { Provider } from 'core/models/Provider';

@Service()
export abstract class IProviderUsecase {
	abstract async listProviders(): Promise<Provider[]>;
}
