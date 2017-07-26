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

  updateStatus = (book, shelf) => {
  BooksAPI.update(book,shelf)
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
    })

  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() =>
          <BookShelf books={this.state.books} updateStatus={this.updateStatus} />  
        }/>

        <Route path="/search" render={()=>     
          <BookSearch books={this.state.books} updateStatus={this.updateStatus}/>
        }/> 

     </div>
  )}
}


export default BooksApp
