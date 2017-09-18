const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String},
    password:{ type: String },
    snippets: [ { type: Schema.Types.ObjectId, ref: 'Snippet' } ]
});

module.exports = mongoose.model('User', userSchema);