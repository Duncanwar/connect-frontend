const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const mediaSchema = new mongoose.Schema({
media: {
    type: String,
    required: true
},
mediaId:{type:ObjectId,ref:"Post"},
})

module.exports = mongoose.model("media",mediaSchema);
