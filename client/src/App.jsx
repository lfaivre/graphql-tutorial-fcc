import React from 'react';
import BookList from './components/BookList';

export default () => {
  return (
    <div className="App" id="main">
      <h1>Reading List</h1>
      <BookList />
    </div>
  );
};
