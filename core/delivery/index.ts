import { gql } from 'apollo-server';

import { companyTypedef } from './company/model';
import { movieTypedef } from './movie/model';
import { streamingTypedef } from './streaming/model';

const baseTypeDef = gql`
	type Query {
		dummy: String
	}
`;

export const typeDefs = [baseTypeDef, movieTypedef, streamingTypedef, companyTypedef];
