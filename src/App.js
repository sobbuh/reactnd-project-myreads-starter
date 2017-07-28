import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { Route, Link } from 'react-router-dom'
import { debounce } from 'lodash'

class BooksApp extends React.Component {
  
//TODO : add propTypes

  state = {
    books : [],
    searchedBooks : [],
  }

  onChangeStatus = (book) => {
      const newBooks = this.state.books
      let updatedBook = newBooks.filter((b) => b.id === book.book.id)

      if (updatedBook.length === 0){
        BooksAPI.get(book.book.id).then((response) => {
      return response}).then((bookToUpdate) => {
          console.log(bookToUpdate)
          newBooks.push(bookToUpdate)
          console.log(newBooks.length)
          bookToUpdate.shelf = book.shelf
          BooksAPI.update(bookToUpdate,bookToUpdate.shelf)
        }
      )
      }

      else{
      updatedBook[0].shelf = book.shelf
      BooksAPI.update(updatedBook, updatedBook[0].shelf) // TODO: catch errors, make proper optimist
      }

      this.setState({
        books: newBooks
      })
  }


  onChangeSearch = (query) => {
    BooksAPI.search(query).then((query) => {
      return query}).then((matchedBooks) => {
      if (Array.isArray(matchedBooks)) {

        this.state.books.map((book) => matchedBooks.filter((b) => b.id === book.id).map((b) => b.shelf = "none"))
        // TODO: filter and map book status to 'none'
        this.setState({searchedBooks : matchedBooks})
         }
      else {
      this.setState({searchedBooks : []})
      }}).catch(e => console.log(e))
  }
  

  componentDidMount(){
    BooksAPI.getAll().then((books)=>
      this.setState({books})
    )}
  

  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
        <Route exact path="/" render={() =>
          <div>
          <BookShelf books={this.state.books} updateStatus={this.onChangeStatus} shelfLabel='currentlyReading' title='Currently Reading' />  
          <BookShelf books={this.state.books} updateStatus={this.onChangeStatus} shelfLabel='wantToRead' title='Want to Read' />
          <BookShelf books={this.state.books} updateStatus={this.onChangeStatus} shelfLabel='read' title='Read'/>
          </div>
        }/>


        <Route path="/search" render={()=>     
          <BookSearch searchedBooks={this.state.searchedBooks} books={this.state.books} updateStatus={this.onChangeStatus} updateSearch={this.onChangeSearch}/>
        }/> 
        </div>
     </div>
  )}
}


export default BooksApp
