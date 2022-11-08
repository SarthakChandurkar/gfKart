const router = require("express").Router()

router.get("/",(req,res)=>{
    res.json({message:"Hii , This is a Home Page"})
})

module.exports = router