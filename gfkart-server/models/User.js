const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    gender:{
        type:String
    },
    refreshTokens:{
        type:[String]
    }
})

module.exports = mongoose.model("User",userSchema)