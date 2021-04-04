import dotenv from "dotenv";
import adminService from "../services/admin.service"

dotenv.config();
const {findOneByemail} = adminService
const checkPassword = (req,res,next) =>{
    if(req.body != process.env.ADMIN_PASSWORD){
        return res.status(401).json({error:"bad password or email"})
    }
    next();
}

const checkEmail = async(req, res, next) => {
    const body = await findOneByemail(req.email);
    if(body){
        return next();
    }
    return res.status(401).json({error:"bad email or password"})
}
export default {
    checkEmail,checkPassword
}