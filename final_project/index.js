const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const cookieParser= require ("cookie-parser");
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const PORT =5000;
const AccessTokenSecret="secretFinger";

const app = express();

app.use(express.json());
app.use (cookieParser());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
authHeader= req.headers.authorization;

if (authHeader){
    let token= authHeader.split(' ')[1];
        jwt.verify(token, AccessTokenSecret,(err,user)=>{
        if(!err){
            req.user=user; 
            console.log("token is verify...")
            console.log(req.sessionID)
            next();
        }else{
            return res.status(403).json({message: "User not authentificated!"});
        }
    });
}else{
    return res.status(403).json({message:"User not logged in"});
}

});
 


app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running on port "+ PORT));
