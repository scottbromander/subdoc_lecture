var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LinksSchema = new Schema({
    name: String,
    url: String
});

module.exports = mongoose.model('Links', LinksSchema);