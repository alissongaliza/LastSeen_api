import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import axios from 'axios';
import path from 'path';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';

import { resolvers } from 'core/delivery';
import { setupRepository } from 'core/repository';
import { setupUsecases } from 'core/usecase';

import { TMDB_BASE_URL } from 'util/constants';

export let MOVIES_GENRES = [
	{ id: 28, name: 'Action' },
	{ id: 12, name: 'Adventure' },
	{ id: 16, name: 'Animation' },
	{ id: 35, name: 'Comedy' },
	{ id: 80, name: 'Crime' },
	{ id: 99, name: 'Documentary' },
	{ id: 18, name: 'Drama' },
	{ id: 10751, name: 'Family' },
	{ id: 14, name: 'Fantasy' },
	{ id: 36, name: 'History' },
	{ id: 27, name: 'Horror' },
	{ id: 10402, name: 'Music' },
	{ id: 9648, name: 'Mystery' },
	{ id: 10749, name: 'Romance' },
	{ id: 878, name: 'Science Fiction' },
	{ id: 10770, name: 'TV Movie' },
	{ id: 53, name: 'Thriller' },
	{ id: 10752, name: 'War' },
	{ id: 37, name: 'Western' },
];

const setup = () => {
	setupUsecases();
	refreshGenres();
};

const refreshGenres = () => {
	axios
		.get(`${TMDB_BASE_URL}/genre/movie/list`, {
			params: { api_key: process.env.TMDB_API_KEY },
		})
		.then(({ data }) => (MOVIES_GENRES = data.genres))
		.catch((e) => e);
};

const main = async () => {
	setup();
	const schema = await buildSchema({
		resolvers,
		emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
		container: Container,
	});
	new ApolloServer({ schema }).listen().then(({ url }) => {
		console.log(`Server ready at ${url}`);
	});
};

main();
