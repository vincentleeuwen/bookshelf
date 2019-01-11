import React from "react";
import ShelfChanger from "./shelfChanger";

class Bookshelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <li>
              {this.props.books.map(book => (
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${
                          book.imageLinks ? book.imageLinks.thumbnail : ""
                        }")`
                      }}
                    />
                    <ShelfChanger />
                  </div>

                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              ))}
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
