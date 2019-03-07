var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
var axios = require("axios");
const _ = require('lodash')
const JustWatch = require("justwatch-api");

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_API_KEY = "dc1a229b6a5f81208412ed5e273fe045";


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Movie {
    id: Int!
    title: String!
    genres: [Genre]
    original_language: String
    original_title: String
    overview: String
    release_date: String
    runtime: Int
    status: String
    tagline: String
    vote_average: Float,
    vote_count: Int
    poster_path: String
  }

  type TinyMovie{
    id: Int!
    title: String!
    original_title: String
    release_date: String
    vote_average: Float,
    vote_count: Int
    poster_path: String
  }

  type Genre {
    id: Int!
    name: String!
  }

  type Streaming {
    id: Int!
    web_url: String
    android_url: String
    ios_url: String
  }

  type Company {
    id: Int!
    name: String!
  }

  type Query {
    searchByTitle(title:String!): [TinyMovie]
    searchById(id:Int!): Movie
    searchAvailabilityByTitle(title:String!): [Streaming]
    searchProviders: [Company]
  }

  fragment movieInfo on Movie {
    id
    title
    original_language
    original_title
    overview
    release_date
    runtime
    status
    tagline
    vote_average
    vote_count
  }

  fragment tinyMovieInfo on Movie {
    id
    title
    original_title
    release_date
    vote_average
    vote_count
  }
`);
// The root provides a resolver function for each API endpoint
var root = {
  searchByTitle: ({ title }) => {
    return axios
      .get(`${TMDB_BASE_URL}/search/movie`, {
        params: { api_key: TMDB_API_KEY, query: title }
      })
      .then(({ data }) => data.results)
      .catch(e => e);
  },
  searchById: ({ id }) => {
    return axios
      .get(`${TMDB_BASE_URL}/movie/${id}`, {
        params: { api_key: TMDB_API_KEY }
      })
      .then(({ data }) => console.log(data))
      .catch(e => e);
  },
  searchProviders: () => {
    return new JustWatch().getProviders().then(e =>
      e.map(({ id, clear_name }) => {
        return { id, name: clear_name };
      })
    );
  },
  searchAvailabilityByTitle: async ({ title }) => {
    const movies = await new JustWatch().search({ query: title });

    let providers = movies.items[0].offers.map(({ provider_id, urls }) => {     
      //each resolution (hd,sd,etc) is returned as a new provider, but I'm only interested in the provider id, so I still have to remove the duplicates
      return {
        id: provider_id,
        web_url: urls.standard_web,
        android_url: urls.deeplink_android,
        ios_url: urls.deeplink_ios
      };
    });
    return _.uniqBy(providers,'id');  //removes duplicates
  }
  // searchMoviePoster:({ path }) => {
  //   return axios
  //     .get(`${IMAGE_URL}/${path}`, { params: { api_key:TMDB_API_KEY } })
  //     .then(({ data }) =>{
        
  //     })
  //     .catch(e => console.log(e));
  // }
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000);
