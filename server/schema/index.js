/* eslint-disable no-use-before-define */
const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = graphql;

// TEMP :: Placeholder Data

const books = [
  { name: 'Book One', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'Book Two', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'Book Three', genre: 'Sci-Fi', id: '3', authorId: '3' },
  { name: 'Book Four', genre: 'Fantasy', id: '1', authorId: '2' },
  { name: 'Book Five', genre: 'Fantasy', id: '2', authorId: '3' },
  { name: 'Book Six', genre: 'Fantasy', id: '3', authorId: '3' },
];

const authors = [
  { name: 'Author One', age: 20, id: '1' },
  { name: 'Author Two', age: 30, id: '2' },
  { name: 'Author Three', age: 40, id: '3' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
