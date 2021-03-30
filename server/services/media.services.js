const Media = require("../models/media");

export default class MediaService{
    static async create(data) {
        return await Media.create(data)
    }
    static async findAll(){
        return await Media.find();
    }
}