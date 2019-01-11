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
      const currentlyReading = books.filter(
        book => book.shelf === "currentlyReading"
      );
      const wantToRead = books.filter(book => book.shelf === "wantToRead");
      const read = books.filter(book => book.shelf === "read");

      this.setState({
        currentlyReading,
        wantToRead,
        read
      });
    });
  }

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
                />
                <Bookshelf title="Want to Read" books={this.state.wantToRead} />
                <Bookshelf title="Read" books={this.state.read} />
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
