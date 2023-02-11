const express = require('express');
const app= express();
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const bodyParser= require ('body-parser');

app.use(bodyParser.json());

let users = [
  {"username":"paul", "password":"123test"}
] 

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  filtered_users=users.filter((user)=>user.username===username);

  if (filtered_users.length>0){
    return (true);
  }else{
    return(false);
  }
}
const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  if (isValid(username)){
    let filtered_users=[];
    filtered_users=users.filter((user)=>user.username===username);
    if (filtered_users[0].password=password){
        return (true);
    }else{
        return (false);
    }
  }else{
    return(false);
  }
}
//New user registration
regd_users.post("/register", (req,res)=>{
  if (!(isValid(req.body.username) && (req.body.password))){
    users.push({"username":req.body.username,"password":req.body.password })
    res.send ("User "+ req.body.username +" added");
    console.log(users);
  }else{
    res.send ("User exist !")
  }
})

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  console.log("Username: "+ req.body.username)
  console.log("password: "+ req.body.password)
  console.log (users);
  if (authenticatedUser(req.body.username, req.body.password)){
    let token = jwt.sign ({username: req.body.username, password : req.body.password},
      "fingerprint_customer",
      {expiresIn:'3600s'}
    )
    res.send("User logged " + token) 

  }else{
    res.send ("User does not exsit or password do not match")
  }
  
});

// Add a book review
regd_users.get("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
