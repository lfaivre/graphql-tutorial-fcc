import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { BOOK } from '../queries';

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(BOOK, {
    variables: { id: bookId },
    skip: !bookId,
  });

  const displayBookData = () => {
    if (loading && !error) {
      return <p>Retrieving book data...</p>;
    }
    if (error) {
      return <p>Error retrieving book data...</p>;
    }
    return (
      data && (
        <>
          <h2>Name: {data.book.name}</h2>
          <p>Genre: {data.book.genre}</p>
          <p>Author: {data.book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {data.book.author.books.map((book) => {
              return (
                <li key={book.id}>
                  <p>{book.name}</p>
                </li>
              );
            })}
          </ul>
        </>
      )
    );
  };

  return <div id="book-details">{displayBookData()}</div>;
};

BookDetails.propTypes = {
  bookId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BookDetails;
