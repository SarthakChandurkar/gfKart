const {v4:uuid} = require("uuid")
const {format} = require("date-fns")
const fs=require("fs")
const fsPromises = require("fs").promises;
const path = require("path")

const logEvents = async (message,fileName) =>{
    const finalMessage = `${format(new Date(),"yyyy-MM-dd HH:MM:SS")}\t${uuid()}\t${message}\n`
    try 
    {
        if(!fs.existsSync(path.join(__dirname,"..",'logs')))
        {
            await fsPromises.mkdir(path.join(__dirname,"..","logs"))
        }
        await fsPromises.appendFile(path.join(__dirname,"..",'logs',fileName),finalMessage)
    }
    catch(err){
        console.log(err)
    }
}
const logger = (req,res,next)=>{
    logEvents(`${req.method} ${req.headers.origin} ${req.url}`,"reqLog.log")
    next()
}
module.exports = {logger,logEvents}