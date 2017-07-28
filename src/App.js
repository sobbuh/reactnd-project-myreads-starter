import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  
  state = {
    books : [],
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
      BooksAPI.update(updatedBook, updatedBook[0].shelf) //make promise so runs in background
      }

      this.setState({
        books: newBooks
      })
  }


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
          <BookSearch books={this.state.books} updateStatus={this.onChangeStatus}/>
        }/> 
        </div>
     </div>
  )}
}


export default BooksApp
