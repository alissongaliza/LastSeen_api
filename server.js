const { ApolloServer, gql } = require('apollo-server')
var axios = require("axios");
const _ = require('lodash');
const JustWatch = require("justwatch-api");


const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const COMPANY_LOGO = 'https://images.justwatch.com'
const ICON_SIZE = 's100/'
const TMDB_API_KEY = "dc1a229b6a5f81208412ed5e273fe045";


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
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
    vote_average: Float,
    vote_count: Int
    poster_path: String
    poster_fullPath: String
    streamingServices: [Streaming]
  }

  type Genre {
    id: Int!
    name: String!
  }

  type Streaming {
    company: Company!
    web_url: String
    android_url: String
    ios_url: String
  }

  type Company {
    id: Int!
    name: String!
    iconURL: String!
  }

  type Query {
    searchByTitle(title:String!): [Movie]
    searchPopularMovies:[Movie]
    searchById(id:Int!): Movie
    searchAvailabilityByTitle(title:String!): [Streaming]
    searchProviders: [Company]
  }
`;
// The resolvers provides a resolver function for each API endpoint
const resolvers = {
    Query: {
        searchByTitle: (obj, { title }, context, info) => {
            return axios
                .get(`${TMDB_BASE_URL}/search/movie`, {
                    params: { api_key: TMDB_API_KEY, query: title }
                })
                .then((data) => data.data.results)
                .catch(e => e);
        },
        searchById: (obj, { id }, context, info) => {
            console.log(id);

            return axios
                .get(`${TMDB_BASE_URL}/movie/${id}`, {
                    params: { api_key: TMDB_API_KEY }
                })
                .then(({ data }) => console.log(data))
                .catch(e => e);
        },
        searchPopularMovies: (obj, args, context, info) => {
            return axios
                .get(`${TMDB_BASE_URL}/movie/popular`, {
                    params: { api_key: TMDB_API_KEY }
                })
                .then(({ data }) => {
                    console.log('Searched Popular Movies')
                    return data.results
                })
                .catch(e => e);
        },
        searchProviders: () => {
            return new JustWatch().getProviders().then(e =>
                e.map(({ id, clear_name }) => {
                    return { id, name: clear_name };
                })
            );
        },
        searchAvailabilityByTitle: async (obj, { title }, context, info) => {
            const movies = await new JustWatch().search({ query: title });

            let providers = movies.items[0].offers.map(({ provider_id, urls }) => {
                //each resolution (hd,sd,etc) is returned as a new provider, but 
                //I'm only interested in the provider id, so I still have to remove the duplicates
                return {
                    id: provider_id,
                    web_url: urls.standard_web,
                    android_url: urls.deeplink_android,
                    ios_url: urls.deeplink_ios
                };
            });
            return _.uniqBy(providers, 'id');  //removes duplicates
        }
    },
    Movie: {
        poster_fullPath: ({ poster_path }) => {
            return `${IMAGE_URL}${poster_path}`
        },
        streamingServices:async ({title}) => {
            const movies = await new JustWatch().search({ query: title });

            let providers = movies.items[0].offers.map(({ provider_id, urls }) => {
                //each resolution (hd,sd,etc) is returned as a new provider, but 
                //I'm only interested in the provider id, so I still have to remove the duplicates
                return {
                    id: provider_id,
                    web_url: urls.standard_web,
                    android_url: urls.deeplink_android,
                    ios_url: urls.deeplink_ios
                };
            });
            return _.uniqBy(providers, 'id');  //removes duplicates
        }


    },
    Streaming: {
        company: ({ id }) => {
            return new JustWatch().getProviders().then(e => {


                const company = e.filter(el => {
                   return el.id == id
                })[0]

                if (!company)
                    return null
                else{
                    const iconURL = `${COMPANY_LOGO}${company.icon_url.replace('{profile}',ICON_SIZE)}`
                    return { id: company.id, name: company.clear_name, iconURL }
                }
            }
            );
        }
    }

};

const server = new ApolloServer({ typeDefs, resolvers, cors: true });
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);

});
