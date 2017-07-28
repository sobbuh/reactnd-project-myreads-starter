import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'


class BookSearch extends Component{
  state = {
    query : '',
  }

  render() {
    const { searchedBooks, books, updateStatus, updateQuery } = this.props
    const { query } = this.state

    return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link> 
        <div className="search-books-input-wrapper">
        
            <input
                type="text"
                value={this.state.query}
                onChange={(event) => {updateQuery(event.target.value)}}
                placeholder="Search by title or author"
            />
          
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        {searchedBooks.map((book) => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">

                                {book.imageLinks.smallThumbnail ?  
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div> :
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div> 
                                }
                              
                                <div className="book-shelf-changer">
                                  <select value={book.shelf} onChange={ (event) => { updateStatus({book: book, shelf: event.target.value})} }>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors}</div>
                            </div>
                          </li>
                        ))}

        </ol>
      </div>
    </div>
  )}
}

export default BookSearch;
