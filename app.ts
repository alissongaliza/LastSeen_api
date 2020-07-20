import { ApolloServer } from 'apollo-server';
import axios from 'axios';
import JustWatch from 'justwatch-api';
import _ from 'lodash';

import { typeDefs } from 'core/delivery';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const COMPANY_LOGO = 'https://images.justwatch.com';
const ICON_SIZE = 's100/';
const TMDB_API_KEY = 'dc1a229b6a5f81208412ed5e273fe045';
let helperCounter = 0;

let MOVIES_GENRES = [
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

// The resolvers provides a resolver function for each API endpoint
const resolvers = {
	Query: {
		searchByTitle: (obj, { title }, context, info) => {
			console.log(++helperCounter, 'Procurou por ', title);
			return axios
				.get(`${TMDB_BASE_URL}/search/movie`, {
					params: { api_key: TMDB_API_KEY, query: title },
				})
				.then(({ data }) => data.results)
				.catch((e) => e);
		},
		searchById: (obj, { id }, context, info) => {
			return axios
				.get(`${TMDB_BASE_URL}/movie/${id}`, {
					params: { api_key: TMDB_API_KEY },
				})
				.then(({ data }) => data.results)
				.catch((e) => e);
		},
		searchPopularMovies: (obj, args, context, info) => {
			return axios
				.get(`${TMDB_BASE_URL}/movie/popular`, {
					params: { api_key: TMDB_API_KEY },
				})
				.then(({ data }) => {
					console.log(++helperCounter, 'Searched Popular Movies');

					return data.results;
				})
				.catch((e) => e);
		},
		searchProviders: () => {
			return new JustWatch().getProviders().then((e) =>
				e.map(({ id, clear_name }) => {
					return { id, name: clear_name };
				})
			);
		},
		searchAvailabilityByTitle: async (obj, { title }, context, info) => {
			const movies = await new JustWatch().search({ query: title });

			const providers = movies.items[0].offers.map(({ provider_id, urls }) => {
				//each resolution (hd,sd,etc) is returned as a new provider, but
				//I'm only interested in the provider id, so I still have to remove the duplicates
				return {
					id: provider_id,
					web_url: urls.standard_web,
					android_url: urls.deeplink_android,
					ios_url: urls.deeplink_ios,
				};
			});
			return _.uniqBy(providers, 'id'); //removes duplicates
		},
	},
	Genre: {
		id: (id) => {
			return _.find(MOVIES_GENRES, (el) => el.id == id).id; //returns the matching obj, therefore i pick the wanted property
		},
		name: (id) => {
			return _.find(MOVIES_GENRES, (el) => el.id == id).name;
		},
	},
	Movie: {
		poster_fullPath: ({ poster_path }) => {
			return `${IMAGE_URL}${poster_path}`;
		},
		streamingServices: async ({ title }) => {
			const movies = await new JustWatch().search({ query: title });

			if (movies.items[0].offers == undefined) return null;
			const providers = movies.items[0].offers.map(({ provider_id, urls }) => {
				//each resolution (hd,sd,etc) is returned as a new provider, but
				//I'm only interested in the provider id, so I still have to remove the duplicates
				return {
					id: provider_id,
					web_url: urls.standard_web,
					android_url: urls.deeplink_android,
					ios_url: urls.deeplink_ios,
				};
			});
			return _.uniqBy(providers, 'id'); //removes duplicates
		},
		genres: ({ genre_ids }) => genre_ids,
	},
	Streaming: {
		company: ({ id }) => {
			return new JustWatch().getProviders().then((e) => {
				const company = e.filter((el) => {
					return el.id == id;
				})[0];

				if (!company) return null;
				else {
					const iconURL = `${COMPANY_LOGO}${company.icon_url.replace('{profile}', ICON_SIZE)}`;
					return { id: company.id, name: company.clear_name, iconURL };
				}
			});
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers, cors: true });
server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});

const refreshGenres = () => {
	axios
		.get(`${TMDB_BASE_URL}/genre/movie/list`, {
			params: { api_key: TMDB_API_KEY },
		})
		.then(({ data }) => (MOVIES_GENRES = data.genres))
		.catch((e) => e);
};
refreshGenres();
