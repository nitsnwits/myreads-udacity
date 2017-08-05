import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListShelves from './ListShelves';

class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        // ToDo: Remove console log
        console.log('Books %j', books);
        this.setState({ books});
      })
      .catch(err => console.error('Error occurred fetching contacts ', err));
  }

  moveBook(book, shelf) {
    BooksAPI.update(book, shelf)
      .then(this.setState(prevState => ({
        books: prevState.books.map(b => {
          if (b.id === book.id) b.shelf = shelf;
        })
      })))
      .catch(err => console.error('Error occurred moving book'));
  }

  render() {
    return (
      <div className="app">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <ListShelves
          books={this.state.books}
          onMoveBook={this.moveBook}
        />
      </div>
    )
  }
}

export default BooksApp
