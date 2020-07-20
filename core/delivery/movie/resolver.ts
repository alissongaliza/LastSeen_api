import { MOVIES_GENRES } from 'app';
import axios from 'axios';
import JustWatch from 'justwatch-api';
import _ from 'lodash';

import { TMDB_BASE_URL, IMAGE_URL } from 'util/constants';

export const movieResolver = {
	Query: {
		searchByTitle: async (_, { title }: any) => {
			try {
				const { data } = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
					params: { api_key: process.env.TMDB_API_KEY, query: title },
				});
				return data.results;
			} catch (e) {
				return e;
			}
		},
		searchById: async (_, { id }: any) => {
			try {
				const { data } = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
					params: { api_key: process.env.TMDB_API_KEY },
				});
				return data.results;
			} catch (e) {
				return e;
			}
		},
		searchPopularMovies: async (_, _args: any) => {
			try {
				const { data } = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
					params: { api_key: process.env.TMDB_API_KEY },
				});
				return data.results;
			} catch (e) {
				return e;
			}
		},
	},
	Genre: {
		id: (id: any) =>
			_.find(MOVIES_GENRES, (el: { id: any }) => el.id == id)
				.id /*returns the matching obj, therefore i pick the wanted property*/,
		name: (id: any) => _.find(MOVIES_GENRES, (el: { id: any }) => el.id == id).name,
	},
	Movie: {
		poster_fullPath: ({ poster_path }) => `${IMAGE_URL}${poster_path}`,
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
};
