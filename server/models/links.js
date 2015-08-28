var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LinksSchema = new Schema({
    name: String,
    url: String
});

LinksSchema.pre('save', function (next) {
    console.log("Yup");
    if ('invalid' == this.name) return next(new Error('#sadpanda'));
    next();
});

module.exports = mongoose.model('Links', LinksSchema);