import React from "react";

class Bookshelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <li>
              {this.props.books.map(book => (
                <div className="book" key={book.id}>
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
                    <div className="book-shelf-changer">
                      <select onChange={() => this.props.onSortingBook(book)}>
                        <option value="move">Move to...</option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
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
