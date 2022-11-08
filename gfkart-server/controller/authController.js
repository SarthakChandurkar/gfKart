const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



const handleLogin = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
    const { userName, password } = req.body
    if (!userName || !password){
        return res.json({ "message": "All fiels required" })
    }
    const attemptedUser = await User.findOne({userName}).exec()
    if (!attemptedUser) {
        return res.json({ "message": "User Not found" })
    }
    const match = await bcrypt.compare(password, attemptedUser.password)
    if (!match) {
        return res.json({ "message": `Password is wrong` })
    }
    const accessToken = jwt.sign(
        { "userName": attemptedUser.userName },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60s" }
    )
    const newRefreshToken = jwt.sign(
        { "userName": attemptedUser.userName },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    )
    let newRefreshTokenArray = 
        !cookies?.jwt 
        ? attemptedUser.refreshTokens
        : attemptedUser.refreshTokens.filter(rt=>rt!==cookies.jwt)
    
    if(cookies?.jwt)
    {
        const presentRefreshToken = cookies.jwt
        const foundUser = await User.findOne({refreshToken:presentRefreshToken}).exec()
        if(!foundUser)
        {
            console.log("attempted reuse refresh token at login")
            newRefreshTokenArray = []
        }
        res.clearCookie('jwt',{sameSite:'None',httpOnly:true})
    }

    attemptedUser.refreshTokens = [...newRefreshTokenArray,newRefreshToken]
    const result = await attemptedUser.save()
    console.log(result)

    res.cookie('jwt', newRefreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken })
})

module.exports = handleLogin