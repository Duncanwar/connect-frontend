const UserModel = mongoose.model("user")

export default class UserService{
    static async create(){
    
    }

    static async delete(id){
        return await UserModel.findByIdAndDelete(id)
    }
}