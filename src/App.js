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
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      let currentlyReading = books.filter(
        book => book.shelf === "currentlyReading"
      );
      let wantToRead = books.filter(book => book.shelf === "wantToRead");
      let read = books.filter(book => book.shelf === "read");

      this.setState({
        currentlyReading,
        wantToRead,
        read
      });
    });
  }

  sortBooks = book => {
    this.setState(currentState => ({
      currentlyReading: currentState.currentlyReading.filter(b => {
        return b.title !== book.title;
      }),
      wantToRead: currentState.wantToRead.filter(b => {
        return b.title !== book.title;
      }),
      read: currentState.read.filter(b => {
        return b.title !== book.title;
      })
    }));
  };

  render() {
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
                  books={this.state.currentlyReading}
                  onSortingBook={this.sortBooks}
                />
                <Bookshelf
                  title="Want to Read"
                  books={this.state.wantToRead}
                  onSortingBook={this.sortBooks}
                />
                <Bookshelf
                  title="Read"
                  books={this.state.read}
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
