require("dotenv").config();

// Framework
const express = require("express");
const mongoose = require("mongoose");

// database
const database = require("./database/index");

// Models
const BookModel = require("./database/books");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publications");

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
/*
Route            /
Description     to get all books
Access          public
Parameter       none
Methods         get
*/
booky.get("/", (req, res) => {
    return res.json({books: database.books});
});

/*
Route            /is
Description     to get specific book based on ISBN
Access          public
Parameter       isbn
Methods         get
*/
booky.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);

    if(getSpecificBook.length === 0){
        return res.json({error:`No book found for the ISBN of ${req.params.isbn}`});
    }else{
        return res.json({book: getSpecificBook});
    }
});

/*
Route            /c
Description     to get specific books based on category
Access          public
Parameter       category
Methods         get
*/
booky.get("/c/:category", (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category));
    
    if(getSpecificBook.length === 0){
        return res.json({error:`No book found for the category of ${req.params.category}`});
    }else{
        return res.json({book: getSpecificBook});
    }
});

/*
Route            /language
Description     to get  books based on languages
Access          public
Parameter       Lang
Methods         get
*/
booky.get("/language/:Lang", (req, res) => {
    const getLanguage = database.books.filter((book) => book.language === req.params.Lang);

    if(getLanguage.length === 0){
        return res.json({error:`No book found with the language of ${req.params.Lang}`});
    }else{
        return res.json({book: getLanguage});
    }
    
});

/*
Route            /author
Description     to get  all authors
Access          public
Parameter      none
Methods         get
*/
booky.get("/author", (req, res) => {
    return res.json({author: database.author});
});
/*
Route            /author/specific
Description     to get specific authors
Access          public
Parameter      Id
Methods         get
*/
booky.get("/author/specific/:Id", (req, res) => {
    const getSpecificAuthor = database.author.filter((author) => author.id === parseInt(req.params.Id));
    
    if(getSpecificAuthor.length === 0){
        return res.json({error:`No author found for the Id of ${req.params.Id}`});
    }else{
        return res.json({author: getSpecificAuthor});
    }
});

/*
Route            /author/books
Description     to get  all authors based on the books
Access          public
Parameter      isbn
Methods         get
*/
booky.get("/author/books/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn));
    
    if(getSpecificAuthor.length === 0){
        return res.json({error:`No author found for the book of ${req.params.isbn}`});
    }else{
        return res.json({author: getSpecificAuthor});
    }
});

/*
Route            /publications
Description     to get  all publications
Access          public
Parameter      none
Methods         get
*/
booky.get("/publications", (req, res) => {
    return res.json({publication: database.publication});
});

/*
Route            /publications/specific
Description     to get specific publications based on id
Access          public
Parameter      Id
Methods         get
*/
booky.get("/publications/specific/:Id", (req, res) => {
    const getSpecificPublication = database.publication.filter((publication) => publication.id === parseInt(req.params.Id));
    
    if(getSpecificPublication.length === 0){
        return res.json({error:`No publication found for the id of ${req.params.Id}`});
    }else{
        return res.json({publication: getSpecificPublication});
    }
});

/*
Route            /publications/books
Description     to get  publications based on books
Access          public
Parameter        isbn
Methods         get
*/
booky.get("/publications/books/:isbn", (req, res) => {
    const getSpecificPublication = database.publication.filter((publication) => publication.books.includes(req.params.isbn));
    
    if(getSpecificPublication.length === 0){
        return res.json({error:`No publication found for the book of ${req.params.isbn}`});
    }else{
        return res.json({publication: getSpecificPublication});
    }
});

/*
Route            /book/add
Description     add new book
Access          public
Parameter       none
Methods         post
*/
booky.post("/book/add", (req, res) => {
    const { newBook } = req.body;
    database.books.push(newBook);
    return res.json({books: database.books});
});

/*
Route            /author/add
Description     add new author
Access          public
Parameter       none
Methods         post
*/
booky.post("/author/add", (req, res) => {
    const { newAuthor } = req.body;
    database.author.push(newAuthor);
    return res.json({authors: database.author});
});

/*
Route            /publication/add
Description     add new publication
Access          public
Parameter       none
Methods         post
*/
booky.post("/publication/add", (req, res) => {
    const { newPublication } = req.body;
    database.publication.push(newPublication);
    return res.json({publications: database.publication});
});

/*
Route            /book/update/title
Description     Update book title
Access          public
Parameter       isbn
Methods         put
*/
booky.put("/book/update/title/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            return book.title = req.body.newBookTitle;
        }
    });
    return res.json({books: database.books});
});

/*
Route            /book/update/author
Description      Update/add new author for a book
Access          public
Parameter       isbn, authorId
Methods         put
*/
booky.put("/book/update/author/:isbn/:authorId", (req, res) => {
    // update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            return books.author.push(parseInt(req.params.authorId));
        }
    });
    // update author database
    database.author.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            return author.books.push(req.params.isbn);
        }
    });
    return res.json({books: database.books, authors: database.author});
});

/*
Route            /author/update/name
Description     Update author name
Access          public
Parameter       Id
Methods         put
*/
booky.put("/author/update/name/:Id", (req, res) => {
    database.author.forEach((author) => {
        if(author.id === parseInt(req.params.Id)){
            return author.name = req.body.newAuthorName;
        }
    });
    return res.json({authors: database.author});
});

/*
Route           /publication/update
Description     Update the publication name
Access          public
Parameter       Id
Methods         put
*/
booky.put("/publication/update/name/:Id", (req, res) => {
    database.publication.forEach((publication) => {
        if(publication.id === parseInt(req.params.Id)){
            return publication.name = req.body.newPublicationName;
        }
    });
    return res.json({publications: database.publication});
});

/*
Route           publication/update/book
Description     update/add new book to publication
Access          public
Parameter       isbn, pubId
Methods         put
*/
booky.put("publication/update/book/:isbn/:pubId", (req, res) => {
    // update publication database
    database.publications.forEach((book) => {
        if(publication.id === parseInt(req.params.pubId)){
            return publication.books.push(parseInt(req.params.isbn));
        }
    });
    // update books database
    database.books.forEach((book) => {
        if(books.ISBN === parseInt(req.params.isbn)){
            return books.publication.push(parseInt(req.params.pubId));
        }
    });
    return res.json({publications: database.publication, books: database.books});
});

/*
Route           /book/delete
Description     delete a book
Access          public
Parameter       isbn
Methods         delete
*/
booky.delete("/book/delete/:isbn", (req, res) => {
    const updatedBookDatabase = database.books.filter((book) => database.books.ISBN !== req.params.isbn);

    database.books = updatedBookDatabase;
    return res.json({books: database.books});
});

/*
Route           /book/delete/author
Description     Delete an author from a book
Access          public
Parameter       isbn, authorId
Methods         delete
*/
booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
    // update the books database
    database.books.forEach((book) => {
        if(books.ISBN === req.params.isbn){
            const newAuthorList = books.authors.filter((author) => author !== parseInt(req.params.authorId));
            books.author = newAuthorList;
            return;
        }
    });
    // update author database
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            const newBooksList = author.books.filter((book) => book !== req.params.isbn);
            author.books = newBooksList;
            return;
        }
    });
    return res.json({books:database.books, authors: database.author});
});

/*
Route           /author/delete
Description     delete a author
Access          public
Parameter       authorId
Methods         delete
*/
booky.delete("/author/delete/:authorId", (req, res) => {
    const updatedAuthorDatabase = database.authors.filter((author) => database.author.id !== parseInt(req.params.isbn));

    database.author = updatedAuthorDatabase;
    return res.json({authors: database.author});
});

/*
Route           /publication/delete
Description     delete a publication
Access          public
Parameter       pubId
Methods         delete
*/
booky.delete("/publication/delete/:pubId", (req, res) => {
    const updatedPublicationDatabase = database.publications.filter((publication) => database.publication.id !== parseInt(req.params.pubId));

    database.publication = updatedPublicationDatabase;
    return res.json({publications: database.publication});
});

/*
Route           /publication/delete/book
Description     delete the book from publication
Access          public
Parameter       isbn, pubId
Methods         delete
*/
booky.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {
    // update the publication database
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.pubId)){
            const newBooksList = publication.books.filter((book) => book !== (req.params.isbn));
            publication.books = newBooksList;
            return;
        }
    });
    // update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publication = 0; // no publication availaible
            return;
        }
    });
    return res.json({publications: database.publication, books: database.books});
});

booky.listen(3000, () => console.log("Hey Aayush, the server is running"));