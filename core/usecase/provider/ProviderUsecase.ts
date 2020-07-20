import JustWatch from 'justwatch-api';
import { Service } from 'typedi';

import { Provider } from 'core/models/Provider';

import { IProviderUsecase } from '../IProviderUsecase';

@Service()
export class ProviderUsecase implements IProviderUsecase {
	async listProviders(): Promise<Provider[]> {
		return new JustWatch().getProviders().then((e) =>
			e.map(({ id, clear_name }) => {
				return { id, name: clear_name };
			})
		);
	}
}
