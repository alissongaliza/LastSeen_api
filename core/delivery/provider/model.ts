import { ObjectType, Field, ID } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@ObjectType()
export class ProviderGraphQL {
	@Field(() => ID)
	id: number;
	@Field()
	name: string;
	@Field()
	iconURL: string;
}
