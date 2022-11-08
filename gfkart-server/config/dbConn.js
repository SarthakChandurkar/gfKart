const mongoose = require("mongoose")

const dbConn = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI,{useUnifiedTopology:true,useNewUrlParser:true});
    }
    catch(err)
    {
        throw new Error("Problem While Connecting to mongoDB")
    }
}

module.exports = dbConn