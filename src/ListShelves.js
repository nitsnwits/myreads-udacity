import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import ListBooks from './ListBooks';
const SHELVES = ['currentlyReading', 'wantToRead', 'read'];

class ListShelves extends Component {

  static propTypes = {
    onMoveBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }

  render() {
    const { books } = this.props;

    return (
      <div>
        {
          SHELVES.map(shelf => (
            <div className="bookshelf">
              <h2 className="bookshelf-title">
                {shelf.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) { return str.toUpperCase(); })}
              </h2>
              <ListBooks
                books={books.filter(book => book.shelf === shelf)}
              />
            </div>
          ))
        }
      </div>
    )
  }

}

export default ListShelves;