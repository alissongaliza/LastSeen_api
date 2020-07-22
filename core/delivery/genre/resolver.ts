import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { Genre } from 'core/models/Genre';

import { GenreGraphQL } from './model';

@Service()
@Resolver(GenreGraphQL)
export class GenreResolver {
	@FieldResolver()
	id(@Root() genre: Genre): number {
		return genre.id;
	}
	@FieldResolver()
	name(@Root() genre: Genre): string {
		return genre.name;
	}
}
