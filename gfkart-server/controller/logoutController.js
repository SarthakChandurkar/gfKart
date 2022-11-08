const User = require("../models/User")


const logout = async (req,res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.json({"message":"There is no cookie to delete"})
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshTokens:refreshToken}).exec()
    if(!foundUser) {
        res.clearCookie("jwt",{sameSite:"None",httpOnly:true})
        return res.json({"message":"No user found with this refreshToken"})
    }
    foundUser.refreshTokens = foundUser.refreshTokens.filter(rt => rt !== refreshToken);
    const updatedFoundUser= await foundUser.save()
    res.clearCookie("jwt",{sameSite:"None",httpOnly:true})
    return res.json(updatedFoundUser)
}

module.exports = logout