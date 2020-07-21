import JustWatch from 'justwatch-api';
import { Resolver, Query } from 'type-graphql';
import { Service } from 'typedi';

import { Provider } from 'core/models/Provider';

import { ProviderGraphQL } from './model';

@Service()
@Resolver(ProviderGraphQL)
export class ProviderResolver {
	@Query(() => [ProviderGraphQL])
	async searchProviders(): Promise<Provider[]> {
		return new JustWatch().getProviders().then((e) =>
			e.map(({ id, clear_name }) => {
				return { id, name: clear_name };
			})
		);
	}
}
