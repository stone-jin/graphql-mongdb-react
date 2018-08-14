import React, {Component} from 'react';
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetail from './BookDetail'

class BookList extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: null
    }
  }
  displayBooks(){
    var data = this.props.data;
    if(data.loading){
      return (<div>Loading books...</div>)
    }else{
      if(data.books.length > 0){
        return (
          <ul id="book-list">
            {
              data.books.map(book=>{
                return (<li key={book.id} onClick={(e)=>{this.setState({selected: book.id})}}>{book.name}</li>)
              })
            }
          </ul>
          )
      }else{
        return (<div>当前无书籍</div>)
      }
    }
  }

  render () {
    return (
    <div>
          {this.displayBooks()}
          {
            this.state.selected == null? '': <BookDetail bookId={this.state.selected}/>
          }
    </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
