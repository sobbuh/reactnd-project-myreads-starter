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
  onChangeStatus = (book, value) => {
    book.shelf = value
    
    this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }))

    BooksAPI.update(book, value)

  }

  onChangeSearch = (query) => {
    BooksAPI.search(query).then((matchedBooks) => {
      if (Array.isArray(matchedBooks)) {
        matchedBooks.map((b) => {
          b.shelf = 'none'})
        for (const book of this.state.books){
            matchedBooks.map((b) => {
              if (book.id === b.id){
                b.shelf = book.shelf
            }})}
       if (this.state.searchedBooks != matchedBooks) {
        this.setState({searchedBooks : matchedBooks})
      }
      }
      else {
        this.setState({searchedBooks : []})
      }}).catch(e => console.log(e))
  }
  

  componentDidMount(){
    BooksAPI.getAll().then((books)=>
      this.setState({books})
    )}
  
  // <Route exact path='/' component={Home}/>
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
