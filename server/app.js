const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express();

// connect to mongodb database
// make sure to replace my db string && creds width your own
mongoose.connect("mongodb://127.0.0.1:27017/graphql");
mongoose.connection.once('open', () => {
    console.log("connected to db")
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});