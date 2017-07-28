import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


class BookSearch extends Component{
  state = {
    query : '',
  }

  updateQuery = (query) => {
  this.setState({query})
  }

  render() {
    const { searchedBooks, books, updateStatus, updateSearch } = this.props
    const { query } = this.state

    if (query){
      updateSearch(query)
    }
    else{
      
    }

    return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link> 
        <div className="search-books-input-wrapper">
        
            <input
                type="text"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
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
                                <div className="book-cover" style={{ width: 128, height: 193, 
                                  backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'})` }}></div>                         
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
                              <div className="book-authors">{book.authors ? book.authors.join(", ") : "No Author Given"}</div>
                            </div>
                          </li>
                        ))}

        </ol>
      </div>
    </div>
  )}
}

BookSearch.propTypes = {
  books: PropTypes.array.isRequired,
  searchedBooks: PropTypes.array.isRequired,
  updateSearch: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired,
}

export default BookSearch;
