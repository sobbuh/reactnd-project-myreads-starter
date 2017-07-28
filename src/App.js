import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {

  // Keep track of books and searched books as two separate states
  state = {
    books : [],
    searchedBooks : [],
  }

  // On changing the status of a book, update a new array and then pass it to the state object
  onChangeStatus = (book) => {
      const newBooks = this.state.books
      let updatedBook = newBooks.filter((b) => b.id === book.book.id)

      // if the book is not already part of our books array, add it to the array and update the shelf
      // update the searchedBooks array as well, to keep shelf changes consistent
      if (updatedBook.length === 0){
        BooksAPI.get(book.book.id).then((response) => {
      
          return response}).then((bookToUpdate) => {
            newBooks.push(bookToUpdate)
            bookToUpdate.shelf = book.shelf
            this.setState((prevState) => {
              searchedBooks: prevState.searchedBooks.filter(b => b.id === bookToUpdate.id).map(b => b.shelf = book.shelf)
            })
            BooksAPI.update(bookToUpdate,bookToUpdate.shelf)
        })
      }
      // if the book is part of our books array, update the shelf and the searchedBooks array
      else{
      updatedBook[0].shelf = book.shelf
      BooksAPI.update(updatedBook, updatedBook[0].shelf) 
      this.setState((prevState) => {
        searchedBooks : prevState.searchedBooks.filter(b => b.id === updatedBook.id).map(b => b.shelf = book.shelf)
      })
      
      }

      this.setState({
        books: newBooks
      })
  }


  onChangeSearch = (query) => {
    BooksAPI.search(query).then((query) => {
      return query}).then((matchedBooks) => {
      if (Array.isArray(matchedBooks)) {
        matchedBooks.map((b) => {
          b.shelf = 'none'})
        for (const book of this.state.books){
            matchedBooks.map((b) => {
              if (book.id === b.id){
                b.shelf = book.shelf
            }})}
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
          <BookSearch searchedBooks={this.state.searchedBooks} updateStatus={this.onChangeStatus} updateSearch={this.onChangeSearch}/>
        }/> 
        </div>
     </div>
  )}
}


export default BooksApp
