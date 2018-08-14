const graphql = require('graphql');
const _ = require('loadsh')
const Author = require('../models/author')
const Book = require('../models/web')


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
} = graphql;

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => {
        const { BookType } =require('./bookSchema')
        return {
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
                    return Book.find({
                        authorId: parent.id
                    })
                }
            }
    }}
})

let QueryFields = {
    author: {
        type: AuthorType,
        args: {
            id: {
                type: GraphQLID
            }
        },
        resolve(parent, args) {
            return Author.findById(args.id)
        }
    },
    authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args) {
            return Author.find({})
        }
    }
}

let MutationFields = {
    addAuthor: {
        type: AuthorType,
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            age: {
                type: new GraphQLNonNull(GraphQLInt)
            },
        },
        resolve(parent, args) {
            let author = new Author({
                name: args.name,
                age: args.age
            });
            return author.save();
        }
    }
}

module.exports = {
    QueryFields: QueryFields,
    MutationFields: MutationFields,
    AuthorType: AuthorType
}