const jwt = require('jsonwebtoken')
const {jwt_Secret} = require('../config/keys') 
const mongoose = require("mongoose")
const User = mongoose.model("user")

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        res.status(401).json({error:"You must be logged in"})
    }
  const token =  authorization.replace("Bearer ","");
  console.log(token);
jwt.verify(token, jwt_Secret,(err,payload)=>{
    if(err){
        return res.status(401).json({error:"You must be logged in"})
    }
            req.user = payload;
            next()

})
}