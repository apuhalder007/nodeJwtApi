const mongoose = require("mongoose");
const Schema = mongoose.Schema;
module.exports = mongoose.model('posts', new Schema(
    {
        title : String,
        content : String,
        author : String,
        feature_img : String
    }
));