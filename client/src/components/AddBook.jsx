import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const AUTHORS = gql`
  {
    authors {
      name
      id
    }
  }
`;

export default () => {
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

  return (
    <form action="" id="add-book">
      <div className="field">
        <label htmlFor="book-name-input">
          Name:
          <input id="book-name-input" type="text" />
        </label>
      </div>
      <div className="field">
        <label htmlFor="book-genre-input">
          Genre:
          <input id="book-genre-input" type="text" />
        </label>
      </div>
      <div className="field">
        <label htmlFor="book-author-input">
          Author:
          <select id="book-author-input">
            <option disabled>Select author</option>
            {displayAuthors()}
          </select>
        </label>
      </div>
      <button type="submit">+</button>
    </form>
  );
};
