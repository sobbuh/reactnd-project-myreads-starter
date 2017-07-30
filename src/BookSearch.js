import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book.js'


class BookSearch extends Component{
  state = {
    query : '',
  }

  updateQuery = (query) => {
  this.setState({query})
  
  }

  render() {
    const { searchedBooks, updateStatus, updateSearch } = this.props
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
          <Book book={book} updateStatus={updateStatus} />
          ))}

        </ol>
      </div>
    </div>
  )}
}

BookSearch.propTypes = {
  searchedBooks: PropTypes.array.isRequired,
  updateSearch: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired,
}

export default BookSearch;
