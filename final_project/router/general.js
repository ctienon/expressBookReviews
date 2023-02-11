const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books))
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
