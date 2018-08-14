const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const webSchema = new Schema({
    name: String,
    url: String,
    description: String
});

module.exports = mongoose.model("Web", webSchema);