const express = require('express');
const axios= require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

async function getAllBooks() {
  return new Promise((resolve, reject) => {
  resolve(books);
  });
  }

  function getByISBN(isbn) {
    return new Promise((resolve, reject) => {
    let isbnNumber = parseInt(isbn);
    if (books[isbnNumber]) {
    resolve(books[isbnNumber]);
    } else {
    reject({ status: 404, message: `ISBN ${isbn} not found` });
    }
    })
    }

    function getByAuthor(author) {
      return new Promise((resolve, reject) => {
      let authorname = author;
      if (books[author]) {
      resolve(books[author]);
      }
      })
      }

      function getByTitle(title) {
        return new Promise((resolve, reject) => {
        
        if (books[title]) {
        resolve(books[title]);
        }
        })
        }



public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {

  try{
    const listBook= await getAllBooks();
    console.log ("Result form axios async")
    res.status(200).json(listBook.data);

  }catch(e){
    res.send(e.message);
  }
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn; 
  let arrayBooks= [];
  for (const book in books){arrayBooks.push(book,books[book])}
  filtered_books=arrayBooks.filter((book)=>book.isbn===isbn);
  res.send(filtered_books);
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author; 
  let arrayBooks= [];
  for (const book in books){arrayBooks.push(book,books[book])}
  filtered_books=arrayBooks.filter((book)=>book.author===author);
  res.send(filtered_books);});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
//Write your code here
let title = req.params.title; 
let arrayBooks= [];
for (const book in books){arrayBooks.push(book,books[book])}
filtered_books=arrayBooks.filter((book)=>book.title===title);
res.send(filtered_books);
})

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn; 
  let arrayBooks= [];
  for (const book in books){arrayBooks.push(book,books[book])}
  filtered_books=arrayBooks.filter((book)=>book.isbn===isbn);
  res.send(filtered_books[0].reviews);
});

module.exports.general = public_users;
