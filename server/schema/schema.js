const graphql = require('graphql');
const _ = require('loadsh')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;

// dummy data
var books = [{
        name: '严选',
        genre: 'sss',
        id: '1',
        authorId: '1'
    },
    {
        name: '严选2',
        genre: 'sss2',
        id: '2',
        authorId: '2'

    },
    {
        name: '严选3',
        genre: 'sss3',
        id: '3',
        authorId: '3'
    },
    {
        name: '严选4',
        genre: 'sss4',
        id: '4',
        authorId: '2'

    }, {
        name: '严选5',
        genre: 'sss5',
        id: '5',
        authorId: '3'
    },
]

var authors = [{
    name: '作者1',
    age: 44,
    id: '1',
}, {
    name: '作者2',
    age: 45,
    id: '2',
}, {
    name: '作者3',
    age: 66,
    id: '3'
}]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, {
                    id: parent.authorId
                })
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, {
                    authorId: parent.id
                })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // code to get data from db/other source
                return books.filter(book => {
                    return book.id == args.id
                })[0]
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return authors.filter(author => {
                    return author.id == args.id
                })[0]
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})