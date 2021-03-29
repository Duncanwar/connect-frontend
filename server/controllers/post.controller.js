import PostService from '../services/post.service';

const {findAll} = PostService
export default class PostControllers{
static async getAll(req,res) {
    try {
        const posts = await findAll();
        return res.json({posts})
    }catch(err){
        console.log(err);}
}
static async createPost(req, res){
    const {title,body,pic} = req.body
    let mediaId;
    if(!title || !body || !pic){
        return res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password = undefined
}
}