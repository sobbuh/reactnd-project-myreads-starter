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
      
      const newBooks = this.state.books
      let book2 = newBooks.filter((b) => b.id === book.book.id)
      book2[0].shelf = book.shelf
      BooksAPI.update(book2, book2[0].shelf)

      return this.setState({
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
          <BookSearch books={this.state.books} updateStatus={this.updateStatus}/>
        }/> 
        </div>
     </div>
  )}
}


export default BooksApp
