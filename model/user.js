const mongoose = require("mongoose");
const Schema = mongoose.Schema;
module.exports = mongoose.model('users', new Schema(
    {
        name : String,
        password : String,
        email : String,
        admin : Boolean
    }
));