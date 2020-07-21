import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class GenreGraphQL {
	@Field(() => ID)
	id: number;
	@Field()
	name: string;
}
