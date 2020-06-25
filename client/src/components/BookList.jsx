import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const BOOKS = gql`
  {
    books {
      name
      id
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(BOOKS);

  useEffect(() => {
    console.log('DATA - LOADING:', loading);
    console.log('DATA - ERROR:', error);
    console.log('DATA - DATA:', data);
  });

  const displayBooks = () => {
    if (loading && !error) {
      return <p>Loading books...</p>;
    }
    if (error) {
      return <p>Error: {error}</p>;
    }
    return (
      <ul id="book-list">
        {data.books.map((book) => {
          return <li key={book.id}>{book.name}</li>;
        })}
      </ul>
    );
  };

  return <div>{displayBooks()}</div>;
};
