const express = require('express');
const app= express();
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const bodyParser= require ('body-parser');
const session = require('express-session');
const AccessTokenSecret="secretFinger";

app.use(bodyParser.json());

const users = [
  {"username":"paul", "password":"123test"}
] 

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let user=[];
 user=users.find(u=>{ return u.username==username});
if (user){ return true}else{return false};
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let user=[];  
user=users.find(u=>{return u.username==username && u.password==password});
if (user){ return true}else{return false};
}

//New user registration
regd_users.post("/register", (req,res)=>{
  let {username,password}=req.body;
  if (isValid(username)){
      res.send("User exist");
    }else{
      users.push({"username":username,"password":password });
      res.send ("User "+ username +" added");
      console.log(users);
  }
})

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  let {username,password}=req.body;
  req.session.username=username;
  req.session.save();
  const sessionUser= req.session.username;

  if (authenticatedUser(username,password)){
    let token = jwt.sign ({username:username},AccessTokenSecret,{expiresIn:'3600s'});
    
    res.send("User " + sessionUser+ " is logged" +" Token is " + token) 

  }else{
    res.send ("User does not exsit or password do not match")
  }
  
});

// Add a book review
regd_users.put ("/auth/review/:isbn", (req, res) => {
 
  let {username,password}=req.body;
  const isbn = req.params.isbn;
  let book = books[isbn]

  const user=req.session.username;


  if(book){ 
    let review = req.body.reviews;
    
    if(review){
      book["reviews"]={user,review};
    }
    books[isbn]=book;
    res.send(`book with the isbn  ${isbn} updated.`);
    console.log(books)
  }else{
    res.send("Unable to find isbn");
  }
});

// delete review 
regd_users.delete("/auth/review/:isbn", (req, res) =>
{
  const isbn = req.params.isbn;
  let book = books[isbn]
  
  if (book){
    book['reviews']={};
    console.log(books)
    res.send("Review deleted")
  }
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
