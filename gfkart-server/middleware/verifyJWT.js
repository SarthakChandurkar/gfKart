const jwt = require("jsonwebtoken")

const verifyJWT = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.json({"messaage":"No authHeader is there"})
    // console.log(authHeader)
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.json({"message":"Error Occured in verifying JWT"})
            req.userName = decoded.userName
            next()
        }
    )
}

module.exports = verifyJWT