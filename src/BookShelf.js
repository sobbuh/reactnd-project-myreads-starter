import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book.js'

const BookShelf = (props) => {
      
  const { title, books, updateStatus } = props
  
  return (
	  <div> 
	    <div className="list-books-content">  
	      <div className="bookshelf">
	        <h2 className="bookshelf-title">{title}</h2>
	        
	        <div className="bookshelf-books">
	          <ol className="books-grid">
	          {books.map(book => (
	           <Book book={book} updateStatus={updateStatus} />
	            ))
	          }
	          </ol>
	 
	        </div>
	      </div>

	      <div className="open-search">
	        <Link to="/search">Add a book</Link>
	      </div>
	    </div>
	  </div>
	  )     
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  shelfLabel: PropTypes.string.isRequired,
  updateStatus: PropTypes.func.isRequired,
}

export default BookShelf