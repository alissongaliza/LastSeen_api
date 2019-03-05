var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
var axios = require("axios");

const BASE_URL = "https://api.themoviedb.org/3";
// const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const api_key = "dc1a229b6a5f81208412ed5e273fe045";

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
  }

  type TinyMovie{
    id: Int!
    title: String!
    original_title: String
    release_date: String
    vote_average: Float,
    vote_count: Int
  }

  type Genre {
    id: Int!
    name: String!
  }

  type Query {
    searchByTitle(title:String!): [TinyMovie]
    searchById(id:Int!): Movie
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
      .get(`${BASE_URL}/search/movie`, { params: { api_key, query: title } })
      .then(({ data }) => data.results)
      .catch(e => e);
  },
  searchById: ({ id }) => {
    return axios
      .get(`${BASE_URL}/movie/${id}`, { params: { api_key } })
      .then(({ data }) => data)
      .catch(e => e);
  },
  // searchMoviePoster:({ path }) => {
  //   return axios
  //     .get(`${IMAGE_URL}/${path}`, { params: { api_key } })
  //     .then(({ data }) => data)
  //     .catch(e => e);
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
