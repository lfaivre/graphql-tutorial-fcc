import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { AUTHORS, BOOKS, ADD_BOOK } from '../queries';

export default () => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const {
    loading: authorsQueryLoading,
    error: authorsQueryError,
    data: authorsQueryData,
  } = useQuery(AUTHORS);
  const [updateBooks] = useMutation(ADD_BOOK);

  const displayAuthors = () => {
    if (authorsQueryLoading && !authorsQueryError) {
      return <option disabled>Loading authors...</option>;
    }
    if (authorsQueryError) {
      return <option disabled>Error loading authors</option>;
    }
    return authorsQueryData.authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  };

  const inputIsValid = () => {
    return name && name !== '' && genre && genre !== '' && authorId && authorId !== '';
  };

  const reset = () => {
    setName('');
    setGenre('');
    setAuthorId('');
  };

  const submitForm = (event) => {
    event.preventDefault();
    updateBooks({ variables: { name, genre, authorId }, refetchQueries: [{ query: BOOKS }] });
    reset();
  };

  return (
    <form
      action=""
      id="add-book"
      onSubmit={submitForm}
      disabled={authorsQueryLoading || authorsQueryError}
    >
      <div className="field">
        <label htmlFor="book-name-input">
          Name:
          <input
            id="book-name-input"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
      </div>
      <div className="field">
        <label htmlFor="book-genre-input">
          Genre:
          <input
            id="book-genre-input"
            type="text"
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
          />
        </label>
      </div>
      <div className="field">
        <label htmlFor="book-author-input">
          Author:
          <select
            id="book-author-input"
            onChange={(e) => setAuthorId(e.target.value)}
            value={authorId}
          >
            <option value="" disabled hidden>
              Select author
            </option>
            {displayAuthors()}
          </select>
        </label>
      </div>
      <button type="submit" disabled={!inputIsValid()}>
        +
      </button>
    </form>
  );
};
