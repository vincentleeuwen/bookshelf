import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Search from "./search";
import Header from "./header";
import Bookshelf from "./bookshelf";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  sortBooks = (event, book) => {
    // get books array from state
    const { books } = this.state;
    // get the value the user selected
    const { value } = event.target;
    // get the book we want to update
    const bookToUpdate = books.filter(b => b.id === book.id)[0];
    // update the shelf property with the selected value
    bookToUpdate.shelf = value;
    // get the old book array, and omit the old book value
    const booksArray = books.filter(b => b.id !== book.id);
    // push the updated book into the "new" books array, and update state
    booksArray.push(bookToUpdate)
    this.setState({ books: booksArray });
  };

  render() {
    const { books } = this.state;
    const currentlyReading = books.filter(
      book => book.shelf === "currentlyReading"
    );
    const wantToRead = books.filter(book => book.shelf === "wantToRead");
    const read = books.filter(book => book.shelf === "read");
    return (
      <div className="app">
        <Route path="/search" component={Search} />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <Header />
              <div className="list-books-content">
                <Bookshelf
                  title="Currently Reading"
                  books={currentlyReading}
                  onSortingBook={this.sortBooks}
                />
                <Bookshelf
                  title="Want to Read"
                  books={wantToRead}
                  onSortingBook={this.sortBooks}
                />
                <Bookshelf
                  title="Read"
                  books={read}
                  onSortingBook={this.sortBooks}
                />
              </div>
              <Link className="open-search" to="/search" />
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
