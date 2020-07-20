import { gql } from 'apollo-server';

const companyTypedef = gql`
	type Company {
		id: Int!
		name: String!
		iconURL: String!
	}

	extend type Query {
		searchProviders: [Company]
	}
`;

export { companyTypedef };
