const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    resetToken: String,
    expireToken: Date,
    password:{
        type:String,
        required:true
    },
})

mongoose.Schema("admin", adminSchema);
