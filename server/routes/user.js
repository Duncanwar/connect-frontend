const express = require('express')
const router  = express.Router();
const mongoose = require('mongoose');
const requiredLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");
const User = mongoose.model("user")

router.get('/user/:id',requiredLogin,(req,res)=>{
User.findOne({_id:req.params.id})
.select("-password")
.then(user=>{
    Post.find({postedBy:req.params.id})
    .populate("postedBy","_id name")
    .exec((err,post)=>{
        if(err){
        return res.status(422).json({error:err})
        }
        res.json({user, post})
    })
}).catch(err=>{
    return res.status(404).json({error:"User not found"})
})
})

module.exports = router