import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BOOKS } from '../queries';

export default () => {
  const { loading, error, data } = useQuery(BOOKS);

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
