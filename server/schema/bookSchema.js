const graphql = require('graphql');
const _ = require('loadsh')
const Book = require('../models/book')
const Author = require('../models/author')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => {
        const { AuthorType } = require('./authorSchema')
        return {
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
                return Author.findById(parent.authorId)
            }
        }
    }}
})

let QueryFields = {
    book: {
        type: BookType,
        args: {
            id: {
                type: GraphQLID
            }
        },
        resolve(parent, args) {
            return Book.findById(args.id)
        }
    },
    books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
            return Book.find({})
        }
    },
}

let MutationFields = {
    addBook: {
        type: BookType,
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            genre: {
                type: new GraphQLNonNull(GraphQLString)
            },
            authorId: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(parent, args) {
            let book = new Book({
                name: args.name,
                genre: args.genre,
                authorId: args.authorId
            })
            return book.save();
        }
    }
}

module.exports = {
    QueryFields: QueryFields,
    MutationFields: MutationFields,
    BookType: BookType
}