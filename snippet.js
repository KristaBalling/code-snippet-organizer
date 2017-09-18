// At a minimum, snippets should have:
//
// a title
// a body (the code)
// optional notes
// a language
// tags -- that is, user-defined words or phrases that classify the code, like "authentication", "front-end", "middleware", or "database".

// models/recipe.js
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const snippetSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    codeBody: {type: String, required: true},
    optionalNotes: String, 
    language: {type: String, required: true},
    tags: [String],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Snippets = mongoose.model('Snippet', snippetSchema);

module.exports = Snippets;
