import express from "express";
import AdminController from "../controllers/admin.controller";
import adminMiddleware from "../middleware/admin.middleware";

const router = express.Router();

const {checkPassword,checkEmail} = adminMiddleware
const {createAdmin, getAll} = AdminController

router.post('/admin', [checkPassword,checkEmail], createAdmin )

router.post('/admin/login',[checkPassword,checkEmail],(req,res)=>{
    const {email,password}= req.body;
    if(!email || !password){
    return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})     
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
            const token = jwt.sign({_id:savedUser._id},process.env.JWT_SECRET);
            const {_id,name,email,followers,following,photo} = savedUser
       return res.json({token,user:{_id,name,email,followers,following,photo},message:"successfully signed in"})
            }
        else{
        return res.status(422).json({error:"Invalid Email or password"})
        }   
    })
    .catch(err=>{
        console.log(err);
})
    
    })
})
router.get('/admin',[checkPassword,checkEmail],getAll);
export default router;