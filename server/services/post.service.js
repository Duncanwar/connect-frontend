const PostSchema = require('../models/post');

export default class PostService{
    static async create(post){
        return await PostSchema.save(post)
    }
    static async findAll(){
     return await PostSchema.find()
        .populate("postedBy","_id name")
        .populate("comments.postedBy","_id name")
        .sort('-createdAt')
    }
}