import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'


class BookSearch extends Component{
  state = {
    query : '',
    matchingBooks : []
  }

    updateQuery = (query) => {
    this.setState({query: query.trim()})

    if (query){
    BooksAPI.search(query,5).then((response) => {
      return response}).then((matchedBooks) => {
      if (Array.isArray(matchedBooks)){
      this.setState({matchingBooks : matchedBooks})
      }
    })}
    else {
      this.setState({matchingBooks : []})
    }
  
    }

  render() {
    const { books, updateStatus } = this.props
    const { query, matchingBooks } = this.state

    return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link> 
        <div className="search-books-input-wrapper">
        
            <input
                type="text"
                value={this.state.query}
                onChange={(event) => {this.updateQuery(event.target.value)}}
                placeholder="Search by title or author"
            />
          
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        {matchingBooks.map((book) => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
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
