require("dotenv").config()
require("express-async-errors")

const express = require("express");
const ViteExpress = require("vite-express");

const cors = require("cors")

const app = express();

const connectDB = require("./DB/connect")
const PORT = process.env.PORT || 3000

const User = require("./Models/User")

const notFoundMiddleware = require("./middlewares/not-found")
const errorHandlerMiddleware = require("./middlewares/error-handler")

//middlewares
app.use(cors())
app.use(express.json())

//get all users
app.get("/api/v1/users", async(req, res) => {
  const allUsers = await User.find({})

  res.status(200).json({allUsers})
});

//errros
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const start = async()=>{
  try{
    await connectDB(process.env.MONGO_URL)
    ViteExpress.listen(app, PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
    
  }catch(err){
    console.error("Connection to db failed",err)
  }

}

start()
