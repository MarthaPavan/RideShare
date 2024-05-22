const express = require('express')
const app = express()
const port = process.env.PORT || 1000
const connection = require(`./connection/database.connection.js`)
const gettingStarted = require("./routes/getstarted")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/get-started",gettingStarted)

app.get("/",(req,res)=>{
    res.send("<h1>HomePage</h1>")
})
app.listen(port,()=>console.log(`Server running on port ${port}`))