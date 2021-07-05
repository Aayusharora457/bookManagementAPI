// Prefix : /book

// Initializing Express Router
const Router = require("express").Router();

// Database Models
const BookModel = require("../../database/books");

/*
Route            /
Description     to get all books
Access          public
Parameter       none
Methods         get
*/
Router.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

/*
Route            /is
Description     to get specific book based on ISBN
Access          public
Parameter       isbn
Methods         get
*/
Router.get("/is/:isbn", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ISBN:req.params.isbn});
    
    // const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);

    // if(getSpecificBook.length === 0){
    if(!getSpecificBook){
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
Router.get("/c/:category", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({category: req.params.category });
    
    // const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category));
    
    if(!getSpecificBook){
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
Router.get("/language/:Lang", async (req, res) => {
    const getLanguage = await BookModel.findOne({language: req.params.Lang});
    
    // const getLanguage = database.books.filter((book) => book.language === req.params.Lang);

    if(!getLanguage){
        return res.json({error:`No book found with the language of ${req.params.Lang}`});
    }else{
        return res.json({book: getLanguage});
    }
    
});

/*
Route            /book/add
Description     add new book
Access          public
Parameter       none
Methods         post
*/
Router.post("/add", async (req, res) => {
    const { newBook } = req.body;

    BookModel.create(newBook);
    // database.books.push(newBook);
    return res.json({message: "book was added"});
});

/*
Route            /book/update/title
Description     Update book title
Access          public
Parameter       isbn
Methods         put
*/
Router.put("/update/title/:isbn", async (req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate({ISBN: req.params.isbn}, 
        {
            title: req.body.newBookTitle
        }, 
        {
            new: true
        }
        );
    
    // database.books.forEach((book) => {
    //     if(book.ISBN === req.params.isbn){
    //         return book.title = req.body.newBookTitle;
    //     }
    // });
    return res.json({books: updatedBook});
});

/*
Route            /book/update/author
Description      Update/add new author for a book
Access          public
Parameter       isbn, authorId
Methods         put
*/
Router.put("/update/author/:isbn/:authorId", async (req, res) => {
    // update book database
    const updatedBook = await BookModel.findOneAndUpdate({ISBN: req.params.isbn}, 
        {
            $addToSet : {
                author:req.params.authorId,
            },
        },
        {
            new: true,
        }
        
        );

    // database.books.forEach((book) => {
    //     if(book.ISBN === req.params.isbn){
    //         return book.author.push(parseInt(req.params.authorId));
    //     }
    // });
    // update author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate({id: parseInt(req.params.authorId)},
        {
            $addToSet: {
                books: req.params.isbn,
            }
        },
        {
            new: true,
        }
        );
    // database.author.forEach((author) => {
    //     if(author.id === parseInt(req.params.authorId)){
    //         return author.books.push(req.params.isbn);
    //     }
    // });
    return res.json({books: updatedBook, authors: updatedAuthor});
});

/*
Route           /book/delete
Description     delete a book
Access          public
Parameter       isbn
Methods         delete
*/
Router.delete("/delete/:isbn", async (req, res) => {
    const updatedBookDatabase = await BookModel.findOneAndDelete({ISBN:req.params.isbn});
    
     // const updatedBookDatabase = database.books.filter((book) => database.books.ISBN !== req.params.isbn);
 
     // database.books = updatedBookDatabase;
     return res.json({books: updatedBookDatabase});
 });

 /*
Route           /book/delete/author
Description     Delete an author from a book
Access          public
Parameter       isbn, authorId
Methods         delete
*/
Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {
    // update the books database
  const updatedBook = await BookModel.findOneAndUpdate({ISBN: req.params.isbn}, 
    {
        $pull : {
            author: parseInt(req.params.authorId),
        }
    },
    {
       new: true, 
    });
    // database.books.forEach((book) => {
    //     if(book.ISBN === req.params.isbn){
    //         const newAuthorList = book.author.filter((author) => author !== parseInt(req.params.authorId));
    //         book.author = newAuthorList;
    //         return;
    //     }
    // });
    // update author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate({id: parseInt(req.params.authorId)},
    {
        $pull : {
            books: req.params.isbn,
        }
    },
    {
        new: true,
    });
    // database.author.forEach((author) => {
    //     if(author.id === parseInt(req.params.authorId)){
    //         const newBooksList = author.books.filter((book) => book !== req.params.isbn);
    //         author.books = newBooksList;
    //         return;
    //     }
    // });
    return res.json({books:updatedBook, authors: updatedAuthor});
});

module.exports = Router;