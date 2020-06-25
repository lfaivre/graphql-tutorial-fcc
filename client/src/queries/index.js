import { gql } from 'apollo-boost';

export const BOOKS = gql`
  {
    books {
      name
      id
    }
  }
`;

export const AUTHORS = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const ADD_BOOK = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
