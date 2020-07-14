import { Schema, model } from 'mongoose'
const {ObjectId}= Schema.Types
const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    likes:[{type:ObjectId,
    ref:"user"}],
    comments:[
        {text:String, 
            postedBy:{
            type:ObjectId,
            ref:"user"
        }}
    ],
    postedBy:{
        type:ObjectId,
        ref:"user"
    }
})

model("Post",postSchema)