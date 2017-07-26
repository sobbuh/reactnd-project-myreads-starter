import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

class BookShelf extends Component{


	render(){
		const { books, updateStatus } = this.props

		let currentlyReading, wantToRead, read, none 

		currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
		wantToRead = books.filter((book) => book.status === 'wantToRead')
		read = books.filter((book) => book.status === 'read')
		


		return (
			<div> 
				<div className="list-books">
		            <div className="list-books-title">
		              <h1>MyReads</h1>
		            </div>
		            <div className="list-books-content">  
		                <div className="bookshelf">
		                  <h2 className="bookshelf-title">Currently Reading</h2>
		                  
		                  <div className="bookshelf-books">
		                    <ol className="books-grid">
		                    {currentlyReading.map((book) => (
		                      <li key={book.id}>
		                        <div className="book">
		                          <div className="book-top">
		                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
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
		                          <div className="book-authors">{book.authors}</div>
		                        </div>
		                      </li>
		                    ))}
		                    </ol>
		                  </div>
		                </div>
		            </div>
		                
		            <div className="open-search">
		              <Link to="/search">Add a book</Link>
		            </div>
				</div>
			</div>
				
	)}
}

export default BookShelf
