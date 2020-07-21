import { MOVIES_GENRES } from 'app';
import _ from 'lodash';
import { Resolver, ResolverInterface, FieldResolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { GenreGraphQL } from './model';

@Service()
@Resolver(GenreGraphQL)
export class GenreResolver implements ResolverInterface<GenreGraphQL> {
	@FieldResolver()
	id(@Root() { id }): number {
		return _.find(MOVIES_GENRES, (el: { id: number }) => el.id == id).id;
	}
	@FieldResolver()
	name(@Root() { id }): string {
		return _.find(MOVIES_GENRES, (el: { id: number }) => el.id == id).name;
	}
}
