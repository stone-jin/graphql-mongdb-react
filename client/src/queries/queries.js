import { gql } from 'apollo-boost';

const getBooksQuery = gql`
    {
    books{
      name
      id
    }
  }
`

const getAuthorsQuery = gql`
    {
        authors{
        name
        id
        age
        }
  }
`

const addBookMutation = gql`
mutation($name: String!, $genre: String!, $authorId: String!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      genre
      id
    }
  }`

const addAuthorMutation = gql`
mutation($name: String!, $age: Int!){
    addAuthor(name: $name, age: $age){
        name
        age
    }
}
`

const getBookQuery = gql`
query($id: ID){
    book(id: $id){
        id
        name
        genre
        author{
            id
            name
            age
            books{
                name
                id
            }
        }
    }
}`

export { getAuthorsQuery, getBooksQuery, addBookMutation, addAuthorMutation, getBookQuery }