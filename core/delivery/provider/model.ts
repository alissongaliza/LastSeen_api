import { gql } from 'apollo-server';

const providerTypedef = gql`
	type Provider {
		id: Int!
		name: String!
		iconURL: String!
	}

	extend type Query {
		searchProviders: [Provider]
	}
`;

export { providerTypedef };
