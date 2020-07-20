import { gql } from 'apollo-server';

import { movieTypedef } from './movie/model';
import { movieResolver } from './movie/resolver';
import { providerTypedef } from './provider/model';
import { providerResolver } from './provider/resolver';
import { streamingTypedef } from './streaming/model';
import { streamingResolver } from './streaming/resolver';

const baseTypeDef = gql`
	type Query {
		dummy: String
	}
`;

export const typeDefs = [baseTypeDef, movieTypedef, streamingTypedef, providerTypedef];
export const resolvers = [movieResolver, streamingResolver, providerResolver];
