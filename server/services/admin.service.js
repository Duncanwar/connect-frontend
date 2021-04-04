const adminSchema = require("../models/admin");

export default class AdminService{
    static async create(admin){
        return await adminSchema.save(admin)
    }

    static async findAll(){
     return await adminSchema.find()
    }

    static async findOneByemail(email){
        return adminSchema.findOne({email:email});
    }
}
