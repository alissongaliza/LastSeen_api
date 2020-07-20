import { gql } from 'apollo-server';

const movieTypedef = gql`
	type Movie {
		id: Int!
		title: String!
		genres: [Genre]
		original_language: String
		original_title: String
		overview: String
		popularity: Float
		release_date: String
		runtime: Int
		tagline: String
		vote_average: Float
		vote_count: Int
		poster_path: String
		poster_fullPath: String
		streamingServices: [Streaming]
	}

	type Genre {
		id: Int!
		name: String!
	}

	extend type Query {
		searchByTitle(title: String!): [Movie]
		searchPopularMovies: [Movie]
		searchById(id: Int!): Movie
	}
`;

export { movieTypedef };
