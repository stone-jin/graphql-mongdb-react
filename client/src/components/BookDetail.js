import React, {Component} from 'react';
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'

class BookDetail extends Component {

    displayBookDetail(){
        const book = this.props.data.book;
        if(book){
            return (
                <div>
                    <h2>书籍: {book.name}</h2>
                    <p>内容：{book.genre}</p>
                    <p>作者: {book.author.name}</p>

                    <p>作者的其他书籍:</p>
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
    return (
    <div id="book-detail">
        <hr />
        <p>所选图书的详情:</p>
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
