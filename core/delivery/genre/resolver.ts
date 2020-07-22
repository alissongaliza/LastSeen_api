import { Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { GenreGraphQL } from './model';

@Service()
@Resolver(GenreGraphQL)
export class GenreResolver {
	// @Inject()
	// genreUsecase: IGenreUsecase;
	// @FieldResolver()
	// id(@Root() { id }): number {
	// 	return this.genreUsecase.findOneGenreById(id);
	// }
	// @FieldResolver()
	// name(@Root() { id }): string {
	// 	return _.find(MOVIES_GENRES, (el: { id: number }) => el.id == id).name;
	// }
}
