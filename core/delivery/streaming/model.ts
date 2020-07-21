import { ObjectType, Field } from 'type-graphql';
import { Service } from 'typedi';

import { Provider } from 'core/models/Provider';

import { ProviderGraphQL } from '../provider/model';

@Service()
@ObjectType()
export class StreamingGraphQL {
	idProvider: number; //hidden
	@Field(() => ProviderGraphQL, { nullable: true })
	provider?: Provider | null;
	@Field()
	web_url: string;
	@Field()
	android_url: string;
	@Field()
	ios_url: string;
}
