import { ObjectType, ID, Field, Float, Int } from 'type-graphql';
import { Service } from 'typedi';

import { Genre } from 'core/models/Genre';
import { Streaming } from 'core/models/Streaming';

import { GenreGraphQL } from '../genre/model';
import { StreamingGraphQL } from '../streaming/model';

@Service()
@ObjectType()
export class MovieGraphQL {
	@Field(() => ID)
	id: number;
	@Field()
	title: string;
	@Field(() => [GenreGraphQL])
	genres: Genre[];
	genre_ids: number[]; // not exposed
	@Field()
	original_language: string;
	@Field()
	original_title: string;
	@Field()
	overview: string;
	@Field(() => Float)
	popularity: number;
	@Field()
	release_date: string;
	@Field(() => Int)
	runtime: number;
	@Field()
	tagline: string;
	@Field(() => Float)
	vote_average: number;
	@Field(() => Int)
	vote_count: number;
	@Field()
	poster_path: string;
	@Field()
	poster_fullPath: string;
	@Field(() => [StreamingGraphQL])
	streamingServices: Streaming[];
}
