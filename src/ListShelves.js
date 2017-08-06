import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListBooks from './ListBooks';
const SHELVES = ['currentlyReading', 'wantToRead', 'read'];

class ListShelves extends Component {

  static propTypes = {
    onMoveBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }

  render() {
    const { books, onMoveBook } = this.props;

    return (
      <div>
        {
          SHELVES.map(shelf => (
            <div className="bookshelf" key={shelf}>
              <h2 className="bookshelf-title">
                {shelf.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) { return str.toUpperCase(); })}
              </h2>
              <ListBooks
                books={books.filter(book => book.shelf === shelf)}
                onMoveBook={onMoveBook}
              />
            </div>
          ))
        }
      </div>
    )
  }

}

export default ListShelves;