import { Provider } from 'core/models/Provider';

export abstract class IProviderUsecase {
	abstract async listProviders(): Promise<Provider[]>;
}
