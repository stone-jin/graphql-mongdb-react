import React, {Component} from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

// components
import BookList from './components/BookList' 
import AddBook from './components/AddBook'
import AddAuthor from './components/AddAuthor'
import AuthorList from './components/AuthorList'

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <div class="m-book">
            <h1>查看的书籍:</h1>
            <BookList></BookList>
            <AddBook></AddBook>
          </div>
          <div class="m-author">
            <h1>作者列表:</h1>
            <AuthorList />
            <AddAuthor/>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
