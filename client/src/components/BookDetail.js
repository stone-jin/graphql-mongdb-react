import React, {Component} from 'react';
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'

class BookDetail extends Component {

    displayBookDetail(){
        const book = this.props.data.book;
        console.log(book)
        if(book){
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <ul className="other-books">
                        {
                            book.author.books.map(item=>{
                                return (
                                    <li key={item.id}>{item.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            )
        }else{
            return (
                <div>没有选中的图书</div>
            )
        }
    }

  render () {
      console.log(this.props)
    return (
    <div id="book-detail">
        <p>Ouput book details here</p>
        {this.displayBookDetail()}
    </div>
    );
  }
}

export default graphql(getBookQuery, {
    options: (props)=>{
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetail);
