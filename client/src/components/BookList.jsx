import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import BookDetails from './BookDetails';
import { BOOKS } from '../queries';

export default () => {
  const { loading, error, data } = useQuery(BOOKS);
  const [selectedBookId, setSelectedBookId] = useState();

  const displayBooks = () => {
    if (loading && !error) {
      return <p>Loading books...</p>;
    }
    if (error) {
      return <p>Error: {error}</p>;
    }
    return (
      <div>
        <ul id="book-list">
          {data.books.map((book) => {
            return (
              <li key={book.id}>
                <button onClick={() => setSelectedBookId(book.id)} type="button">
                  {book.name}
                </button>
              </li>
            );
          })}
        </ul>
        {selectedBookId && <BookDetails bookId={selectedBookId} />}
      </div>
    );
  };

  return <div>{displayBooks()}</div>;
};
