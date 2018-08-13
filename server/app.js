const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express();

// allow cors
app.use(cors())

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

app.use((req, res)=>{
    let path = ''
    if(req.path == '/'){
        path = '/index.html'
    }else{
        path = req.path
    }
    if(path.indexOf(".html") >=0){
        res.setHeader("Content-Type", "text/html; charset=utf-8")
        return res.send(fs.readFileSync(path.join(__dirname, 'html', path), {encoding: 'utf-8'}));
    }else if(path.indexOf("favicon.icon") >=0){
        res.setHeader("Content-Type", "image/x-icon")
        return res.send(fs.readFileSync(path.join(__dirname, 'html', path), {encoding: 'utf-8'}))
    }else if(path.indexOf(".css")>=0){
        res.setHeader("Content-Type", "text/css; charset=utf-8")
        return res.send(fs.readFileSync(path.join(__dirname, path), {encoding: 'utf-8'}));
    }else if(path.indexOf(".js") >=0){
        res.setHeader("Content-Type", "application/javascript; charset=utf-8")
        return res.send(fs.readFileSync(path.join(__dirname, path), {encoding: 'utf-8'}));
    }
})

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});