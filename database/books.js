const mongoose = require("mongoose");

// Creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 10,
    }, //required
    title: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 10,
    },
    pubDate: String,
    language: String,
    numPage: Number,
    author: [Number],
    publications: [Number],
    category: [String],
});

// Create a book model-->document model of mongodb
const BookModel = mongoose.model("Books", BookSchema);

module.exports = BookModel;