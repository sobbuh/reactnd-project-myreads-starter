import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {

  // Keep track of books and searched books as two separate states
  // Create bookHashTable to quickly update shelf values during search

  state = {
    books : [],
    searchResults : [],
    bookHashTable : {}
  }


  // On changing the status of a book, update the book and add it to the books array
  onChangeStatus = (book, value) => {
    // set book shelf value to the target value
    book.shelf = value 

    // copy the bookHashTable and modify the copy
    const updateBookHashTable = this.state.bookHashTable
    updateBookHashTable[book.id] = book.shelf
    
    // set state for books and bookHashTable to track the shelf change
    this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([ book ]),
        bookHashTable : updateBookHashTable
      }))
    // update the backend using the BooksAPI update method
    BooksAPI.update(book, value)
  }

  // Search
  // Change status to match getAll() request
  // Set searchedBooks state object only if search results are different than current results
  onChangeSearch = (query) => {


    BooksAPI.search(query).then((searchResults) => {
      
      if (Array.isArray(searchResults)) {
        
        console.log("searched")

        searchResults.map((b) => {
          b.shelf = this.state.bookHashTable[b.id] ? this.state.bookHashTable[b.id] : 'none'
          
        }
        ) 
  
        /*
        old method for fixing book shelf values
        matchedBooks.map((b) => {
          b.shelf = 'none'})
        for (const book of this.state.books){
            matchedBooks.map((b) => {
              if (book.id === b.id){
                b.shelf = book.shelf
            }})}
        */
        
        console.log(this.state.searchResults == searchResults)

        if (this.state.searchResults != searchResults) {
          
          this.setState({searchResults : searchResults})
          console.log("updated search")
          console.log(this.state.searchResults == searchResults)

        }
      }
      else {
        this.setState({searchResults : []})
      }}).catch(e => console.log(e))
  }
  

  componentDidMount(){
    BooksAPI.getAll().then((books)=> {      

      const newBookHashTable = {}
      books.map(b => newBookHashTable[b.id] = b.shelf)

      this.setState(state => ({
      books: books,
      bookHashTable : newBookHashTable
     }))
    }) 
  }   
      
  
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
          <BookSearch searchResults={this.state.searchResults} updateStatus={this.onChangeStatus} updateSearch={this.onChangeSearch}/>
        }/> 
        </div>
     </div>
  )}
}


export default BooksApp
