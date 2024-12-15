const express = require("express")
const connectDB = require("./config/index.js")
require("dotenv").config()
const app = express()
const cors = require("cors")
const todoroutes = require("./routes/routes.js")
app.use(cors())
app.use(express.json());
app.use('/api', todoroutes)
const PORT = process.env.PORT || 5000
connectDB()
app.listen(PORT, ()=>{
    console.log("Server is running on port 5000")
})