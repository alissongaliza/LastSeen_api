import { gql } from 'apollo-server';

import { companyTypedef } from './company/model';
import { companyResolver } from './company/resolver';
import { movieTypedef } from './movie/model';
import { movieResolver } from './movie/resolver';
import { streamingTypedef } from './streaming/model';
import { streamingResolver } from './streaming/resolver';

const baseTypeDef = gql`
	type Query {
		dummy: String
	}
`;

export const typeDefs = [baseTypeDef, movieTypedef, streamingTypedef, companyTypedef];
export const resolvers = [movieResolver, streamingResolver, companyResolver];
