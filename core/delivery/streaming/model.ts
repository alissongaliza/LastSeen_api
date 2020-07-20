import { gql } from 'apollo-server';

const streamingTypedef = gql`
	type Streaming {
		provider: Provider
		web_url: String
		android_url: String
		ios_url: String
	}

	extend type Query {
		searchStreamingOptionsByMovieTitle(title: String!): [Streaming]
	}
`;

export { streamingTypedef };
