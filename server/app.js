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
    let currentPath = ''
    if(req.path == '/'){
        currentPath = '/index.html'
    }else{
        currentPath = req.path
    }
    if(currentPath.indexOf(".html") >=0){
        res.setHeader("Content-Type", "text/html; charset=utf-8")
        return res.send(fs.readFileSync(path.join(__dirname, 'html', currentPath), {encoding: 'utf-8'}));
    }else if(currentPath.indexOf("favicon.icon") >=0){
        res.setHeader("Content-Type", "image/x-icon")
        return res.send(fs.readFileSync(path.join(__dirname, 'html', currentPath), {encoding: 'utf-8'}))
    }else if(currentPath.indexOf(".css")>=0){
        res.setHeader("Content-Type", "text/css; charset=utf-8")
        return res.send(fs.readFileSync(path.join(__dirname, currentPath), {encoding: 'utf-8'}));
    }else if(currentPath.indexOf(".js") >=0){
        res.setHeader("Content-Type", "application/javascript; charset=utf-8")
        return res.send(fs.readFileSync(path.join(__dirname, currentPath), {encoding: 'utf-8'}));
    }
})

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});