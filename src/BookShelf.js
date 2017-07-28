import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

 //TODO : make stateless function 

const BookShelf = (props) => {
      
  const { title, books, shelfLabel, updateStatus } = props
  
  return (
	  <div> 
	    <div className="list-books-content">  
	      <div className="bookshelf">
	        <h2 className="bookshelf-title">{title}</h2>
	        
	        <div className="bookshelf-books">
	          <ol className="books-grid">
	          {books.filter(book => book.shelf === shelfLabel).map(book => (
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
	                <div className="book-authors">{book.authors.join(', ')}</div>
	              </div>
	            </li>
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

export default BookShelf