const graphql = require('graphql');
const _ = require('loadsh')
const authorSchema = require('./authorSchema')
const bookSchema = require('./bookSchema')
const webSchema = require('./webSchema')

let schemas = [authorSchema, bookSchema, webSchema]

let QueryFieldArray = schemas.map(item=>item.QueryFields)
let MutationFieldArray = schemas.map(item=>item.MutationFields)

const {
    GraphQLObjectType,
    GraphQLSchema,
} = graphql;

QueryFields = {}; 
QueryFieldArray.forEach(item => Object.assign(QueryFields, item));

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: QueryFields
});

MutationFields = {}; 
MutationFieldArray.forEach(item => Object.assign(MutationFields, item));
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: MutationFields
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});