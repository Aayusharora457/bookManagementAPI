const mongoose = require("mongoose");

// Creating a Author schema
const AuthorSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 15,
    },
    books: [String],
});

// Create a author model
const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;