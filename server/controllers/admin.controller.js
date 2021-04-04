import adminService from "../services/admin.service"

const {create, findAll} = adminService;

export default class AdminController{
    static async createAdmin(req, res) {
        const admin = await create(req.body);
        return res.status(200).json({admin});
    }
    static async getAll(req, res) {
        const admins = await findAll()
        return res.status(200).json({admins})
    }
}