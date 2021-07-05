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
booky.get("/", async (req, res) => {
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
booky.get("/is/:isbn", async (req, res) => {
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
booky.get("/c/:category", async (req, res) => {
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
booky.get("/language/:Lang", async (req, res) => {
    const getLanguage = await BookModel.findOne({language: req.params.Lang});
    
    // const getLanguage = database.books.filter((book) => book.language === req.params.Lang);

    if(!getLanguage){
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
booky.get("/author", async(req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({author: getAllAuthors});
});
/*
Route            /author/specific
Description     to get specific authors
Access          public
Parameter      Id
Methods         get
*/
booky.get("/author/specific/:Id", async(req, res) => {
   const getSpecificAuthor = await AuthorModel.findOne({id: req.params.Id});
   
    // const getSpecificAuthor = database.author.filter((author) => author.id === parseInt(req.params.Id));
    
    if(!getSpecificAuthor){
        return res.json({error:`No author found for the Id of ${req.params.Id}`});
    }else{
        return res.json({author: getSpecificAuthor});
    }
});

/*
Route            /author/books
Description     to get  authors based on the books
Access          public
Parameter      isbn
Methods         get
*/
booky.get("/author/books/:isbn", async (req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({books: req.params.isbn});
    
    // const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn));
    
    if(!getSpecificAuthor){
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
booky.get("/publications", async (req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json({publication: getAllPublications});
});

/*
Route            /publications/specific
Description     to get specific publications based on id
Access          public
Parameter      Id
Methods         get
*/
booky.get("/publications/specific/:Id", async (req, res) => {
   const getSpecificPublication = await PublicationModel.findOne({id: req.params.Id});
   
    // const getSpecificPublication = database.publication.filter((publication) => publication.id === parseInt(req.params.Id));
    
    if(!getSpecificPublication){
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
booky.get("/publications/books/:isbn", async (req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({books: req.params.isbn});
    
    // const getSpecificPublication = database.publication.filter((publication) => publication.books.includes(req.params.isbn));
    
    if(!getSpecificPublication){
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
booky.post("/book/add", async (req, res) => {
    const { newBook } = req.body;

    BookModel.create(newBook);
    // database.books.push(newBook);
    return res.json({message: "book was added"});
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
    AuthorModel.create(newAuthor);
    // database.author.push(newAuthor);
    return res.json({message: "author was added"});
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
    PublicationModel.create(newPublication);
    // database.publication.push(newPublication);
    return res.json({message: "publication was added"});
});

/*
Route            /book/update/title
Description     Update book title
Access          public
Parameter       isbn
Methods         put
*/
booky.put("/book/update/title/:isbn", async (req, res) => {
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
booky.put("/book/update/author/:isbn/:authorId", async (req, res) => {
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
Route            /author/update/name
Description     Update author name
Access          public
Parameter       Id
Methods         put
*/
booky.put("/author/update/name/:Id", async (req, res) => {
    const updatedAuthor = await AuthorModel.findOneAndUpdate({id: parseInt(req.params.Id)},
    {
        name: req.body.newAuthorName,
    },
    {
        new: true,
    }
    );
    // database.author.forEach((author) => {
    //     if(author.id === parseInt(req.params.Id)){
    //         return author.name = req.body.newAuthorName;
    //     }
    // });
    return res.json({authors: updatedAuthor});
});

/*
Route           /publication/update/name
Description     Update the publication name
Access          public
Parameter       Id
Methods         put
*/
booky.put("/publication/update/name/:Id", async (req, res) => {
    const updatedPublication = await PublicationModel.findOneAndUpdate({id: parseInt(req.params.Id)},
    {
        name: req.body.newPublicationName,
    },
    {
        new: true,
    }
    );
    // database.publication.forEach((publication) => {
    //     if(publication.id === parseInt(req.params.Id)){
    //         return publication.name = req.body.newPublicationName;
    //     }
    // });
    return res.json({publications: updatedPublication});
});

/*
Route           /publication/update/book
Description     update/add new book to publication
Access          public
Parameter       isbn, pubId
Methods         put
*/
booky.put("/publication/update/book/:isbn/:pubId", async  (req, res) => {
    // update publication database
    const updatedPublication = await PublicationModel.findOneAndUpdate({id : parseInt(req.params.pubId)},
    {
        $addToSet: {
            books: req.params.isbn,
        }
    },
    {
        new: true,
    });
    // database.publication.forEach((publication) => {
    //     if(publication.id === parseInt(req.params.pubId)){
    //         return publication.books.push(req.params.isbn);
    //     }
    // });
    // update books database
    const updatedBook = await BookModel.findOneAndUpdate({ISBN : req.params.isbn},
    {
        $addToSet: {
            publications: parseInt(req.params.pubId),
        }
    },
    {
        new: true,
    });
    // database.books.forEach((book) => {
    //     if(book.ISBN === req.params.isbn){
    //         return book.publications.push(parseInt(req.params.pubId));
    //     }
    // });
    return res.json({publications: updatedPublication, books: updatedBook});
});

/*
Route           /book/delete
Description     delete a book
Access          public
Parameter       isbn
Methods         delete
*/
booky.delete("/book/delete/:isbn", async (req, res) => {
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
booky.delete("/book/delete/author/:isbn/:authorId", async (req, res) => {
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

/*
Route           /author/delete
Description     delete an author
Access          public
Parameter       authorId
Methods         delete
*/
booky.delete("/author/delete/:authorId", async (req, res) => {
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({id: parseInt(req.params.authorId)});
    // const updatedAuthorDatabase = database.author.filter((author) => database.author.id !== parseInt(req.params.authorId));

    // database.author = updatedAuthorDatabase;
    return res.json({authors: updatedAuthorDatabase});
});

/*
Route           /publication/delete
Description     delete the publication
Access          public
Parameter       pubId
Methods         delete
*/
booky.delete("/publication/delete/:pubId", async (req, res) => {
    const updatedPublicationDatabase = await PublicationModel.findOneAndDelete({id: parseInt(req.params.pubId)});
    // const updatedPublicationDatabase = database.publication.filter((publication) => database.publication.id !== parseInt(req.params.pubId));

    // database.publication = updatedPublicationDatabase;
    return res.json({publications: updatedPublicationDatabase});
});

/*
Route           /publication/delete/book
Description     delete the book from publication
Access          public
Parameter       isbn, pubId
Methods         delete
*/
booky.delete("/publication/delete/book/:isbn/:pubId", async (req, res) => {
    // update the publication database
    const updatedPublication = await PublicationModel.findOneAndUpdate({id: parseInt(req.params.pubId)},
    {
        $pull: {
            books: req.params.isbn,
        }
    },
    {
        new: true,
    }
    );
    // database.publication.forEach((publication) => {
    //     if(publication.id === parseInt(req.params.pubId)){
    //         const newBooksList = publication.books.filter((book) => book !== (req.params.isbn));
    //         publication.books = newBooksList;
    //         return;
    //     }
    // });
    // update book database
    const updatedBook = await BookModel.findOneAndUpdate({ISBN: req.params.isbn},
    {
        $pull: {
            publications: parseInt(req.params.pubId),
        }
    },
    {
        new: true,
    }
    );
    // database.books.forEach((book) => {
    //     if(book.ISBN === req.params.isbn){
    //         // book.publications = parseInt(req.params.pubId); // no publication availaible
    //         const newPublicationsList = book.publications.filter((publication) => publication !== parseInt(req.params.pubId));
    //         return;
    //     }
    // });
    return res.json({publications: updatedPublication, books: updatedBook});
});

booky.listen(3000, () => console.log("Hey Aayush, the server is running"));