const User = require("../models/User")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")


const registerUser =  asyncHandler(async(req,res)=>{
    const {name,gender,userName,password} = req.body
    const hashedPwd = await bcrypt.hash(password,10)
    const newObject = {userName,"password":hashedPwd,gender,name}
    if(!password || !name || !userName || !gender)
    {
        return res.json({"message":"All fields required"})
    }
    const allUsers = await User.find({}).lean().exec(); 
    const duplicate = allUsers.filter((item)=>{return item.userName===userName})
    if(Array.isArray(duplicate) && duplicate.length>0)
    {
        return res.json({"message":"Duplicate User"})
    }
    const createdObject = await User.create(newObject)
    if(createdObject)
    {
        return res.json({message:`User ${userName} created`})
    }
    else{
        res.json({"message":"Unable to create User"})
    }
})

module.exports = registerUser