import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListShelves from './ListShelves';
import Search from './Search';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books });
      })
      .catch(err => console.error('Error occurred fetching contacts ', err));
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(this.setState(prevState => {
        let found = false;
        const newState =  prevState.books.map(b => {
          if (b.id === book.id) {
            b.shelf = shelf;
            found = true;
          }
          return b;
        });
        if (!found) {
          book.shelf = shelf;
          newState.push(book);
        }
        return { books: newState };
      }))
      .catch(err => console.error('Error occurred moving book: ', err));
  }
  
  searchBooks = (query, maxResults) => {
    BooksAPI.search(query, maxResults || 10)
      .then(searchedBooks => {
        this.setState({searchedBooks});
      })
      .catch(err => console.error('Error occurred searching books: ', err));
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListShelves
              books={this.state.books}
              onMoveBook={this.moveBook}
            />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={ ({history}) => (
          <Search
            onMoveBook={this.moveBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
