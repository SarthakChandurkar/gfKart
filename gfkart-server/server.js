// imports
require("dotenv").config() // making the .env variable to access over all the pages
const express = require("express")
const app = express();
const path = require("path")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const { logger } = require(path.join(__dirname,"middleware","logger.js"))
const errorHandler = require(path.join(__dirname,"middleware","errorHandler.js"))
const cookieParser = require("cookie-parser")
const corsAllowance = require("./middleware/corsAllowance");
const verifyJWT = require("./middleware/verifyJWT")
const mongoose = require("mongoose")
const dbConn = require("./config/dbConn");



// middlewares
dbConn();   // connection with mongoDB database

app.use(express.static(path.join(__dirname,"public"))) // setting up all static files(HTML,css,JS,images,svgs and so on) in public folder to be available on server
app.use(express.urlencoded({extended:false})) // makes the web app to use url encoded (UTF-8 content)
app.use(express.json()) // makes the app to pass json data all over app

app.use(cors(corsOptions)) // cors allows other sites to fetch data from our site or not
app.use(corsAllowance) // allows sending the credentials to origin from which our REST API is used
app.use(cookieParser()) // allows passing of cookies over the app

app.use(logger) // Logs the every request that made to server

// Routes that will be available without verify the authorization
app.use("/",require("./routes/root.js"))
app.use("/auth",require("./routes/auth"))
app.use("/register",require("./routes/register"))
app.use("/refresh",require("./routes/refresh"))
app.use("/logout",require("./controller/logoutController"))

app.use(verifyJWT) // authorization 

// routes that will be available after verifying the authorization
app.use("/users",require("./routes/users.js")) 

// logs the error that occured throughout the app
app.use(errorHandler)




// Connection
const PORT = process.env.PORT || 5000 
mongoose.connection.once("open",()=>
{  
    // first time DB connection and server porting
    console.log("Connected to mongoDB") 
    app.listen(PORT,()=>{
        console.log(`Server Started on PORT ${PORT}`)
    })
})