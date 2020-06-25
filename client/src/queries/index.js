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
