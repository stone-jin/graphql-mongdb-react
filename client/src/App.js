import React, {Component} from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

// components
import BookList from './components/BookList' 
import AddBook from './components/AddBook'

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
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
