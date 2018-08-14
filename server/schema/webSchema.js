const graphql = require('graphql');
const _ = require('loadsh')
const Web = require('../models/web')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
} = graphql;

const WebType = new GraphQLObjectType({
    name: 'Web',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        url: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        }
    })
})

let QueryFields = {
    web: {
        type: WebType,
        args: {
            id: {
                type: GraphQLID
            }
        },
        resolve(parent, args) {
            console.log("====>web")
            return Web.findById(args.id)
        }
    },
    webs: {
        type: new GraphQLList(WebType),
        resolve(parent, args) {
            console.log("===>webs")
            return Web.find({})
        }
    }
}

let MutationFields = {
    addWeb: {
        type: WebType,
        args: {
            name: {
                type: GraphQLString
            },
            url: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            }
        },
        resolve(parent, args) {
            console.log(args)
            let web = new Web({
                name: args.name,
                url: args.url,
                description: args.description
            })
            return web.save();
        }
    }
}

module.exports = {
    QueryFields: QueryFields,
    MutationFields: MutationFields
}