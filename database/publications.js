const mongoose = require("mongoose");

// Creating a Publication schema
const PublicationSchema = mongoose.Schema({
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

// Create a Publication model
const PublicationModel = mongoose.model("publications", PublicationSchema);

module.exports = PublicationModel;