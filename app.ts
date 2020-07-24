import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import path from 'path';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';

import { resolvers } from 'core/delivery';
import { setupRepository } from 'core/repository';
import { setupUsecases } from 'core/usecase';

import { MODE } from 'util/enum';

const setup = () => {
	setupRepository(MODE.REGULAR);
	setupUsecases();
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
