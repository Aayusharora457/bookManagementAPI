let books = [{
    ISBN: "12345Book",
    title: "Getting started with MERN",
    pubDate: "2021-07-07",
    language: "en",
    numPage: 250,
    author: [1,2],
    publications: [1],
    category: ["tech", "programming", "education", "thriller"],
},
{
    ISBN: "12345python",
    title: "Getting started with PYTHON",
    pubDate: "2021-07-07",
    language: "en",
    numPage: 250,
    author: [1,2],
    publications: [1],
    category: ["tech", "programming", "education", "thriller"],
}
];

let author = [
    {
    id: 1,
    name: "Aayush",
    books: ["12345Book", "123456Secret"],
},
{
    id:2,
    name: "Elon Musk",
    books: ["12345Book"],
},
];

const publication = [
    {
    id: 1,
    name: "writex",
    books: ["12345Book"],   
},
];

module.exports = {books, author, publication};