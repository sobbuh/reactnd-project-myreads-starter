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


  // On changing the status of a book, update the book and add it to the books array
  onChangeStatus = (book, value) => {
    book.shelf = value  
    this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }))
    BooksAPI.update(book, value)
  }

  // Search
  // Change status to match getAll() request
  // Set searchedBooks state object only if search results are different than current results
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

    const bookShelfLabels =
    [
      {title: "Currently Reading",
       label: "currentlyReading"
      },
      {
       title: "Want to Read",
       label: "wantToRead"
      },
      {
       title: "Read",
       label: "read"
      }
      ]

    const bookShelves = []

    for (const shelf of bookShelfLabels){
        bookShelves.push(<BookShelf books={this.state.books.filter(b => b.shelf === shelf.label)} updateStatus={this.onChangeStatus} shelfLabel={shelf.label} title={shelf.title} />)
      }
    

    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
        <Route exact path="/" render={() =>
          <div>
          {bookShelves}
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
