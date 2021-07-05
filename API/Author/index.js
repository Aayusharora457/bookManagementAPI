// Prefix: /author

const Router = require("express").Router();

const AuthorModel = require("../../database/author");

/*
Route            /author
Description     to get  all authors
Access          public
Parameter      none
Methods         get
*/
Router.get("/", async(req, res) => {
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
Router.get("/specific/:Id", async(req, res) => {
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
Router.get("/books/:isbn", async (req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({books: req.params.isbn});
    
    // const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn));
    
    if(!getSpecificAuthor){
        return res.json({error:`No author found for the book of ${req.params.isbn}`});
    }else{
        return res.json({author: getSpecificAuthor});
    }
});

/*
Route            /author/add
Description     add new author
Access          public
Parameter       none
Methods         post
*/
Router.post("/add", (req, res) => {
    const { newAuthor } = req.body;
    AuthorModel.create(newAuthor);
    // database.author.push(newAuthor);
    return res.json({message: "author was added"});
});

/*
Route            /author/update/name
Description     Update author name
Access          public
Parameter       Id
Methods         put
*/
Router.put("/update/name/:Id", async (req, res) => {
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
Route           /author/delete
Description     delete an author
Access          public
Parameter       authorId
Methods         delete
*/
Router.delete("/delete/:authorId", async (req, res) => {
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({id: parseInt(req.params.authorId)});
    // const updatedAuthorDatabase = database.author.filter((author) => database.author.id !== parseInt(req.params.authorId));

    // database.author = updatedAuthorDatabase;
    return res.json({authors: updatedAuthorDatabase});
});

module.exports = Router;