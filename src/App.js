import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { Route, Link } from 'react-router-dom'
import { debounce } from 'lodash'

class BooksApp extends React.Component {
  
  state = {
    books : [],
    searchedBooks : [],
  }
  

  onChangeStatus = (book) => {
    console.log(book)
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
      BooksAPI.update(updatedBook, updatedBook[0].shelf) //catch errors, make optimist
      }

      this.setState({
        books: newBooks
      })
  }


  onChangeSearch = debounce((query) => {
    BooksAPI.search(query).then((query) => {
      return query}).then((matchedBooks) => {
      if (Array.isArray(matchedBooks)) {
        this.setState({searchedBooks : matchedBooks})
         }
      else {
      this.setState({searchedBooks : []})
      }}).catch(e => console.log(e))
    }, 50)

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
    })
  }

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
          <BookSearch searchedBooks={this.state.searchedBooks} books={this.state.books} updateStatus={this.onChangeStatus} updateQuery={this.onChangeSearch}/>
        }/> 
        </div>
     </div>
  )}
}


export default BooksApp
