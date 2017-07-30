import React from 'react'
import BookShelf from './BookShelf'

const ShelfLabels = (props) => {

	const shelves =
   
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

 for (const shelf of shelves){
 	bookShelves.push(<BookShelf books={this.state.books.filter(b => b.shelf === shelf.label)} updateStatus={this.onChangeStatus} shelfLabel={shelf.label} title={shelf.title} />)
 }
     
     return bookShelves


     }