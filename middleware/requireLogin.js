const jwt = require('jsonwebtoken')
const {jwt_Secret} = require('../config/keys') 
const mongoose = require("mongoose")
const User = mongoose.model("user")

require('dotenv').config();

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        res.status(401).json({error:"You must be logged in"})
    }
  const token =  authorization.replace("Bearer ","");
jwt.verify(token, process.env.JWT_SECRET,(err,payload)=>{
    if(err){
        return res.status(401).json({error:"You must be logged in"})
    }
            req.user = payload;
        return  next()
})
}