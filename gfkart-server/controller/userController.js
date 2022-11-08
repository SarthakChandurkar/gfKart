const User = require("../models/User")
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")

const getAllUsers = asyncHandler(async (req,res) =>{
    const allUsers = await User.find({}).select("-password").lean().exec();
    if(!Array.isArray(allUsers) || !allUsers.length)
    {
        return res.json({message:"No users found"})
    }
    else
    {
        res.json(allUsers)
    }
})

const createNewUser = asyncHandler(async(req,res)=>{
    const {name,gender,userName,password} = req.body
    if(!password || !name || !userName || !gender)
    {
        return res.json({"message":"All fields required"})
    }
    const hashedPwd = await bcrypt.hash(password,10)
    const newObject = {userName,"password":hashedPwd,gender,name}
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

const updateUser = asyncHandler(async(req,res)=>{
    const {id,name,gender,userName,password} = req.body
    if(!id)
    {
        return res.json({"message":"Id is required"})
    }
    const thatId = await User.findById(id)
    if(userName) thatId.userName = userName;
    if(name) thatId.name=name;
    if(password) thatId.password=password;
    if(gender) thatId.gender = gender;
    const updatedObject = await thatId.save();
    return res.json({"message":`User ${updatedObject.userName} updated`})
})

const deleteUser =asyncHandler(async(req,res)=>{
    const {id}=req.body
    if(!id)
    {
        return res.json({"message":"Id is required"})
    }
    const deletedObject = await User.findByIdAndDelete(id)
    return res.json({"message":`User ${deletedObject.userName} deleted successfully`})
})

const getUser =asyncHandler(async(req,res)=>{
    const id=req.params.id
    const thatId = await User.findById(id).exec()
    if(!thatId)
    {
        return res.json({"message":`error with id ${id}`})
    }
    else{
        return res.json(thatId)
    }
})

module.exports = {getAllUsers,createNewUser,updateUser,deleteUser,getUser}