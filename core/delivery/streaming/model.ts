import { gql } from 'apollo-server';

const streamingTypedef = gql`
	type Streaming {
		company: Company
		web_url: String
		android_url: String
		ios_url: String
	}

	extend type Query {
		searchAvailabilityByTitle(title: String!): [Streaming]
	}
`;

export { streamingTypedef };
