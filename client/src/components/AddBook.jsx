import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { AUTHORS } from '../queries';

export default () => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const { loading, error, data } = useQuery(AUTHORS);

  const displayAuthors = () => {
    if (loading && !error) {
      return <option disabled>Loading authors...</option>;
    }
    if (error) {
      return <option disabled>Error loading authors</option>;
    }
    return data.authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log(`NAME: ${name}\nGenre: ${genre}\nAuthor ID: ${authorId}`);
  };

  return (
    <form action="" id="add-book" onSubmit={submitForm} disabled={loading || error}>
      <div className="field">
        <label htmlFor="book-name-input">
          Name:
          <input id="book-name-input" type="text" onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div className="field">
        <label htmlFor="book-genre-input">
          Genre:
          <input id="book-genre-input" type="text" onChange={(e) => setGenre(e.target.value)} />
        </label>
      </div>
      <div className="field">
        <label htmlFor="book-author-input">
          Author:
          <select id="book-author-input" onChange={(e) => setAuthorId(e.target.value)}>
            <option disabled>Select author</option>
            {displayAuthors()}
          </select>
        </label>
      </div>
      <button type="submit">+</button>
    </form>
  );
};
