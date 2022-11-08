const allowedOrigins = require("../config/allowedOrigins")

const corsAllowance = (req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",allowedOrigins)
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept")
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE")
    res.setHeader("Access-Control-Allow-Credentials",true)
    next()
}

module.exports = corsAllowance