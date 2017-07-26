import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import BooksAPI from './BooksAPI.js'
import { Link } from 'react-router-dom'


class BookSearch extends Component{
  state = {
    books : [],
    query : ''
  }

  updateQuery = (query) => {
  this.setState({query: query.trim()})
  }

  removeQuery = (query) => {
  this.setState({query: ''})
  }

  render() {
    const { books, updateStatus } = this.props

    return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link> 
        <div className="search-books-input-wrapper">
        
          <input type="text" placeholder="Search by title or author"/>
          
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        {books.map((book) => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.coverURL})` }}></div>
                                <div className="book-shelf-changer">
                                  <select>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading" onClick={() => updateStatus(book, this.value)}>Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.author}</div>
                            </div>
                          </li>
                        ))}

        </ol>
      </div>
    </div>
  )}
}

export default BookSearch;
