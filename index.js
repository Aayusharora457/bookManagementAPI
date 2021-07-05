require("dotenv").config();

// Framework
const express = require("express");
const mongoose = require("mongoose");

// Microservices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

// initializaton
const booky = express();

// configuration
booky.use(express.json());

// Establish database connection
mongoose.connect(process.env.MONGO_URL, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
)
.then(() => console.log("connection established!!!!"));


// Initializing Microservices
booky.use("/book", Books);
booky.use("/author", Authors);
booky.use("/publication", Publications);


booky.listen(3000, () => console.log("Hey Aayush, the server is running"));