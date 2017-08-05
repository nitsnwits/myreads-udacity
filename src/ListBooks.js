import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import { Link } from 'react-router-dom';

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    const { books } = this.props;

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map(book => (
              <li>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select>
                        <option value="none">Move to...</option>
                        <option 
                          value="currentlyReading"
                          selected={book.shelf === "currentlyReading"}
                        >Currently Reading
                        </option>
                        <option 
                          value="wantToRead"
                          selected={book.shelf === "wantToRead"}
                        >Want to Read
                        </option>
                        <option 
                          value="read"
                          selected={book.shelf === "read"}
                        >Read
                        </option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))
          }
        </ol>
      </div>
    )
  }

}

export default ListBooks;

