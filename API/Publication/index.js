// Prefix: /publication

const Router = require("express").Router();

const PublicationModel = require("../../database/publications");

/*
Route            /publication
Description     to get  all publications
Access          public
Parameter      none
Methods         get
*/
Router.get("/", async (req, res) => {
    try {
        const getAllPublications = await PublicationModel.find();
    return res.json({publication: getAllPublications});
    } catch (error) {
        return res.json({error: error.message}); 
    }
    
});

/*
Route            /publication/specific
Description     to get specific publications based on id
Access          public
Parameter      Id
Methods         get
*/
Router.get("/specific/:Id", async (req, res) => {
    try {
        const getSpecificPublication = await PublicationModel.findOne({id: req.params.Id});
    
     // const getSpecificPublication = database.publication.filter((publication) => publication.id === parseInt(req.params.Id));
     
     if(!getSpecificPublication){
         return res.json({error:`No publication found for the id of ${req.params.Id}`});
     }else{
         return res.json({publication: getSpecificPublication});
     }
    } catch (error) {
        return res.json({error: error.message});
    }
    
 });

 /*
Route            /publication/books
Description     to get  publications based on books
Access          public
Parameter        isbn
Methods         get
*/
Router.get("/books/:isbn", async (req, res) => {
    try {
        const getSpecificPublication = await PublicationModel.findOne({books: req.params.isbn});
    
        // const getSpecificPublication = database.publication.filter((publication) => publication.books.includes(req.params.isbn));
        
        if(!getSpecificPublication){
            return res.json({error:`No publication found for the book of ${req.params.isbn}`});
        }else{
            return res.json({publication: getSpecificPublication});
        } 
    } catch (error) {
        return res.json({error: error.message});
    }
    
});

/*
Route            /publication/add
Description     add new publication
Access          public
Parameter       none
Methods         post
*/
Router.post("/add", (req, res) => {
    try {
        const { newPublication } = req.body;
    PublicationModel.create(newPublication);
    // database.publication.push(newPublication);
    return res.json({message: "publication was added"});
    } catch (error) {
        return res.json({error: error.message});
    }
    
});

/*
Route           /publication/update/name
Description     Update the publication name
Access          public
Parameter       Id
Methods         put
*/
Router.put("/update/name/:Id", async (req, res) => {
    try {
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
    } catch (error) {
        return res.json({error: error.message});
    }
    
});

/*
Route           /publication/update/book
Description     update/add new book to publication
Access          public
Parameter       isbn, pubId
Methods         put
*/
Router.put("/update/book/:isbn/:pubId", async  (req, res) => {
    try {
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
    } catch (error) {
        return res.json({error: error.message});
    }
    
});

/*
Route           /publication/delete
Description     delete the publication
Access          public
Parameter       pubId
Methods         delete
*/
Router.delete("/delete/:pubId", async (req, res) => {
    try {
        const updatedPublicationDatabase = await PublicationModel.findOneAndDelete({id: parseInt(req.params.pubId)});
        // const updatedPublicationDatabase = database.publication.filter((publication) => database.publication.id !== parseInt(req.params.pubId));
    
        // database.publication = updatedPublicationDatabase;
        return res.json({publications: updatedPublicationDatabase});  
    } catch (error) {
        return res.json({error: error.message});
    }
    
});

/*
Route           /publication/delete/book
Description     delete the book from publication
Access          public
Parameter       isbn, pubId
Methods         delete
*/
Router.delete("/delete/book/:isbn/:pubId", async (req, res) => {
    try {
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
    } catch (error) {
        return res.json({error: error.message});
    }
    
});

module.exports = Router;