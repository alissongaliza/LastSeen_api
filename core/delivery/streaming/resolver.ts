import JustWatch from 'justwatch-api';
import { Resolver, ResolverInterface, FieldResolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { Provider } from 'core/models/Provider';

import { COMPANY_LOGO, ICON_SIZE } from 'util/constants';

import { StreamingGraphQL } from './model';

@Service()
@Resolver(StreamingGraphQL)
export class StreamingResolver implements ResolverInterface<StreamingGraphQL> {
	@FieldResolver()
	async provider(@Root() { idProvider }: { idProvider: number }): Promise<Provider | null> {
		const providers = await new JustWatch().getProviders();
		const iconLessProvider = providers.find((provider) => provider.id == idProvider);
		if (!iconLessProvider) return null;
		else {
			const iconURL = `${COMPANY_LOGO}${iconLessProvider.icon_url.replace('{profile}', ICON_SIZE)}`;
			const provider: Provider = { id: iconLessProvider.id, name: iconLessProvider.clear_name, iconURL };
			return provider;
		}
	}
}
