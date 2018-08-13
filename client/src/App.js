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
  uri: '/graphql'
})

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Ninja's reading books</h1>
          <BookList></BookList>
          <AddBook></AddBook>
          <h1>作者列表:</h1>
          <AuthorList />
          <h1>添加作者:</h1>
          <AddAuthor/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
